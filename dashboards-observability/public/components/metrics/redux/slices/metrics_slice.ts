/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import {
  SELECTED_METRICS,
  UNSELECTED_METRICS,
  AVAILABLE_METRICS,
  REDUX_SLICE_METRICS,
} from '../../../../../common/constants/metrics';

const initialMetrics = {
  [SELECTED_METRICS]: ['prometheus_tsdb_reloads_total'],
  [UNSELECTED_METRICS]: ['prometheus_tsdb_reloads_total'],
  [AVAILABLE_METRICS]: ['prometheus_tsdb_reloads_total'],
};

const initialState = {
  metrics: { ...initialMetrics },
};

export const metricSlice = createSlice({
  name: REDUX_SLICE_METRICS,
  initialState,
  reducers: {
    init: (state) => {
      state.metrics = {
        ...initialMetrics,
      };
    },
    updateMetrics: (state, { payload }) => {
      state = {
        ...state,
        ...payload.data,
      };
    },
    reset: (state) => {
      state.metrics = {
        ...initialMetrics,
      };
    },
    remove: (state) => {
      delete state.metrics;
    },
    fetchMetrics: (state, { payload }) => {
      state = {
        ...state,
        ...payload.data,
      };
    }

  },
  extraReducers: (builder) => {},
});

export const { init, reset, remove, updateMetrics } = metricSlice.actions;

export const selectMetrics = (state) => state.metrics;

export default metricSlice.reducer;
