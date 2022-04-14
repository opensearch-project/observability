/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { initialTabId } from '../../../../framework/redux/store/shared_state';
import { REDUX_EXPL_SLICE_VISUALIZATION } from '../../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {},
};

export const visualizationConfigSlice = createSlice({
  name: 'explorerVizConfigs',
  initialState,
  reducers: {
    change: (state, { payload }) => {
      const { tabId, vizId, data } = payload;
      let curVizPrevState = {};
      if (state[tabId] && state[tabId][vizId]) {
        curVizPrevState = { ...state[tabId][vizId] };
      }
      state[tabId] = {
        ...state[tabId],
        [vizId]: {
          ...curVizPrevState,
          ...data,
        },
      };
    },
    reset: (state, { payload }) => {
      state[payload.tabId] = {};
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {};
    },
  },
  extraReducers: (builder) => {},
});

export const { change, reset, init } = visualizationConfigSlice.actions;

export const selectVisualizationConfig = (state) => state.explorerVisualizationConfig;

export default visualizationConfigSlice.reducer;
