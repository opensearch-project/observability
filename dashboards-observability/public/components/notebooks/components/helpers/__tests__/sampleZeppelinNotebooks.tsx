/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Sample notebook with all input and output
export const sampleNotebook1 = {
  paragraphs: [
    {
      text:
        "%md \n\n### Hi Everyone\n* Here's a demo on **OpenSearch Dashboards Notebooks**\n* You may use the top left buttons to play around with notebooks and Paragraphs",
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      results: {
        code: 'SUCCESS',
        msg: [
          {
            type: 'HTML',
            data:
              '<div class="markdown-body">\n<h3>Hi Everyone</h3>\n<ul>\n<li>Here&rsquo;s a demo on <strong>OpenSearch Dashboards Notebooks</strong></li>\n<li>You may use the top left buttons to play around with notebooks and Paragraphs</li>\n</ul>\n\n</div>',
          },
        ],
      },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958104590_901298942',
      id: 'paragraph_1596519508360_932236116',
      dateCreated: '2020-08-20 21:15:04.590',
      status: 'READY',
    },
    {
      title: 'VISUALIZATION',
      text:
        '%sh #vizobject:{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:25:28.588',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958728587_1310320520',
      id: 'paragraph_1597958728587_1310320520',
      dateCreated: '2020-08-20 21:25:28.587',
      status: 'READY',
    },
  ],
  name: 'Embed Vizualization',
  id: '2FJH8PW8K',
  defaultInterpreterGroup: 'spark',
  version: '0.9.0-preview2',
  noteParams: {},
  noteForms: {},
  angularObjects: {},
  config: { isZeppelinNotebookCronEnable: false },
  info: {},
};

// Parsed Output of sample notebook1
export const sampleParsedParagraghs1 = [
  {
    uniqueId: 'paragraph_1596519508360_932236116',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType:'',
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp:
      "%md \n\n### Hi Everyone\n* Here's a demo on **OpenSearch Dashboards Notebooks**\n* You may use the top left buttons to play around with notebooks and Paragraphs",
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: ['HTML'],
    out: [
      '<div class="markdown-body">\n<h3>Hi Everyone</h3>\n<ul>\n<li>Here&rsquo;s a demo on <strong>OpenSearch Dashboards Notebooks</strong></li>\n<li>You may use the top left buttons to play around with notebooks and Paragraphs</li>\n</ul>\n\n</div>',
    ],
  },
  {
    uniqueId: 'paragraph_1597958728587_1310320520',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'VISUALIZATION',
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 2,
    inp:
      '%sh #vizobject:{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: [],
    out: [],
  },
];

// Sample notebook with all input and cleared outputs
export const sampleNotebook2 = {
  paragraphs: [
    {
      text:
        "%md \n\n### Hi Everyone\n* Here's a demo on **OpenSearch Dashboards Notebooks**\n* You may use the top left buttons to play around with notebooks and Paragraphs",
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958104590_901298942',
      id: 'paragraph_1596519508360_932236116',
      dateCreated: '2020-08-20 21:15:04.590',
      status: 'READY',
    },
    {
      title: 'Paragraph inserted',
      text: '%md\n\n## Greetings!\n* Yay! you may import and export me ',
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958104590_1715920734',
      id: 'paragraph_1596742076640_674206137',
      dateCreated: '2020-08-20 21:15:04.590',
      status: 'READY',
    },
    {
      title: 'Paragraph inserted',
      text:
        "%md\n\n### Let's use Visualization API with dashboard container to embed Visualizations in notebooks\n2. **Unpin** the container to *edit the size* or *delete it*\n3. **Refresh** the container after *date is changed*",
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958104590_931410594',
      id: 'paragraph_1596524302932_2112910756',
      dateCreated: '2020-08-20 21:15:04.590',
      status: 'READY',
    },
    {
      title: 'VISUALIZATION',
      text:
        '%sh #vizobject:{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:25:28.588',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958728587_1310320520',
      id: 'paragraph_1597958728587_1310320520',
      dateCreated: '2020-08-20 21:25:28.587',
      status: 'READY',
    },
  ],
  name: 'Embed Vizualization',
  id: '2FJH8PW8K',
  defaultInterpreterGroup: 'spark',
  version: '0.9.0-preview2',
  noteParams: {},
  noteForms: {},
  angularObjects: {},
  config: { isZeppelinNotebookCronEnable: false },
  info: {},
};

