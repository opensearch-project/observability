/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import dateMath from '@elastic/datemath';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  handleDashboardErrorRatePltRequest,
  handleDashboardRequest,
  handleDashboardThroughputPltRequest,
} from '../../requests/dashboard_request_handler';
import { handleServiceMapRequest } from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import {
  filtersToDsl,
  getPercentileFilter,
  milliToNanoSec,
  minFixedInterval,
  MissingConfigurationMessage,
  SearchBar,
  SearchBarProps,
} from '../common';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { ErrorRatePlt } from '../common/plots/error_rate_plt';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { ThroughputPlt } from '../common/plots/throughput_plt';
import { DashboardTable } from './dashboard_table';

interface DashboardProps extends SearchBarProps, CoreDeps {}

export function Dashboard(props: DashboardProps) {
  const [tableItems, setTableItems] = useState([]);
  const [throughputPltItems, setThroughputPltItems] = useState({ items: [], fixedInterval: '1h' });
  const [errorRatePltItems, setErrorRatePltItems] = useState({ items: [], fixedInterval: '1h' });
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState('latency');
  const [percentileMap, setPercentileMap] = useState<{ [traceGroup: string]: number[] }>({});
  const [redirect, setRedirect] = useState(true);

  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace Analytics',
        href: '#',
      },
      {
        text: 'Dashboard',
        href: '#/dashboard',
      },
    ]);
    const validFilters = getValidFilterFields('dashboard');
    props.setFilters([
      ...props.filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
  }, []);

  useEffect(() => {
    if (!redirect && props.indicesExist) refresh();
  }, [props.filters, props.startTime, props.endTime]);

  const refresh = async () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const timeFilterDSL = filtersToDsl([], '', props.startTime, props.endTime);
    const latencyTrendStartTime = dateMath
      .parse(props.endTime)
      ?.subtract(24, 'hours')
      .toISOString()!;
    const latencyTrendDSL = filtersToDsl(
      props.filters,
      props.query,
      latencyTrendStartTime,
      props.endTime
    );
    const fixedInterval = minFixedInterval(props.startTime, props.endTime);

    handleDashboardRequest(
      props.http,
      DSL,
      timeFilterDSL,
      latencyTrendDSL,
      tableItems,
      setTableItems,
      setPercentileMap
    );
    handleDashboardThroughputPltRequest(
      props.http,
      DSL,
      fixedInterval,
      throughputPltItems,
      setThroughputPltItems
    );
    handleDashboardErrorRatePltRequest(
      props.http,
      DSL,
      fixedInterval,
      errorRatePltItems,
      setErrorRatePltItems
    );
    handleServiceMapRequest(props.http, DSL, serviceMap, setServiceMap);
  };

  const addFilter = (filter: FilterType) => {
    for (const addedFilter of props.filters) {
      if (
        addedFilter.field === filter.field &&
        addedFilter.operator === filter.operator &&
        addedFilter.value === filter.value
      ) {
        return;
      }
    }
    const newFilters = [...props.filters, filter];
    props.setFilters(newFilters);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = []) => {
    if (tableItems.length === 0 || Object.keys(percentileMap).length === 0) return;
    for (let i = 0; i < props.filters.length; i++) {
      if (props.filters[i].custom) {
        const newFilter = JSON.parse(JSON.stringify(props.filters[i]));
        newFilter.custom.query.bool.should.forEach((should) =>
          should.bool.must.forEach((must) => {
            const range = must?.range?.['traceGroupFields.durationInNanos'];
            if (range) {
              const duration = range.lt || range.lte || range.gt || range.gte;
              if (duration || duration === 0) {
                must.range['traceGroupFields.durationInNanos'] = {
                  [condition]: duration,
                };
              }
            }
          })
        );
        newFilter.value = condition === 'gte' ? '>= 95th' : '< 95th';
        const newFilters = [...props.filters, ...additionalFilters];
        newFilters.splice(i, 1, newFilter);
        props.setFilters(newFilters);
        return;
      }
    }

    const percentileMaps = Object.keys(percentileMap).map((traceGroup) => ({
      traceGroupName: traceGroup,
      durationFilter: { [condition]: milliToNanoSec(percentileMap[traceGroup][1]) },
    }));
    const percentileFilter = getPercentileFilter(
      percentileMaps,
      condition === 'gte' ? '>= 95th' : '< 95th'
    );
    const newFilters = [...props.filters, percentileFilter, ...additionalFilters];
    props.setFilters(newFilters);
  };

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Dashboard</h2>
      </EuiTitle>
      <SearchBar
        query={props.query}
        filters={props.filters}
        setFilters={props.setFilters}
        setQuery={props.setQuery}
        startTime={props.startTime}
        setStartTime={props.setStartTime}
        endTime={props.endTime}
        setEndTime={props.setEndTime}
        refresh={refresh}
        page="dashboard"
      />
      <EuiSpacer size="m" />
      {props.indicesExist ? (
        <>
          <DashboardTable
            items={tableItems}
            filters={props.filters}
            addFilter={addFilter}
            addPercentileFilter={addPercentileFilter}
            setRedirect={setRedirect}
          />
          <EuiSpacer />
          <EuiFlexGroup alignItems="baseline">
            <EuiFlexItem grow={4}>
              <ServiceMap
                addFilter={addFilter}
                serviceMap={serviceMap}
                idSelected={serviceMapIdSelected}
                setIdSelected={setServiceMapIdSelected}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <ErrorRatePlt
                    items={errorRatePltItems}
                    setStartTime={props.setStartTime}
                    setEndTime={props.setEndTime}
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <ThroughputPlt
                    items={throughputPltItems}
                    setStartTime={props.setStartTime}
                    setEndTime={props.setEndTime}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </>
      ) : (
        <MissingConfigurationMessage />
      )}
    </>
  );
}
