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

import './log_explorer.scss';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { 
  uniqueId,
  map
} from 'lodash';
import $ from 'jquery';
import {
  EuiIcon,
  EuiText,
  EuiTabbedContentTab,
  EuiTabbedContent
} from '@elastic/eui';
import { Explorer } from './explorer';
import { ILogExplorerProps } from '../../../common/types/explorer';
import {
  TAB_TITLE,
  TAB_ID_TXT_PFX
} from '../../../common/constants/explorer';
import { 
  selectQueryTabs,
  addTab,
  setSelectedQueryTab,
  removeTab
} from './slices/query_tab_slice';
import { 
  init as initFields,
  remove as removefields
} from './slices/field_slice';
import {
  init as initQuery,
  remove as removeQuery
} from './slices/query_slice';
import { 
  init as initQueryResult,
  remove as removeQueryResult,
} from './slices/query_result_slice';

export const LogExplorer = ({
  pplService,
  dslService,
  savedObjects,
  http
}: ILogExplorerProps) => {

  const dispatch = useDispatch();
  const tabIds = useSelector(selectQueryTabs)['queryTabIds'];
  const curSelectedTabId = useSelector(selectQueryTabs)['selectedQueryTab'];

  // Append add-new-tab link to the end of the tab list, and remove it once tabs state changes
  useEffect(() => {
    const addNewLink = $('<a class="linkNewTag">+ Add new</a>').on('click', () => {
      addNewTab();
    });
    $('.queryTabs > .euiTabs').append(addNewLink);
    return () => {
      $('.queryTabs > .euiTabs .linkNewTag').remove();
    }
  }, [tabIds]);

  const handleTabClick = (selectedTab: EuiTabbedContentTab) => {
    dispatch(setSelectedQueryTab({ tabId: selectedTab.id }));
  };
  
  const handleTabClose = (TabIdToBeClosed: string) => {
    
    if (tabIds.length === 1) {
      console.log('Have to have at least one tab');
      return;
    }

    // Always find the first tab on the left side of the current removing one to be the new focused tab, 
    // if the leftmost (first) tab is the one being removed, then it finds the next tab to be the new focus
    const index: number = tabIds.indexOf(TabIdToBeClosed);
    let newIdToFocus = '';
    if (index === 0) {
      newIdToFocus = tabIds[index + 1];
    } else if (index > 0) {
      newIdToFocus = tabIds[index - 1];
    }

    batch(() => {
      dispatch(removeQuery({ tabId: TabIdToBeClosed, }));
      dispatch(removefields({ tabId: TabIdToBeClosed, }));
      dispatch(removeQueryResult({ tabId: TabIdToBeClosed, }));
      dispatch(removeTab({ 
        tabId: TabIdToBeClosed, 
        newSelectedQueryTab: newIdToFocus
      }));
    });
  };

  function addNewTab () {
    const tabId: string = uniqueId(TAB_ID_TXT_PFX);
    batch(() => {
      dispatch(initQuery({ tabId, }));
      dispatch(initQueryResult({ tabId, }));
      dispatch(initFields({ tabId, }));
      dispatch(addTab({ tabId, }));
    });
  };

  function getQueryTab ({
    tabTitle,
    tabId,
    handleTabClose,
  }: {
    tabTitle: string,
    tabId: string,
    handleTabClose: (TabIdToBeClosed: string) => void,
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
            key={`explorer_${tabId}`}
            pplService={ pplService }
            dslService={ dslService }
            http={ http }
            tabId={ tabId }
            savedObjects={ savedObjects }
          />
        </>)
    };
  }

  const memorizedTabs = useMemo(() => {
    return map(tabIds, (tabId) => {
      return getQueryTab(
        {
          tabTitle: TAB_TITLE,
          tabId,
          handleTabClose,
        }
      );
    });
  }, [ tabIds ]);

  return (
    <>
      <EuiTabbedContent
        id="queryTabs"
        className="queryTabs"
        tabs={ memorizedTabs }
        selectedTab={ memorizedTabs.find(tab => tab.id === curSelectedTabId) }
        onTabClick={ (selectedTab: EuiTabbedContentTab) => handleTabClick(selectedTab) }
      />
    </>
  );
};