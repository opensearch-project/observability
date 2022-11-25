/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { delay, SERVICE_NAME, SERVICE_SPAN_ID, setTimeFilter, verify_traces_spans_data_grid_cols_exists, count_table_row } from '../utils/constants';

describe('Testing services table empty state', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/services', {
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

describe('Testing services table', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/services', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Renders the services table', () => {
    cy.contains(' (8)').should('exist');
    cy.contains('analytics-service, frontend-client, recommendation').should('exist');
    cy.contains('186.95').should('exist');
    cy.contains('14.29%').should('exist');
  });

  it('Searches correctly', () => {
    cy.get('input[type="search"]').first().focus().type(`${SERVICE_NAME}{enter}`);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.contains(' (1)').should('exist');
    cy.contains('3.57%').should('exist');
  });

  it('Verify columns in Services table', () => {
    cy.get('.euiFlexItem.euiFlexItem--flexGrow10 .panel-title').contains('Services').should('exist');
    cy.get('.euiTableCellContent__text[title="Name"]').should('exist');
    cy.get('.euiTableCellContent__text[title="Average latency (ms)"]').should('exist');
    cy.get('.euiTableCellContent__text[title="Error rate"]').should('exist');
    cy.get('.euiTableCellContent__text[title="Throughput"]').should('exist');
    cy.get('.euiTableCellContent__text[title="No. of connected services"]').should('exist');
    cy.get('.euiTableCellContent__text[title="Connected services"]').should('exist');
    cy.get('.euiTableCellContent__text[title="Traces"]').should('exist');
    cy.get('[data-test-subj="tablePaginationPopoverButton"]').click();
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiContextMenu__icon').eq(0).should('exist').click();
    cy.get('[data-test-subj="pagination-button-next"]').should('exist').click();
    cy.get('.euiLink.euiLink--primary').contains('order').should('exist');
  })

  it('Navigate from Services to Traces', () => {
    cy.get('.euiTableCellContent__text[title="Traces"]').should('exist');
    cy.contains('74').should('exist').click();
    cy.get('.euiText.euiText--medium .panel-title').should('exist');
    cy.get('.euiBadge__childButton[data-test-subj="filterBadge"]').should('exist');
  })
});

describe('Testing service view empty state', () => {
  beforeEach(() => {
    // exception is thrown on loading EuiDataGrid in cypress only, ignore for now
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ResizeObserver loop'))
        return false;
    });
    cy.visit(`app/observability-dashboards#/trace_analytics/services/${SERVICE_NAME}`, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
  });

  it('Renders service view empty state', () => {
    cy.contains('frontend-client').should('exist');
    cy.get('.euiText').contains('0').should('exist');
    cy.get('.euiText').contains('-').should('exist');
  });
});

describe('Testing service view', () => {
  beforeEach(() => {
    // exception is thrown on loading EuiDataGrid in cypress only, ignore for now
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ResizeObserver loop'))
        return false;
    });
    cy.visit(`app/observability-dashboards#/trace_analytics/services/${SERVICE_NAME}`, {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter(undefined, false);
  });

  it('Renders service view', () => {
    cy.get('h2.euiTitle').contains(SERVICE_NAME).should('exist');
    cy.contains('178.6').should('exist');
    cy.contains('3.57%').should('exist');
    cy.get('div.vis-network').should('exist');
  });

  it('Has working breadcrumbs', () => {
    cy.get('.euiBreadcrumb').contains(SERVICE_NAME).click();
    cy.wait(delay);
    cy.get('h2.euiTitle').contains(SERVICE_NAME).should('exist');
    cy.get('.euiBreadcrumb').contains('Services').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Services').should('exist');
    cy.get('.euiBreadcrumb').contains('Trace analytics').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Dashboard').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Renders spans data grid, flyout, filters', () => {
    cy.get('.euiLink').contains(SERVICE_SPAN_ID).trigger('mouseover', { force: true });
    cy.get('button[data-datagrid-interactable="true"]').eq(0).click({ force: true });
    cy.wait(delay);
    cy.contains('Span detail').should('exist');
    cy.contains('Span attributes').should('exist');
    cy.get('.euiTextColor').contains('Span ID').trigger('mouseover');
    cy.get('.euiButtonIcon[aria-label="span-flyout-filter-icon"').click({ force: true });
    cy.wait(delay);
    cy.get('.euiBadge__text').contains('spanId: ').should('exist');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click({ force: true });
    cy.contains('Spans (1)').should('exist');
  });
});

describe('Testing Service map', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/services', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Render Service map', () => {
    cy.get('.euiText.euiText--medium .panel-title').contains('Service map');
    cy.get('[data-test-subj="latency"]').should('exist');
    cy.get('.ytitle').contains('Latency (ms)');
    cy.get('[data-text = "Error rate"]').click();
    cy.contains('60%');
    cy.get('[data-text = "Throughput"]').click();
    cy.contains('100');
    cy.get('.euiText.euiText--medium').contains('Focus on').should('exist');
    cy.get('[placeholder="Service name"]').focus().type('database{enter}');
  })
});

