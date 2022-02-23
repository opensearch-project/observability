/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
export const SQL_DOCUMENTATION_URL ='https://opensearch.org/docs/latest/search-plugins/sql/index/'
export const PPL_DOCUMENTATION_URL ='https://opensearch.org/docs/latest/observability/ppl/commands/'
export const UI_DATE_FORMAT = 'MM/DD/YYYY hh:mm A';
export const PPL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const PPL_SPAN_REGEX = /\|\s*span/i;
export const PPL_STATS_REGEX = /\|\s*stats/i;
export const PPL_INDEX_INSERT_POINT_REGEX = /(search source|source|index)\s*=\s*([^\s]+)(.*)/i;
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
