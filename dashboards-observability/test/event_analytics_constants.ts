/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { LONG_CHART_COLOR, VIS_CHART_TYPES } from '../common/constants/shared';
import { createBarTypeDefinition } from '../public/components/visualizations/charts/bar/bar_type';
import { createGaugeTypeDefinition } from '../public/components/visualizations/charts/financial/gauge/gauge_type';
import { createMetricsTypeDefinition } from '../public/components/visualizations/charts/metrics/metrics_type';
import {
  SELECTED_FIELDS,
  AVAILABLE_FIELDS as AVAILABLE_FIELDS_NAME,
  UNSELECTED_FIELDS,
  QUERIED_FIELDS,
} from '../common/constants/explorer';
import { createHistogramVisDefinition } from '../public/components/visualizations/charts/histogram/histogram_type';
import { createMapsVisDefinition } from '../public/components/visualizations/charts/maps/heatmap_type';
import { createLineTypeDefinition } from '../public/components/visualizations/charts/lines/line_type';

export const AVAILABLE_FIELDS = [
  {
    name: 'agent',
    type: 'string',
  },
  {
    name: 'bytes',
    type: 'long',
  },
  {
    name: 'clientip',
    type: 'ip',
  },
  {
    name: 'event',
    type: 'struct',
  },
  {
    name: 'extension',
    type: 'string',
  },
  {
    name: 'geo',
    type: 'struct',
  },
  {
    name: 'host',
    type: 'string',
  },
  {
    name: 'index',
    type: 'string',
  },
  {
    name: 'ip',
    type: 'ip',
  },
  {
    name: 'machine',
    type: 'struct',
  },
  {
    name: 'memory',
    type: 'double',
  },
  {
    name: 'message',
    type: 'string',
  },
  {
    name: 'phpmemory',
    type: 'long',
  },
  {
    name: 'referer',
    type: 'string',
  },
  {
    name: 'request',
    type: 'string',
  },
  {
    name: 'response',
    type: 'string',
  },
  {
    name: 'tags',
    type: 'string',
  },
  {
    name: 'timestamp',
    type: 'timestamp',
  },
  {
    name: 'url',
    type: 'string',
  },
  {
    name: 'utc_time',
    type: 'timestamp',
  },
];

export const QUERY_FIELDS = [
  {
    name: 'double_per_ip_bytes',
    type: 'long',
  },
  {
    name: 'host',
    type: 'text',
  },
  {
    name: 'ip_count',
    type: 'integer',
  },
  {
    name: 'per_ip_bytes',
    type: 'long',
  },
  {
    name: 'resp_code',
    type: 'text',
  },
  {
    name: 'sum_bytes',
    type: 'long',
  },
];

export const JSON_DATA = [
  {
    ip_count: 176,
    sum_bytes: 1021420,
    host: 'artifacts.opensearch.org',
    resp_code: '404',
    per_ip_bytes: 5803,
    double_per_ip_bytes: 11606,
  },
  {
    ip_count: 111,
    sum_bytes: 560638,
    host: 'www.opensearch.org',
    resp_code: '404',
    per_ip_bytes: 5050,
    double_per_ip_bytes: 10100,
  },
  {
    ip_count: 94,
    sum_bytes: 0,
    host: 'artifacts.opensearch.org',
    resp_code: '503',
    per_ip_bytes: 0,
    double_per_ip_bytes: 0,
  },
  {
    ip_count: 78,
    sum_bytes: 0,
    host: 'www.opensearch.org',
    resp_code: '503',
    per_ip_bytes: 0,
    double_per_ip_bytes: 0,
  },
  {
    ip_count: 43,
    sum_bytes: 247840,
    host: 'cdn.opensearch-opensearch-opensearch.org',
    resp_code: '404',
    per_ip_bytes: 5763,
    double_per_ip_bytes: 11526,
  },
  {
    ip_count: 34,
    sum_bytes: 0,
    host: 'cdn.opensearch-opensearch-opensearch.org',
    resp_code: '503',
    per_ip_bytes: 0,
    double_per_ip_bytes: 0,
  },
  {
    ip_count: 13,
    sum_bytes: 57735,
    host: 'opensearch-opensearch-opensearch.org',
    resp_code: '404',
    per_ip_bytes: 4441,
    double_per_ip_bytes: 8882,
  },
  {
    ip_count: 6,
    sum_bytes: 0,
    host: 'opensearch-opensearch-opensearch.org',
    resp_code: '503',
    per_ip_bytes: 0,
    double_per_ip_bytes: 0,
  },
];

