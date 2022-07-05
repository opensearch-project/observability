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
  SAVE_QUERY4,
  querySearch,
  YEAR_TO_DATE_DOM_ID,
  landOnEventHome,
  landOnEventExplorer,
  landOnEventVisualizations,
  landOnPanels,
  renderTreeMapchart,
  renderPieChart,
  renderLineChartForDataConfig,
  DataConfigLineChart,
  renderHistogramChart
} from '../utils/event_constants';
import { supressResizeObserverIssue } from '../utils/constants';

const vis_name_sub_string = Math.floor(Math.random() * 100);
const saveVisualizationAndVerify = () => {
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
  cy.wait(delay);
  cy.get('.euiHeaderBreadcrumbs a').eq(1).click();
  cy.get('.euiFlexGroup .euiFormControlLayout__childrenWrapper input')
    .eq(0)
    .type(`Test visualization` + vis_name_sub_string)
    .type('{enter}');
  cy.get('.euiBasicTable .euiTableCellContent button').eq(0).click();
};
const deleteVisualization = () => {
  cy.get('a[href = "#/event_analytics"]').click();
  cy.get('.euiFlexGroup .euiFormControlLayout__childrenWrapper input')
    .eq(0)
    .type(`Test visualization`)
    .type('{enter}');
  cy.get('input[data-test-subj = "checkboxSelectAll"]').click();
  cy.get('.euiButtonContent.euiButtonContent--iconRight.euiButton__content').click();
  cy.get('.euiContextMenuItem .euiContextMenuItem__text').eq(0).click();
  cy.get('input[placeholder = "delete"]').clear().type('delete');
  cy.get('button[data-test-subj = "popoverModal__deleteButton"]').click();
  cy.get('.euiToastHeader').should('exist');
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

describe('Has working breadcrumbs', () => {
  it('Redirect to correct page on breadcrumb click', () => {
    landOnEventExplorer();
    cy.wait(delay * 3);
    cy.get('.euiBreadcrumb[href="#/event_analytics/explorer"]').contains('Explorer').click();
    cy.wait(delay);
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should('exist');
    cy.get('.euiBreadcrumb[href="#/event_analytics"]').contains('Event analytics').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
    cy.get('.euiBreadcrumb[href="observability-dashboards#/"]').contains('Observability').click();
    cy.wait(delay);
    cy.get('.euiTitle').contains('Event analytics').should('exist');
  });
});

describe('Search a query on event home', () => {
  it('Search a query and redirect to explorer to display query output', () => {
    landOnEventHome();

    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[0].query);
    cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
    cy.get('[data-test-subj="superDatePickerCommonlyUsed_Year_to date"]').click();
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .then((state) => {
        expect(Object.values(state.queries)[0]['rawQuery'].trim()).equal(TEST_QUERIES[0].query);
        expect(Object.values(state.queries)[0]['selectedDateRange'][0]).equal('now/y');
        expect(Object.values(state.queries)[0]['selectedDateRange'][1]).equal('now');
      });
    cy.wait(delay);

    cy.url().should('contain', '#/event_analytics/explorer');
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').contains(TEST_QUERIES[0].query);
  });
});

describe('Open flyout for a data row to see details', () => {
  beforeEach(() => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query, TEST_QUERIES[0].dateRangeDOM);
  });

  it('Should be able to open flyout and see data, json and traces', () => {
    cy.get('[data-test-subj="docTable"] tbody tr button.euiButtonIcon').first().click();
    cy.get('.observability-flyout').should('exist');
    cy.get('.observability-flyout .osdDocViewer .euiTabs span.euiTab__content')
      .contains('JSON')
      .click();
    cy.get('.observability-flyout .osdDocViewer .euiTabs span.euiTab__content')
      .contains('Traces')
      .click();
    cy.get('.observability-flyout .osdDocViewer .euiTabs span.euiTab__content')
      .contains('Table')
      .click();
  });

  it('Should be able to see srrounding docs', () => {
    cy.get('[data-test-subj="docTable"] tbody tr button.euiButtonIcon').first().click();
    cy.get('.observability-flyout').should('exist');
    cy.get('.observability-flyout span.euiButton__text')
      .contains('View surrounding events')
      .click();
    cy.get('.observability-flyout #surroundingFyout')
      .contains('View surrounding events')
      .should('exist');
  });
});

