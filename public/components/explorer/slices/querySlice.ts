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
} from '../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {
    [RAW_QUERY]: ''
  }
};

export const queriesSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERIES,
  initialState,
  reducers: {
    changeQuery: (state, { payload }) => {
      state[payload.tabId] = payload.query;
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {
        [RAW_QUERY]: ''
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
  remove,
  init
} = queriesSlice.actions;

export const selectQueries = (state) => state.queries;

export default queriesSlice.reducer;