export const JSON_DATA_ALL = [
  {
    referer: 'http://twitter.com/success/wendy-lawrence',
    request: '/opensearch/opensearch-1.0.0.deb',
    agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
    extension: 'deb',
    memory: 'null',
    geo:
      '{"srcdest":"IN:US","src":"IN","coordinates":{"lat":39.41042861,"lon":-88.8454325},"dest":"US"}',
    utc_time: '2021-11-14 00:39:02.912',
    clientip: '223.87.60.27',
    host: 'artifacts.opensearch.org',
    event: '{"dataset":"sample_web_logs"}',
    phpmemory: 'null',
    timestamp: '2021-11-14 00:39:02.912',
    ip: '223.87.60.27',
    index: 'opensearch_dashboards_sample_data_logs',
    message:
      '223.87.60.27 - - [2018-07-22T00:39:02.912Z] "GET /opensearch/opensearch-1.0.0.deb_1 HTTP/1.1" 200 6219 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"',
    url: 'https://artifacts.opensearch.org/downloads/opensearch/opensearch-1.0.0.deb_1',
    tags: 'success',
    bytes: 6219,
    machine: '{"os":"win 8","ram":8589934592}',
    response: '200',
  },
  {
    referer: 'http://www.opensearch-opensearch-opensearch.com/success/james-mcdivitt',
    request: '/beats/metricbeat',
    agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
    extension: '',
    memory: 'null',
    geo:
      '{"srcdest":"JP:IN","src":"JP","coordinates":{"lat":38.58338806,"lon":-86.46248778},"dest":"IN"}',
    utc_time: '2021-11-14 03:26:21.326',
    clientip: '130.246.123.197',
    host: 'www.opensearch.org',
    event: '{"dataset":"sample_web_logs"}',
    phpmemory: 'null',
    timestamp: '2021-11-14 03:26:21.326',
    ip: '130.246.123.197',
    index: 'opensearch_dashboards_sample_data_logs',
    message:
      '130.246.123.197 - - [2018-07-22T03:26:21.326Z] "GET /beats/metricbeat_1 HTTP/1.1" 200 6850 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"',
    url: 'https://www.opensearch.org/downloads/beats/metricbeat_1',
    tags: 'success',
    bytes: 6850,
    machine: '{"os":"win 8","ram":3221225472}',
    response: '200',
  },
  {
    referer: 'http://twitter.com/success/konstantin-feoktistov',
    request: '/styles/main.css',
    agent:
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24',
    extension: 'css',
    memory: 'null',
    geo:
      '{"srcdest":"CO:DE","src":"CO","coordinates":{"lat":36.96015,"lon":-78.18499861},"dest":"DE"}',
    utc_time: '2021-11-14 03:30:25.131',
    clientip: '120.49.143.213',
    host: 'cdn.opensearch-opensearch-opensearch.org',
    event: '{"dataset":"sample_web_logs"}',
    phpmemory: 'null',
    timestamp: '2021-11-14 03:30:25.131',
    ip: '120.49.143.213',
    index: 'opensearch_dashboards_sample_data_logs',
    message:
      '120.49.143.213 - - [2018-07-22T03:30:25.131Z] "GET /styles/main.css_1 HTTP/1.1" 503 0 "-" "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24"',
    url: 'https://cdn.opensearch-opensearch-opensearch.org/styles/main.css_1',
    tags: 'success',
    bytes: 0,
    machine: '{"os":"ios","ram":20401094656}',
    response: '503',
  },
];

export const AGENT_FIELD = {
  name: 'agent',
  type: 'string',
};

