/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import dateMath from '@elastic/datemath';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  handleDashboardErrorRatePltRequest,
  handleDashboardRequest,
  handleDashboardThroughputPltRequest,
} from '../../requests/dashboard_request_handler';
import { handleServiceMapRequest } from '../../requests/services_request_handler';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import {
  filtersToDsl,
  getPercentileFilter,
  milliToNanoSec,
  minFixedInterval,
  MissingConfigurationMessage,
} from '../common/helper_functions';
import { ErrorRatePlt } from '../common/plots/error_rate_plt';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { ThroughputPlt } from '../common/plots/throughput_plt';
import { SearchBar } from '../common/search_bar';
import { DashboardProps } from './dashboard';
import { DashboardTable } from './dashboard_table';

export function DashboardContent(props: DashboardProps) {
  const {
    http,
    chrome,
    page,
    query,
    appConfigs,
    startTime,
    endTime,
    childBreadcrumbs,
    parentBreadcrumbs,
    filters,
    indicesExist,
    setStartTime,
    setEndTime,
    setQuery,
    setFilters,
  } = props;
  const [tableItems, setTableItems] = useState([]);
  const [throughputPltItems, setThroughputPltItems] = useState({ items: [], fixedInterval: '1h' });
  const [errorRatePltItems, setErrorRatePltItems] = useState({ items: [], fixedInterval: '1h' });
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');
  const [percentileMap, setPercentileMap] = useState<{ [traceGroup: string]: number[] }>({});
  const [filteredService, setFilteredService] = useState('');
  const [redirect, setRedirect] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.setBreadcrumbs([...parentBreadcrumbs, ...childBreadcrumbs]);
    const validFilters = getValidFilterFields(page);
    setFilters([
      ...filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
  }, []);

  useEffect(() => {
    let newFilteredService = '';
    for (const filter of filters) {
      if (filter.field === 'serviceName') {
        newFilteredService = filter.value;
        break;
      }
    }
    setFilteredService(newFilteredService);
    if (!redirect && indicesExist) refresh(newFilteredService);
  }, [filters, startTime, endTime, appConfigs]);

  const refresh = async (currService?: string) => {
    setLoading(true);
    const DSL = filtersToDsl(filters, query, startTime, endTime, page, appConfigs);
    const timeFilterDSL = filtersToDsl([], '', startTime, endTime, page, appConfigs);
    const latencyTrendStartTime = dateMath.parse(endTime)?.subtract(24, 'hours').toISOString()!;
    const latencyTrendDSL = filtersToDsl(
      filters,
      query,
      latencyTrendStartTime,
      endTime,
      page,
      appConfigs
    );
    const fixedInterval = minFixedInterval(startTime, endTime);

    handleDashboardRequest(
      http,
      DSL,
      timeFilterDSL,
      latencyTrendDSL,
      tableItems,
      setTableItems,
      setPercentileMap
    ).then(() => setLoading(false));
    handleDashboardThroughputPltRequest(
      http,
      DSL,
      fixedInterval,
      throughputPltItems,
      setThroughputPltItems
    );
    handleDashboardErrorRatePltRequest(
      http,
      DSL,
      fixedInterval,
      errorRatePltItems,
      setErrorRatePltItems
    );
    // service map should not be filtered by service name (https://github.com/opensearch-project/observability/issues/442)
    const serviceMapDSL = _.cloneDeep(DSL);
    serviceMapDSL.query.bool.must = serviceMapDSL.query.bool.must.filter(
      (must: any) => must?.term?.serviceName == null
    );
    handleServiceMapRequest(http, serviceMapDSL, setServiceMap, currService || filteredService);
  };

  const addFilter = (filter: FilterType) => {
    for (let i = 0; i < filters.length; i++) {
      const addedFilter = filters[i];
      if (addedFilter.field === filter.field) {
        if (addedFilter.operator === filter.operator && addedFilter.value === filter.value) return;
        const newFilters = [...filters];
        newFilters.splice(i, 1, filter);
        setFilters(newFilters);
        return;
      }
    }
    const newFilters = [...filters, filter];
    setFilters(newFilters);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = [] as FilterType[]) => {
    if (tableItems.length === 0 || Object.keys(percentileMap).length === 0) return;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].custom) {
        const newFilter = JSON.parse(JSON.stringify(filters[i]));
        newFilter.custom.query.bool.should.forEach((should: any) =>
          should.bool.must.forEach((must: any) => {
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
        const newFilters = [...filters, ...additionalFilters];
        newFilters.splice(i, 1, newFilter);
        setFilters(newFilters);
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
    const newFilters = [...filters, percentileFilter, ...additionalFilters];
    setFilters(newFilters);
  };

  return (
    <>
      <SearchBar
        query={query}
        filters={filters}
        appConfigs={appConfigs}
        setFilters={setFilters}
        setQuery={setQuery}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        refresh={refresh}
        page={page}
      />
      <EuiSpacer size="m" />
      {indicesExist ? (
        <>
          <DashboardTable
            items={tableItems}
            filters={filters}
            addFilter={addFilter}
            addPercentileFilter={addPercentileFilter}
            setRedirect={setRedirect}
            loading={loading}
            page={page}
          />
          <EuiSpacer />
          <EuiFlexGroup alignItems="baseline">
            <EuiFlexItem grow={4}>
              <ServiceMap
                addFilter={addFilter}
                serviceMap={serviceMap}
                idSelected={serviceMapIdSelected}
                setIdSelected={setServiceMapIdSelected}
                currService={filteredService}
                page={page}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <ErrorRatePlt
                    items={errorRatePltItems}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <ThroughputPlt
                    items={throughputPltItems}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
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
