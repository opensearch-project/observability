/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />
import {
    TEST_QUERIES,
    querySearch,
    landOnEventVisualizations
} from '../../utils/event_constants';

const numberOfWindow = 4;
const labelSize = 20;
const latitudeRangeMin = 40;
const latitudeRangeMax = 70;
const longitudeRangeMin = -130;
const longitudeRangeMax = -55;

const renderCoordinateMap = () => {
    landOnEventVisualizations();
    querySearch(TEST_QUERIES[0].query, TEST_QUERIES[0].dateRangeDOM);
    cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Coordinate Map').type('{enter}');
};

const renderDataForCoordinateMap = () => {
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('.euiComboBoxOption__content').contains('DestLocation').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('.euiComboBoxOption__content').contains('AvgTicketPrice').click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(4).click();
    cy.get('.euiComboBoxOption__content').contains('Dest').click();
    cy.get('.euiButton__text').contains('Update chart').click();
    cy.get('.layer.land').should('exist');
    cy.get('stop[stop-color="rgb(5, 10, 172)"]').should('exist');
}

describe('Render coordinate map and verify default behaviour ', () => {
    beforeEach(() => {
        renderCoordinateMap();
    });

    it('Render coordinate map and verify by default the data dont gets render', () => {
        cy.get('.layer.land').should('not.exist');
        cy.get('.euiTextColor.euiTextColor--subdued').contains('No results found').should('exist');
    });

    it('Render coordinate map and verify you see data configuration panel and chart panel', () => {
        cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
        cy.get('.euiTitle.euiTitle--xxsmall').contains('Data Configurations').should('exist');
        cy.get('.euiTitle.euiTitle--xxsmall').contains('Dimensions').should('exist');
        cy.get('.euiTitle.euiTitle--xxsmall').contains('Metrics').should('exist');
        cy.get('.euiIEFlexWrapFix').contains('Panel options').click();
        cy.get('.euiIEFlexWrapFix').contains('Text').click();
        cy.get('.euiIEFlexWrapFix').contains('Chart styles').click();
        cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
        cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });

    it('Render coordinate map and verify the data configuration panel and chart panel are collapsable', () => {
        cy.get('.euiPanel.euiPanel--paddingSmall').should('have.length', numberOfWindow);
        cy.get('[aria-label="Press to toggle this panel"]').eq(1).click();
        cy.get('[aria-label="Press to toggle this panel"]').eq(2).click();
    });
});

describe('Render coordinate map for data configuration panel', () => {
    beforeEach(() => {
        renderCoordinateMap();
    });

    it('Render coordinate map and verify data config panel', () => {
        cy.get('[data-test-subj="comboBoxInput"]').eq(1).contains('Select a field').should('exist');
        cy.get('[data-test-subj="comboBoxInput"]').eq(3).contains('Select a field').should('exist');
        cy.get('[data-test-subj="comboBoxInput"]').eq(4).contains('Select a field').should('exist');
    });

    it('Render coordinate map and verify data gets render only after selecting the field value in data configuration panel', () => {
        renderDataForCoordinateMap();
    });

    it('Render coordinate map and verify data config dimensions panel "Field" contains only location', () => {
        cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
        cy.get('.euiComboBoxOption__content').contains('DestLocation').should('exist');
        cy.get('.euiComboBoxOption__content').contains('OriginLocation').should('exist');
    });

    it('Render coordinate map and verify data config metrics panel "Field" contains only value which return either integer or float value', () => {
        cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
        cy.get('.euiComboBoxOption__content').contains('AvgTicketPrice').should('exist');
        cy.get('.euiComboBoxOption__content').contains('DistanceMiles').should('exist');
        cy.get('.euiComboBoxOption__content').should('not.contain', 'DestLocation');
        cy.get('.euiComboBoxOption__content').should('have.length', 6);
    });

    it('Render coordinate map and verify data config metric panel "Plot Label" contains a combination of string value and integer value', () => {
        cy.get('[data-test-subj="comboBoxInput"]').eq(4).click();
        cy.get('.euiComboBoxOption__content').contains('AvgTicketPrice').should('exist');
        cy.get('.euiComboBoxOption__content').contains('Dest').should('exist');
        cy.get('.euiComboBoxOption__content').contains('DestLocation').should('exist');
    });
});

