/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  createSlice
} from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { 
  SELECTED_QUERY_TAB,
  QUERY_TAB_IDS,
  NEW_SELECTED_QUERY_TAB,
  REDUX_EXPL_SLICE_QUERY_TABS
} from '../../../../common/constants/explorer';
import { assign } from 'lodash';

const initialState = {
  queryTabIds: [initialTabId],
  selectedQueryTab: initialTabId,
  tabNames: {}
};

export const queryTabsSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERY_TABS,
  initialState,
  reducers: {
    addTab: (state, { payload }) => {
      state[QUERY_TAB_IDS].push(payload.tabId);
      state[SELECTED_QUERY_TAB] = payload.tabId;
    },
    removeTab: (state, { payload }) => {
      state[QUERY_TAB_IDS] = state[QUERY_TAB_IDS].filter((tabId) => {
        if (tabId === payload.tabId) return false;
        return true;
      });
      state[SELECTED_QUERY_TAB] = payload[NEW_SELECTED_QUERY_TAB];
    },
    updateTabName: (state, { payload }) => {
      const newTabNames = {
        [payload.tabId]: payload.tabName
      };
      assign(state.tabNames, newTabNames);
    },
    setSelectedQueryTab: (state, { payload }) => {
      state[SELECTED_QUERY_TAB] = payload.tabId;
    }
  },
  extraReducers: (builder) => {}
});

export const {
  addTab,
  removeTab,
  setSelectedQueryTab,
  updateTabName
} = queryTabsSlice.actions;

export const selectQueryTabs = (state) => state.explorerTabs;

export default queryTabsSlice.reducer;