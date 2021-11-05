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

import React, { useState, ReactChild } from 'react';
import { isEmpty } from 'lodash';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import { EuiGlobalToastList } from '@elastic/eui';
import { LogExplorer } from './log_explorer';
import { Home as EventExplorerHome } from './home';
import { renderPageWithSidebar } from '../common/side_nav';
import { RAW_QUERY } from '../../../common/constants/explorer';

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
      if (
        isEmpty(queries[tid][RAW_QUERY]) &&
        isEmpty(explorerData[tid])
      ) {
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
            path={[`${props.match.path}/explorer/:id`, `${props.match.path}/explorer`]}
            render={(props) => {
              const breadcrumbPath = [
                parentBreadcrumb,
                eventAnalyticsBreadcrumb,
                {
                  text: 'Explorer',
                  href: `#/event_analytics/explorer`,
                }
              ];
              chrome.setBreadcrumbs(breadcrumbPath);
              return (
                <LogExplorer
                  savedObjectId={props.match.params.id}
                  pplService={ pplService }
                  dslService={ dslService }
                  savedObjects={ savedObjects }
                  timestampUtils={ timestampUtils }
                  http={ http }
                  setToast={ setToast }
                  chrome={chrome}
                  getExistingEmptyTab={getExistingEmptyTab}
                />
              );
            }}
          />
          <Route
            exact
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
              return renderPageWithSidebar(
                <EventExplorerHome 
                  http={http} 
                  savedObjects={savedObjects}
                  dslService={dslService}
                  timestampUtils={timestampUtils}
                  setToast={ setToast }
                  getExistingEmptyTab={getExistingEmptyTab}
                />
              );
            }}
          />
        </Switch>
      </HashRouter>
    </>
  );
}