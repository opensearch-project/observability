/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const firstCommand = [{ label: 'source' }];

export const pipeCommands = [
{ label: 'dedup' },
{ label: 'eval' },
{ label: 'fields' },
{ label: 'head' },
{ label: 'rare' },
{ label: 'rename' },
{ label: 'sort' },
{ label: 'stats' },
{ label: 'top' },
{ label: 'where' },
];

export const statsCommands = [
{ label: 'count()' },
{ label: 'sum(' },
{ label: 'avg(' },
{ label: 'max(' },
{ label: 'min(' },
{ label: 'var_samp(' },
{ label: 'var_pop(' },
{ label: 'stddev_samp(' },
{ label: 'stddev_pop(' },
];

export const numberTypes = [
'long', 
'integer', 
'short', 
'byte', 
'double', 
'float', 
'half_float', 
'scaled_float', 
'unsigned_long'
];

export type AutocompleteItem = {
    input: string;
    itemName: string;
    label: string;
    suggestion: string;
    __autocomplete_id: number;
};

export type fieldItem = {
    label: string;
    type: string;
}

export type indexItem = {
    label: string;
}

export type dataItem = {
    label: string;
    doc_count: any;
}