describe('Render coordinate map for panel options', () => {
    beforeEach(() => {
        renderCoordinateMap();
        renderDataForCoordinateMap();
    });

    it('Render coordinate map and verify the title gets updated according to user input ', () => {
        cy.get('input[name="title"]').type("coordinate map");
        cy.get('textarea[name="description"]').should('exist').click();
        cy.get('.gtitle').contains('coordinate map').should('exist');
    });
});

describe('Render coordinate map for text', () => {
    beforeEach(() => {
        renderCoordinateMap();
        renderDataForCoordinateMap();
    });

    it('Render coordinate map and verify by default the "Show" is enabled for "Show Text"', () => {
        cy.get('[data-text="Show"]').should('have.text', 'Show');
        cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
        cy.get('[data-unformatted="Duluth International Airport"]').should('exist');
    });

    it('Render coordinate map and change "Show Text" to "Hidden"', () => {
        cy.get('[data-text="Hidden"]').should('have.text', 'Hidden').click();
        cy.get('[data-text="Hidden"] [data-test-subj="hidden"]').should('not.have.attr', 'checked');
        cy.get('[data-unformatted="Duluth International Airport"]').should('not.exist');
    });

    it('Render coordinate map and verify by default the "Top" is enabled for "Position"', () => {
        cy.get('[data-text="Top"]').should('have.text', 'Top');
        cy.get('[data-text="Top"] [data-test-subj="top center"]').should('have.attr', 'checked');
    });

    it('Render coordinate map and change "Position" to "Right", "Bottom" and "Left"', () => {
        cy.get('[data-text="Right"]').should('have.text', 'Right').click();
        cy.get('[data-text="Right"] [data-test-subj="middle right"]').should('not.have.attr', 'checked');
        cy.get('[data-text="Bottom"]').should('have.text', 'Bottom').click();
        cy.get('[data-text="Bottom"] [data-test-subj="bottom center"]').should('not.have.attr', 'checked');
        cy.get('[data-text="Left"]').should('have.text', 'Left').click();
        cy.get('[data-text="Left"] [data-test-subj="middle left"]').should('not.have.attr', 'checked');
    });
});

describe('Render coordinate map for chart style options', () => {
    beforeEach(() => {
        renderCoordinateMap();
        renderDataForCoordinateMap();
    });

    it('Render coordinate map and change Label Size ', () => {
        cy.get('[data-test-subj="valueFieldNumber"]').click().type(labelSize);
        cy.get('textarea[name="description"]').should('exist').click();
        cy.get('[data-unformatted="Duluth International Airport"]').should('have.css', 'font-size', '20px');
        cy.get('[data-test-subj="valueFieldNumber"]').should('have.value', labelSize)
    });

    it('Render coordinate map and change "Latitude Range"', () => {
        cy.get('input[type="number"]').eq(1).should('have.value', latitudeRangeMin);
        cy.get('input[type="number"]').eq(2).should('have.value', latitudeRangeMax);
        cy.get('input[type="number"]').eq(1).click().clear().type(30);
    });

    it('Render coordinate map and change "Longitude Range"', () => {
        cy.get('input[type="number"]').eq(3).should('have.value', longitudeRangeMin);
        cy.get('input[type="number"]').eq(4).should('have.value', longitudeRangeMax);
        cy.get('input[type="number"]').eq(4).click().clear().type(40);
    });
});

describe('Render coordinate map and verify if reset works properly', () => {
    beforeEach(() => {
        renderCoordinateMap();
        renderDataForCoordinateMap();
    });

    it('Render coordinate map with all feild data then click on reset and verify reset works properly', () => {
        cy.get('input[placeholder="Title"]').type('coordinate map');
        cy.get('textarea[placeholder="Description"]').type('Description For coordinate map');
        cy.get('.euiButton__text').contains('Hidden').click();
        cy.get('.euiButton__text').contains('Right').click();
        cy.get('[data-test-subj="valueFieldNumber"]').click().type(labelSize);
        cy.get('.euiButtonEmpty__text').contains('Reset').click();
        cy.get('input[placeholder="Title"]').should('not.have.value', 'coordinate map');
        cy.get('textarea[placeholder="Description"]').should('not.have.value', 'Description For coordinate map');
        cy.get('[data-text="Show"] [data-test-subj="show"]').should('have.attr', 'checked');
        cy.get('[data-text="Top"] [data-test-subj="top center"]').should('have.attr', 'checked');
        cy.get('[data-test-subj="valueFieldNumber"]').should('have.value', '');
    });
});
