/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delay,
  TEST_NOTEBOOK,
  MARKDOWN_TEXT,
  SAMPLE_URL,
  SQL_QUERY_TEXT,
  PPL_QUERY_TEXT,
} from '../utils/constants';

import { SAMPLE_PANEL } from '../utils/panel_constants';

import { skipOn } from '@cypress/skip-test';

const moveToEventsHome = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/`);
  cy.wait(delay * 3);
};

const moveToPanelHome = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
  );
  cy.wait(delay * 3);
};

describe('Adding sample data and visualization', () => {
  it('Adds sample flights data for visualization paragraph', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/home#/tutorial_directory/sampleData`);
    cy.get('div[data-test-subj="sampleDataSetCardflights"]')
      .contains(/(Add|View) data/)
      .click();
  });

  it('Add sample observability data', () => {
    moveToPanelHome();
    cy.get('.euiButton__text').contains('Actions').trigger('mouseover').click();
    cy.wait(100);
    cy.get('.euiContextMenuItem__text').contains('Add samples').trigger('mouseover').click();
    cy.wait(100 * 3);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add samples')
      .should('exist');
    cy.wait(100);
    cy.get('.euiButton__text').contains('Yes').trigger('mouseover').click();
    cy.wait(100 * 5);
    cy.route2('POST', '/addSamplePanels').as('addSamples');
    cy.get('.euiTableCellContent').contains(SAMPLE_PANEL).should('exist');
  });
});

describe('Testing notebooks table', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/notebooks`);
  });

  it('Displays error toast for invalid notebook name', () => {
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delay);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    cy.get('.euiToastHeader__title').contains('Invalid notebook name').should('exist');
  });

  it('Creates a notebook and redirects to the notebook', () => {
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_NOTEBOOK);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    cy.contains(TEST_NOTEBOOK).should('exist');
  });

  it('Duplicates and renames a notebook', () => {
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

  it('Searches existing notebooks', () => {
    cy.get('input.euiFieldSearch').type('this notebook should not exist');
    cy.wait(delay);

    cy.get('.euiTableCellContent__text').contains('No items found').should('exist');

    cy.get('.euiFormControlLayoutClearButton').click();
    cy.wait(delay);
    cy.get('input.euiFieldSearch').type(TEST_NOTEBOOK + ' (copy) (rename)');
    cy.wait(delay);

    cy.get('a.euiLink')
      .contains(TEST_NOTEBOOK + ' (copy) (rename)')
      .should('exist');
  });

  it('Deletes notebooks', () => {
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

    cy.get('.euiTextAlign').contains('No notebooks').should('exist');

    // keep a notebook for testing
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_NOTEBOOK);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay * 2);
  });
});

describe('Test reporting integration if plugin installed', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/notebooks`);
    cy.get('.euiTableCellContent').contains(TEST_NOTEBOOK).click();
    cy.wait(delay * 3);
    cy.get('body').then(($body) => {
      skipOn($body.find('#reportingActionsButton').length <= 0);
    });
  });

  it('Create in-context PDF report from notebook', () => {
    cy.get('#reportingActionsButton').click();
    cy.wait(delay);
    cy.get('button.euiContextMenuItem:nth-child(1)').contains('Download PDF').click();
    cy.get('#downloadInProgressLoadingModal').should('exist');
  });

  it('Create in-context PNG report from notebook', () => {
    cy.get('#reportingActionsButton').click();
    cy.wait(delay);
    cy.get('button.euiContextMenuItem:nth-child(2)').contains('Download PNG').click();
    cy.get('#downloadInProgressLoadingModal').should('exist');
  });

  it('Create on-demand report definition from context menu', () => {
    cy.get('#reportingActionsButton').click();
    cy.wait(delay);
    cy.get('button.euiContextMenuItem:nth-child(3)').contains('Create report definition').click();
    cy.wait(delay);
    cy.location('pathname', { timeout: 60000 }).should('include', '/reports-dashboards');
    cy.wait(delay);
    cy.get('#reportSettingsName').type('Create notebook on-demand report');
    cy.get('#createNewReportDefinition').click({ force: true });
  });

  it('View reports homepage from context menu', () => {
    cy.get('#reportingActionsButton').click();
    cy.wait(delay);
    cy.get('button.euiContextMenuItem:nth-child(4)').contains('View reports').click();
    cy.wait(delay);
    cy.location('pathname', { timeout: 60000 }).should('include', '/reports-dashboards');
  });
});

