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

const getDemoNotebook = (dateString: string, visId: string) => {
  const uuids = [uuid()];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return {
    name: 'OpenSearch Notebooks Quick Start Guide',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              `An OpenSearch Dashboards notebook is an interface that lets you easily combine code snippets, live visualizations, and narrative text in a single notebook interface.

Notebooks let you interactively explore data by running different visualizations that you can share with team members to collaborate on a project.

A notebook is a document composed of two elements: code blocks (Markdown/SQL/PPL) and visualizations.

Common use cases include creating postmortem reports, designing runbooks, building live infrastructure reports, and writing documentation.

You can also generate [reports](https://opensearch.org/docs/dashboards/reporting/) directly from your notebooks.

For more information, refer to the [documentation](https://opensearch.org/docs/dashboards/notebooks/).`,
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
An OpenSearch Dashboards notebook is an interface that lets you easily combine code snippets, live visualizations, and narrative text in a single notebook interface.

Notebooks let you interactively explore data by running different visualizations that you can share with team members to collaborate on a project.

A notebook is a document composed of two elements: code blocks (Markdown/SQL/PPL) and visualizations.

Common use cases include creating postmortem reports, designing runbooks, building live infrastructure reports, and writing documentation.

You can also generate [reports](https://opensearch.org/docs/dashboards/reporting/) directly from your notebooks.

For more information, refer to the [documentation](https://opensearch.org/docs/dashboards/notebooks/).`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'Notebooks combine code blocks and visualizations for describing data. Code blocks support markdown, SQL, and PPL languages. Specify the input language on the first line using %\[language type\] syntax. For example, type %md for markdown, %sql for SQL, and %ppl for PPL. A sample visualization is shown below:',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
Notebooks combine code blocks and visualizations for describing data. Code blocks support markdown, SQL, and PPL languages. Specify the input language on the first line using %\[language type\] syntax. For example, type %md for markdown, %sql for SQL, and %ppl for PPL. A sample visualization is shown below:`,
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
          inputText: `{"viewMode":"view","panels":{"1":{"gridData":{"x":0,"y":0,"w":50,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"${visId}"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"${uuids[0]}","timeRange":{"to":"${dateString}","from":"${oneWeekAgo}"},"title":"embed_viz_${uuids[0]}","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}`,
          inputType: 'VISUALIZATION',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result:
              'You can add a new paragraph from the **Paragraph actions** menu on the top right of the page, the context menu on the top right of each paragraph, or the **Add paragraph** button on the bottom of the page.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
You can add a new paragraph from the **Paragraph actions** menu on the top right of the page, the context menu on the top right of each paragraph, or the **Add paragraph** button on the bottom of the page.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: 'You can also reorder, duplicate, or delete paragraphs from these menus.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
You can also reorder, duplicate, or delete paragraphs from these menus.`,
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
              'To execute a paragraph, choose **Run**. To make changes to the input block, choose the downward arrow that\'s next to the paragraph title.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
To execute a paragraph, choose **Run**. To make changes to the input block, choose the downward arrow that's next to the paragraph title.`,
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
            result: 'To go back, choose **Notebooks** on the top left of your screen.',
            outputType: 'MARKDOWN',
            execution_time: '0 ms',
          },
        ],
        input: {
          inputText: `%md
To go back, choose **Notebooks** on the top left of your screen.`,
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
  const uuids = [uuid(), uuid()];
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return {
    name: '[Logs] Sample Root Cause Event Analysis',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              'This notebook goes through a sample root cause event analysis using PPL and visualizations with the OpenSearch Dashboards sample web logs data.',
            outputType: 'MARKDOWN',
            execution_time: '0.016 ms',
          },
        ],
        input: {
          inputText: `%md
This notebook goes through a sample root cause event analysis using PPL and visualizations with the OpenSearch Dashboards sample web logs data.`,
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
          inputText: `{"viewMode":"view","panels":{"1":{"gridData":{"x":0,"y":0,"w":50,"h":20,"i":"1"},"type":"visualization","explicitInput":{"id":"1","savedObjectId":"${visIds[1]}"}}},"isFullScreenMode":false,"filters":[],"useMargins":false,"id":"${uuids[1]}","timeRange":{"to":"${dateString}","from":"${oneWeekAgo}"},"title":"embed_viz_${uuids[1]}","query":{"query":"","language":"lucene"},"refreshConfig":{"pause":true,"value":15}}`,
          inputType: 'VISUALIZATION',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Let's take a look at the source data by the selected fields (search and fields).`,
            outputType: 'MARKDOWN',
            execution_time: '0.013 ms',
          },
        ],
        input: {
          inputText: `%md
Let's take a look at the source data by the selected fields (search and fields).`,
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
            result: 'Check for any error log with response code 404 or 503 (filter).',
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
Check for any error log with response code 404 or 503 (filter).`,
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
            result: 'We see too many events. Let\'s quickly check which host has the issue (dedup).',
            outputType: 'MARKDOWN',
            execution_time: '0.014 ms',
          },
        ],
        input: {
          inputText: `%md
We see too many events. Let's quickly check which host has the issue (dedup).`,
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
            result: 'We get too few events. Let\'s dedup in consecutive mode (dedup).',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
We get too few events. Let's dedup in consecutive mode (dedup).`,
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
            result: 'How many IP addresses for each response (stats).',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
How many IP addresses for each response (stats).`,
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
            result: 'To dive deep, let\'s group by host and response, count, and sum (stats).',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To dive deep, let's group by host and response, count, and sum (stats).`,
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
            result: `We don't see a meaningful response. Let's change to resp_code (rename).`,
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
We don't see a meaningful response. Let's change to resp_code (rename).`,
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
            result: 'The data looks better now. Let\'s sort by `DESC count` and `ASC sum_bytes` (sort).',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
The data looks better now. Let's sort by \`DESC count\` and \`ASC sum_bytes\` (sort).`,
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
            result: 'Let\'s check if we can perform aggregations after stats (eval).',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
Let's check if we can perform aggregations after stats (eval).`,
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
            result: `Wait, what's meant by an evaluation. Can we really perform an evaluation?`,
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
Wait, what's meant by an evaluation. Can we really perform an evaluation?`,
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
    name: '[Flights] OpenSearch SQL Quick Start Guide',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result:
              `OpenSearch SQL lets you write queries in SQL rather than the [OpenSearch query domain-specific language (DSL)](https://opensearch.org/docs/opensearch/query-dsl/full-text/). If you’re already familiar with SQL and don’t want to learn the query DSL, this feature is a great option.

For more information, please refer to the [documentation](https://opensearch.org/docs/search-plugins/sql/index/).`,
            outputType: 'MARKDOWN',
            execution_time: '0.013 ms',
          },
        ],
        input: {
          inputText: `%md
OpenSearch SQL lets you write queries in SQL rather than the [OpenSearch query domain-specific language (DSL)](https://opensearch.org/docs/opensearch/query-dsl/full-text/). If you’re already familiar with SQL and don’t want to learn the query DSL, this feature is a great option.

For more information, please refer to the [documentation](https://opensearch.org/docs/search-plugins/sql/index/).`,
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
              'This notebook shows you how to use SQL with the [OpenSearch Dashboards sample flight data](/app/home#/tutorial_directory).',
            outputType: 'MARKDOWN',
            execution_time: '0.010 ms',
          },
        ],
        input: {
          inputText: `%md
This notebook shows you how to use SQL with the [OpenSearch Dashboards sample flight data](/app/home#/tutorial_directory).`,
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
              'To use SQL, add a code paragraph, type %sql on the first line, and then add SQL queries on the next line.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
To use SQL, add a code paragraph, type %sql on the first line, and then add SQL queries on the next line.`,
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
              'You can specify fields in the `SELECT` clause and use the `WHERE` clause to filter results. The following query finds flights heading to countries that start with \'A\' that are more than 5000 miles away.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
You can specify fields in the \`SELECT\` clause and use the \`WHERE\` clause to filter results. The following query finds flights heading to countries that start with 'A' that are more than 5000 miles away.`,
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
              'OpenSearch SQL also supports subqueries:',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
OpenSearch SQL also supports subqueries:`,
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
              'OpenSearch SQL supports inner joins, cross joins, and left outer joins. The following query joins the flights index with itself to find flights departed from countries that are both origins and destinations.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
OpenSearch SQL supports inner joins, cross joins, and left outer joins. The following query joins the flights index with itself to find flights departed from countries that are both origins and destinations.`,
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
              'For aggregations, use the `GROUP BY` clause. The following query finds the countries with more than 500 flights departed.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
For aggregations, use the \`GROUP BY\` clause. The following query finds the countries with more than 500 flights departed.`,
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
            result: 'OpenSearch SQL supports expressions.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
OpenSearch SQL supports expressions.`,
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
    ],
  };
};

const getPPLNotebook = (dateString: string) => {
  return {
    name: '[Logs] OpenSearch Piped Processing Language (PPL) Quick Start Guide',
    dateCreated: dateString,
    dateModified: dateString,
    backend: 'Default',
    paragraphs: [
      {
        output: [
          {
            result: `Query DSL is powerful and fast, but it has a steep learning curve because it doesn’t have a human-readable interface. It's also difficult to create ad hoc queries and explore your data. SQL lets you extract and analyze data in a declarative manner.

OpenSearch makes its search and query engine robust by introducing Piped Processing Language (PPL).

PPL enables developers, DevOps engineers, support engineers, site reliability engineers (SREs), and IT managers to effectively discover and explore log data stored in OpenSearch.

With PPL, you can extract insights from your data with a sequence of commands delimited by pipes (|). PPL supports a comprehensive set of commands including search, where, fields, rename, dedup, sort, eval, head, top, and rare. PPL also supports functions, operators and expressions.

Even if you're new to OpenSearch and are only familiar with the pipe (|) syntax, you can still be productive from day one.`,
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
Query DSL is powerful and fast, but it has a steep learning curve because it doesn’t have a human-readable interface. It's also difficult to create ad hoc queries and explore your data. SQL lets you extract and analyze data in a declarative manner.

OpenSearch makes its search and query engine robust by introducing Piped Processing Language (PPL).

PPL enables developers, DevOps engineers, support engineers, site reliability engineers (SREs), and IT managers to effectively discover and explore log data stored in OpenSearch.

With PPL, you can extract insights from your data with a sequence of commands delimited by pipes (|). PPL supports a comprehensive set of commands including search, where, fields, rename, dedup, sort, eval, head, top, and rare. PPL also supports functions, operators and expressions.

Even if you're new to OpenSearch and are only familiar with the pipe (|) syntax, you can still be productive from day one.`,
          inputType: 'MARKDOWN',
        },
        dateCreated: dateString,
        dateModified: dateString,
        id: 'paragraph_' + uuid(),
      },
      {
        output: [
          {
            result: `Piped Processing Language (PPL) is a query language that lets you use pipe (|) syntax to explore, discover, and query data stored in OpenSearch.

For more information, refer to the [documentation](https://opensearch.org/docs/search-plugins/ppl/index/).`,
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
Piped Processing Language (PPL) is a query language that lets you use pipe (|) syntax to explore, discover, and query data stored in OpenSearch.

For more information, refer to the [documentation](https://opensearch.org/docs/search-plugins/ppl/index/).`,
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
              'To use PPL, add a code paragraph, type `%ppl` on the first line, and add your PPL query on the next line. PPL uses `source` to specify indices and `head` to limit results.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To use PPL, add a code paragraph, type \`%ppl\` on the first line, and add your PPL query on the next line. PPL uses \`source\` to specify indices and \`head\` to limit results.`,
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
              'To specify fields to include and filter results, use the `field` and `where` commands. The next query returns hosts with failed responses.',
            outputType: 'MARKDOWN',
            execution_time: '0.007 ms',
          },
        ],
        input: {
          inputText: `%md
To specify fields to include and filter results, use the \`field\` and \`where\` commands. The next query returns hosts with failed responses.`,
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
            result: 'To see most common hosts from the previous result, use the `top` command.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To see most common hosts from the previous result, use the \`top\` command.`,
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
            result: 'To perform aggregations on search results, use the `stats` command.',
            outputType: 'MARKDOWN',
            execution_time: '0.006 ms',
          },
        ],
        input: {
          inputText: `%md
To perform aggregations on search results, use the \`stats\` command.`,
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
            result: `For more information, refer to the [documentation](https://opensearch.org/docs/search-plugins/ppl/index/).

To see how to perform sample root cause event analysis using PPL and visualizations, see the "\[Logs\] Sample Root Cause Event Analysis" notebook.`,
            outputType: 'MARKDOWN',
            execution_time: '0.009 ms',
          },
        ],
        input: {
          inputText: `%md
For more information, refer to the [documentation](https://opensearch.org/docs/search-plugins/ppl/index/).

To see how to perform sample root cause event analysis using PPL and visualizations, see the "\[Logs\] Sample Root Cause Event Analysis" notebook.`,
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
      notebook: getDemoNotebook(dateString, visIds[2]),
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
