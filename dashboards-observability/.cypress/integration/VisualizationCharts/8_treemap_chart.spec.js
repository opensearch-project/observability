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
import { supressResizeObserverIssue } from '../../utils/constants';

export const renderTreeMapchart = () => {
  querySearch(TEST_QUERIES[5].query, TEST_QUERIES[5].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Tree Map')
    .type('{enter}');
  cy.get('#configPanel__panelOptions .euiFieldText').click().type('Tree Map');
  cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]')
    .click()
    .type('This is the description for Tree Map');
  cy.get('[aria-controls ="configPanel__legend"]').contains('Legend');
  cy.get('#configPanel__legend').contains('Show Colorscale').should('exist');
  cy.get('.euiButton__text.euiButtonGroupButton__textShift[title="Show"]').should(
    'not.be.disabled'
  );
  cy.get('[aria-controls="configPanel__treemap_options"]').contains('Treemap');
  cy.get('#configPanel__treemap_options').contains('Tiling Algorithm').should('exist');
  cy.get('[data-test-subj = "comboBoxInput"]').eq(3).click();
  cy.get('.euiComboBoxOption__content').eq(4).click();
  cy.get('.euiButton__text.euiButtonGroupButton__textShift[title="Largest to Smallest"]')
    .contains('Largest to Smallest')
    .should('not.be.disabled');
};

const renderDataConfigTreeMap = () => {
  cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
  cy.get('.euiTitle.euiTitle--xxsmall').eq(1).contains('Dimensions');
  cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Child Field');
  cy.get('.euiComboBoxOption__content').eq(1).click();
  cy.get('[data-test-subj="addParentButton"] .euiButton__text').contains('+ Add Parent').click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Parent 1').should('exist');
  cy.get('p.euiComboBoxPlaceholder').eq(0).click({ force: true });
  cy.get('.euiComboBoxOption__content').eq(0).click();
  cy.get('.euiTitle.euiTitle--xxsmall').eq(2).contains('Metrics');
  cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Value Field');
  cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
  cy.get('.euiComboBoxOption__content').eq(0).click();
};

export const renderAddParent = () => {
  cy.get(' [data-test-subj="addParentButton"] .euiButton__text').contains('+ Add Parent').click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Parent 1').should('exist');
  cy.get('p.euiComboBoxPlaceholder').click({ force: true });
  cy.get('.euiComboBoxOption__content').eq(2).click();
  cy.get(' [data-test-subj="addParentButton"] .euiButton__text').contains('+ Add Parent').click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Parent 2').should('exist');
  cy.get('p.euiComboBoxPlaceholder').click({ force: true });
  cy.get('.euiComboBoxOption__content').eq(1).click();
  cy.get(' [data-test-subj="addParentButton"] .euiButton__text').contains('+ Add Parent').click();
  cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Parent 3').should('exist');
  cy.get('p.euiComboBoxPlaceholder').click({ force: true });
  cy.get('.euiComboBoxOption__content').eq(0).click();
};

