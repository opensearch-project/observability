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

import { delay, setTimeFilter } from '../utils/constants';

describe('Testing dashboard table empty state', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/dashboard');
    cy.wait(delay * 3);
  });

  it('Renders empty state', () => {
    cy.contains(' (0)').should('exist');
    cy.get('h2.euiTitle').contains('No matches').should('exist');
  });
});

describe('Testing dashboard table', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/dashboard');
    setTimeFilter();
  });

  it('Renders the dashboard table', () => {
    cy.contains(' (8)').should('exist');
    cy.contains('client_cancel_order').should('exist');
    cy.contains('292.95').should('exist');
    cy.contains('16.67%').should('exist');
  });

  it('Adds the percentile filters', () => {
    cy.contains(' >= 95 percentile').click({ force: true });
    cy.wait(delay);
    cy.contains(' >= 95 percentile').click({ force: true });
    cy.wait(delay);

    cy.contains('Latency percentile within trace group: >= 95th').should('exist');
    cy.contains(' (3)').should('exist');
    cy.contains('625.83').should('exist');

    cy.contains(' < 95 percentile').click({ force: true });
    cy.wait(delay);
    cy.contains(' < 95 percentile').click({ force: true });
    cy.wait(delay);

    cy.contains('Latency percentile within trace group: < 95th').should('exist');
    cy.contains(' (8)').should('exist');
    cy.contains('27.08').should('exist');
  });

  it('Opens latency trend popover', () => {
    cy.get('.euiButtonIcon[aria-label="Open popover"]').first().click();
    cy.get('text.ytitle[data-unformatted="Hourly latency (ms)"]').should('exist');
  });

  it('Redirects to traces table with filter', () => {
    cy.wait(delay * 5);
    cy.get('.euiLink').contains('7').click();
    cy.wait(delay);

    cy.get('h2.euiTitle').contains('Traces').should('exist');
    cy.contains(' (7)').should('exist');
    cy.contains('traceGroup: client_create_order').should('exist');

    cy.get('.euiSideNavItemButton__label').contains('Dashboard').click();
    cy.wait(delay);

    cy.get('.globalFilterItem-isDisabled').should('not.exist');
  });
});

describe('Testing plots', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/dashboard');
    setTimeFilter();
  });

  it('Renders plots', () => {
    cy.get('text.ytitle[data-unformatted="Error rate (%)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 22.22%"]').should('exist');
    cy.get('text.ytitle[data-unformatted="Throughput (n)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 36"]').should('exist');

    // index 0-7 are box plots in dashboard table, 8 is error rate plot
    cy.get('rect.nsewdrag').eq(8).click({ force: true });
    cy.wait(delay);
    cy.get('rect.nsewdrag').eq(8).click({ force: true });
    cy.wait(delay);
    cy.get('text.annotation-text[data-unformatted="Now: 7.41%"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 27"]').should('exist');
  });
});
