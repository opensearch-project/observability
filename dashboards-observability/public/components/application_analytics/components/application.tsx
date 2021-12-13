/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    EuiPage,
    EuiPageBody,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiSpacer,
    EuiTabbedContent,
    EuiTabbedContentTab,
    EuiText,
    EuiTitle,
  } from '@elastic/eui';
import { LogExplorer } from '../../explorer/log_explorer';
import { Dashboard } from '../../trace_analytics/components/dashboard';
import { Services } from '../../trace_analytics/components/services';
import { Traces } from '../../trace_analytics/components/traces';
import { SpanDetailPanel } from '../../trace_analytics/components/traces/span_detail_panel';
import { Configuration } from './configuration';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';
import React, { ReactChild, useMemo, useState } from 'react';
import { isEmpty, uniqueId } from 'lodash';
import { 
  TAB_CONFIG_ID_TXT_PFX, 
  TAB_CONFIG_TITLE, 
  TAB_LOG_ID_TXT_PFX, 
  TAB_LOG_TITLE, 
  TAB_OVERVIEW_ID_TXT_PFX, 
  TAB_OVERVIEW_TITLE, 
  TAB_SERVICE_ID_TXT_PFX, 
  TAB_SERVICE_TITLE, 
  TAB_TRACE_ID_TXT_PFX, 
  TAB_TRACE_TITLE 
} from '../../../../common/constants/application_analytics';
import { EmptyTabParams, IQueryTab } from '../../../../common/types/explorer';
import { useHistory } from 'react-router-dom';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import { RAW_QUERY } from '../../../../common/constants/explorer';
import { NotificationsStart } from '../../../../../../src/core/public';
import { AppAnalyticsComponentDeps } from '../home';


const TAB_OVERVIEW_ID = uniqueId(TAB_OVERVIEW_ID_TXT_PFX);
const TAB_SERVICE_ID = uniqueId(TAB_SERVICE_ID_TXT_PFX);
const TAB_TRACE_ID = uniqueId(TAB_TRACE_ID_TXT_PFX);
const TAB_LOG_ID = uniqueId(TAB_LOG_ID_TXT_PFX);
const TAB_CONFIG_ID = uniqueId(TAB_CONFIG_ID_TXT_PFX);

export interface DetailTab {
  id: string;
  label: string;
  description: string;
  onClick: () => void;
  testId: string;
}

interface AppDetailProps extends AppAnalyticsComponentDeps {
  disabled?: boolean;
  appId: string;
  pplService: PPLService;
  dslService: DSLService;
  savedObjects: SavedObjects;
  timestampUtils: TimestampUtils;
  notifications: NotificationsStart;
}


export function Application(props: AppDetailProps) {
  const { pplService, dslService, timestampUtils, savedObjects, http, notifications } = props;
  const [selectedTabId, setSelectedTab] = useState<string>(TAB_OVERVIEW_ID);
  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedTab(selectedTab.id);
  const history = useHistory();
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const setToast = (title: string, color = 'success', text?: ReactChild, side?: string) => {
    if (!text) text = '';
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  const getExistingEmptyTab = ({tabIds, queries, explorerData}: EmptyTabParams) => {
    let emptyTabId = '';
    for (let i = 0; i < tabIds!.length; i++) {
      const tid = tabIds![i];
      if (isEmpty(queries[tid][RAW_QUERY]) && isEmpty(explorerData[tid])) {
        emptyTabId = tid;
        break;
      }
    }
    return emptyTabId;
  };


  const getOverview = () => {
    return (
      <Dashboard {...props} page="app" appId="id" appName="Cool Application" />
    );
  };

  const getService = () => {
    return (
      <Services {...props} page="app" appId="id" appName="Cool Application" />
    );
  };

  const getTrace = () => {
    return (
      <>
      <Traces {...props} page="app" appId="id" appName="Cool Application" />
      <EuiSpacer size='m'/>
      <SpanDetailPanel
        {...props}
        traceId="id"
        colorMap="color" 
      />
    </>
    );
  };

  const getLog = () => {
    return (
      <LogExplorer 
        pplService={pplService}
        dslService={dslService}
        savedObjects={savedObjects}
        timestampUtils={timestampUtils}
        http={http} 
        history={history} 
        notifications={notifications} 
        setToast={setToast}
        // App Analytics will not be saving queries on Log Events
        savedObjectId={''} 
        getExistingEmptyTab={getExistingEmptyTab}
        />
    );
  };

  const getConfig = () => {
    return (
      <Configuration />
    );
  };

  function getAppAnalyticsTab ({
    tabId,
    tabTitle,
    getContent
  }: {
    tabId: string,
    tabTitle: string,
    getContent: () => JSX.Element
  }) {
    return {
      id: tabId,
      name: (<>
              <EuiText
                size="s"
                textAlign="left"
                color="default"
              >
                <span className="tab-title">{ tabTitle }</span>
              </EuiText>
            </>),
      content: (
        <>
          { getContent() }
        </>)
    };
  };

  const getAppAnalyticsTabs = () => {
    return [
        getAppAnalyticsTab(
          {
            tabId: TAB_OVERVIEW_ID,
            tabTitle: TAB_OVERVIEW_TITLE,
            getContent: () => getOverview()
          }
        ),
        getAppAnalyticsTab(
          {
            tabId: TAB_SERVICE_ID,
            tabTitle: TAB_SERVICE_TITLE,
            getContent: () => getService()
          }
        ),
        getAppAnalyticsTab(
          {
            tabId: TAB_TRACE_ID,
            tabTitle: TAB_TRACE_TITLE,
            getContent: () => getTrace()
          }
        ),
        getAppAnalyticsTab(
          {
            tabId: TAB_LOG_ID,
            tabTitle: TAB_LOG_TITLE,
            getContent: () => getLog()
          }
        ),
        getAppAnalyticsTab(
          {
            tabId: TAB_CONFIG_ID,
            tabTitle: TAB_CONFIG_TITLE,
            getContent: () => getConfig()
          }
        )
    ];
  };
  

  const memorizedAppAnalyticsTabs = useMemo(() => {
    return getAppAnalyticsTabs();
  },
  []);

  return (
    <div>
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>my-app1</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiTabbedContent
          className="appAnalyticsTabs"
          initialSelectedTab={ memorizedAppAnalyticsTabs[0] }
          selectedTab={ memorizedAppAnalyticsTabs.find(tab => { tab.id === selectedTabId }) }
          onTabClick={ (selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab) }
          tabs={ memorizedAppAnalyticsTabs }
      />
      </EuiPageBody>
    </EuiPage>
    </div>
  );
}
