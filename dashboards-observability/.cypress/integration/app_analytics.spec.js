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
  name,
  description,
  service_one,
  service_two,
  trace_one,
  trace_two,
  trace_three,
  spanQueryPartOne,
  spanQueryPartTwo,
  spanQueryPartThree,
  visName,
  composition,
  newName,
} from '../utils/panel_constants';
import { supressResizeObserverIssue } from '../utils/constants';

describe('Creating application', () => {
  beforeEach(() => {
    moveToCreatePage();
  });

  it('Disables create button if missing fields', () => {
    expectMessageOnHover('Name is required.');
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    expectMessageOnHover('Provide at least one log source, service, entity or trace group.');
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').clear();
    expectMessageOnHover('Provide at least one log source, service, entity or trace group.');
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
  });

  it('Suggests correct autocompletion', () => {
    cy.get('.euiAccordion').contains('Log source').click();
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
  })

  it('Creates an application and redirects to application', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    cy.get('[data-test-subj="descriptionFormRow"]').type('This application is for testing.');
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiButton').contains('Create').should('not.be.disabled');
    cy.get('.euiButton').contains('Create').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains(name).should('exist');
    cy.get('.euiTab').contains('Panel').click();
    cy.get('.euiText').contains('Start by adding metrics').should('exist');
  });

  it('Redirects to home page on cancel', () => {
    cy.get('.euiButton').contains('Cancel').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Applications').should('exist');
  });

  it('Saves current input on reload', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    cy.get('[data-test-subj="descriptionFormRow"]').type(description);
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.reload();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFormRow"]').find('.euiFieldText').should('contain.value', name);
    cy.get('[data-test-subj="descriptionFormRow"]').find('.euiFieldText').should('contain.value', description);
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain.value', baseQuery);
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiBadge').contains('2').should('exist');
  });

  it('Shows clear modals before clearing', () => {
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('.euiButton-isDisabled').contains('Clear').should('exist');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiButton').contains('Clear').click();
    cy.get('.euiButton--danger').contains('Clear').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain.value', '');
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion-isOpen').within(($service) => {
      cy.get('.euiButton').contains('Clear all').click();
    })
    cy.get('.euiButton--danger').contains('Clear all').click();
    cy.get('.euiBadge').contains('1').should('not.exist');
    cy.get('.euiBadge').contains('0').should('exist');
    cy.get('.euiAccordion').contains('Services & entities').click();
    cy.get('.euiAccordion').contains('Trace groups').click();
    cy.get('[data-test-subj="traceGroupsComboBox"]').type('http');
    cy.get('.euiFilterSelectItem').contains(trace_one).trigger('click');
    cy.get('.euiFilterSelectItem').contains(trace_two).trigger('click');
    cy.get('.euiBadge').contains('2').should('exist');
    cy.get('.euiAccordion-isOpen').within(($trace) => {
      cy.get('.euiButton').contains('Clear all').click();
    })
    cy.get('.euiButton--danger').contains('Clear all').click();
    cy.get('.euiBadge').contains('2').should('not.exist');
    cy.get('.euiBadge').contains('0').should('exist');
  });
});

