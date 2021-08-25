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

import  React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { I18nProvider } from '@osd/i18n/react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from '../framework/redux/store';
import { CoreStart } from '../../../../src/core/public';
import { renderPageWithSidebar } from './common/side_nav';
import { Home as ApplicationAnalyticsHome } from './application_analytics/home';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';
import { Home as OperationalPanelsHome} from './operational_panels/home';
import { Home as EventExplorerHome } from './explorer/home';
import { LogExplorer } from './explorer/logExplorer';
import { observabilityTitle  } from '../../common';

interface ObservabilityAppDeps {
  CoreStart: CoreStart;
  pplService: any
  dslService: any
}

export const App = ({
  CoreStart,
  pplService,
  dslService
}: ObservabilityAppDeps) => {

  const { chrome, http } = CoreStart;
  const parentBreadcrumb = {
    text: observabilityTitle,
    href: 'observability#/'
  };

  return (
    <Provider store={ store }>
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
                      href: '#/application_analytics'
                    },
                  ]);
                  return renderPageWithSidebar(<ApplicationAnalyticsHome />, 1);
                } }
              />
              <Route
                path={['/trace_analytics', '/trace_analytics/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Trace analytics',
                      href: '#/trace_analytics/home'
                    },
                  ]);
                  return renderPageWithSidebar(<TraceAnalyticsHome />, 2) }
                }
              />
              <Route 
                exact
                path={['/event/', '/event/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Event analytics',
                      href: '#/event/home'
                    },
                  ]);
                  return renderPageWithSidebar(<EventExplorerHome
                    pplService = {pplService}
                    dslService = {dslService} 
                    />, 3);
                } }
              />
              <Route
                path={['/operational_panels', '/operational_panels/home']}
                render={(props) => {
                  chrome.setBreadcrumbs([
                    parentBreadcrumb,
                    {
                      text: 'Operational panels',
                      href: '#/operational_panels/home'
                    },
                  ]);
                  return renderPageWithSidebar(<OperationalPanelsHome />, 4);
                } }
              />
              <Route 
                exact
                path='/event/explorer'
                render={(props) => <LogExplorer
                  pplService={ pplService }
                  dslService={ dslService }
                /> }
              />
            </Switch>
          </>
        </I18nProvider>
      </HashRouter>
    </Provider>
  );
};