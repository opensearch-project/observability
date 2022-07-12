/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { visChartTypes } from './shared';
export const EVENT_ANALYTICS_DOCUMENTATION_URL =
  'https://opensearch.org/docs/latest/observability-plugin/event-analytics/';
export const OPEN_TELEMETRY_LOG_CORRELATION_LINK =
  'https://opentelemetry.io/docs/reference/specification/logs/overview/#log-correlation';
export const RAW_QUERY = 'rawQuery';
export const FINAL_QUERY = 'finalQuery';
export const SELECTED_DATE_RANGE = 'selectedDateRange';
export const INDEX = 'index';
export const SELECTED_TIMESTAMP = 'selectedTimestamp';
export const SELECTED_FIELDS = 'selectedFields';
export const UNSELECTED_FIELDS = 'unselectedFields';
export const AVAILABLE_FIELDS = 'availableFields';
export const QUERIED_FIELDS = 'queriedFields';
export const TAB_ID_TXT_PFX = 'query-panel-';
export const TAB_TITLE = 'New query';
export const TAB_CHART_TITLE = 'Visualizations';
export const TAB_EVENT_TITLE = 'Events';
export const TAB_EVENT_ID_TXT_PFX = 'main-content-events-';
export const TAB_CHART_ID_TXT_PFX = 'main-content-vis-';
export const TAB_EVENT_ID = 'main-content-events';
export const TAB_CHART_ID = 'main-content-vis';
export const HAS_SAVED_TIMESTAMP = 'hasSavedTimestamp';
export const FILTER_OPTIONS = ['Visualization', 'Query'];
export const SAVED_QUERY = 'savedQuery';
export const SAVED_VISUALIZATION = 'savedVisualization';
export const SAVED_OBJECT_ID = 'savedObjectId';
export const SAVED_OBJECT_TYPE = 'objectType';
export const TAB_CREATED_TYPE = 'tabCreatedType';
export const NEW_TAB = 'newTab';
export const REDIRECT_TAB = 'redirect_tab';
export const PAGE_SIZE = 50;
export const DEFAULT_COLUMNS = ['', 'Time', '_source'];
export const OTEL_TRACE_ID = 'traceId';
export const DATE_PICKER_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_INTERVAL_OPTIONS = [
  {
    text: 'Minute',
    value: 'm',
  },
  {
    text: 'Hour',
    value: 'h',
  },
  {
    text: 'Day',
    value: 'd',
  },
  {
    text: 'Week',
    value: 'w',
  },
  {
    text: 'Month',
    value: 'M',
  },
  {
    text: 'Year',
    value: 'y',
  },
];

// redux
export const SELECTED_QUERY_TAB = 'selectedQueryTab';
export const QUERY_TAB_IDS = 'queryTabIds';
export const NEW_SELECTED_QUERY_TAB = 'newSelectedQueryTab';
export const REDUX_EXPL_SLICE_QUERIES = 'queries';
export const REDUX_EXPL_SLICE_QUERY_RESULT = 'queryResults';
export const REDUX_EXPL_SLICE_FIELDS = 'fields';
export const REDUX_EXPL_SLICE_QUERY_TABS = 'queryTabs';
export const REDUX_EXPL_SLICE_VISUALIZATION = 'explorerVisualization';
export const REDUX_EXPL_SLICE_COUNT_DISTRIBUTION = 'countDistributionVisualization';
export const PLOTLY_GAUGE_COLUMN_NUMBER = 4;
export const APP_ANALYTICS_TAB_ID_REGEX = /application-analytics-tab.+/;
export const DEFAULT_AVAILABILITY_QUERY = 'stats count() by span( timestamp, 1h )';
export const ADD_BUTTON_TEXT = '+ Add color theme';

export const VIZ_CONTAIN_XY_AXIS = [
  visChartTypes.Bar,
  visChartTypes.Histogram,
  visChartTypes.Line,
  visChartTypes.Pie,
];

// default ppl aggregation method options
export const AGGREGATION_OPTIONS = [
  {
    label: 'COUNT',
  },
  {
    label: 'SUM',
  },
  {
    label: 'AVERAGE',
  },
  {
    label: 'MAX',
  },
  {
    label: 'MIN',
  },
  {
    label: 'VAR_SAMP',
  },
  {
    label: 'VAR_POP',
  },
  {
    label: 'STDDEV_SAMP',
  },
  {
    label: 'STDDEV_POP',
  },
];

// numeric fields type for metrics
export const numericalTypes = ['float', 'double', 'bigint', 'long', 'octet', 'short', 'byte'];
// Data table constants
export const GRID_HEADER_COLUMN_MAX_WIDTH = '150px';
export const GRID_PAGE_RANGE_DISPLAY = 5;
export const COLUMN_DEFAULT_MIN_WIDTH = 100;
export const GRID_PAGE_SIZES = [10, 50, 100];
export const ROW_DENSITIES = [
  { icon: 'tableDensityExpanded', height: 55, selected: false },
  { icon: 'tableDensityNormal', height: 45, selected: false },
  { icon: 'tableDensityCompact', height: 35, selected: true },
];

export const HEADER_HEIGHT = 35;
