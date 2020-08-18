import { EuiPage, EuiPageBody, EuiPageSideBar } from '@elastic/eui';
import { I18nProvider } from '@kbn/i18n/react';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CoreStart, ChromeBreadcrumb } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { SideNav } from './common/side_nav';
import { Dashboard } from './dashboard/dashboard';
import { Services } from './services/services';
import { ServiceView } from './services/service_view';
import { Traces } from './traces/traces';
import { TraceView } from './traces/trace_view';

interface TraceAnalyticsAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
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

export type setBreadcrumbsType = (newBreadcrumbs: ChromeBreadcrumb[]) => void;

export const TraceAnalyticsApp = ({
  basename,
  notifications,
  http,
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
                <TraceView setBreadcrumbs={chrome.setBreadcrumbs} traceId={props.match.params.id} />
              )}
            />
            <Route
              exact
              path="/services"
              render={(props) =>
                renderPageWithSidebar(
                  <Services
                    setBreadcrumbs={chrome.setBreadcrumbs}
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
