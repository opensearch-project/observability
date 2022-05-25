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
    cy.contains('No matches').should('exist');
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

  it('Has working breadcrumbs', () => {
    cy.get('.euiBreadcrumb').contains('Dashboard').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Dashboard').should('exist');
    cy.get('.euiBreadcrumb').contains('Trace analytics').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Dashboard').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
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
    // plotly scale texts are in attribute "data-unformatted"
    cy.get('text.ytitle[data-unformatted="Latency (ms)"]').should('exist');
    cy.get('text[data-unformatted="200"]').should('exist');
    cy.get('.vis-network').should('exist');

    cy.get('.euiButton__text[title="Error rate"]').click();
    cy.get('text.ytitle[data-unformatted="Error rate"]').should('exist');
    cy.get('text[data-unformatted="10%"]').should('exist');

    cy.get('.euiButton__text[title="Throughput"]').click();
    cy.get('text.ytitle[data-unformatted="Throughput"]').should('exist');
    cy.get('text[data-unformatted="50"]').should('exist');

    cy.get('input[type="search"]').eq(1).focus().type('payment{enter}');
    cy.wait(delay);
  });

  it('Renders plots', () => {
    cy.get('text.ytitle[data-unformatted="Error rate (%)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 14.81%"]').should('exist');
    cy.get('text.ytitle[data-unformatted="Throughput (n)"]').should('exist');
    cy.get('text.annotation-text[data-unformatted="Now: 108"]').should('exist');
  });
});

describe('Latency by trace group table', () =>{
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/home', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Verify columns in Latency by trace group table along with pagination functionality', () => {
    cy.get('span.panel-title').eq(0).should('exist');
    cy.wait(delay);
    cy.get('span[title*="Trace group name"]').should('exist');
    cy.get('span[title*="Latency variance (ms)"]').should('exist');
    cy.get('span[title*="Average latency (ms)"]').should('exist');
    cy.get('span[title*="24-hour latency trend"]').should('exist');
    cy.get('span[title*="Error rate"] .euiToolTipAnchor').should('exist');
    cy.get('span[title*="Traces"] .euiToolTipAnchor').should('exist');
    cy.get('[data-test-subj="tablePaginationPopoverButton"]').click();
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiContextMenu__icon').eq(0).should('exist').click();
    cy.get('[data-test-subj="pagination-button-next"]').should('exist').click();
    cy.get('button[data-test-subj="dashboard-table-trace-group-name-button"]').contains('mysql').should('exist');
  });

  it('Sorts the Latency by trace group table', () => {
    cy.get('span[title*="Trace group name"]').click();
    cy.get('[data-test-subj="dashboard-table-trace-group-name-button"]').eq(0).contains('/**').should('exist');
    cy.wait(delay);
  });

  it('Verify tooltips in Latency by trace group table', () => {
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(0).trigger('mouseover').blur({force:true});
    cy.contains('Traces of all requests that share a common API and operation at the start of distributed tracing instrumentation.').should('be.visible');//.click().trigger('mouseout', {'force':true});
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(1).should('be.visible').trigger('mouseover');
    cy.contains('Range of latencies for traces within a trace group in the selected time range.');
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(2).should('be.visible').trigger('mouseover');
    cy.contains('Average latency of traces within a trace group in the selected time range.');
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(3).should('be.visible').trigger('mouseover');
    cy.contains('24 hour time series view of hourly average, hourly percentile, and hourly range of latency for traces within a trace group.');
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(4).should('be.visible').trigger('mouseover');
    cy.contains('Error rate based on count of trace errors within a trace group in the selected time range.');
    cy.get('.euiIcon.euiIcon--small.euiIcon--subdued.euiIcon-isLoaded.eui-alignTop').eq(5).should('be.visible').trigger('mouseover');
    cy.contains('Count of traces with unique trace identifiers in the selected time range.');
  });

  it('Verify Search engine on Trace dashboard', () => {
    cy.get('.euiFieldSearch.euiFieldSearch--fullWidth').click().type('client_pay_order{enter}');
    cy.wait(delay);
    cy.get('.euiTableCellContent.euiTableCellContent--alignRight.euiTableCellContent--overflowingContent').contains('211.04').should('exist');
    cy.get('button[data-test-subj="dashboard-table-trace-group-name-button"]').click();
    cy.get('.euiBadge.euiBadge--hollow.euiBadge--iconRight.globalFilterItem').click();
    cy.get('.euiIcon.euiIcon--medium.euiContextMenu__arrow').click();
    cy.get('.euiContextMenuPanelTitle').contains('Edit filter').should('exist');
    cy.get('.euiButton.euiButton--primary.euiButton--fill').click();
    cy.get('.euiBadge.euiBadge--hollow.euiBadge--iconRight.globalFilterItem').click();
    cy.get('.euiContextMenuItem__text').eq(1).contains('Exclude results').click();
    cy.get('.euiTextColor.euiTextColor--danger').should('exist');
    cy.get('.euiBadge.euiBadge--hollow.euiBadge--iconRight.globalFilterItem').click();
    cy.get('.euiContextMenuItem__text').eq(1).contains('Include results').click();
    cy.get('.euiBadge.euiBadge--hollow.euiBadge--iconRight.globalFilterItem').click();
    cy.get('.euiContextMenuItem__text').eq(2).contains('Temporarily disable').click();
    cy.get('.euiBadge.euiBadge--iconRight.globalFilterItem.globalFilterItem-isDisabled').should('exist').click();
    cy.get('.euiContextMenuItem__text').eq(2).contains('Re-enable').click();
    cy.get('.euiBadge.euiBadge--hollow.euiBadge--iconRight.globalFilterItem').click();
    cy.get('.euiContextMenuItem__text').eq(3).contains('Delete').click();
  });
});
