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

const renderGaugeChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
  cy.get('[aria-label="config chart selector"]').click().type('Gauge').type('{enter}');
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

describe('Render gauge chart and verify default behavior', () => {
  before(() => {
    renderGaugeChart();
  });

  it('Verify the default data', () => {
    cy.get('.plot-container.plotly').should('exist');
  });

  it('Verify Data Configuration panel default behavior', () => {
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Configuration').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('series').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('breakdowns').should('not.exist');
    cy.get('.euiText.euiText--small:contains(Click to add)').should(
      'have.length',
      2
    );
    cy.get('.euiText.euiText--small.field_text').should('contain', 'count');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'avg bytes');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'host');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'tags');
  });

  it('Options under Chart Styles section', () => {
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').eq(3).contains('Orientation')
    cy.get('[data-text="Auto"]').contains('Auto')
    cy.get('[data-text="Vertical"]').contains('Vertical')
    cy.get('[data-text="Horizontal"]').contains('Horizontal')
    cy.get('[data-test-subj="auto"]').should('have.attr', 'checked')
    cy.get('.euiTitle.euiTitle--xxsmall').eq(4).contains('Legend placement');
    cy.get('[data-text="Center"]').eq(0).contains('Center');
    cy.get('[data-text="Right"]').contains('Right');
    cy.get('[data-text="Left"]').contains('Left');
    cy.get('[data-test-subj="center"]').should('have.attr', 'checked')
    cy.get('.euiTitle.euiTitle--xxsmall').eq(5).contains('Title size')
    cy.get('.euiTitle.euiTitle--xxsmall').eq(6).contains('Value size')
    cy.get('.euiSwitch__label').eq(1).contains('Show threshold labels')
    cy.get('.euiSwitch__label').eq(2).contains('Show threshold markers')
  });

  it('Table view for gauge chart', () => {
    cy.get('.euiSwitch__label').contains('Table view').should('exist');
    cy.get('[data-test-subj="workspace__dataTableViewSwitch"][aria-checked="false"]').click();
    cy.get('.ag-header.ag-pivot-off').should('exist');
  });
});

describe('Save and Delete Visualization', () => {
  before(() => {
    renderGaugeChart();
  });

  it('Render Series chart, Save and Delete Visualization', () => {
    saveVisualizationAndVerify();
    deleteVisualization();
  });
});

describe('Verify no. of gauges option', () => {
  before(() => {
    renderGaugeChart();
  });

  it('Render gauge chart and verify no. of gauge input', () => {
    cy.get('.euiFormLabel.euiFormRow__label').eq(2).contains('Number of gauges')
    cy.get('[name="numberOfGauges"]').should('have.value', '1')
    cy.get('[name="numberOfGauges"]').clear()
    cy.get('[name="numberOfGauges"]').type(3)
  });
});

describe('Renders gauge chart and check for empty placeholder', () => {
  before(() => {
    landOnEventVisualizations();
    renderGaugeChart();
  });

  it('Check for empty placeholder in case of no series', () => {
    cy.get('[aria-label="clear-field"]').eq(0).click();
    cy.wait(delay);
    cy.get('[aria-label="clear-field"]').eq(0).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="vizWorkspace__noData"]').should('exist')
  });
})

describe('Renders gauge chart and verify data config panel', () => {
  before(() => {
    landOnEventVisualizations();
    renderGaugeChart();
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
    cy.get('.euiText.euiText--small.field_text').eq(2).should('contain', 'customBytes');
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should(
      'have.value',
      "source = opensearch_dashboards_sample_data_logs | stats count(), avg(bytes), count(bytes) as customBytes by host, tags"
    );
    cy.get('[aria-label="add-field"]').eq(1).click();
    cy.get('.euiComboBoxPlaceholder').should('contain', 'Select a field');
    cy.get('[data-test-subj="comboBoxInput"]').eq(0).click().type('extension').type('{enter}');
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero').eq(4).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').should(
      'have.value',
      "source = opensearch_dashboards_sample_data_logs | stats count(), avg(bytes), count(bytes) as customBytes by host, tags, extension"
    );
  });
});

describe('Verify Threshold for gauge chart', () => {
  before(() => {
    renderGaugeChart();
  });
  it('Verify Add threshold', () => {
    cy.get('[aria-controls="configPanel__Thresholds"]').should('exist')
    cy.get('[data-test-subj="addThresholdButton"]').should('exist')
    cy.get('[data-test-subj="addThresholdButton"]').click()
    cy.wait(delay)
    cy.get('[data-test-subj="euiColorPickerAnchor"]').should('exist')
    cy.get('[arial-label="Input threshold name"]').should('exist')
    cy.get('[data-test-subj="valueFieldNumber"]').eq(2).should('have.value', '0')
    cy.get('[arial-label="Input threshold name"]').click()
    cy.get('[arial-label="Input threshold name"]').type("Test Threshold")
    cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type('100')
    cy.get('.euiSwitch__label').eq(2).click()
    cy.get('[data-test-subj="addThresholdButton"]').should('have.attr', 'disabled')
    cy.get('.euiFlexItem.euiFlexItem--flexGrow1').click()
    cy.get('[data-test-subj="addThresholdButton"]').should('not.have.attr', 'disabled')
  })
})
