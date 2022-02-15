/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactChild, useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';
import { EuiGlobalToastList, EuiLink } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';
import { AppTable } from './components/app_table';
import { Application } from './components/application';
import { CreateApp } from './components/create';
import { TraceAnalyticsComponentDeps, TraceAnalyticsCoreDeps } from '../trace_analytics/home';
import { FilterType } from '../trace_analytics/components/common/filters/filters';
import { handleIndicesExistRequest } from '../trace_analytics/requests/request_handler';
import { ObservabilitySideBar } from '../common/side_nav';
import { NotificationsStart } from '../../../../../src/core/public';
import { APP_ANALYTICS_API_PREFIX } from '../../../common/constants/application_analytics';
import { ApplicationListType, ApplicationType } from '../../../common/types/app_analytics';
import { isNameValid } from './helpers/utils';
import {
  CUSTOM_PANELS_API_PREFIX,
  CUSTOM_PANELS_DOCUMENTATION_URL,
} from '../../../common/constants/custom_panels';

export type AppAnalyticsCoreDeps = TraceAnalyticsCoreDeps;

interface HomeProps extends RouteComponentProps, AppAnalyticsCoreDeps {
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
  notifications: NotificationsStart;
}

export interface AppAnalyticsComponentDeps extends TraceAnalyticsComponentDeps {
  name: string;
  description: string;
  setNameWithStorage: (newName: string) => void;
  setDescriptionWithStorage: (newDescription: string) => void;
  setQueryWithStorage: (newQuery: string) => void;
  setFiltersWithStorage: (newFilters: FilterType[]) => void;
}

