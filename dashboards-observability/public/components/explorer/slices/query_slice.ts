/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import {
  RAW_QUERY,
  FINAL_QUERY,
  SELECTED_DATE_RANGE,
  REDUX_EXPL_SLICE_QUERIES,
  INDEX,
  SELECTED_TIMESTAMP,
} from '../../../../common/constants/explorer';

const initialQueryState = {
  [RAW_QUERY]: '',
  [FINAL_QUERY]: '',
  [INDEX]: '',
  [SELECTED_TIMESTAMP]: '',
  [SELECTED_DATE_RANGE]: ['now-15m', 'now'],
};

const appBaseQueryState = {
  [RAW_QUERY]: '',
  [FINAL_QUERY]: '',
  [INDEX]: '',
  [SELECTED_TIMESTAMP]: '',
  [SELECTED_DATE_RANGE]: ['now-24h', 'now'],
};

const initialState = {
  'application-analytics-tab': {
    ...appBaseQueryState,
  },
  [initialTabId]: {
    ...initialQueryState,
  },
};

export const queriesSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERIES,
  initialState,
  reducers: {
    changeQuery: (state, { payload }) => {
      state[payload.tabId] = {
        ...state[payload.tabId],
        ...payload.query,
      };
    },
    changeDateRange: (state, { payload }) => {
      state[payload.tabId] = {
        ...state[payload.tabId],
        ...payload.data,
      };
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialQueryState,
      };
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    },
  },
  extraReducers: (builder) => {},
});

export const { changeQuery, changeDateRange, remove, init } = queriesSlice.actions;

export const selectQueries = (state) => state.queries;

export default queriesSlice.reducer;
