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
import { AutocompleteItem, pipeCommands, statsCommands } from '../../../../common/constants/autocomplete';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() })

describe('renders autocomplete', function () {
    const query = '';
    const tempQuery = '';
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

    const searchBar = utils.getByPlaceholderText('Enter PPL query');

    it('handles query change', () => {
        act(() => {
            fireEvent.change(searchBar, { target: { value: 'new query' } });
        });
        expect(handleQueryChange).toBeCalledWith('new query');
    });

    it('handles query search on shift enter', () => {
        act(() => {
            fireEvent.keyDown(searchBar, { keyCode: 13, shiftKey: true });
        });
        expect(handleQuerySearch).toBeCalled();
    });
});

describe('autocomplete logic', function () {
    const dslService = {
        http: jest.fn(),
        fetch: jest.fn()
            .mockReturnValueOnce({aggregations: {top_tags: {buckets: [{key: 'data', doc_count: 1}]}}})
            .mockReturnValueOnce({aggregations: {top_tags: {buckets: [{key: 1, doc_count: 1}, {key: 0, doc_count: 1}]}}})
            .mockReturnValue({aggregations: {top_tags: {buckets: [{key: 24, doc_count: 1}]}}}),
        fetchIndices: jest.fn().mockReturnValue([{index: 'test_index'}]),
        fetchFields: jest.fn().mockReturnValue({test_index: {mappings: {properties: {str_field: {type: 'string'}, bool_field: {type: 'boolean'}, num_field: {type: 'integer'}}}}}),
    } as unknown as DSLService;

    it('suggests source if empty', async () => {
        const input = '';
        const expected = [{
            label: 'source',
            input: input,
            suggestion: 'source',
            itemName: 'source',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(dslService.fetchIndices).toBeCalled();
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest source after S', async () => {
        const input = 'S';
        const expected = [{
            label: 'source',
            input: input,
            suggestion: 'ource',
            itemName: 'source',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });
    it('suggests = after source', async () => {
        const input = 'source ';
        const expected = [{
            label: 'source =',
            input: input,
            suggestion: '=',
            itemName: '=',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests index after source =', async () => {
        const input = 'source = ';
        const expected = [{
            label: 'source = test_index',
            input: input,
            suggestion: 'test_index',
            itemName: 'test_index',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest index after source = TeSt', async () => {
        const input = 'source = TeSt';
        const expected = [{
            label: 'source = test_index',
            input: input,
            suggestion: '_index',
            itemName: 'test_index',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests | after source = test_index', async () => {
        const input = 'source = test_index ';
        const expected = [{
            label: 'source = test_index |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(dslService.fetchFields).toBeCalled();
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests pipeCommands after |', async () => {
        const input = 'source = test_index | ';
        const expected = pipeCommands.map(c => {
            return {
                label: `source = test_index | ${c.label}`,
                input: input,
                suggestion: c.label,
                itemName: c.label,
            };
        }) as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest field after where StR_F', async () => {
        const input = 'source = test_index | where StR_F';
        const expected = [{
            label: 'source = test_index | where str_field',
            input: input,
            suggestion: 'ield',
            itemName: 'str_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests = after where str_field', async () => {
        const input = 'source = test_index | where str_field ';
        const expected = [{
            label: 'source = test_index | where str_field =',
            input: input,
            suggestion: '=',
            itemName: '=',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(dslService.fetch).toBeCalled();
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests data after where str_field = ', async () => {
        const input = 'source = test_index | where str_field = ';
        const expected = [{
            label: 'source = test_index | where str_field = "data"',
            input: input,
            suggestion: '"data"',
            itemName: '"data"',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest data after where str_field = "D', async () => {
        const input = 'source = test_index | where str_field = "D';
        const expected = [{
            label: 'source = test_index | where str_field = "data"',
            input: input,
            suggestion: 'ata"',
            itemName: '"data"',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests | after where str_field = "data"', async () => {
        const input = 'source = test_index | where str_field = "data" ';
        const expected = [{
            label: 'source = test_index | where str_field = "data" |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest field after where BoOl_F', async () => {
        const input = 'source = test_index | where BoOl_F';
        const expected = [{
            label: 'source = test_index | where bool_field',
            input: input,
            suggestion: 'ield',
            itemName: 'bool_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests = after where bool_field', async () => {
        const input = 'source = test_index | where bool_field ';
        const expected = [{
            label: 'source = test_index | where bool_field =',
            input: input,
            suggestion: '=',
            itemName: '=',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(dslService.fetch).toBeCalled();
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests data after where bool_field = ', async () => {
        const input = 'source = test_index | where bool_field = ';
        const expected = [{
            label: 'source = test_index | where bool_field = True',
            input: input,
            suggestion: 'True',
            itemName: 'True',
        },{
            label: 'source = test_index | where bool_field = False',
            input: input,
            suggestion: 'False',
            itemName: 'False',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest data after where bool_field = fA', async () => {
        const input = 'source = test_index | where bool_field = fA';
        const expected = [{
            label: 'source = test_index | where bool_field = False',
            input: input,
            suggestion: 'lse',
            itemName: 'False',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests | after where bool_field = True', async () => {
        const input = 'source = test_index | where bool_field = True ';
        const expected = [{
            label: 'source = test_index | where bool_field = True |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest match( after where Ma', async () => {
        const input = 'source = test_index | where Ma';
        const expected = [{
            label: 'source = test_index | where match(',
            input: input,
            suggestion: 'tch(',
            itemName: 'match(',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after where match(', async () => {
        const input = 'source = test_index | where match( ';
        const expected = [{
            label: 'source = test_index | where match( str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | where match( bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | where match( num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests , after where match( num_field', async () => {
        const input = 'source = test_index | where match( num_field ';
        const expected = [{
            label: 'source = test_index | where match( num_field ,',
            input: input,
            suggestion: ',',
            itemName: ',',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(dslService.fetch).toBeCalled();
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests data after where match( num_field ,', async () => {
        const input = 'source = test_index | where match( num_field , ';
        const expected = [{
            label: 'source = test_index | where match( num_field , 24',
            input: input,
            suggestion: '24',
            itemName: '24',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests ) after where match( num_field , 24', async () => {
        const input = 'source = test_index | where match( num_field , 24 ';
        const expected = [{
            label: 'source = test_index | where match( num_field , 24 )',
            input: input,
            suggestion: ')',
            itemName: ')',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests | after where match( num_field , 24 )', async () => {
        const input = 'source = test_index | where match( num_field , 24 ) ';
        const expected = [{
            label: 'source = test_index | where match( num_field , 24 ) |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests statsCommands after stats', async () => {
        const input = 'source = test_index | stats ';
        const expected = statsCommands.map(c => {
            return {
                label: `source = test_index | stats ${c.label}`,
                input: input,
                suggestion: c.label,
                itemName: c.label,
            };
        }) as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests by after stats count()', async () => {
        const input = 'source = test_index | stats count() ';
        const expected = [{
            label: 'source = test_index | stats count() by',
            input: input,
            suggestion: 'by',
            itemName: 'by',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after stats count() by', async () => {
        const input = 'source = test_index | stats count() by ';
        const expected = [{
            label: 'source = test_index | stats count() by str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | stats count() by bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | stats count() by num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests | after stats count() by str_field', async () => {
        const input = 'source = test_index | stats count() by str_field ';
        const expected = [{
            label: 'source = test_index | stats count() by str_field |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests num_field after stats sum(', async () => {
        const input = 'source = test_index | stats sum( ';
        const expected = [{
            label: 'source = test_index | stats sum( num_field )',
            input: input,
            suggestion: 'num_field )',
            itemName: 'num_field )',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests by after stats sum( num_field )', async () => {
        const input = 'source = test_index | stats sum( num_field ) ';
        const expected = [{
            label: 'source = test_index | stats sum( num_field ) by',
            input: input,
            suggestion: 'by',
            itemName: 'by',
        },
        {
            label: 'source = test_index | stats sum( num_field ) |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after stats sum( num_field ) by', async () => {
        const input = 'source = test_index | stats sum( num_field ) by ';
        const expected = [{
            label: 'source = test_index | stats sum( num_field ) by str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | stats sum( num_field ) by bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | stats sum( num_field ) by num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest fields after FiE', async () => {
        const input = 'source = test_index | FiE';
        const expected = [{
            label: 'source = test_index | fields',
            input: input,
            suggestion: 'lds',
            itemName: 'fields',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after fields', async () => {
        const input = 'source = test_index | fields ';
        const expected = [{
            label: 'source = test_index | fields str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | fields bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | fields num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests , after fields str_field', async () => {
        const input = 'source = test_index | fields str_field ';
        const expected = [{
            label: 'source = test_index | fields str_field,',
            input: 'source = test_index | fields str_field',
            suggestion: ',',
            itemName: ',',
        },
        {
            label: 'source = test_index | fields str_field |',
            input: input,
            suggestion: '|',
            itemName: '|',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after fields str_field, ', async () => {
        const input = 'source = test_index | fields str_field, ';
        const expected = [{
            label: 'source = test_index | fields str_field, str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | fields str_field, bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | fields str_field, num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('continues to suggest dedup after DE', async () => {
        const input = 'source = test_index | DE';
        const expected = [{
            label: 'source = test_index | dedup',
            input: input,
            suggestion: 'dup',
            itemName: 'dedup',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });

    it('suggests fields after dedup', async () => {
        const input = 'source = test_index | dedup ';
        const expected = [{
            label: 'source = test_index | dedup str_field',
            input: input,
            suggestion: 'str_field',
            itemName: 'str_field',
        },
        {
            label: 'source = test_index | dedup bool_field',
            input: input,
            suggestion: 'bool_field',
            itemName: 'bool_field',
        },
        {
            label: 'source = test_index | dedup num_field',
            input: input,
            suggestion: 'num_field',
            itemName: 'num_field',
        }] as AutocompleteItem[];
        const suggestion = await getSuggestions(input, dslService);
        expect(suggestion).toStrictEqual(expected);
    });
});
