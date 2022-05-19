/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { supressResizeObserverIssue } from './constants';

export const delay = 1000;
export const timeoutDelay = 30000;
export const TYPING_DELAY = 500;

export const moveToHomePage = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  cy.wait(delay * 3);
  cy.get('.euiTitle').contains('Applications').should('exist');
};

export const moveToCreatePage = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  supressResizeObserverIssue();
  cy.wait(delay * 7);
  cy.get('.euiButton__text').contains('Create application').click();
  cy.wait(delay * 2);
  cy.get('.euiTitle').contains('Create application').should('exist');
};

export const moveToApplication = (name) => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/application_analytics/`);
  supressResizeObserverIssue();
  cy.wait(delay * 7);
  cy.get('.euiLink').contains(name).click();
  cy.wait(delay);
  cy.get('[data-test-subj="applicationTitle"]').should('contain', name);
  changeTimeTo24('years');
};

export const moveToEditPage = () => {
  moveToApplication(nameOne);
  cy.get('[data-test-subj="app-analytics-configTab"]').click();
  cy.get('[data-test-subj="editApplicationButton"]').click();
  supressResizeObserverIssue();
  cy.wait(delay);
  cy.get('[data-test-subj="createPageTitle"]').should('contain', 'Edit application');
};

export const changeTimeTo24 = (timeUnit) => {
  cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').trigger('mouseover').click();
  cy.wait(delay);
  cy.get('[aria-label="Time unit"]').select(timeUnit);
  cy.get('.euiButton').contains('Apply').click();
  cy.wait(delay);
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').click();
};

export const expectMessageOnHover = (button, message) => {
  cy.get(`[data-test-subj="${button}"]`).click({ force: true });
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

export const uniqueId = Date.now();
export const baseQuery = 'source = opensearch_dashboards_sample_data_flights';
export const nameOne = `Cypress-${uniqueId}`;
export const nameTwo = `Pine-${uniqueId}`;
export const nameThree = `Cedar-${uniqueId}`;
export const description = 'This is my application for cypress testing.';
export const service_one = 'order';
export const service_two = 'payment';
export const trace_one = 'HTTP POST';
export const trace_two = 'HTTP GET';
export const trace_three = 'client_pay_order';
export const query_one = 'where DestCityName = "Venice" | stats count() by span( timestamp , 6h )';
export const query_two = 'where OriginCityName = "Seoul" | stats count() by span( timestamp , 6h )';
export const availability_default = 'stats count() by span( timestamp, 1h )';
export const visOneName = 'Flights to Venice';
export const visTwoName = 'Flights from Seoul';
export const composition = 'order, payment, HTTP POST, HTTP GET';
export const newName = 'Monterey Cypress';