// Parsed Output of sample notebook2
export const sampleParsedParagraghs2 = [
  {
    uniqueId: 'paragraph_1596519508360_932236116',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: '',
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp:
      "%md \n\n### Hi Everyone\n* Here's a demo on **OpenSearch Dashboards Notebooks**\n* You may use the top left buttons to play around with notebooks and Paragraphs",
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: [],
    out: [],
  },
  {
    uniqueId: 'paragraph_1596742076640_674206137',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: '',
    isVizualisation: false,
    vizObjectInput: '',
    id: 2,
    inp: '%md\n\n## Greetings!\n* Yay! you may import and export me ',
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: [],
    out: [],
  },
  {
    uniqueId: 'paragraph_1596524302932_2112910756',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: '',
    isVizualisation: false,
    vizObjectInput: '',
    id: 3,
    inp:
      "%md\n\n### Let's use Visualization API with dashboard container to embed Visualizations in notebooks\n2. **Unpin** the container to *edit the size* or *delete it*\n3. **Refresh** the container after *date is changed*",
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: [],
    out: [],
  },
  {
    uniqueId: 'paragraph_1597958728587_1310320520',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    inputType: 'VISUALIZATION',
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 4,
    inp:
      '%sh #vizobject:{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: [],
    out: [],
  },
];

// Sample notebook with no paragraph Id
export const sampleNotebook3 = {
  paragraphs: [
    {
      text:
        "%md \n\n### Hi Everyone\n* Here's a demo on **OpenSearch Dashboards Notebooks**\n* You may use the top left buttons to play around with notebooks and Paragraphs",
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      results: {
        code: 'SUCCESS',
        msg: [
          {
            type: 'HTML',
            data:
              '<div class="markdown-body">\n<h3>Hi Everyone</h3>\n<ul>\n<li>Here&rsquo;s a demo on <strong>OpenSearch Dashboards Notebooks</strong></li>\n<li>You may use the top left buttons to play around with notebooks and Paragraphs</li>\n</ul>\n\n</div>',
          },
        ],
      },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958104590_901298942',
      dateCreated: '2020-08-20 21:15:04.590',
      status: 'READY',
    },
  ],
  name: 'Embed Vizualization',
  id: '2FJH8PW8K',
  defaultInterpreterGroup: 'spark',
  version: '0.9.0-preview2',
  noteParams: {},
  noteForms: {},
  angularObjects: {},
  config: { isZeppelinNotebookCronEnable: false },
  info: {},
};

// Sample notebook with no VISUALIZAITON title
export const sampleNotebook4 = {
  paragraphs: [
    {
      text:
        '%sh #vizobject:{"viewMode":"view","panels":{"1":{"gridData":{"x":15,"y":0,"w":20,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"06cf9c40-9ee8-11e7-8711-e7a007dcef99"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"iab4eaba1-e32b-11ea-aac8-99f209533253","timeRange":{"to":"2020-08-20T21:25:28.538Z","from":"2020-07-21T21:25:28.538Z"},"title":"embed_viz_iab4eaba1-e32b-11ea-aac8-99f209533253","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:25:28.588',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958728587_1310320520',
      id: 'paragraph_1597958728587_1310320520',
      dateCreated: '2020-08-20 21:25:28.587',
      status: 'READY',
    },
  ],
  name: 'Embed Vizualization',
  id: '2FJH8PW8K',
  defaultInterpreterGroup: 'spark',
  version: '0.9.0-preview2',
  noteParams: {},
  noteForms: {},
  angularObjects: {},
  config: { isZeppelinNotebookCronEnable: false },
  info: {},
};

// Sample notebook with no input and output
export const sampleNotebook5 = {
  paragraphs: [
    {
      user: 'anonymous',
      dateUpdated: '2020-08-20 21:25:28.588',
      config: {},
      settings: { params: {}, forms: {} },
      apps: [],
      runtimeInfos: {},
      progressUpdateIntervalMs: 500,
      jobName: 'paragraph_1597958728587_1310320520',
      id: 'paragraph_1597958728587_1310320520',
      dateCreated: '2020-08-20 21:25:28.587',
      status: 'READY',
    },
  ],
  name: 'Embed Vizualization',
  id: '2FJH8PW8K',
  defaultInterpreterGroup: 'spark',
  version: '0.9.0-preview2',
  noteParams: {},
  noteForms: {},
  angularObjects: {},
  config: { isZeppelinNotebookCronEnable: false },
  info: {},
};
