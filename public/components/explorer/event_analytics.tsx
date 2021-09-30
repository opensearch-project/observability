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
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LogExplorer } from './log_explorer';
import { Home as EventExplorerHome } from './home';
import { renderPageWithSidebar } from '../common/side_nav';

export const EventAnalytics = ({
  chrome,
  parentBreadcrumb,
  pplService,
  dslService,
  ...props
}: any) => {

  const eventAnalyticsBreadcrumb = {
    text: 'Event analytics',
    href: '#/event_analytics',
  };

  return (
    <HashRouter>
      <Switch>
        <Route
          path={`${props.match.path}/explorer`}
          render={(props) => {
            chrome.setBreadcrumbs([
              parentBreadcrumb,
              eventAnalyticsBreadcrumb,
              {
                text: 'Explorer',
                href: '#/event_analytics/explorer',
              },
            ]);
            return (
              <LogExplorer
                pplService={ pplService }
                dslService={ dslService }
              />
            );
          }}
        />
        <Route 
          path={props.match.path}
          render={(props) => {
            chrome.setBreadcrumbs([
              parentBreadcrumb,
              eventAnalyticsBreadcrumb,
              {
                text: 'Home',
                href: '#/event_analytics',
              }
            ]);
            return renderPageWithSidebar(<EventExplorerHome />);
          }}
        />
      </Switch>
    </HashRouter>
  );
}