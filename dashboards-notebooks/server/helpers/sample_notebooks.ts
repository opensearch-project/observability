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

import { v4 as uuid } from 'uuid';

const getDemoNotebook = (dateString: string) => {
  return {
    name: '(Sample) Notebook Demo',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              'Here is a demo on Dashboards Notebooks. In Notebooks, you can add **code** or **visualization** paragraphs. ',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
Here is a demo on Dashboards Notebooks. In Notebooks, you can add **code** or **visualization** paragraphs. `,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'Code paragraphs support **markdown**, **SQL**, or **PPL**. The language is defined by the first line of paragraph content using `%[language type]`.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
Code paragraphs support **markdown**, **SQL**, or **PPL**. The language is defined by the first line of paragraph content using \`% [language type]\`.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'You can add new paragraphs in the **Paragraph actions** menu on the top right of the page, the context menu on the top right of each paragraph, or the **Add paragraph** button on the bottom of the page.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
You can add new paragraphs in the **Paragraph actions** menu on the top right of the page, the context menu on the top right of each paragraph, or the **Add paragraph** button on the bottom of the page.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'You can also reorder, duplicate, or delete paragraphs using these menus.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
You can also reorder, duplicate, or delete paragraphs using these menus.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'You can click the **Run** button to run a paragraph. To edit input, click the arrow button next to paragraph title.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
You can click the **Run** button to run a paragraph. To edit input, click the arrow button next to paragraph title.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `There are three view modes:
- **View both**: allows you to edit paragraphs and view outputs on the same page.
- **Input only**: only shows input of each paragraph, allowing easier editing.
- **Output only**: only shows output of each paragraph and hides panels.`,
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
There are three view modes:
- **View both**: allows you to edit paragraphs and view outputs on the same page.
- **Input only**: only shows input of each paragraph, allowing easier editing.
- **Output only**: only shows output of each paragraph and hides panels.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'To go back, click **Notebooks** in breadcrumbs on the top left.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
To go back, click **Notebooks** in breadcrumbs on the top left.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
    ],
  };
};

const getRootCauseNotebook = (dateString: string, visIds: string[]) => {
  const uuids = [uuid()];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return {
    name: '(Sample) Root Cause Event',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              'In this demo, we will go through a sample root cause event using the [OpenSearch Dashboards sample web logs](/app/home#/tutorial_directory) with PPL and visualizations.',
            outputType: 'MARKDOWN',
            execution_time: '0.016 ms',
          },
        ],
        input: {
          inputText: `%md
In this demo, we will go through a sample root cause event using the [OpenSearch Dashboards sample web logs](/app/home#/tutorial_directory) with PPL and visualizations.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: "First, let's bring up a few visualizations for a quick overview.",
            outputType: 'MARKDOWN',
            execution_time: '0.046 ms',
          },
        ],
        input: {
          inputText: `%md
First, let's bring up a few visualizations for a quick overview.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: '',
            outputType: 'VISUALIZATION',
            execution_time: '0.017 ms',
          },
        ],
        input: {
          inputText: `{"viewMode":"view","panels":{"1":{"gridData":{"x":0,"y":0,"w":50,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"${visIds[0]}"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"${uuids[0]}","timeRange":{"to":"${dateString}","from":"${oneWeekAgo}"},"title":"embed_viz_${uuids[0]}","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}`,
          inputType: 'VISUALIZATION',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: '',
            outputType: 'VISUALIZATION',
            execution_time: '0.017 ms',
          },
        ],
        input: {
          inputText: `{"viewMode":"view","panels":{"1":{"gridData":{"x":0,"y":0,"w":50,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"${visIds[1]}"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"${uuids[0]}","timeRange":{"to":"${dateString}","from":"${oneWeekAgo}"},"title":"embed_viz_${uuids[0]}","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}`,
          inputType: 'VISUALIZATION',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `I want to have a look of source data by selected fields - (Search and Fields)
`,
            outputType: 'MARKDOWN',
            execution_time: '0.013 ms',
          },
        ],
        input: {
          inputText: `%md
I want to have a look of source data by selected fields - (Search and Fields)
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, 
  response, bytes | head 20

`,
            outputType: 'QUERY',
            execution_time: '0.008 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, 
  response, bytes | head 20

`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Is there any error log with reponse 404 or 503 - (Filter)',
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
Is there any error log with reponse 404 or 503 - (Filter)`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response, bytes | where response='503' or response='404' | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response, bytes | where response='503' or response='404' | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Still too many event? Could I quickly check which host has issue? - (Dedup) ',
            outputType: 'MARKDOWN',
            execution_time: '0.014 ms',
          },
        ],
        input: {
          inputText: `%md
Still too many event? Could I quickly check which host has issue? - (Dedup) `,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | dedup host | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.010 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | dedup host | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Too less events, could I dedup in consecutive mode? - (Dedup)',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Too less events, could I dedup in consecutive mode? - (Dedup)`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    dedup host consecutive=true | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    dedup host consecutive=true | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Stats - How many ip for each response
`,
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Stats - How many ip for each response
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count by response | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.008 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count by response | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Stats - Dive deep, group by host and response and count,sum',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Stats - Dive deep, group by host and response and count,sum`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Rename - Response is not meaningful, let's change to resp_code
`,
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Rename - Response is not meaningful, let's change to resp_code
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    stats count() as ip_count, sum(bytes) 
    as sum_bytes by host, response |
     rename response as resp_code | head 20

`,
            outputType: 'QUERY',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    stats count() as ip_count, sum(bytes) 
    as sum_bytes by host, response |
     rename response as resp_code | head 20

`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Sort - Looks good now, Could I sort by DESC count and ASC sum_bytes
`,
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Sort - Looks good now, Could I sort by DESC count and ASC sum_bytes
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | 
   rename response as resp_code | 
   sort - ip_count, + sum_bytes | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | 
   rename response as resp_code | 
   sort - ip_count, + sum_bytes | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Oh, Can I do aggregation after stats again? - (Eval)',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Oh, Can I do aggregation after stats again? - (Eval)`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    stats count() as ip_count, sum(bytes) 
    as sum_bytes by host, response | 
    rename response as resp_code | 
    sort - ip_count, + sum_bytes | 
    eval per_ip_bytes=sum_bytes/ip_count  | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' |
    stats count() as ip_count, sum(bytes) 
    as sum_bytes by host, response | 
    rename response as resp_code | 
    sort - ip_count, + sum_bytes | 
    eval per_ip_bytes=sum_bytes/ip_count  | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Wait, what do you mean by evaluation, could I really do evaluation?
`,
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
Wait, what do you mean by evaluation, could I really do evaluation?
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | 
   rename response as resp_code | 
   sort - ip_count, + sum_bytes | 
   eval per_ip_bytes=sum_bytes/ip_count, 
    double_per_ip_bytes = 2 * per_ip_bytes | head 20
`,
            outputType: 'QUERY',
            execution_time: '0.010 ms',
          },
        ],
        input: {
          inputText: `%ppl
  source=opensearch_dashboards_sample_data_logs | fields host, clientip, response,
   bytes | where response='503' or response='404' | 
   stats count() as ip_count, sum(bytes) 
   as sum_bytes by host, response | 
   rename response as resp_code | 
   sort - ip_count, + sum_bytes | 
   eval per_ip_bytes=sum_bytes/ip_count, 
    double_per_ip_bytes = 2 * per_ip_bytes | head 20
`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
    ],
  };
};

