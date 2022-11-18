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

const renderTimeSeriesChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[6].query, TEST_QUERIES[6].dateRangeDOM);
  cy.get('[aria-label="config chart selector"]').click().type('Time series').type('{enter}');
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

describe('Render Time series chart and verify default behavior', () => {
  before(() => {
    renderTimeSeriesChart();
  });

  it('Render Timesseries chart and verify the default data', () => {
    cy.get('.plot-container.plotly').should('exist');
  });

  it('Verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Configuration').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('series').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('breakdowns').should('exist');
    cy.get('.euiText.euiText--small:contains(Click to add)').should(
      'have.length',
      2
    );
    cy.get('.euiText.euiText--small.field_text').should('contain', 'count');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'span(timestamp, 1 d)');
  });

  it('Options under Legend section', () => {
    cy.get('#configPanel__legend').contains('Legend');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(4).contains('Show legend');
    cy.get('[data-text="Show"]').eq(0).contains('Show');
    cy.get('[data-text="Hidden"]').eq(0).contains('Hidden');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Position');
    cy.get('[data-text="Right"]').contains('Right');
    cy.get('[data-text="Bottom"]').contains('Bottom');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Legend size').should('exist');
  });

  it('Options under Tooltip options section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').should('exist');
    cy.get('[data-text="Show"]').eq(1).contains('Show');
    cy.get('[data-text="Hidden"]').eq(1).contains('Hidden');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Tooltip text');
    cy.get('[data-text="All"]').contains('All');
    cy.get('[data-text="Dimension"]').contains('Dimension');
    cy.get('[data-text="Series"]').contains('Series');
  });

  it.only('Options under Chart Styles section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(9).contains('Mode');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(10).contains('Interpolation');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(11).contains('Line width');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(12).contains('Fill opacity'); 
    cy.get('.euiTitle.euiTitle--xxsmall').eq(13).contains('Label size');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(14).contains('Rotate labels');
  });

  it('Table view should be enabled for timeseries chart', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });

  it('verify legends for Position Right and Bottom', () => {
    cy.get('[data-text="Right"]').should('have.text', 'Right');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });

  it('verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').eq(0).should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').eq(0).should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click({ force: true, multiple: true });
  });
});

describe('Save and Delete Visualization', () => {
  before(() => {
    renderTimeSeriesChart();
  });

  it('Render Series chart, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Color Theme section', () => {
  before(() => {
    renderTimeSeriesChart();
  });

  it('Render timeseries and "Add Color theme"', () => {
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('count()').click();
    cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');
  });
});

describe('Change series side', () => {
  before(() => {
    renderTimeSeriesChart();
  });

  it('Render timeseries and upadte series position', () => {
    cy.get('.euiButton__text').contains('+ Add label position').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('count()').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(2).click();
    cy.get('.euiComboBoxOption__content').contains('Right').click();
  });
});

describe('Renders Timeseries and check for empty placeholder', () => {
  before(() => {
    landOnEventVisualizations();
    renderTimeSeriesChart();
  });

  it('Check for empty placeholder in case of no timestamp', () => {
    cy.get('[aria-label="clear-field"]').eq(1).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="vizWorkspace__noData"]').should('exist')
  });
})

describe('Renders Timeseries and verify data config panel', () => {
  before(() => {
    landOnEventVisualizations();
    renderTimeSeriesChart();
  });

  it('Validate series and breakdown section', () => {
    cy.get('[aria-label="add-field"]').eq(0).click();
    cy.wait(delay);
    cy.get('[aria-label="aggregation input"]').should('contain', 'count');
    cy.get('.euiComboBoxPlaceholder').should('contain', 'Select a field');
    cy.get('[placeholder="Custom label"]').should('have.value', '');
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click().type('bytes').type('{enter}');
    cy.get('[placeholder="Custom label"]').click().type('customBytes');
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero').eq(4).click();
    cy.get('.euiText.euiText--small.field_text').eq(1).should('contain', 'customBytes');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should(
      'have.value',
      "source = opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count(), count(bytes) as customBytes by span(timestamp, 1d)"
    );
    cy.get('[aria-label="add-field"]').eq(1).click();
    cy.get('.euiComboBoxPlaceholder').should('contain', 'Select a field');
    cy.get('[data-test-subj="comboBoxInput"]').eq(0).click().type('host').type('{enter}');
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero').eq(4).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should(
      'have.value',
      "source = opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count(), count(bytes) as customBytes by span(timestamp, 1d), host"
    );
  });

});
