/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Sample notebook with all input and output
export const sampleNotebook1 = {
  id: 'note_5f4b9eed-5898-4b39-ba6c-755c0fadd84e',
  dateCreated: '2020-08-20T18:00:59.845Z',
  name: 'test 1',
  dateModified: '2020-08-20T18:37:56.844Z',
  pluginVersion: '7.9.0',
  backend: 'Default',
  paragraphs: [
    {
      output: [{ result: '# Type your input here', outputType: 'MARKDOWN', execution_time: '0s' }],
      input: { inputText: '# Type your input here', inputType: 'MARKDOWN' },
      dateCreated: '2020-08-20T18:00:59.845Z',
      dateModified: '2020-08-20T18:00:59.845Z',
      id: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    },
    {
      output: [{ result: '# add code here\n', outputType: 'MARKDOWN', execution_time: '0s' }],
      input: { inputText: '# add code here\n', inputType: 'MARKDOWN' },
      dateCreated: '2020-08-20T18:01:07.662Z',
      dateModified: '2020-08-20T18:01:18.295Z',
      id: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    },
    {
      output: [{ result: '', outputType: 'VISUALIZATION', execution_time: '0s' }],
      input: {
        inputText:
          '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
        inputType: 'VISUALIZATION',
      },
      dateCreated: '2020-08-20T18:37:44.809Z',
      dateModified: '2020-08-20T18:37:56.844Z',
      id: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    },
    {
      output: [
        {
          result:
            '{"schema":[{"name":"FlightNum","type":"keyword"},{"name":"Origin","type":"keyword"},{"name":"OriginLocation","type":"geo_point"},{"name":"DestLocation","type":"geo_point"},{"name":"FlightDelay","type":"boolean"},{"name":"DistanceMiles","type":"float"},{"name":"FlightTimeMin","type":"float"},{"name":"OriginWeather","type":"keyword"},{"name":"dayOfWeek","type":"integer"},{"name":"AvgTicketPrice","type":"float"},{"name":"Carrier","type":"keyword"},{"name":"FlightDelayMin","type":"integer"},{"name":"OriginRegion","type":"keyword"},{"name":"DestAirportID","type":"keyword"},{"name":"FlightDelayType","type":"keyword"},{"name":"timestamp","type":"timestamp"},{"name":"Dest","type":"keyword"},{"name":"FlightTimeHour","type":"keyword"},{"name":"Cancelled","type":"boolean"},{"name":"DistanceKilometers","type":"float"},{"name":"OriginCityName","type":"keyword"},{"name":"DestWeather","type":"keyword"},{"name":"OriginCountry","type":"keyword"},{"name":"DestCountry","type":"keyword"},{"name":"DestRegion","type":"keyword"},{"name":"DestCityName","type":"keyword"},{"name":"OriginAirportID","type":"keyword"}],"datarows":[["9HY9SWR","Frankfurt am Main Airport",{"lat":50.033333,"lon":8.570556},{"lat":-33.94609833,"lon":151.177002},false,10247.856,1030.7704,"Sunny",0,841.2656,"OpenSearch Dashboards Airlines",0,"DE-HE","SYD","No Delay","2021-11-01 00:00:00","Sydney Kingsford Smith International Airport","17.179506930998397",false,16492.326,"Frankfurt am Main","Rain","DE","AU","SE-BD","Sydney","FRA"],["X98CCZO","Cape Town International Airport",{"lat":-33.96480179,"lon":18.60169983},{"lat":45.505299,"lon":12.3519},false,5482.6064,464.3895,"Clear",0,882.98267,"Logstash Airways",0,"SE-BD","VE05","No Delay","2021-11-01 18:27:00","Venice Marco Polo Airport","7.73982468459836",false,8823.4,"Cape Town","Sunny","ZA","IT","IT-34","Venice","CPT"]],"total":2,"size":2,"status":200}',
          outputType: 'QUERY',
          execution_time: '0s',
        },
      ],
      input: {
        inputText: '%sql select * from opensearch_dashboards_sample_data_flights limit 2',
        inputType: 'QUERY',
      },
      dateCreated: '2020-08-20T18:37:44.809Z',
      dateModified: '2020-08-20T18:37:56.844Z',
      id: 'paragraph_f1b2db55-8704-4822-a8ff-6445fe1fa10c',
    },
  ],
};

