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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
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
  ],
};

// Parsed Output of sample notebook1
export const sampleParsedParagraghs1 = [
  {
    uniqueId: 'paragraph_1a710988-ec19-4caa-83cc-38eb609427d1',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp: '# Type your input here',
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: ['MARKDOWN'],
    out: ['# Type your input here'],
  },
  {
    uniqueId: 'paragraph_c3107b15-da7d-4836-aef4-0996abbc8ab2',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: false,
    vizObjectInput: '',
    id: 2,
    inp: '# add code here\n',
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: ['MARKDOWN'],
    out: ['# add code here\n'],
  },
  {
    uniqueId: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 3,
    inp:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
    editorLanguage: '',
    typeOut: ['VISUALIZATION'],
    out: [''],
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
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: false,
    vizObjectInput: '',
    id: 1,
    inp:
      '# Type no output here\n* Sample link: [link](https://opensearch.org/)\n* ~~Strike~~, **Bold**, __Italic__',
    lang: 'text/x-md',
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
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: false,
    vizObjectInput: '',
    id: 2,
    inp: '# no output here\n',
    lang: 'text/x-md',
    editorLanguage: 'md',
    typeOut: [],
    out: [],
  },
  {
    uniqueId: 'paragraph_6d3237a9-6486-4f93-aa25-0a1c838faabd',
    isRunning: false,
    inQueue: false,
    ishovered: false,
    isSelected: false,
    isInputHidden: false,
    isOutputHidden: false,
    showAddPara: false,
    isVizualisation: true,
    vizObjectInput:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    id: 3,
    inp:
      '{"viewMode":"view","panels":{"1":{"gridData":{"x":1,"y":0,"w":44,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"935afa20-e0cd-11e7-9d07-1398ccfcefa3","vis":null}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"i3ccc6260-e314-11ea-9f99-b37e94bb02ca","timeRange":{"to":"2020-08-20T18:37:44.710Z","from":"2020-07-21T18:37:44.710Z"},"title":"embed_viz_i3ccc6260-e314-11ea-9f99-b37e94bb02ca","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}',
    lang: 'text/x-',
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
