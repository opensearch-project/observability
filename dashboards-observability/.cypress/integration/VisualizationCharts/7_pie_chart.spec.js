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
  renderDataConfig,
} from '../../utils/event_constants';
import { supressResizeObserverIssue } from '../../utils/constants';

const renderPieChart = () => {
  querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').click();
  cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Pie').click();
  cy.wait(delay);
  cy.get('#configPanel__panelOptions .euiFieldText').click().type('Pie chart');
  cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]')
    .click()
    .type('This is the description for Pie chart');
  cy.get('[aria-controls="configPanel__legend"]').contains('Legend');
  cy.get('#configPanel__legend .euiTitle.euiTitle--xxsmall').eq(0).contains('Show Legend');
  cy.get('.euiButtonGroup__buttons [title="Show"]').should('not.be.disabled');
  cy.get('#configPanel__legend .euiTitle.euiTitle--xxsmall').eq(1).contains('Position');
  cy.get('.euiButtonGroup__buttons [title="Right"]').should('not.be.disabled');
  cy.get('#configPanel__legend .euiTitle.euiTitle--xxsmall').eq(2).contains('Legend Size');
  cy.get('#configPanel__legend [data-test-subj="valueFieldNumber"]').type('12');
  cy.get('[aria-controls="configPanel__chartStyles"]').contains('Chart Styles');
  cy.get('#configPanel__chartStyles .euiTitle.euiTitle--xxsmall').eq(0).contains('Mode');
  cy.get('.euiFormControlLayoutClearButton').eq(3).click();
  cy.get('.visEditorSidebar__config [data-test-subj="comboBoxSearchInput"]').click();
  cy.get('.euiComboBoxOptionsList__rowWrap .euiComboBoxOption__content').eq(1).click();
  cy.get('.visEditorSidebar__config .euiTitle.euiTitle--xxsmall').eq(4).contains('Label Size');
  cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type('15');
  cy.get('.visEditorSidebar__config .euiTitle.euiTitle--xxsmall').eq(5).contains('Color Theme');
  cy.get('.euiSuperSelectControl').click();
  cy.get('#singleColor').click();
  cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
  cy.get(
    '.euiFlexItem.euiFlexItem--flexGrowZero .euiColorPickerSwatch.euiColorPicker__swatchSelect'
  )
    .eq(2)
    .click({ force: true });
  cy.get('.plot-container.plotly').should('exist');
};

const aggregationValues = [
  'COUNT',
  'SUM',
  'AVERAGE',
  'MAX',
  'MIN',
  'VAR_SAMP',
  'VAR_POP',
  'STDDEV_SAMP',
  'STDDEV_POP',
];

describe('Renders Pie chart and Data Configurations section for Pie chart', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    renderPieChart();
  });

  it('Renders Dimensions and Metrics under Data Configurations for Pie chart', () => {
    renderDataConfig();
  });

  it('Validate "Add" and "X" buttons', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiText.euiText--extraSmall').eq(0).click();
    cy.get('.euiButton.euiButton--primary.euiButton--fullWidth').contains('Add').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(2).click();
    cy.get('.euiComboBoxOption__content').eq(0).click();
    cy.get('.euiIcon.euiIcon--medium.euiIcon--danger').eq(1).click();
    cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(4).click();
    cy.get('.euiComboBoxOption__content').eq(1).click();
    cy.get('.euiFieldText[placeholder="Custom label"]').eq(1).type('Demo field');
    cy.get('.euiIcon.euiIcon--medium.euiIcon--danger').eq(1).click();
    cy.get('.euiButton.euiButton--primary.euiButton--fullWidth').contains('Add').should('exist');
  });

  it('Verify drop down values for Aggregation', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(1).contains('Dimensions').should('exist');
    cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Aggregation');
    cy.get('.euiText.euiText--extraSmall').eq(0).click();
    cy.get('[data-test-subj="comboBoxSearchInput"]').eq(0).click();
    aggregationValues.forEach(function (value) {
      cy.get('.euiComboBoxOption__content').contains(value);
    });
  });

  it('Collapsible mode for Data Configuration panel', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiResizableButton.euiResizableButton--horizontal').eq(1).click();
    cy.get('[data-test-subj="panel-1-toggle"]').click();
    cy.get('[class*="euiResizableToggleButton-isCollapsed"]').eq(1).should('exist');
    cy.get('.euiResizablePanel.euiResizablePanel--middle')
      .contains('Data Configurations')
      .should('not.be.focused');
  });
});

describe('Render Pie chart for Legend and single color contrast change', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    renderPieChart();
  });
  it('Render Pie chart and verify legends for Position Right and Bottom', () => {
    cy.get('[data-text="Right"]').should('have.text', 'Right');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });

  it('Render Pie chart and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });

  it.only('Renders Pie chart with single color', () => {
    renderPieChart();
  });
});