// Parsed Output of sample notebook1
export const sampleParsedParagraghs1 = [
  {
    uniqueId: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'MARKDOWN',
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp: '# Type your input here',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: undefined,
    visSavedObjId: undefined,
    visStartTime: undefined,
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: ['MARKDOWN'],
    out: ['# Type your input here'],
  },
  {
    uniqueId: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'MARKDOWN',
    isVizualisation: false,
    vizObjectInput: '',
    id: 2,
    inp: '# add code here\n',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: undefined,
    visSavedObjId: undefined,
    visStartTime: undefined,
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: ['MARKDOWN'],
    out: ['# add code here\n'],
  },
  {
    uniqueId: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'VISUALIZATION',
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 3,
    inp: '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: '2020-08-20T18:37:44.710Z',
    visSavedObjId: '935afa20-e0cd-11e7-9d07-1398ccfcefa3',
    visStartTime: '2020-07-21T18:37:44.710Z',
    editorLanguage: '',
    typeOut: ['VISUALIZATION'],
    out: [''],
  },
  {
    uniqueId: 'paragraph_f1b2db55-8704-4822-a8ff-6445fe1fa10c',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'QUERY',
    isVizualisation: false,
    vizObjectInput: '',
    id: 4,
    inp: `%sql select * from opensearch_dashboards_sample_data_flights limit 2`,
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: undefined,
    visSavedObjId: undefined,
    visStartTime: undefined,
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: ['QUERY'],
    out: [
      '{"schema":[{"name":"FlightNum","type":"keyword"},{"name":"Origin","type":"keyword"},{"name":"OriginLocation","type":"geo_point"},{"name":"DestLocation","type":"geo_point"},{"name":"FlightDelay","type":"boolean"},{"name":"DistanceMiles","type":"float"},{"name":"FlightTimeMin","type":"float"},{"name":"OriginWeather","type":"keyword"},{"name":"dayOfWeek","type":"integer"},{"name":"AvgTicketPrice","type":"float"},{"name":"Carrier","type":"keyword"},{"name":"FlightDelayMin","type":"integer"},{"name":"OriginRegion","type":"keyword"},{"name":"DestAirportID","type":"keyword"},{"name":"FlightDelayType","type":"keyword"},{"name":"timestamp","type":"timestamp"},{"name":"Dest","type":"keyword"},{"name":"FlightTimeHour","type":"keyword"},{"name":"Cancelled","type":"boolean"},{"name":"DistanceKilometers","type":"float"},{"name":"OriginCityName","type":"keyword"},{"name":"DestWeather","type":"keyword"},{"name":"OriginCountry","type":"keyword"},{"name":"DestCountry","type":"keyword"},{"name":"DestRegion","type":"keyword"},{"name":"DestCityName","type":"keyword"},{"name":"OriginAirportID","type":"keyword"}],"datarows":[["9HY9SWR","Frankfurt am Main Airport",{"lat":50.033333,"lon":8.570556},{"lat":-33.94609833,"lon":151.177002},false,10247.856,1030.7704,"Sunny",0,841.2656,"OpenSearch Dashboards Airlines",0,"DE-HE","SYD","No Delay","2021-11-01 00:00:00","Sydney Kingsford Smith International Airport","17.179506930998397",false,16492.326,"Frankfurt am Main","Rain","DE","AU","SE-BD","Sydney","FRA"],["X98CCZO","Cape Town International Airport",{"lat":-33.96480179,"lon":18.60169983},{"lat":45.505299,"lon":12.3519},false,5482.6064,464.3895,"Clear",0,882.98267,"Logstash Airways",0,"SE-BD","VE05","No Delay","2021-11-01 18:27:00","Venice Marco Polo Airport","7.73982468459836",false,8823.4,"Cape Town","Sunny","ZA","IT","IT-34","Venice","CPT"]],"total":2,"size":2,"status":200}',
    ],
  },
];

