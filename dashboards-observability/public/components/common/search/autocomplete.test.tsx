/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DSLService from 'public/services/requests/dsl';
import React from 'react';
import { Autocomplete } from './autocomplete';

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
    const wrapper = shallow(
        <Autocomplete
        key={'autocomplete-search-bar'}
        query={query}
        tempQuery={tempQuery}
        handleQueryChange={handleQueryChange}
        handleQuerySearch={handleQuerySearch}
        dslService={dslService}
        />
    );

    it('handles query change', () => {
        const searchBar = utils.getByPlaceholderText('Enter PPL query to retrieve logs');
        fireEvent.change(searchBar, { target: { value: 'new query' } });
        expect(handleQueryChange).toBeCalledWith('new query');
    });

    it('sets collections to source', () => {
        const suggestionList = [{
            label: 'source ',
            input: '',
            suggestion: 'source ',
            itemName: 'source ',
        }];
        
        
    });
    
});
