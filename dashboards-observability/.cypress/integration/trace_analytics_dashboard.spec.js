/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { testDataSet, delay, setTimeFilter } from '../utils/constants';

describe('Dump test data', () => {
  it('Indexes test data', () => {
    const dumpDataSet = (mapping_url, data_url, index) => {
      cy.request({
        method: 'POST',
        failOnStatusCode: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: `${index}`,
          method: 'PUT',
        },
      });

      cy.request(mapping_url).then((response) => {
        cy.request({
          method: 'POST',
          form: true,
          url: 'api/console/proxy',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'osd-xsrf': true,
          },
          qs: {
            path: `${index}/_mapping`,
            method: 'POST',
          },
          body: response.body,
        });
      });

      cy.request(data_url).then((response) => {
        cy.request({
          method: 'POST',
          form: true,
          url: 'api/console/proxy',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'osd-xsrf': true,
          },
          qs: {
            path: `${index}/_bulk`,
            method: 'POST',
          },
          body: response.body,
        });
      });
    };

    testDataSet.forEach(({ mapping_url, data_url, index }) =>
      dumpDataSet(mapping_url, data_url, index)
    );
  });
});

describe('Testing dashboard table empty state', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/home', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    cy.wait(delay * 3);
  });

  it('Renders empty state', () => {
    cy.contains(' (0)').should('exist');
    cy.get('h2.euiTitle').contains('No matches').should('exist');
  });
});

describe('Testing dashboard table', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/home', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Renders the dashboard table', () => {
    cy.contains(' (10)').should('exist');
    cy.contains('client_cancel_order').should('exist');
    cy.contains('166.44').should('exist');
    cy.contains('7.14%').should('exist');
  });

  it('Adds the percentile filters', () => {
    cy.contains(' >= 95 percentile').click({ force: true });
    cy.wait(delay);
    cy.contains(' >= 95 percentile').click({ force: true });
    cy.wait(delay);

    cy.contains('Latency percentile within trace group: >= 95th').should('exist');
    cy.contains(' (7)').should('exist');
    cy.contains('318.69').should('exist');

    cy.contains(' < 95 percentile').click({ force: true });
    cy.wait(delay);
    cy.contains(' < 95 percentile').click({ force: true });
    cy.wait(delay);

    cy.contains('Latency percentile within trace group: < 95th').should('exist');
    cy.contains(' (8)').should('exist');
    cy.contains('383.05').should('exist');
  });

  it('Opens latency trend popover', () => {
    setTimeFilter(true);
    cy.get('.euiButtonIcon[aria-label="Open popover"]').first().click();
    cy.get('text.ytitle[data-unformatted="Hourly latency (ms)"]').should('exist');
  });

  it('Redirects to traces table with filter', () => {
    cy.wait(delay * 5);
    cy.get('.euiLink').contains('13').click();
    cy.wait(delay);

    cy.get('h2.euiTitle').contains('Traces').should('exist');
    cy.contains(' (13)').should('exist');
    cy.contains('client_create_order').should('exist');

    cy.get('.euiSideNavItemButton__label').contains('Trace analytics').click();
    cy.wait(delay);

    cy.contains('client_create_order').should('exist');
  });
});

describe('Testing plots', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/home', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Renders service map', () => {
    cy.get('text.ytitle[data-unformatted="Latency (ms)"]').should('exist');
    cy.get('text[data-unformatted="200"]').should('exist');
    cy.get('.vis-network').should('exist');

    cy.get('.euiToggle__input[title="Error rate"]').click();
    cy.get('text.ytitle[data-unformatted="Error rate"]').should('exist');
    cy.get('text[data-unformatted="10%"]').should('exist');

    cy.get('.euiToggle__input[title="Throughput"]').click();
    cy.get('text.ytitle[data-unformatted="Throughput"]').should('exist');
    cy.get('text[data-unformatted="60"]').should('exist');

    cy.get('input[type="search"]').eq(1).focus().type('payment{enter}');
    cy.wait(delay);
  });

  it('Renders plots', () => {
    cy.get('text.ytitle[data-unformatted="Error rate (%)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 0%"]').should('exist');
    cy.get('text.ytitle[data-unformatted="Throughput (n)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 62"]').should('exist');
  });
});
