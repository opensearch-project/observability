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
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import SavedObjects from 'public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from 'public/services/timestamp/timestamp';
import React, { ReactChild, useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Explorer } from '../../explorer/explorer';
import { Dashboard } from '../../trace_analytics/components/dashboard';
import { Services } from '../../trace_analytics/components/services';
import { Traces } from '../../trace_analytics/components/traces';
import { SpanDetailPanel } from '../../trace_analytics/components/traces/span_detail_panel';
import { Configuration } from './configuration';
import {
  APP_ANALYTICS_API_PREFIX,
  TAB_CONFIG_ID_TXT_PFX,
  TAB_CONFIG_TITLE,
  TAB_LOG_ID_TXT_PFX,
  TAB_LOG_TITLE,
  TAB_OVERVIEW_ID_TXT_PFX,
  TAB_OVERVIEW_TITLE,
  TAB_PANEL_ID_TXT_PFX,
  TAB_PANEL_TITLE,
  TAB_SERVICE_ID_TXT_PFX,
  TAB_SERVICE_TITLE,
  TAB_TRACE_ID_TXT_PFX,
  TAB_TRACE_TITLE,
} from '../../../../common/constants/application_analytics';
import { TAB_EVENT_ID, TAB_CHART_ID } from '../../../../common/constants/explorer';
import { IQueryTab } from '../../../../common/types/explorer';
import { NotificationsStart } from '../../../../../../src/core/public';
import { AppAnalyticsComponentDeps } from '../home';
import { CustomPanelView } from '../../../../public/components/custom_panels/custom_panel_view';
import { ApplicationType } from '../../../../common/types/app_analytics';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';

const TAB_OVERVIEW_ID = uniqueId(TAB_OVERVIEW_ID_TXT_PFX);
const TAB_SERVICE_ID = uniqueId(TAB_SERVICE_ID_TXT_PFX);
const TAB_TRACE_ID = uniqueId(TAB_TRACE_ID_TXT_PFX);
const TAB_LOG_ID = uniqueId(TAB_LOG_ID_TXT_PFX);
const TAB_PANEL_ID = uniqueId(TAB_PANEL_ID_TXT_PFX);
const TAB_CONFIG_ID = uniqueId(TAB_CONFIG_ID_TXT_PFX);
const searchBarConfigs = {
  [TAB_EVENT_ID]: {
    showSaveButton: false,
    showSavePanelOptionsList: false,
  },
  [TAB_CHART_ID]: {
    showSaveButton: true,
    showSavePanelOptionsList: false,
  },
};

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
  setToasts: (title: string, color?: string, text?: ReactChild) => void;
}

