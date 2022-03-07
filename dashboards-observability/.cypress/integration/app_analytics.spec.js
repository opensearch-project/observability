/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import { supressResizeObserverIssue } from '../utils/constants';

const delay = 700;

const moveToCreatePage = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  cy.wait(delay * 2);
  cy.get('.euiButton__text').contains('Create application').click();
  supressResizeObserverIssue();
  cy.wait(delay);
  cy.get('.euiTitle').contains('Create application').should('exist');
};

const expectMessageOnHover = (message) => {
  cy.get('.euiToolTipAnchor').contains('Create').click({ force: true });
  cy.get('.euiToolTipPopover').contains(message).should('exist');
};

const baseQuery = 'source = opensearch_dashboards_sample_data_flights';
const name = 'Cypress';
const description = 'This is my application for cypress testing.';
const service_one = 'order';
const trace_one = 'HTTP POST';
const trace_two = 'HTTP GET';

describe('Creating application', () => {
  beforeEach(() => {
    moveToCreatePage();
  });

  it('Disables create button if missing fields', () => {
    expectMessageOnHover('Name is required.');
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    expectMessageOnHover('Log Source is required.');
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    expectMessageOnHover('Services & Entities is required.');
    cy.get('.euiAccordion').contains('Services & Entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').type('o');
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    expectMessageOnHover('Trace Groups are required.');
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
    cy.focused().type('{enter}')
    cy.get('.aa-List').find('.aa-Item').should('have.length', 1);
    cy.get('.aa-Item').contains('=').should('exist');
    cy.focused().type('{enter}')
    cy.focused().type('opensearch');
    cy.get('.aa-Item').contains('opensearch_dashboards_sample_data_flights').click();
    cy.focused().clear();
    cy.get('.aa-List').find('.aa-Item').should('have.length', 1);
    cy.focused().type('{enter}')
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('contain', 'source ');
  })

  it('Creates an application and redirects to application', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    cy.get('[data-test-subj="descriptionFormRow"]').type('This application is for testing.');
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiAccordion').contains('Services & Entities').click();
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
  });

  it('Redirects to home page on cancel', () => {
    cy.get('.euiButton').contains('Cancel').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Applications').should('exist');
  });

  it('Saves current input on refresh', () => {
    cy.get('[data-test-subj="nameFormRow"]').type(name);
    cy.get('[data-test-subj="descriptionFormRow"]').type(description);
    cy.get('.euiAccordion').contains('Log source').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(baseQuery);
    cy.get('.euiAccordion').contains('Services & Entities').click();
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
    cy.get('.euiAccordion').contains('Services & Entities').click();
    cy.get('[data-test-subj="servicesEntitiesComboBox"]').click();
    cy.get('.euiFilterSelectItem').contains(service_one).trigger('click');
    cy.get('.euiBadge').contains('1').should('exist');
    cy.get('.euiAccordion-isOpen').within(($service) => {
      cy.get('.euiButton').contains('Clear all').click();
    })
    cy.get('.euiButton--danger').contains('Clear all').click();
    cy.get('.euiBadge').contains('1').should('not.exist');
    cy.get('.euiBadge').contains('0').should('exist');
    cy.get('.euiAccordion').contains('Services & Entities').click();
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