export const SAVED_HISTORIES = [
  {
    createdTimeMs: '1638901792922',
    lastUpdatedTimeMs: '1638901792922',
    objectId: 'Kocoln0BYMuJGDsOwDma',
    savedVisualization: {
      description: '',
      name: 'Mock Flight count by destination save to panel',
      query:
        'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
      type: 'bar',
      selected_date_range: {
        end: 'now',
        start: 'now-15m',
        text: '',
      },
      selected_fields: {
        text: '',
        tokens: [],
      },
      selected_timestamp: {
        name: 'timestamp',
        type: 'timestamp',
      },
    },
    tenant: '',
  },
  {
    createdTimeMs: '1638901777572',
    lastUpdatedTimeMs: '1638901777572',
    objectId: 'KIcoln0BYMuJGDsOhDmk',
    savedVisualization: {
      description: '',
      name: 'Mock Flight count by destination',
      query:
        'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
      type: 'bar',
      selected_date_range: {
        end: 'now',
        start: 'now-15m',
        text: '',
      },
      selected_fields: {
        text: '',
        tokens: [],
      },
      selected_timestamp: {
        name: 'timestamp',
        type: 'timestamp',
      },
    },
    tenant: '',
  },
];

export const SELECTED_PANELS_OPTIONS = [
  {
    label: '[Logs] Web traffic Panel',
    panel: {
      dateCreated: 1637781403888,
      dateModified: 1637781403888,
      id: 'uRZgU30B661cwDZT-ILw',
      name: '[Logs] Web traffic Panel',
    },
  },
  {
    label: '[Logs] Web traffic Panel 2',
    panel: {
      dateCreated: 1637781403888,
      dateModified: 1637781403888,
      id: 'uRZgU30B661cwDZT-ILw',
      name: '[Logs] Web traffic Panel',
    },
  },
];

export const DATA_GRID_ROWS = [
  {
    AvgTicketPrice: 841.2656,
    Cancelled: 'false',
    Carrier: 'OpenSearch Dashboards Airlines',
    Dest: 'Sydney Kingsford Smith International Airport',
    DestAirportID: 'SYD',
    DestCityName: 'Sydney',
    DestCountry: 'AU',
    DestLocation: '{"lat":-33.94609833,"lon":151.177002}',
    DestRegion: 'SE-BD',
    DestWeather: 'Rain',
    DistanceKilometers: 16492.326,
    DistanceMiles: 10247.856,
    FlightDelay: 'false',
    FlightDelayMin: 0,
    FlightDelayType: 'No Delay',
    FlightNum: '9HY9SWR',
    FlightTimeHour: '17.179506930998397',
    FlightTimeMin: 1030.7704,
    Origin: 'Frankfurt am Main Airport',
    OriginAirportID: 'FRA',
    OriginCityName: 'Frankfurt am Main',
    OriginCountry: 'DE',
    OriginLocation: '{"lat":50.033333,"lon":8.570556}',
    OriginRegion: 'DE-HE',
    OriginWeather: 'Sunny',
    dayOfWeek: 0,
    timestamp: '2021-05-24 00:00:00',
  },
  {
    AvgTicketPrice: 882.98267,
    Cancelled: 'false',
    Carrier: 'Logstash Airways',
    Dest: 'Venice Marco Polo Airport',
    DestAirportID: 'VE05',
    DestCityName: 'Venice',
    DestCountry: 'IT',
    DestLocation: '{"lat":45.505299,"lon":12.3519}',
    DestRegion: 'IT-34',
    DestWeather: 'Sunny',
    DistanceKilometers: 8823.4,
    DistanceMiles: 5482.6064,
    FlightDelay: 'false',
    FlightDelayMin: 0,
    FlightDelayType: 'No Delay',
    FlightNum: 'X98CCZO',
    FlightTimeHour: '7.73982468459836',
    FlightTimeMin: 464.3895,
    Origin: 'Cape Town International Airport',
    OriginAirportID: 'CPT',
    OriginCityName: 'Cape Town',
    OriginCountry: 'ZA',
    OriginLocation: '{"lat":-33.96480179,"lon":18.60169983}',
    OriginRegion: 'SE-BD',
    OriginWeather: 'Clear',
    dayOfWeek: 0,
    timestamp: '2021-05-24 18:27:00',
  },
];

export const SAMPLE_VISUALIZATIONS = {
  data: {
    'count()': [2549, 9337, 1173],
    'span(timestamp,1M)': ['2021-05-01 00:00:00', '2021-06-01 00:00:00', '2021-07-01 00:00:00'],
  },
  jsonData: [
    {
      'count()': 2549,
      'span(timestamp,1M)': '2021-05-01 00:00:00',
    },
    {
      'count()': 9337,
      'span(timestamp,1M)': '2021-06-01 00:00:00',
    },
    {
      'count()': 2549,
      'span(timestamp,1M)': '2021-07-01 00:00:00',
    },
  ],
  metadata: {
    fields: [
      {
        name: 'count()',
        type: 'integer',
      },
      {
        name: 'span(timestamp,1M)',
        type: 'timestamp',
      },
    ],
  },
};

