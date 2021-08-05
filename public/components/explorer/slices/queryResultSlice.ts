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
import { fetchSuccess as fetchSuccessReducer } from '../reducers'
import { initialTabId } from '../../../framework/redux/store/sharedState';
import { 
  REDUX_EXPL_SLICE_QUERY_RESULT
} from '../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {}
};

export const queryResultSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERY_RESULT,
  initialState,
  reducers: {
    fetchSuccess: fetchSuccessReducer,
    reset: (state, { payload }) => {
      state[payload.tabId] = {}
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {}
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    }
  },
});

export const {
  fetchSuccess,
  remove,
  reset,
  init
} = queryResultSlice.actions;

export const selectQueryResult = (state) => state.queryResults;

export default queryResultSlice.reducer;