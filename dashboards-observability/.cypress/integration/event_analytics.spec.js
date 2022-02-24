/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />
import { 
  delay,
  TEST_QUERIES,
  TESTING_PANEL,
  SAVE_QUERY1,
  SAVE_QUERY2,
  SAVE_QUERY3,
  SAVE_QUERY4
} from "../utils/constants";

const landOnEventHome = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics`);
  cy.wait(delay);
};

const landOnEventExplorer = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/explorer`);
  cy.wait(delay);
};

const landOnPanels = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels`);
  cy.wait(delay);
};

const querySearch = (query) => {
  cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(query);
  cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
  cy.get('[data-test-subj="superDatePickerCommonlyUsed_This_year"]').click();
  cy
    .get('[data-test-subj="superDatePickerApplyTimeButton"]')
    .contains('Refresh')
    .click();
};

describe('Adding sample data and visualization', () => {
  it('Adds sample flights data for event analytics', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/home#/tutorial_directory/sampleData`);
    cy.get('div[data-test-subj="sampleDataSetCardflights"]')
      .contains(/(Add|View) data/)
      .click();
    cy.wait(delay);
  });
});

describe('Search a query on event home', () => {
  it('Search a query and redirect to explorer to display result data', () => {
    landOnEventHome();
    
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[0].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy.wait(delay);
    
    cy.url().should('contain', '#/event_analytics/explorer');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').contains(TEST_QUERIES[0].query);
  });
});

describe('Add/delete/switch explorer top level tabs', () => {
  beforeEach(() => {
    landOnEventExplorer();
  });
  
  it('Add a new tab', () => {
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then(lists => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength + 1);
      });
  });

  it('Click to switch to anther tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy
      .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .click();
    cy.wait(delay);
    
    cy
      .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .should('have.class', 'euiTab-isSelected');
  });

  it('Close a tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy
      .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then(lists => {
        const initialLength = Cypress.$(lists).length;
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"] button.euiTab')
          .first()
          .find('[data-test-subj="eventExplorer__tabClose"]')
          .click();
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
      });
  });

  it('Close current selected tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then(lists => {
        const initialLength = Cypress.$(lists).length;
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"] button.euiTab')
          .eq(1)
          .click();
        cy.get('button.euiTab-isSelected [data-test-subj="eventExplorer__tabClose"]').click();
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
    });
  });

  it('Close another unselected tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy
      .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then(lists => {
        const initialLength = Cypress.$(lists).length;
        cy
          .get('button.euiTab')
          .first()
          .find('[data-test-subj="eventExplorer__tabClose"]')
          .click();
        cy
          .get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
    });
  });
});

describe('Load a saved query from event home', () => {
  it('Click on a saved query and redirect to explorer', () => {
    landOnEventExplorer();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[0].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy.wait(delay);
    
    cy.get('.tab-title').contains('Events').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY4);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
    
    landOnEventHome();
    
    cy
      .get('[data-test-subj="eventHome__savedQueryTableName"]')
      .first()
      .contains(SAVE_QUERY4)
      .click();
    cy.wait(delay);
    
    cy.url().should('contain', '#/event_analytics/explorer');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').contains(TEST_QUERIES[0].query);
  });
});

describe('Click actions', () => {
  beforeEach(() => {
    landOnEventHome();
  });

  it('Actions - click event explorer', () => {
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.get('[data-test-subj="eventHomeAction__explorer"]').click();
    cy.wait(delay);
    cy.url().should('contain', '#/event_analytics/explorer');
  });

  it('Actions - add sample data', () => {
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.get('[data-test-subj="eventHomeAction__addSamples"]').click();
    cy.get('[data-test-subj="confirmModalConfirmButton"]').click();
    cy.wait(delay * 2);
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
  });

  it('Actions - delete saved queries', () => {
    cy.get('[data-test-subj^="checkboxSelectRow"]').first().check();
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.get('[data-test-subj="eventHomeAction__delete"]').click();
    cy.get('[data-test-subj="popoverModal__deleteTextInput"]').type('delete');
    cy.get('[data-test-subj="popoverModal__deleteButton"').click();
    cy.wait(delay);
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
  });
});

