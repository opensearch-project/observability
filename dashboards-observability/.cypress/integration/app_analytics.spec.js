/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import {
  delay,
  moveToHomePage,
  moveToCreatePage,
  moveToApplication,
  moveToEditPage,
  changeTimeTo24,
  expectMessageOnHover,
  baseQuery,
  nameOne,
  nameTwo,
  description,
  service_one,
  service_two,
  trace_one,
  trace_two,
  trace_three,
  query_one,
  query_two,
  visOneName,
  visTwoName,
  composition,
  newName,
  TYPING_DELAY
} from '../utils/app_constants';
import { supressResizeObserverIssue } from '../utils/constants';

describe('Creating application', () => {
  beforeEach(() => {
    moveToCreatePage();
  });

  it('Disables create button if missing fields', () => {
    expectMessageOnHover('Name is required.');
    cy.get('[data-test-subj="nameFormRow"]').type(nameOne);
    expectMessageOnHover('Provide at least one log source, service, entity or trace group.');
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(baseQuery, {delay: TYPING_DELAY});
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').clear();
    expectMessageOnHover('Provide at least one log source, service, entity or trace group.');
    cy.get('.euiAccordion').contains('Services & entities').trigger('mouseover').click();;
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').trigger('mouseover').click();
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(baseQuery, {delay: TYPING_DELAY});
    cy.get('.euiAccordion').contains('Trace groups').trigger('mouseover').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').scrollIntoView().type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click')
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
  });

  it('Suggests correct autocompletion', () => {
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-List').find('.aa-Item').should('have.length', 1);
    cy.get('.aa-Item').contains('source').should('exist');
    cy.focused().type('{enter}');
    cy.get('.aa-List').find('.aa-Item').should('have.length', 1);
    cy.get('.aa-Item').contains('=').should('exist');
    cy.focused().type('{enter}');
    cy.focused().type('opensearch');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-Item').contains('opensearch_dashboards_sample_data_flights').click();
    cy.focused().clear();
    cy.get('.aa-List').find('.aa-Item').should('have.length', 1);
    cy.focused().type('{enter}');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source ');
    cy.focused().type('{enter}');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source = ');
    cy.focused().type('opensearch');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-Item').contains('opensearch_dashboards_sample_data_flights').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source = opensearch_dashboards_sample_data_flights ');
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source = opensearch_dashboards_sample_data_flights, ');
    cy.focused().type('opensearch');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-Item').contains('opensearch_dashboards_sample_data_logs').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source = opensearch_dashboards_sample_data_flights,opensearch_dashboards_sample_data_logs ');
  });

  it('Creates an application and redirects to application', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(nameOne);
    cy.get('[data-test-subj="descriptionFormRow"]').type('This application is for testing.');
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]')
      .trigger('mouseover')
      .click()
      .wait(3000)
      .focus()
      .type(baseQuery, {
        delay: TYPING_DELAY,
      });
    cy.get('.euiAccordion').contains('Services & entities').trigger('mouseover').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion').contains('Trace groups').trigger('mouseover').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').scrollIntoView().type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('.euiButton').contains('Create').click();
    cy.wait(delay*3);
    cy.get('.euiTitle').contains(nameOne).should('exist');
    cy.get('.euiTab').contains('Panel').click();
    cy.get('.euiText').contains('Start by adding your first visualization').should('exist');
  });

  it('Hides application panels in Operational Panels', () => {
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
    );
    cy.wait(delay*4);
    if (cy.get('.euiButton').contains('Create panel').length < 2) {
      cy.get('input.euiFieldSearch').type(`${nameOne}'s Panel`, {delay: TYPING_DELAY});
      cy.wait(delay);
      cy.get('.euiTableCellContent__text').contains('No items found').should('exist');
      cy.get('.euiFormControlLayoutClearButton').click();
      cy.wait(delay);
    }
  });

  it('Redirects to home page on cancel', () => {
    cy.get('.euiButton').contains('Cancel').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Applications').should('exist');
  });

  it('Saves current input on reload', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(nameOne);
    cy.get('[data-test-subj="descriptionFormRow"]').type(description);
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy
      .get('[data-test-subj="searchAutocompleteTextArea"]')
      .focus()
      .type(baseQuery, {delay: TYPING_DELAY});
    cy.get('.euiAccordion').contains('Services & entities').trigger('mouseover').click();
    cy.wait(delay);
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').trigger('mouseover').click();
    cy.wait(delay);
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion').contains('Trace groups').trigger('mouseover').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').scrollIntoView().type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.reload();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFormRow"]').find('.euiFieldText').should('contain.value', nameOne);
    cy.get('[data-test-subj="descriptionFormRow"]').find('.euiFieldText').should('contain.value', description);
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain.value', baseQuery);
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiBadge').contains('2').should('exist');
  });

  it('Shows clear modals before clearing', () => {
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('.euiButton-isDisabled').contains('Clear').should('exist');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(baseQuery, {delay: TYPING_DELAY});
    cy.get('.euiButton').contains('Clear').click();
    cy.get('.euiButton--danger').contains('Clear').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain.value', '');
    cy.get('.euiAccordion').contains('Services & entities').trigger('mouseover').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').trigger('mouseover').click();
    cy.wait(delay);
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion-isOpen').within(() => {
      cy.get('.euiButton').contains('Clear all').click();
    })
    cy.get('.euiButton--danger').contains('Clear all').click();
    cy.get('.euiBadge').contains('1').should('not.exist');
    cy.get('.euiBadge').contains('0').should('exist');
    cy.get('.euiAccordion').contains('Services & entities').trigger('mouseover').click();
    cy.get('.euiAccordion').contains('Trace groups').trigger('mouseover').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').scrollIntoView().type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiAccordion-isOpen').within(() => {
      cy.get('.euiButton').contains('Clear all').click();
    })
    cy.get('.euiButton--danger').contains('Clear all').click();
    cy.get('.euiBadge').contains('2').should('not.exist');
    cy.get('.euiBadge').contains('0').should('exist');
  });
});

