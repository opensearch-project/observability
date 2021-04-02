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

/// <reference types="cypress" />

import {
  delay,
  TEST_NOTEBOOK,
  MARKDOWN_TEXT,
  SAMPLE_URL,
  SQL_QUERY_TEXT,
  PPL_QUERY_TEXT
} from "../utils/constants";

describe('Adding sample data and visualization', () => {
  it('Adds sample flights data for visualization paragraph', () => {
    cy.visit(`${Cypress.env('kibana')}/app/home#/tutorial_directory/sampleData`);
    cy.get('div[data-test-subj="sampleDataSetCardflights"]').contains(/(Add|View) data/).click();
    cy.wait(delay * 3);
  });
})

describe('Testing notebooks table', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('kibana')}/app/opendistro-notebooks-kibana#`);
    cy.wait(delay * 3);
  });

  it('Displays error toast for invalid notebook name', () => {
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains(/^Create$/).click();
    cy.wait(delay);

    cy.get('.euiToastHeader__title').contains('Invalid notebook name').should('exist');
  });

  it('Creates a notebook and redirects to the notebook', () => {
    cy.get('.euiButton__text').contains('Create notebook').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_NOTEBOOK);
    cy.get('.euiButton__text').contains(/^Create$/).click();
    cy.wait(delay);

    cy.get('.euiPageHeaderSection').contains(TEST_NOTEBOOK).should('exist');
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

    cy.get('a.euiLink').contains(TEST_NOTEBOOK + ' (copy) (rename)').should('exist');
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
    cy.get('.euiButton__text').contains(/^Create$/).click();
    cy.wait(delay * 2);
  });
});

describe('Testing paragraphs', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('kibana')}/app/opendistro-notebooks-kibana#`);
    cy.get('.euiTableCellContent').contains(TEST_NOTEBOOK).click();
    cy.wait(delay * 3);
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

  it('Renders markdown', () => {
    cy.get('.euiTextArea').should('not.exist');
    cy.get(`a[href="${SAMPLE_URL}"]`).should('exist');
    cy.get('code').contains('POST').should('exist');
    cy.get('td').contains('b2').should('exist');
  });

  it('Shows output message', () => {
    cy.get('button[aria-label="Toggle show input"]').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Output reflects the latest input').should('exist');

    cy.get('pre.input').eq(0).click();
    cy.wait(delay);
    cy.get('.euiTextArea').type('Another text');
    cy.wait(delay);

    cy.get('.euiTextColor').contains('Output below is stale').should('exist');
    cy.get('div[style*="opacity: 0.5"]').should('exist');
  });

  it('Renders input only mode', () => {
    cy.get('.euiToggle__input[title="Input only"]').click();
    cy.wait(delay);

    cy.get('div.markdown-body').should('not.exist');
    cy.get('.euiLink').contains('View both').should('exist');
    cy.get('.euiLink').contains('View both').click();
    cy.wait(delay);

    cy.get('code').contains('POST').should('exist');
    cy.get('.euiLink').contains('View both').should('not.exist');
  });

  it('Renders output only mode', () => {
    cy.get('.euiToggle__input[title="Output only"]').click();
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

  it('Adds a visualization paragraph', () => {
    cy.get('.euiButton__text').contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Kibana visualization').click();
    cy.wait(delay);

    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);
    cy.get('.euiTextColor').contains('Visualization is required.').should('exist');

    cy.get('.euiButton__text').contains('Browse').click();
    cy.wait(delay);
    cy.get('.euiFieldSearch').focus().type('{uparrow}{uparrow}{enter}')
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Select').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);

    cy.get('div.visualization').should('exist');
  });

  it('Adds a SQL query paragraph', () => {
    cy.get('.euiButton__text').contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);

    cy.get('.euiTextArea').type(SQL_QUERY_TEXT);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);

    cy.get('.sc-Axmtr > div:nth-child(1) > div:nth-child(1)').contains('select * from kibana_sample_data_flights limit 20');

    cy.get('.euiDataGrid__overflow').should('exist');
  });

  it('Adds a PPL query paragraph', () => {
    cy.get('.euiButton__text').contains('Add paragraph').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Code block').click();
    cy.wait(delay);

    cy.get('.euiTextArea').type(PPL_QUERY_TEXT);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Run').click();
    cy.wait(delay);

    cy.get('.sc-Axmtr > div:nth-child(1) > div:nth-child(1)').contains('source=kibana_sample_data_flights');

    cy.get('.euiDataGrid__overflow').should('exist');
  });

  it('Clears outputs', () => {
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Clear all outputs').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Clear').click();
    cy.wait(delay);

    cy.get(`a[href="${SAMPLE_URL}"]`).should('not.exist');
  });

  it('Runs all paragraphs', () => {
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Run all paragraphs').click();
    cy.wait(delay);

    cy.get(`a[href="${SAMPLE_URL}"]`).should('exist');
  });

  it('Adds paragraph to top and bottom', () => {
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add paragraph to top').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Markdown').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add paragraph to bottom').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Markdown').click();
    cy.wait(delay);

    cy.get('.euiText').contains('[4] Kibana visualization').should('exist');
    cy.get('.euiText').contains('[5] Code block').should('exist');
  });

  it('Moves paragraphs', () => {
    cy.get('.euiButtonIcon[aria-label="Open paragraph menu"').eq(0).click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem-isDisabled').should('have.length.gte', 2);
    cy.get('.euiContextMenuItem__text').contains('Move to bottom').click();
    cy.wait(delay);

    cy.get('.euiText').contains('[3] Kibana visualization').should('exist');
  });

  it('Duplicates and renames the notebook', () => {
    cy.get('.euiButton__text').contains('Notebook actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Duplicate notebook').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Duplicate').click();
    cy.wait(delay * 3);

    cy.get('.euiToastHeader__title').contains('success').should('exist');

    cy.get('.euiButton__text').contains('Notebook actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Rename notebook').click();
    cy.wait(delay);
    cy.get('input.euiFieldText[data-autofocus="true"]').type(' (rename)');
    cy.wait(delay);
    cy.get('.euiButton__text').last().contains('Rename').click();
    cy.wait(delay);
    cy.reload();
    cy.wait(delay * 3);

    cy.get('.euiTitle').contains(TEST_NOTEBOOK + ' (copy) (rename)').should('exist');
    cy.get(`a[href="${SAMPLE_URL}"]`).should('have.length.gte', 2);
  });

  it('Deletes paragraphs', () => {
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete all paragraphs').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Delete').click();
    cy.wait(delay);

    cy.get('.euiTextAlign').contains('No paragraphs').should('exist');
  });

  it('Deletes notebook', () => {
    cy.get('.euiButton__text').contains('Notebook actions').click();
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
});
