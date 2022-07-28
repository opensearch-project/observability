/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { supressResizeObserverIssue } from './constants';

export const delay = 1000;
export const YEAR_TO_DATE_DOM_ID = '[data-test-subj="superDatePickerCommonlyUsed_Year_to date"]';

export const TEST_QUERIES = [
  {
    query: 'source = opensearch_dashboards_sample_data_flights',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query: 'source = opensearch_dashboards_sample_data_logs',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      'source=opensearch_dashboards_sample_data_flights | stats max(AvgTicketPrice) by DestCountry, DestCityName, Carrier',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      'source = opensearch_dashboards_sample_data_logs | stats count(), avg(bytes) by host, tags',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      'source=opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by DestCountry, DestCityName, DestAirportID, DestRegion',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      "source = opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count() by span(timestamp,1d)",
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
  {
    query:
      'source=opensearch_dashboards_sample_data_flights |where FlightDelayMin > 0 | stats sum(FlightDelayMin) as total_delay_min, count() as total_delayed by Carrier |eval avg_delay=total_delay_min / total_delayed | sort - avg_delay',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID,
  },
];

export const TESTING_PANEL = 'Mock Testing Panels';
export const SAVE_QUERY1 = 'Mock Flight Events Overview';
export const SAVE_QUERY2 = 'Mock Flight count by destination';
export const SAVE_QUERY3 = 'Mock Flight count by destination save to panel';
export const SAVE_QUERY4 = 'Mock Flight peek';

export const querySearch = (query, rangeSelected) => {
  cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(query);
  cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
  cy.wait(delay);
  cy.get(rangeSelected).click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

export const landOnEventHome = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics`);
  cy.wait(delay);
};

export const landOnEventExplorer = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/explorer`
  );
  cy.wait(delay);
};

export const landOnEventVisualizations = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/explorer`
  );
  cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
  supressResizeObserverIssue();
  cy.wait(delay);
};

export const landOnPanels = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels`
  );
  cy.wait(delay);
};

const vis_name_sub_string = Math.floor(Math.random() * 100);
export const saveVisualizationAndVerify = () => {
  cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
  cy.get('[data-test-subj="eventExplorer__querySaveComboBox"]').click();
  cy.get('.euiComboBoxOptionsList__rowWrap .euiFilterSelectItem').eq(0).click();
  cy.get(
    '.euiPopover__panel .euiFormControlLayoutIcons [data-test-subj="comboBoxToggleListButton"]'
  )
    .eq(0)
    .click();
  cy.get('.euiPopover__panel input')
    .eq(1)
    .type(`Test visualization` + vis_name_sub_string);
  cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
  cy.wait(delay);
  cy.get('.euiHeaderBreadcrumbs a').eq(1).click();
  cy.get('.euiFlexGroup .euiFormControlLayout__childrenWrapper input')
    .eq(0)
    .type(`Test visualization` + vis_name_sub_string)
    .type('{enter}');
  cy.get('.euiBasicTable .euiTableCellContent button').eq(0).click();
};

export const deleteVisualization = () => {
  cy.get('a[href = "#/event_analytics"]').click();
  cy.get('.euiFlexGroup .euiFormControlLayout__childrenWrapper input')
    .eq(0)
    .type(`Test visualization` + vis_name_sub_string)
    .type('{enter}');
  cy.get('input[data-test-subj = "checkboxSelectAll"]').click();
  cy.get('.euiButtonContent.euiButtonContent--iconRight.euiButton__content').click();
  cy.get('.euiContextMenuItem .euiContextMenuItem__text').eq(0).click();
  cy.get('input[placeholder = "delete"]').clear().type('delete');
  cy.get('button[data-test-subj = "popoverModal__deleteButton"]').click();
  cy.get('.euiToastHeader').should('exist');
};

export const renderDataConfig = () => {
  cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
  cy.get('.euiTitle.euiTitle--xxsmall').eq(1).contains('Dimensions').should('exist');
  cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Aggregation');
  cy.get('[data-test-subj="comboBoxSearchInput"]').eq(0).click();
  cy.get('.euiComboBoxOption__content').eq(2).click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(1).contains('Field');
  cy.get('[data-test-subj="comboBoxSearchInput"]').eq(1).click();
  cy.get('.euiComboBoxOption__content').eq(1).click();
  cy.get('.euiFieldText[placeholder="Custom label"]').eq(0).type('Average field');
  cy.get('.euiTitle.euiTitle--xxsmall').eq(2).contains('Metrics').should('exist');
  cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Aggregation');
  cy.get('.euiFormRow__fieldWrapper .euiComboBox').eq(2).click();
  cy.get('.euiComboBoxOption__content').eq(4).click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(4).click();
  cy.get('.euiComboBoxOption__content').eq(0).click();
  cy.get('.euiFieldText[placeholder="Custom label"]').eq(1).type('Min field');
  cy.get('.euiButton__text').contains('Right').click();
  cy.get('[data-test-subj="visualizeEditorRenderButton"]').contains('Update chart').click();
  cy.get('.js-plotly-plot').should('exist');
};

export const renderLineChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[5].query, TEST_QUERIES[5].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Line')
    .type('{enter}');
};

export const renderGaugeChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[1].query, TEST_QUERIES[1].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Gauge')
    .type('{enter}');
};
