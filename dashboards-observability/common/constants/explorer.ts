/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { htmlIdGenerator } from '@elastic/eui';
import { VIS_CHART_TYPES } from './shared';
import { ThresholdUnitType } from '../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';

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
export const REDUX_EXPL_SLICE_PATTERNS = 'patterns';
export const PLOTLY_GAUGE_COLUMN_NUMBER = 4;
export const APP_ANALYTICS_TAB_ID_REGEX = /application-analytics-tab.+/;
export const DEFAULT_AVAILABILITY_QUERY = 'stats count() by span( timestamp, 1h )';
export const PATTERN_STATS_QUERY = '| patterns message | stats count() by patterns_field';
export const PATTERN_SELECT_QUERY = " | patterns message | where patterns_field='";
export const PPL_PATTERNS_REGEX = /\|\s*patterns\s+\S+\s*\|\s*where\s+patterns_field\s*\=\s*'[^a-zA-Z0-9]+'/;
export const ADD_BUTTON_TEXT = '+ Add color theme';
export const NUMBER_INPUT_MIN_LIMIT = 1;

export const VIZ_CONTAIN_XY_AXIS = [
  VIS_CHART_TYPES.Bar,
  VIS_CHART_TYPES.Histogram,
  VIS_CHART_TYPES.Line,
  VIS_CHART_TYPES.Pie,
  VIS_CHART_TYPES.Scatter,
  VIS_CHART_TYPES.HorizontalBar,
];

// default ppl aggregation method options
export const AGGREGATION_OPTIONS = [
  {
    label: 'count',
  },
  {
    label: 'sum',
  },
  {
    label: 'avg',
  },
  {
    label: 'max',
  },
  {
    label: 'min',
  },
  {
    label: 'var_samp',
  },
  {
    label: 'var_pop',
  },
  {
    label: 'stddev_samp',
  },
  {
    label: 'stddev_pop',
  },
];

// numeric fields type for metrics
export const NUMERICAL_TYPES = [
  'float',
  'double',
  'bigint',
  'long',
  'octet',
  'short',
  'byte',
  'integer',
];
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

// gauge chart default parameters
export interface DefaultGaugeChartParametersProps {
  GaugeTitleSize: number;
  DisplayDefaultGauges: number;
  OrientationDefault: string;
  TickLength: number;
  LegendPlacement: string;
  ThresholdsMaxLimit: number;
}

export const DEFAULT_GAUGE_CHART_PARAMETERS: DefaultGaugeChartParametersProps = {
  GaugeTitleSize: 14,
  DisplayDefaultGauges: 1,
  OrientationDefault: 'h',
  TickLength: 5,
  LegendPlacement: 'center',
  ThresholdsMaxLimit: 1,
};

// pie chart default parameters
export const PLOTLY_PIE_COLUMN_NUMBER = 2;
export const PIE_XAXIS_GAP = 0.2;
export const PIE_YAXIS_GAP = 0.1;
export interface DefaultPieChartParameterProps {
  DefaultMode: string;
}

export const DEFAULT_PIE_CHART_PARAMETERS: DefaultPieChartParameterProps = {
  DefaultMode: 'pie',
};
export const GROUPBY = 'dimensions';
export const AGGREGATIONS = 'series';
export const PARENTFIELDS = 'parentFields';
export const VALUEFIELD = 'valueField';
export const CHILDFIELD = 'childField';
export const TIMESTAMP = 'timestamp';

// stats constants
export const STATS_GRID_SPACE_BETWEEN_X_AXIS = 0.01;
export const STATS_GRID_SPACE_BETWEEN_Y_AXIS = 100;
export const STATS_REDUCE_VALUE_SIZE_PERCENTAGE = 0.08;
export const STATS_REDUCE_TITLE_SIZE_PERCENTAGE = 0.05;
export const STATS_REDUCE_SERIES_UNIT_SIZE_PERCENTAGE = 0.2;
export const STATS_SERIES_UNIT_SUBSTRING_LENGTH = 3;
export const STATS_AXIS_MARGIN = {
  l: 0,
  r: 0,
  b: 0,
  t: 80,
};

export const STATS_ANNOTATION = {
  xref: 'paper',
  yref: 'paper',
  showarrow: false,
};

export interface DefaultStatsChartParametersProps {
  DefaultTextMode: string;
  DefaultOrientation: string;
  DefaultTitleSize: number;
  DefaultChartType: string;
  TextAlignment: string;
  DefaultPrecision: number;
  DefaultValueSize: number;
  BaseThreshold: ThresholdUnitType;
  DefaultTextColor: string;
}

export const DEFAULT_STATS_CHART_PARAMETERS: DefaultStatsChartParametersProps = {
  DefaultTextMode: 'auto',
  DefaultOrientation: 'auto',
  DefaultTitleSize: 30,
  DefaultValueSize: 80,
  DefaultChartType: 'auto',
  TextAlignment: 'auto',
  DefaultPrecision: 1,
  BaseThreshold: {
    thid: htmlIdGenerator('thr')(),
    name: 'Base',
    color: '#3CA1C7',
    value: 0,
    isReadOnly: true,
  },
  DefaultTextColor: '#FFFFFF',
};
export interface DefaultBarChartStylesProps {
  BarMode: string;
  GroupWidth: number;
  BarWidth: number;
  LabelSize: number;
}

export const DEFAULT_BAR_CHART_STYLES: DefaultBarChartStylesProps = {
  BarMode: 'group',
  GroupWidth: 0.7,
  BarWidth: 0.97,
  LabelSize: 12,
};

export const SIMILAR_VIZ_TYPES = [
  VIS_CHART_TYPES.Line,
  VIS_CHART_TYPES.Scatter,
  VIS_CHART_TYPES.HorizontalBar,
  VIS_CHART_TYPES.Bar,
];

export enum ConfigChartOptionsEnum {
  palettePicker = 'palettePicker',
  singleColorPicker = 'singleColorPicker',
  colorpicker = 'colorpicker',
  treemapColorPicker = 'treemapColorPicker',
  input = 'input',
  textInput = 'textInput',
  slider = 'slider',
  switchButton = 'switchButton',
  buttons = 'buttons',
}

export const CUSTOM_LABEL = 'customLabel';
export const BREAKDOWNS = 'breakdowns';
