/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const panelBreadCrumbs = [
  { text: 'Operational panels', href: '#/operational_panels/' },
  { text: 'Observability', href: 'observability#/' },
];

export const sampleSavedVisualization = {
  visualization: {
    id: 'oiuccXwBYVazWqOO1e06',
    name: 'Flight Count by Origin',
    query:
      'source=opensearch_dashboards_sample_data_flights | fields Carrier,FlightDelayMin | stats sum(FlightDelayMin) as delays by Carrier',
    type: 'bar',
    timeField: 'timestamp',
  },
};

export const sampleSavedVisualizationForHorizontalBar = {
  id: 'zgBSfYIBi5fNIzQywlQZ',
  name: 'Horizontal',
  query: 'source = opensearch_dashboards_sample_data_logs |  stats avg(machine.ram) by machine.os',
  type: 'horizontal_bar',
  timeField: 'timestamp',
};

export const sampleSavedVisualizationForLine = {
  id: '4wANiYIBi5fNIzQySlRB',
  name: '[Logs] Average ram usage per day by windows os ',
  query:
    "source = opensearch_dashboards_sample_data_logs | where match(machine.os,'win')  |  stats avg(machine.ram) by span(timestamp,1d)",
  type: 'line',
  timeField: 'timestamp',
};

export const sampleSavedVisualizationForTreeMap = {
  id: '5QANiYIBi5fNIzQySlRL',
  name: 'TreeMap1111',
  query: 'source = opensearch_dashboards_sample_data_logs | stats count() by tags',
  type: 'tree_map',
  timeField: 'timestamp',
};

export const sampleSavedVisualizationForPie = {
  id: '4gANiYIBi5fNIzQySlQ5',
  name: 'PieChart',
  query:
    "source = opensearch_dashboards_sample_data_logs | where machine.os='osx' or  machine.os='ios' |  stats avg(machine.ram) by span(timestamp,1d)",
  type: 'pie',
  timeField: 'timestamp',
};

export const samplePPLResponse = {
  data: {
    'avg(FlightDelayMin)': [
      53.65384615384615,
      45.36144578313253,
      63.1578947368421,
      46.81318681318681,
    ],
    Carrier: ['BeatsWest', 'Logstash Airways', 'OpenSearch Dashboards Airlines', 'OpenSearch-Air'],
  },
  metadata: {
    fields: [
      { name: 'avg(FlightDelayMin)', type: 'double' },
      { name: 'Carrier', type: 'keyword' },
    ],
  },
  size: 4,
  status: 200,
  jsonData: [
    { 'avg(FlightDelayMin)': 53.65384615384615, Carrier: 'BeatsWest' },
    { 'avg(FlightDelayMin)': 45.36144578313253, Carrier: 'Logstash Airways' },
    { 'avg(FlightDelayMin)': 63.1578947368421, Carrier: 'OpenSearch Dashboards Airlines' },
    { 'avg(FlightDelayMin)': 46.81318681318681, Carrier: 'OpenSearch-Air' },
  ],
};

export const samplePPLEmptyResponse = {
  data: { "count('ip')": [], 'span(timestamp,1h)': [] },
  metadata: {
    fields: [
      { name: "count('ip')", type: 'integer' },
      { name: 'span(timestamp,1h)', type: 'timestamp' },
    ],
  },
  size: 0,
  status: 200,
  jsonData: [],
};

export const samplePanelVisualizations = [
  {
    id: 'panel_viz_ed409e13-4759-4e0f-9bc1-6ae32999318e',
    savedVisualizationId: 'SMQu43wBDp0rvEg3jXMF',
    x: 0,
    y: 0,
    w: 6,
    h: 4,
  },
  {
    id: 'panel_viz_f59ad102-943e-48d9-9c0a-3df7055070a3',
    savedVisualizationId: 'ScQu43wBDp0rvEg34XNS',
    x: 0,
    y: 4,
    w: 6,
    h: 4,
  },
];

export const sampleLayout = [
  { i: 'panel_viz_ed409e13-4759-4e0f-9bc1-6ae32999318e', x: 0, y: 0, w: 3, h: 2 },
  { i: 'panel_viz_f59ad102-943e-48d9-9c0a-3df7055070a3', x: 3, y: 0, w: 6, h: 4 },
];

export const sampleMergedVisualizations = [
  {
    id: 'panel_viz_ed409e13-4759-4e0f-9bc1-6ae32999318e',
    savedVisualizationId: 'SMQu43wBDp0rvEg3jXMF',
    x: 0,
    y: 0,
    w: 3,
    h: 2,
  },
  {
    id: 'panel_viz_f59ad102-943e-48d9-9c0a-3df7055070a3',
    savedVisualizationId: 'ScQu43wBDp0rvEg34XNS',
    x: 3,
    y: 0,
    w: 6,
    h: 4,
  },
];

export const panelsData = {
  panels: [
    {
      name: 'Test Panel 1',
      id: 'L8Sx53wBDp0rvEg3yoLb',
      dateCreated: 1635974761179,
      dateModified: 1635974771296,
    },
    {
      name: 'Test Panel 2',
      id: 'lsQfznwBDp0rvEg3W2wH',
      dateCreated: 1635545733895,
      dateModified: 1635979024055,
    },
    {
      name: 'Test Panel 3',
      id: 'b8Sc4nwBDp0rvEg3F3Fk',
      dateCreated: 1635889452900,
      dateModified: 1635979888682,
    },
    {
      name: 'Test Panel 4',
      id: 'P8Qd4nwBDp0rvEg39HG_',
      dateCreated: 1635881186494,
      dateModified: 1636049456718,
    },
  ],
};

export const samplePanel = {
  objectId: 'L8Sx53wBDp0rvEg3yoLb',
  lastUpdatedTimeMs: 1636053619774,
  createdTimeMs: 1635545733895,
  tenant: '',
  operationalPanel: {
    name: 'Test Panel 1',
    visualizations: [
      {
        id: 'panel_viz_bae51802-b647-4c16-ac04-9cfa87aa0002',
        savedVisualizationId: 'oiuccXwBYVazWqOO1e06',
        x: 0,
        y: 0,
        w: 10,
        h: 2,
      },
      {
        id: 'panel_viz_8c47e96c-2494-407a-95e0-56a4790af2f5',
        savedVisualizationId: 'oiuccXwBYVazWqOO1e06',
        x: 0,
        y: 2,
        w: 6,
        h: 4,
      },
    ],
    timeRange: { to: 'now/y', from: 'now/y' },
    queryFilter: { query: "where host = 'www.opensearch.org'", language: 'ppl' },
  },
};

export const sampleEmptyPanel = {
  objectId: 'L8Sx53wBDp0rvEg3yoLb',
  lastUpdatedTimeMs: 1636053619774,
  createdTimeMs: 1635545733895,
  tenant: '',
  operationalPanel: {
    name: 'Test Panel 1',
    visualizations: [],
    timeRange: { to: 'now/y', from: 'now/y' },
    queryFilter: { query: "where host = 'www.opensearch.org'", language: 'ppl' },
  },
};
