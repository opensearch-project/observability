/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />
import {
  delay,
  TEST_QUERIES,
  querySearch,
  landOnEventVisualizations,
  saveVisualizationAndVerify,
  deleteVisualization,
} from '../../utils/event_constants';

const renderLogsView = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[8].query, TEST_QUERIES[8].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Logs view')
    .type('{enter}');
};

const renderLogsViewChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[2].query, TEST_QUERIES[2].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Logs view')
    .type('{enter}');
};

const fieldName = 'host';

describe('Render Logs view and verify default behavior', () => {
  beforeEach(() => {
    renderLogsView();
  });

  it('Render Logs view and verify the default data', () => {
    cy.get('.logs-view-container').should('exist');
  });

  it('Render Logs view and verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Columns');
    cy.get('.euiFormLabel.euiFormRow__label').contains('Field');
    cy.get('.euiButton.euiButton--primary.euiButton--fullWidth.euiButton-isDisabled').should(
      'be.disabled'
    );
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').should('be.disabled');
  });

  it('Render Logs view and verify Style section for Logs view', () => {
    cy.get('.vis-config-tabs .euiTab__content').contains('Style').should('exist');
    cy.get('.euiAccordion__triggerWrapper').contains('Panel options').should('exist');
    cy.get('#configPanel__panelOptions .euiFormRow__labelWrapper')
      .contains('Title')
      .should('exist');
    cy.get('#configPanel__panelOptions .euiFormRow__labelWrapper')
      .contains('Description')
      .should('exist');
  });

  it('Table view should be enabled for Logs view', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });

  it('Verify Style section for Logs view', () => {
    cy.get('#data-panel').contains('Style').should('exist');
    cy.get('.euiAccordion__button').contains('Panel options').should('exist');
    cy.get('#configPanel__panelOptions').contains('Title').should('exist');
    cy.get('.euiFormHelpText.euiFormRow__text').contains('Name your visualization').should('exist');
    cy.get('#configPanel__panelOptions').contains('Description').should('exist');
  });

  it('Add and Remove toggle buttons for fields section', () => {
    cy.get('#available_fields').contains('Available Fields').should('exist');
    cy.get('[aria-label="Add agent to table"]').should('be.disabled');
    cy.get('#selected_fields').contains('Query fields').should('exist');
    cy.get('[aria-label="Remove clientip from table"]').should('be.disabled');
  });
});

describe('Save and Delete Visualization', () => {
  beforeEach(() => {
    renderLogsView();
  });

  it('Render Logs view, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Render Logs view with no stats section in the query', () => {
  beforeEach(() => {
    renderLogsViewChart();
  });

  it('Disabled Table view toogle button', () => {
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"]').should('be.disabled');
  });

  it('Save toast message', () => {
    const vis_name_sub_string = Math.floor(Math.random() * 100);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveComboBox"]').click();
    cy.get('.euiComboBoxOptionsList__rowWrap .euiFilterSelectItem').eq(0).click();
    cy.get(
      '.euiPopover__panel .euiFormControlLayoutIcons [data-test-subj="comboBoxToggleListButton"]'
    )
      .eq(0)
      .click();
    cy.get('.euiPopover__panel input')
      .eq(1)
      .type(`Test visualization` + vis_name_sub_string);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.get('[data-test-subj="euiToastHeader"]')
      .contains('There is no query or(and) visualization to save')
      .should('exist');
  });

  it('Verify Logs view details when PPL query does not have stats section ', () => {
    cy.get('[data-test-subj="docTable"]').should('exist');
    cy.get('.osdDocTableHeader').contains('Time').should('exist');
    cy.get('.osdDocTableHeader').contains('_source').should('exist');
  });

  it('Add and Remove toggle buttons for fields section should be enabled', () => {
    //Add field
    cy.get('[data-test-subj="fieldToggle-agent"]').click();
    cy.get('[data-test-subj="field-agent"]').should('exist');
    //Remove field
    cy.get('[data-test-subj="fieldToggle-agent"]').click();
    cy.get('[aria-labelledby="selected_fields"] [data-test-subj="field-agent-showDetails"]').should(
      'not.exist'
    );
  });

  it('Search engine for fields under Visualizations', () => {
    cy.get('[data-test-subj="eventExplorer__sidebarSearch"]').should('exist').type(fieldName);
    cy.get('[data-test-subj="fieldToggle-host"]').click();
    cy.get('[data-test-subj="fieldList-selected"]').should('exist');
  });

  it('View surrounding events button enabled', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('.euiButton__text').eq(4).should('not.be.disabled');
  });
});

describe('Event Details overlay', () => {
  beforeEach(() => {
    renderLogsView();
  });

  it('Verify Event Details overaly should get opened after clicking on details toggle button', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
  });

  it('Options in Event Details overlay', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('.euiTabs .euiTab__content').contains('Table');
    cy.get('.table.table-condensed.osdDocViewerTable').should('exist');
    cy.get('.euiTabs .euiTab__content').contains('JSON').click();
    cy.get('.euiCodeBlock__code.json').should('exist');
    cy.get('.euiTabs .euiTab__content').contains('Traces').click();
    cy.get('.euiCallOutHeader__title').contains('No Trace Id found in the event.').should('exist');
    cy.get('.euiLink.euiLink--primary').contains('Trace Analytics').click();
    cy.get('#trace-analytics').contains('Trace Analytics').should('exist');
    cy.get('.euiLink.euiLink--primary').contains('Log Correlation').click();
    cy.get('#log-correlation').contains('Log Correlation').should('exist');
  });

  it('View surrounding events button disabled', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('.euiButton.euiButton--primary.euiButton-isDisabled.header-button')
      .contains('View surrounding events')
      .should('be.disabled');
  });

  it('Event Details overlay resizable and "X" buttons', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('[title="Resize"]').click();
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').should('exist').click();
  });

  it('Table details on Event Details overlay', () => {
    cy.get('.euiIcon.euiIcon--medium.euiIcon--inherit.euiButtonIcon__icon')
      .eq(2)
      .click({ force: true });
    cy.get('#eventsDocFyout').contains('Event Details').should('exist');
    cy.get('[data-test-subj="docTable"]').should('exist');
  });
});

describe('Data Configuration panel when no stats in the query', () => {
  beforeEach(() => {
    renderLogsViewChart();
  });

  it('Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Columns').should('exist');
    cy.get('.euiButton__text').eq(2).contains('Add').should('not.be.disabled');
    cy.get('.euiButton__text').eq(3).contains('Update Chart').should('not.be.disabled');
  });

  it('Add button in Data Configuration panel', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Columns').should('exist');
    cy.get('.euiButton__text').eq(2).contains('Add').should('not.be.disabled').click();
    cy.get('.euiFormLabel.euiFormRow__label').contains('Field');
    cy.get('.euiIcon.euiIcon--medium.euiIcon--danger').should('exist');
    cy.get('[data-test-subj="comboBoxToggleListButton"]').eq(0).click();
    cy.get('.euiFlexItem.euiFilterSelectItem__content').eq(1).click();
    cy.get('.euiButton__text').contains('Update Chart').should('not.be.disabled').click();
    cy.get('[data-test-subj="docTable"]').should('exist');
  });
});
