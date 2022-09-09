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
  saveVisualizationAndVerify,
  deleteVisualization,
} from '../../utils/event_constants';

const renderPieChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').click();
  cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Pie').click();
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

describe.only('Render Pie chart and verify default behavior', () => {
  beforeEach(() => {
    renderPieChart();
  });

  it('Render Pie chart and verify the default data', () => {
    cy.get('.plot-container.plotly').should('exist');
  });

  it('Render Pie chart and verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.first-division .euiFormRow__labelWrapper').contains('Aggregation').should('exist');
    cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Field').should('exist');
    cy.get('.first-division .euiFormLabel.euiFormRow__label')
      .contains('Custom label')
      .should('exist');
    cy.get('.first-division .euiButton__text').contains('Add').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiButton__text').contains('Update chart').should('exist');
  });

  it('Render Pie chart and verify Style section for Logs view', () => {
    cy.get('#data-panel').contains('Style').should('exist');
    cy.get('[aria-controls="configPanel__panelOptions"]').contains('Panel options').should('exist');
    cy.get('[aria-controls="configPanel__legend"]').contains('Legend').should('exist');
    cy.get('.euiForm.visEditorSidebar__form .euiIEFlexWrapFix')
      .contains('Tooltip options')
      .should('exist');
    cy.get('[aria-controls="configPanel__chartStyles"]').contains('Chart styles').should('exist');
  });

  it('Options under Legend section', () => {
    cy.get('#configPanel__legend').contains('Legend');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(3).contains('Show legend');
    cy.get('[data-text="Show"]').eq(0).contains('Show');
    cy.get('[data-text="Hidden"]').eq(0).contains('Hidden');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Position');
    cy.get('[data-text="Right"]').contains('Right');
    cy.get('[data-text="Bottom"]').contains('Bottom');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Legend size').should('exist');
  });

  it('Options under Tooltip options section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').should('exist');
    cy.get('[data-text="Show"]').eq(1).contains('Show');
    cy.get('[data-text="Hidden"]').eq(1).contains('Hidden');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Tooltip text');
    cy.get('[data-text="All"]').contains('All');
    cy.get('[data-text="Label"]').contains('Label');
    cy.get('[data-text="Value"]').contains('Value');
    cy.get('[data-text="Percent"]').contains('Percent');
  });

  it('Options under Chart Styles section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').should('exist');
    cy.get('#configPanel__chartStyles').contains('Mode');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(9).contains('Label size');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Color theme');
  });

  it('Table view should be enabled for Pie chart', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });

  it('Render Pie chart and verify legends for Position Right and Bottom', () => {
    cy.get('[data-text="Right"]').should('have.text', 'Right');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });

  it('Render Pie chart and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').eq(0).should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').eq(0).should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });
});

describe('Save and Delete Visualization', () => {
  beforeEach(() => {
    renderPieChart();
  });

  it('Render Pie chart, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Color Theme section', () => {
  beforeEach(() => {
    renderPieChart();
  });

  it('Default option in Color Theme', () => {
    cy.get('.euiTitle.euiTitle--xxsmall')
      .contains('Color Theme')
      .scrollIntoView()
      .should('be.visible');
    cy.get('.euiSuperSelectControl').contains('Default').should('exist');
  });

  it('Render pie chart with single color option', () => {
    cy.get('.euiTitle.euiTitle--xxsmall')
      .contains('Color Theme')
      .scrollIntoView()
      .should('be.visible');
    cy.get('.euiSuperSelectControl').contains('Default').click();
    cy.get('.euiColorPalettePicker__item').contains('Single Color').click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
    cy.get('.euiColorPickerSwatch.euiColorPicker__swatchSelect').eq(2).click();
    cy.get('.pielayer').should('exist');
  });
});

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
