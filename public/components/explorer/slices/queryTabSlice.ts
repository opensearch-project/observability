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

const initialState = {
  queryTabIds: [initialTabId],
  selectedQueryTab: initialTabId
};

export const queryTabsSlice = createSlice({
  name: 'queryTabs',
  initialState,
  reducers: {
    addTab: (state, { payload }) => {
      state['queryTabIds'].push(payload.tabId);
      state['selectedQueryTab'] = payload.tabId;
    },
    removeTab: (state, { payload }) => {
      state['queryTabIds'] = state['queryTabIds'].filter((tabId) => {
        if (tabId === payload.tabId) return false;
        return true;
      });
      state['selectedQueryTab'] = payload['newSelectedQueryTab'];
    },
    setSelectedQueryTab: (state, { payload }) => {
      state['selectedQueryTab'] = payload.tabId;
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