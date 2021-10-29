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

import React, { useState } from 'react';
import { AppTable } from './components/app_table';
import { Application } from './components/application';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TraceAnalyticsComponentDeps, TraceAnalyticsCoreDeps } from '../trace_analytics/home';
import { FilterType } from '../trace_analytics/components/common/filters/filters';
import { renderPageWithSidebar } from '../common/side_nav';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';

interface HomeProps extends RouteComponentProps, TraceAnalyticsCoreDeps {
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
}


export type ApplicationType = {
  name: string;
  id: string;
  composition: string;
  currentAvailability: string;
  availabilityMetrics: string;
  dateCreated: string;
  dateModified: string;
};

const dateString = new Date().toISOString();

const dummyApplication: ApplicationType[] = [{
  name: "Cool Application", 
  id: "id", 
  composition: "Payment, user_db",
  currentAvailability: "Available",
  availabilityMetrics: "Error rate: 0.80%, Throughput: 0.94%, Latency: 600ms",
  dateCreated: dateString, 
  dateModified: dateString
}];

export const Home = (props: HomeProps) => {
  const { pplService, dslService, timestampUtils, savedObjects, parentBreadcrumb } = props;
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
    <div>
      <Switch>
        <Route
          exact
          path={props.match.path}
          render={(routerProps) => 
            renderPageWithSidebar(
              <AppTable loading={false} applications={dummyApplication} {...commonProps} />
            )
          }
        />
        <Route
          exact
          path={`${props.match.path}/create`}
          render={(routerProps) => 
            <h1>Create Application</h1>
          }
        />
        <Route
          exact
          // path="/application_analytics/:id+"
          path={`${props.match.path}/:id`}
          render={(routerProps) => 
            <Application
              disabled={false}
              appId={decodeURIComponent(routerProps.match.params.id)}
              pplService={ pplService }
              dslService={ dslService }
              savedObjects={ savedObjects }
              timestampUtils={ timestampUtils }
              {...commonProps}
            />
          }
        />
      </Switch>
    </div>
  )
};