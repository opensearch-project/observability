/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const TAB_OVERVIEW_ID_TXT_PFX = 'app-analytics-overview-';
export const TAB_SERVICE_ID_TXT_PFX = 'app-analytics-service-';
export const TAB_TRACE_ID_TXT_PFX = 'app-analytics-trace-';
export const TAB_LOG_ID_TXT_PFX = 'app-analytics-log-';
export const TAB_CONFIG_ID_TXT_PFX = 'app-analytics-config-';
export const TAB_OVERVIEW_TITLE = 'Overview';
export const TAB_SERVICE_TITLE = 'Services';
export const TAB_TRACE_TITLE = 'Traces & Spans';
export const TAB_LOG_TITLE = 'Log Events';
export const TAB_CONFIG_TITLE = 'Configuration';

export const APP_ANALYTICS_API_PREFIX = '/api/observability/app_analytics'

export interface optionType {
  label: string;
}

export type ApplicationListType = {
  name: string;
  id: string;
  composition: string;
  currentAvailability: string;
  availabilityMetrics: string;
  dateCreated: string;
  dateModified: string;
};

export type ApplicationType = {
  name: string;
  description: string;
  query: string;
  selectedServices: Array<string>;
  selectedTraces: Array<string>;
}