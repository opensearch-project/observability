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

const renderHeatMap = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[5].query, TEST_QUERIES[5].dateRangeDOM);
  cy.get('[aria-label="config chart selector"]').click().type('Heatmap').type('{enter}');
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

describe('Render Heatmap and verify default behavior', () => {
  before(() => {
    renderHeatMap();
  });


  it('Verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Configuration').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('series').should('exist');
    cy.get('.euiText.euiText--small:contains(Click to add)').should(
      'have.length',
      0
    );
    cy.get('.euiText.euiText--small.field_text').should('contain', 'avg FlightDelayMin');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'DestCountry');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'DestCityName');
  });

  it('Color scale options', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').eq(5).contains('Show colorscale');
    cy.get('[data-text="Show"]').eq(0).contains('Show');
    cy.get('[data-text="Hidden"]').eq(0).contains('Hidden');
  });

  it('Options under Tooltip options section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').should('exist');
    cy.get('[data-text="Show"]').eq(1).contains('Show');
    cy.get('[data-text="Hidden"]').eq(1).contains('Hidden');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Tooltip text');
    cy.get('[data-text="All"]').contains('All');
    cy.get('[data-text="Dim 1"]').contains('Dim 1');
    cy.get('[data-text="Dim 2"]').contains('Dim 2');
    cy.get('[data-text="Metrics"]').contains('Metrics');
  });

  it('Options under Chart Styles section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(6).contains('Color mode');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(7).contains('Scheme');
  });

  it('Table view should be enabled for heatmap', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });
});

describe('Save and Delete Visualization', () => {
  before(() => {
    renderHeatMap();
  });

  it('Render heatmap, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Color mode section', () => {
  before(() => {
    renderHeatMap();
  });

  it('Render heatmap and check color mode', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('opacity').click();
    cy.get('[data-test-subj="euiColorPickerAnchor"]').should('exist');
    cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
    cy.get('.euiColorPickerSwatch').eq(1).should('exist');
    cy.get('.euiColorPickerSwatch').eq(1).click();
  });
});

describe('Renders heatmap and verify data config panel', () => {
  before(() => {
    landOnEventVisualizations();
    renderHeatMap();
  });

  it('Validate series and breakdown section', () => {
    cy.get('.euiText.euiText--small.field_text').eq(0).click()
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(0).should('contain', 'avg');
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).should('contain', 'FlightDelayMin');
    cy.get('[placeholder="Custom label"]').should('have.value', '');
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click().type('AvgTicketPrice').type('{enter}');
    cy.get('[placeholder="Custom label"]').click().type('CustomTicketPrice');
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero').eq(4).click();
    cy.get('.euiText.euiText--small.field_text').eq(0).should('contain', 'CustomTicketPrice');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should(
      'have.value',
      "source=opensearch_dashboards_sample_data_flights | stats avg(AvgTicketPrice) as CustomTicketPrice by DestCountry, DestCityName"
    );
    cy.get('[aria-label="clear-field"]').eq(0).click();
    cy.get('[aria-label="clear-field"]').eq(1).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="vizWorkspace__noData"]').should('exist')
  });
});
