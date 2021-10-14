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

export const observabilityID = 'observability';
export const observabilityTitle = 'Observability';
export const observabilityPluginOrder = 6000;

// Shared Constants 
export const UI_DATE_FORMAT = 'MM/DD/YYYY hh:mm A';
export const PPL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const PPL_STATS_REGEX = /\|\s*stats/i;
export const PPL_INDEX_INSERT_POINT_REGEX = /search (source|index)\s*=\s*([^\s]+)(.*)/i;
export const PPL_INDEX_REGEX = /(search source|source|index)\s*=\s*([^|\s]+)/i;

// Observability plugin URI
const BASE_OBSERVABILITY_URI = '/_plugins/_observability';
export const OPENSEARCH_PANELS_API = {
  OBJECT: `${BASE_OBSERVABILITY_URI}/object`,
};

// Saved Objects
export const SAVED_OBJECT = '/object';
