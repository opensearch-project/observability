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
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  REDUX_EXPL_SLICE_FIELDS
} from '../../../../common/constants/explorer';

const initialFields = {
  [SELECTED_FIELDS]: [],
  [UNSELECTED_FIELDS]: []
};

const initialState = {
  [initialTabId]: {
    ...initialFields
  }
};

export const fieldSlice = createSlice({
  name: REDUX_EXPL_SLICE_FIELDS,
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialFields
      };
    },
    updateFields: (state, { payload }) => {
      state[payload.tabId] = {
        ...payload.data
      };
    },
    reset: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialFields
      }
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    }
  },
  extraReducers: (builder) => {}
});

export const {
  init,
  reset,
  remove,
  updateFields
} = fieldSlice.actions;

export const selectFields = (state) => state.fields;

export default fieldSlice.reducer;