export const Home = (props: HomeProps) => {
  const {
    pplService,
    dslService,
    timestampUtils,
    savedObjects,
    parentBreadcrumb,
    http,
    chrome,
    notifications,
  } = props;
  const [applicationList, setApplicationList] = useState<ApplicationListType[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [indicesExist, setIndicesExist] = useState(true);
  const storedFilters = sessionStorage.getItem('AppAnalyticsFilters');
  const [filters, setFilters] = useState<FilterType[]>(
    storedFilters ? JSON.parse(storedFilters) : []
  );
  const [name, setName] = useState(sessionStorage.getItem('AppAnalyticsName') || '');
  const [description, setDescription] = useState(
    sessionStorage.getItem('AppAnalyticsDescription') || ''
  );
  const [query, setQuery] = useState<string>(sessionStorage.getItem('AppAnalyticsQuery') || '');
  const [startTime, setStartTime] = useState<string>(
    sessionStorage.getItem('AppAnalyticsStartTime') || 'now-24h'
  );
  const [endTime, setEndTime] = useState<string>(
    sessionStorage.getItem('AppAnalyticsEndTime') || 'now'
  );

  // Setting state with storage to save input when user refreshes page
  const setFiltersWithStorage = (newFilters: FilterType[]) => {
    setFilters(newFilters);
    sessionStorage.setItem('AppAnalyticsFilters', JSON.stringify(newFilters));
  };
  const setNameWithStorage = (newName: string) => {
    setName(newName);
    sessionStorage.setItem('AppAnalyticsName', newName);
  };
  const setDescriptionWithStorage = (newDescription: string) => {
    setDescription(newDescription);
    sessionStorage.setItem('AppAnalyticsDescription', newDescription);
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
    parentBreadcrumb,
    http,
    chrome,
    name,
    setNameWithStorage,
    description,
    setDescriptionWithStorage,
    query,
    setQuery,
    setQueryWithStorage,
    filters,
    setFilters,
    setFiltersWithStorage,
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

  const clearStorage = () => {
    setNameWithStorage('');
    setDescriptionWithStorage('');
    setFiltersWithStorage([]);
    setQueryWithStorage('');
  };

  const createPanelForApp = (applicationId: string, appName: string) => {
    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/panels`, {
        body: JSON.stringify({
          panelName: `${appName}'s Panel`,
          applicationId,
        }),
      })
      .then((res) => {
        updateApp(applicationId, { panelId: res.newPanelId }, false);
      })
      .catch((err) => {
        setToast(
          'Please ask your administrator to enable Operational Panels for you.',
          'danger',
          <EuiLink href={CUSTOM_PANELS_DOCUMENTATION_URL} target="_blank">
            Documentation
          </EuiLink>
        );
        console.error(err);
      });
  };

  // Fetches all existing applications
  const fetchApps = () => {
    return http
      .get(`${APP_ANALYTICS_API_PREFIX}/`)
      .then((res) => {
        setApplicationList(res.data);
      })
      .catch((err) => {
        setToast('Error occurred while fetching applications', 'danger');
        console.error(err);
      });
  };

  // Create a new application
  const createApp = (application: ApplicationType) => {
    const toast = isNameValid(
      application.name,
      applicationList.map((obj) => obj.name)
    );
    if (toast.length > 0) {
      setToast(toast.join(', '), 'danger');
      return;
    }

    const requestBody = {
      name: application.name,
      description: application.description,
      baseQuery: application.baseQuery,
      servicesEntities: application.servicesEntities,
      traceGroups: application.traceGroups,
    };

    return http
      .post(`${APP_ANALYTICS_API_PREFIX}/`, {
        body: JSON.stringify(requestBody),
      })
      .then((res) => {
        createPanelForApp(res.newAppId, application.name);
        setToast(`Application "${application.name}" successfully created!`);
        clearStorage();
      })
      .catch((err) => {
        setToast(`Error occurred while creating new application "${application.name}"`, 'danger');
        console.error(err);
      });
  };

  // Rename an existing application
  const renameApp = (newAppName: string, appId: string) => {
    if (
      !isNameValid(
        newAppName,
        applicationList.map((obj) => obj.name)
      )
    ) {
      setToast('Invalid Application name', 'danger');
      return;
    }

    const requestBody = {
      appId,
      name: newAppName,
    };

    return http
      .patch(`${APP_ANALYTICS_API_PREFIX}/rename`, {
        body: JSON.stringify(requestBody),
      })
      .then((res) => {
        setApplicationList((prevApplicationList) => {
          const newApplicationData = [...prevApplicationList];
          const renamedApplication = newApplicationData.find(
            (application) => application.id === appId
          );
          if (renamedApplication) renamedApplication.name = newAppName;
          return newApplicationData;
        });
        setToast(`Application successfully renamed to "${newAppName}"`);
      })
      .catch((err) => {
        setToast('Error occurred while renaming application', 'danger');
        console.error(err);
      });
  };

  // Update existing application
  const updateApp = (appId: string, updateAppData: Partial<ApplicationType>, edit: boolean) => {
    const requestBody = {
      appId,
      updateBody: updateAppData,
    };

    return http
      .patch(`${APP_ANALYTICS_API_PREFIX}/`, {
        body: JSON.stringify(requestBody),
      })
      .then((res) => {
        if (edit) {
          setToast('Application successfully updated.');
        }
        window.location.assign(`${parentBreadcrumb.href}application_analytics/${res.updatedAppId}`);
      })
      .catch((err) => {
        setToast('Error occurred while updating application', 'danger');
        console.error(err);
      });
  };

  // Delete existing applications
  const deleteApp = (appList: string[], toastMessage?: string) => {
    return http
      .delete(`${APP_ANALYTICS_API_PREFIX}/${appList.join(',')}`)
      .then((res) => {
        setApplicationList((prevApplicationList) => {
          return prevApplicationList.filter((app) => !appList.includes(app.id));
        });
        const message =
          toastMessage || `Application${appList.length > 1 ? 's' : ''} successfully deleted!`;
        setToast(message);
        return res;
      })
      .catch((err: any) => {
        setToast('Error occured while deleting application', 'danger');
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
          render={() => (
            <ObservabilitySideBar>
              <AppTable
                loading={false}
                applications={applicationList}
                fetchApplications={fetchApps}
                renameApplication={renameApp}
                deleteApplication={deleteApp}
                {...commonProps}
              />
            </ObservabilitySideBar>
          )}
        />
        <Route
          exact
          path={['/application_analytics/create', '/application_analytics/edit/:id+']}
          render={(routerProps) => (
            <CreateApp
              dslService={dslService}
              createApp={createApp}
              updateApp={updateApp}
              setToasts={setToast}
              clearStorage={clearStorage}
              existingAppId={decodeURIComponent(routerProps.match.params.id) || ''}
              {...commonProps}
            />
          )}
        />
        <Route
          exact
          path={'/application_analytics/:id+'}
          render={(routerProps) => (
            <Application
              disabled={false}
              appId={decodeURIComponent(routerProps.match.params.id)}
              pplService={pplService}
              dslService={dslService}
              savedObjects={savedObjects}
              timestampUtils={timestampUtils}
              notifications={notifications}
              setToasts={setToast}
              {...commonProps}
            />
          )}
        />
      </Switch>
    </div>
  );
};
