/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

export const PLUGIN_ID = 'trace-analytics-dashboards';
export const PLUGIN_NAME = 'Trace Analytics';

export const RAW_INDEX_NAME = 'otel-v1-apm-span-*';
export const SERVICE_MAP_INDEX_NAME = 'otel-v1-apm-service-map*';
export const DATE_FORMAT = 'MM/DD/YYYY HH:mm:ss';
export const DATE_PICKER_FORMAT = 'MMM D, YYYY HH:mm:ss';
export const SERVICE_MAP_MAX_NODES = 500;
// size limit when requesting edge related queries, not necessarily the number of edges
export const SERVICE_MAP_MAX_EDGES = 1000;
export const TRACES_MAX_NUM = 3000;
export const DOCUMENTATION_LINK = 'https://opendistro.github.io/for-elasticsearch-docs/docs/trace/';

