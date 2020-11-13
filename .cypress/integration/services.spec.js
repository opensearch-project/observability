/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

/// <reference types="cypress" />

import { delay, setTimeFilter, SERVICE_NAME } from '../utils/constants';

describe('Testing services table empty state', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/services');
    cy.wait(delay * 3);
  });

  it('Renders empty state', () => {
    cy.contains(' (0)').should('exist');
    cy.get('h2.euiTitle').contains('No matches').should('exist');
  });
});

describe('Testing services table', () => {
  beforeEach(() => {
    cy.visit('app/opendistro-trace-analytics#/services');
    setTimeFilter();
  });

  it('Renders the services table', () => {
    cy.contains(' (8)').should('exist');
    cy.contains('analytics-service, recommendation, frontend-client').should('exist');
    cy.contains('183.52').should('exist');
    cy.contains('9.09%').should('exist');
  });

  it('Searches correctly', () => {
    cy.get('input[type="search"]').focus().type(`${SERVICE_NAME}{enter}`);
    cy.get('.euiButton__text').contains('Refresh').click();
    cy.wait(delay);
    cy.contains(' (1)').should('exist');
    cy.contains('7.41%').should('exist');
  });

  it('Redirects to traces view with filter', () => {
    cy.wait(delay * 5);
    cy.get('.euiLink').contains('27').click();
    cy.wait(delay);

    cy.get('h2.euiTitle').contains('Traces').should('exist');
    cy.contains(' (27)').should('exist');
    cy.contains('serviceName: frontend-client').should('exist');
  });
});

describe('Testing service view empty state', () => {
  beforeEach(() => {
    cy.visit(`app/opendistro-trace-analytics#/services/${SERVICE_NAME}`);
    cy.wait(delay * 3);
  });

  it('Renders service view empty state', () => {
    cy.get('h2.euiTitle').contains('frontend-client').should('exist');
    cy.get('.euiText').contains('0').should('exist');
    cy.get('.euiText').contains('-').should('exist');
  });
});

describe('Testing service view', () => {
  beforeEach(() => {
    cy.visit(`app/opendistro-trace-analytics#/services/${SERVICE_NAME}`);
    setTimeFilter(undefined, undefined, false);
  });
  
  it('Renders service view', () => {
    cy.get('h2.euiTitle').contains('frontend-client').should('exist');
    cy.contains('207.71').should('exist');
    cy.contains('7.41%').should('exist');
    cy.get('div.vis-network').should('exist');
  });
});
