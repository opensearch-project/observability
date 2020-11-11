export const PLUGIN_ID = 'opendistro-trace-analytics';
export const PLUGIN_NAME = 'Trace Analytics';

export const RAW_INDEX_NAME = 'otel-v1-apm-span-*';
export const SERVICE_MAP_INDEX_NAME = 'otel-v1-apm-service-map';
export const DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const DATE_PICKER_FORMAT = 'MMM D, YYYY HH:mm:ss';
export const SERVICE_MAP_MAX_NODES = 500;
// size limit when requesting edge related queries, not necessarily the number of edges
export const SERVICE_MAP_MAX_EDGES = 1000;