describe('Add/delete/switch explorer top level tabs', () => {
  beforeEach(() => {
    landOnEventExplorer();
  });

  it('Add a new tab', () => {
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength + 1);
      });
  });

  it('Click to switch to anther tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .click();
    cy.wait(delay);

    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .should('have.class', 'euiTab-isSelected');
  });

  it('Close a tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"] button.euiTab')
          .first()
          .find('[data-test-subj="eventExplorer__tabClose"]')
          .click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
      });
  });

  it('Close current selected tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"] button.euiTab').eq(1).click();
        cy.get('button.euiTab-isSelected [data-test-subj="eventExplorer__tabClose"]').click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
      });
  });

  it('Close another unselected tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('button.euiTab').first().find('[data-test-subj="eventExplorer__tabClose"]').click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
      });
  });
});

describe('Load a saved query from event home', () => {
  it('Click on a saved query and redirect to explorer', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query, TEST_QUERIES[0].dateRangeDOM);

    cy.get('.tab-title').contains('Events').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY4);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay * 2);

    cy.get('.euiToastHeader__title').contains('successfully').should('exist');

    landOnEventHome();

    cy.get('[data-test-subj="eventHome__savedQueryTableName"]')
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
    cy.wait(delay);
    cy.get('[data-test-subj="eventHomeAction__explorer"]').click();
    cy.url().should('contain', '#/event_analytics/explorer');
  });

  it('Actions - add sample data', () => {
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventHomeAction__addSamples"]').click();
    cy.get('[data-test-subj="confirmModalConfirmButton"]').click();
    cy.wait(delay * 4);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });

  it('Actions - delete saved queries', () => {
    cy.get('[data-test-subj^="checkboxSelectRow"]').first().check();
    cy.get('[data-test-subj="eventHomeAction"]').click();
    cy.get('[data-test-subj="eventHomeAction__delete"]').click();
    cy.get('[data-test-subj="popoverModal__deleteTextInput"]').type('delete');
    cy.get('[data-test-subj="popoverModal__deleteButton"').click();
    cy.wait(delay);
    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});

describe('Saves a query on explorer page', () => {
  it('Saves a query on event tab of explorer page', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query, TEST_QUERIES[0].dateRangeDOM);
    cy.wait(delay);

    cy.get('.tab-title').contains('Events').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay);
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY1);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay * 2);

    cy.get('.euiToastHeader__title').contains('successfully').should('exist');

    landOnEventHome();

    cy.get('[data-test-subj="eventHome__savedQueryTableName"]').first().contains(SAVE_QUERY1);
  });

  it('Saves a visualization on visualization tab of explorer page', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[1].query, TEST_QUERIES[1].dateRangeDOM);
    cy.wait(delay);
    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay * 2);
    cy.get(
      '[data-test-subj="eventExplorer__querySaveComboBox"] [data-test-subj="comboBoxToggleListButton"]'
    ).click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY2);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay * 2);

    cy.get('.euiToastHeader__title').contains('successfully').should('exist');

    landOnEventHome();

    cy.get('[data-test-subj="eventHome__savedQueryTableName"]').first().contains(SAVE_QUERY2);
  });

  it('Saves a visualization to an existing panel', () => {
    landOnPanels();

    cy.get('[data-test-subj="customPanels__createNewPanels"]').click();
    cy.get('input.euiFieldText').type(TESTING_PANEL);
    cy.get('.euiButton__text')
      .contains(/^Create$/)
      .click();
    cy.wait(delay);

    landOnEventExplorer();
    querySearch(TEST_QUERIES[1].query, TEST_QUERIES[1].dateRangeDOM);
    cy.wait(delay);

    supressResizeObserverIssue();
    cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.wait(delay * 2);
    cy.get(
      '[data-test-subj="eventExplorer__querySaveComboBox"] [data-test-subj="comboBoxToggleListButton"]'
    ).click();
    cy.get('[data-test-subj="eventExplorer__querySaveName"]').type(SAVE_QUERY3);
    cy.get('[data-test-subj="eventExplorer__querySaveComboBox"]').type(TESTING_PANEL);
    cy.get(`input[value="${TESTING_PANEL}"]`).click();
    cy.get(
      '[data-test-subj="eventExplorer__querySaveComboBox"] [data-test-subj="comboBoxToggleListButton"]'
    ).click();
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.wait(delay);

    cy.get('.euiToastHeader__title').contains('successfully').should('exist');
  });
});

