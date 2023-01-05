/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const JAEGER_INDEX_NAME = '*jaeger-span-*';
export const JAEGER_SERVICE_INDEX_NAME = '*jaeger-service*';
export const DATA_PREPPER_INDEX_NAME = 'otel-v1-apm-span-*';
export const DATA_PREPPER_SERVICE_INDEX_NAME = 'otel-v1-apm-service-map*';
export const TRACE_ANALYTICS_DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const TRACE_ANALYTICS_PLOTS_DATE_FORMAT = 'MMM D, YYYY HH:mm:ss';
export const SERVICE_MAP_MAX_NODES = 500;
// size limit when requesting edge related queries, not necessarily the number of edges
export const SERVICE_MAP_MAX_EDGES = 1000;
export const TRACES_MAX_NUM = 3000;
export const TRACE_ANALYTICS_DOCUMENTATION_LINK = 'https://opensearch.org/docs/latest/observability-plugin/trace/index/';

export const TRACE_ANALYTICS_JAEGER_INDICES_ROUTE = '/api/observability/trace_analytics/jaegerindices';
export const TRACE_ANALYTICS_DATA_PREPPER_INDICES_ROUTE = '/api/observability/trace_analytics/data_prepper_indices';
export const TRACE_ANALYTICS_DSL_ROUTE = '/api/observability/trace_analytics/query';
