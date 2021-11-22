/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DSLService from 'public/services/requests/dsl';
import React from 'react';
import { Autocomplete } from './autocomplete';
import { getSuggestions } from './autocomplete_logic';
import { AutocompleteItem, firstCommand } from '../../../../common/constants/autocomplete';

configure({ adapter: new Adapter() })

describe('Autocomplete', function () {
    const query = 'source ';
    const tempQuery = 'source ';
    const handleQueryChange = jest.fn();
    const handleQuerySearch = jest.fn();
    const dslService = {
        http: jest.fn(),
        fetch: jest.fn(),
        fetchIndices: jest.fn(),
        fetchFields: jest.fn()
    } as unknown as DSLService;
    const utils = render(
        <Autocomplete
        key={'autocomplete-search-bar'}
        query={query}
        tempQuery={tempQuery}
        handleQueryChange={handleQueryChange}
        handleQuerySearch={handleQuerySearch}
        dslService={dslService}
        />
    );

    const searchBar = utils.getByPlaceholderText('Enter PPL query to retrieve logs');

    it('handles query change', () => {
        fireEvent.change(searchBar, { target: { value: 'new query' } });
        expect(handleQueryChange).toBeCalledWith('new query');
    });
});

describe('Autocomplete Logic', function () {
    const dslService = {
        http: jest.fn(),
        fetch: jest.fn(),
        fetchIndices: jest.fn(),
        fetchFields: jest.fn()
    } as unknown as DSLService;
    // const getFirstPipe = jest.fn();
    // const fillSuggestions = jest.fn();

    it('suggests source', () => {
        const input = '';
        const expected = [{
            label: 'source ',
            input: '',
            suggestion: 'source ',
            itemName: 'source ',
        }] as AutocompleteItem[];
        const suggestion = getSuggestions(input, dslService);
        // expect(getFirstPipe).toBeCalledWith(input, dslService);
        // expect(fillSuggestions).toBeCalledWith(input, input, firstCommand);
        expect(suggestion).toBe(expected);
    });
});
