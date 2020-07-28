import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import { Dashboard } from './dashboard/dashboard';
import { EuiPage, EuiPageSideBar, EuiPageBody } from '@elastic/eui';
import { Traces } from './traces/traces';
import { Services } from './services/services';
import { EuiText } from '@elastic/eui';
import { EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiLink } from '@elastic/eui';
import { SideNav } from './common/side_nav';
import { TraceView } from './traces/trace_view';
import { ServiceView } from './services/service_view';

interface TraceAnalyticsAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  navigation: NavigationPublicPluginStart;
}

export const renderPageWithSidebar = (BodyComponent, activeId=1) => {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav activeId={activeId} />
      </EuiPageSideBar>
      <EuiPageBody>
        {BodyComponent}
      </EuiPageBody>
    </EuiPage>
  )
}

export const TraceAnalyticsApp = ({
  basename,
  notifications,
  http,
  chrome,
  navigation,
}: TraceAnalyticsAppDeps) => {
  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <HashRouter basename={basename}>
      <I18nProvider>
        <>
          <Switch>
            <Route
              exact path={['/dashboard', '/']}
              render={(props) => (
                renderPageWithSidebar(<Dashboard setBreadcrumbs={chrome.setBreadcrumbs} />, 1)
              )}
            />
            <Route
              exact path='/traces'
              render={(props) => (
                renderPageWithSidebar(<Traces setBreadcrumbs={chrome.setBreadcrumbs} />, 2)
              )}
            />
            <Route
              path='/traces/:id'
              render={(props) => (
                <TraceView setBreadcrumbs={chrome.setBreadcrumbs} traceId={props.match.params.id} />
              )}
            />
            <Route
              exact path='/services'
              render={(props) => (
                renderPageWithSidebar(<Services setBreadcrumbs={chrome.setBreadcrumbs} />, 3)
              )}
            />
            <Route
              path='/services/:id'
              render={(props) => (
                <ServiceView setBreadcrumbs={chrome.setBreadcrumbs} serviceId={props.match.params.id} />
              )}
            />
          </Switch>
        </>
      </I18nProvider>
    </HashRouter>
  );
};