describe('Viewing application', () => {
  before(() => {
    moveToApplication(nameOne);
  });

  it('Has working breadcrumbs', () => {
    cy.get('.euiBreadcrumb').contains('Cypress').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(nameOne).should('exist');
    cy.get('.euiBreadcrumb').contains('Application analytics').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Applications').should('exist');
    cy.get('.euiBreadcrumb').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });

  it('Shares time range among tabs', () => {
    moveToApplication(nameOne);
    changeTimeTo24('months');
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Services').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Traces & Spans').click();
    supressResizeObserverIssue();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Log Events').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Panel').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
  });

  it('Shows latency variance in dashboards table', () => {
    moveToApplication(nameOne);
    changeTimeTo24('months');
    cy.get('.euiBasicTable').first().within(($table) => {
      cy.get('.plot-container').should('have.length.at.least', 1);
    })
  });

  it('Saves time range for each application', () => {
    moveToCreatePage();
    cy.get('[data-test-subj="nameFormRow"]').type(nameTwo);
    cy.get('.euiAccordion').contains('Log source').trigger('mouseover').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(baseQuery, {delay: TYPING_DELAY});
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('.euiButton').contains('Create').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(nameTwo).should('exist');
    changeTimeTo24('weeks');
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 weeks');
    cy.get('.euiBreadcrumb').contains('Application analytics').click();
    cy.wait(delay);
    cy.get('.euiLink').contains(nameOne).click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(nameOne).should('exist');
    changeTimeTo24('months');
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiBreadcrumb').contains('Application analytics').click();
    cy.wait(delay);
    cy.get('.euiLink').contains(nameTwo).click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(nameTwo).should('exist');
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 weeks');
  });

  it('Adds filter when Trace group name is clicked', () => {
    moveToApplication(nameOne);
    cy.get('.euiTab').contains('Overview').click();
    cy.wait(delay);
    cy.get('.euiLink').contains('client_create_order').click();
    cy.get('.euiTableRow').should('have.length', 1);
    cy.get('.euiPopover').contains('traceGroup: client_create_order').should('exist');
    cy.get('[aria-label="Remove filter"]').click();
    cy.get('.euiPopover').contains('traceGroup: client_create_order').should('not.exist');
  });

  it('Opens service detail flyout when Service Name is clicked', () => {
    cy.get('.euiTab').contains('Services').click();
    cy.wait(delay);
    cy.get('.euiLink').contains('authentication').click();
    supressResizeObserverIssue();
    cy.wait(delay * 3);
    cy.get('.euiFlyout').contains('Service detail').should('be.visible');
    cy.get('.euiFlyout').within(($flyout) => {
      cy.wait(delay);
      cy.get('.euiDescriptionList').contains('3').should('exist');
      cy.get('[data-text="Error rate"]').click();
      cy.get('.ytitle').contains('Error rate').should('exist');
    });
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.exist');
    cy.get('.euiLink').contains('authentication').click();
    supressResizeObserverIssue();
    cy.wait(delay * 3);
    cy.get('.euiFlyout').contains('Service detail').scrollIntoView().should('be.visible');
    cy.get('[data-test-subj="dataGridRowCell"] button').contains('718dc32a693c8a17').click();
    cy.get('.euiFlyout').contains('Span detail').should('be.visible');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.exist');
  });

  it('Opens trace detail flyout when Trace ID is clicked', () => {
    cy.get('.euiTab').contains('Traces & Spans').click();
    supressResizeObserverIssue();
    cy.wait(delay);
    cy.get('[title="03f9c770db5ee2f1caac0afc36db49ba"]').click();
    cy.get('.euiFlyout').contains('Trace detail').should('be.visible');
    cy.get('.euiFlyout').within(($flyout) => {
      cy.get('.euiDescriptionList').contains('224.99').should('exist');
    });
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.wait(delay);
    cy.get('.euiFlyout').should('not.exist');
    cy.get('[title="03f9c770db5ee2f1caac0afc36db49ba"]').click();
    cy.get('[data-text="Span list"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="dataGridRowCell"] button').contains('d67c5bb617ba9203').click();
    cy.get('.euiFlyout').contains('Span detail').should('be.visible');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.exist');
  });

  it('Opens span detail flyout when Span ID is clicked', () => {
    cy.get('.euiTab').contains('Traces & Spans').click();
    supressResizeObserverIssue();
    cy.wait(delay);
    cy.get('.euiLink').contains('5ff3516909562c60').click();
    cy.get('.euiFlyout').contains('Span detail').should('be.visible');
    cy.get('.euiFlyout').within(($flyout) => {
      cy.get('.euiText').contains('HTTP GET').should('exist');
    });
    cy.get('.euiText').contains('order').click();
    cy.get('[aria-label="span-flyout-filter-icon"]').click();
    cy.focused().blur();
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiPopover').contains('serviceName: order').should('exist');
    cy.get('[aria-label="Remove filter"]').click();
    cy.get('.euiPopover').contains('serviceName: order').should('not.exist');
  });

  it('Shows base query', () => {
    cy.get('.euiTab').contains('Log Events').click();
    cy.get('.euiBadge__text').contains('Base Query').should('exist');
  });

  it('Saves visualization #1 to panel', () => {
    cy.get('.euiTab').contains('Panel').click();
    cy.get('.euiButton').contains('Add').click();
    cy.wait(delay);
    cy.get('.plot-container').should('exist');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-List').find('.aa-Item').should('have.length', 11);
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type('x', {delay: TYPING_DELAY});
    cy.focused().clear();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(query_one, {delay: TYPING_DELAY});
    changeTimeTo24('months');
    cy.wait(delay * 2);
    cy.get('.euiTab').contains('Visualizations').click();
    supressResizeObserverIssue();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').click().type(visOneName);
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('.js-plotly-plot').should('exist');
  });

  it('Adds availability level to visualization #1', () => {
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('[aria-label="actionMenuButton"]').eq(0).click();
    cy.get('.euiContextMenuItem').contains('Edit').click();
    supressResizeObserverIssue();
    cy.wait(delay);
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('[data-test-subj = "configPane__vizTypeSelector"]').contains('Bar').click({force:true});
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.wait(delay);
    cy.get('.euiButton').contains('+ Add availability level').click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').eq(0).click();
    cy.get('[aria-label="Select #54B399 as the color"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFieldText"]').click().type('Available');
    cy.get('option').contains('≥').should('exist');
    cy.get('option').contains('≤').should('exist');
    cy.get('option').contains('>').should('exist');
    cy.get('option').contains('<').should('exist');
    cy.get('option').contains('=').should('exist');
    cy.get('option').contains('≠').should('exist');
    cy.get('[data-test-subj="expressionSelect"]').select('>');
    cy.get('[data-test-subj="valueFieldNumber"]').clear().type('0.5');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('.js-plotly-plot').should('exist');
    cy.get('.textpoint').contains('Available').should('exist');
    cy.get('.euiBreadcrumb').contains('Application analytics').click();
    cy.wait(delay);
    cy.get('.euiBadge').contains('Available').should('exist');
    cy.get('[style="background-color: rgb(84, 179, 153); color: rgb(0, 0, 0);"]').should('exist');
  });

  it('Saves visualization #2 to panel with availability level', () => {
    moveToApplication(nameOne);
    changeTimeTo24('months');
    cy.get('.euiTab').contains('Log Events').click();
    cy.wait(delay);
    cy.get('.plot-container').should('exist');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').clear();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type('x', {delay: TYPING_DELAY});
    cy.focused().clear();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').focus().type(query_two, {delay: TYPING_DELAY});
    cy.get('.euiButton').contains('Refresh').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Visualizations').click();
    supressResizeObserverIssue();
    cy.get('.euiBadge').contains('Bar').click();
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.wait(delay);
    cy.get('.euiButton').contains('+ Add availability level').click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
    cy.get('[aria-label="Select #9170B8 as the color"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFieldText"]').click().type('Super');
    cy.get('[data-test-subj="expressionSelect"]').select('<');
    cy.get('[data-test-subj="valueFieldNumber"]').clear().type('5.5');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay);
    cy.get('.euiButton').contains('+ Add availability level').click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').first().click();
    cy.get('[aria-label="Select #CA8EAE as the color"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFieldText"]').first().click().type('Cool');
    cy.get('[data-test-subj="expressionSelect"]').first().select('>');
    cy.get('[data-test-subj="valueFieldNumber"]').first().clear().type('0');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').click().type(visTwoName);
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('.js-plotly-plot').should('have.length', 2);
    moveToHomePage();
    cy.get('.euiBadge').contains('Super').should('exist');
    cy.get('[style="background-color: rgb(145, 112, 184); color: rgb(0, 0, 0);"]').should('exist');
  });

  it('Configuration tab shows details', () => {
    cy.get('.euiLink').contains(nameOne).click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Configuration').click();
    cy.wait(delay);
    cy.get('.euiCodeBlock__code').contains(baseQuery).should('exist');
    cy.get('[aria-label="List of services and entities"]').find('li').should('have.length', 1);
    cy.get('[aria-label="List of trace groups"]').find('li').should('have.length', 2);
    cy.get('option').should('have.length', 2);
  });


  it('Changes availability visualization', () => {
    cy.get('.euiTab').contains('Configuration').click();
    cy.wait(delay);
    cy.get('select').select(visOneName);
    cy.wait(delay);
    moveToHomePage();
    cy.get('.euiBadge').contains('Available').should('exist');
    cy.get('[style="background-color: rgb(84, 179, 153); color: rgb(0, 0, 0);"]').should('exist');
    moveToApplication(nameOne);
    cy.get('.euiTab').contains('Configuration').click();
    cy.wait(delay);
    cy.get('select').find('option:selected').should('have.text', visOneName);
  })

  it('Hides application visualizations in Event Analytics', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics`);
    cy.wait(delay*3);
    if (cy.get('.euiButton').length == 2) {
      cy.get('input.euiFieldSearch').type(visOneName, {delay: TYPING_DELAY});
      cy.wait(delay);
      cy.get('.euiTableCellContent__text').contains('No items found').should('exist');
      cy.get('input.euiFieldSearch').clear().type(visTwoName, {delay: TYPING_DELAY});
      cy.wait(delay);
      cy.get('.euiTableCellContent__text').contains('No items found').should('exist');
      cy.get('.euiFormControlLayoutClearButton').click();
      cy.wait(delay);
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
    }
  });

  it('Hides application visualizations in Operational Panels', () => {
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
    );
    cy.wait(delay*3);
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Add samples').click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Yes').click();
    cy.wait(delay*2);
    cy.get('.euiLink').contains('[Logs] Web traffic Panel').first().click();
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Add visualization').click();
    cy.get('.euiContextMenuItem__text').contains('Select existing visualization').click();
    cy.get('option').contains(visOneName).should('not.exist');
    cy.get('option').contains(visTwoName).should('not.exist');
    cy.visit(
      `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
    );
    cy.wait(delay*3);
    cy.get('input.euiFieldSearch').type('[Logs] Web traffic Panel', {delay: TYPING_DELAY});
    cy.wait(delay);
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiCheckbox').click();
    });
    cy.get('.euiButton__text').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text').contains('Delete').click();
    cy.wait(delay);
    cy.get('input.euiFieldText[placeholder="delete"]').type('delete');
    cy.get('button.euiButton--danger').should('not.be.disabled');
    cy.get('.euiButton__text').contains('Delete').click();
    cy.wait(delay);
  });
});

