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
const labelSize = 20;
const rotateLevel = 45;
const groupWidth = 10;
const groupWidthUpdated = 0.8;
const barWidth = 10;
const barWidthUpdated = 80;
const lineWidth = 7;
const lineWidthUpdated = 8;
const fillOpacity = 10;
const fillOpacityUpdated = 90;
const numberOfColor = 24;

const renderBarChart = () => {
  landOnEventVisualizations();
  querySearch(TEST_QUERIES[4].query, TEST_QUERIES[4].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]')
    .type('Bar')
    .type('{enter}');
};

describe('Render bar chart and verify default behaviour ', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and verify by default the data gets render', () => {
    cy.get('.xy').should('exist');
  });

  it('Render bar chart and verify you see data configuration panel and chart panel', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
    cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
    cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
    cy.get('.euiIEFlexWrapFix').contains('Legend').click();
    cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
    cy.get('.euiIEFlexWrapFix').contains('Color Theme').click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });

  it('Render bar chart and verify the data configuration panel and chart panel are collapsable', () => {
    cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
    cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
    cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
  });
});

describe('Render bar chart for data configuration panel', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and verify data config panel', () => {
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(0).should('contain', 'tags');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(1).should('contain', 'count()');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(2).should('contain', 'avg(bytes)');
    cy.get('.euiComboBoxPill.euiComboBoxPill--plainText').eq(3).should('contain', 'host');
  });

  it('Render bar chart and verify data config panel restrict user to select a duplicate field on dimension field', () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(0).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').should('have.length', 1);
    cy.get('.euiComboBoxOption__content').contains('tags');
  });

  it('Render bar chart and verify data config panel Restrict user to select a duplicate field on Metrics field', () => {
    cy.get('.euiText.euiText--extraSmall').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').should('not.contain', 'tags');
    cy.get('.euiComboBoxOption__content').should('have.length', 2);
  });

  it('Render bar chart and verify data config panel no result found if metric is missing', () => {
    cy.get('.euiText.euiText--extraSmall').eq(0).click();
    cy.get('.euiText.euiText--extraSmall').eq(1).click();
    cy.get('[data-test-subj="comboBoxClearButton"]').eq(1).click();
    cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
    cy.get('.euiComboBoxOption__content').contains('avg(bytes)').click();
    cy.get('.main-svg').contains('No results found').should('not.exist');
  });
});

describe('Render bar chart for panel options', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and verify the title gets updated according to user input ', () => {
    cy.get('input[name="title"]').type('Bar Chart');
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('.gtitle').contains('Bar Chart').should('exist');
  });
});

describe('Render bar chart for legend', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and verify legends for Show and Hidden', () => {
    cy.get('[data-text="Show"]').should('have.text', 'Show');
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
    cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
    cy.get('[data-unformatted="max(bytes)"]').should('not.exist');
  });

  it('Render bar chart and verify legends for position Right and Bottom', () => {
    cy.get('[data-text="Right"]').should('have.text', 'Right');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
    cy.get('[data-text="Bottom"] [data-test-subj="h"]').should('not.have.attr', 'checked');
  });
});

describe('Render bar chart for chart style options', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and change orientation to Horizontal and mode to Stack', () => {
    cy.get('span[title="Horizontal"]').click();
    cy.get('span[title="Stack"]').click();
  });

  it('Render bar chart and increase Label Size ', () => {
    cy.get('[data-test-subj="valueFieldNumber"]').click().type(labelSize);
    cy.get('textarea[name="description"]').should('exist').click();
    cy.get('[data-unformatted="10k"]').should('have.css', 'font-size', '20px');
  });

  it('Render bar chart and "Rotate bar labels"', () => {
    cy.get('input[type="range"]')
      .eq(0)
      .then(($el) => $el[0].stepUp(rotateLevel))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(0).should('have.value', rotateLevel);
  });

  it('Render bar chart and change "Group Width"', () => {
    cy.get('input[type="range"]')
      .eq(1)
      .then(($el) => $el[0].stepUp(groupWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(1).should('have.value', groupWidthUpdated);
  });

  it('Render bar chart and change "Bar Width"', () => {
    cy.get('input[type="range"]')
      .eq(2)
      .then(($el) => $el[0].stepDown(barWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(4).should('have.value', barWidthUpdated);
  });

  it('Render bar chart and change "Line Width"', () => {
    cy.get('input[type="range"]')
      .eq(3)
      .then(($el) => $el[0].stepUp(lineWidth))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(3).should('have.value', lineWidthUpdated);
  });

  it('Render bar chart and change "Fill Opacity"', () => {
    cy.get('input[type="range"]')
      .eq(4)
      .then(($el) => $el[0].stepUp(fillOpacity))
      .trigger('change');
    cy.get('.euiRangeSlider').eq(4).should('have.value', fillOpacityUpdated);
  });
});

describe('Render bar chart for color theme', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart and "Add color theme"', () => {
    cy.get('.euiButton__text').contains('+ Add color theme').click();
    cy.wait(delay);
    cy.get('[data-test-subj="comboBoxInput"]').eq(9).click();
    cy.get('.euiComboBoxOption__content').contains('avg(bytes)').click();
    cy.get('.point').find('path[style*="rgb(252, 5, 5)"]').should('have.length', numberOfColor);
  });
});

describe('Render bar chart and verify if reset works properly', () => {
  beforeEach(() => {
    renderBarChart();
  });

  it('Render bar chart with all feild data then click on reset and verify reset works properly', () => {
    cy.get('input[placeholder="Title"]').type('Bar Chart');
    cy.get('textarea[placeholder="Description"]').type('Description For Bar Chart');
    cy.get('.euiButton__text').contains('Hidden').click();
    cy.get('.euiButton__text').contains('Horizontal').click();
    cy.get('.euiButton__text').contains('Stack').click();
    cy.get('[data-test-subj="valueFieldNumber"]').click().type(labelSize);
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
    cy.get('.euiButtonEmpty__text').contains('Reset').click();
    cy.get('input[placeholder="Title"]').should('not.have.value', 'Bar Chart');
    cy.get('textarea[placeholder="Description"]').should(
      'not.have.value',
      'Description For Bar Chart'
    );
    cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
    cy.get('[data-text="Right"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Vertical"] [data-test-subj="v"]').should('have.attr', 'checked');
    cy.get('[data-text="Group"] [data-test-subj="group"]').should('have.attr', 'checked');
    cy.get('[data-test-subj="valueFieldNumber"]').should('have.value', '');
  });
});