export const VISUALIZATION_TYPES = [
  {
    fulllabel: 'Bar',
    id: 'bar',
    label: 'bar',
    selection: {
      dataLoss: 'nothing',
    },
    visualizationid: 'vis-bar-6636',
  },
  {
    fulllabel: 'H. Bar',
    id: 'horizontal_bar',
    label: 'H. Bar',
    selection: {
      dataLoss: 'nothing',
    },
    visualizationid: 'vis-bar-6637',
  },
  {
    fulllabel: 'Line',
    id: 'line',
    label: 'line',
    selection: {
      dataLoss: 'nothing',
    },
    visualizationid: 'vis-bar-6638',
  },
];

export const LAYOUT_CONFIG = {
  showlegend: true,
  margin: {
    l: 60,
    r: 10,
    b: 15,
    t: 30,
    pad: 0,
  },
  height: 220,
  colorway: [LONG_CHART_COLOR],
};

export const EXPLORER_FIELDS = {
  [SELECTED_FIELDS]: [],
  [UNSELECTED_FIELDS]: [],
  [AVAILABLE_FIELDS_NAME]: AVAILABLE_FIELDS,
  [QUERIED_FIELDS]: QUERY_FIELDS,
};

export const EXPLORER_VISUALIZATIONS = {
  data: {
    'count()': [154, 1753, 116, 468, 1964, 219],
    tags: ['error', 'info', 'login', 'security', 'success', 'warning'],
  },
  jsonData: [
    { 'count()': 154, tags: 'error' },
    { 'count()': 1753, tags: 'info' },
    { 'count()': 116, tags: 'login' },
    { 'count()': 468, tags: 'security' },
    { 'count()': 1964, tags: 'success' },
    { 'count()': 219, tags: 'warning' },
  ],
  metadata: {
    fields: [
      { name: 'count()', type: 'integer' },
      { name: 'tags', type: 'text' },
      { name: 'timestamp', type: 'timestamp' },
    ],
    size: 6,
    status: 200,
  },
};

export const EXPLORER_VISUALIZATIONS_FOR_HEATMAP = {
  data: {
    'max(bytes)': [19897, 19904, 19929, 19856, 19904, 19929, 9947, 9998, 9717, 9973],
    host: [
      'artifacts.opensearch.org',
      'artifacts.opensearch.org',
      'artifacts.opensearch.org',
      'artifacts.opensearch.org',
      'artifacts.opensearch.org',
      'artifacts.opensearch.org',
      'cdn.opensearch-opensearch-opensearch.org',
      'cdn.opensearch-opensearch-opensearch.org',
      'cdn.opensearch-opensearch-opensearch.org',
      'cdn.opensearch-opensearch-opensearch.org',
    ],
    tags: [
      'error',
      'info',
      'login',
      'security',
      'success',
      'warning',
      'error',
      'info',
      'login',
      'security',
    ],
  },
  jsonData: [
    {
      'max(bytes)': 19897,
      host: 'artifacts.opensearch.org',
      tags: 'error',
    },
    {
      'max(bytes)': 19904,
      host: 'artifacts.opensearch.org',
      tags: 'info',
    },
    {
      'max(bytes)': 19929,
      host: 'artifacts.opensearch.org',
      tags: 'login',
    },
    {
      'max(bytes)': 19856,
      host: 'artifacts.opensearch.org',
      tags: 'security',
    },
    {
      'max(bytes)': 19904,
      host: 'artifacts.opensearch.org',
      tags: 'success',
    },
    {
      'max(bytes)': 19929,
      host: 'artifacts.opensearch.org',
      tags: 'warning',
    },
    {
      'max(bytes)': 9947,
      host: 'cdn.opensearch-opensearch-opensearch.org',
      tags: 'error',
    },
    {
      'max(bytes)': 9998,
      host: 'cdn.opensearch-opensearch-opensearch.org',
      tags: 'info',
    },
    {
      'max(bytes)': 9717,
      host: 'cdn.opensearch-opensearch-opensearch.org',
      tags: 'login',
    },
    {
      'max(bytes)': 9973,
      host: 'cdn.opensearch-opensearch-opensearch.org',
      tags: 'security',
    },
  ],
  metadata: {
    fields: [
      {
        name: 'max(bytes)',
        type: 'long',
      },
      {
        name: 'host',
        type: 'text',
      },
      {
        name: 'tags',
        type: 'text',
      },
    ],
  },
  size: 10,
  status: 200,
};

