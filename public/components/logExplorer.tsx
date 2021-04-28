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
import $ from 'jquery';
import {
  EuiIcon,
  EuiText,
  EuiTabbedContentTab,
  EuiTabbedContent
} from '@elastic/eui';
import { CoreStart } from '../../../../src/core/public';
import { Explorer } from './explorer';

interface IQueryTab {
  id: string,
  name: React.ReactNode | string,
  content: React.ReactNode
}

interface ILogExplorerProps {
  http: CoreStart['http']
}

export const LogExplorer: React.FC<ILogExplorerProps> = (props) => {

  const [tabs, setTabs] = useState<Array<IQueryTab>>([
    getQueryTab()
  ]);
  const [curSelectedTab, setCurSelectedTab] = useState<EuiTabbedContentTab>(tabs[0]);
  const curTabsRef = useRef(tabs);

  // Append add-new-tab link to the end of the tab list, and remove it once tabs state changes
  useEffect(() => {
    const addNewLink = $('<a class="linkNewTag">+ Add new</a>').on('click', () => {
      handleAddNewTab();
    });
    $('.queryTabs .euiTabs').append(addNewLink);
    return () => {
      $('.queryTabs .euiTabs .linkNewTag').remove();
    }
  }, [tabs]);

  const updateTabs = (newState: Array<IQueryTab>) => {
    curTabsRef.current = newState;
    setTabs(newState);
  }

  const handleTabClick = (selectedTab: EuiTabbedContentTab) => {
    if (selectedTab) {
      setCurSelectedTab(selectedTab);
    }
  };
  
  const handleTabClose = (TabIdToBeClosed: string) => {
    const latestTabs: Array<IQueryTab> = curTabsRef.current;
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
    // Always find the tab before the one being removed as the new focused tab, use the tab after
    // if the removed one is the first tab
    const idxOfNewFocus: number = latestTabs.indexOf(tabToBeRemoved) - 1 >= 0 ? latestTabs.indexOf(tabToBeRemoved) - 1 : latestTabs.indexOf(tabToBeRemoved) + 1
    const tabBeforeRemovedOne: IQueryTab = latestTabs[idxOfNewFocus];
    updateTabs(newTabs);
    setCurSelectedTab(tabBeforeRemovedOne);
  };

  const handleAddNewTab = () => {
    const newTab: IQueryTab = getQueryTab();
    const newTabs: Array<IQueryTab> = [...curTabsRef.current, newTab];
    updateTabs(newTabs);
    setCurSelectedTab(newTab);
  };

  function getQueryTab () {
    const tabId: number = new Date().valueOf();
    const tab: string = `query_panel_${tabId}`;
    return {
      id: tab,
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
                    handleTabClose(tab)
                  } }
                />
              </EuiText>
            </>),
      content: (
        <>
          <Explorer
            key={`query_${tabId}`}
            http={ props.http }
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