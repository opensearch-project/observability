/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const delay = 1500;
export const COMMAND_TIMEOUT_LONG = 10000;

// trace analytics
export const TRACE_ID = '8832ed6abbb2a83516461960c89af49d';
export const SPAN_ID = 'a673bc074b438374';
export const SERVICE_NAME = 'frontend-client';
export const SERVICE_SPAN_ID = '7df5609a6d104736';

export const testDataSet = [
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-service-map-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-service-map.json',
    index: 'otel-v1-apm-service-map',
  },
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001.json',
    index: 'otel-v1-apm-span-000001',
  },
  {
    mapping_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000001-mappings.json',
    data_url: 'https://raw.githubusercontent.com/opensearch-project/observability/main/dashboards-observability/.cypress/utils/otel-v1-apm-span-000002.json',
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
    .type('{selectall}' + startTime, { force: true });
  if (setEndTime) {
    cy.wait(delay);
    cy.get(
      'button.euiDatePopoverButton--end[data-test-subj="superDatePickerendDatePopoverButton"]'
    ).click();
    cy.wait(delay);
    cy.get('.euiTab__content').contains('Absolute').click();
    cy.get('input[data-test-subj="superDatePickerAbsoluteDateInput"]')
      .focus()
      .type('{selectall}' + endTime, { force: true });
  }
  if (refresh) cy.get('.euiButton__text').contains('Refresh').click();
  cy.wait(delay);
};

// notebooks
export const TEST_NOTEBOOK = 'Test Notebook';
export const SAMPLE_URL = 'https://github.com/opensearch-project/sql/tree/main/sql-jdbc';
export const NOTEBOOK_TEXT = 'Use Notebooks to interactively and collaboratively develop rich reports backed by live data. Common use cases for notebooks includes creating postmortem reports, designing run books, building live infrastructure reports, or even documentation.';
export const OPENSEARCH_URL = 'https://opensearch.org/docs/latest/observability-plugin/notebooks/';
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

export const supressResizeObserverIssue = () => {
  // exception is thrown on loading EuiDataGrid in cypress only, ignore for now
  cy.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop')) return false;
  });
};

export const verify_traces_spans_data_grid_cols_exists = () => {
  cy.get('.euiDataGridHeaderCell__content').contains('Span ID').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('Trace ID').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('Operation').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('Duration').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('Start time').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('End time').should('exist');
  cy.get('.euiDataGridHeaderCell__content').contains('Errors').should('exist');
}

export const count_table_row = (expected_row_count) => {
  cy.get('.euiDataGridHeader [role="columnheader"]').then($el => {
    let colmun_header_count = Cypress.$($el).length;
    let table_grid_cell_count = Cypress.$('[data-test-subj="dataGridRowCell"]').length;
    const total_row_count = table_grid_cell_count / colmun_header_count;
    expect(total_row_count).to.equal(expected_row_count)
  });
}
