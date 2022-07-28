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
const legendSize = 20;
const pointSize = 30;
const pointSizeUpdated = 35;
const lineWidth = 7;
const lineWidthUpdated = 9;
const fillOpacity = 10;
const fillOpacityUpdated = 50;
const thresholdValue = 50;

const renderTimeSeriesChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[8].query, TEST_QUERIES[8].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Time series').type('{enter}');
};

describe('Render time series and verify default behaviour ', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and verify by default the data gets render', () => {
    cy.get('.xy').should('exist');
  });

  it('Render time series and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Legend').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
    cy.get('.euiIEFlexWrapFix').contains('Color theme').click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });

  it('Render time series and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });
});

describe('Render time series for data configuration panel', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and verify data config panel', () => {
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'new_timestamp');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'max(FlightTimeMin)');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(2).should('contain', 'avg(AvgTicketPrice)');
  });

  it('Render time series and verify data config panel restrict user to select a duplicate field on dimension field', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').should('have.length', 1);
    cy.get('.euiComboBoxOption__content').contains('new_timestamp');
  });

  it('Render time series and verify data config panel restrict user to select a duplicate field on metrics field', () => {
    cy.get('.euiText.euiText--extraSmall').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').should('not.contain', 'new_timestamp');
    cy.get('.euiComboBoxOption__content').should('have.length', 2);
  });

  it('Render time series and verify data config panel no result found if metric is missing', () => {
    cy.get('.euiText.euiText--extraSmall').eq(0).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
    cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
    cy.get('.main-svg').contains('No results found').should('not.exist');
  });
});

describe('Render time series for panel options', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and verify the title gets updated according to user input ', () => {
    cy.get('input[name="title"]').type("Time Series Chart");
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('Time Series Chart').should('exist');
  });
});

describe('Render time series for legend', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-unformatted="max(bytes)"]').should('not.exist');
  });

  it('Render time series and verify legends for position Right and Bottom', () => {
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
  });

  it('Render time series and increase Legend Size', () => {
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.legendtext').should('have.css', 'font-size', '20px');
  });
});

