/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nProvider } from '@osd/i18n/react';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { QueryManager } from 'common/query_manager';
import { CoreStart } from '../../../../src/core/public';
import { observabilityID, observabilityTitle } from '../../common/constants/shared';
import store from '../framework/redux/store';
import { AppPluginStartDependencies } from '../types';
import { Home as ApplicationAnalyticsHome } from './application_analytics/home';
import { Home as CustomPanelsHome } from './custom_panels/home';
import { EventAnalytics } from './event_analytics';
import { Main as NotebooksHome } from './notebooks/components/main';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';
import { Home as MetricsHome } from './metrics/index';

interface ObservabilityAppDeps {
  CoreStartProp: CoreStart;
  DepsStart: AppPluginStartDependencies;
  pplService: any;
  dslService: any;
  savedObjects: any;
  timestampUtils: any;
  queryManager: QueryManager;
}

// for cypress to test redux store
if (window.Cypress) {
  window.store = store;
}

export const App = ({
  CoreStartProp,
  DepsStart,
  pplService,
  dslService,
  savedObjects,
  timestampUtils,
  queryManager,
}: ObservabilityAppDeps) => {
  const { chrome, http, notifications } = CoreStartProp;
  const parentBreadcrumb = {
    text: observabilityTitle,
    href: `${observabilityID}#/`,
  };

  const customPanelBreadcrumb = {
    text: 'Operational panels',
    href: '#/operational_panels/',
  };

  return (
    <Provider store={store}>
      <HashRouter>
        <I18nProvider>
          <>
            <Switch>
              <Route
                path="/metrics"
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    { text: 'Metrics', href: '#/metrics/' },
                  ]);
                  return (
                    <MetricsHome
                      http={http}
                      chrome={chrome}
                      parentBreadcrumb={parentBreadcrumb}
                      renderProps={props}
                    />
                  );
                }}
              />
              <Route
                path={'/application_analytics'}
                render={(props) => {
                  return (
                    <ApplicationAnalyticsHome
                      {...props}
                      chrome={chrome}
                      http={http}
                      notifications={notifications}
                      parentBreadcrumbs={[parentBreadcrumb]}
                      pplService={pplService}
                      dslService={dslService}
                      savedObjects={savedObjects}
                      timestampUtils={timestampUtils}
                    />
                  );
                }}
              />
              <Route
                path="/notebooks"
                render={(props) => (
                  <NotebooksHome
                    {...props}
                    DashboardContainerByValueRenderer={
                      DepsStart.dashboard.DashboardContainerByValueRenderer
                    }
                    http={http}
                    pplService={pplService}
                    setBreadcrumbs={chrome.setBreadcrumbs}
                    parentBreadcrumb={parentBreadcrumb}
                    notifications={notifications}
                  />
                )}
              />
              <Route
                path="/operational_panels"
                render={(props) => {
                  chrome.setBreadcrumbs([parentBreadcrumb, customPanelBreadcrumb]);
                  return (
                    <CustomPanelsHome
                      http={http}
                      chrome={chrome}
                      parentBreadcrumbs={[parentBreadcrumb, customPanelBreadcrumb]}
                      pplService={pplService}
                      dslService={dslService}
                      renderProps={props}
                    />
                  );
                }}
              />
              <Route
                path={['/trace_analytics', '/trace_analytics/home']}
                render={(props) => (
                  <TraceAnalyticsHome
                    {...props}
                    chrome={chrome}
                    http={http}
                    parentBreadcrumbs={[parentBreadcrumb]}
                  />
                )}
              />
              <Route
                path={['/', '/event_analytics']}
                render={(props) => {
                  return (
                    <EventAnalytics
                      chrome={chrome}
                      parentBreadcrumbs={[parentBreadcrumb]}
                      pplService={pplService}
                      dslService={dslService}
                      savedObjects={savedObjects}
                      timestampUtils={timestampUtils}
                      http={http}
                      notifications={notifications}
                      queryManager={queryManager}
                      {...props}
                    />
                  );
                }}
              />
            </Switch>
          </>
        </I18nProvider>
      </HashRouter>
    </Provider>
  );
};