describe('Editing application', () => {
  beforeEach(() => {
    moveToEditPage();
  });

  it('Redirects to application after saving changes', () => {
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('be.disabled');
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('[data-test-subj="comboBoxToggleListButton"]').filter(':visible').click();
    cy.get('.euiFilterSelectItem').contains(trace_three).trigger('click');
    cy.get('.euiBadge').contains('3').should('exist');
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiButton').contains('Save').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Configuration').click();
    cy.wait(delay);
    cy.get('.euiCodeBlock__code').contains(baseQuery).should('exist');
    cy.get('[aria-label="List of services and entities"]').find('li').should('have.length', 2);
    cy.get('[aria-label="List of trace groups"]').find('li').should('have.length', 3);
    cy.get('.euiTitle').contains(nameOne).should('exist');
  });
});

describe('Application Analytics home page', () => {
  beforeEach(() => {
    moveToHomePage();
  })

  it('Show correct information in table', () => {
    cy.wait(delay);
    cy.get('.euiLink').contains(nameOne).should('exist');
    cy.wait(delay);
    cy.get('[data-test-subj="appAnalytics__compositionColumn"]').contains(composition).should('exist');
    cy.get('.euiBadge').contains('Available').should('exist');
    cy.get('[style="background-color: rgb(84, 179, 153); color: rgb(0, 0, 0);"]').should('exist');
  });

  it('Renames application', () => {
    cy.get('.euiPopover').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem-isDisabled').contains('Rename').should('exist');
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiCheckbox').click();
    });
    cy.wait(delay);
    cy.get('.euiPopover').contains('Actions').click();
    cy.get('.euiContextMenuItem').contains('Rename').click();
    cy.get('.euiFieldText').clear().focus().type(newName);
    cy.get('.euiButton--fill').contains('Rename').click();
    cy.get('.euiToast').contains(`Application successfully renamed to "${newName}"`),{timeout: 10000};
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiLink').contains(newName).should('exist');
    });
  });

  it('Deletes application', () => {
    cy.get('.euiPopover--anchorDownCenter').contains('Actions').click();
    cy.get('.euiContextMenuItem-isDisabled').contains('Delete').should('exist');
    cy.get('.euiPopover--anchorDownCenter').contains('Actions').click();
    cy.get('.euiTableRow').eq(0).within(($row) => {
      cy.get('.euiCheckbox').click();
    });
    cy.get('body').then(($body) => {
      if ($body.find('.euiContextMenuItem').length > 0) {
        cy.get('.euiPopover--anchorDownCenter').contains('Actions').click();
        cy.wait(delay);
      }
    });
    cy.wait(delay * 4);
    cy.get('.euiPopover').contains('Actions').click();
    cy.wait(delay);
    cy.get('.euiContextMenuItem').contains('Delete').click();
    cy.get('.euiButton--fill').contains('Delete').click();
    cy.wait(delay);
    cy.get('.euiToast').contains(`Application "${newName}" successfully deleted!`);
    cy.get('.euiLink').contains(newName).should('not.exist');
  });
});