describe('Render time series for Chart Styles ', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and verify chart style of Lines Mode with Smooth Interpolation  ', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with Line Mode and Smooth Interpolation');
    cy.get('[data-text="Lines"]').should('have.text', 'Lines');
    cy.get('[data-text="Lines"] [data-test-subj="lines"]').should('have.attr', 'checked');
    cy.get('[data-text="Smooth"]').should('have.text', 'Smooth');
    cy.get('[data-text="Smooth"] [data-test-subj="spline"]').should('have.attr', 'checked');
  });

  it('Render time series and verify chart style of Lines Mode with Smooth Interpolation with higher Line width and Fill Opacity ', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with Line Mode and Smooth Interpolation');
    cy.get('[data-text="Lines"]').should('have.text', 'Lines');
    cy.get('[data-text="Lines"] [data-test-subj="lines"]').should('have.attr', 'checked');
    cy.get('[data-text="Smooth"]').should('have.text', 'Smooth');
    cy.get('[data-text="Smooth"] [data-test-subj="spline"]').should('have.attr', 'checked');
    cy.get('input[type="range"]').eq(0)
      .then($el => $el[0].stepUp(lineWidth))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(0).should('have.value', lineWidthUpdated)
    cy.get('input[type="range"]').eq(1)
      .then($el => $el[0].stepUp(fillOpacity))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(1).should('have.value', fillOpacityUpdated)
  });

  it('Render time series and verify chart style of Lines Mode with Linear Interpolation  ', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with Line Mode and Linear Interpolation');
    cy.get('[data-text="Lines"]').should('have.text', 'Lines');
    cy.get('[data-text="Lines"] [data-test-subj="lines"]').should('have.attr', 'checked');
    cy.get('[data-text="Linear"]').should('have.text', 'Linear').click();
    cy.get('[data-text="Linear"]').should('have.text', 'Linear');
    cy.get('[data-text="Linear"] [data-test-subj="linear"]').should('not.have.attr', 'checked');
  });

  it('Render time series and verify chart style of Lines Mode with Step before Interpolation  ', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with Line Mode and Step before Interpolation');
    cy.get('[data-text="Lines"]').should('have.text', 'Lines');
    cy.get('[data-text="Lines"] [data-test-subj="lines"]').should('have.attr', 'checked');
    cy.get('[data-text="Step before"]').should('have.text', 'Step before').click();
    cy.get('[data-text="Step before"] [data-test-subj="Step before"]').should('not.have.attr', 'checked');
  });

  it('Render time series and verify chart style of Lines Mode with Step after Interpolation  ', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with Line Mode and Step after Interpolation');
    cy.get('[data-text="Lines"]').should('have.text', 'Lines');
    cy.get('[data-text="Lines"] [data-test-subj="lines"]').should('have.attr', 'checked');
    cy.get('[data-text="Step after"]').should('have.text', 'Step after').click();
    cy.get('[data-text="Step after"] [data-test-subj="Step after"]').should('not.have.attr', 'checked');
  });

  it('Render ltime serires and verify chart style of Marker Mode', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with chart style of Points');
    cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
    cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('not.have.attr', 'checked');

  });

  it('Render time series and verify chart style of Marker Mode with larger Point size', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with chart style of Points');
    cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
    cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('not.have.attr', 'checked');
    cy.get('input[type="range"]')
      .then($el => $el[0].stepUp(pointSize))
      .trigger('change')
    cy.get('.euiRangeSlider').should('have.value', pointSizeUpdated)

  });

  it('Render time series and verify chart style of Lines+Marker Mode', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with chart style of Lines and Marker');
    cy.get('[data-text="Lines + Markers"]').should('have.text', 'Lines + Markers').click();
    cy.get('[data-text="Lines + Markers"] [data-test-subj="lines+markers"]').should('not.have.attr', 'checked');

  });

  it('Render time series and verify chart style of Lines+Marker Mode with Line Width, Fill Opacity and Point Size', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Time Series');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Time Series with chart style of Lines and Marker');
    cy.get('[data-text="Lines + Markers"]').should('have.text', 'Lines + Markers').click();
    cy.get('[data-text="Lines + Markers"] [data-test-subj="lines+markers"]').should('not.have.attr', 'checked');
    cy.get('input[type="range"]').eq(0)
      .then($el => $el[0].stepUp(lineWidth))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(0).should('have.value', lineWidthUpdated)
    cy.get('input[type="range"]').eq(1)
      .then($el => $el[0].stepUp(fillOpacity))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(1).should('have.value', fillOpacityUpdated)
    cy.get('input[type="range"]').eq(2)
      .then($el => $el[0].stepUp(pointSize))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(2).should('have.value', pointSizeUpdated)
  });
});

describe('Render time series chart for color theme', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series chart and "Add Color theme"', () => {
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(7).click();
    cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
    cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');

  });
});

describe('Render time series and work with Thresholds', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series and add threshold', () => {

    cy.get('.euiButton__text').contains('+ Add threshold').click();
    cy.get('[data-test-subj="nameFieldText"]').type('Time Series Threshold');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
    cy.get('[data-unformatted="Time Series Threshold"]').should('be.visible');
    cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');
  });
});

describe('Render time series and verify if reset works properly', () => {
  beforeEach(() => {
    renderTimeSeriesChart();
  });

  it('Render time series with all feild data then click on reset and verify reset works properly', () => {
    cy.get('input[placeholder="Title"]').type('Time Series Chart');
    cy.get('textarea[placeholder="Description"]').type('Description For Time Series Chart');
    cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
    cy.get('[data-text="Linear"]').should('have.text', 'Linear').click();
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(7).click();
    cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
    cy.get('.euiButton__text').contains('+ Add threshold').click();
    cy.get('[data-test-subj="nameFieldText"]').type('Time Series Threshold');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
    cy.get('.euiButtonEmpty__text').contains('Reset').click();
    cy.get('input[placeholder="Title"]').should('not.have.value', 'Time Series Chart');
    cy.get('textarea[placeholder="Description"]').should('not.have.value', 'Description For Time Series Chart')
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).should('have.value', '');
  });
});
