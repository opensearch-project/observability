/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiLink } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import {
  ChromeBreadcrumb,
  ChromeStart,
  CoreStart,
  HttpStart,
} from '../../../../../src/core/public';
import { ObservabilitySideBar } from '../common/side_nav';
import { FilterType } from './components/common/filters/filters';
import { SearchBarProps } from './components/common/search_bar';
import { Dashboard } from './components/dashboard';
import { Services, ServiceView } from './components/services';
import { Traces, TraceView } from './components/traces';
import { handleIndicesExistRequest } from './requests/request_handler';

export interface TraceAnalyticsCoreDeps {
  parentBreadcrumbs: ChromeBreadcrumb[];
  http: HttpStart;
  chrome: ChromeStart;
}

interface HomeProps extends RouteComponentProps, TraceAnalyticsCoreDeps {}

export interface TraceAnalyticsComponentDeps extends TraceAnalyticsCoreDeps, SearchBarProps {
  indicesExist: boolean;
}

export const Home = (props: HomeProps) => {
  const [indicesExist, setIndicesExist] = useState(true);
  const storedFilters = sessionStorage.getItem('TraceAnalyticsFilters');
  const [query, setQuery] = useState<string>(sessionStorage.getItem('TraceAnalyticsQuery') || '');
  const [filters, setFilters] = useState<FilterType[]>(
    storedFilters ? JSON.parse(storedFilters) : []
  );
  const [startTime, setStartTime] = useState<string>(
    sessionStorage.getItem('TraceAnalyticsStartTime') || 'now-5m'
  );
  const [endTime, setEndTime] = useState<string>(
    sessionStorage.getItem('TraceAnalyticsEndTime') || 'now'
  );

  const setFiltersWithStorage = (newFilters: FilterType[]) => {
    setFilters(newFilters);
    sessionStorage.setItem('TraceAnalyticsFilters', JSON.stringify(newFilters));
  };
  const setQueryWithStorage = (newQuery: string) => {
    setQuery(newQuery);
    sessionStorage.setItem('TraceAnalyticsQuery', newQuery);
  };
  const setStartTimeWithStorage = (newStartTime: string) => {
    setStartTime(newStartTime);
    sessionStorage.setItem('TraceAnalyticsStartTime', newStartTime);
  };
  const setEndTimeWithStorage = (newEndTime: string) => {
    setEndTime(newEndTime);
    sessionStorage.setItem('TraceAnalyticsEndTime', newEndTime);
  };

  useEffect(() => {
    handleIndicesExistRequest(props.http, setIndicesExist);
  }, []);

  const dashboardBreadcrumbs = [
    {
      text: 'Trace analytics',
      href: '#/trace_analytics/home',
    },
    {
      text: 'Dashboard',
      href: '#/trace_analytics/home',
    },
  ];

  const serviceBreadcrumbs = [
    {
      text: 'Trace analytics',
      href: '#/trace_analytics/home',
    },
    {
      text: 'Services',
      href: '#/trace_analytics/services',
    },
  ];

  const traceBreadcrumbs = [
    {
      text: 'Trace analytics',
      href: '#/trace_analytics/home',
    },
    {
      text: 'Traces',
      href: '#/trace_analytics/traces',
    },
  ];

  const nameColumnAction = (item: any) =>
    location.assign(`#/trace_analytics/services/${encodeURIComponent(item)}`);

  const traceColumnAction = () => location.assign('#/trace_analytics/traces');

  const traceIdColumnAction = (item: any) =>
    location.assign(`#/trace_analytics/traces/${encodeURIComponent(item)}`);

  const commonProps: TraceAnalyticsComponentDeps = {
    parentBreadcrumbs: props.parentBreadcrumbs,
    http: props.http,
    chrome: props.chrome,
    query,
    setQuery: setQueryWithStorage,
    filters,
    appConfigs: [],
    setFilters: setFiltersWithStorage,
    startTime,
    setStartTime: setStartTimeWithStorage,
    endTime,
    setEndTime: setEndTimeWithStorage,
    indicesExist,
  };

  return (
    <>
      <Route
        exact
        path={['/trace_analytics', '/trace_analytics/home']}
        render={(routerProps) => (
          <ObservabilitySideBar>
            <Dashboard page="dashboard" childBreadcrumbs={dashboardBreadcrumbs} {...commonProps} />
          </ObservabilitySideBar>
        )}
      />
      <Route
        exact
        path="/trace_analytics/traces"
        render={(routerProps) => (
          <ObservabilitySideBar>
            <Traces
              page="traces"
              childBreadcrumbs={traceBreadcrumbs}
              traceIdColumnAction={traceIdColumnAction}
              {...commonProps}
            />
          </ObservabilitySideBar>
        )}
      />
      <Route
        path="/trace_analytics/traces/:id+"
        render={(routerProps) => (
          <TraceView
            parentBreadcrumbs={props.parentBreadcrumbs}
            chrome={props.chrome}
            http={props.http}
            traceId={decodeURIComponent(routerProps.match.params.id)}
          />
        )}
      />
      <Route
        exact
        path="/trace_analytics/services"
        render={(routerProps) => (
          <ObservabilitySideBar>
            <Services
              page="services"
              childBreadcrumbs={serviceBreadcrumbs}
              nameColumnAction={nameColumnAction}
              traceColumnAction={traceColumnAction}
              {...commonProps}
            />
          </ObservabilitySideBar>
        )}
      />
      <Route
        path="/trace_analytics/services/:id+"
        render={(routerProps) => (
          <ServiceView
            serviceName={decodeURIComponent(routerProps.match.params.id)}
            {...commonProps}
            addFilter={(filter: FilterType) => {
              for (const addedFilter of filters) {
                if (
                  addedFilter.field === filter.field &&
                  addedFilter.operator === filter.operator &&
                  addedFilter.value === filter.value
                ) {
                  return;
                }
              }
              const newFilters = [...filters, filter];
              setFiltersWithStorage(newFilters);
            }}
          />
        )}
      />
    </>
  );
};
