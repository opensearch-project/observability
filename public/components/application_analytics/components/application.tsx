/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

import {
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPanel,
  EuiSelectOption,
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
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { last } from 'lodash';
import { VisualizationType } from 'common/types/custom_panels';
import { TracesContent } from '../../../components/trace_analytics/components/traces/traces_content';
import { DashboardContent } from '../../../components/trace_analytics/components/dashboard/dashboard_content';
import { ServicesContent } from '../../trace_analytics/components/services/services_content';
import {
  filtersToDsl,
  PanelTitle,
} from '../../../../public/components/trace_analytics/components/common/helper_functions';
import { SpanDetailTable } from '../../../../public/components/trace_analytics/components/traces/span_detail_table';
import { Explorer } from '../../event_analytics/explorer/explorer';
import { Configuration } from './configuration';
import {
  TAB_CONFIG_ID,
  TAB_CONFIG_TITLE,
  TAB_LOG_ID,
  TAB_LOG_TITLE,
  TAB_OVERVIEW_ID,
  TAB_OVERVIEW_TITLE,
  TAB_PANEL_ID,
  TAB_PANEL_TITLE,
  TAB_SERVICE_ID,
  TAB_SERVICE_TITLE,
  TAB_TRACE_ID,
  TAB_TRACE_TITLE,
} from '../../../../common/constants/application_analytics';
import { TAB_EVENT_ID, TAB_CHART_ID, NEW_TAB } from '../../../../common/constants/explorer';
import { IQueryTab } from '../../../../common/types/explorer';
import { NotificationsStart } from '../../../../../../src/core/public';
import { AppAnalyticsComponentDeps } from '../home';
import { CustomPanelView } from '../../../../public/components/custom_panels/custom_panel_view';
import { ApplicationType } from '../../../../common/types/app_analytics';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import { ServiceDetailFlyout } from './flyout_components/service_detail_flyout';
import { SpanDetailFlyout } from '../../../../public/components/trace_analytics/components/traces/span_detail_flyout';
import { TraceDetailFlyout } from './flyout_components/trace_detail_flyout';
import { fetchAppById, initializeTabData } from '../helpers/utils';

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
  updateApp: (appId: string, updateAppData: Partial<ApplicationType>, type: string) => void;
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
    parentBreadcrumbs,
    query,
    filters,
    appConfigs,
    updateApp,
    setAppConfigs,
    setToasts,
    setFilters,
  } = props;
  const [application, setApplication] = useState<ApplicationType>({
    name: '',
    description: '',
    baseQuery: '',
    servicesEntities: [],
    traceGroups: [],
    panelId: '',
    availabilityVisId: '',
  });
  const dispatch = useDispatch();
  const [selectedTabId, setSelectedTab] = useState<string>(TAB_OVERVIEW_ID);
  const [serviceFlyoutName, setServiceFlyoutName] = useState<string>('');
  const [traceFlyoutId, setTraceFlyoutId] = useState<string>('');
  const [spanFlyoutId, setSpanFlyoutId] = useState<string>('');
  const [spanDSL, setSpanDSL] = useState<any>({});
  const [totalSpans, setTotalSpans] = useState<number>(0);
  const [editVizId, setEditVizId] = useState<string>('');
  const [visWithAvailability, setVisWithAvailability] = useState<EuiSelectOption[]>([]);
  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedTab(selectedTab.id);
  const [appStartTime, setAppStartTime] = useState<string>(
    sessionStorage.getItem(`${application.name}StartTime`) || 'now-24h'
  );
  const [appEndTime, setAppEndTime] = useState<string>(
    sessionStorage.getItem(`${application.name}EndTime`) || 'now'
  );

  const history = useHistory();

  const setStartTimeForApp = (newStartTime: string) => {
    setAppStartTime(newStartTime);
    sessionStorage.setItem(`${application.name}StartTime`, newStartTime);
  };
  const setEndTimeForApp = (newEndTime: string) => {
    setAppEndTime(newEndTime);
    sessionStorage.setItem(`${application.name}EndTime`, newEndTime);
  };

  const addSpanFilter = (field: string, value: any) => {
    const newFilters = [...filters];
    const index = newFilters.findIndex(({ field: filterField }) => field === filterField);
    if (index === -1) {
      newFilters.push({ field, operator: 'is', value, inverted: false, disabled: false });
    } else {
      newFilters.splice(index, 1, {
        field,
        operator: 'is',
        value,
        inverted: false,
        disabled: false,
      });
    }
    setFilters(newFilters);
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
      .then(() => {
        fetchAppById(
          http,
          pplService,
          appId,
          setApplication,
          setAppConfigs,
          setVisWithAvailability,
          setToasts
        );
      })
      .catch((err) => {
        setToasts(`Error in adding ${visualizationName} visualization to the panel`, 'danger');
        console.error(err);
      });
  };

  useEffect(() => {
    fetchAppById(
      http,
      pplService,
      appId,
      setApplication,
      setAppConfigs,
      setVisWithAvailability,
      setToasts
    );
    const tabId = `application-analytics-tab-${appId}`;
    initializeTabData(dispatch, tabId, NEW_TAB);
  }, [appId]);

  useEffect(() => {
    chrome.setBreadcrumbs([
      ...parentBreadcrumbs,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      },
      {
        text: application.name,
        href: `${last(parentBreadcrumbs)!.href}application_analytics/${appId}`,
      },
    ]);
    setStartTimeForApp(sessionStorage.getItem(`${application.name}StartTime`) || 'now-24h');
    setEndTimeForApp(sessionStorage.getItem(`${application.name}EndTime`) || 'now');
  }, [appId, application.name]);

  useEffect(() => {
    const DSL = filtersToDsl(filters, query, appStartTime, appEndTime, 'app', appConfigs);
    setSpanDSL(DSL);
  }, [filters, appConfigs, query, appStartTime, appEndTime]);

  useEffect(() => {
    if (selectedTabId !== TAB_LOG_ID) {
      switchToEditViz('');
    }
  }, [selectedTabId]);

  const openServiceFlyout = (serviceName: string) => {
    setSpanFlyoutId('');
    setTraceFlyoutId('');
    setServiceFlyoutName(serviceName);
  };

  const closeServiceFlyout = () => {
    setServiceFlyoutName('');
  };

  const openSpanFlyout = (spanId: string) => {
    setServiceFlyoutName('');
    setTraceFlyoutId('');
    setSpanFlyoutId(spanId);
  };

  const closeSpanFlyout = () => {
    setSpanFlyoutId('');
  };

  const openTraceFlyout = (traceId: string) => {
    setServiceFlyoutName('');
    setSpanFlyoutId('');
    setTraceFlyoutId(traceId);
  };

  const closeTraceFlyout = () => {
    setTraceFlyoutId('');
  };

  const childBreadcrumbs = [
    {
      text: 'Application analytics',
      href: '#/application_analytics',
    },
    {
      text: `${application.name}`,
      href: `#/application_analytics/${appId}`,
    },
  ];

  const getOverview = () => {
    return (
      <>
        <EuiSpacer size="m" />
        <DashboardContent
          {...props}
          page="app"
          startTime={appStartTime}
          endTime={appEndTime}
          setStartTime={setStartTimeForApp}
          setEndTime={setEndTimeForApp}
          childBreadcrumbs={childBreadcrumbs}
        />
      </>
    );
  };

  const nameColumnAction = (item: any) => openServiceFlyout(item);
  const traceColumnAction = () => switchToTrace();

  const getService = () => {
    return (
      <>
        <EuiSpacer size="m" />
        <ServicesContent
          {...props}
          page="app"
          nameColumnAction={nameColumnAction}
          traceColumnAction={traceColumnAction}
          childBreadcrumbs={childBreadcrumbs}
          startTime={appStartTime}
          endTime={appEndTime}
          setStartTime={setStartTimeForApp}
          setEndTime={setEndTimeForApp}
        />
      </>
    );
  };

  const switchToTrace = () => {
    setSelectedTab(TAB_TRACE_ID);
  };

  const traceIdColumnAction = (item: any) => openTraceFlyout(item);

  const getTrace = () => {
    return (
      <>
        <EuiSpacer size="m" />
        <TracesContent
          {...props}
          page="app"
          childBreadcrumbs={childBreadcrumbs}
          traceIdColumnAction={traceIdColumnAction}
          startTime={appStartTime}
          endTime={appEndTime}
          setStartTime={setStartTimeForApp}
          setEndTime={setEndTimeForApp}
        />
        <EuiSpacer size="m" />
        <EuiPanel>
          <PanelTitle title="Spans" totalItems={totalSpans} />
          <EuiHorizontalRule margin="m" />
          <SpanDetailTable
            http={http}
            hiddenColumns={[]}
            openFlyout={setSpanFlyoutId}
            DSL={spanDSL}
            setTotal={setTotalSpans}
          />
        </EuiPanel>
      </>
    );
  };

  const getLog = () => {
    return (
      <Explorer
        key={`explorer_application-analytics-tab`}
        pplService={pplService}
        dslService={dslService}
        tabId={`application-analytics-tab-${appId}`}
        savedObjects={savedObjects}
        timestampUtils={timestampUtils}
        setToast={setToasts}
        history={history}
        notifications={notifications}
        savedObjectId={editVizId}
        http={http}
        searchBarConfigs={searchBarConfigs}
        appId={appId}
        addVisualizationToPanel={addVisualizationToPanel}
        startTime={appStartTime}
        endTime={appEndTime}
        setStartTime={setStartTimeForApp}
        setEndTime={setEndTimeForApp}
        appBaseQuery={application.baseQuery}
        curSelectedTabId={selectedTabId}
      />
    );
  };

  const onEditClick = (savedVisualizationId: string) => {
    switchToEditViz(savedVisualizationId);
  };

  const updateAvailabilityVizId = (vizs: VisualizationType[]) => {
    if (!vizs.map((viz) => viz.savedVisualizationId).includes(application.availabilityVisId)) {
      updateApp(appId, { availabilityVisId: '' }, 'editAvailability');
    }
  };

  const getPanel = () => {
    return (
      <CustomPanelView
        panelId={application.panelId}
        http={http}
        pplService={pplService}
        dslService={dslService}
        chrome={chrome}
        parentBreadcrumbs={parentBreadcrumbs}
        childBreadcrumbs={childBreadcrumbs}
        // App analytics will not be renaming/cloning/deleting panels
        renameCustomPanel={async () => undefined}
        cloneCustomPanel={async () => Promise.reject()}
        deleteCustomPanel={async () => Promise.reject()}
        setToast={setToasts}
        page="app"
        appId={appId}
        updateAvailabilityVizId={updateAvailabilityVizId}
        startTime={appStartTime}
        endTime={appEndTime}
        setStartTime={setStartTimeForApp}
        setEndTime={setEndTimeForApp}
        onAddClick={switchToEvent}
        onEditClick={onEditClick}
      />
    );
  };

  const switchToEvent = () => {
    setSelectedTab(TAB_LOG_ID);
  };

  const switchToEditViz = (savedVizId: string) => {
    if (savedVizId) {
      setEditVizId(savedVizId);
      switchToEvent();
    } else {
      setEditVizId('');
    }
  };

  const getConfig = () => {
    return (
      <Configuration
        appId={appId}
        parentBreadcrumbs={parentBreadcrumbs}
        application={application}
        switchToEditViz={switchToEditViz}
        visWithAvailability={visWithAvailability}
        updateApp={updateApp}
      />
    );
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
          <EuiText data-test-subj={`${tabId}Tab`} size="s" textAlign="left" color="default">
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
                <h1 data-test-subj="applicationTitle">{application.name}</h1>
              </EuiTitle>
              <EuiText>
                <p>{application.description}</p>
              </EuiText>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiTabbedContent
            className="appAnalyticsTabs"
            initialSelectedTab={appAnalyticsTabs[0]}
            selectedTab={appAnalyticsTabs.find((tab) => {
              return tab.id === selectedTabId;
            })}
            onTabClick={(selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab)}
            tabs={appAnalyticsTabs}
          />
        </EuiPageBody>
        {serviceFlyoutName && (
          <ServiceDetailFlyout
            {...props}
            serviceName={serviceFlyoutName}
            startTime={appStartTime}
            endTime={appEndTime}
            closeServiceFlyout={closeServiceFlyout}
            openSpanFlyout={openSpanFlyout}
            setSelectedTab={setSelectedTab}
          />
        )}
        {spanFlyoutId && (
          <SpanDetailFlyout
            http={http}
            spanId={spanFlyoutId}
            isFlyoutVisible={!!spanFlyoutId}
            closeFlyout={closeSpanFlyout}
            addSpanFilter={addSpanFilter}
          />
        )}
        {traceFlyoutId && (
          <TraceDetailFlyout
            {...props}
            http={http}
            traceId={traceFlyoutId}
            closeTraceFlyout={closeTraceFlyout}
            openSpanFlyout={openSpanFlyout}
          />
        )}
      </EuiPage>
    </div>
  );
}
