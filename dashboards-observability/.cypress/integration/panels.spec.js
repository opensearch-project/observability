/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delay,
  TEST_PANEL,
  PPL_VISUALIZATIONS,
  PPL_VISUALIZATIONS_NAMES,
  PPL_FILTER,
} from '../utils/panel_constants';

describe('Adding sample data and visualization', () => {
  it('Adds sample flights data for visualization paragraph', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/home#/tutorial_directory/sampleData`);
    cy.get('div[data-test-subj="sampleDataSetCardflights"]')
      .contains(/(Add|View) data/)
      .click();
    cy.wait(delay * 3);
  });
});

describe('Creating visualizations', () => {
  beforeEach(() => {
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/`
    );
    cy.wait(delay * 3);
  });

  it('Create first visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').type(PPL_VISUALIZATIONS[0]);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    cy.get('.tab-title').contains('Visualizations').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay);
    cy.get('.euiFieldText').type(PPL_VISUALIZATIONS_NAMES[0]);
    cy.get('.euiPopoverFooter>.euiFlexGroup>:nth-child(2)').contains('Save').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Create second visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').type(PPL_VISUALIZATIONS[1]);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    cy.get('.tab-title').contains('Visualizations').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay);
    cy.get('.euiFieldText').type(PPL_VISUALIZATIONS_NAMES[1]);
    cy.get('.euiPopoverFooter>.euiFlexGroup>:nth-child(2)').contains('Save').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});

describe('Testing panels table', () => {
  beforeEach(() => {
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
    );
    cy.wait(delay * 3);
  });

  it('Displays error toast for invalid notebook name', () => {
    cy.get('.euiButton__text').contains('Create new panel').click();
    cy.wait(delay);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    cy.get('.euiToastHeader__title').contains('Invalid Operational Panel name').should('exist');
  });

  it('Creates a panel and redirects to the panel', () => {
    cy.get('.euiButton__text').contains('Create new panel').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_PANEL);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    cy.contains(TEST_PANEL).should('exist');
  });

  it('Duplicates and renames a panel', () => {
    cy.get('.euiCheckbox__input[title="Select this row"]').eq(0).click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Duplicate').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Duplicate').click();
    cy.wait(delay);

    cy.get('.euiCheckbox__input[title="Select this row"]').eq(1).click();
    cy.wait(delay);
    cy.get('.euiCheckbox__input[title="Select this row"]').eq(0).click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Rename').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(' (rename)');
    cy.get('.euiButton__text').contains('Rename').click();
    cy.wait(delay);
  });

  it('Searches existing panel', () => {
    cy.get('input.euiFieldSearch').type('this panel should not exist');
    cy.wait(delay);

    cy.get('.euiTableCellContent__text').contains('No items found').should('exist');

    cy.get('.euiFormControlLayoutClearButton').click();
    cy.wait(delay);
    cy.get('input.euiFieldSearch').type(TEST_PANEL + ' (copy) (rename)');
    cy.wait(delay);

    cy.get('a.euiLink')
      .contains(TEST_PANEL + ' (copy) (rename)')
      .should('exist');
  });

  it('Deletes panels', () => {
    cy.get('.euiCheckbox__input[data-test-subj="checkboxSelectAll"]').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete').click();
    cy.wait(delay);

    cy.get('button.euiButton--danger').should('be.disabled');

    cy.get('input.euiFieldText[placeholder="delete"]').type('delete');
    cy.get('button.euiButton--danger').should('not.be.disabled');
    cy.get('.euiButton__text').contains('Delete').click();

    cy.get('.euiTextAlign').contains('No Operational Panels').should('exist');

    // keep a panel for testing
    cy.get('.euiButton__text').contains('Create new panel').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_PANEL);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay * 2);
  });
});

describe('Testing a panel', () => {
  it('Change date filter of the panel', () => {
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
    );
    cy.get('.euiTableCellContent').contains(TEST_PANEL).click();
    cy.wait(delay * 3);
    cy.get('.euiButtonEmpty[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
    cy.get('.euiLink').contains('This year').click();
  });

    it('Add existing visualization #1', () => {
      cy.get('.euiButton__text').contains('Add Visualization').click();
      cy.wait(delay);
      cy.get('.euiContextMenuItem__text').contains('Select Existing Visualization').click();
      cy.wait(delay);
      cy.get('select').select(PPL_VISUALIZATIONS_NAMES[0]);
      cy.get('button[aria-label="refreshPreview"]').click();
      cy.wait(delay);
      cy.get('.plot-container').should('exist');
      cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
      cy.wait(delay);
      cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    });

    it('Add existing visualization #2', () => {
      cy.get('.euiButton__text').contains('Add Visualization').click();
      cy.wait(delay);
      cy.get('.euiContextMenuItem__text').contains('Select Existing Visualization').click();
      cy.wait(delay);
      cy.get('select').select(PPL_VISUALIZATIONS_NAMES[1]);
      cy.get('button[aria-label="refreshPreview"]').click();
      cy.wait(delay);
      cy.get('.plot-container').should('exist');
      cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
      cy.wait(delay);
      cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    });

  it('Add ppl filter to panel', () => {
    cy.get('.euiFieldText').invoke('attr', 'placeholder').should('contain', 'where');
    cy.get('input.euiFieldText').type(PPL_FILTER);
    cy.get('.euiButton__text').contains('Refresh').click();
    // cy.wait(delay);
    // cy.get('.euiContextMenuItem__text').contains('Select Existing Visualization').click();
    // cy.wait(delay);
    // cy.get('select').select(PPL_VISUALIZATIONS_NAMES[1]);
    // cy.get('button[aria-label="refreshPreview"]').click();
    // cy.wait(delay);
    // cy.get('.plot-container').should('exist');
    // cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
    // cy.wait(delay);
    // cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});
