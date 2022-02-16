/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsComponentDeps } from '../../home';
import { handleServicesRequest } from '../../requests/services_request_handler';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { filtersToDsl } from '../common/helper_functions';
import { SearchBar } from '../common/search_bar';
import { ServicesTable } from './services_table';

interface ServicesProps extends TraceAnalyticsComponentDeps {
  appId?: string;
  appName?: string;
  openServiceFlyout?: (serviceName: string) => void;
  page: 'dashboard' | 'traces' | 'services' | 'app';
}

export function Services(props: ServicesProps) {
  const { appId, appName, parentBreadcrumb, page } = props;
  const [tableItems, setTableItems] = useState([]);
  const [redirect, setRedirect] = useState(true);
  const [loading, setLoading] = useState(false);
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
    if (!redirect && props.indicesExist) refresh();
  }, [props.filters, props.appConfigs]);

  const refresh = async () => {
    setLoading(true);
    const DSL = filtersToDsl(
      props.filters,
      props.query,
      props.startTime,
      props.endTime,
      props.page,
      appServices ? props.appConfigs : []
    );
    await handleServicesRequest(props.http, DSL, tableItems, setTableItems, null, serviceQuery);
    setLoading(false);
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
      />
    </>
  );
}
