/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */


export const delay = 1000;
export const TEST_NOTEBOOK = 'Test Notebook';
export const SAMPLE_URL = 'https://github.com/opendistro-for-elasticsearch/sql/tree/master/sql-jdbc';
export const MARKDOWN_TEXT = `
# Heading 1

#### List and links

* 1
* 2
* [SQL JDBC](${SAMPLE_URL})

---
#### Code block
* Explain SQL to elasticsearch query DSL
\`\`\`
POST _opendistro/_sql/_explain
{
  "query": "SELECT * FROM my-index LIMIT 50"
}
\`\`\`

#### Table
| a1 | b1 | c1 | d1 |
|----|----|----|----|
| a2 | b2 | c2 | d2 |
| a3 | b3 | c3 | d3 |
`
