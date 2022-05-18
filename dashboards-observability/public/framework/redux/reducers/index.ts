/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { combineReducers } from 'redux';

import queriesReducer from '../../../components/event_analytics/redux/slices/query_slice';
import queryResultsReducer from '../../../components/event_analytics/redux/slices/query_result_slice';
import queryTabReducer from '../../../components/event_analytics/redux/slices/query_tab_slice';
import FieldsReducer from '../../../components/event_analytics/redux/slices/field_slice';
import countDistributionReducer from '../../../components/event_analytics/redux/slices/count_distribution_slice';
import explorerVisualizationReducer from '../../../components/event_analytics/redux/slices/visualization_slice';
import explorerVisualizationConfigReducer from '../../../components/event_analytics/redux/slices/viualization_config_slice';

const rootReducer = combineReducers({
  // explorer reducers
  queries: queriesReducer,
  queryResults: queryResultsReducer,
  explorerTabs: queryTabReducer,
  fields: FieldsReducer,
  countDistribution: countDistributionReducer,
  explorerVisualization: explorerVisualizationReducer,
  explorerVisualizationConfig: explorerVisualizationConfigReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