describe('Override timestamp for an index', () => {
  it('Click override button to override default timestamp', () => {
    landOnEventExplorer();

    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[2].query);
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('.tab-title').contains('Events').click();
    cy.get('[data-test-subj="eventExplorer__overrideDefaultTimestamp"]').click();
    cy.wait(delay);

    cy.get('[data-attr-field="utc_time"] [data-test-subj="eventFields__default-timestamp-mark"')
      .contains('Default Timestamp')
      .should('exist');
    cy.get(
      '[data-attr-field="timestamp"] [data-test-subj="eventFields__default-timestamp-mark"'
    ).should('not.exist');
  });
});

describe('Toggle sidebar fields', () => {
  it('Toggle fields between available and selected section', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query, YEAR_TO_DATE_DOM_ID);
    cy.wait(delay);

    cy.get('[data-test-subj="fieldToggle-AvgTicketPrice"]').click();
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy.get('[data-test-subj="docTable"]').find('th').contains('_source').should('not.exist');
    cy.get('[data-test-subj="fieldToggle-AvgTicketPrice"]').click();
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy.get('[data-test-subj="docTable"]').find('th').contains('_source').should('exist');
  });
});

describe('Search fields in sidebar', () => {
  it('Search a field', () => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[0].query, YEAR_TO_DATE_DOM_ID);
    cy.wait(delay);

    cy.get('[data-test-subj="eventExplorer__sidebarSearch"]').type('A');
    cy.get('[data-test-subj="field-Cancelled"]').should('not.exist');
    cy.get('[data-test-subj="field-AvgTicketPrice"]').should('exist');
    cy.get('[data-test-subj="field-DestAirportID"]').should('exist');
    cy.get('[data-test-subj="field-OriginAirportID"]').should('exist');
  });
});

describe('Delete saved objects', () => {
  it('Delete visualizations/querys from event analytics', () => {
    landOnEventHome();
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
    cy.wait(delay * 4);
    cy.get('.euiTextAlign').contains('No Queries or Visualizations').should('exist');
  });
});

describe('Click to view field insights', () => {
  beforeEach(() => {
    landOnEventExplorer();
    querySearch(TEST_QUERIES[2].query, YEAR_TO_DATE_DOM_ID);
  });

  it('Click a numerical field to view field insights', () => {
    cy.get('[data-test-subj="field-bytes-showDetails"]').click();
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Top values')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Rare values')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Average overtime')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Maximum overtime')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Minimum overtime')
      .should('exist');
  });

  it('Click a non-numerical field to view insights', () => {
    cy.get('[data-test-subj="field-host-showDetails"]').click();
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Top values')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Rare values')
      .should('exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Average overtime')
      .should('not.exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Maximum overtime')
      .should('not.exist');
    cy.get('[data-test-subj="sidebarField__fieldInsights"] button')
      .contains('Minimum overtime')
      .should('not.exist');
  });
});

