/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />
import {
  delay,
  TEST_QUERIES,
  querySearch,
  landOnEventVisualizations,
} from '../../utils/event_constants';

const renderHistogramChart = () => {
  querySearch(TEST_QUERIES[5].query, TEST_QUERIES[5].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').click();
  cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Histogram').click();
  cy.wait(delay);
  cy.get('#configPanel__panelOptions .euiFieldText').click().type('Histogram');
  cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]')
    .click()
    .type('This is the description for Histogram chart');
  cy.get('.euiIEFlexWrapFix').eq(1).contains('Chart Styles').should('exist');
  cy.get('#configPanel__chartStyles .euiTitle.euiTitle--xxsmall').eq(0).contains('Line width');
  cy.get('#configPanel__chartStyles .euiTitle.euiTitle--xxsmall').eq(1).contains('Fill Opacity');
  cy.get('.euiAccordion__button[aria-controls="configPanel__Color Theme"]')
    .contains('Color Theme')
    .should('exist');
  cy.get('[aria-controls="configPanel__legend"]').contains('Legend');
  cy.get('#configPanel__legend').contains('Show Legend');
  cy.get('.euiButton__text.euiButtonGroupButton__textShift[data-text="Show"]').should(
    'not.be.disabled'
  );
  cy.get('#configPanel__legend').contains('Position');
  cy.get('.euiButton__text.euiButtonGroupButton__textShift[data-text="Right"]').should(
    'not.be.disabled'
  );
};

describe('Renders Histogram chart', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    renderHistogramChart();
  });

  it('Renders Histogram chart and save visualization', () => {
    saveVisualizationAndVerify();
  });

  it('Delete Visualization for Histogram chart from list of saved Visualizations on Event analytics page', () => {
    deleteVisualization();
  });

  it('Renders Histogram chart and Color Theme', () => {});

  it.only('Renders Histogram chart and Data Configurations panel', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--collapsible.euiResizablePanel--middle').contains(
      'Data Configurations'
    );
    cy.get('.euiResizablePanel.euiResizablePanel--collapsible.euiResizablePanel--middle').contains(
      'Bucket Size'
    );
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).type('500');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type('1000');
    cy.get(
      '.euiPanel.euiPanel--paddingSmall.euiPanel--borderRadiusMedium.euiPanel--plain.euiPanel--hasShadow.dataConfigContainer'
    ).click();
  });
});
