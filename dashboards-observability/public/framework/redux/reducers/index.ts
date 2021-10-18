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

import { combineReducers } from 'redux';

import queriesReducer from '../../../components/explorer/slices/query_slice';
import queryResultsReducer from '../../../components/explorer/slices/query_result_slice';
import queryTabReducer from '../../../components/explorer/slices/query_tab_slice';
import FieldsReducer from '../../../components/explorer/slices/field_slice';
import countDistributionReducer from '../../../components/explorer/slices/count_distribution_slice';
import explorerVisualizationReducer from '../../../components/explorer/slices/visualization_slice';

const rootReducer = combineReducers({

  // explorer reducers
  queries: queriesReducer,
  queryResults: queryResultsReducer,
  explorerTabs: queryTabReducer,
  fields: FieldsReducer,
  countDistribution: countDistributionReducer,
  explorerVisualization: explorerVisualizationReducer

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;