describe('Saves a query on explorer page', () => {
  it('Saves a query on event tab of explorer page', () => {
    landOnEventExplorer();
    
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[0].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy.wait(delay);
    
    cy.get('.tab-title').contains('Events').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY1);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
      
    landOnEventHome();

    cy
      .get('[data-test-subj="eventHome__savedQueryTableName"]')
      .first()
      .contains(SAVE_QUERY1);
  });

  it('Saves a visualization on visualization tab of explorer page', () => {
    landOnEventExplorer();
    
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[1].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy.wait(delay);
    
    cy.get('.tab-title').contains('Visualizations').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY2);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
    
    landOnEventHome();
    
    cy
      .get('[data-test-subj="eventHome__savedQueryTableName"]')
      .first()
      .contains(SAVE_QUERY2);
  });

  it('Saves a visualization to an existing panel', () => {
    landOnPanels();
    
    cy.get('[data-test-subj="customPanels__createNewPanels"]').click();
    cy.get('input.euiFieldText').type(TESTING_PANEL);
    cy
      .get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);
    
    landOnEventExplorer();
    
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[1].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy.wait(delay);
    
    cy.get('.tab-title').contains('Visualizations').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY3);
    cy.get('[data-test-subj="comboBoxToggleListButton"]').click();
    cy.get('.euiComboBox__input').type(TESTING_PANEL);
    cy.get(`input[value="${TESTING_PANEL}"]`).click();
    cy.get('[data-test-subj="comboBoxToggleListButton"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);
    
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
  });
});

describe('Override default timestamp for an index', () => {
  it('Click override button to override default timestamp', () => {
    landOnEventExplorer();
    
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[2].query);
    cy
      .get('[data-test-subj="superDatePickerApplyTimeButton"]')
      .contains('Refresh')
      .click();
    cy
      .get('.tab-title')
      .contains('Events')
      .click();
    cy.get('[data-test-subj="eventExplorer__overrideDefaultTimestamp"]').click();
    cy.wait(delay);
    
    cy
      .get('.euiToastHeader__title')
      .contains('successfully')
      .should('exist');
  });
});

describe('Toggle sidebar fields', () => {
  it('Toggle fields between available and selected section', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query);
    cy.wait(delay);
    
    cy.get('[data-test-subj="fieldToggle-AvgTicketPrice"]').click();
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy
      .get('[data-test-subj="docTable"]')
      .find('th')
      .contains('_source')
      .should('not.exist');
    cy.get('[data-test-subj="fieldToggle-AvgTicketPrice"]').click();
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy
      .get('[data-test-subj="docTable"]')
      .find('th')
      .contains('_source')
      .should('exist');
  });
});

describe('Search fields in sidebar', () => {
  it('Search a field', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query);
    cy.wait(delay);
    
    cy.get('[data-test-subj="eventExplorer__sidebarSearch"]').type('A');
    cy.get('[data-test-subj="field-Cancelled"]').should('not.exist');
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy.get('[data-test-subj="field-DestAirportID"]').should('exist');
    cy.get('[data-test-subj="field-OriginAirportID"]').should('exist');
  });
});

describe('Switch on and off livetail', () => {
  it('Switch on and off in live tail', () => {
    landOnEventExplorer();
    cy.wait(delay);

    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[1].query);

    cy.get('[data-test-subj=eventLiveTail]').click();
    cy.get('[data-test-subj=eventLiveTail__delay10]').click();
    cy.wait(delay * 2);
    cy
      .get('.euiToastHeader__title')
      .contains('On')
      .should('exist');

    cy.get('[data-test-subj=eventLiveTail]').click();
    cy.get('[data-test-subj=eventLiveTail__off').click();
    cy.wait(delay * 2);
    cy
      .get('.euiToastHeader__title')
      .contains('Off')
      .should('exist');

  });
});
