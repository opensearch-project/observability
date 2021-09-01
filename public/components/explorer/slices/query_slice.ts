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
  REDUX_EXPL_SLICE_QUERIES,
  INDEX
} from '../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {
    [RAW_QUERY]: '',
    [INDEX]: ''
  }
};

export const queriesSlice = createSlice({
  name: REDUX_EXPL_SLICE_QUERIES,
  initialState,
  reducers: {
    changeQuery: (state, { payload }) => {
      console.log('payload.query[RAW_QUERY]: ', payload.query[RAW_QUERY])
      console.log('payload.query[INDEX]: ', payload.query[INDEX])
      // state[payload.tabId] = { 
      //   [RAW_QUERY]: payload.query[RAW_QUERY],
      //   [INDEX]: payload.query[INDEX]
      // };
      state[payload.tabId] = {
        ...payload.query
      }
      console.log('state[payload.tabId]: ', state[payload.tabId])
    },
    init: (state, { payload }) => {
      state[payload.tabId] = {
        [RAW_QUERY]: '',
        [INDEX]: ''
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