/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */


import React, { ReactChild, useEffect, useState } from 'react';
import { AppTable } from './components/app_table';
import { Application } from './components/application';
import { CreateApp } from './components/create'
import { Route, RouteComponentProps, Switch } from 'react-router';
import { TraceAnalyticsComponentDeps, TraceAnalyticsCoreDeps } from '../trace_analytics/home';
import { FilterType } from '../trace_analytics/components/common/filters/filters';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';
import { handleIndicesExistRequest } from '../trace_analytics/requests/request_handler';
import { ObservabilitySideBar } from '../common/side_nav';
import { NotificationsStart } from '../../../../../src/core/public';
import { optionType, APP_ANALYTICS_API_PREFIX } from '../../../common/constants/application_analytics';
import { isNameValid } from './helpers/utils';
import { EuiGlobalToastList } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';

export interface AppAnalyticsCoreDeps extends TraceAnalyticsCoreDeps {}

interface HomeProps extends RouteComponentProps, AppAnalyticsCoreDeps {
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
  notifications: NotificationsStart;
}

export interface AppAnalyticsComponentDeps extends TraceAnalyticsComponentDeps {}

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
  const { pplService, dslService, timestampUtils, savedObjects, parentBreadcrumb, http, chrome, notifications } = props;
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [indicesExist, setIndicesExist] = useState(true);
  const storedFilters = sessionStorage.getItem('AppAnalyticsFilters');
  const [filters, setFilters] = useState<FilterType[]>(storedFilters ? JSON.parse(storedFilters) : []);
  const [query, setQuery] = useState<string>(sessionStorage.getItem('AppAnalyticsQuery') || '');
  const [startTime, setStartTime] = useState<string>(sessionStorage.getItem('AppAnalyticsStartTime') || 'now-24h');
  const [endTime, setEndTime] = useState<string>(sessionStorage.getItem('AppAnalyticsEndTime') || 'now');

  // Setting state with storage to save input when user refreshes page
  const setFiltersWithStorage = (newFilters: FilterType[]) => {
    setFilters(newFilters);
    sessionStorage.setItem('AppAnalyticsFilters', JSON.stringify(newFilters));
  };
  const setQueryWithStorage = (newQuery: string) => {
    setQuery(newQuery);
    sessionStorage.setItem('AppAnalyticsQuery', newQuery);
  };
  const setStartTimeWithStorage = (newStartTime: string) => {
    setStartTime(newStartTime);
    sessionStorage.setItem('AppAnalyticsStartTime', newStartTime);
  };
  const setEndTimeWithStorage = (newEndTime: string) => {
    setEndTime(newEndTime);
    sessionStorage.setItem('AppAnalyticsEndTime', newEndTime);
  };
  
  useEffect(() => {
    handleIndicesExistRequest(http, setIndicesExist);
  }, []);

  const commonProps: AppAnalyticsComponentDeps = {
    parentBreadcrumb: parentBreadcrumb,
    http: http,
    chrome: chrome,
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

  const setToast = (title: string, color = 'success', text?: ReactChild) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  // Create a new application
  const createApp = (name: string, description: string, query: string, selectedServices: Array<optionType>, selectedTraces: Array<optionType>) => {
    if(!isNameValid(name)) {
      setToast('Invalid Application name', 'danger');
      return;
    }

    const requestBody = {
      name: name,
      description: description,
      baseQuery: query,
      servicesEntities: selectedServices.map(option => option.label),
      traceGroups: selectedTraces.map(option => option.label),
    }

    return http
      .post(`${APP_ANALYTICS_API_PREFIX}/application`, {
        body: JSON.stringify(requestBody)
      })
      .then(async (res) => {
        setToast(`Application "${name}" successfully created!`);
        window.location.assign(`${parentBreadcrumb.href}${res.newAppId}`)
      })
      .catch((err) => {
        setToast(`Error occurred while creating new application "${name}"`, 'danger');
        console.error(err);
      });
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        toastLifeTimeMs={6000}
      />
      <Switch>
        <Route
          exact
          path={['/', '/application_analytics']}
          render={() => 
            <ObservabilitySideBar>
            <AppTable loading={false} applications={dummyApplication} {...commonProps} />
            </ObservabilitySideBar>
          }
        />
        <Route
          exact
          path={'/application_analytics/create'}
          render={() => 
            <CreateApp
            dslService={dslService}
            createApp={createApp}
            {...commonProps}
            />
          }
        />
        <Route
          exact
          path={'/application_analytics/:id+'}
          render={(routerProps) => 
            <Application
              disabled={false}
              appId={decodeURIComponent(routerProps.match.params.id)}
              pplService={pplService}
              dslService={dslService}
              savedObjects={savedObjects}
              timestampUtils={timestampUtils}
              notifications={notifications}
              {...commonProps}
            />
          }
        />
      </Switch>
    </div>
  )
};
