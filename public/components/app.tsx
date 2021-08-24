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

import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { I18nProvider } from '@osd/i18n/react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from '../framework/redux/store';
import { CoreStart } from '../../../../src/core/public';
import { renderPageWithSidebar } from './common/side_nav';
import { Home as ApplicationAnalyticsHome } from './application_analytics/home';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';
import { Home as CustomPanelsHome } from './custom_panels/home';
import { CustomPanelView } from './custom_panels/custom_panel_view';
import { Home as EventExplorerHome } from './explorer/home';
import { LogExplorer } from './explorer/logExplorer';
import { observabilityTitle } from '../../common';

interface ObservabilityAppDeps {
  CoreStart: CoreStart;
  pplService: any;
}

export const App = ({ CoreStart, pplService }: ObservabilityAppDeps) => {
  const { chrome, http } = CoreStart;
  const parentBreadcrumb = {
    text: observabilityTitle,
    href: 'observability#/',
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
                exact
                path={['/', '/application_analytics', '/application_analytics/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Application analytics',
                      href: '#/application_analytics',
                    },
                  ]);
                  return renderPageWithSidebar(<ApplicationAnalyticsHome />, 1);
                }}
              />
              <Route
                path={['/trace_analytics', '/trace_analytics/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Trace analytics',
                      href: '#/trace_analytics/home',
                    },
                  ]);
                  return renderPageWithSidebar(<TraceAnalyticsHome />, 2);
                }}
              />
              <Route
                exact
                path={['/explorer', '/explorer/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Event analytics',
                      href: '#/explorer/home',
                    },
                  ]);
                  return renderPageWithSidebar(<EventExplorerHome />, 3);
                }}
              />
              <Route 
                path={['/operational_panels']}
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
                exact
                path="/explorer/events"
                render={(props) => <LogExplorer pplService={pplService} />}
              />
            </Switch>
          </>
        </I18nProvider>
      </HashRouter>
    </Provider>
  );
};
