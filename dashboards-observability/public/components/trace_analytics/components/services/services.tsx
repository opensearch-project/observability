/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiTitle } from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsComponentDeps } from '../../home';
import {
  handleServiceMapRequest,
  handleServicesRequest,
} from '../../requests/services_request_handler';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { filtersToDsl } from '../common/helper_functions';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { SearchBar } from '../common/search_bar';
import { ServicesTable } from './services_table';

interface ServicesProps extends TraceAnalyticsComponentDeps {
  appId?: string;
  appName?: string;
  openServiceFlyout?: (serviceName: string) => void;
  switchToTrace?: () => void;
  page: 'dashboard' | 'traces' | 'services' | 'app';
}

export function Services(props: ServicesProps) {
  const { appId, appName, parentBreadcrumb, page } = props;
  const [tableItems, setTableItems] = useState([]);
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');
  const [redirect, setRedirect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filteredService, setFilteredService] = useState('');
  const appServices = page === 'app';

  const breadCrumbs = appServices
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
          text: 'Services',
          href: '#/trace_analytics/services',
        },
      ];

  useEffect(() => {
    props.chrome.setBreadcrumbs([parentBreadcrumb, ...breadCrumbs]);
    const validFilters = getValidFilterFields('services');
    props.setFilters([
      ...props.filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
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
  }, [props.filters, props.appConfigs]);

  const refresh = async (currService?: string) => {
    setLoading(true);
    const DSL = filtersToDsl(
      props.filters,
      props.query,
      props.startTime,
      props.endTime,
      props.page,
      appServices ? props.appConfigs : []
    );
    // service map should not be filtered by service name
    const serviceMapDSL = _.cloneDeep(DSL);
    serviceMapDSL.query.bool.must = serviceMapDSL.query.bool.must.filter(
      (must: any) => must?.term?.serviceName == null
    );
    await Promise.all([
      handleServicesRequest(props.http, DSL, tableItems, setTableItems, null, serviceQuery),
      handleServiceMapRequest(
        props.http,
        serviceMapDSL,
        serviceMap,
        setServiceMap,
        currService || filteredService
      ),
    ]);
    setLoading(false);
  };

  const addFilter = (filter: FilterType) => {
    for (let i = 0; i < props.filters.length; i++) {
      const addedFilter = props.filters[i];
      if ( addedFilter.field === filter.field) {
        if (addedFilter.operator === filter.operator && addedFilter.value === filter.value)
          return;
        const newFilters = [...props.filters];
        newFilters.splice(i, 1, filter);
        props.setFilters(newFilters);
        return;
      }
    }
    const newFilters = [...props.filters, filter];
    props.setFilters(newFilters);
  };

  const [serviceQuery, setServiceQuery] = useState('');

  return (
    <>
      {appServices ? (
        <EuiSpacer size="m" />
      ) : (
        <EuiTitle size="l">
          <h2 style={{ fontWeight: 430 }}>Services</h2>
        </EuiTitle>
      )}
      <SearchBar
        query={appServices ? '' : props.query}
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
      <ServicesTable
        items={tableItems}
        addFilter={addFilter}
        setRedirect={setRedirect}
        serviceQuery={serviceQuery}
        setServiceQuery={setServiceQuery}
        refresh={refresh}
        indicesExist={props.indicesExist}
        loading={loading}
        page={page}
        openServiceFlyout={props.openServiceFlyout}
        switchToTrace={props.switchToTrace}
      />
      <EuiSpacer size="m" />
      <ServiceMap
        addFilter={addFilter}
        serviceMap={serviceMap}
        idSelected={serviceMapIdSelected}
        setIdSelected={setServiceMapIdSelected}
        currService={filteredService}
        page={page}
      />
    </>
  );
}