describe('Testing paragraphs', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/notebooks`);
    cy.get('.euiTableCellContent').contains(TEST_NOTEBOOK).click();
  });

  it('Goes into a notebook and creates paragraphs', () => {
    cy.get('.euiButton__text').contains('Add').click();
    cy.wait(delay);

    cy.get('.euiTextArea').should('exist');

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Input is required.').should('exist');
    cy.get('.euiTextArea').clear();
    cy.get('.euiTextArea').type(MARKDOWN_TEXT);
    cy.wait(delay);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
  });

  it('Has working breadcrumbs', () => {
    cy.get('.euiBreadcrumb').contains(TEST_NOTEBOOK).click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(TEST_NOTEBOOK).should('exist');
    cy.get('.euiBreadcrumb').contains('Notebooks').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Notebooks').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Renders markdown', () => {
    cy.get('.euiTextArea').should('not.exist');
    cy.get(`a[href="${SAMPLE_URL}"]`).should('exist');
    cy.get('code').contains('POST').should('exist');
    cy.get('td').contains('b2').should('exist');
  });

  it('Shows output message', () => {
    cy.get('button[aria-label="Toggle show input"]').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Last successful run').should('exist');

    cy.get('pre.input').eq(0).click();
    cy.wait(delay);
    cy.get('.euiTextArea').type('Another text');
    cy.wait(delay);

    cy.get('.euiTextColor').contains('Last successful run').should('exist');
  });

  it('Renders input only mode', () => {
    cy.get('.euiButton__text[title="Input only"]').click();
    cy.wait(delay);

    cy.get('div.markdown-body').should('not.exist');
    cy.get('.euiLink').contains('View both').should('exist');
    cy.get('.euiLink').contains('View both').click();
    cy.wait(delay);

    cy.get('code').contains('POST').should('exist');
    cy.get('.euiLink').contains('View both').should('not.exist');
  });

  it('Renders output only mode', () => {
    cy.get('.euiButton__text[title="Output only"]').click();
    cy.wait(delay);

    cy.get('button[aria-label="Open paragraph menu"]').should('not.exist');
    cy.get('button[aria-label="Toggle show input"]').should('not.exist');
    cy.get('code').contains('POST').should('exist');
  });

  it('Duplicates paragraphs', () => {
    cy.get('.euiButtonIcon[aria-label="Open paragraph menu"]').eq(0).click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Duplicate').eq(0).click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);

    cy.get(`a[href="${SAMPLE_URL}"]`).should('have.length.gte', 2);
  });

  it('Adds a dashboards visualization paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Visualization').click();
    cy.wait(delay);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Visualization is required.').should('exist');

    cy.get('.euiButton__text').contains('Browse').click();
    cy.wait(delay);
    cy.get('.euiFieldSearch')
      .focus()
      .type('[Flights] Flight Count and Average Ticket Price{enter}');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Select').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('div.visualization').should('exist');
  });

  it('Adds a SQL query paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);

    cy.get('.euiTextArea').type(SQL_QUERY_TEXT);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay * 5);

    cy.get('b').contains('select * from opensearch_dashboards_sample_data_flights limit 20');

    cy.get('.euiDataGrid__overflow').should('exist');
  });

  it('Adds an observability visualization paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Visualization').click();
    cy.wait(delay);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Visualization is required.').should('exist');

    cy.get('.euiButton__text').contains('Browse').click();
    cy.wait(delay);
    cy.get('.euiFieldSearch').focus().type('[Logs] Count total requests by tags{enter}');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Select').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('h5').contains('[Logs] Count total requests by tags').should('exist');
  });

  it('Adds a PPL query paragraph', () => {
    cy.contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);

    cy.get('.euiTextArea').type(PPL_QUERY_TEXT);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay * 5);

    cy.get('b').contains('source=opensearch_dashboards_sample_data_flights');

    cy.get('.euiDataGrid__overflow').should('exist');
  });

  it('Clears outputs', () => {
    cy.wait(delay * 3); // need to wait for paragraphs to load first
    cy.get('[data-test-subj="notebook-paragraph-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Clear all outputs').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Clear').click();
    cy.wait(delay);

    cy.get(`a[href="${SAMPLE_URL}"]`).should('not.exist');
  });

  it('Runs all paragraphs', () => {
    cy.wait(delay * 3); // need to wait for paragraphs to load first
    cy.get('[data-test-subj="notebook-paragraph-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Run all paragraphs').click();
    cy.wait(delay);

    cy.get(`a[href="${SAMPLE_URL}"]`).should('exist');
  });

  it('Adds paragraph to top and bottom', () => {
    cy.wait(delay * 3); // need to wait for paragraphs to load first
    cy.get('[data-test-subj="notebook-paragraph-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add paragraph to top').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);
    cy.get('[data-test-subj="notebook-paragraph-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add paragraph to bottom').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);

    cy.get('.euiText').contains('[4] Visualization').should('exist');
    cy.get('.euiText').contains('[5] Code block').should('exist');
  });

  it('Moves paragraphs', () => {
    cy.get('.euiButtonIcon[aria-label="Open paragraph menu"').eq(0).click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem-isDisabled').should('have.length.gte', 2);
    cy.get('.euiContextMenuItem__text').contains('Move to bottom').click();
    cy.wait(delay);

    cy.get('.euiText').contains('[3] Visualization').should('exist');
  });

  it('Duplicates and renames the notebook', () => {
    cy.get('[data-test-subj="notebook-notebook-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Duplicate notebook').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Duplicate').click();
    cy.wait(delay * 3);

    cy.get('[data-test-subj="notebook-notebook-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Rename notebook').click();
    cy.wait(delay);
    cy.get('input.euiFieldText[data-autofocus="true"]').type(' (rename)');
    cy.wait(delay);
    cy.get('.euiButton__text').last().contains('Rename').click();
    cy.wait(delay);
    cy.reload();
    cy.wait(delay * 3);

    cy.get('.euiTitle')
      .contains(TEST_NOTEBOOK + ' (copy) (rename)')
      .should('exist');
    cy.get(`a[href="${SAMPLE_URL}"]`).should('have.length.gte', 2);
  });

  it('Deletes paragraphs', () => {
    cy.wait(delay * 3);
    cy.get('[data-test-subj="notebook-paragraph-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete all paragraphs').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Delete').click();
    cy.wait(delay);

    cy.get('.euiTextAlign').contains('No paragraphs').should('exist');
  });

  it('Deletes notebook', () => {
    cy.get('[data-test-subj="notebook-notebook-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete notebook').click();
    cy.wait(delay);

    cy.get('button.euiButton--danger').should('be.disabled');

    cy.get('input.euiFieldText[placeholder="delete"]').type('delete');
    cy.get('button.euiButton--danger').should('not.be.disabled');
    cy.get('.euiButton__text').contains('Delete').click();
    cy.wait(delay * 3);

    cy.get('.euiButton__text').contains('Create notebook').should('exist');
  });
  
  it('Cleans up test notebooks', () => {
    cy.get('[data-test-subj="notebook-notebook-actions-button"]').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete notebook').click();
    cy.wait(delay);

    cy.get('button.euiButton--danger').should('be.disabled');

    cy.get('input.euiFieldText[placeholder="delete"]').type('delete');
    cy.get('button.euiButton--danger').should('not.be.disabled');
    cy.get('.euiButton__text').contains('Delete').click();
    cy.wait(delay * 3);

    cy.get('.euiText').contains('No notebooks').should('exist');
  });
});
