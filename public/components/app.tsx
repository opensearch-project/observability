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

import { I18nProvider } from '@osd/i18n/react';
import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart, IUiSettingsClient } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { handleIndicesExistRequest } from '../requests/request_handler';
import { SearchBarProps } from './common';
import { FilterType } from './common/filters/filters';
import { renderPageWithSidebar } from './common/side_nav';
import { Dashboard } from './dashboard';
import { Services, ServiceView } from './services';
import { Traces, TraceView } from './traces';

interface TraceAnalyticsAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  uiSettings: IUiSettingsClient;
  chrome: CoreStart['chrome'];
  navigation: NavigationPublicPluginStart;
}

export interface CoreDeps {
  http: CoreStart['http'];
  uiSettings: IUiSettingsClient;
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  indicesExist?: boolean;
}

export const TraceAnalyticsApp = ({
  basename,
  notifications,
  http,
  uiSettings,
  chrome,
  navigation,
}: TraceAnalyticsAppDeps) => {
  const [indicesExist, setIndicesExist] = useState(true);
  const storedFilters = localStorage.getItem('TraceAnalyticsFilters');
  const [query, setQuery] = useState<string>(localStorage.getItem('TraceAnalyticsQuery') || '');
  const [filters, setFilters] = useState<FilterType[]>(
    storedFilters ? JSON.parse(storedFilters) : []
  );
  const [startTime, setStartTime] = useState<string>(
    localStorage.getItem('TraceAnalyticsStartTime') || 'now-5m'
  );
  const [endTime, setEndTime] = useState<string>(
    localStorage.getItem('TraceAnalyticsEndTime') || 'now'
  );

  const setFiltersWithStorage = (newFilters: FilterType[]) => {
    setFilters(newFilters);
    localStorage.setItem('TraceAnalyticsFilters', JSON.stringify(newFilters));
  };
  const setQueryWithStorage = (newQuery: string) => {
    setQuery(newQuery);
    localStorage.setItem('TraceAnalyticsQuery', newQuery);
  };
  const setStartTimeWithStorage = (newStartTime: string) => {
    setStartTime(newStartTime);
    localStorage.setItem('TraceAnalyticsStartTime', newStartTime);
  };
  const setEndTimeWithStorage = (newEndTime: string) => {
    setEndTime(newEndTime);
    localStorage.setItem('TraceAnalyticsEndTime', newEndTime);
  };

  useEffect(() => {
    handleIndicesExistRequest(http, setIndicesExist);
  }, []);

  const commonProps: SearchBarProps & CoreDeps = {
    http,
    uiSettings,
    setBreadcrumbs: chrome.setBreadcrumbs,
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
    <HashRouter>
      <I18nProvider>
        <>
          <Switch>
            <Route
              exact
              path={['/dashboard', '/']}
              render={(props) => renderPageWithSidebar(<Dashboard {...commonProps} />, 1)}
            />
            <Route
              exact
              path="/traces"
              render={(props) => renderPageWithSidebar(<Traces {...commonProps} />, 2)}
            />
            <Route
              path="/traces/:id+"
              render={(props) => (
                <TraceView
                  setBreadcrumbs={chrome.setBreadcrumbs}
                  http={http}
                  uiSettings={uiSettings}
                  traceId={decodeURIComponent(props.match.params.id)}
                />
              )}
            />
            <Route
              exact
              path="/services"
              render={(props) => renderPageWithSidebar(<Services {...commonProps} />, 3)}
            />
            <Route
              path="/services/:id+"
              render={(props) => (
                <ServiceView
                  serviceName={decodeURIComponent(props.match.params.id)}
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
          </Switch>
        </>
      </I18nProvider>
    </HashRouter>
  );
};
