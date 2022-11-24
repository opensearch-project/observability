const COMMON_SAVED_VISUALIZATION_OBJECT = {
  query:
    'source = opensearch_dashboards_sample_data_logs | stats count(), max(bytes) by span(timestamp,1d), clientip, host',
  fields: [],
  dateRange: ['now/y', 'now'],
  type: 'bar',
  name: 'New bar visualization',
  timestamp: 'timestamp',
  userConfigs:
    '{"dataConfig":{"series":[{"label":"bytes","name":"bytes","aggregation":"max","customLabel":""},{"label":"bytes","name":"bytes","aggregation":"avg","customLabel":""}],"dimensions":[{"label":"host","name":"host","customLabel":""}]}}',
  description: '',
};

export const COMMON_SAVED_QUERY_OBJECT = {
  query: 'source = opensearch_dashboards_sample_data_flights ',
  fields: [],
  dateRange: ['now/y', 'now'],
  name: 'test new query for save',
  timestamp: 'timestamp',
  type: '',
};

export const NEW_SAVED_QUERY_OBJECT = {
  ...COMMON_SAVED_QUERY_OBJECT,
  objectId: '',
};
export const UPDATED_SAVED_QUERY_OBJECT = {
  ...COMMON_SAVED_QUERY_OBJECT,
  objectId: 'pESsqIQBwq0knkfERAeN',
};

export const NEW_SAVED_VISUALIZATION_OBJECT = {
  ...COMMON_SAVED_VISUALIZATION_OBJECT,
  applicationId: '',
};

export const UPDATED_SAVED_VISUALIZATION_OBJECT = {
  ...COMMON_SAVED_VISUALIZATION_OBJECT,
  objectId: 'okTGpYQBwq0knkfEYwde',
};

export const BULK_UPDATE_PANEL_OBJECT = {
  selectedCustomPanels: [
    {
      panel: {
        name: '[Logs] Web traffic Panel',
        id: 'EpXA5oMBb6AtoCMJkDLx',
        dateCreated: 1666023723249,
        dateModified: 1666102035217,
      },
      label: '[Logs] Web traffic Panel',
    },
  ],
  savedVisualizationId: 'okTGpYQBwq0knkfEYwde',
};
