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
  NEW_VISUALIZATION_NAME,
  PPL_FILTER,
  SAMPLE_PANEL,
  SAMPLE_VISUALIZATIONS_NAMES,
} from '../utils/panel_constants';

import { supressResizeObserverIssue } from '../utils/constants';

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

const moveToTestPanel = () => {
  moveToPanelHome();
  cy.get('.euiTableCellContent').contains(TEST_PANEL).click();
  cy.wait(delay * 3);
  cy.get('h1').contains(TEST_PANEL).should('exist');
  cy.wait(delay);
};

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
    moveToEventsHome();
  });

  it('Create first visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').type(PPL_VISUALIZATIONS[0]);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(PPL_VISUALIZATIONS_NAMES[0]);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Create second visualization in event analytics', () => {
    cy.get('[id^=autocomplete-textarea]').type(PPL_VISUALIZATIONS[1]);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(PPL_VISUALIZATIONS_NAMES[1]);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});

describe('Testing panels table', () => {
  beforeEach(() => {
    moveToPanelHome();
  });

  it('Displays error toast for invalid panel name', () => {
    cy.get('.euiButton__text').contains('Create panel').click();
    cy.wait(delay);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    cy.get('.euiToastHeader__title').contains('Invalid Operational Panel name').should('exist');
  });

  it('Creates a panel and redirects to the panel', () => {
    cy.get('.euiButton__text').contains('Create panel').click();
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
    cy.get('.euiButton__text').contains('Create panel').click();
    cy.wait(delay);
    cy.get('input.euiFieldText').type(TEST_PANEL);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay * 2);
  });
});

