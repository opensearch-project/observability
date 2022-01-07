/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { REDUX_EXPL_SLICE_VISUALIZATION } from '../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {},
};

export const visualizationConfigSlice = createSlice({
  name: 'explorerVizConfigs',
  initialState,
  reducers: {
    change: (state, { payload }) => {
      state[payload.tabId] = payload.data;
    },
    reset: (state, { payload }) => {
      state[payload.tabId] = {};
    },
  },
  extraReducers: (builder) => {},
});

export const { change, reset } = visualizationConfigSlice.actions;

export const selectVisualizationConfig = (state) => state.explorerVisualizationConfig;

export default visualizationConfigSlice.reducer;
