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
 
export const RAW_QUERY = 'rawQuery';
export const INDEX = 'index';
export const SELECTED_FIELDS = 'selectedFields';
export const UNSELECTED_FIELDS = 'unselectedFields';
export const AVAILABLE_FIELDS = 'availableFields';
export const TAB_ID_TXT_PFX = 'query-panel-';
export const TAB_TITLE = 'New query';
export const TAB_CHART_TITLE = 'Visualizations';
export const TAB_EVENT_TITLE = 'Events';
export const TAB_EVENT_ID_TXT_PFX = 'main-content-events-';
export const TAB_CHART_ID_TXT_PFX = 'main-content-charts-';

export const TIME_INTERVAL_OPTIONS = [
  {
    display: 'Auto',
    val: 'h' // same as value of Hour for now
  },
  {
    display: 'Millisecond',
    val: 'ms'
  },
  {
    display: 'Second',
    val: 's'
  },
  {
    display: 'Minute',
    val: 'm'
  },
  {
    display: 'Hour',
    val: 'h'
  },
  {
    display: 'Day',
    val: 'd'
  },
  {
    display: 'Week',
    val: 'w'
  },
  {
    display: 'Month',
    val: 'M'
  },
  {
    display: 'Year',
    val: 'y'
  },
]

// redux
export const SELECTED_QUERY_TAB = 'selectedQueryTab';
export const QUERY_TAB_IDS = 'queryTabIds';
export const NEW_SELECTED_QUERY_TAB = 'newSelectedQueryTab';
export const REDUX_EXPL_SLICE_QUERIES = 'queries';
export const REDUX_EXPL_SLICE_QUERY_RESULT = 'queryResults';
export const REDUX_EXPL_SLICE_FIELDS = 'fields';
export const REDUX_EXPL_SLICE_QUERY_TABS = 'queryTabs';
export const REDUX_EXPL_SLICE_VISUALIZATION = 'explorerVisualization';
export const REDUX_EXPL_SLICE_COUNT_DISTRIBUTION = 'countDistributionVisualization'

