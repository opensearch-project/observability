/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiGlobalToastList } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import { isEmpty } from 'lodash';
import React, { ReactChild, useState } from 'react';
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom';
import { RAW_QUERY } from '../../../common/constants/explorer';
import { ObservabilitySideBar } from '../common/side_nav';
import { Home as EventExplorerHome } from './home';
import { LogExplorer } from './log_explorer';

export const EventAnalytics = ({
  chrome,
  parentBreadcrumb,
  pplService,
  dslService,
  savedObjects,
  timestampUtils,
  http,
  ...props
}: any) => {
  const history = useHistory();
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const eventAnalyticsBreadcrumb = {
    text: 'Event analytics',
    href: '#/event_analytics',
  };

  const setToast = (title: string, color = 'success', text?: ReactChild, side?: string) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  const getExistingEmptyTab = ({ tabIds, queries, explorerData }) => {
    let emptyTabId = '';
    for (let i = 0; i < tabIds.length; i++) {
      const tid = tabIds[i];
      if (isEmpty(queries[tid][RAW_QUERY]) && isEmpty(explorerData[tid])) {
        emptyTabId = tid;
        break;
      }
    }
    return emptyTabId;
  };

  return (
    <>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        toastLifeTimeMs={6000}
      />
      <HashRouter>
        <Switch>
          <Route
            path={[`/event_analytics/explorer/:id`, `/event_analytics/explorer`]}
            render={(props) => {
              chrome.setBreadcrumbs([
                parentBreadcrumb,
                eventAnalyticsBreadcrumb,
                {
                  text: 'Explorer',
                  href: `#/event_analytics/explorer`,
                },
              ]);
              return (
                <LogExplorer
                  savedObjectId={props.match.params.id}
                  pplService={pplService}
                  dslService={dslService}
                  savedObjects={savedObjects}
                  timestampUtils={timestampUtils}
                  http={http}
                  setToast={setToast}
                  chrome={chrome}
                  getExistingEmptyTab={getExistingEmptyTab}
                  history={history}
                />
              );
            }}
          />
          <Route
            exact
            path={['/', '/event_analytics']}
            render={(props) => {
              chrome.setBreadcrumbs([
                parentBreadcrumb,
                eventAnalyticsBreadcrumb,
                {
                  text: 'Home',
                  href: '#/event_analytics',
                },
              ]);
              return (
                <ObservabilitySideBar>
                  <EventExplorerHome
                    http={http}
                    savedObjects={savedObjects}
                    dslService={dslService}
                    timestampUtils={timestampUtils}
                    setToast={setToast}
                    getExistingEmptyTab={getExistingEmptyTab}
                    history={history}
                  />
                </ObservabilitySideBar>
              );
            }}
          />
        </Switch>
      </HashRouter>
    </>
  );
};
