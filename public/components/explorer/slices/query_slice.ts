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
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { 
  RAW_QUERY,
  FINAL_QUERY,
  SELECTED_DATE_RANGE,
  REDUX_EXPL_SLICE_QUERIES,
  INDEX
} from '../../../../common/constants/explorer';

const initialQueryState = {
  [RAW_QUERY]: '',
  [FINAL_QUERY]: '',
  [INDEX]: '',
  [SELECTED_DATE_RANGE]: ['now-15m', 'now']
};

const initialState = {
  [initialTabId]: {
    ...initialQueryState
  }
};

export const queriesSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERIES,
  initialState,
  reducers: {
    changeQuery: (state, { payload }) => {
      state[payload.tabId] = {
        ...state[payload.tabId],
        ...payload.query
      }
    },
    changeDateRange: (state, { payload }) => {
      state[payload.tabId] = {
        ...state[payload.tabId],
        ...payload.data
      }
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialQueryState
      };
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    }
  },
  extraReducers: (builder) => {}
});

export const {
  changeQuery,
  changeDateRange,
  remove,
  init
} = queriesSlice.actions;

export const selectQueries = (state) => state.queries;

export default queriesSlice.reducer;