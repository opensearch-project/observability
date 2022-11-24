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
  saveVisualizationAndVerify,
  deleteVisualization,
} from '../../utils/event_constants';

const renderTreeMap = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
  cy.get('[aria-label="config chart selector"]').click().type('Tree map').type('{enter}');
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

describe('Render TreeMap and verify default behavior', () => {
  before(() => {
    renderTreeMap();
  });

  it('Verify the default data', () => {
    cy.get('.plot-container.plotly').should('exist');
  });

  it('Verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('breakdowns').should('not.exist');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').should('contain', 'host');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').should('contain', 'count()');
  });

  it('Options under Chart Styles section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Panel options').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Legend').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Treemap').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').should('exist');
    cy.get('.euiFormLabel.euiFormRow__label').contains('Title').should('exist');
    cy.get('.euiFieldText').click().type('Title').should('exist');
    cy.get('[data-text="Hidden"]').contains('Hidden');
    cy.get('[data-text="Show"]').contains('Show');
    cy.get('[data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="All"]').contains('All');
    cy.get('[data-text="Label"]').contains('Label');
    cy.get('[data-text="Value"]').contains('Value');
    cy.get('[data-test-subj="all"]').should('have.attr', 'checked');
    cy.get('.euiSuperSelectControl').click();
    cy.get('#Reds').click().should('exist');
    cy.get('.euiSuperSelectControl').contains('Reds').should('exist');
  });

  it('Table view for Tree Map', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });
});

describe('Save and Delete Visualization', () => {
  before(() => {
    renderTreeMap();
  });

  it('Render Tree Map, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Renders Tree Map and check for empty placeholder', () => {
  before(() => {
    landOnEventVisualizations();
    renderTreeMap();
  });

  it('Check for empty placeholder in case of no Configuration', () => {
    cy.get('[aria-label="Clear input"]').eq(0).click();
    cy.get('[aria-label="Open list of options"]').eq(0).click();
    cy.wait(delay);
    cy.get('[aria-label="Clear input"]').eq(0).click();
    cy.get('[aria-label="Open list of options"]').eq(0).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="vizWorkspace__noData"]').should('exist');
  });
});
