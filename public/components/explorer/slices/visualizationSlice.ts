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
  RAW_QUERY,
  REDUX_EXPL_SLICE_QUERIES
} from '../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {}
};

export const explorerVisualizationSlice = createSlice({
  name: 'explorerVisualization',
  initialState,
  reducers: {
    render: (state, { payload }) => {
      state[payload.tabId] = payload.data;
    }
  },
  extraReducers: (builder) => {}
});

export const {
  render
} = explorerVisualizationSlice.actions;

export const selectExplorerVisualization = (state) => state.explorerVisualization;

export default explorerVisualizationSlice.reducer;