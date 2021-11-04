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

export const delay = 1500;

// trace analytics
export const TRACE_ID = '8832ed6abbb2a83516461960c89af49d';
export const SPAN_ID = 'a673bc074b438374';
export const SERVICE_NAME = 'frontend-client';

export const testDataSet = [
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-service-map-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-service-map.json',
    index: 'otel-v1-apm-service-map',
  },
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001.json',
    index: 'otel-v1-apm-span-000001',
  },
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/trace-analytics/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000002.json',
    index: 'otel-v1-apm-span-000002',
  },
]

export const setTimeFilter = (setEndTime = false, refresh = true) => {
  const startTime = 'Mar 25, 2021 @ 10:00:00.000';
  const endTime = 'Mar 25, 2021 @ 11:00:00.000';
  cy.get('button.euiButtonEmpty[aria-label="Date quick select"]').click();
  cy.get('.euiQuickSelect__applyButton').click();
  cy.get('.euiSuperDatePicker__prettyFormatLink').click();
  cy.get(
    'button.euiDatePopoverButton--start[data-test-subj="superDatePickerstartDatePopoverButton"]'
  ).click();
  cy.get('.euiTab__content').contains('Absolute').click();
  cy.get('input[data-test-subj="superDatePickerAbsoluteDateInput"]')
    .focus()
    .type('{selectall}' + startTime);
  if (setEndTime) {
    cy.wait(delay);
    cy.get(
      'button.euiDatePopoverButton--end[data-test-subj="superDatePickerendDatePopoverButton"]'
    ).click();
    cy.wait(delay);
    cy.get('.euiTab__content').contains('Absolute').click();
    cy.get('input[data-test-subj="superDatePickerAbsoluteDateInput"]')
      .focus()
      .type('{selectall}' + endTime);
  }
  if (refresh) cy.get('.euiButton__text').contains('Refresh').click();
  cy.wait(delay);
};

// notebooks
export const TEST_NOTEBOOK = 'Test Notebook';
export const SAMPLE_URL = 'https://github.com/opensearch-project/sql/tree/main/sql-jdbc';
export const MARKDOWN_TEXT = `%md
# Heading 1

#### List and links

* 1
* 2
* [SQL JDBC](${SAMPLE_URL})

---
#### Code block
* Explain SQL
\`\`\`
POST _plugins/_sql/_explain
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

export const SQL_QUERY_TEXT = `%sql
select * from opensearch_dashboards_sample_data_flights limit 20
`

export const PPL_QUERY_TEXT = `%ppl
source=opensearch_dashboards_sample_data_flights
`
