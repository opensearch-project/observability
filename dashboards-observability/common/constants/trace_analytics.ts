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

export const DATA_PREPPER_INDEX_NAME = 'otel-v1-apm-span-*';
export const DATA_PREPPER_SERVICE_INDEX_NAME = 'otel-v1-apm-service-map*';
export const TRACE_ANALYTICS_DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const TRACE_ANALYTICS_PLOTS_DATE_FORMAT = 'MMM D, YYYY HH:mm:ss';
export const SERVICE_MAP_MAX_NODES = 500;
// size limit when requesting edge related queries, not necessarily the number of edges
export const SERVICE_MAP_MAX_EDGES = 1000;
export const TRACES_MAX_NUM = 3000;
export const TRACE_ANALYTICS_DOCUMENTATION_LINK = 'https://docs-beta.opensearch.org/monitoring-plugins/trace/';

export const TRACE_ANALYTICS_INDICES_ROUTE = '/api/observability/trace_analytics/indices';
export const TRACE_ANALYTICS_DSL_ROUTE = '/api/observability/trace_analytics/query';