describe('Renders Tree Map', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    renderTreeMapchart();
  });

  it('Renders Tree Map', () => {
    cy.get('#explorerPlotComponent').should('exist');
  });

  it('Renders Tree Map, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    cy.wait(delay * 4);
    deleteVisualization();
  });

  it('Render Tree Map chart and verify color theme under Chart styles options', () => {
    cy.get('[aria-controls="configPanel__chartStyles"]').contains('Chart Styles');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Color Theme').should('exist');
    cy.get('.euiSuperSelectControl').contains('Default').click();
    cy.get('.euiContextMenuItem__text .euiColorPalettePicker__item')
      .eq(1)
      .contains('Single color')
      .click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
    cy.get('.euiColorPickerSwatch.euiColorPicker__swatchSelect').eq(2).click();
    cy.get('path[style*="rgb(211, 96, 134)"]').eq(0).should('exist');
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiColorPalettePicker__itemTitle').contains('Reds').click();
    cy.get('path[style*="rgb(241, 199, 168)"]').eq(0).should('exist');
  });

  it('Traverse between root and parent node in Tree Map chart', () => {
    renderDataConfigTreeMap();
    cy.get('.slicetext[data-unformatted*="Cleveland"]').click({ force: true });
    cy.get('text.slicetext').contains('100% of entry').should('exist');
    cy.get('.pathbar.cursor-pointer .slicetext[data-unformatted="US"]').click({ force: true });
    cy.wait(delay);
    cy.get('.pathbar.cursor-pointer .slicetext[data-unformatted=" "]').click({ force: true });
  });

  it('"No results found" message when user fails to select proper fields', () => {
    cy.wait(delay);
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiColorPalettePicker__itemTitle').eq(1).contains('Reds').click();
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(2).contains('Metrics');
    cy.get('.first-division .euiFormLabel.euiFormRow__label').contains('Value Field');
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
    cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Child Field');
    cy.get('.euiComboBoxOption__content').eq(0).click();
    cy.get('.first-division .euiFormControlLayoutClearButton').eq(0).click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
  });

  it('Verify multicolored option under color theme', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Color Theme').should('exist');
    cy.get('.euiSuperSelectControl').contains('Default').click();
    cy.get('.euiContextMenuItem__text .euiColorPalettePicker__item')
      .eq(1)
      .contains('Single color')
      .click();
    cy.get('.euiFieldText.euiColorPicker__input.euiFieldText--withIcon').click();
    cy.get('[aria-label="Select #54B399 as the color"]').should('exist').click();
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiContextMenuItem__text .euiColorPalettePicker__item')
      .eq(2)
      .contains('Multicolored')
      .click();
    cy.wait(delay);
    cy.get('.euiFormHelpText.euiFormRow__text').eq(1).contains('Child field').should('exist');
    cy.get('.euiFieldText.euiColorPicker__input.euiFieldText--withIcon').click();
    cy.get('[aria-label="Select #D36086 as the color"]').click();
    cy.get('.trace.treemap path[style*="rgb(211, 96, 134)"]').should('exist');
  });

  it('Parent field not available under color theme', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Color Theme').should('exist');
    cy.get('.euiSuperSelectControl').contains('Default').click();
    cy.get('.euiContextMenuItem__text .euiColorPalettePicker__item')
      .eq(1)
      .contains('Single color')
      .click();
    cy.get('.euiFieldText.euiColorPicker__input.euiFieldText--withIcon').click();
    cy.get('[aria-label="Select #54B399 as the color"]').should('exist').click();
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiContextMenuItem__text .euiColorPalettePicker__item')
      .eq(2)
      .contains('Multicolored')
      .click();
    cy.wait(delay);
    cy.get('.euiFormHelpText.euiFormRow__text').eq(1).contains('Child field').should('exist');
    cy.get('.euiFieldText.euiColorPicker__input.euiFieldText--withIcon').click();
    cy.get('[aria-label="Select #D36086 as the color"]').click();
    cy.get('.euiFormHelpText.euiFormRow__text').eq(1).contains('Parent field').should('not.exist');
    cy.get('.trace.treemap path[style*="rgb(211, 96, 134)"]').should('exist');
  });

  it('Render Tree Map chart and verify Data Configuration panel', () => {
    renderDataConfigTreeMap();
    cy.get('.trace.treemap').should('exist');
  });

  it('Renders Tree Map and Add Multiple Parent', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(1).contains('Dimensions');
    cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Child Field');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).click({ force: true });
    cy.get('.euiComboBoxOption__content').eq(2).click();
    renderAddParent();
    cy.get('.trace.treemap').should('exist');
  });

  it('Verify "No results found" message when user selects duplicate fields in Data Config panel', () => {
    cy.get('.euiResizablePanel.euiResizablePanel--middle').contains('Data Configurations');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(1).contains('Dimensions');
    cy.get('.first-division .euiFormLabel.euiFormRow__label').eq(0).contains('Child Field');
    cy.get('.first-division [data-test-subj="comboBoxInput"]').eq(0).click({ force: true });
    cy.get('.euiComboBoxOption__content').eq(2).click();
    renderAddParent();
    cy.get(' [data-test-subj="addParentButton"] .euiButton__text').contains('+ Add Parent').click();
    cy.get('.first-division .euiFormLabel.euiFormRow__label')
      .eq(4)
      .contains('Parent 4')
      .should('exist');
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
  });
});
