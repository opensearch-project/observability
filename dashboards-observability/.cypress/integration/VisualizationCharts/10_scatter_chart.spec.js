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
  const rotateLevel = 45;
  const thresholdValue = 50;

  const renderScatterChart = () => {
    landOnEventVisualizations();
    querySearch(TEST_QUERIES[6].query, TEST_QUERIES[6].dateRangeDOM);
    cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('scatter').type('{enter}');
  };
  
  describe('Render scatter chart and verify default behaviour ', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and verify by default the data gets render', () => {
      cy.get('.xy').should('exist');
    });
  
    it('Render scatter chart and verify you see data configuration panel and chart panel', () => {
      cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
      cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
      cy.get('.euiIEFlexWrapFix').contains('Legend').click();
      cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
      cy.get('.euiIEFlexWrapFix').contains('Color theme').click();
      cy.get('.euiIEFlexWrapFix').contains('Thresholds').click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });
  
    it('Render scatter chart and verify the data configuration panel and chart panel are collapsable', () => {
      cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
      cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });
  });
  
  describe('Render scatter chart for data configuration panel', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and verify data config panel', () => {
      cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'span(timestamp,1d)');
      cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'count()');
    });
  
    it('Render scatter chart and verify data config panel no result found if metric is missing', () => {
      cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
      cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
      cy.get('.euiComboBoxOption__content').contains('count()').click();
      cy.get('.main-svg').contains('No results found').should('not.exist');
    });
  });
  
  describe('Render scatter chart for panel options', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and verify the title gets updated according to user input ', () => {
      cy.get('input[name="title"]').type("scatter Chart");
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('.gtitle').contains('scatter Chart').should('exist');
    });
  });
  
  describe('Render scatter chart for legend', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and verify legends for Show and Hidden', () => {
      cy.get('[data-text="Show"]').should('have.text', 'Show');
      cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
      cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
      cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
      cy.get('[data-unformatted="max(bytes)"]').should('not.exist');
    });
  
    it('Render scatter chart and verify legends for position Right and Bottom', () => {
      cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
      cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
      cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
    });
  
    it('Render scatter chart and increase Legend Size', () => {
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('.legendtext').should('have.css', 'font-size', '20px');
    });
  });
  
  describe('Render scatter chart for Chart Styles ', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render ltime serires and verify chart style of Marker Mode', () => {
      cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
      cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for scatter chart with chart style of Points');
      cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
      cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('have.attr', 'checked');
  
    });
  
    it('Render scatter chart and verify chart style of Marker Mode with larger Point size', () => {
      cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
      cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for scatter chart with chart style of Points');
      cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
      cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('have.attr', 'checked');
      cy.get('input[type="range"]')
        .then($el => $el[0].stepUp(pointSize))
        .trigger('change')
      cy.get('.euiRangeSlider').should('have.value', pointSizeUpdated)
  
    });
  
    it('Render scatter chart and verify chart style of Lines+Marker Mode', () => {
      cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
      cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for scatter chart with chart style of Lines and Marker');
      cy.get('[data-text="Lines + Markers"]').should('have.text', 'Lines + Markers').click();
      cy.get('[data-text="Lines + Markers"] [data-test-subj="lines+markers"]').should('not.have.attr', 'checked');
  
    });
  
    it('Render scatter chart and verify chart style of Lines+Marker Mode with Line Width, Fill Opacity and Point Size', () => {
      cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
      cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for scatter chart with chart style of Lines and Marker');
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
      cy.get('input[type="range"]').eq(3)
      .then($el => $el[0].stepUp(rotateLevel))
      .trigger('change')
    cy.get('.euiRangeSlider').eq(3).should('have.value', rotateLevel)
    });
  });
  
  describe('Render scatter chart for color theme', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and "Add Color theme"', () => {
      cy.get('.euiButton__text').contains('+ Add color theme').click();
      cy.wait(delay);
      cy.get('[data-test-subj="comboBoxInput"]').eq(5).click();
      cy.get('.euiComboBoxOption__content').contains('count()').click();
      cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');
  
    });
  });
  
  describe('Render scatter chart and work with Thresholds', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart and add threshold', () => {
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('scatter chart Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(thresholdValue);
      cy.get('[data-unformatted="scatter chart Threshold"]').should('be.visible');
      cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');
    });
  });
  
  describe('Render scatter chart and verify if reset works properly', () => {
    beforeEach(() => {
      renderScatterChart();
    });
  
    it('Render scatter chart with all feild data then click on reset and verify reset works properly', () => {
      cy.get('input[placeholder="Title"]').type('scatter chart');
      cy.get('textarea[placeholder="Description"]').type('Description For scatter chart');
      cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
      cy.get('.euiButton__text').contains('+ Add color theme').click();
      cy.wait(delay);
      cy.get('[data-test-subj="comboBoxInput"]').eq(5).click();
      cy.get('.euiComboBoxOption__content').contains('count()').click();
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('scatter chart Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(thresholdValue);
      cy.get('.euiButtonEmpty__text').contains('Reset').click();
      cy.get('input[placeholder="Title"]').should('not.have.value', 'scatter chart');
      cy.get('textarea[placeholder="Description"]').should('not.have.value', 'Description For scatter chart')
      cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
      cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).should('have.value', '');
    });
  });
  