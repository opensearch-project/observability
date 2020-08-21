# Notebooks API Design Documentation

## Contents

1. [**Notebook Examples**](#notebook-examples)
2. [**Note APIs**](#notes-apis)
3. [**Paragraph APIs**](#paragraph-apis)
4. [**Future Work**](#future-work)
5. [**References**](#references)

## Kibana Notebooks REST APIs

**_NOTE:_** The Notebook/Paragraph structure used in body & responses, are with Zeppelin Backend Adaptor. The structure of noteboook and paragraph changes with change in backend, but format of request body and response body remains the same.

## Notebook Examples

- **Default Notebook**

```
{
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

```

- **Zeppelin Notebook**

```
{
  paragraphs: [
    {
      text:
        "%md\n Input",
      dateUpdated: '2020-08-20 21:15:04.590',
      config: {},
      settings: { params: {}, forms: {} },
      results: {
        code: 'SUCCESS',
        msg: [
          {
            type: 'HTML',
            data:
              '<div class="markdown-body">\nInput</div>',
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
```

## Notes APIs

1. **Fetch all the notebooks available →** returns a list of notebook id and paths

```
    GET api/notebooks/

    RESPONSE BODY
    {
        "data": [
        {
        "id": "2FF3GW3H8",
        "path": "/Embed Viz"
        },
        {
        "id": "2FHEP953H",
        "path": "/Log Analysis"
        },
        {
        "id": "2FES7PY77",
        "path": "/Post-mortem Report"
        },
        {
        "id": "2FFAMT6VV",
        "path": "/test 1"
        }
    ]
    }
```

2. **Get all paragraphs of a notebook →** returns list of paragraphs

```
    GET api/notebooks/note/{noteId}

    RESPONSE BODY // list of Paragraphs
    {
    "paragraphs": [
        {
        "text": "%md\n# This is markdown test",
        "user": "anonymous",
        "dateUpdated": "Aug 11, 2020 8:24:38 AM",
        "config": {
            "tableHide": true,
            "editorSetting": {
            "language": "markdown",
            "editOnDblClick": true,
            "completionSupport": false
            },
            "colWidth": 12,
            "editorMode": "ace/mode/markdown",
            "fontSize": 9,
            "editorHide": false,
            "results": {},
            "enabled": true
        },
        "settings": {
            "params": {},
            "forms": {}
        },
        "results": {
            "code": "SUCCESS",
            "msg": [
            {
                "type": "HTML",
                "data": "<div class=\"markdown-body\">\n<h1>This is markdown test</h1>\n\n</div>"
            }
            ]
        },
        "apps": [],
        "runtimeInfos": {},
        "progressUpdateIntervalMs": 500,
        "jobName": "paragraph_1597133766113_507090317",
        "id": "paragraph_1597101740623_82179823",
        "dateCreated": "Aug 11, 2020 8:16:06 AM",
        "dateStarted": "Aug 11, 2020 8:24:38 AM",
        "dateFinished": "Aug 11, 2020 8:24:38 AM",
        "status": "FINISHED"
        },
        {
        "title": "Paragraph inserted",
        "text": "%md\n# markdown cell number 2 ",
        "user": "anonymous",
        "dateUpdated": "Aug 11, 2020 8:24:32 AM",
        "config": {},
        "settings": {
            "params": {},
            "forms": {}
        },
        "results": {
            "code": "SUCCESS",
            "msg": [
            {
                "type": "HTML",
                "data": "<div class=\"markdown-body\">\n<h1>markdown cell number 2</h1>\n\n</div>"
            }
            ]
        },
        "apps": [],
        "runtimeInfos": {},
        "progressUpdateIntervalMs": 500,
        "jobName": "paragraph_1597134223413_576247989",
        "id": "paragraph_1597134223413_576247989",
        "dateCreated": "Aug 11, 2020 8:23:43 AM",
        "dateStarted": "Aug 11, 2020 8:24:32 AM",
        "dateFinished": "Aug 11, 2020 8:24:32 AM",
        "status": "FINISHED"
        }
    ]
    }
```

3. **Add a Notebook →** returns new notebook id

```
    POST api/notebooks/note

    REQUEST BODY
    {"name": "Demo Notebook"} // new name

    RESPONSE BODY
    {
        "status": "OK",
        "message": "",
        "body": "2FG6FWGY5" //New Notebook ID
    }
```

4. **Rename a Notebook →** returns acknowledgement

```
    PUT api/notebooks/note/rename

    REQUEST BODY
    {
        "noteId": "2FG6FWGY5", // notebook id to be renamed
        "name":"Demo 1", // new name
    }

    RESPONSE BODY
    {
        "status": "OK",
        "message": ""
    }
```

5. **Clone a Notebook →** returns new notebook id

```
    POST api/notebooks/note/clone

    REQUEST BODY
    {
     "noteId": "2FG6FWGY5", // notebook id to be cloned
     "name":"Demo 1_copy", // new name for cloned notebook
     }

    RESPONSE BODY
    {
        "status": "OK",
        "message": "",
        "body": "2FFAG7HAQ"
    }
```

6. **Delete a Notebook →** returns acknowledgement

```
    DELETE api/notebooks/note/{noteid}

    RESPONSE BODY
    {
        "status": "OK",
        "message": ""
    }
```

7. **Import a Notebook →** returns new notebooks Id

```
    POST api/notebooks/note/import

    REQUEST BODY
    // { noteObj: {notebooks as json} }

    {
    "noteObj": {
        "angularObjects": {},
        "config": {
            "isZeppelinNotebookCronEnable": false
        },
        "defaultInterpreterGroup": "md",
        "id": "2FH5EF6QF",
        "info": {},
        "name": "test 1",
        "noteForms": {},
        "noteParams": {},
        "paragraphs": [{
            "apps": [],
            "config": {
                "colWidth": 12,
                "editorHide": false,
                "editorMode": "ace/mode/markdown",
                "editorSetting": {
                    "completionSupport": false,
                    "editOnDblClick": true,
                    "language": "markdown"
                },
                "enabled": true,
                "fontSize": 9,
                "results": {},
                "tableHide": true
            },
            "dateCreated": "2020-08-10 23:22:20.623",
            "dateFinished": "2020-08-11 08:15:21.175",
            "dateStarted": "2020-08-11 08:15:21.150",
            "dateUpdated": "2020-08-11 08:15:21.140",
            "id": "paragraph_1597101740623_82179823",
            "jobName": "paragraph_1597101740623_82179823",
            "progressUpdateIntervalMs": 500,
            "results": {
                "code": "SUCCESS",
                "msg": [{
                    "data": "<div class=\"markdown-body\">\n<h1>This is markdown test</h1>\n\n</div>",
                    "type": "HTML"
                }]
            },
            "runtimeInfos": {},
            "settings": {
                "forms": {},
                "params": {}
            },
            "status": "FINISHED",
            "text": "# This is markdown test",
            "user": "anonymous"
        }],
        "version": "0.9.0-SNAPSHOT"
        }
    }


    RESPONSE BODY
    {
        "status": "OK",
        "message": "",
        "body": "2FF38BHBY" //new notebook id
    }
```

8. **Export a Notebook →** Returns a notebooks object

```
    GET api/notebooks/note/export/{noteid}

    RESPONSE BODY // A notebook object
    {
    "paragraphs": [
        {
        "text": "# This is markdown test",
        "user": "anonymous",
        "dateUpdated": "2020-08-11 17:08:24.063",
        "config": {
            "tableHide": true,
            "editorSetting": {
            "completionSupport": false,
            "editOnDblClick": true,
            "language": "markdown"
            },
            "colWidth": 12.0,
            "editorMode": "ace/mode/markdown",
            "editorHide": false,
            "fontSize": 9.0,
            "results": {},
            "enabled": true
        },
        "settings": {
            "params": {},
            "forms": {}
        },
        "results": {
            "code": "SUCCESS",
            "msg": [
            {
                "type": "HTML",
                "data": "<div class=\"markdown-body\">\n<h1>This is markdown test</h1>\n\n</div>"
            }
            ]
        },
        "apps": [],
        "runtimeInfos": {},
        "progressUpdateIntervalMs": 500,
        "jobName": "paragraph_1597165704063_563073184",
        "id": "paragraph_1597101740623_82179823",
        "dateCreated": "2020-08-11 17:08:24.063",
        "status": "READY"
        }
    ],
    "name": "test 1",
    "id": "2FF38BHBY",
    "defaultInterpreterGroup": "spark",
    "version": "0.9.0-SNAPSHOT",
    "noteParams": {},
    "noteForms": {},
    "angularObjects": {},
    "config": {
        "isZeppelinNotebookCronEnable": false
    },
    "info": {}
    }
```

## Paragraph APIs

1. **Update and Run a Paragraph →** returns the updated paragraph

Does the following backend tasks:

    1. Updates a paragraph (with new input)
    2. Runs it
    3. Fetches the paragraph  (with updated input and executed result output)

```
    POST api/notebooks/paragraph/update/run

    REQUEST BODY
    {
        "noteId": "2FF38BHBY", // notebook id
        "paragraphId": "paragraph_1597101740623_82179823", // para id
        "paragraphInput": "%md\n# This is markdown test 2" // para inp
    }

    RESPONSE BODY
    {
    "text": "%md\n# This is markdown test 2",
    "user": "anonymous",
    "dateUpdated": "Aug 11, 2020 5:35:01 PM",
    "config": {
        "tableHide": true,
        "editorSetting": {
        "completionSupport": false,
        "editOnDblClick": true,
        "language": "markdown"
        },
        "colWidth": 12,
        "editorMode": "ace/mode/markdown",
        "editorHide": false,
        "fontSize": 9,
        "results": {},
        "enabled": true
    },
    "settings": {
        "params": {},
        "forms": {}
    },
    "results": {
        "code": "SUCCESS",
        "msg": [
        {
            "type": "HTML",
            "data": "<div class=\"markdown-body\">\n<h1>This is markdown test 2</h1>\n\n</div>"
        }
        ]
    },
    "apps": [],
    "runtimeInfos": {},
    "progressUpdateIntervalMs": 500,
    "jobName": "paragraph_1597165704063_563073184",
    "id": "paragraph_1597101740623_82179823",
    "dateCreated": "Aug 11, 2020 5:08:24 PM",
    "dateStarted": "Aug 11, 2020 5:35:01 PM",
    "dateFinished": "Aug 11, 2020 5:35:01 PM",
    "status": "FINISHED"
    }
```

2. **Update a Paragraph →** returns the updated paragraph

Does the following backend tasks:

    1. Updates a paragraph (with new input)
    2. Fetches the paragraph  (with updated input and old output)

NOTE: This API call doesn’t execute the paragraph input, should be used to save a partially written code

```
    PUT api/notebooks/paragraph/

    REQUEST BODY
    {
        "noteId": "2FF3GW3H8", // notebook id
        "paragraphId": "paragraph_1596519508360_932236116", // para id
        "paragraphInput": "%md \n\n### Hi Everyone\n* Here's a demo on **Kibana Notebooks**\n* I was not present in previous input"
        // new input
    }

    RESPONSE BODY
    {
        "text": "%md \n\n### Hi Everyone\n* Here's a demo on **Kibana Notebooks**\n* I was present in previous input",
        "user": "anonymous",
        "dateUpdated": "Aug 11, 2020 5:52:14 PM",
        "config": {},
        "settings": {
            "params": {},
            "forms": {}
        },
        "results": {
            "code": "SUCCESS",
            "msg": [{
                "type": "HTML",
                // old result
                "data": "<div class=\"markdown-body\">\n<h3>Hi Everyone</h3>\n<ul>\n<li>Here&rsquo;s a demo on <strong>Kibana Notebooks</strong></li>\n</ul>\n\n</div>"
            }]
        },
        "apps": [],
        "runtimeInfos": {},
        "progressUpdateIntervalMs": 500,
        "jobName": "paragraph_1597104141269_874537409",
        "id": "paragraph_1596519508360_932236116",
        "dateCreated": "Aug 11, 2020 12:02:21 AM",
        "dateStarted": "Aug 11, 2020 5:51:43 PM",
        "dateFinished": "Aug 11, 2020 5:51:43 PM",
        "status": "FINISHED"
    }
```

3. **Add a new paragraph →** returns newly created paragraph

Does the following backend tasks:

    1. Adds new a paragraph
    2. Fetches the newly created paragraph

```
    POST api/notebooks/paragraph/

    REQUEST BODY
    {
        "noteId": "2FF3GW3H8", // notebook id
        "paragraphIndex": 1, // index to create a new para
        "paragraphInput": "%elasticsearch\n" // input to be provided in the new para
        "paragraphType": "CODE" // a paragraph can be of type CODE or VISUALIZATION
    }

    RESPONSE BODY
    {
        "title": "Paragraph inserted",
        "text": "%elasticsearch\n",
        "user": "anonymous",
        "dateUpdated": "Aug 11, 2020 5:56:23 PM",
        "config": {},
        "settings": {
            "params": {},
            "forms": {}
        },
        "apps": [],
        "runtimeInfos": {},
        "progressUpdateIntervalMs": 500,
        "jobName": "paragraph_1597168583538_1357513873",
        "id": "paragraph_1597168583538_1357513873",
        "dateCreated": "Aug 11, 2020 5:56:23 PM",
        "status": "READY"
    }
```

4. **Delete a paragraph →** returns list of paragraphs

```
    DELETE api/notebooks/paragraph/{noteId}/{paragraphId}

    RESPONSE BODY // list of Paragraphs
    {
        "paragraphs": [{
            "text": "%md\n# This is markdown test 2",
            "user": "anonymous",
            "dateUpdated": "Aug 11, 2020 6:55:07 PM",
            "config": {
                "tableHide": true,
                "editorSetting": {
                    "completionSupport": false,
                    "editOnDblClick": true,
                    "language": "markdown"
                },
                "colWidth": 12,
                "editorMode": "ace/mode/markdown",
                "editorHide": false,
                "fontSize": 9,
                "results": {},
                "enabled": true
            },
            "settings": {
                "params": {},
                "forms": {}
            },
            "results": {
                "code": "SUCCESS",
                "msg": [{
                    "type": "HTML",
                    "data": "<div class=\"markdown-body\">\n<h1>This is markdown test 2</h1>\n\n</div>"
                }]
            },
            "apps": [],
            "runtimeInfos": {},
            "progressUpdateIntervalMs": 500,
            "jobName": "paragraph_1597165704063_563073184",
            "id": "paragraph_1597101740623_82179823",
            "dateCreated": "Aug 11, 2020 5:08:24 PM",
            "dateStarted": "Aug 11, 2020 6:55:07 PM",
            "dateFinished": "Aug 11, 2020 6:55:07 PM",
            "status": "FINISHED"
        }, {
            "title": "Paragraph inserted",
            "text": "%elasticsearch\n",
            "user": "anonymous",
            "dateUpdated": "Aug 11, 2020 6:55:07 PM",
            "config": {},
            "settings": {
                "params": {},
                "forms": {}
            },
            "apps": [],
            "runtimeInfos": {},
            "progressUpdateIntervalMs": 500,
            "jobName": "paragraph_1597172107715_362327829",
            "id": "paragraph_1597172107715_362327829",
            "dateCreated": "Aug 11, 2020 6:55:07 PM",
            "status": "READY"
        }]
    }
```

5. **Clear outputs of all paragraphs →** returns list of paragraphs (with empty outputs)

```
    PUT api/notebooks/paragraph/clear

    REQUEST BODY
    {"noteId":"2FF38BHBY"} // notebook id to clear all paras

    RESPONSE BODY // list of Paragraphs
    {
        "paragraphs": [{
            "text": "%md\n# This is markdown test 2",
            "user": "anonymous",
            "dateUpdated": "Aug 11, 2020 6:55:07 PM",
            "config": {
                "tableHide": true,
                "editorSetting": {
                    "completionSupport": false,
                    "editOnDblClick": true,
                    "language": "markdown"
                },
                "colWidth": 12,
                "editorMode": "ace/mode/markdown",
                "editorHide": false,
                "fontSize": 9,
                "results": {},
                "enabled": true
            },
            "settings": {
                "params": {},
                "forms": {}
            },
            "apps": [],
            "runtimeInfos": {},
            "progressUpdateIntervalMs": 500,
            "jobName": "paragraph_1597165704063_563073184",
            "id": "paragraph_1597101740623_82179823",
            "dateCreated": "Aug 11, 2020 5:08:24 PM",
            "dateStarted": "Aug 11, 2020 6:55:07 PM",
            "dateFinished": "Aug 11, 2020 6:55:07 PM",
            "status": "FINISHED"
        }, {
            "title": "Paragraph inserted",
            "text": "%md\n\n# Output is empty\n",
            "user": "anonymous",
            "dateUpdated": "Aug 11, 2020 7:17:31 PM",
            "config": {},
            "settings": {
                "params": {},
                "forms": {}
            },
            "apps": [],
            "runtimeInfos": {},
            "progressUpdateIntervalMs": 500,
            "jobName": "paragraph_1597172107715_362327829",
            "id": "paragraph_1597172107715_362327829",
            "dateCreated": "Aug 11, 2020 6:55:07 PM",
            "dateStarted": "Aug 11, 2020 7:17:31 PM",
            "dateFinished": "Aug 11, 2020 7:17:31 PM",
            "status": "FINISHED"
        }]
    }
```

## **Future Work**

### **Short Term**

1. **Notes APIs**
   1. Run notebook → runs all the paragraphs and returns the updated list of paragraphs
   2. Save notebook → updates all the paragraphs and returns the updated list of paragraphs
2. **Paragraph APIs**
   1. Run a paragraph → runs the paragraph with pre-exisiting input code and returns the updated paragraph (with executed result)
   2. Refresh a paragraph → runs the paragraph with pre-exisiting input code at certain intervals and returns the updated paragraph (with executed result)

### **Long Term**

1. Checkpoint notebook → saves all the paragraphs and returns acknowledgement
2. Extend endpoints like refresh, run, save and checkpoint to be asynchronous

## References:

1.  Zeppelin APIs : http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/notebook.html
2.  More About Zeppelin: https://zeppelin.apache.org/docs/0.9.0-preview2/
