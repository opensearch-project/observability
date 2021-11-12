/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { I18nProvider } from '@osd/i18n/react';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CoreStart } from '../../../../src/core/public';
import { observabilityID, observabilityTitle } from '../../common/constants/shared';
import store from '../framework/redux/store';
import { AppPluginStartDependencies } from '../types';
import { Home as CustomPanelsHome } from './custom_panels/home';
import { EventAnalytics } from './explorer/event_analytics';
import { Main as NotebooksHome } from './notebooks/components/main';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';

interface ObservabilityAppDeps {
  CoreStart: CoreStart;
  DepsStart: AppPluginStartDependencies;
  pplService: any;
  dslService: any;
  savedObjects: any;
  timestampUtils: any;
}

export const App = ({
  CoreStart,
  DepsStart,
  pplService,
  dslService,
  savedObjects,
  timestampUtils
}: ObservabilityAppDeps) => {
  const { chrome, http, notifications } = CoreStart;
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
                path="/notebooks"
                render={(props) => (
                  <NotebooksHome
                    {...props}
                    DashboardContainerByValueRenderer={
                      DepsStart.dashboard.DashboardContainerByValueRenderer
                    }
                    http={http}
                    setBreadcrumbs={chrome.setBreadcrumbs}
                    parentBreadcrumb={parentBreadcrumb}
                    notifications={notifications}
                  />
                )}
              />
              <Route
                path="/event_analytics"
                render={(props) => {
                  return (
                    <EventAnalytics
                      chrome={ chrome }
                      parentBreadcrumb={ parentBreadcrumb }
                      pplService={ pplService }
                      dslService={ dslService }
                      savedObjects={ savedObjects }
                      timestampUtils={ timestampUtils }
                      http={ http }
                      { ...props }
                    />
                  );
                }}
              />
              <Route
                path="/operational_panels"
                render={(props) => {
                  chrome.setBreadcrumbs([parentBreadcrumb, customPanelBreadcrumb]);
                  return (
                    <CustomPanelsHome
                      http={http}
                      chrome={chrome}
                      parentBreadcrumb={[parentBreadcrumb, customPanelBreadcrumb]}
                      pplService={pplService}
                      renderProps={props}
                    />
                  );
                }}
              />
              <Route
                path={['/', '/trace_analytics', '/trace_analytics/home']}
                render={(props) => (
                  <TraceAnalyticsHome
                    {...props}
                    chrome={chrome}
                    http={http}
                    parentBreadcrumb={parentBreadcrumb}
                  />
                )}
              />
            </Switch>
          </>
        </I18nProvider>
      </HashRouter>
    </Provider>
  );
};