export const VALUE_OPTIONS = {
  series: [
    {
      label: 'bytes',
      name: 'bytes',
      aggregation: 'max',
      customLabel: '',
    },
  ],
  dimensions: [
    {
      label: 'host',
      name: 'host',
      customLabel: '',
    },
    {
      label: 'tags',
      name: 'tags',
      customLabel: '',
    },
  ],
};

export const TEST_VISUALIZATIONS_DATA = {
  data: {
    appData: { fromApp: false },
    defaultAxes: {
      xaxis: [
        {
          name: 'tags',
          type: 'text',
          label: 'tags',
        },
      ],
      yaxis: [
        {
          name: 'max(bytes)',
          type: 'long',
          label: 'max(bytes)',
        },
        {
          name: 'host',
          type: 'text',
          label: 'host',
        },
      ],
    },
    indexFields: EXPLORER_FIELDS,
    query: {},
    rawVizData: EXPLORER_VISUALIZATIONS_FOR_HEATMAP,
    userConfigs: {
      dataConfig: {
        series: [
          {
            label: 'bytes',
            name: 'bytes',
            aggregation: 'max',
            customLabel: '',
          },
        ],
        dimensions: [
          {
            label: 'host',
            name: 'host',
            customLabel: '',
          },
          {
            label: 'tags',
            name: 'tags',
            customLabel: '',
          },
        ],
      },
    },
  },
  vis: createBarTypeDefinition({}),
};
export const TEST_VISUALIZATIONS_DATA_LINE = {
  data: {
    appData: {
      fromApp: false,
    },
    rawVizData: {
      data: {
        'max(bytes)': [6219, 14113, 9920, 15894, 19561],
        'avg(bytes)': [6219, 4221.166666666667, 6969.25, 6329.371428571429, 6245.709677419355],
        'span(timestamp,2h)': [
          '2022-04-10 00:00:00',
          '2022-04-10 02:00:00',
          '2022-04-10 04:00:00',
          '2022-04-10 06:00:00',
          '2022-04-10 08:00:00',
        ],
      },
      metadata: {
        fields: [
          {
            name: 'max(bytes)',
            type: 'long',
          },
          {
            name: 'avg(bytes)',
            type: 'double',
          },
          {
            name: 'span(timestamp,2h)',
            type: 'timestamp',
          },
        ],
      },
      size: 5,
      status: 200,
      jsonData: [
        {
          'max(bytes)': 6219,
          'avg(bytes)': 6219,
          'span(timestamp,2h)': '2022-04-10 00:00:00',
        },
        {
          'max(bytes)': 14113,
          'avg(bytes)': 4221.166666666667,
          'span(timestamp,2h)': '2022-04-10 02:00:00',
        },
        {
          'max(bytes)': 9920,
          'avg(bytes)': 6969.25,
          'span(timestamp,2h)': '2022-04-10 04:00:00',
        },
        {
          'max(bytes)': 15894,
          'avg(bytes)': 6329.371428571429,
          'span(timestamp,2h)': '2022-04-10 06:00:00',
        },
        {
          'max(bytes)': 19561,
          'avg(bytes)': 6245.709677419355,
          'span(timestamp,2h)': '2022-04-10 08:00:00',
        },
      ],
    },
    // query: {
    //   rawQuery:
    //     'source = opensearch_dashboards_sample_data_logs | stats max(bytes), avg(bytes) by span(timestamp, 2h)',
    //   finalQuery:
    //     "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2022-01-01 00:00:00' and timestamp <= '2022-11-14 07:44:27' | stats max(bytes), avg(bytes) by span(timestamp, 2h)",
    //   index: '',
    //   selectedTimestamp: 'timestamp',
    //   selectedDateRange: ['now/y', 'now'],
    //   tabCreatedType: 'redirect_tab',
    //   savedObjectId: 'B5XA5oMBb6AtoCMJkDJu',
    //   objectType: 'savedVisualization',
    //   isLoaded: true,
    // },
    query: {},
    indexFields: EXPLORER_FIELDS,
    userConfigs: {
      dataConfig: {
        series: [
          {
            label: 'bytes',
            name: 'bytes',
            aggregation: 'max',
            customLabel: '',
          },
          {
            label: 'bytes',
            name: 'bytes',
            aggregation: 'avg',
            customLabel: '',
          },
        ],
        dimensions: [],
        span: {
          time_field: [
            {
              name: 'timestamp',
              type: 'timestamp',
              label: 'timestamp',
            },
          ],
          interval: '2',
          unit: [
            {
              text: 'Hour',
              value: 'h',
              label: 'Hour',
            },
          ],
        },
      },
    },
    defaultAxes: {
      xaxis: [
        {
          name: 'span(timestamp,2h)',
          type: 'timestamp',
          label: 'span(timestamp,2h)',
        },
      ],
      yaxis: [
        {
          name: 'max(bytes)',
          type: 'long',
          label: 'max(bytes)',
        },
        {
          name: 'avg(bytes)',
          type: 'double',
          label: 'avg(bytes)',
        },
      ],
    },
    explorer: {
      explorerData: {
        jsonData: [
          {
            'max(bytes)': 6219,
            'avg(bytes)': 6219,
            'span(timestamp,2h)': '2022-04-10 00:00:00',
          },
          {
            'max(bytes)': 14113,
            'avg(bytes)': 4221.166666666667,
            'span(timestamp,2h)': '2022-04-10 02:00:00',
          },
          {
            'max(bytes)': 9920,
            'avg(bytes)': 6969.25,
            'span(timestamp,2h)': '2022-04-10 04:00:00',
          },
          {
            'max(bytes)': 15894,
            'avg(bytes)': 6329.371428571429,
            'span(timestamp,2h)': '2022-04-10 06:00:00',
          },
          {
            'max(bytes)': 19561,
            'avg(bytes)': 6245.709677419355,
            'span(timestamp,2h)': '2022-04-10 08:00:00',
          },
        ],
        jsonDataAll: [
          {
            referer: 'http://twitter.com/success/wendy-lawrence',
            request: '/opensearch/opensearch-1.0.0.deb',
            agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
            extension: 'deb',
            memory: 'null',
            geo:
              '{"srcdest":"IN:US","src":"IN","coordinates":{"lat":39.41042861,"lon":-88.8454325},"dest":"US"}',
            utc_time: '2022-04-10 00:39:02.912',
            clientip: '223.87.60.27',
            host: 'artifacts.opensearch.org',
            event: '{"dataset":"sample_web_logs"}',
            phpmemory: 'null',
            timestamp: '2022-04-10 00:39:02.912',
            ip: '223.87.60.27',
            index: 'opensearch_dashboards_sample_data_logs',
            message:
              '223.87.60.27 - - [2018-07-22T00:39:02.912Z] "GET /opensearch/opensearch-1.0.0.deb_1 HTTP/1.1" 200 6219 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"',
            url: 'https://artifacts.opensearch.org/downloads/opensearch/opensearch-1.0.0.deb_1',
            tags: 'success',
            bytes: 6219,
            machine: '{"os":"win 8","ram":8589934592}',
            response: '200',
          },
          {
            referer: 'http://www.opensearch-opensearch-opensearch.com/success/james-mcdivitt',
            request: '/beats/metricbeat',
            agent: 'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1',
            extension: '',
            memory: 'null',
            geo:
              '{"srcdest":"JP:IN","src":"JP","coordinates":{"lat":38.58338806,"lon":-86.46248778},"dest":"IN"}',
            utc_time: '2022-04-10 03:26:21.326',
            clientip: '130.246.123.197',
            host: 'www.opensearch.org',
            event: '{"dataset":"sample_web_logs"}',
            phpmemory: 'null',
            timestamp: '2022-04-10 03:26:21.326',
            ip: '130.246.123.197',
            index: 'opensearch_dashboards_sample_data_logs',
            message:
              '130.246.123.197 - - [2018-07-22T03:26:21.326Z] "GET /beats/metricbeat_1 HTTP/1.1" 200 6850 "-" "Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1"',
            url: 'https://www.opensearch.org/downloads/beats/metricbeat_1',
            tags: 'success',
            bytes: 6850,
            machine: '{"os":"win 8","ram":3221225472}',
            response: '200',
          },
          {
            referer: 'http://twitter.com/success/konstantin-feoktistov',
            request: '/styles/main.css',
            agent:
              'Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24',
            extension: 'css',
            memory: 'null',
            geo:
              '{"srcdest":"CO:DE","src":"CO","coordinates":{"lat":36.96015,"lon":-78.18499861},"dest":"DE"}',
            utc_time: '2022-04-10 03:30:25.131',
            clientip: '120.49.143.213',
            host: 'cdn.opensearch-opensearch-opensearch.org',
            event: '{"dataset":"sample_web_logs"}',
            phpmemory: 'null',
            timestamp: '2022-04-10 03:30:25.131',
            ip: '120.49.143.213',
            index: 'opensearch_dashboards_sample_data_logs',
            message:
              '120.49.143.213 - - [2018-07-22T03:30:25.131Z] "GET /styles/main.css_1 HTTP/1.1" 503 0 "-" "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24"',
            url: 'https://cdn.opensearch-opensearch-opensearch.org/styles/main.css_1',
            tags: 'success',
            bytes: 0,
            machine: '{"os":"ios","ram":20401094656}',
            response: '503',
          },
          {
            referer: 'http://www.opensearch-opensearch-opensearch.com/success/charles-camarda',
            request: '/beats/metricbeat/metricbeat-6.3.2-amd64.deb',
            agent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
            extension: 'deb',
            memory: 'null',
            geo:
              '{"srcdest":"LK:IN","src":"LK","coordinates":{"lat":48.31140472,"lon":-114.2550694},"dest":"IN"}',
            utc_time: '2022-04-10 03:34:43.399',
            clientip: '99.74.118.237',
            host: 'artifacts.opensearch.org',
            event: '{"dataset":"sample_web_logs"}',
            phpmemory: 'null',
            timestamp: '2022-04-10 03:34:43.399',
            ip: '99.74.118.237',
            index: 'opensearch_dashboards_sample_data_logs',
            message:
              '99.74.118.237 - - [2018-07-22T03:34:43.399Z] "GET /beats/metricbeat/metricbeat-6.3.2-amd64.deb_1 HTTP/1.1" 200 14113 "-" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)"',
            url:
              'https://artifacts.opensearch.org/downloads/beats/metricbeat/metricbeat-6.3.2-amd64.deb_1',
            tags: 'success',
            bytes: 14113,
            machine: '{"os":"ios","ram":11811160064}',
            response: '200',
          },
          {
            referer: 'http://twitter.com/success/gregory-harbaugh',
            request: '/enterprise',
            agent: 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
            extension: '',
            memory: 'null',
            geo:
              '{"srcdest":"MZ:US","src":"MZ","coordinates":{"lat":46.77917333,"lon":-105.3047083},"dest":"US"}',
            utc_time: '2022-04-10 03:37:04.863',
            clientip: '177.111.217.54',
            host: 'www.opensearch.org',
            event: '{"dataset":"sample_web_logs"}',
            phpmemory: 'null',
            timestamp: '2022-04-10 03:37:04.863',
            ip: '177.111.217.54',
            index: 'opensearch_dashboards_sample_data_logs',
            message:
              '177.111.217.54 - - [2018-07-22T03:37:04.863Z] "GET /enterprise_1 HTTP/1.1" 200 2492 "-" "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)"',
            url: 'https://www.opensearch.org/downloads/enterprise_1',
            tags: 'success',
            bytes: 2492,
            machine: '{"os":"win 7","ram":9663676416}',
            response: '200',
          },
        ],
      },
      query: {},
      // http: {
      //   basePath: {
      //     basePath: '/jva',
      //     serverBasePath: '/jva',
      //   },
      //   anonymousPaths: {},
      // },
      // pplService: {
      //   http: {
      //     basePath: {
      //       basePath: '/jva',
      //       serverBasePath: '/jva',
      //     },
      //     anonymousPaths: {},
      //   },
      // },
    },
  },
  vis: createBarTypeDefinition({}),
};

