/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { supressResizeObserverIssue } from './constants';

export const delay = 1000;

export const TYPING_DELAY = 500;

export const moveToHomePage = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  cy.wait(delay * 3);
  cy.get('.euiTitle').contains('Applications').should('exist');
};

export const moveToCreatePage = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  cy.wait(delay * 2);
  cy.get('.euiButton__text').contains('Create application').click();
  supressResizeObserverIssue();
  cy.wait(delay);
  cy.get('.euiTitle').contains('Create application').should('exist');
};

export const moveToApplication = (name) => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  supressResizeObserverIssue();
  cy.wait(delay * 6);
  cy.get('.euiLink').contains(name).click();
  cy.wait(delay);
  cy.get('.euiTitle').contains(name).should('exist');
  changeTimeTo24('years');
};

export const moveToEditPage = () => {
  moveToApplication(nameOne);
  cy.get('.euiTab').contains('Configuration').click();
  cy.get('.euiButton').contains('Edit').click();
  supressResizeObserverIssue();
  cy.wait(delay);
  cy.get('.euiTitle').contains('Edit application');
};

export const changeTimeTo24 = (timeUnit) => {
  cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').trigger('mouseover').click();
  cy.wait(delay);
  cy.get('[aria-label="Time unit"]').select(timeUnit);
  cy.get('.euiButton').contains('Apply').click();
  cy.wait(delay);
  cy.get('.euiButton').contains('Refresh').click();
};

export const expectMessageOnHover = (message) => {
  cy.get('.euiToolTipAnchor').contains('Create').click({ force: true });
  cy.get('.euiToolTipPopover').contains(message).should('exist');
};

export const moveToPanelHome = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels/`
  );
  cy.wait(delay * 3);
};

export const deleteAllSavedApplications = () => {
  moveToHomePage();
  cy.get('[data-test-subj="checkboxSelectAll"]').click();
  cy.get('.euiPopover').contains('Actions').click();
  cy.get('.euiContextMenuItem').contains('Delete').click();
  cy.get('.euiButton__text').contains('Delete').click();
};

export const baseQuery = 'source = opensearch_dashboards_sample_data_flights';
export const nameOne = 'Cypress';
export const nameTwo = 'Pine';
export const description = 'This is my application for cypress testing.';
export const service_one = 'order';
export const service_two = 'payment';
export const trace_one = 'HTTP POST';
export const trace_two = 'HTTP GET';
export const trace_three = 'client_pay_order';
export const query_one = 'where DestCityName = "Venice" | stats count() by span( timestamp , 6h )';
export const query_two = 'where OriginCityName = "Seoul" | stats count() by span( timestamp , 6h )';
export const visOneName = 'Flights to Venice';
export const visTwoName = 'Flights from Seoul';
export const composition = 'order, payment, HTTP POST, HTTP GET, client_pay_order'
export const newName = 'Monterey Cypress';