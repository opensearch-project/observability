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
} from '../../utils/event_constants';

const numberOfWindow = 4;
const legendSize = 20;
const pointSize = 30;
const pointSizeUpdated = 40;
const lineWidth = 7;
const lineWidthUpdated = 9;
const fillOpacity = 10;
const fillOpacityUpdated = 80;
const rotateLevel = 45;
const thresholdValue = 50;

const renderScatterChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[6].query, TEST_QUERIES[6].dateRangeDOM);
  cy.get(
    '.cp__rightHeader > .euiComboBox > .euiFormControlLayout > .euiFormControlLayout__childrenWrapper > .euiComboBox__inputWrap'
  )
    .type('scatter')
    .type('{enter}');
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

describe('Render scatter chart and verify default behaviour ', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and verify by default the data gets render', () => {
    cy.get('.explorerViz__commonPanel').should('exist');
  });

  it('Render scatter chart and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Configuration').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('series').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('dimensions').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').click();
    cy.get('.euiIEFlexWrapFix').contains('Legend').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
    cy.get('.euiIEFlexWrapFix').contains('Color theme').click();
    cy.get('.euiText.euiText--small:contains(Click to add)').should('have.length', 1);
    cy.get('.euiText.euiText--small.field_text').should('contain', 'count');
    cy.get('.euiText.euiText--small.field_text').should('contain', 'span(timestamp, 1 d)');
  });

  it('Render scatter chart and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press left or right to adjust panels size"]').eq(1).click();
  });
});

describe('Render scatter chart for data configuration panel', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and verify data config panel', () => {
    cy.get('.euiLink.euiLink--primary').eq(0).click();
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'count');
    cy.get('.euiFlexItem.euiFlexItem--flexGrowZero > .euiIcon').click();
    cy.get('.euiLink.euiLink--primary').eq(1).click();
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'timestamp');
    cy.get('.euiFieldNumber').eq(0).should('value', '1');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'Day');
  });

  it('Render scatter chart and verify data config panel no result found if metric is missing', () => {
    cy.get('[aria-label="clear-field"]').eq(0).click();
    cy.get('[aria-label="clear-field"]').eq(0).click();

    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
  });
});

describe('Render scatter chart for panel options', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and verify the title gets updated according to user input ', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('input[name="title"]').type('scatter Chart');
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('scatter Chart').should('exist');
  });
});

describe('Render scatter chart for legend', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').eq(1).contains('Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').eq(1).contains('Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-unformatted="max(bytes)"]').should('not.exist');
  });

  it('Render scatter chart and verify legends for position Right and Bottom', () => {
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
  });

  it('Render scatter chart and increase Legend Size', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.legendtext').should('have.css', 'font-size', '20px');
  });
});

describe('Render scatter chart for Chart Styles ', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and verify chart style of Marker Mode', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
    cy.get('.euiTextArea.euiTextArea--resizeVertical[placeholder="Description"]')
      .click()
      .type('This is the description for scatter chart with chart style of Points');
    cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
    cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('have.attr', 'checked');
  });

  it('Render scatter chart and verify chart style of Marker Mode with larger Point size', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
    cy.get('.euiTextArea.euiTextArea--resizeVertical[placeholder="Description"]')
      .click()
      .type('This is the description for scatter chart with chart style of Points');
    cy.get('[data-text="Marker"]').should('have.text', 'Marker').click();
    cy.get('[data-text="Marker"] [data-test-subj="markers"]').should('have.attr', 'checked');
    cy.get('input[type="range"]')
      .then(($el) => $el[0].stepUp(pointSize))
      .trigger('change');
    cy.get('.euiRangeSlider').should('have.value', 35);
  });

  it('Render scatter chart and verify chart style of Lines+Marker Mode', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
    cy.get('.euiTextArea.euiTextArea--resizeVertical[placeholder="Description"]')
      .click()
      .type('This is the description for scatter chart with chart style of Lines and Marker');
    cy.get('[data-text="Lines + Markers"]').should('have.text', 'Lines + Markers').click();
    cy.get('[data-text="Lines + Markers"] [data-test-subj="lines+markers"]').should(
      'not.have.attr',
      'checked'
    );
  });

  it('Render scatter chart and verify chart style of Lines+Marker Mode with Line Width, Fill Opacity and Point Size', () => {
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('scatter chart');
    cy.get('.euiTextArea.euiTextArea--resizeVertical[placeholder="Description"]')
      .click()
      .type('This is the description for scatter chart with chart style of Lines and Marker');
    cy.get('[data-text="Lines + Markers"]').should('have.text', 'Lines + Markers').click();
    cy.get('[data-text="Lines + Markers"] [data-test-subj="lines+markers"]').should(
      'not.have.attr',
      'checked'
    );
    cy.get('input[type="range"]')
      .eq(0)
      .then(($el) => $el[0].stepUp(lineWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(0).should('have.value', lineWidthUpdated);
    cy.get('input[type="range"]')
      .eq(1)
      .then(($el) => $el[0].stepUp(fillOpacity))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(1).should('have.value', fillOpacityUpdated);
    cy.get('input[type="range"]')
      .eq(2)
      .then(($el) => $el[0].stepUp(pointSize))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(2).should('have.value', pointSizeUpdated);
    cy.get('input[type="range"]')
      .eq(3)
      .then(($el) => $el[0].stepUp(rotateLevel))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(3).should('have.value', rotateLevel);
  });
});

describe('Render scatter chart for color theme', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and "Add Color theme"', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('count()').click();
  });
});

describe('Render scatter chart and work with Thresholds', () => {
  beforeEach(() => {
    renderScatterChart();
  });

  it('Render scatter chart and add threshold', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('.euiButton__text').contains('+ Add threshold').click();
    cy.get('[data-test-subj="nameFieldText"]').type('scatter chart Threshold');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(thresholdValue);
    cy.get('[data-unformatted="scatter chart Threshold"]').should('be.visible');
    cy.get('path[style*="rgb(252, 5, 5)"]').should('exist');
  });
});

describe('Render scatter chart and verify if reset works properly', () => {
  beforeEach(() => {
    landOnEventVisualizations();
    renderScatterChart();
  });

  it('Render scatter chart with all feild data then click on reset and verify reset works properly', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('input[placeholder="Title"]').type('scatter chart');
    cy.get('textarea[placeholder="Description"]').type('Description For scatter chart');
    cy.get('.euiButton__text').contains('Hidden').click();
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).click().type(legendSize);
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('count()').click();
    cy.get('.euiButton__text').contains('+ Add threshold').click();
    cy.get('[data-test-subj="nameFieldText"]').type('scatter chart Threshold');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).type(thresholdValue);
    cy.get('input[placeholder="Title"]').should('have.value', 'scatter chart');
    cy.get('textarea[placeholder="Description"]').should(
      'have.value',
      'Description For scatter chart'
    );
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-test-subj="valueFieldNumber"]').eq(0).should('have.value', 20);
  });
});

describe('Renders Timeseries and check for empty placeholder', () => {
  before(() => {
    landOnEventVisualizations();
    renderScatterChart();
  });

  it('Check for empty placeholder in case of no timestamp', () => {
    cy.get('[aria-label="clear-field"]').eq(1).click();
    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="vizWorkspace__noData"]').should('exist');
  });
});
