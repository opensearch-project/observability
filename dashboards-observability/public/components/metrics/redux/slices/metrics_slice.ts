/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice } from '@reduxjs/toolkit';
import { forEach } from 'lodash';
import {
  SELECTED_METRICS,
  RECENTLY_CREATED_METRICS,
  AVAILABLE_METRICS,
  REDUX_SLICE_METRICS,
} from '../../../../../common/constants/metrics';

const METRIC_NAMES_PPL = 'source = prometheus.information_schema.tables';
import { metricNamesTablePPL } from './mockMetrics';

const initialMetrics = {
  [SELECTED_METRICS]: [],
  [RECENTLY_CREATED_METRICS]: [],
  [AVAILABLE_METRICS]: metricNamesTablePPL.datarows,
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
      state.metrics = {
        ...state.metrics,
        ...payload.data,
      };
      console.log('updated metrics');
      console.log(state);
    },
    reset: (state) => {
      state.metrics = {
        ...initialMetrics,
      };
    },
    remove: (state) => {
      delete state.metrics;
    },
    sortMetrics: (state, { payload }) => {
      forEach(payload.data, (toSort: string) => {
        state.metrics[toSort].sort((prev: any, cur: any) => cur[2].localeCompare(prev[2]));
      });
    },
    fetchMetrics: (state, { payload }) => {
      state = {
        ...state,
        ...payload.data,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { init, reset, remove, updateMetrics, sortMetrics } = metricSlice.actions;

export const selectMetrics = (state) => state.metrics;

export default metricSlice.reducer;