export const PIE_TEST_VISUALIZATIONS_DATA = {
  data: {
    ...TEST_VISUALIZATIONS_DATA.data,
    defaultAxes: {
      xaxis: [{ name: 'tags', type: 'text' }],
      yaxis: [{ name: 'count()', type: 'integer' }],
    },
  },
  vis: {
    ...TEST_VISUALIZATIONS_DATA.vis,
  },
};

export const GAUGE_TEST_VISUALIZATIONS_DATA = {
  data: {
    ...TEST_VISUALIZATIONS_DATA.data,
    userConfigs: {
      dataConfig: {
        ...TEST_VISUALIZATIONS_DATA.data.userConfigs.dataConfig,
        chartStyles: {
          showThresholdLabels: true,
          showThresholdMarkers: true,
          orientation: 'v',
          legendPlacement: 'right',
          titleSize: '10',
          valueSize: '12',
        },
      },
    },
  },
  vis: createGaugeTypeDefinition(),
};

export const METRICS_TEST_VISUALIZATIONS_DATA = {
  ...TEST_VISUALIZATIONS_DATA,
  vis: createMetricsTypeDefinition({}),
};
export const HORIZONTAL_BAR_TEST_VISUALIZATIONS_DATA = {
  ...TEST_VISUALIZATIONS_DATA,
  vis: createBarTypeDefinition({
    type: VIS_CHART_TYPES.HorizontalBar,
  }),
};

