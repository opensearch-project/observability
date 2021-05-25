/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React, { useState, useMemo, useCallback } from 'react';
import _ from 'lodash';
import { 
  FormattedMessage 
} from '@kbn/i18n/react';
import {
  EuiText,
  EuiButtonIcon,
  EuiTabbedContent,
  EuiTabbedContentTab
} from '@elastic/eui';
import classNames from 'classnames';
import { CoreStart } from '../../../../src/core/public';
import Search from './common/seach/search';
import { QueryDataGrid } from './dataGrid';
import { Sidebar } from './sidebar/';
import { NoResults } from './noResults';

interface IExplorerProps {
  http: CoreStart['http'],
  plugins: any
}
interface IPPLResult {}

/**
 * When state changing actions are triggered within tab content, the EuiTabbedContent
 * updates the content UI with new props/state data only when tab is focused. And the 
 * focus works by comparing the addresses of selectedTab and current tab it iterates 
 * through. This is to make sure it always uses the same object to calculate new tab
 * data therefore the EuiTabbedContent will always update the tab content.
 */
const TAB_EVENT = {
  id: _.uniqueId('main-content-events-')
};
const TAB_CHART = {
  id: _.uniqueId('main-content-charts-')
};
const TAB_CHART_TITLE = 'Charts';
const TAB_EVENT_TITLE = 'Events';
const TAB_EVENT_ID = _.uniqueId('main-content-events-');
const TAB_CHART_ID = _.uniqueId('main-content-charts-');


export const Explorer = (props) => {
  const {
    tabId,
    explorerData,
    explorerFields,
    setSearchQuery,
    querySearch,
    addField,
    removeField
   } = props;

  const [selectedContentTabId, setSelectedContentTab] = useState<string>(TAB_EVENT_ID);
  const [startTime, setStartTime] = useState<string>('now-15m');
  const [endTime, setEndTime] = useState<string>('now');
  const [liveStreamChecked, setLiveStreamChecked] = useState<Boolean>(false);

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [fixedScrollEl, setFixedScrollEl] = useState<HTMLElement | undefined>();
  const fixedScrollRef = useCallback(
    (node: HTMLElement) => {
      if (node !== null) {
        setFixedScrollEl(node);
      }
    },
    [setFixedScrollEl]
  );

  // const getDefaultQuery = (startTime: string, endTime: string) => {
  //   if (startTime && endTime && startTime === endTime) {
  //     endTime = 'now';
  //   }
  //   return `search source=kibana_sample_data_flights | where timestamp > timestamp('${moment(dateMath.parse(startTime)).format('yyyy-MM-DD HH:mm:ss')}') and timestamp < timestamp('${moment(dateMath.parse(endTime)).format('yyyy-MM-DD HH:mm:ss')}')`;
  // };

  const handleAddField = (field) => {
    addField(field, tabId);
  };

  const handleRemoveField = (field) => {
    removeField(field, tabId);
  };

  const handleLiveStreamChecked = (e) => {
    setLiveStreamChecked(!liveStreamChecked);
  };

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
                    queryData={ explorerData?.jsonData }
                    explorerFields={ explorerFields }
                    handleAddField={ (field) => handleAddField(field) }
                    handleRemoveField={ (field) => handleRemoveField(field) }
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
          { (explorerData && !_.isEmpty(explorerData)) ? (
            <div className="dscWrapper__content">
              <div className="dscResults">
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
                    <QueryDataGrid 
                      key={`datagrid-${tabId}`}
                      tabId={ tabId }
                      columns={ explorerData['schema'] }
                      rows={ explorerData['jsonData'] }
                      explorerFields={ explorerFields }
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
            getContent: () => { return <>Charts Content</> }
          }
        )
    ];
  };

  const memorizedMainContentTabs = useMemo(() => {
    return getMainContentTabs();
  },
    [
      explorerData,
      explorerFields,
      isSidebarClosed
    ]
  );

  const handleContentTabClick = (selectedTab) => {
    setSelectedContentTab(selectedTab.id);
  };

  return (
    <div className="dscAppContainer">
      <h1 className="euiScreenReaderOnly">testing</h1>
      <Search 
        handleQueryChange={ (query: string) => { setSearchQuery(query, tabId) } }
        handleQuerySearch={ () => { querySearch(tabId) } }
        startTime={ startTime }
        endTime={ endTime }
        setStartTime={ setStartTime }
        setEndTime={ setEndTime }
        setIsOutputStale={ () => {} }
        liveStreamChecked={ liveStreamChecked }
        onLiveStreamChange={ handleLiveStreamChecked }
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