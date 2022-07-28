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
  const titleSize = 30;
  const valueSize = 20;
  const thresholdValue = 50;
  
  const renderGaugeChart = () => {
    landOnEventVisualizations();
    querySearch(TEST_QUERIES[8].query, TEST_QUERIES[8].dateRangeDOM);
    cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Gauge').type('{enter}');
  };
  
  describe('Render gauge chart and verify default behaviour ', () => {
    beforeEach(() => {
      renderGaugeChart();
    });
  
    it('Render gauge chart and verify by default the data gets render', () => {
      cy.get('.main-svg').should('exist');
    });
  
    it('Render gauge chart and verify you see data configuration panel and chart panel', () => {
      cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
      cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
      cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
      cy.get('.euiIEFlexWrapFix').contains('Chart Styles').click();
      cy.get('.euiIEFlexWrapFix').contains('Thresholds').click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });
  
    it('Render gauge chart and verify the data configuration panel and chart panel are collapsable', () => {
      cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
      cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
      cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });
  });
  
  describe('Render gauge chart for data configuration panel', () => {
    beforeEach(() => {
      renderGaugeChart();
    });
  
    it('Render gauge chart and verify data config panel', () => {
      cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'new_timestamp');
      cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'max(FlightTimeMin)');
      cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(2).should('contain', 'avg(AvgTicketPrice)');
    });
  
    it('Render gauge chart and verify data config panel restrict user to select a duplicate field on dimension field', () => {
      cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
      cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
      cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
      cy.get('.euiComboBoxOption__content').should('have.length', 1);
      cy.get('.euiComboBoxOption__content').contains('new_timestamp');
    });
  
    it('Render gauge chart and verify data config panel Restrict user to select a duplicate field on Metrics field', () => {
      cy.get('.euiText.euiText--extraSmall').eq(1).click();
      cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
      cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
      cy.get('.euiComboBoxOption__content').should('not.contain', 'new_timestamp');
      cy.get('.euiComboBoxOption__content').should('have.length', 2);
    });
  
    it('Render gauge chart and verify data config panel no result found if metric is missing', () => {
      cy.get('.euiText.euiText--extraSmall').eq(0).click();
      cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
      cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
      cy.get('.euiComboBoxOption__content').contains('max(FlightTimeMin)').click();
      cy.get('.main-svg').contains('No results found').should('not.exist');
    });
  });
  
  describe('Render gauge chart for panel options', () => {
    beforeEach(() => {
      renderGaugeChart();
    });
  
    it('Render gauge chart and verify the title gets updated according to user input ', () => {
      cy.get('input[name="title"]').type("Gauge Chart");
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('.gtitle').contains('Gauge Chart').should('exist');
    });
  
    it('Render gauge chart and verify by default Number of gauges are 1 and its value can be updated ', () => {
      cy.get('[placeholder="Number of gauges"]').should('contain.value', 1);
      cy.get('.title').eq(0).contains('max(FlightTimeMin)');
      cy.get('.title').eq(1).contains('avg(AvgTicketPrice)');
      cy.get('[placeholder="Number of gauges"]').clear();
      cy.get('[placeholder="Number of gauges"]').type(2);
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('.title').eq(0).contains('max(FlightTimeMin)');
      cy.get('.title').eq(1).contains('max(FlightTimeMin)');
    });
  });
  
  describe('Render Gauge Chart for chart styles', () => {
    beforeEach(() => {
      renderGaugeChart();
    });
  
    it('Render gauge chart and verify by default orientation is Auto and it can be changed to vertical and horizontal ', () => {
      cy.get('[data-text="Auto"] [data-test-subj="auto"]').should('have.attr', 'checked');
      cy.get('.euiButton__text').contains('Vertical').click();
      cy.get('.euiButton__text').contains('Horizontal').click();
    });
  
    it('Render gauge chart and verify by default legend placement is center and it can be changed to right and left', () => {
      cy.get('[data-text="Center"] [data-test-subj="center"]').should('have.attr', 'checked');
      cy.get('.euiButton__text').contains('Right').click();
      cy.get('.euiButton__text').contains('Left').click();
    });
  
    it('Render gauge chart and change title size then verify the update on chart', () => {
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).should('have.value', '');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).type(titleSize);
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('[data-test-subj="valueFieldNumber"]').should('have.value', titleSize);
    });
  
    it('Render gauge chart and change value size then verify the update on chart', () => {
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).should('have.value', '');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(valueSize);
      cy.get('textarea[name="description"]').should('exist').click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).should('have.value', valueSize);
    });
  });
  
  describe('Render gauge chart and work with threshold', () => {
    beforeEach(() => {
      renderGaugeChart();
    });

    it('Render gauge chart and add threshold then verify by default the threshold is not seen', () => {
      cy.get('.euiButton__text').contains('Update chart').click();
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('Gauge Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
      cy.get('[data-unformatted="Gauge Threshold"]').should('not.be.visible');
    });
  
    it('Render gauge chart and add threshold then verify the threshold label are seen after show threshold button enabled ', () => {
      cy.get('.euiButton__text').contains('Update chart').click();
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('Gauge Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
      cy.get('.euiSwitch__label').contains('Show threshold labels').click();
      cy.get('[data-unformatted="Gauge Threshold"]').should('be.visible');
    });
  
    it('Render gauge chart and add threshold then verify the threshold marker are seen after show threshold button enabled ', () => {
      cy.get('.euiButton__text').contains('Update chart').click();
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('Gauge Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
      cy.get('.euiSwitch__label').contains('Show threshold markers').click();
      cy.get('path[style*="rgb(252, 5, 5)"]').eq(1).should('exist');
      cy.get('.threshold-arc').find('path[style*="rgb(252, 5, 5)"]').should('have.length', 2);
    });
  });
  
  describe('Render gauge chart and verify if reset works properly', () => {
    beforeEach(() => {
      renderGaugeChart();
    });
  
    it('Render gauge chart with all feild data then click on reset and verify reset works properly', () => {
      cy.get('input[placeholder="Title"]').type('Gauge Chart');
      cy.get('textarea[placeholder="Description"]').type('Description For Gauge Chart');
      cy.get('.euiButton__text').contains('Vertical').click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).type(titleSize);
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(valueSize);
      cy.get('.euiButton__text').contains('+ Add threshold').click();
      cy.get('[data-test-subj="nameFieldText"]').type('Gauge Threshold');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(2).type(thresholdValue);
      cy.get('.euiSwitch__label').contains('Show threshold labels').click();
      cy.get('.euiSwitch__label').contains('Show threshold markers').click();
      cy.get('.euiButtonEmpty__text').contains('Reset').click();
      cy.get('input[placeholder="Title"]').should('not.have.value', 'Gauge Chart');
      cy.get('textarea[placeholder="Description"]').should('not.have.value', 'Description For Gauge Chart')
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).should('have.value', '');
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).should('have.value', '');
      cy.get('button.euiSwitch__button[aria-checked="false"]').should('exist').should('have.length', 3);
    });
  });
  