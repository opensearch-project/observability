/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IField } from '../../common/types/explorer';
import CSS from 'csstype';

// Client route
export const PPL_BASE = '/api/ppl';
export const PPL_SEARCH = '/search';
export const DSL_BASE = '/api/dsl';
export const DSL_SEARCH = '/search';
export const DSL_CAT = '/cat.indices';
export const DSL_MAPPING = '/indices.getFieldMapping';
export const OBSERVABILITY_BASE = '/api/observability';
export const EVENT_ANALYTICS = '/event_analytics';
export const SAVED_OBJECTS = '/saved_objects';
export const SAVED_QUERY = '/query';
export const SAVED_VISUALIZATION = '/vis';

// Server route
export const PPL_ENDPOINT = '/_plugins/_ppl';
export const SQL_ENDPOINT = '/_plugins/_sql';
export const DSL_ENDPOINT = '/_plugins/_dsl';

export const observabilityID = 'observability-dashboards';
export const observabilityTitle = 'Observability';
export const observabilityPluginOrder = 6000;

// Shared Constants
export const SQL_DOCUMENTATION_URL = 'https://opensearch.org/docs/latest/search-plugins/sql/index/';
export const PPL_DOCUMENTATION_URL =
  'https://opensearch.org/docs/latest/observability-plugin/ppl/commands/';
export const UI_DATE_FORMAT = 'MM/DD/YYYY hh:mm A';
export const PPL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSSSSS';
export const SPAN_REGEX = /span/;
export const PPL_SPAN_REGEX = /by\s*span/i;
export const PPL_STATS_REGEX = /\|\s*stats/i;
export const PPL_INDEX_INSERT_POINT_REGEX = /(search source|source|index)\s*=\s*([^|\s]+)(.*)/i;
export const PPL_INDEX_REGEX = /(search source|source|index)\s*=\s*([^|\s]+)/i;
export const PPL_NEWLINE_REGEX = /[\n\r]+/g;

// Observability plugin URI
const BASE_OBSERVABILITY_URI = '/_plugins/_observability';
export const OPENSEARCH_PANELS_API = {
  OBJECT: `${BASE_OBSERVABILITY_URI}/object`,
};

// Saved Objects
export const SAVED_OBJECT = '/object';

// Color Constants
export const PLOTLY_COLOR = [
  '#3CA1C7',
  '#8C55A3',
  '#DB748A',
  '#F2BE4B',
  '#68CCC2',
  '#2A7866',
  '#843769',
  '#374FB8',
  '#BD6F26',
  '#4C636F',
];

export const LONG_CHART_COLOR = PLOTLY_COLOR[1];

export const pageStyles: CSS.Properties = {
  float: 'left',
  width: '100%',
  maxWidth: '1130px',
};

export enum visChartTypes {
  Bar = 'bar',
  HorizontalBar = 'horizontal_bar',
  Line = 'line',
  Pie = 'pie',
  HeatMap = 'heatmap',
  Text = 'text',
  Gauge = 'gauge',
  Histogram = 'histogram',
  TreeMap = 'tree_map',
  Scatter = 'scatter',
  LogsView = 'logs_view',
}

export interface ValueOptionsAxes {
  xaxis?: IField[];
  yaxis?: IField[];
  zaxis?: IField[];
  childField?: IField[];
  valueField?: IField[];
  series?: IField[];
  value?: IField[];
}

export const NUMERICAL_FIELDS = ['short', 'integer', 'long', 'float', 'double'];

export const ENABLED_VIS_TYPES = [
  visChartTypes.Bar,
  visChartTypes.HorizontalBar,
  visChartTypes.Line,
  visChartTypes.Pie,
  visChartTypes.HeatMap,
  visChartTypes.Text,
  visChartTypes.TreeMap,
  visChartTypes.Gauge,
  visChartTypes.Histogram,
  visChartTypes.Scatter,
  visChartTypes.LogsView,
];

//Live tail constants
export const LIVE_OPTIONS = [
  {
    label: '5s',
    startTime: 'now-5s',
    delayTime: 5000,
  },
  {
    label: '10s',
    startTime: 'now-10s',
    delayTime: 10000,
  },
  {
    label: '30s',
    startTime: 'now-30s',
    delayTime: 30000,
  },
  {
    label: '1m',
    startTime: 'now-1m',
    delayTime: 60000,
  },
  {
    label: '5m',
    startTime: 'now-5m',
    delayTime: 60000 * 5,
  },
  {
    label: '15m',
    startTime: 'now-15m',
    delayTime: 60000 * 15,
  },
  {
    label: '30m',
    startTime: 'now-30m',
    delayTime: 60000 * 30,
  },
  {
    label: '1h',
    startTime: 'now-1h',
    delayTime: 60000 * 60,
  },
  {
    label: '2h',
    startTime: 'now-2h',
    delayTime: 60000 * 120,
  },
];

export const LIVE_END_TIME = 'now';
export interface DefaultChartStylesProps {
  DefaultModeLine: string;
  Interpolation: string;
  LineWidth: number;
  FillOpacity: number;
  MarkerSize: number;
  ShowLegend: string;
  LegendPosition: string;
  LabelAngle: number;
  DefaultSortSectors: string;
  DefaultModeScatter: string;
}

export const DefaultChartStyles: DefaultChartStylesProps = {
  DefaultModeLine: 'lines',
  Interpolation: 'spline',
  LineWidth: 2,
  FillOpacity: 40,
  MarkerSize: 5,
  ShowLegend: 'show',
  LegendPosition: 'v',
  LabelAngle: 0,
  DefaultSortSectors: 'largest_to_smallest',
  DefaultModeScatter: 'markers',
};

export const FILLOPACITY_DIV_FACTOR = 200;
