/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { fetchSuccess as fetchSuccessReducer } from '../reducers';
import { initialTabId } from '../../../../framework/redux/store/shared_state';
import { REDUX_EXPL_SLICE_QUERY_RESULT } from '../../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {},
};

export const queryResultSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERY_RESULT,
  initialState,
  reducers: {
    fetchSuccess: fetchSuccessReducer,
    reset: (state, { payload }) => {
      state[payload.tabId] = {};
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {};
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    },
  },
});

export const { fetchSuccess, remove, reset, init } = queryResultSlice.actions;

export const selectQueryResult = (state) => state.queryResults;

export default queryResultSlice.reducer;