describe('Testing a panel', () => {
  it('Move to test panel', () => {
    moveToTestPanel();
  });

  it('Opens visualization flyout from empty panel', () => {
    cy.get('.euiButton').eq(4).contains('Add visualization').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Select existing visualization').click();
    cy.wait(delay);
    cy.get('.euiButton').contains('Cancel').click();
    cy.get('.euiButton').eq(2).contains('Add visualization').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Select existing visualization').click();
    cy.wait(delay);
    cy.get('.euiButton').contains('Cancel').click();
    cy.get('.euiButton').contains('Add visualization').first().click();
    cy.get('.euiContextMenuItem__text').contains('Create new visualization').click();
    cy.wait(delay);
    cy.get('.euiBreadcrumb').contains('Explorer').should('exist');
    cy.get('.euiCallOut').contains('No results match your search criteria').should('exist');
  });

  it('Redirects to correct page on breadcrumb click', () => {
    moveToTestPanel();
    cy.get('.euiBreadcrumb').contains(TEST_PANEL).click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(TEST_PANEL).should('exist');
    cy.get('.euiBreadcrumb').contains('Operational panels').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Operational panels').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Duplicate the open panel', () => {
    moveToTestPanel();
    cy.get('.euiButton__text').contains('Panel actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Duplicate panel').click();
    cy.wait(delay);
    cy.get(`input.euiFieldText[value="${TEST_PANEL} (copy)"]`).should('exist');
    cy.get('.euiButton__text').contains('Duplicate').click();
    cy.wait(delay * 3);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    cy.get('h1')
      .contains(TEST_PANEL + ' (copy)')
      .should('exist');
    cy.wait(delay);
  });

  it('Rename the open panel', () => {
    cy.get('.euiButton__text').contains('Panel actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Rename panel').click();
    cy.wait(delay);
    cy.get(`input.euiFieldText[value="${TEST_PANEL} (copy)"]`)
      .focus()
      .clear()
      .type('Renamed Panel');
    cy.get('.euiButton__text').contains('Rename').click();
    cy.wait(delay * 3);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    cy.get('h1').contains('Renamed Panel').should('exist');
    cy.wait(delay);
  });

  it('Change date filter of the panel', () => {
    moveToTestPanel();
    cy.get('.euiButtonEmpty[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
    cy.get('.euiLink').contains('This year').click();
    cy.wait(delay * 2);
    cy.get('.euiSuperDatePicker__prettyFormat[data-test-subj="superDatePickerShowDatesButton"]')
      .contains('This year')
      .should('exist');
    cy.wait(delay);
  });

  it('Add existing visualization #1', () => {
    cy.get('.euiButton__text').contains('Add visualization').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Select existing visualization').click();
    cy.wait(delay);
    cy.get('select').select(PPL_VISUALIZATIONS_NAMES[0]);
    cy.get('button[aria-label="refreshPreview"]').click();
    cy.wait(delay * 2);
    cy.get('.plot-container').should('exist');
    cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Add existing visualization #2', () => {
    cy.get('.euiButton__text').contains('Add visualization').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Select existing visualization').click();
    cy.wait(delay);
    cy.get('select').select(PPL_VISUALIZATIONS_NAMES[1]);
    cy.get('button[aria-label="refreshPreview"]').click();
    cy.wait(delay * 2);
    cy.get('.plot-container').should('exist');
    cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Add ppl filter to panel', () => {
    cy.get('[data-test-subj="searchAutocompleteTextArea"]')
      .click()
      .wait(1500)
      .type("where Carrier = 'OpenSearch-Air'| where Dest = 'Munich Airport'", {delay: 500});
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay * 3);
    cy.get('.xtick').should('contain', 'OpenSearch-Air');
    cy.get('.xtick').should('contain', 'Munich Airport');
    cy.get('.xtick').contains('Zurich Airport').should('not.exist');
    cy.get('.xtick').contains('BeatsWest').should('not.exist');
    cy.get('.xtick').contains('Logstash Airways').should('not.exist');
    cy.get('.xtick').contains('OpenSearch Dashboards Airlines').should('not.exist');
    cy.wait(delay);
  });

  it('Drag and drop a visualization', () => {
    cy.get('.euiButton__text').contains('Edit').click();
    cy.wait(delay);
    cy.get('h5')
      .contains(PPL_VISUALIZATIONS_NAMES[1])
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 1100, clientY: 0 })
      .trigger('mouseup', { force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay * 3);
    cy.get('div.react-grid-layout>div')
      .eq(1)
      .invoke('attr', 'style')
      .should('match', new RegExp('(.*)transform: translate((.*)10px)(.*)'));
    cy.wait(delay);
  });

  it('Resize a visualization', () => {
    cy.get('.euiButton__text').contains('Edit').click();
    cy.wait(delay);
    cy.get('.react-resizable-handle')
      .eq(1)
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 2000, clientY: 800 })
      .trigger('mouseup', { force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay * 3);
    cy.get('div.react-grid-layout>div').eq(1).invoke('height').should('match', new RegExp('470'));
    cy.wait(delay);
  });

  it('Delete a visualization', () => {
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[1]).should('exist');
    cy.get('.euiButton__text').contains('Edit').click();
    cy.wait(delay);
    cy.get('.visualization-action-button').eq(1).click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Save').click();
    cy.wait(delay * 3);
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[1]).should('not.exist');
    cy.wait(delay);
  });

  it('Duplicate a visualization', () => {
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.get('button[aria-label="actionMenuButton"]').click();
    cy.get('.euiContextMenu__itemLayout > .euiContextMenuItem__text').contains('Duplicate').click();
    cy.wait(delay * 2);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    cy.wait(delay);
    cy.get('h5').eq(0).contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.get('h5').eq(1).contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.wait(delay);
  });

  it('Replace a visualization', () => {
    cy.get('.visualization-action-button').eq(1).click();
    cy.get('.euiContextMenu__itemLayout > .euiContextMenuItem__text').contains('Replace').click();
    cy.get('select').select(PPL_VISUALIZATIONS_NAMES[1]);
    cy.get('button[aria-label="refreshPreview"]').click();
    cy.wait(delay * 3);
    cy.get('.plot-container').should('exist');
    cy.get('.euiButton__text').contains(new RegExp('^Add$', 'g')).click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    cy.wait(delay);
    cy.get('h5').eq(0).contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.get('h5').eq(1).contains(PPL_VISUALIZATIONS_NAMES[1]).should('exist');
    cy.wait(delay);
  });

  it('Create new visualization and add to panel', () => {
    cy.get('.euiButton__text').contains('Add visualization').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Create new visualization').click();
    cy.wait(delay * 3);
    cy.url().should('match', new RegExp('(.*)#/event_analytics/explorer'));
    cy.get('[id^=autocomplete-textarea]').type(PPL_VISUALIZATIONS[2]);
    cy.get('.euiButton__text').contains('Refresh').click();

    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveComboBox"]').type(TEST_PANEL);
    cy.get(`input[value="${TEST_PANEL}"]`).click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(PPL_VISUALIZATIONS_NAMES[2]);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    moveToTestPanel();
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[1]).should('exist');
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[2]).should('exist');
  });

  it('Move to test panel and check visualization edit button', () => {
    moveToTestPanel();
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[0]).should('exist');
    cy.get('button[aria-label="actionMenuButton"]').eq(0).click();
    supressResizeObserverIssue();
    cy.get('.euiContextMenu__itemLayout > .euiContextMenuItem__text').contains('Edit').click();
    cy.wait(delay * 3);
    cy.url().should('match', new RegExp('(.*)#/event_analytics/explorer'));
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]')
      .focus()
      .clear()
      .type(NEW_VISUALIZATION_NAME);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
    moveToTestPanel();
    cy.get('h5').contains(NEW_VISUALIZATION_NAME).should('exist');
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[1]).should('exist');
    cy.get('h5').contains(PPL_VISUALIZATIONS_NAMES[2]).should('exist');
  });
});

describe('Add samples and clean up all test data', () => {
  it('Add sample data', () => {
    moveToPanelHome();
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add samples').click();
    cy.wait(delay);
    cy.get('.euiModalHeader__title[data-test-subj="confirmModalTitleText"]')
      .contains('Add samples')
      .should('exist');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Yes').click();
    cy.wait(delay * 5);
    cy.get('.euiTableCellContent').contains(SAMPLE_PANEL).should('exist');
    cy.wait(delay);
  });

  it('Validate sample data', () => {
    moveToPanelHome();
    cy.get('.euiTableCellContent').contains(SAMPLE_PANEL).click();
    cy.wait(delay * 3);
    cy.get('h1').contains(SAMPLE_PANEL).should('exist');
    cy.wait(delay);
    SAMPLE_VISUALIZATIONS_NAMES.forEach((vizName) =>
      cy.get('h5').contains(vizName).should('exist')
    );
    cy.wait(delay);
  });

  it('Delete visualizations from event analytics', () => {
    moveToEventsHome();
    cy.get('[data-test-subj="tablePaginationPopoverButton"]').click();
    cy.get('.euiContextMenuItem__text').contains('50 rows').click();
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
    cy.wait(delay);
    cy.get('.euiTextAlign').contains('No Queries or Visualizations').should('exist');
  });

  it('Deletes test panel', () => {
    moveToPanelHome();
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
  });
});
