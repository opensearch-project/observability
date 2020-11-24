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

import { delay, setTimeFilter, TRACE_ID, SPAN_ID } from '../utils/constants';

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