export const TEST_DATA = {
  dimensions: [{ name: 'tags', type: 'text', label: 'tags' }],
  metrics: [{ name: 'count()', type: 'integer', label: 'count()', side: 'left' }],
  series: [
    {
      aggregation: 'sum',
      customLabel: 'delays',
      label: 'FlightDelayMin',
      name: 'FlightDelayMin',
    },
  ],
};

export const TEST_CONFIG_AVAILABILITY = {
  data: {
    appData: { fromApp: false },
    defaultAxes: {},
    indexFields: EXPLORER_FIELDS,
    query: {
      finalQuery:
        'source = opensearch_dashboards_sample_data_logs | stats avg(bytes) by span(timestamp,1d)',
    },
    rawVizData: EXPLORER_VISUALIZATIONS,
    userConfigs: {
      dataConfig: {
        valueOptions: TEST_DATA,
      },
    },
  },
  vis: createBarTypeDefinition({}),
};

export const TEST_COLOR_THEME = {
  data: {
    appData: { fromApp: false },
    defaultAxes: {
      xaxis: [{ name: 'tags', type: 'text' }],
      yaxis: [{ name: 'count()', type: 'integer' }],
    },
    indexFields: EXPLORER_FIELDS,
    query: {
      finalQuery:
        'source = opensearch_dashboards_sample_data_logs | stats avg(bytes) by span(timestamp,1d)',
    },
    rawVizData: EXPLORER_VISUALIZATIONS,
    userConfigs: {
      dataConfig: {
        valueOptions: TEST_DATA,
      },
    },
  },
  vis: createHistogramVisDefinition({}),
};
export const HEATMAP_TEST_VISUALIZATIONS_DATA = {
  data: {
    ...TEST_VISUALIZATIONS_DATA.data,
    userConfigs: {
      dataConfig: {
        ...TEST_VISUALIZATIONS_DATA.data.userConfigs.dataConfig,
        chartStyles: {
          style: 'lines',
          interpolation: 'linear',
          lineWidth: '4',
          fillOpacity: '71',
          labelSize: '10',
          rotateLabels: '36',
          color: {
            name: 'singleColor',
            color: '#6092C0',
          },
          pointSize: '12',
          colorMode: [
            {
              name: 'opacity',
              label: 'opacity',
              value: 'opacity',
            },
          ],
        },
      },
    },
  },
  vis: createMapsVisDefinition(),
};

export const LINE_TEST_VISUALIZATIONS_DATA = {
  data: {
    ...TEST_VISUALIZATIONS_DATA_LINE.data,
    userConfigs: {
      dataConfig: {
        ...TEST_VISUALIZATIONS_DATA_LINE.data.userConfigs.dataConfig,
        chartStyles: {
          style: 'lines',
          interpolation: 'linear',
          lineWidth: '4',
          fillOpacity: '71',
          labelSize: '10',
          rotateLabels: '36',
          color: {
            name: 'singleColor',
            color: '#6092C0',
          },
          pointSize: '12',
        },
      },
    },
  },
  vis: createLineTypeDefinition(),
};
