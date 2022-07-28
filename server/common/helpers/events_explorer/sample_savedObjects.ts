/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const sampleVisualizations = [
  {
    name: '[Logs] Daily average bytes',
    description: '',
    query:
      'source = opensearch_dashboards_sample_data_logs | stats avg(bytes) by span(timestamp,1d)',
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
    name: '[Logs] Daily count for error response codes',
    description: '',
    query:
      "source = opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count() by span(timestamp,1d)",
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
    name: '[Logs] Average ram usage by operating systems',
    description: '',
    query:
      'source = opensearch_dashboards_sample_data_logs |  stats avg(machine.ram) by machine.os',
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
    name: '[Logs] Average ram usage per day by apple os',
    description: '',
    query:
      "source = opensearch_dashboards_sample_data_logs | where machine.os='osx' or  machine.os='ios' |  stats avg(machine.ram) by span(timestamp,1d)",
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
    name: '[Logs] Average ram usage per day by windows os ',
    description: '',
    query:
      "source = opensearch_dashboards_sample_data_logs | where match(machine.os,'win')  |  stats avg(machine.ram) by span(timestamp,1d)",
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
    name: '[Logs] Count requests from US to CN, IN and JP',
    description: '',
    query:
      "source = opensearch_dashboards_sample_data_logs | where geo.src='US' | where geo.dest='JP' or geo.dest='CN' or geo.dest='IN' | stats count() by geo.dest",
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
    name: '[Logs] Count total requests by tags ',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats count() by tags',
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
    name: '[Logs] Max and average bytes by host',
    description: '',
    query: 'source = opensearch_dashboards_sample_data_logs | stats max(bytes), avg(bytes) by host',
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
];

export const sampleQueries = [
  {
    name: '[Flights] Show all flights sorted by most delayed',
    description: '',
    query: 'source=opensearch_dashboards_sample_data_flights  | sort -FlightDelayMin',
    selected_date_range: {
      start: 'now/M',
      end: 'now',
      text: '',
    },
    selected_timestamp: {
      name: 'timestamp',
      type: 'timestamp',
    },
    selected_fields: {
      text: '',
      tokens: [
        {
          name: 'Carrier',
          type: 'string',
        },
        {
          name: 'Dest',
          type: 'string',
        },
        {
          name: 'DestAirportID',
          type: 'string',
        },
        {
          name: 'FlightDelayMin',
          type: 'integer',
        },
        {
          name: 'OriginAirportID',
          type: 'string',
        },
      ],
    },
  },
  {
    name: '[Logs] Show all logs lines where error code is 404 or 503',
    description: '',
    query: "source=opensearch_dashboards_sample_data_logs | where response='503' or response='404'",
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
    name:
      '[Logs] Show all logs lines where error code is 404 or 503 and deduplicate consecutive entries only',
    description: '',
    query:
      "source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' | dedup host consecutive=true",
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
    name: '[Logs] Show all hosts with errors  aggregated by response, count of ips and tags',
    description: '',
    query:
      "source=opensearch_dashboards_sample_data_logs |  where response='503' or response='404' |  stats count() as ip_count by response , host , tags",
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
    name: '[Flights] Show the count of flights by Destination and Country',
    description: '',
    query:
      'source=opensearch_dashboards_sample_data_flights  | stats count() by DestCountry , Dest',
    selected_date_range: {
      start: 'now/M',
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
    name: '[Flights] Show all Carriers sorted by average delay',
    description: '',
    query:
      'source=opensearch_dashboards_sample_data_flights |where FlightDelayMin > 0 | stats sum(FlightDelayMin) as total_delay_min, count() as total_delayed by Carrier |eval avg_delay=total_delay_min / total_delayed | sort - avg_delay',
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
    name: '[Logs] Show errors sorted by list of hostnames and average bytes per ip',
    description: '',
    query:
      "source=opensearch_dashboards_sample_data_logs  | where response='503' or response='404' |      stats count() as ip_count, sum(bytes)       as sum_bytes by host, response |       rename response as resp_code |       sort - ip_count, + sum_bytes |       eval per_ip_bytes=sum_bytes/ip_count",
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
    name: '[Logs] Show errors sorted by list of hostnames, by summation of bytes',
    description: '',
    query:
      "source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' |      stats count() as ip_count, sum(bytes)      as sum_bytes by host, response | sort -sum_bytes",
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
    name: '[Logs] Show errors sorted by list of hostnames, by summation of bytes and complex evals',
    description: '',
    query:
      "source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' |      stats count() as ip_count, sum(bytes)      as sum_bytes by host, response |      rename response as resp_code |      sort - ip_count, + sum_bytes |      eval per_ip_bytes=sum_bytes/ip_count,       double_per_ip_bytes = 2 * per_ip_bytes",
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
    name: '[Logs] Show all logs where request matches filebeat',
    description: '',
    query: "source = opensearch_dashboards_sample_data_logs | where match(request,'filebeat')",
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
      tokens: [
        {
          name: 'message',
          type: 'string',
        },
      ],
    },
  },
];
