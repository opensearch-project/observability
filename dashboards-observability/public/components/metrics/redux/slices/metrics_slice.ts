/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  REDUX_SLICE_METRICS,
} from '../../../../../common/constants/metrics';

const METRIC_NAMES_PPL = 'source = prometheus.information_schema.tables';
import { customMetricsTablePPL, metricNamesTablePPL } from './mockMetrics';

const initialState = 
{
  metrics: [],
  selected: []
}


export const loadMetrics = createAsyncThunk('metrics/loadData', async () => {
  const customData = fetchCustomMetrics();
  const remoteData = fetchRemoteMetrics();

  return Promise.all([customData, remoteData]).then(datasets => datasets.flat())
})

const fetchCustomMetrics = async () => {
  // normally a fetch() call or client with await

  const dataSet = customMetricsTablePPL.jsonData;

  const normalizedData = dataSet.map(obj => ({
    id: obj.objectId,
    name: obj.savedVisualization.name,
    catalog: 'CUSTOM_METRICS',
    type: obj.savedVisualization.type,
  }))
  return normalizedData;
}

const fetchRemoteMetrics = async () => {
  const dataSet = metricNamesTablePPL.jsonData

  const normalizedData = dataSet.map(obj => ({
    id: `${obj.TABLE_CATALOG}.${obj.TABLE_NAME}`,
    name: `${obj.TABLE_CATALOG}.${obj.TABLE_NAME}`,
    catalog: 'PROMETHEUS',
    type: obj.TABLE_TYPE
  }))
  return normalizedData;
}


export const metricSlice = createSlice({
  name: REDUX_SLICE_METRICS,
  initialState,
  reducers: {
    updateMetrics: (state, { payload }) => {
      state.metrics = {
        ...state.metrics,
        ...payload.data,
      };
      console.log('updated metrics');
      console.log(state);
    },
    selectMetric: (state, { payload }) => { 
      console.log("selectMetric", {state, payload})
      state.selected.push(payload.id) 
    },
    deSelectMetric: (state, { payload }) => {
      state.selected = state.selected.filter(id => id != payload.id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMetrics.fulfilled, (state, { payload }) => {
        const theState = {...state}
        console.log("loadMetrics.fulfilled", {metrics: theState.metrics, payload})
        state.metrics = payload;
        state.selected = [];
      })
  },
});

export const { deSelectMetric, selectMetric } = metricSlice.actions;

export const metricsStateSelector = (state) => state.metrics;

export const availableMetricsSelector = (state) => 
  state.metrics.metrics.filter(
    metric => !state.metrics.selected.includes(metric.id)
  );

export const selectedMetricsSelector = (state) =>
  state.metrics.metrics.filter(
    metric => state.metrics.selected.includes(metric.id)
  );


export default metricSlice.reducer;
