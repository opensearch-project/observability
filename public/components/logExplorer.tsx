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

import './logExplorer.scss';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {
  EuiIcon,
  EuiText,
  EuiTabbedContentTab,
  EuiTabbedContent
} from '@elastic/eui';
import { CoreStart } from '../../../../src/core/public';
import { Explorer } from './explorer';
import { handlePplRequest } from '../requests/ppl';

interface IQueryTab {
  id: string,
  name: React.ReactNode | string,
  content: React.ReactNode
}

interface ILogExplorerProps {
  http: CoreStart['http']
  plugins: any
}

export const LogExplorer: React.FC<ILogExplorerProps> = (props) => {

  const initialTabId = getTabId('query_panel_');
  const initialTabState = getInitialStateForNewTab()
  const [tabsData, setTabsData] = useState<any>({
    initialTabId: initialTabState
  });
  const initialTab = getQueryTab(initialTabId, initialTabState);
  const [tabs, setTabs] = useState<Array<IQueryTab>>([ initialTab ]);
  const [curSelectedTab, setCurSelectedTab] = useState<EuiTabbedContentTab>(tabs[0]);
  const curTabsRef = useRef(tabs);
  const curTabsDataRef = useRef(tabsData);

  // Append add-new-tab link to the end of the tab list, and remove it once tabs state changes
  useEffect(() => {
    const addNewLink = $('<a class="linkNewTag">+ Add new</a>').on('click', () => {
      addNewTab();
    });
    $('.queryTabs .euiTabs').append(addNewLink);
    return () => {
      $('.queryTabs .euiTabs .linkNewTag').remove();
    }
  }, [tabs]);

  // useEffect(() => {
  //   if (tabs.length === 0) {
  //     addNewTab();
  //     setCurSelectedTab(tabs[0]);
  //   }
  // }, [tabs]);

  const updateTabs = (newState: Array<IQueryTab>) => {
    curTabsRef.current = newState;
    setTabs(newState);
  }

  const updateTabsData = (newState) => {
    curTabsDataRef.current = newState;
    setTabsData(newState);
  }

  const handleTabClick = (selectedTab: EuiTabbedContentTab) => {
    if (selectedTab) {
      setCurSelectedTab(selectedTab);
    }
  };
  
  const handleTabClose = (TabIdToBeClosed: string) => {
    
    // Delete tab DOM along with state data associated with it
    const latestTabs: Array<IQueryTab> = curTabsRef.current;
    const latestTabsData = curTabsDataRef.current;
    
    if (latestTabs.length == 1) {
      console.log('Have to have at least one tab');
      return;
    }
    
    let tabToBeRemoved: IQueryTab;
    const newTabs: Array<IQueryTab> = latestTabs.filter(tab => {
      if (tab.id === TabIdToBeClosed) {
        tabToBeRemoved = tab;
        return false;
      }
      return tab.id != TabIdToBeClosed;
    });

    const newTabsData = {
      ...latestTabsData
    };
    delete newTabsData[TabIdToBeClosed];
    
    // Always find the tab before the one being removed as the new focused tab, use the tab after
    // if the removed one is the first tab
    const idxOfNewFocus: number = latestTabs.indexOf(tabToBeRemoved) - 1 >= 0 ? latestTabs.indexOf(tabToBeRemoved) - 1 : latestTabs.indexOf(tabToBeRemoved) + 1
    const tabBeforeRemovedOne: IQueryTab = latestTabs[idxOfNewFocus];

    updateTabsData(newTabsData);
    updateTabs(newTabs);
    setCurSelectedTab(tabBeforeRemovedOne);
  };

  function getInitialStateForNewTab() {
    return {
      query: '',
      timeRange: [],
      liveStreamChecked: false,
      isSidebarClosed: false,
      queryResult: {},
      selectedFields: [],
      unselectedFields: [],
      availableFields: []
    };
  };

  function getTabId (prefix: string) { 
    return _.uniqueId(prefix);
  }

  function addNewTab () {
    const tabId: string = getTabId('query_panel_');
    const initialTabData = getInitialStateForNewTab();
    const newTabsData = {
      ...curTabsDataRef.current,
      tabId: initialTabData
    };
    
    const newTab: IQueryTab = getQueryTab(tabId, newTabsData);
    const newTabs: Array<IQueryTab> = [...curTabsRef.current, newTab];
    
    updateTabsData(newTabsData);
    updateTabs(newTabs);
    setCurSelectedTab(newTab);
  };

  const handleQuerySearch = async (tabId: string) => {
    const latestTabsData = curTabsDataRef.current;
    const res = await handlePplRequest(props.http, { query: latestTabsData[tabId]['query'].trim() });
    const newTabsData = {
      ...curTabsDataRef.current
    };
    newTabsData[tabId]['queryResult'] = res;
    updateTabsData(newTabsData);
  };

  const setQuery = (tabId: string, query: string) => {
    const newTabsData = {
      ...curTabsDataRef.current
    };
    newTabsData[tabId]['query'] = query;
    updateTabsData
  };

  function getQueryTab (tabId: string, initialTabData) {
    return {
      id: tabId,
      name: (<>
              <EuiText
                size="xs"
                textAlign="left"
                color="default"
              >
                <span className="tab-title">New query</span>
                <EuiIcon 
                  type="cross"
                  onClick={ (e) => {
                    e.stopPropagation();
                    handleTabClose(tabId)
                  } }
                />
              </EuiText>
            </>),
      content: (
        <>
          <Explorer
            key={`query_${tabId}`}
            http={ props.http }
            plugins={ props.plugins }
            tabId={ tabId }
            explorerData={ tabsData[tabId] || initialTabData }
            setQuery={ setQuery }
            handleQuerySearch={ handleQuerySearch }
          />
        </>)
    };
  }

  return (
    <>
      <EuiTabbedContent
        className="queryTabs"
        tabs={tabs}
        selectedTab={ curSelectedTab }
        onTabClick={ (selectedTab: EuiTabbedContentTab) => handleTabClick(selectedTab) }
      />
    </>
  );
};