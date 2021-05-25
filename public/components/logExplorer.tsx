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

const RAW_QUERY = 'rawQuery';
const SELECTED_FIELDS = 'selectedFields';
const UNSELECTED_FIELDS = 'unselectedFields';

export const LogExplorer: React.FC<ILogExplorerProps> = (props) => {

  const initialTabId = getTabId('query_panel_');
  const [tabIds, setTabIds] = useState([initialTabId]);
  const [queries, setQueries] = useState({
    [initialTabId]: {
      [RAW_QUERY]: ''
    }
  });
  const [queryResults, setQueryResults] = useState({
    [initialTabId]: {}
  });
  const [fields, setFields] = useState({
    [initialTabId]: {}
  });
  const curQueriesRef = useRef(queries);
  const [curSelectedTabId, setCurSelectedTab] = useState<string>(initialTabId);

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
      setCurSelectedTab(selectedTab.id);
  };
  
  const handleTabClose = (TabIdToBeClosed: string) => {
    
    if (tabIds.length === 1) {
      console.log('Have to have at least one tab');
      return;
    }

    // Always find the previous tab of the current removing one, if current tab
    // is the one to be removed, then find the next tab
    const index = tabIds.indexOf(TabIdToBeClosed);
    let newIdToFocus = '';
    if (index === 0) {
      newIdToFocus = tabIds[index + 1];
    } else if (index > 0) {
      newIdToFocus = tabIds[index - 1];
    }
    setCurSelectedTab(newIdToFocus);

    setTabIds(staleTabIds => {
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

    const tabId: string = getTabId('query_panel_');
    
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
    const res = await handlePplRequest(props.http, { query: latestQueries[tabId][RAW_QUERY].trim() });
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

  const handleAddField = (field: { name: string, type: string }, tabId: string) => {
    setFields(staleFields => {

      const nextFields = _.cloneDeep(staleFields);

      const thisUnselectedFields = nextFields[tabId][UNSELECTED_FIELDS];
      const nextUnselected = thisUnselectedFields.filter(fd => fd.name !== field.name);
      nextFields[tabId][UNSELECTED_FIELDS] = nextUnselected;
      nextFields[tabId][SELECTED_FIELDS].push(field);

      return nextFields;
    });
  }

  const handleRemoveField = (field: { name: string, type: string }, tabId: string) => {
    setFields(staleFields => {

      const nextFields = _.cloneDeep(staleFields);

      const thisSelectedFields = nextFields[tabId][SELECTED_FIELDS];
      const nextSelected = thisSelectedFields.filter(fd => fd.name !== field.name);
      nextFields[tabId][SELECTED_FIELDS] = nextSelected;
      nextFields[tabId][UNSELECTED_FIELDS].push(field);

      return nextFields;
    });
  }

  function getQueryTab ({
    tabTitle,
    tabId,
    fields,
    queryResults,
    setSearchQuery,
    handleTabClose,
    handleQuerySearch,
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
            explorerFields={ fields[tabId] }
            explorerData={ queryResults[tabId] }
            setSearchQuery={ (query: string, tabId: string) => { setSearchQuery(query, tabId) } }
            querySearch={ (tabId: string) => { handleQuerySearch(tabId) } }
            addField={ (field, tabId) => { handleAddField(field, tabId) } }
            removeField={ (field, tabId) => { handleRemoveField(field, tabId) } }
          />
        </>)
    };
  }

  const memorizedTabs = useMemo(() => {
    return _.map(tabIds, (tabId) => {
      return getQueryTab(
        {
          tabTitle: 'New query',
          tabId,
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