describe('Viewing application', () => {
  before(() => {
    moveToApplication();
  })

  it('Shares time range among tabs', () => {
    changeTimeTo24('months');
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Services').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Traces & Spans').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Log Events').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
    cy.get('.euiTab').contains('Panel').click();
    cy.get('[data-test-subj="superDatePickerShowDatesButton"]').should('contain', 'Last 24 months');
  });

  it('Adds filter when Trace group name is clicked', () => {
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
      cy.get('.euiDescriptionList').contains('3.52').should('exist');
      cy.get('[aria-label="Error rate"]').click();
      cy.get('.ytitle').contains('Error rate').should('exist');
    });
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.be.visible');
    cy.get('.euiLink').contains('authentication').click();
    supressResizeObserverIssue();
    cy.wait(delay * 3);
    cy.get('.euiFlyout').contains('Service detail').should('be.visible');
    cy.get('.euiLink').contains('718dc32a693c8a17').click();
    cy.get('.euiFlyout').contains('Span detail').should('be.visible');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.be.visible');
  });

  it('Opens trace detail flyout when Trace ID is clicked', () => {
    cy.get('.euiTab').contains('Traces & Spans').click();
    cy.wait(delay);
    cy.get('[title="03f9c770db5ee2f1caac0afc36db49ba"]').click();
    cy.get('.euiFlyout').contains('Trace detail').should('be.visible');
    cy.get('.euiFlyout').within(($flyout) => {
      cy.get('.euiDescriptionList').contains('224.99').should('exist');
    });
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.be.visible');
    cy.get('[title="03f9c770db5ee2f1caac0afc36db49ba"]').click();
    cy.get('[aria-label="Span list"]').click();
    cy.wait(delay);
    cy.get('.euiLink').contains('d67c5bb617ba9203').click();
    cy.get('.euiFlyout').contains('Span detail').should('be.visible');
    cy.get('[data-test-subj="euiFlyoutCloseButton"]').click();
    cy.get('.euiFlyout').should('not.be.visible');
  });

  it('Opens span detail flyout when Span ID is clicked', () => {
    cy.get('.euiTab').contains('Traces & Spans').click();
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

  it('Saves visualization to panel', () => {
    cy.get('.euiTab').contains('Log Events').click();
    cy.get('.plot-container').should('exist');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').click();
    cy.get('.aa-List').find('.aa-Item').should('have.length', 11);
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type('x');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').clear().wait(delay * 2).type(spanQueryPartOne);
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').wait(delay * 2).type(spanQueryPartTwo);
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').wait(delay * 2).type(spanQueryPartThree);
    cy.get('.euiButton').contains('Refresh').click();
    cy.get('.euiTab').contains('Visualizations').click();
    supressResizeObserverIssue();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').click().type(visName);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('.js-plotly-plot').should('exist');
  });

  it('Adds availability level to visualization', () => {
    cy.get('.euiTab').contains('Panel').click();
    cy.wait(delay);
    cy.get('[aria-label="actionMenuButton"]').click();
    cy.get('.euiContextMenuItem').contains('Edit').click();
    supressResizeObserverIssue();
    cy.wait(delay);
    cy.get('.euiBadge').contains('Bar').click();
    cy.focused().type('{downArrow}');
    cy.focused().type('{enter}');
    cy.wait(delay);
    cy.get('.euiButton').contains('+ Add availability level').click();
    cy.get('[data-test-subj="colorPickerAnchor"]').click();
    cy.get('[aria-label="Select #54B399 as the color"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="nameFieldText"]').click().type('Available');
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
  });

  it('Configuration tab shows details', () => {
    cy.get('.euiTab').contains('Configuration').click();
    cy.wait(delay);
    cy.get('.euiCodeBlock__code').contains(baseQuery).should('exist');
    cy.get('[aria-label="List of services and entities"]').find('li').should('have.length', 1);
    cy.get('[aria-label="List of trace groups"]').find('li').should('have.length', 2);
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
    cy.get('.euiTitle').contains(name).should('exist');
  });
});

describe('Application Analytics home page', () => {
  beforeEach(() => {
    moveToHomePage();
  })

  it('Show correct information in table', () => {
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiLink').contains(name).should('exist');
      cy.get('.euiTableCellContent').contains(composition).should('exist');
      cy.get('.euiBadge').contains('Available').should('exist');
      cy.get('[style="background-color: rgb(84, 179, 153); color: rgb(0, 0, 0);"]').should('exist');
    });
  });

  it('Renames application', () => {
    cy.get('.euiPopover').contains('Actions').click();
    cy.get('.euiContextMenuItem-isDisabled').contains('Rename').should('exist');
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiCheckbox').click();
    });
    cy.wait(delay);
    cy.get('.euiPopover').contains('Actions').click();
    cy.get('.euiContextMenuItem').contains('Rename').click();
    cy.get('.euiFieldText').clear().type(newName);
    cy.get('.euiButton--fill').contains('Rename').click();
    cy.wait(delay);
    cy.get('.euiToast').contains(`Application successfully renamed to "${newName}"`);
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiLink').contains(newName).should('exist');
    });
  });


  it('Deletes application', () => {
    cy.get('.euiPopover').contains('Actions').click();
    cy.get('.euiContextMenuItem-isDisabled').contains('Delete').should('exist');
    cy.get('.euiTableRow').first().within(($row) => {
      cy.get('.euiCheckbox').click();
    });
    cy.wait(delay);
    cy.get('.euiPopover').contains('Actions').click();
    cy.get('.euiContextMenuItem').contains('Delete').click();
    cy.get('.euiButton--fill').contains('Delete').click();
    cy.wait(delay);
    cy.get('.euiToast').contains(`Application "${newName}" successfully deleted!`);
    cy.get('.euiLink').contains(newName).should('not.exist');
  });
});
