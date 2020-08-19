import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';
import { I18nProvider } from '@kbn/i18n/react';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart, IUiSettingsClient } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { SideNav } from './common/side_nav';
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

export const renderPageWithSidebar = (BodyComponent: JSX.Element, activeId = 1) => {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav activeId={activeId} />
      </EuiPageSideBar>
      <EuiPageBody>{BodyComponent}</EuiPageBody>
    </EuiPage>
  );
};

export interface CoreDeps {
  http: CoreStart['http'];
  uiSettings: IUiSettingsClient;
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
}

export const TraceAnalyticsApp = ({
  basename,
  notifications,
  http,
  uiSettings,
  chrome,
  navigation,
}: TraceAnalyticsAppDeps) => {
  const [query, setQuery] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('now-5m');
  const [endTime, setEndTime] = useState<string>('now');
  return (
    <HashRouter basename={basename}>
      <I18nProvider>
        <>
          <Switch>
            <Route
              exact
              path={['/dashboard', '/']}
              render={(props) =>
                renderPageWithSidebar(
                  <Dashboard
                    setBreadcrumbs={chrome.setBreadcrumbs}
                    http={http}
                    uiSettings={uiSettings}
                    query={query}
                    setQuery={setQuery}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                  />,
                  1
                )
              }
            />
            <Route
              exact
              path="/traces"
              render={(props) =>
                renderPageWithSidebar(
                  <Traces
                    setBreadcrumbs={chrome.setBreadcrumbs}
                    http={http}
                    uiSettings={uiSettings}
                    query={query}
                    setQuery={setQuery}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                  />,
                  2
                )
              }
            />
            <Route
              path="/traces/:id"
              render={(props) => (
                <TraceView
                  setBreadcrumbs={chrome.setBreadcrumbs}
                  http={http}
                  uiSettings={uiSettings}
                  traceId={props.match.params.id}
                />
              )}
            />
            <Route
              exact
              path="/services"
              render={(props) =>
                renderPageWithSidebar(
                  <Services
                    setBreadcrumbs={chrome.setBreadcrumbs}
                    http={http}
                    uiSettings={uiSettings}
                    query={query}
                    setQuery={setQuery}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                  />,
                  3
                )
              }
            />
            <Route
              path="/services/:id"
              render={(props) => (
                <ServiceView
                  setBreadcrumbs={chrome.setBreadcrumbs}
                  http={http}
                  uiSettings={uiSettings}
                  serviceId={props.match.params.id}
                  query={query}
                  setQuery={setQuery}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                />
              )}
            />
          </Switch>
        </>
      </I18nProvider>
    </HashRouter>
  );
};