describe('Testing traces Spans table verify table headers functionality', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/services', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Renders the spans table and verify columns headers', () => {
    cy.contains(' (8)').should('exist');
    cy.contains('analytics-service, frontend-client, recommendation').should('exist');
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    cy.get('.panel-title').contains('Spans').should('exist');
    cy.get('.panel-title-count').contains('5').should('exist');
    verify_traces_spans_data_grid_cols_exists();
  });

  it('Toggle columns and verify the columns hidden text verify rows', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    cy.get('[data-test-subj = "dataGridColumnSelectorButton"]').click();
    cy.get('.euiSwitch.euiSwitch--compressed.euiSwitch--mini .euiSwitch__button').eq(3).click();
    cy.get('.euiButtonEmpty__text').eq(3).click().should('have.text', '2 columns hidden');
    count_table_row(5);
  });

  it('Show all button Spans table', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    cy.get('[data-test-subj = "dataGridColumnSelectorButton"]').click();
    cy.get('.euiPopoverFooter .euiFlexItem.euiFlexItem--flexGrowZero').eq(0).should('have.text', 'Show all').click();
    cy.get('.euiDataGrid__focusWrap').click().should('exist');
    verify_traces_spans_data_grid_cols_exists();
  });

  it('Hide all button Spans table', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    cy.get('[data-test-subj = "dataGridColumnSelectorButton"]').click();
    cy.get('.euiPopoverFooter .euiFlexItem.euiFlexItem--flexGrowZero').eq(1).should('have.text', 'Hide all').click();
    cy.get('.euiDataGrid__focusWrap').click().should('exist');
    cy.get('[data-test-subj="dataGridColumnSelectorPopover"]').should('have.text', '10 columns hidden');
  });

  it('Render Spans table and change data table Density', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    verify_traces_spans_data_grid_cols_exists();
    cy.get('.euiButtonEmpty__text').contains('Density').click();
    cy.get('.euiButtonContent__icon').eq(5).click();
    cy.get('.euiButtonContent__icon').eq(6).click();
    cy.get('.euiButtonContent__icon').eq(7).click();
  });

  it('Render Spans table and and click on sort', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    verify_traces_spans_data_grid_cols_exists();
    cy.get('[data-test-subj="dataGridColumnSortingButton"]').contains('Sort fields').should('exist').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-spanId').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-parentSpanId"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-traceId"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-traceGroup').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-durationInNanos"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-startTime"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-endTime').click();
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection-status.code"]').click();
    cy.get('.euiButtonEmpty__text').eq(5).contains('8 fields sorted').should('exist');
    cy.get('[data-test-subj="dataGridColumnSortingPopoverColumnSelection"]').click();
    cy.get('[data-test-subj="dataGridColumnSortingButton"]').should('exist').click();
  });
});


describe('Testing traces Spans table and verify columns functionality', () => {
  beforeEach(() => {
    cy.visit('app/observability-dashboards#/trace_analytics/services', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });
    setTimeFilter();
  });

  it('Renders the spans table and click on first span to verify details', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    verify_traces_spans_data_grid_cols_exists();
    cy.get('.euiLink--primary').eq(4).click();
    cy.get('[data-test-subj="spanDetailFlyout"] .euiTitle.euiTitle--medium').contains('Span detail').should('exist');
    cy.get('.euiFlyoutBody .panel-title').contains('Overview').should('exist');
    cy.get('.euiTextColor.euiTextColor--subdued').contains('Span ID').should('exist');
    cy.get('.euiDescriptionList__description .euiFlexItem').eq(0).contains('d03fecfa0f55b77c').should('exist');
    cy.get('.euiFlyoutBody__overflowContent .panel-title').contains('Span attributes').should('exist');
    cy.get('.euiDescriptionList__description .euiFlexItem').eq(0).trigger('mouseover').click();
    cy.get('[aria-label="span-flyout-filter-icon"]').click();
    cy.get('.euiFlyout__closeButton.euiFlyout__closeButton--inside').click();
    cy.get('.euiBadge__content .euiBadge__text').contains('spanId: d03fecfa0f55b77c').should('exist');
    count_table_row(1);
    cy.get('[aria-label="remove current filter"]').click();
    count_table_row(5);
  });

  it('Render Spans table and verify Column functionality', () => {
    cy.get('.euiLink.euiLink--primary').contains('authentication').should('exist').click();
    verify_traces_spans_data_grid_cols_exists();
    cy.get('.euiDataGridHeaderCell__content').contains('Span ID').click();
    cy.get('.euiListGroupItem__label').contains('Hide column').click();
    cy.get('.euiDataGridHeaderCell__content').contains('Trace ID').click();
    cy.get('.euiListGroupItem__label').contains('Sort A-Z').click();
    cy.get('.euiDataGridHeaderCell__content').contains('Trace group').click();
    cy.get('.euiListGroupItem__label').contains('Move left').click();
  });
});
