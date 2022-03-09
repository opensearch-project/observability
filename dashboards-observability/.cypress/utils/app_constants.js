/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const delay = 700;

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

export const moveToApplication = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  cy.wait(delay * 5);
  cy.get('.euiLink').contains(name).click();
  cy.wait(delay);
  cy.get('.euiTitle').contains(name).should('exist');
  changeTimeTo24('years');
};

export const moveToEditPage = () => {
  moveToApplication();
  cy.get('.euiTab').contains('Configuration').click();
  cy.get('.euiButton').contains('Edit').click();
  supressResizeObserverIssue();
  cy.wait(delay);
  cy.get('.euiTitle').contains('Edit application');
};

export const changeTimeTo24 = (timeUnit) => {
  cy.get('#QuickSelectPopover').click();
  cy.get('[aria-label="Time unit"]').select(timeUnit);
  cy.get('.euiButton').contains('Apply').click();
  cy.wait(delay);
};

export const expectMessageOnHover = (message) => {
  cy.get('.euiToolTipAnchor').contains('Create').click({ force: true });
  cy.get('.euiToolTipPopover').contains(message).should('exist');
};

export const baseQuery = 'source = opensearch_dashboards_sample_data_flights';
export const name = 'Cypress';
export const description = 'This is my application for cypress testing.';
export const service_one = 'order';
export const service_two = 'payment';
export const trace_one = 'HTTP POST';
export const trace_two = 'HTTP GET';
export const trace_three = 'client_pay_order';
export const spanQueryPartOne = 'where DestCityName ';
export const spanQueryPartTwo = '= "Venice" | stats count() by span( timestamp ';
export const spanQueryPartThree = ', 6h )';
export const visName = 'Flights to Venice';
export const composition = 'order, payment, HTTP POST, HTTP GET, client_pay_order'
export const newName = 'Monterey Cypress';