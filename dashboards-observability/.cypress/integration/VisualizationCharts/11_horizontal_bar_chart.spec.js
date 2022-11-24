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

const numberOfWindow = 6;
const labelSize = 20;
const rotateLevel = 90;
const groupWidth = 10;
const groupWidthUpdated = 0.8;
const barWidth = 10;
const barWidthUpdated = 70;
const lineWidth = 7;
const lineWidthUpdated = 9;
const fillOpacity = 10;
const fillOpacityUpdated = 80;
const numberOfColor = 24;

const renderHorizontalBarChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
  cy.get(
    '.cp__rightHeader > .euiComboBox > .euiFormControlLayout > .euiFormControlLayout__childrenWrapper > .euiComboBox__inputWrap'
  )
    .type('Horizontal Bar')
    .type('{enter}');
};

describe('Render horizontal bar chart and verify default behaviour ', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and verify by default the data gets render', () => {
    cy.get('.explorerViz__commonPanel').should('exist');
  });

  it('Render horizontal bar chart and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Configuration').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('series').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('breakdowns').should('exist');

    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Tooltip options').click();
    cy.get('.euiIEFlexWrapFix').contains('Legend').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
    cy.get('.euiIEFlexWrapFix').contains('Color theme').click();
  });

  it('Render horizontal bar chart and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press left or right to adjust panels size"]').eq(1).click();
  });
});

describe('Render horizontal bar chart for data configuration panel', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and verify data config panel', () => {
    cy.get('.euiLink.euiLink--primary').eq(0).click();
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'count');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).click();
    cy.get('.euiFilterSelectItem').eq(1).should('contain', 'sum');
    cy.get('.euiFilterSelectItem').eq(2).should('contain', 'avg');
    cy.get('.euiFilterSelectItem').eq(3).should('contain', 'max');
    cy.get('.euiFilterSelectItem').eq(4).should('contain', 'min');
  });
  it('Render Horizontal bar chart and verify data config panel clear field on field', () => {
    cy.get('.euiButtonIcon.euiButtonIcon--subdued.euiButtonIcon--empty.euiButtonIcon--xSmall')
      .eq(0)
      .click();
  });

  it('Render Horizontal bar chart and verify data config panel no result found if metric is missing', () => {
    cy.get('[aria-label="clear-field"]').eq(0).click();
    cy.get('[aria-label="clear-field"]').eq(0).click();

    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
  });
});

describe('Render horizontal bar chart for panel options', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and verify the title gets updated according to user input ', () => {
    cy.get('input[name="title"]').type('horizontal bar chart');
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('horizontal bar chart').should('exist');
  });
});

describe('Render horizontal bar chart for legend', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').eq(1).contains('Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').eq(1).contains('Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-unformatted="max(bytes)"]').should('not.exist');
  });

  it('Render horizontal bar chart and verify legends for position Right and Bottom', () => {
    cy.get('[data-text="Right"]').should('have.text', 'Right');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
  });
});

describe('Render horizontal bar chart for chart style options', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and increase Label Size ', () => {
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click().type(labelSize);
    cy.get('textarea[name="description"]').should('exist').click();
  });

  it('Render horizontal bar chart and "Rotate bar labels"', () => {
    cy.get('input[type="range"]')
      .eq(0)
      .then(($el) => $el[0].stepUp(rotateLevel))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(0).should('have.value', rotateLevel);
  });

  it('Render horizontal bar chart and change "Group Width"', () => {
    cy.get('input[type="range"]')
      .eq(1)
      .then(($el) => $el[0].stepUp(groupWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(1).should('have.value', groupWidthUpdated);
  });

  it('Render horizontal bar chart and change "Bar Width"', () => {
    cy.get('input[type="range"]')
      .eq(2)
      .then(($el) => $el[0].stepDown(barWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(4).should('have.value', barWidthUpdated);
  });

  it('Render horizontal bar chart and change "Line Width"', () => {
    cy.get('input[type="range"]')
      .eq(3)
      .then(($el) => $el[0].stepUp(lineWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(3).should('have.value', lineWidthUpdated);
  });

  it('Render horizontal bar chart and change "Fill Opacity"', () => {
    cy.get('input[type="range"]')
      .eq(4)
      .then(($el) => $el[0].stepUp(fillOpacity))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(4).should('have.value', fillOpacityUpdated);
  });
});

describe('Render horizontal bar chart for color theme', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart and "Add color theme"', () => {
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('avg(bytes)').click();
    cy.get('.point').find('path[style*="rgb(60, 161, 199)"]').should('have.length', numberOfColor);
  });
});

describe('Render horizontal bar chart and verify if reset works properly', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Render horizontal bar chart with all feild data then click on reset and verify reset works properly', () => {
    cy.get('input[placeholder="Title"]').type('horizontal bar chart');
    cy.get('textarea[placeholder="Description"]').type('Description For horizontal bar chart');
    cy.get('.euiButton__text').contains('Hidden').click();
    cy.get('.euiButton__text').contains('Stack').click();
    cy.get('[data-test-subj="valueFieldNumber"]').eq(1).click().type(labelSize);
    cy.get('input[type="range"]')
      .eq(0)
      .then(($el) => $el[0].stepUp(rotateLevel))
      .trigger('change');
    cy.get('input[type="range"]')
      .eq(1)
      .then(($el) => $el[0].stepUp(groupWidth))
      .trigger('change');
    cy.get('input[type="range"]')
      .eq(2)
      .then(($el) => $el[0].stepDown(barWidth))
      .trigger('change');
    cy.get('input[type="range"]')
      .eq(3)
      .then(($el) => $el[0].stepUp(lineWidth))
      .trigger('change');

    cy.get('input[placeholder="Title"]').should('have.value', 'horizontal bar chart');
    cy.get('textarea[placeholder="Description"]').should(
      'have.value',
      'Description For horizontal bar chart'
    );
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Group"] [data-test-subj="group"]').should('have.attr', 'checked');
    cy.get('[data-test-subj="valueFieldNumber"]').should('have.value', '');
  });
});

describe('Render Horizontal bar chart for 2-way sync', () => {
  beforeEach(() => {
    renderHorizontalBarChart();
  });

  it('Check data configuration fields updated in query on update chart', () => {
    cy.get('[aria-label="add-field"]').eq(0).click();
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).click();
    cy.get('.euiFilterSelectItem').eq(1).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiFilterSelectItem').eq(1).click();
    cy.get('[data-test-subj="panelCloseBtn"]').click();

    cy.get('[data-test-subj="visualizeEditorRenderButton"]').click();
    cy.get('[data-test-subj="searchAutocompleteTextArea"]').contains('avg(bytes)');
  });
});