describe('Switch on and off livetail', () => {
  it('Switch on and off in live tail', () => {
    landOnEventExplorer();
    cy.wait(delay);

    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[1].query);

    cy.get('[data-test-subj=eventLiveTail]').click();
    cy.get('[data-test-subj=eventLiveTail__delay10s]').click();
    cy.wait(delay * 2);
    cy.get('.euiToastHeader__title').contains('On').should('exist');

    cy.get('[data-test-subj=eventLiveTail__off').click();
    cy.wait(delay * 2);
    cy.get('.euiToastHeader__title').contains('Off').should('exist');
  });
});

describe('Live tail stop automatically', () => {
  it('Moving to other tab should stop live tail automatically', () => {
    landOnEventExplorer();
    cy.wait(delay);

    cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(TEST_QUERIES[1].query);

    cy.get('[data-test-subj=eventLiveTail]').click();
    cy.get('[data-test-subj=eventLiveTail__delay10s]').click();
    cy.wait(delay * 2);
    cy.get('.euiToastHeader__title').contains('On').should('exist');
  });

  it('Add a new tab', () => {
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength + 1);
      });
  });

  it('Click to switch to another tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .click();
    cy.wait(delay);

    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .first()
      .should('have.class', 'euiTab-isSelected');
  });

  it('Close current selected tab', () => {
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__addNewTab"]').click();
    cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
      .find('button.euiTab')
      .then((lists) => {
        const initialLength = Cypress.$(lists).length;
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"] button.euiTab').eq(1).click();
        cy.get('button.euiTab-isSelected [data-test-subj="eventExplorer__tabClose"]').click();
        cy.get('[data-test-subj="eventExplorer__topLevelTabbing"]')
          .find('button.euiTab')
          .should('have.length', initialLength - 1);
      });
  });

  it('Live tail should be stopped', () => {
    cy.get('.euiButton__text').contains('Live');
  });
});

describe('Renders noresult chart', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('It should render no result when there is no data', () => {
    cy.get('[data-test-subj="vizWorkspace__noData"] p')
      .contains('No results found')
      .should('exist');
  });
});

describe('Renders bar charts', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Renders vertical bar chart', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] span').contains('Bar').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').first().click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('host').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').eq(1).click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('count()').click();
    cy.get('#configPanel__chart_options [data-test-subj="comboBoxInput"]').first().click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Vertical').click();
    cy.get('#configPanel__chart_options [data-test-subj="comboBoxInput"]').last().click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Group').click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay * 2);
    cy.get(
      'g.xaxislayer-above > g.xtick text[data-unformatted|="artifacts.opensearch.org"]'
    ).should('exist');
  });

  it('Renders horiztontal bar chart', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Bar').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').first().click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('count()').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').eq(1).click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('host').click();
    cy.get('#configPanel__chart_options [data-test-subj="comboBoxInput"]').first().click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Horizontal').click();
    cy.get('#configPanel__chart_options [data-test-subj="comboBoxInput"]').eq(1).click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Group').click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay * 2);
    cy.get(
      'g.yaxislayer-above > g.ytick text[data-unformatted|="artifacts.opensearch.org"]'
    ).should('exist');
  });
});

describe('Renders line charts', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Renders line chart with threshold', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Line').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').first().click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('host').click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('count()').click();
    cy.get('#configPanel__chart_options [data-test-subj="comboBoxInput"]').click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Lines').click();
    cy.get('#configPanel__Thresholds span').contains('+ Add threadshold').click();
    cy.get('[data-test-subj="nameFieldText"]').type('Max');
    cy.get('[data-test-subj="valueFieldNumber"]').type(3800);
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay * 2);
    cy.get('g.text > g.textpoint text[data-unformatted|="Max"]').should('exist');
    cy.get(
      'g.xaxislayer-above > g.xtick text[data-unformatted|="artifacts.opensearch.org"]'
    ).should('exist');
  });
});

describe('Renders pie charts', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Renders pie chart', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Pie').click();
    cy.wait(delay);
    cy.get('g.pielayer').should('exist');
  });
});

