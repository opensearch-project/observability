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

export const sampleVisualizationSet1 = [
  {
    name: 'sample-visualization-1',
    description: '',
    query:
      'index = opensearch_dashboards_sample_data_logs | stats max(bytes) as mbytes, max(bytes+1000) as m1bytes, max(bytes+1500) as m2bytes, max(bytes+2000) as m3bytes, max(bytes+2500) as m4bytes, avg(bytes) as abytes, avg(bytes+1000) as a1bytes, avg(bytes+1500) as a2bytes, avg(bytes+2000) as a3bytes, avg(bytes+2500) as a4bytes by host',
    type: 'bar',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-2',
    description: '',
    query:
      'index = opensearch_dashboards_sample_data_logs | stats max(bytes) as mbytes, max(bytes+1000) as m1bytes, max(bytes+1500) as m2bytes, max(bytes+2000) as m3bytes, max(bytes+2500) as m4bytes, avg(bytes) as abytes, avg(bytes+1000) as a1bytes, avg(bytes+1500) as a2bytes, avg(bytes+2000) as a3bytes, avg(bytes+2500) as a4bytes by host',
    type: 'horizontal_bar',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-3',
    description: '',
    query:
      'index = opensearch_dashboards_sample_data_logs | stats max(bytes) as mbytes, max(bytes+1000) as m1bytes, max(bytes+1500) as m2bytes, max(bytes+2000) as m3bytes, max(bytes+2500) as m4bytes, avg(bytes) as abytes, avg(bytes+1000) as a1bytes, avg(bytes+1500) as a2bytes, avg(bytes+2000) as a3bytes, avg(bytes+2500) as a4bytes by host',
    type: 'line',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-4',
    description: '',
    query:
      'source = opensearch_dashboards_sample_data_logs | stats sum(bytes) by span(timestamp, 1h)',
    type: 'line',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-5',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats count() by agent',
    type: 'bar',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-6',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats max(bytes) by host',
    type: 'bar',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-7',
    description: '',
    query:
      'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
    type: 'bar',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-8',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats count() by span(timestamp,1d)',
    type: 'line',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'utc_time',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
  {
    name: 'sample-visualization-9',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats count() by host',
    type: 'line',
    selected_date_range: {
      start: 'now/y',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'utc_time',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [],
    },
  },
];