export function Application(props: AppDetailProps) {
  const {
    pplService,
    dslService,
    timestampUtils,
    savedObjects,
    http,
    notifications,
    appId,
    chrome,
    parentBreadcrumb,
    setFilters,
    setToasts,
  } = props;
  const [application, setApplication] = useState<ApplicationType>({
    name: '',
    description: '',
    baseQuery: '',
    servicesEntities: [],
    traceGroups: [],
    panelId: '',
  });
  const [selectedTabId, setSelectedTab] = useState<string>(TAB_OVERVIEW_ID);
  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedTab(selectedTab.id);
  const history = useHistory();

  // Fetch application by id
  const fetchAppById = async (appId: string) => {
    return http
      .get(`${APP_ANALYTICS_API_PREFIX}/${appId}`)
      .then((res) => {
        setApplication(res.application);
        const serviceFilters = res.application.servicesEntities.map((ser: string) => {
          return {
            field: 'serviceName',
            operator: 'is',
            value: ser,
            inverted: false,
            disabled: false,
          };
        });
        const traceFilters = res.application.traceGroups.map((tra: string) => {
          return {
            field: 'traceGroup',
            operator: 'is',
            value: tra,
            inverted: false,
            disabled: false,
          };
        });
        setFilters([...serviceFilters, ...traceFilters]);
      })
      .catch((err) => {
        setToasts('Error occurred while fetching application', 'danger');
        console.error(err);
      });
  };

  // Add visualization to application's panel
  const addVisualizationToPanel = async (visualizationId: string, visualizationName: string) => {
    return http
      .post(`${CUSTOM_PANELS_API_PREFIX}/visualizations`, {
        body: JSON.stringify({
          panelId: application.panelId,
          savedVisualizationId: visualizationId,
        }),
      })
      .catch((err) => {
        setToasts(`Error in adding ${visualizationName} visualization to the panel`, 'danger');
        console.error(err);
      });
  }

  useEffect(() => {
    fetchAppById(appId);
  }, [appId]);

  useEffect(() => {
    chrome.setBreadcrumbs([
      parentBreadcrumb,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      },
      {
        text: application.name,
        href: `${parentBreadcrumb.href}${appId}`,
      },
    ]);
  }, [appId, application.name]);

  const getOverview = () => {
    return <Dashboard {...props} page="app" appId={appId} appName={application.name} />;
  };

  const getService = () => {
    return <Services {...props} page="app" appId={appId} appName={application.name} />;
  };

  const getTrace = () => {
    return (
      <>
        <Traces {...props} page="app" appId={appId} appName={application.name} />
        <EuiSpacer size="m" />
        <SpanDetailPanel {...props} traceId="id" colorMap="color" />
      </>
    );
  };

  const getLog = () => {
    return (
      <Explorer
        key={`explorer_application-analytics-tab`}
        pplService={pplService}
        dslService={dslService}
        tabId={'application-analytics-tab'}
        savedObjects={savedObjects}
        timestampUtils={timestampUtils}
        setToast={setToasts}
        history={history}
        notifications={notifications}
        savedObjectId={''}
        http={http}
        searchBarConfigs={searchBarConfigs}
        appId={appId}
        addVisualizationToPanel={addVisualizationToPanel}
      />
    );
  };

  const getPanel = () => {
    return (
      <CustomPanelView
        panelId={application.panelId}
        http={http}
        pplService={pplService}
        chrome={chrome}
        parentBreadcrumb={[parentBreadcrumb]}
        // App analytics will not be renaming/cloning/deleting panels
        renameCustomPanel={() => undefined}
        cloneCustomPanel={(): Promise<string> => Promise.reject()}
        deleteCustomPanel={(): Promise<string> => Promise.reject()}
        setToast={setToasts}
        page="app"
        appName={application.name}
        appId={appId}
      />
    );
  };

  const getConfig = () => {
    return <Configuration />;
  };

  function getAppAnalyticsTab({
    tabId,
    tabTitle,
    getContent,
  }: {
    tabId: string;
    tabTitle: string;
    getContent: () => JSX.Element;
  }) {
    return {
      id: tabId,
      name: (
        <>
          <EuiText size="s" textAlign="left" color="default">
            <span className="tab-title">{tabTitle}</span>
          </EuiText>
        </>
      ),
      content: <>{getContent()}</>,
    };
  }

  const appAnalyticsTabs = [
    getAppAnalyticsTab({
      tabId: TAB_OVERVIEW_ID,
      tabTitle: TAB_OVERVIEW_TITLE,
      getContent: () => getOverview(),
    }),
    getAppAnalyticsTab({
      tabId: TAB_SERVICE_ID,
      tabTitle: TAB_SERVICE_TITLE,
      getContent: () => getService(),
    }),
    getAppAnalyticsTab({
      tabId: TAB_TRACE_ID,
      tabTitle: TAB_TRACE_TITLE,
      getContent: () => getTrace(),
    }),
    getAppAnalyticsTab({
      tabId: TAB_LOG_ID,
      tabTitle: TAB_LOG_TITLE,
      getContent: () => getLog(),
    }),
    getAppAnalyticsTab({
      tabId: TAB_PANEL_ID,
      tabTitle: TAB_PANEL_TITLE,
      getContent: () => getPanel(),
    }),
    getAppAnalyticsTab({
      tabId: TAB_CONFIG_ID,
      tabTitle: TAB_CONFIG_TITLE,
      getContent: () => getConfig(),
    }),
  ];

  return (
    <div>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>{application.name}</h1>
              </EuiTitle>
              <EuiText>
                <p>{application.description}</p>
              </EuiText>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiTabbedContent
            className="appAnalyticsTabs"
            initialSelectedTab={appAnalyticsTabs[0]}
            selectedTab={appAnalyticsTabs.find((tab) => tab.id === selectedTabId)}
            onTabClick={(selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab)}
            tabs={appAnalyticsTabs}
          />
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}