// Sample notebook with all input and cleared outputs
export const sampleNotebook2 = {
  id: 'note_5f4b9eed-5898-4b39-ba6c-755c0fadd84e',
  dateCreated: '2020-08-20T18:00:59.845Z',
  name: 'test 1',
  dateModified: '2020-08-20T19:13:06.509Z',
  pluginVersion: '7.9.0',
  backend: 'Default',
  paragraphs: [
    {
      output: [
        {
          result:
            '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
          outputType: 'MARKDOWN',
          execution_time: '0s',
        },
      ],
      input: {
        inputText:
          '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
        inputType: 'MARKDOWN',
      },
      dateCreated: '2020-08-20T18:00:59.845Z',
      dateModified: '2020-08-20T19:13:06.509Z',
      id: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    },
    {
      output: [],
      input: { inputText: '# no output here\n', inputType: 'MARKDOWN' },
      dateCreated: '2020-08-20T18:01:07.662Z',
      dateModified: '2020-08-20T19:09:19.210Z',
      id: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    },
    {
      output: [],
      input: {
        inputText:
          '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
        inputType: 'VISUALIZATION',
      },
      dateCreated: '2020-08-20T18:37:44.809Z',
      dateModified: '2020-08-20T18:37:56.844Z',
      id: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    },
  ],
};

// Parsed Output of sample notebook2
export const sampleParsedParagraghs2 = [
  {
    uniqueId: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'MARKDOWN',
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp: '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
    lang: 'text/x-md',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: undefined,
    visSavedObjId: undefined,
    visStartTime: undefined,
    editorLanguage: 'md',
    typeOut: ['MARKDOWN'],
    out: [
      '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
    ],
  },
  {
    uniqueId: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'MARKDOWN',
    isVizualisation: false,
    vizObjectInput: '',
    id: 2,
    inp: '# no output here\n',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: undefined,
    visSavedObjId: undefined,
    visStartTime: undefined,
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: [],
    out: [],
  },
  {
    uniqueId: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    isRunning: false,
    inQueue: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'VISUALIZATION',
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 3,
    inp: '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
    isInputExpanded: false,
    isOutputStale: false,
    paraDivRef: undefined,
    paraRef: undefined,
    visEndTime: '2020-08-20T18:37:44.710Z',
    visSavedObjId: '935afa20-e0cd-11e7-9d07-1398ccfcefa3',
    visStartTime: '2020-07-21T18:37:44.710Z',
    editorLanguage: '',
    typeOut: [],
    out: [],
  },
];

// Sample notebook with no input
export const sampleNotebook3 = {
  id: 'note_5f4b9eed-5898-4b39-ba6c-755c0fadd84e',
  dateCreated: '2020-08-20T18:00:59.845Z',
  name: 'test 1',
  dateModified: '2020-08-20T19:13:06.509Z',
  pluginVersion: '7.9.0',
  backend: 'Default',
  paragraphs: [
    {
      output: [
        {
          result:
            '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
          outputType: 'MARKDOWN',
          execution_time: '0s',
        },
      ],
      dateCreated: '2020-08-20T18:00:59.845Z',
      dateModified: '2020-08-20T19:13:06.509Z',
      id: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    },
  ],
};

// Sample notebook with no paragraph id
export const sampleNotebook4 = {
  id: 'note_5f4b9eed-5898-4b39-ba6c-755c0fadd84e',
  dateCreated: '2020-08-20T18:00:59.845Z',
  name: 'test 1',
  dateModified: '2020-08-20T19:13:06.509Z',
  pluginVersion: '7.9.0',
  backend: 'Default',
  paragraphs: [
    {
      output: [
        {
          result:
            '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
          outputType: 'MARKDOWN',
          execution_time: '0s',
        },
      ],
      dateCreated: '2020-08-20T18:00:59.845Z',
      dateModified: '2020-08-20T19:13:06.509Z',
    },
  ],
};

// Sample notebook with no input and output
export const sampleNotebook5 = {
  id: 'note_5f4b9eed-5898-4b39-ba6c-755c0fadd84e',
  dateCreated: '2020-08-20T18:00:59.845Z',
  name: 'test 1',
  dateModified: '2020-08-20T19:13:06.509Z',
  pluginVersion: '7.9.0',
  backend: 'Default',
  paragraphs: [
    {
      dateCreated: '2020-08-20T18:00:59.845Z',
      dateModified: '2020-08-20T19:13:06.509Z',
      id: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    },
  ],
};