const getSQLNotebook = (dateString: string) => {
  return {
    name: '(Sample) SQL Demo',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              '**OpenSearch SQL** enables you to extract insights out of OpenSearch using the familiar SQL query syntax. It supports [JDBC](https://github.com/opensearch-project/sql/tree/main/sql-jdbc) and [ODBC](https://github.com/opensearch-project/sql/tree/main/sql-odbc) drivers, a [CLI client](https://github.com/opensearch-project/sql/tree/main/sql-cli). You can also use SQL in [Dashboards Workbench](https://github.com/opensearch-project/sql/tree/main/workbench) or Notebooks here.',
            outputType: 'MARKDOWN',
            execution_time: '0.013 ms',
          },
        ],
        input: {
          inputText: `%md
**OpenSearch SQL** enables you to extract insights out of OpenSearch using the familiar SQL query syntax. It supports [JDBC](https://github.com/opensearch-project/sql/tree/main/sql-jdbc) and [ODBC](https://github.com/opensearch-project/sql/tree/main/sql-odbc) drivers, a [CLI client](https://github.com/opensearch-project/sql/tree/main/sql-cli). You can also use SQL in [Dashboards Workbench](https://github.com/opensearch-project/sql/tree/main/workbench) or Notebooks here.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'In this notebook, we will demonstrate SQL with the [OpenSearch Dashboards sample flight data](/app/home#/tutorial_directory).',
            outputType: 'MARKDOWN',
            execution_time: '0.010 ms',
          },
        ],
        input: {
          inputText: `%md
In this notebook, we will demonstrate SQL with the [OpenSearch Dashboards sample flight data](/app/home#/tutorial_directory).`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'To use SQL, add a code paragraph and type `%sql` on top, then add SQL queries on the next line.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
To use SQL, add a code paragraph and type \`%sql\` on top, then add SQL queries on the next line.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Select * from opensearch_dashboards_sample_data_flights limit 20;',
            outputType: 'QUERY',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%sql
Select * from opensearch_dashboards_sample_data_flights limit 20;`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              "We can specify fields in `SELECT` and use the `WHERE` clause to filter results. The following query will find flights heading to countries that start with 'A' from more than 5000 miles away.",
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
We can specify fields in \`SELECT\` and use the \`WHERE\` clause to filter results. The following query will find flights heading to countries that start with 'A' from more than 5000 miles away.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `SELECT FlightNum,OriginCountry,OriginCityName,DestCountry,DestCityName,DistanceMiles FROM opensearch_dashboards_sample_data_flights WHERE DistanceMiles > 5000 AND DestCountry LIKE 'A%' LIMIT 20;`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%sql
SELECT FlightNum,OriginCountry,OriginCityName,DestCountry,DestCityName,DistanceMiles FROM opensearch_dashboards_sample_data_flights WHERE DistanceMiles > 5000 AND DestCountry LIKE 'A%' LIMIT 20;`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'OpenSearch SQL also supports subqueries. We can achieve the same with the following query.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
OpenSearch SQL also supports subqueries. We can achieve the same with the following query.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `SELECT opensearch_dashboards_sample_data_flights.FlightNum,opensearch_dashboards_sample_data_flights.OriginCountry,opensearch_dashboards_sample_data_flights.OriginCityName,opensearch_dashboards_sample_data_flights.DestCountry,opensearch_dashboards_sample_data_flights.DestCityName,opensearch_dashboards_sample_data_flights.DistanceMiles FROM opensearch_dashboards_sample_data_flights WHERE FlightNum IN (SELECT FlightNum FROM opensearch_dashboards_sample_data_flights WHERE DistanceMiles > 5000 AND DestCountry = 'AU') LIMIT 20;`,
            outputType: 'QUERY',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%sql
SELECT opensearch_dashboards_sample_data_flights.FlightNum,opensearch_dashboards_sample_data_flights.OriginCountry,opensearch_dashboards_sample_data_flights.OriginCityName,opensearch_dashboards_sample_data_flights.DestCountry,opensearch_dashboards_sample_data_flights.DestCityName,opensearch_dashboards_sample_data_flights.DistanceMiles FROM opensearch_dashboards_sample_data_flights WHERE FlightNum IN (SELECT FlightNum FROM opensearch_dashboards_sample_data_flights WHERE DistanceMiles > 5000 AND DestCountry = 'AU') LIMIT 20;`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              '`JOIN` is also supported. The next query joins the flights index with itself to find flights departed from countries that are both origins and destinations.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
\`JOIN\` is also supported. The next query joins the flights index with itself to find flights departed from countries that are both origins and destinations.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
SELECT a.FlightNum,a.OriginCountry,a.OriginCityName,a.DestCountry,a.DestCityName,a.DistanceMiles FROM opensearch_dashboards_sample_data_flights a JOIN opensearch_dashboards_sample_data_flights b on a.OriginCountry = b.DestCountry LIMIT 20`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%sql
SELECT a.FlightNum,a.OriginCountry,a.OriginCityName,a.DestCountry,a.DestCityName,a.DistanceMiles FROM opensearch_dashboards_sample_data_flights a JOIN opensearch_dashboards_sample_data_flights b on a.OriginCountry = b.DestCountry LIMIT 20`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'For aggregations, we can use `GROUP BY`. The next query finds countries with more than 500 flights departed.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
For aggregations, we can use \`GROUP BY\`. The next query finds countries with more than 500 flights departed.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `SELECT OriginCountry,COUNT(1) FROM opensearch_dashboards_sample_data_flights GROUP BY OriginCountry HAVING COUNT(1) > 500 LIMIT 20;`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%sql
SELECT OriginCountry,COUNT(1) FROM opensearch_dashboards_sample_data_flights GROUP BY OriginCountry HAVING COUNT(1) > 500 LIMIT 20;`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'There is also support for expressions in SQL.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
There is also support for expressions in SQL.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `SELECT abs(-1.234), abs(-1 * abs(-5)), dayofmonth(DATE '2021-07-07');`,
            outputType: 'QUERY',
            execution_time: '0.005 ms',
          },
        ],
        input: {
          inputText: `%sql
SELECT abs(-1.234), abs(-1 * abs(-5)), dayofmonth(DATE '2021-07-07');`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'For more information, please refer to the [technical documentation](https://docs-beta.opensearch.org/search-plugins/sql/index/).',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
For more information, please refer to the [technical documentation](https://docs-beta.opensearch.org/search-plugins/sql/index/).`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
    ],
  };
};