describe('Renders heatmap chart', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Renders heatmap chart with different z-axes', () => {
    querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Heatmap').click();
    cy.wait(delay * 2);
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('count()').click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('g.g-gtitle text[data-unformatted|="count()"]').should('exist');
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('avg(bytes)').click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay * 2);
    cy.get('g.g-gtitle text[data-unformatted|="avg(bytes)"]').should('exist');
  });
});

describe('Renders markdown chart', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Renders markdown chart with test title', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get(
      '[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]'
    ).click();
    cy.get('[data-test-subj="comboBoxOptionsList "] button span').contains('Text').click();
    cy.get('[data-test-subj="workspace__viz_markdown"] h2').contains('Text').should('exist');
    cy.get('textarea.euiMarkdownEditorTextArea').type('## testing title');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.wait(delay * 2);
    cy.get('[data-test-subj="workspace__viz_markdown"] h2')
      .contains('testing title')
      .should('exist');
  });
});

describe('Renders data view', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });

  it('Switch views between data table and visualization workspace', () => {
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"]').click();
    cy.get('[data-test-subj="workspace__dataTable"]').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"]').click();
    cy.get('[data-test-subj="workspace__dataTable"]').should('not.exist');
  });
});

describe('Renders chart and verify Toast message if X-axis and Y-axis values are empty', () => {
  beforeEach(() => {
    landOnEventVisualizations();
  });
  it('Renders chart, clear X-axis and Y-axis value and click on Apply button, Toast message should display with error message', () => {
    querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
    cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
      .type('Bar')
      .type('{enter}');
    cy.wait(delay);
    cy.get('#configPanel__value_options [data-test-subj="comboBoxClearButton"]')
      .eq(0)
      .click({ force: true });
    cy.get('#configPanel__value_options [data-test-subj="comboBoxToggleListButton"]').eq(0).click();
    cy.wait(delay);
    cy.get('#configPanel__value_options [data-test-subj="comboBoxClearButton"]').click({
      multiple: true,
    });
    cy.get('#configPanel__value_options [data-test-subj="comboBoxToggleListButton"]').eq(1).click();
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]')
      .eq(0)
      .should('have.value', '');
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]')
      .eq(1)
      .should('have.value', '');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="euiToastHeader"]')
      .contains('Invalid value options configuration selected.')
      .should('exist');
  });

  it('Renders chart, clear X-axis and Y-axis value and try to save visulization, Toast message should display with error message', () => {
    querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
    cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
      .type('Bar')
      .type('{enter}');
    cy.wait(delay);
    cy.get('#configPanel__value_options [data-test-subj="comboBoxClearButton"]')
      .eq(0)
      .click({ force: true });
    cy.get('#configPanel__value_options [data-test-subj="comboBoxToggleListButton"]').eq(0).click();
    cy.wait(delay);
    cy.get('#configPanel__value_options [data-test-subj="comboBoxClearButton"]').click({
      multiple: true,
    });
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]')
      .eq(0)
      .should('have.value', '');
    cy.get('#configPanel__value_options [data-test-subj="comboBoxInput"]')
      .eq(1)
      .should('have.value', '');
    cy.get('[data-test-subj="eventExplorer__saveManagementPopover"]').click();
    cy.get('[data-test-subj="eventExplorer__querySaveComboBox"]').click();
    cy.get('.euiComboBoxOptionsList__rowWrap .euiFilterSelectItem').eq(0).click();
    cy.get(
      '.euiPopover__panel .euiFormControlLayoutIcons [data-test-subj="comboBoxToggleListButton"]'
    )
      .eq(0)
      .click();
    cy.get('.euiPopover__panel input').eq(1).type(`Test visulization_`);
    cy.get('[data-test-subj="eventExplorer__querySaveConfirm"]').click();
    cy.get('[data-test-subj="euiToastHeader"]')
      .contains('Invalid value options configuration selected.')
      .should('exist');
  });
});

