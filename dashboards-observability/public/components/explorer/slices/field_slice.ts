/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { forEach } from 'lodash';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import {
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  QUERIED_FIELDS,
  REDUX_EXPL_SLICE_FIELDS,
} from '../../../../common/constants/explorer';
import { IField } from '../../../../common/types/explorer';

const initialFields = {
  [SELECTED_FIELDS]: [],
  [UNSELECTED_FIELDS]: [],
  [AVAILABLE_FIELDS]: [],
  [QUERIED_FIELDS]: [],
};

const initialState = {
  [initialTabId]: {
    ...initialFields,
  },
  'application-analytics-tab': {
    ...initialFields,
  },
};

export const fieldSlice = createSlice({
  name: REDUX_EXPL_SLICE_FIELDS,
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialFields,
      };
    },
    updateFields: (state, { payload }) => {
      state[payload.tabId] = {
        ...state[payload.tabId],
        ...payload.data,
      };
    },
    reset: (state, { payload }) => {
      state[payload.tabId] = {
        ...initialFields,
      };
    },
    remove: (state, { payload }) => {
      delete state[payload.tabId];
    },
    sortFields: (state, { payload }) => {
      forEach(payload.data, (toSort: string) => {
        state[payload.tabId][toSort].sort((prev: IField, cur: IField) =>
          prev.name.localeCompare(cur.name)
        );
      });
    },
  },
  extraReducers: (builder) => {},
});

export const { init, reset, remove, updateFields, sortFields } = fieldSlice.actions;

export const selectFields = (state) => state.fields;

export default fieldSlice.reducer;
