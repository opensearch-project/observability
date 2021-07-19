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

import  React, { useState, useRef } from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { I18nProvider } from '@osd/i18n/react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { store } from '../framework/redux/store';

import { CoreStart } from '../../../../src/core/public';
import { renderPageWithSidebar } from './common/side_nav';
import { Home as ApplicationAnalyticsHome } from './application_analytics/home';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';
import { Home as OperationalPanelsHome} from './operational_panels/home';
import { Home as EventExplorerHome } from './explorer/home';
import { LogExplorer } from './explorer/logExplorer';
import { observabilityTitle  } from '../../common';
import {
  ITabQueryResults,
  ITabQueries,
  IExplorerTabFields
} from '../common/types/explorer';
import {
  TAB_ID_TXT_PFX,
  RAW_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../common/constants/explorer';

interface ObservabilityAppDeps {
  CoreStart: CoreStart;
}

export const App = ({
  CoreStart
}: ObservabilityAppDeps) => {

  const { chrome, http } = CoreStart;

  // event explorer states
  const initialTabId: string = getTabId(TAB_ID_TXT_PFX);
  const [tabIds, setTabIds] = useState<Array<string>>([initialTabId]);
  const [queries, setQueries] = useState<ITabQueries>({
    [initialTabId]: {
      [RAW_QUERY]: ''
    }
  });
  const [queryResults, setQueryResults] = useState<ITabQueryResults>({
    [initialTabId]: {}
  });
  const [fields, setFields] = useState<IExplorerTabFields>({
    [initialTabId]: {
      [SELECTED_FIELDS]: [],
      [UNSELECTED_FIELDS]: []
    }
  });
  const curQueriesRef = useRef(queries);
  const [curSelectedTabId, setCurSelectedTab] = useState<string>(initialTabId);

  function getTabId (prefix: string) {
    return _.uniqueId(prefix);
  }

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
                  return renderPageWithSidebar(<EventExplorerHome />, 3);
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
                  http={ http }
                  tabIds={ tabIds }
                  queries={ queries }
                  queryResults={ queryResults }
                  fields={ fields }
                  curQueriesRef={ curQueriesRef }
                  curSelectedTabId={ curSelectedTabId }
                  setTabIds={ setTabIds }
                  setQueries={ setQueries }
                  setQueryResults={ setQueryResults }
                  setFields={ setFields }
                  setCurSelectedTab={ setCurSelectedTab }
                /> }
              />
            </Switch>
          </>
        </I18nProvider>
      </HashRouter>
    </Provider>
  );
};