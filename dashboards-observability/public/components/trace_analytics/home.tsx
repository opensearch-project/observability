/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
  parentBreadcrumb: ChromeBreadcrumb;
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

  const commonProps: TraceAnalyticsComponentDeps = {
    parentBreadcrumb: props.parentBreadcrumb,
    http: props.http,
    chrome: props.chrome,
    query,
    setQuery: setQueryWithStorage,
    filters,
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
            <Dashboard {...commonProps} />
          </ObservabilitySideBar>
        )}
      />
      <Route
        exact
        path="/trace_analytics/traces"
        render={(routerProps) => (
          <ObservabilitySideBar>
            <Traces {...commonProps} />
          </ObservabilitySideBar>
        )}
      />
      <Route
        path="/trace_analytics/traces/:id+"
        render={(routerProps) => (
          <TraceView
            parentBreadcrumb={props.parentBreadcrumb}
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
            <Services {...commonProps} />
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
