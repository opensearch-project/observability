/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />
import {
  delay,
  TEST_QUERIES,
  querySearch,
  landOnEventVisualizations
} from '../../utils/event_constants';

const numberOfWindow = 4;
const renderHeatmapChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[8].query, TEST_QUERIES[8].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Heatmap').type('{enter}');
};

const renderDataConfigForHeatmap = () => {
  cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
  cy.get('.euiComboBoxOption__content').contains('new_timestamp').click();
  cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
  cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
  cy.get('[data-test-subj="comboBoxInput"]').eq(5).click();
  cy.get('.euiComboBoxOption__content').contains('avg(AvgTicketPrice)').click();
  cy.get('.plot-container.plotly').should('exist');
}

describe('Render heatmap chart and verify default behaviour ', () => {
  beforeEach(() => {
    renderHeatmapChart();
  });

  it('Render heatmap chart and verify by default "No results found" is seen', () => {
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
  });

  it('Render heatmap chart and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Legend').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart Styles').click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });

  it('Render heatmap chart and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });
});

describe('Render heatmap chart for data configuration panel', () => {
  beforeEach(() => {
    renderHeatmapChart();
  });

  it('Render heatmap chart and verify data config panel is empty by default', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).should('contain', 'Select a field');
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).should('contain', 'Select a field');
    cy.get('[data-test-subj="comboBoxInput"]').eq(5).should('contain', 'Select a field');
  });

  it('Render heatmap chart and verify data gets render only if data config panel has field selected', () => {
    renderDataConfigForHeatmap();
  });

  it('Render heatmap chart and verify data config panel restrict user to select a duplicate field on dimension field', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('new_timestamp').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(5).click();
    cy.get('.euiComboBoxOption__content').contains('avg(AvgTicketPrice)').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').should('have.length', 1);
    cy.get('.euiComboBoxOption__content').contains('new_timestamp');
  });

  it('Render heatmap chart and verify data config panel Restrict user to select a duplicate field on Metrics field', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('new_timestamp').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(5).click();
    cy.get('.euiComboBoxOption__content').contains('avg(AvgTicketPrice)').click();
    cy.get('.euiFormControlLayoutClearButton__icon').eq(2).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').should('have.length', 1);
  });
});

describe('Render heatmap chart for panel options', () => {
  beforeEach(() => {
    renderHeatmapChart();
    renderDataConfigForHeatmap();
  });

  it('Render heatmap chart and verify the title gets updated according to user input ', () => {
    cy.get('input[name="title"]').type("Heatmap Chart");
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('Heatmap Chart').should('exist');
  });
});

describe('Render heatmap chart for legend', () => {
  beforeEach(() => {
    renderHeatmapChart();
    renderDataConfigForHeatmap();
  });

  it('Render heatmap chart and verify Show Colorscale', () => {
    cy.get('[data-text="Show"]').should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[text-anchor="start"]').should('exist');
    cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[text-anchor="start"]').should('not.exist');
  });
});

describe('Render heatmap chart for chart styles options', () => {
  beforeEach(() => {
    renderHeatmapChart();
    renderDataConfigForHeatmap();
  });

  it('Render heatmap chart and verify by default the color mode is spectrum', () => {
    cy.get('.euiBadge__text').contains('spectrum').should('exist');
    cy.get('stop[stop-color *="rgb(245, 195, 157)"]').should('exist');
  });

  it('Render heatmap chart and change color mode to opacity', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(7).click();
    cy.get('.euiComboBoxOption__content').contains('opacity').click();
    cy.get('stop[stop-color *="rgb(127, 127, 127)"]').should('exist');
  });


  it('Render heatmap chart and verify by default scheme is Reds', () => {
    cy.get('.euiSuperSelectControl').contains('Reds').should('exist');
    cy.get('stop[stop-color *="rgb(245, 195, 157)"]').should('exist');
  });

  it('Render heatmap chart and change scheme color', () => {
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiColorPalettePicker__itemTitle').contains('Greens').click();
    cy.get('stop[stop-color *="rgb(0, 68, 27)"]').should('exist');
  });

});

describe('Render heatmap chart and verify if reset works properly', () => {
  beforeEach(() => {
    renderHeatmapChart();
    renderDataConfigForHeatmap();
  });

  it('Render heatmap chart with all feild data then click on reset and verify reset works properly', () => {
    cy.get('input[placeholder="Title"]').type('Heatmap Chart');
    cy.get('textarea[placeholder="Description"]').type('Description For Heatmap Chart');
    cy.get('.euiButton__text').contains('Hidden').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(7).click();
    cy.get('.euiComboBoxOption__content').contains('opacity').click();
    cy.get('.euiButtonEmpty__text').contains('Reset').click();
    cy.get('input[placeholder="Title"]').should('not.have.value', 'Heatmap Chart');
    cy.get('textarea[placeholder="Description"]').should('not.have.value', 'Description For Heatmap Chart');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('.euiBadge__text').contains('spectrum').should('exist');
  });
});
