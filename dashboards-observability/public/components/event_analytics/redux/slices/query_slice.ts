/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import {
  APP_ANALYTICS_TAB_ID_REGEX,
  FILTERED_PATTERN,
  FINAL_QUERY,
  INDEX,
  PATTERN_REGEX,
  PPL_DEFAULT_PATTERN_REGEX_FILETER,
  RAW_QUERY,
  REDUX_EXPL_SLICE_QUERIES,
  SELECTED_DATE_RANGE,
  SELECTED_PATTERN_FIELD,
  SELECTED_TIMESTAMP,
} from '../../../../../common/constants/explorer';
import { initialTabId } from '../../../../framework/redux/store/shared_state';

const initialQueryState = {
  [RAW_QUERY]: '',
  [FINAL_QUERY]: '',
  [INDEX]: '',
  [SELECTED_PATTERN_FIELD]: '',
  [PATTERN_REGEX]: PPL_DEFAULT_PATTERN_REGEX_FILETER,
  [FILTERED_PATTERN]: '',
  [SELECTED_TIMESTAMP]: '',
  [SELECTED_DATE_RANGE]: ['now-15m', 'now'],
};

const appBaseQueryState = {
  [RAW_QUERY]: '',
  [FINAL_QUERY]: '',
  [INDEX]: '',
  [SELECTED_PATTERN_FIELD]: '',
  [PATTERN_REGEX]: PPL_DEFAULT_PATTERN_REGEX_FILETER,
  [FILTERED_PATTERN]: '',
  [SELECTED_TIMESTAMP]: '',
  [SELECTED_DATE_RANGE]: ['now-24h', 'now'],
};

const initialState = {
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
      state[payload.tabId] = payload.tabId.match(APP_ANALYTICS_TAB_ID_REGEX)
        ? appBaseQueryState
        : initialQueryState;
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
