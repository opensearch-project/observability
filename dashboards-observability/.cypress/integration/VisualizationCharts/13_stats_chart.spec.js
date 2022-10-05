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
const metricsPrecisionUpdated = 2;
const metricUnit = 'cm' ;
const titleSize = '25.5px';
const titleSizeUpdated = '40px';
const valueSize = '60.8px';
const valueSizeUpdated = '73.0px';

const renderStatsChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Stats').type('{enter}');
};

describe('Render stats chart and verify default behaviour ', () => {
  beforeEach(() => {
    renderStatsChart();
  });

  it('Render stats chart and verify by default the data gets render', () => {
    cy.get('.xy').should('exist');
  });

  it('Render scatter chart and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
    cy.get('.euiIEFlexWrapFix').contains('Thresholds').click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });

  it('Render stats chart and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });
});

describe('Render stats chart for data configuration panel', () => {
  beforeEach(() => {
    renderStatsChart();
  });

  it('Render stats chart and verify data config panel', () => {
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'tags');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'count()');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(2).should('contain', 'avg(bytes)');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(3).should('contain', 'host');
  });

  it('Render stats chart and verify no result found message if the dimension is removed' , () => {
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('.main-svg').contains('No results found').should('not.exist');
  });

  it('Render stats chart and verify data config panel no result found if metric is missing', () => {
      cy.get('.euiText.euiText--extraSmall').eq(0).click();
      cy.get('.euiText.euiText--extraSmall').eq(1).click();
      cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
      cy.get('[data-test-subj="comboBoxInput"]').eq(0).click();
      cy.get('.euiButton__text').contains('Update chart').click();
      cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
      cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
      cy.get('.euiComboBoxOption__content').contains('avg(bytes)').click();
      cy.get('.euiButton__text').contains('Update chart').click();
      cy.get('.main-svg').contains('No results found').should('not.exist');
    });
});

describe('Render stats chart for panel options', () => {
  beforeEach(() => {
    renderStatsChart();
  });

  it('Render stats chart and verify the title gets updated according to user input ', () => {
    cy.get('input[name="title"]').type("stats chart");
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('stats chart').should('exist');
  });
});

describe('Render stats chart verfiy functionality for Tooltip mode', () => {
  beforeEach(() => {
    renderStatsChart();
  });
  
  it('Render stats chart and verfiy the Show and Hidden Tooltip modes', () => {
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(0).should('have.text', 'Show');
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(1).should('have.text', 'Hidden')
    .click();
  });
});

describe('Render stats chart verfiy functionality for Tooltip text', () => {
  beforeEach(() => {
    renderStatsChart();
  });

  it('Render stats chart and verfiy the Tootltip text -> All , Dimension , Metric', () => {
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(2).should('have.text', 'All');
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(3).should('have.text', 'Dimension')
    .click();
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(4).should('have.text', 'Metrics')
    .click();
  });
});

describe('Render stats chart for Chart Styles ', () => {
  beforeEach(() => {
    renderStatsChart();
  });

  it('Render stats chart and verify the various chart type selected', () => {
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(5).should('have.text', 'Auto');
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(6).should('have.text', 'Horizontal').click();
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(7).should('have.text', 'Text mode').click();
  });

  it('Render stats chart and verify the various chart orientation selected', () => {
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(8).should('have.text', 'Auto');
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(9).should('have.text', 'Horizontal').click();
    cy.get('.euiButton__text.euiButtonGroupButton__textShift').eq(10).should('have.text', 'Vertical').click();
  });

  it('Render stats chart and verify Metric unit and Metric Precision on chart ', () => {
    cy.get('[data-test-subj="valueFieldText"]').click().type(metricUnit);
    cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(metricsPrecisionUpdated);
    cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
  });

  it('Render stats chart and verify behaviour for Title size and Value size on chart ', () => {
    cy.get('.annotation-text').eq(0).should('have.css', 'font-size', titleSize);
    cy.get('.annotation-text').eq(2).should('have.css', 'font-size', titleSize);
    cy.get('.annotation-text').eq(4).should('have.css', 'font-size', titleSize);
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click().type(titleSizeUpdated);
    cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
    cy.get('.annotation-text').eq(1).should('have.css', 'font-size', valueSize);
    cy.get('.annotation-text').eq(3).should('have.css', 'font-size', valueSize);
    cy.get('.annotation-text').eq(5).should('have.css', 'font-size', valueSize);
    cy.get('[data-test-subj="valueFieldNumber"]').eq(2).click().type(valueSizeUpdated);
    cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
  });
});

describe('Render stats chart and verify the Text Mode options' , () => {
  beforeEach(() => {
      renderStatsChart();
  });

  it('Render stats chart and verify text modes ', () => {
      cy.get('[data-text="Names"]').should('have.text', 'Names').click();
      cy.get('[data-text="Values"]').should('have.text', 'Values').click();
      cy.get('[data-text="Values + Names"]').should('have.text', 'Values + Names').click();
      cy.wait(delay);
  });
});

describe('Render stats chart and verify the +add threshold button option' , () => {
  beforeEach(() => {
      renderStatsChart();
  });

  it('Render stats chart and verify the +Add Threshold button for color picker' , () => {
      cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
      cy.get('.euiColorPickerSwatch.euiColorPicker__swatchSelect').eq(5).click();
      cy.wait(delay);
  });
});

describe('Render stats chart and verify the reset button' , () => {
  beforeEach(() => {
      renderStatsChart();
  });

  it('Render stats chart and test the Reset button functionality' , () => {
      cy.get('[data-test-subj="valueFieldText"]').click().type(metricUnit);
      cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(metricsPrecisionUpdated);
      cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click().type(titleSizeUpdated);
      cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
      cy.get('[data-test-subj="valueFieldNumber"]').eq(2).click().type(valueSizeUpdated);
      cy.get('.euiSpacer.euiSpacer--s').eq(12).click();
      cy.get('[data-test-subj="euiColorPickerAnchor"]').click();
      cy.get('.euiColorPickerSwatch.euiColorPicker__swatchSelect').eq(5).click();
      cy.get('[data-test-subj="visualizeEditorResetButton"]').click();
  });
});