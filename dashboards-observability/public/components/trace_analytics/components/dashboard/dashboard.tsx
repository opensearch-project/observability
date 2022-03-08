/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import dateMath from '@elastic/datemath';
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsComponentDeps } from '../../home';
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
import { DashboardTable } from './dashboard_table';

interface DashboardProps extends TraceAnalyticsComponentDeps {
  appId?: string;
  appName?: string;
  switchToEditViz?: any;
  page: 'dashboard' | 'traces' | 'services' | 'app';
}

export function Dashboard(props: DashboardProps) {
  const { appId, appName, page, parentBreadcrumb, switchToEditViz } = props;
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
  const appOverview = page === 'app';

  const breadCrumbs = appOverview
    ? [
        {
          text: 'Application analytics',
          href: '#/application_analytics',
        },
        {
          text: `${appName}`,
          href: `#/application_analytics/${appId}`,
        },
      ]
    : [
        {
          text: 'Trace analytics',
          href: '#/trace_analytics/home',
        },
        {
          text: 'Dashboards',
          href: '#/trace_analytics/home',
        },
      ];

  useEffect(() => {
    props.chrome.setBreadcrumbs([parentBreadcrumb, ...breadCrumbs]);
    const validFilters = getValidFilterFields(page);
    props.setFilters([
      ...props.filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
    if (appOverview) {
      switchToEditViz('');
    }
  }, []);

  useEffect(() => {
    let newFilteredService = '';
    for (const filter of props.filters) {
      if (filter.field === 'serviceName') {
        newFilteredService = filter.value;
        break;
      }
    }
    setFilteredService(newFilteredService);
    if (!redirect && props.indicesExist) refresh(newFilteredService);
  }, [props.filters, props.startTime, props.endTime, props.appConfigs]);

  const refresh = async (currService?: string) => {
    setLoading(true);
    const DSL = filtersToDsl(
      props.filters,
      props.query,
      props.startTime,
      props.endTime,
      page,
      appOverview ? props.appConfigs : []
    );
    const timeFilterDSL = filtersToDsl([], '', props.startTime, props.endTime, page);
    const latencyTrendStartTime = dateMath
      .parse(props.endTime)
      ?.subtract(24, 'hours')
      .toISOString()!;
    const latencyTrendDSL = filtersToDsl(
      appOverview ? props.appConfigs : props.filters,
      props.query,
      latencyTrendStartTime,
      props.endTime,
      page
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
    ).then(() => setLoading(false));
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
    // service map should not be filtered by service name (https://github.com/opensearch-project/observability/issues/442)
    const serviceMapDSL = _.cloneDeep(DSL);
    serviceMapDSL.query.bool.must = serviceMapDSL.query.bool.must.filter(
      (must: any) => must?.term?.serviceName == null
    );
    handleServiceMapRequest(
      props.http,
      serviceMapDSL,
      serviceMap,
      setServiceMap,
      currService || filteredService
    );
  };

  const addFilter = (filter: FilterType) => {
    for (let i = 0; i < props.filters.length; i++) {
      const addedFilter = props.filters[i];
      if (addedFilter.field === filter.field) {
        if (addedFilter.operator === filter.operator && addedFilter.value === filter.value) return;
        const newFilters = [...props.filters];
        newFilters.splice(i, 1, filter);
        props.setFilters(newFilters);
        return;
      }
    }
    const newFilters = [...props.filters, filter];
    props.setFilters(newFilters);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = [] as FilterType[]) => {
    if (tableItems.length === 0 || Object.keys(percentileMap).length === 0) return;
    for (let i = 0; i < props.filters.length; i++) {
      if (props.filters[i].custom) {
        const newFilter = JSON.parse(JSON.stringify(props.filters[i]));
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
      {appOverview ? (
        <EuiSpacer size="m" />
      ) : (
        <EuiTitle size="l">
          <h2 style={{ fontWeight: 430 }}>Dashboard</h2>
        </EuiTitle>
      )}
      <SearchBar
        query={appOverview ? '' : props.query}
        filters={props.filters}
        appConfigs={props.appConfigs}
        setFilters={props.setFilters}
        setQuery={props.setQuery}
        startTime={props.startTime}
        setStartTime={props.setStartTime}
        endTime={props.endTime}
        setEndTime={props.setEndTime}
        refresh={refresh}
        page={page}
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
