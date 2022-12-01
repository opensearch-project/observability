/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, Switch, useHistory } from 'react-router-dom';
import { Home as ApplicationAnalyticsHome } from './application_analytics/home';
import { Main as NotebooksHome } from './notebooks/components/main';
import { Home as CustomPanelsHome } from './custom_panels/home';
import { Home as TraceAnalyticsHome } from './trace_analytics/home';
import { EventAnalytics } from './event_analytics';
import { I18nProvider } from '@osd/i18n/react';
import React, { useEffect } from 'react';
import { ObservabilityAppDeps } from './app';
import { observabilityID, observabilityTitle } from '../../common/constants/shared';

export const AppRoutesWrapper = ({
  coreStart,
  depsStart,
  pplService,
  dslService,
  savedObjects,
  timestampUtils,
  queryManager,
  startPage,
}: ObservabilityAppDeps) => {
  const { chrome, http, notifications } = coreStart;
  const parentBreadcrumb = {
    text: observabilityTitle,
    href: `${observabilityID}#/`,
  };

  const customPanelBreadcrumb = {
    text: 'Operational panels',
    href: '#/operational_panels/',
  };

  const history = useHistory();
  useEffect(() => {
    if (startPage && history) {
      history.replace(startPage!);
    }
  }, []);

  return (
    <I18nProvider>
      <>
        <Switch>
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
                  depsStart.dashboard.DashboardContainerByValueRenderer
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
  );
};
