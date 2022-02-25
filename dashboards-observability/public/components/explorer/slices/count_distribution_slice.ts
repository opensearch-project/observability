/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { REDUX_EXPL_SLICE_COUNT_DISTRIBUTION } from '../../../../common/constants/explorer';

const initialState = {
  [initialTabId]: {},
};

export const countDistributionSlice = createSlice({
  name: REDUX_EXPL_SLICE_COUNT_DISTRIBUTION,
  initialState,
  reducers: {
    render: (state, { payload }) => {
      state[payload.tabId] = {
        ...payload.data,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { render } = countDistributionSlice.actions;

export const selectCountDistribution = (state) => state.countDistribution;

export default countDistributionSlice.reducer;
