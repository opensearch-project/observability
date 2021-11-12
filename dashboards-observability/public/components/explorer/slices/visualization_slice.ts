/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  createSlice
} from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { REDUX_EXPL_SLICE_VISUALIZATION } from '../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {}
};

export const explorerVisualizationSlice = createSlice({
  name: REDUX_EXPL_SLICE_VISUALIZATION,
  initialState,
  reducers: {
    render: (state, { payload }) => {
      state[payload.tabId] = payload.data;
    },
    reset: (state, { payload }) => {
      state[payload.tabId] = {};
    },
  },
  extraReducers: (builder) => {}
});

export const {
  render,
  reset
} = explorerVisualizationSlice.actions;

export const selectExplorerVisualization = (state) => state.explorerVisualization;

export default explorerVisualizationSlice.reducer;