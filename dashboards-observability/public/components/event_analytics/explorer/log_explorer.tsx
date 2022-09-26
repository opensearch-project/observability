/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import './log_explorer.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { uniqueId, map, isEmpty } from 'lodash';
import $ from 'jquery';
import { EuiIcon, EuiText, EuiTabbedContentTab, EuiTabbedContent } from '@elastic/eui';
import { Explorer } from './explorer';
import { ILogExplorerProps } from '../../../../common/types/explorer';
import {
  TAB_TITLE,
  TAB_ID_TXT_PFX,
  SAVED_OBJECT_ID,
  NEW_TAB,
  REDIRECT_TAB,
  TAB_EVENT_ID,
  TAB_CHART_ID,
  APP_ANALYTICS_TAB_ID_REGEX,
} from '../../../../common/constants/explorer';
import { selectQueryTabs, setSelectedQueryTab } from '../redux/slices/query_tab_slice';
import { selectQueries } from '../redux/slices/query_slice';
import { selectQueryResult } from '../redux/slices/query_result_slice';
import { initializeTabData, removeTabData } from '../../application_analytics/helpers/utils';

const searchBarConfigs = {
  [TAB_EVENT_ID]: {
    showSaveButton: true,
    showSavePanelOptionsList: false,
  },
  [TAB_CHART_ID]: {
    showSaveButton: true,
    showSavePanelOptionsList: true,
  },
};

export const LogExplorer = ({
  pplService,
  dslService,
  savedObjects,
  timestampUtils,
  setToast,
  savedObjectId,
  getExistingEmptyTab,
  history,
  notifications,
  http,
  queryManager,
}: ILogExplorerProps) => {
  const dispatch = useDispatch();
  const tabIds = useSelector(selectQueryTabs).queryTabIds.filter(
    (tabid: string) => !tabid.match(APP_ANALYTICS_TAB_ID_REGEX)
  );
  const tabNames = useSelector(selectQueryTabs).tabNames;
  const queries = useSelector(selectQueries);
  const curSelectedTabId = useSelector(selectQueryTabs).selectedQueryTab;
  const explorerData = useSelector(selectQueryResult);
  const queryRef = useRef();
  const tabIdsRef = useRef();
  const explorerDataRef = useRef();
  const curSelectedTabIdRef = useRef();
  queryRef.current = queries;
  tabIdsRef.current = tabIds;
  explorerDataRef.current = explorerData;
  curSelectedTabIdRef.current = curSelectedTabId;

  const [tabCreatedTypes, setTabCreatedTypes] = useState({});

  // Append add-new-tab link to the end of the tab list, and remove it once tabs state changes
  useEffect(() => {
    const newLink = $(
      '<a class="linkNewTag" data-test-subj="eventExplorer__addNewTab">+ Add new</a>'
    ).on('click', () => {
      addNewTab(NEW_TAB);
    });
    $('.queryTabs > .euiTabs').append(newLink);
    return () => {
      $('.queryTabs > .euiTabs .linkNewTag').remove();
    };
  }, [tabIds]);

  const handleTabClick = (selectedTab: EuiTabbedContentTab) => {
    history.replace(
      `/event_analytics/explorer/${queryRef.current![selectedTab.id][SAVED_OBJECT_ID] || ''}`
    );
    dispatch(setSelectedQueryTab({ tabId: selectedTab.id }));
  };

  const handleTabClose = (TabIdToBeClosed: string) => {
    if (tabIds.length === 1) {
      setToast('Cannot close last tab.', 'danger');
      return;
    }

    const index: number = tabIds.indexOf(TabIdToBeClosed);
    const curSelectedTab = curSelectedTabIdRef.current;
    let newIdToFocus = '';
    if (TabIdToBeClosed === curSelectedTab) {
      if (index === 0) {
        newIdToFocus = tabIds[index + 1];
      } else if (index > 0) {
        newIdToFocus = tabIds[index - 1];
      }
    }
    removeTabData(dispatch, TabIdToBeClosed, newIdToFocus);
  };

  const addNewTab = async (where: string) => {
    // get a new tabId
    const tabId = uniqueId(TAB_ID_TXT_PFX);

    // create a new tab
    await initializeTabData(dispatch, tabId, where);

    setTabCreatedTypes((staleState) => {
      return {
        ...staleState,
        [tabId]: where,
      };
    });

    return tabId;
  };

  const dispatchSavedObjectId = async () => {
    const emptyTabId = getExistingEmptyTab({
      tabIds: tabIdsRef.current,
      queries: queryRef.current,
      explorerData: explorerDataRef.current,
    });
    const newTabId = emptyTabId ? emptyTabId : await addNewTab(REDIRECT_TAB);
    return newTabId;
  };

  useEffect(() => {
    if (!isEmpty(savedObjectId)) {
      dispatchSavedObjectId();
    }
  }, []);

  function getQueryTab({
    tabTitle,
    tabId,
    handlesTabClose,
  }: {
    tabTitle: string;
    tabId: string;
    handlesTabClose: (TabIdToBeClosed: string) => void;
  }) {
    return {
      id: tabId,
      name: (
        <>
          <EuiText size="s" textAlign="left" color="default">
            <span className="tab-title">{tabTitle}</span>
            <EuiIcon
              type="cross"
              onClick={(e) => {
                e.stopPropagation();
                handlesTabClose(tabId);
              }}
              data-test-subj="eventExplorer__tabClose"
            />
          </EuiText>
        </>
      ),
      content: (
        <>
          <Explorer
            key={`explorer_${tabId}`}
            pplService={pplService}
            dslService={dslService}
            tabId={tabId}
            savedObjects={savedObjects}
            timestampUtils={timestampUtils}
            setToast={setToast}
            history={history}
            notifications={notifications}
            savedObjectId={savedObjectId}
            tabCreatedTypes={tabCreatedTypes}
            curSelectedTabId={curSelectedTabIdRef}
            http={http}
            searchBarConfigs={searchBarConfigs}
            queryManager={queryManager}
          />
        </>
      ),
    };
  }

  const memorizedTabs = useMemo(() => {
    const res = map(tabIds, (tabId) => {
      return getQueryTab({
        tabTitle: tabNames[tabId] || TAB_TITLE,
        tabId,
        handlesTabClose: handleTabClose,
      });
    });

    return res;
  }, [tabIds, tabNames, tabCreatedTypes]);

  return (
    <>
      <EuiTabbedContent
        id="queryTabs"
        className="queryTabs"
        tabs={memorizedTabs}
        selectedTab={memorizedTabs.find((tab) => tab.id === curSelectedTabId)}
        onTabClick={(selectedTab: EuiTabbedContentTab) => handleTabClick(selectedTab)}
        data-test-subj="eventExplorer__topLevelTabbing"
      />
    </>
  );
};
