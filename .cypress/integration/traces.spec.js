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

import { delay, setTimeFilter, TRACE_ID, SPAN_ID, NON_ERROR_CODE } from '../utils/constants';

describe('Testing traces table empty state', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/traces');
    cy.wait(delay * 3);
  });

  it('Renders empty state', () => {
    cy.contains(' (0)').should('exist');
    cy.get('h2.euiTitle').contains('No matches').should('exist');
  });
});

describe('Testing traces table', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/traces');
    setTimeFilter();
  });

  it('Renders the traces table', () => {
    cy.contains(' (36)').should('exist');
    cy.contains('11/10/2020 09:55:45').should('exist');
    cy.contains('10265fbdb2d1195fb4620...').should('exist');
    cy.contains('123.26').should('exist');
  });

  it('Searches correctly', () => {
    cy.get('input[type="search"]').focus().type(`${TRACE_ID}{enter}`);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    cy.contains(' (1)').should('exist');
    cy.contains('11/10/2020 09:56:24').should('exist');
  });

  it('Filters correctly', () => {
    cy.get('.euiButtonEmpty__text').contains('+ Add filter').click();
    cy.wait(delay);

    cy.contains('Select a field first').click({ force: true });
    cy.wait(delay);
    cy.get('.euiComboBoxOption__content').contains('status.code').click({ force: true });
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click({ force: true });
    cy.wait(delay);
    cy.get('.euiComboBoxOption__content').contains('is not').click({ force: true });
    cy.wait(delay);
    cy.get('input.euiFieldText[placeholder="Enter a value"]').focus().type(NON_ERROR_CODE);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay);

    cy.get('.euiTableCellContent').find('False').should('not.exist');
    cy.contains(' (8)').should('exist');

    cy.get('.euiBadge__childButton').contains('status.code: 0').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Include results').click();
    cy.wait(delay);

    cy.get('.euiTableCellContent').contains('True').should('not.exist');
    cy.contains(' (28)').should('exist');

    cy.get('.euiBadge__childButton').contains('status.code: 0').click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Temporarily disable').click();
    cy.wait(delay);

    cy.contains(' (36)').should('exist');
  });
});

describe('Testing trace view', () => {
  beforeEach(() => {
    cy.visit(`app/opendistro-trace-analytics#/traces/${TRACE_ID}`);
    cy.wait(delay * 3);
  });

  it('Renders the trace view', () => {
    cy.contains('42.11%').should('exist');
    cy.contains('36.03%').should('exist');
    cy.contains('11/10/2020 09:56:24').should('exist');
    cy.get('h2.euiTitle').contains(TRACE_ID).should('exist');

    cy.get('div.js-plotly-plot').should('have.length', 2);
    cy.get('text[data-unformatted="database <br>mysql.APM "]').should('exist');
    cy.contains(`"${SPAN_ID}"`).should('exist');
  });
});