const getPPLNotebook = (dateString: string) => {
  return {
    name: '(Sample) PPL Demo',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              'Piped Processing Language (**PPL**) is a query language that lets you use pipe (|) syntax to explore, discover, and query data stored in OpenSearch.',
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
Piped Processing Language (**PPL**) is a query language that lets you use pipe (|) syntax to explore, discover, and query data stored in OpenSearch.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'In this notebook, we will demonstrate some simple PPL queries with the [OpenSearch Dashboards sample web logs](/app/home#/tutorial_directory). ',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
In this notebook, we will demonstrate some simple PPL queries with the [OpenSearch Dashboards sample web logs](/app/home#/tutorial_directory). `,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'To use PPL, add a code paragraph and type `%ppl` on top, then add PPL queries on the next line. PPL uses `source` to specify indices, and `head` to limit results.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To use PPL, add a code paragraph and type \`%ppl\` on top, then add PPL queries on the next line. PPL uses \`source\` to specify indices, and \`head\` to limit results.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
source=opensearch_dashboards_sample_data_logs | head 20`,
            outputType: 'QUERY',
            execution_time: '0.026 ms',
          },
        ],
        input: {
          inputText: `%ppl
source=opensearch_dashboards_sample_data_logs | head 20`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'We can specify fields to include and filter results with the `field` and `where` commands. The next query returns host with failed responses.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
We can specify fields to include and filter results with the \`field\` and \`where\` commands. The next query returns host with failed responses.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
source=opensearch_dashboards_sample_data_logs | fields host, clientip, response, bytes | where response='503' or response='404'`,
            outputType: 'QUERY',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%ppl
source=opensearch_dashboards_sample_data_logs | fields host, clientip, response, bytes | where response='503' or response='404'`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'To see most common hosts from previous result, we can use the `top` command.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To see most common hosts from previous result, we can use the \`top\` command.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' | top host`,
            outputType: 'QUERY',
            execution_time: '0.008 ms',
          },
        ],
        input: {
          inputText: `%ppl
source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' | top host`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'We can aggregate on search results using the `stats` command.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
We can aggregate on search results using the \`stats\` command.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `
source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count(1) by host`,
            outputType: 'QUERY',
            execution_time: '0.011 ms',
          },
        ],
        input: {
          inputText: `%ppl
source=opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count(1) by host`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `### Motivation

Currently, OpenSearch users can query data using either Query DSL or SQL. Query DSL is powerful and fast. However, it has a steep learning curve, and was not designed as a human interface to easily create ad hoc queries and explore user data. SQL allows users to extract and analyze data in OpenSearch in a declarative manner. OpenSearch now makes its search and query engine robust by introducing Piped Processing Language (PPL). It enables users to extract insights from OpenSearch with a sequence of commands delimited by pipes (|). It supports a comprehensive set of commands including search, where, fields, rename, dedup, sort, eval, head, top and rare, and functions, operators and expressions. Even new users who have recently adopted OpenSearch, can be productive day one, if they are familiar with the pipe (|) syntax. It enables developers, DevOps engineers, support engineers, site reliability engineers (SREs), and IT managers to effectively discover and explore log, monitoring and observability data stored in OpenSearch.`,
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
### Motivation

Currently, OpenSearch users can query data using either Query DSL or SQL. Query DSL is powerful and fast. However, it has a steep learning curve, and was not designed as a human interface to easily create ad hoc queries and explore user data. SQL allows users to extract and analyze data in OpenSearch in a declarative manner. OpenSearch now makes its search and query engine robust by introducing Piped Processing Language (PPL). It enables users to extract insights from OpenSearch with a sequence of commands delimited by pipes (|). It supports a comprehensive set of commands including search, where, fields, rename, dedup, sort, eval, head, top and rare, and functions, operators and expressions. Even new users who have recently adopted OpenSearch, can be productive day one, if they are familiar with the pipe (|) syntax. It enables developers, DevOps engineers, support engineers, site reliability engineers (SREs), and IT managers to effectively discover and explore log, monitoring and observability data stored in OpenSearch.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `For more information, please refer to the [technical documentation](https://docs-beta.opensearch.org/search-plugins/ppl/index/).

Also check out the "(Sample) Root Cause Event" notebook for a sample root cause event with PPL and visualizations.`,
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
For more information, please refer to the [technical documentation](https://docs-beta.opensearch.org/search-plugins/ppl/index/).

Also check out the "(Sample) Root Cause Event" notebook for a sample root cause event with PPL and visualizations.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
    ],
  };
};

export const getSampleNotebooks = (visIds: string[]) => {
  const dateString = new Date().toISOString();
  return [
    {
      notebook: getDemoNotebook(dateString),
      dateModified: dateString,
      dateCreated: dateString,
    },
    {
      notebook: getSQLNotebook(dateString),
      dateModified: dateString,
      dateCreated: dateString,
    },
    {
      notebook: getPPLNotebook(dateString),
      dateModified: dateString,
      dateCreated: dateString,
    },
    {
      notebook: getRootCauseNotebook(dateString, visIds),
      dateModified: dateString,
      dateCreated: dateString,
    },
  ];
};
