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

import React, { useState, useMemo, useCallback } from 'react';
import _ from 'lodash';
import { 
  FormattedMessage 
} from '@osd/i18n/react';
import {
  EuiText,
  EuiButtonIcon,
  EuiTabbedContent,
  EuiTabbedContentTab
} from '@elastic/eui';
import classNames from 'classnames';
import { Search } from '../common/seach/search';
import { CountDistribution } from '../visualizations/visualization/countDistribution';
import { DataGrid } from './dataGrid';
import { Sidebar } from './sidebar';
import { NoResults } from './noResults';
import { HitsCounter } from './hits_counter/hits_counter';
import { ExplorerVisualizations } from './visualizations';
import {
  IField,
  IExplorerProps,
  IQueryTab
} from '../../common/types/explorer';
import {
  TAB_CHART_TITLE,
  TAB_EVENT_TITLE,
  TAB_EVENT_ID_TXT_PFX,
  TAB_CHART_ID_TXT_PFX
} from '../../common/constants/explorer';

const TAB_EVENT_ID = _.uniqueId(TAB_EVENT_ID_TXT_PFX);
const TAB_CHART_ID = _.uniqueId(TAB_CHART_ID_TXT_PFX);

export const Explorer = (props: IExplorerProps) => {
  const [selectedContentTabId, setSelectedContentTab] = useState<string>(TAB_EVENT_ID);
  const [startTime, setStartTime] = useState<string>('now-15m');
  const [endTime, setEndTime] = useState<string>('now');
  const [liveStreamChecked, setLiveStreamChecked] = useState<Boolean>(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState<Boolean>(false);
  const [fixedScrollEl, setFixedScrollEl] = useState<HTMLElement | undefined>();
  const fixedScrollRef = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        setFixedScrollEl(node);
      }
    },
    [setFixedScrollEl]
  );

  const handleAddField = (field: IField) => props.addField(field, props.tabId);

  const handleRemoveField = (field: IField) => props.removeField(field, props.tabId);

  const handleLiveStreamChecked = () => setLiveStreamChecked(!liveStreamChecked);

  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  const getMainContent = () => {
    return (
      <main className="container-fluid">
        <div className="row">
          <div
              className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
              id="discover-sidebar"
              data-test-subj="discover-sidebar"
            >
              {!isSidebarClosed && (
                <div className="dscFieldChooser">
                  <Sidebar
                    queryData={ props.explorerData?.jsonData }
                    explorerFields={ props.explorerFields }
                    handleAddField={ (field: IField) => handleAddField(field) }
                    handleRemoveField={ (field: IField) => handleRemoveField(field) }
                  />
                </div>
              )}
              <EuiButtonIcon
                iconType={ isSidebarClosed ? 'menuRight' : 'menuLeft' }
                iconSize="m"
                size="s"
                onClick={ () => {
                  setIsSidebarClosed(staleState => {
                    return !staleState;
                  });
                } }
                data-test-subj="collapseSideBarButton"
                aria-controls="discover-sidebar"
                aria-expanded={ isSidebarClosed ? 'false' : 'true' }
                aria-label="Toggle sidebar"
                className="dscCollapsibleSidebar__collapseButton"
              />
          </div>
          <div className={`dscWrapper ${mainSectionClassName}`}>
          { (props.explorerData && !_.isEmpty(props.explorerData)) ? (
            <div className="dscWrapper__content">
              <div className="dscResults">
                <HitsCounter 
                  hits={ props.explorerData['datarows']?.length }
                  showResetButton={true}
                  onResetQuery={ () => {} }
                />
                <CountDistribution />
                <section
                  className="dscTable dscTableFixedScroll"
                  aria-labelledby="documentsAriaLabel"
                  ref={fixedScrollRef}
                >
                  <h2 className="euiScreenReaderOnly" id="documentsAriaLabel">
                    <FormattedMessage
                      id="discover.documentsAriaLabel"
                      defaultMessage="Documents"
                    />
                  </h2>
                  <div className="dscDiscover">
                    <DataGrid 
                      key={`datagrid-${props.tabId}`}
                      tabId={ props.tabId }
                      columns={ props.explorerData['schema'] }
                      rows={ props.explorerData['jsonData'] }
                      explorerFields={ props.explorerFields }
                    />
                    <a tabIndex={0} id="discoverBottomMarker">
                      &#8203;
                    </a>
                  </div>
                </section>
              </div>
            </div>
          ) : <NoResults />}
          </div>
        </div>
      </main>
    );
  };

  function getMainContentTab ({
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

  const getExplorerVis = () => {
    return (
      <ExplorerVisualizations />
    );
  };

  const getMainContentTabs = () => {
    return [
        getMainContentTab(
          {
            tabId: TAB_EVENT_ID,
            tabTitle: TAB_EVENT_TITLE,
            getContent: () => getMainContent()
          }
        ),
        getMainContentTab(
          {
            tabId: TAB_CHART_ID,
            tabTitle: TAB_CHART_TITLE,
            getContent: () => getExplorerVis()
          }
        )
    ];
  };

  const memorizedMainContentTabs = useMemo(() => {
    return getMainContentTabs();
  },
    [
      props.explorerData,
      props.explorerFields,
      isSidebarClosed
    ]
  );

  const actionItems = [
    {
      text: 'Refresh',
      iconType: 'refresh',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    },
    {
      text: 'Live',
      iconType: 'play',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    },
    {
      text: 'Save',
      iconType: 'heart',
      handlers: {
        onClick: () => {
          console.log('refresh clicked');
        }
      }
    }
  ];

  const handleContentTabClick = (selectedTab: IQueryTab) => setSelectedContentTab(selectedTab.id);
  return (
    <div className="dscAppContainer">
      <h1 className="euiScreenReaderOnly">testing</h1>
      <Search
        query={ props.query }
        handleQueryChange={ (query: string) => { props.setSearchQuery(query, props.tabId) } }
        handleQuerySearch={ () => { props.querySearch(props.tabId) } }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
        liveStreamChecked={ liveStreamChecked }
        onLiveStreamChange={ handleLiveStreamChecked }
        actionItems={ actionItems }
      />
      <EuiTabbedContent
        className="mainContentTabs"
        initialSelectedTab={ memorizedMainContentTabs[0] }
        selectedTab={ memorizedMainContentTabs.find(tab => { tab.id === selectedContentTabId }) }
        onTabClick={ (selectedTab: EuiTabbedContentTab) => handleContentTabClick(selectedTab) }
        tabs={ memorizedMainContentTabs }
      />
    </div>
  );
};