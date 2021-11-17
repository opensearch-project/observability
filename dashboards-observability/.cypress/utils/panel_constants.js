/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const delay = 1500;

export const TEST_PANEL = 'Test Panel';

export const PPL_VISUALIZATIONS = [
  'source = opensearch_dashboards_sample_data_flights | stats count() by Dest',
  'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
];

export const PPL_VISUALIZATIONS_NAMES = [
  'Flight count by destination',
  'Average flight delay minutes',
];

export const PPL_FILTER = "where Carrier = 'OpenSearch-Air' | where Dest = 'Munich Airport'";
