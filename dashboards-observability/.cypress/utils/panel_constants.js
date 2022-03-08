/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const delay = 1300;

export const TEST_PANEL = 'Test Panel';
export const SAMPLE_PANEL = '[Logs] Web traffic Panel';

export const SAMPLE_VISUALIZATIONS_NAMES = [
  '[Logs] Average ram usage by operating systems',
  '[Logs] Average ram usage per day by apple os',
  '[Logs] Average ram usage per day by windows os',
  '[Logs] Daily count for error response codes',
  '[Logs] Count requests from US to CN, IN and JP',
  '[Logs] Max and average bytes by host',
  '[Logs] Count total requests by tags',
  '[Logs] Daily average bytes',
];

export const PPL_VISUALIZATIONS = [
  'source = opensearch_dashboards_sample_data_flights | stats count() by Dest',
  'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
  'source = opensearch_dashboards_sample_data_flights | stats max( DistanceKilometers ) by DestCityName',
];

export const PPL_VISUALIZATIONS_NAMES = [
  'Flight count by destination',
  'Average flight delay minutes',
  'Max distance by destination city',
];

export const NEW_VISUALIZATION_NAME = 'Flight count by destination airport';

export const PPL_FILTER = "where Carrier = 'OpenSearch-Air' | where Dest = 'Munich Airport'";