describe('Render Table View', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    querySearch(TEST_QUERIES[3].query, TEST_QUERIES[3].dateRangeDOM);
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"]').click();
  });

  it('Switch visualization for table view and verify table data', () => {
    cy.get('.ag-header-cell-text').contains('max(AvgTicketPrice)').should('exist');
    cy.get('.ag-header-cell-text').contains('DestCountry').should('exist');
    cy.get('.ag-header-cell-text').contains('DestCityName').should('exist');
    cy.get('.ag-header-cell-text').contains('Carrier').should('exist');
  });

  it('Switch visualization for table view and change data table density', () => {
    cy.get('.euiButtonEmpty__text').contains('Density').click();
    cy.get('.euiButtonIcon.euiButtonIcon--primary.euiButtonIcon--xSmall').eq(1).click();
    cy.get('.euiButtonIcon.euiButtonIcon--primary.euiButtonIcon--xSmall').eq(2).click();
  });

  it('Switch visualization for table view and show and hide column', () => {
    cy.get('.euiButtonEmpty__text').contains('Columns').click();
    cy.get('.euiSwitch__label').contains('DestCountry').click();
    cy.get('.ag-header-cell-text').contains('DestCountry').should('not.exist');
    cy.get('.euiSwitch__label').contains('Carrier').click();
    cy.get('.ag-header-cell-text').contains('Carrier').should('not.exist');
    cy.get('.euiSwitch__label').contains('DestCountry').click();
    cy.get('.ag-header-cell-text').contains('DestCountry').should('exist');
  });

  it('Switch visualization for table view and see data in full screen', () => {
    cy.get('.ag-header-cell-text').contains('max(AvgTicketPrice)').should('exist');
    cy.get('.ag-header-cell-text').contains('DestCountry').should('exist');
    cy.get('.ag-header-cell-text').contains('DestCityName').should('exist');
    cy.get('.ag-header-cell-text').contains('Carrier').should('exist');
    cy.get('.euiButtonEmpty__text').contains('Full screen').click();
    cy.wait(delay);
    cy.get('body').type('{esc}');
    cy.wait(delay);
  });

  it('Switch visualization for table view and sort the column data', () => {
    cy.get('.ag-header-cell-text').contains('max(AvgTicketPrice)').click();
    cy.get('.ag-cell-value').contains('125.49737').should('exist');
    cy.get('.ag-header-cell-text').contains('max(AvgTicketPrice)').click();
    cy.get('.ag-cell-value').contains('1199.729').should('exist');
    cy.get('.ag-header-cell-text').contains('DestCountry').click();
    cy.get('.ag-cell-value').contains('AE').should('exist');
  });

  it('Switch visualization for table view and verify pagination link', () => {
    cy.get('[aria-label="Next page"]').click();
    cy.get('.ag-cell-value').contains('Vienna').should('exist');
    cy.get('[aria-label="Previous page"]').click();
    cy.get('.ag-cell-value').contains('Dubai').should('exist');
    cy.get('[aria-label="Page 4"]').contains('4').click();
    cy.get('.ag-cell-value').contains('Edmonton').should('exist');
  });
  it('Switch visualization for table view and rows per page data', () => {
    cy.get('.euiButtonEmpty__text').eq('6').click();
    cy.get('.euiContextMenuItem__text').eq(1).click();
  });
});

describe('Render Time series chart/Line chart and verify Data configurations UI ', () => {
  it('Render line chart and verify Data Configuration Panel', () => {
    renderLineChartForDataConfig();
    DataConfigLineChart();
  });
});

describe('Renders Histogram chart', () =>{
  beforeEach(() => {
    landOnEventVisualizations();
});

it('Renders Histogram chart and save visualization', () => {
  renderHistogramChart();
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero .euiButton__text').eq(2).click();
    cy.wait(delay);
    saveVisualizationAndVerify();
  });

 it('Delete Visualization for Histogram chart from list of saved Visualizations on Event analytics page', () =>{
  deleteVisualization();
 })

 it('Renders Histogram chart, add value parameters and verify Reset button click is working', () => {
  renderHistogramChart();
    cy.get('[data-test-subj="visualizeEditorResetButton"]').click();
  });
});
