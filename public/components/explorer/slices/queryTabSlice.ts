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

import { 
  createSlice
} from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/sharedState';
import { 
  SELECTED_QUERY_TAB,
  QUERY_TAB_IDS,
  NEW_SELECTED_QUERY_TAB,
  REDUX_EXPL_SLICE_QUERY_TABS
} from '../../../common/constants/explorer';

const initialState = {
  queryTabIds: [initialTabId],
  selectedQueryTab: initialTabId
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
    setSelectedQueryTab: (state, { payload }) => {
      state[SELECTED_QUERY_TAB] = payload.tabId;
    }
  },
  extraReducers: (builder) => {}
});

export const {
  addTab,
  removeTab,
  setSelectedQueryTab
} = queryTabsSlice.actions;

export const selectQueryTabs = (state) => state.explorerTabs;

export default queryTabsSlice.reducer;