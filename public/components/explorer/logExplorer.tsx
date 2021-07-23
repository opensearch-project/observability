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

import './logExplorer.scss';
import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {
  EuiIcon,
  EuiText,
  EuiTabbedContentTab,
  EuiTabbedContent
} from '@elastic/eui';
import { Explorer } from './explorer';
import { handlePplRequest } from '../../services/requests/ppl';
import {
  IField,
} from '../../common/types/explorer';
import {
  TAB_TITLE,
  TAB_ID_TXT_PFX,
  RAW_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../../common/constants/explorer';

export const LogExplorer = ({
  http,
  tabIds,
  queries,
  queryResults,
  fields,
  curQueriesRef,
  curSelectedTabId,
  setTabIds,
  setQueries,
  setQueryResults,
  setFields,
  setCurSelectedTab
}: any) => {

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

  const handleTabClick = (selectedTab: EuiTabbedContentTab) => setCurSelectedTab(selectedTab.id);
  
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
    setCurSelectedTab(newIdToFocus);

    // Clean up state data for this tab
    setTabIds((staleTabIds) => {
      return staleTabIds.filter((id) => {
        if (id === TabIdToBeClosed) {
          return false;
        }
        return id !== TabIdToBeClosed;
      });
    });
    setQueries(staleQueries => {
      const newQueries = {
        ...staleQueries,
      };
      delete newQueries[TabIdToBeClosed];
      curQueriesRef.current = newQueries;
      return newQueries;
    });
    setQueryResults(staleQueryResults => {
      const newQueryResults = {
        ...staleQueryResults
      };
      delete newQueryResults[TabIdToBeClosed];
      return newQueryResults;
    });
    setFields(staleFields => {
      const newFields = {
        ...staleFields
      };
      delete newFields[TabIdToBeClosed];
      return newFields
    });
  };

  function getTabId (prefix: string) {
    return _.uniqueId(prefix);
  }

  function addNewTab () {
    const tabId: string = getTabId(TAB_ID_TXT_PFX);
    
    setTabIds(staleTabIds => {
      return [...staleTabIds, tabId];
    });
    setQueries(staleQueries => {
      const newQueries = {
        ...staleQueries,
        [tabId]: {
          [RAW_QUERY]: ''
        }
      };
      curQueriesRef.current = newQueries;
      return newQueries;
    });
    setQueryResults(staleQueryResults => {
      return {
        ...staleQueryResults,
        [tabId]: {}
      };
    });
    setFields(staleFields => {
      return {
        ...staleFields,
        [tabId]: {
          [SELECTED_FIELDS]: [],
          [UNSELECTED_FIELDS]: []
        }
      };
    });
  };

  const handleQuerySearch = async (tabId: string) => {
    const latestQueries = curQueriesRef.current;
    const res = await handlePplRequest(http, { query: latestQueries[tabId][RAW_QUERY].trim() });
    console.log('res: ', res);
    setQueryResults(staleQueryResults => {
      return {
        ...staleQueryResults,
        [tabId]: res
      };
    });
    setFields(staleFields => {
      return {
        ...staleFields,
        [tabId]: {
          [SELECTED_FIELDS]: [],
          [UNSELECTED_FIELDS]: res?.schema || []
        }
      };
    });
  };

  const setSearchQuery = (query: string, tabId: string) => {
    setQueries(staleQueries => {
      const newQueries = {
        ...staleQueries,
        [tabId]: {
          [RAW_QUERY]: query
        }
      };
      curQueriesRef.current = newQueries;
      return newQueries;
    });
  };

  const handleAddField = (field: IField, tabId: string) => toggleFields(field, tabId, UNSELECTED_FIELDS, SELECTED_FIELDS);

  const handleRemoveField = (field: IField, tabId: string) => toggleFields(field, tabId, SELECTED_FIELDS, UNSELECTED_FIELDS);

  /**
   * Toggle fields between selected and unselected sets
   * @param field field to be toggled
   * @param tabId id of the tab that triggers fields selecting and removing
   * @param FieldSetToRemove set where this field to be removed from
   * @param FieldSetToAdd set where this field to be added
   */
  const toggleFields = (
    field: IField,
    tabId: string,
    FieldSetToRemove: string,
    FieldSetToAdd: string
  ) => {
    setFields(staleFields => {

      const nextFields = _.cloneDeep(staleFields);

      const thisFieldSet = nextFields[tabId][FieldSetToRemove];
      const nextFieldSet = thisFieldSet.filter((fd: IField) => fd.name !== field.name);
      nextFields[tabId][FieldSetToRemove] = nextFieldSet;
      nextFields[tabId][FieldSetToAdd].push(field);

      return nextFields;
    });
  };

  function getQueryTab ({
    tabTitle,
    tabId,
    fields,
    queryResults,
    setSearchQuery,
    handleTabClose,
    handleQuerySearch,
  }: {
    tabTitle: string,
    tabId: string,
    fields: any,
    queries: any,
    queryResults: any,
    setSearchQuery: (query: string, tabId: string) => void,
    handleTabClose: (TabIdToBeClosed: string) => void,
    handleQuerySearch: (tabId: string) => void,
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
            tabId={ tabId }
            query={ queries[tabId] }
            explorerFields={ fields[tabId] }
            explorerData={ queryResults[tabId] }
            setSearchQuery={ (query: string, tabId: string) => { setSearchQuery(query, tabId) } }
            querySearch={ (tabId: string) => { handleQuerySearch(tabId) } }
            addField={ (field: IField, tabId: string) => { handleAddField(field, tabId) } }
            removeField={ (field: IField, tabId: string) => { handleRemoveField(field, tabId) } }
          />
        </>)
    };
  }

  const memorizedTabs = useMemo(() => {
    return _.map(tabIds, (tabId) => {
      return getQueryTab(
        {
          tabTitle: TAB_TITLE,
          tabId,
          queries,
          fields,
          queryResults,
          setSearchQuery,
          handleTabClose,
          handleQuerySearch,
        }
      );
    });
  }, 
    [
      queries,
      tabIds,
      queryResults,
      fields
    ]
  );

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