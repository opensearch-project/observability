/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { AutocompletePlugin } from '@algolia/autocomplete-js';
import DSLService from 'public/services/requests/dsl';
import { getDataValueQuery } from './queries/data_queries';

interface PPLSuggestion {
  label: string;
  input: string;
  suggestion: string;
  item: string;
}

interface CreatePPLSuggestionsPluginProps {
  handleQueryChange: (query: string, index: string) => void;
  handleQuerySearch: () => void;
  dslService: DSLService;
}

let queryLength: number = 0;
let currIndex: string = '';
let currField: string = '';
let currFieldType: string = '';

let inFieldsCommaLoop: boolean = false;
let nextWhere: number = Number.MAX_SAFE_INTEGER;
let nextStats: number = Number.MAX_SAFE_INTEGER;

const indexList: string[] = [];
const fieldsFromBackend: [] = [];
const indicesFromBackend: [] = [];

const firstCommand = [{ label: 'index' }, { label: 'search' }, { label: 'source' }];

const pipeCommands = [
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

const statsCommands = [
  { label: 'count()' },
  { label: 'sum(' },
  { label: 'avg(' },
  { label: 'max(' },
  { label: 'min(' },
];

// Function to create the array of objects to be suggested
const fillSuggestions = (str: string, word: string, items: any) => {
  const filteredList = items.filter(
    (item: { label: string }) => item.label.startsWith(word) && word !== item.label
  );
  const suggestionList = [];
  for (let i = 0; i < filteredList.length; i++) {
    suggestionList.push({
      label: str.substring(0, str.lastIndexOf(word)) + filteredList[i].label,
      input: str,
      suggestion: filteredList[i].label.substring(word.length),
      itemName: filteredList[i].label,
    });
  }
  return suggestionList;
};

// Function for the first command in query, also needs to get available indices
const getFirstPipe = async (str: string, dslService: DSLService) => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  getIndices(dslService);
  return fillSuggestions(str, prefix, firstCommand);
};

// Main logic behind autocomplete (Based on most recent inputs)
const getSuggestions = async (str: string, dslService: DSLService) => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  const fullSuggestions: any = [];

  // Check the last full word in the query, then suggest inputs based off that
  if (splittedModel.length === 1) {
    currField = '';
    currIndex = '';
    return getFirstPipe(str, dslService);
  } else if (splittedModel.length > 1) {
    if (splittedModel[splittedModel.length - 2] === '|') {
      inFieldsCommaLoop = false;
      nextWhere = Number.MAX_SAFE_INTEGER;
      nextStats = Number.MAX_SAFE_INTEGER;
      currField = '';
      return fillSuggestions(str, prefix, pipeCommands);
    } else if (splittedModel[splittedModel.length - 2].includes(',')) {
      if (inFieldsCommaLoop) {
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      return fullSuggestions;
    } else if (
      splittedModel[splittedModel.length - 2] === 'source' ||
      splittedModel[splittedModel.length - 2] === 'index'
    ) {
      return [{ label: str + '=', input: str, suggestion: '=' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (
      (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source') ||
      splittedModel[splittedModel.length - 3] === 'index'
    ) {
      return fillSuggestions(str, prefix, indicesFromBackend);
    } else if (indexList.includes(splittedModel[splittedModel.length - 2])) {
      currIndex = splittedModel[splittedModel.length - 2];
      getFields(dslService);
      return [{ label: str + '|', input: str, suggestion: '|' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (splittedModel[splittedModel.length - 2] === 'search') {
      return fillSuggestions(str, prefix, [{ label: 'source' }]);
    } else if (splittedModel[splittedModel.length - 2] === 'stats') {
      nextStats = splittedModel.length;
      return fillSuggestions(str, prefix, statsCommands);
    } else if (nextStats === splittedModel.length - 1) {
      if (splittedModel[splittedModel.length - 2] !== 'count()') {
        const numberFields = fieldsFromBackend.filter(
          ({ label, type }) =>
            label.startsWith(prefix) && prefix !== label && (type === 'float' || type === 'integer')
        );
        for (let i = 0; i < numberFields.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.length - 1) + numberFields[i].label + ')',
            input: str.substring(0, str.length - 1),
            suggestion: numberFields[i].label.substring(prefix.length) + ')',
            itemName: numberFields[i].label,
          });
        }
        nextStats = nextStats - 1;
        return fullSuggestions;
      }
    } else if (nextStats === splittedModel.length - 2) {
      return [{ label: str + 'by', input: str, suggestion: 'by' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (nextStats === splittedModel.length - 3) {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    }
    else if (splittedModel[splittedModel.length - 2] === 'fields') {
      inFieldsCommaLoop = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (splittedModel[splittedModel.length - 2] === 'dedup') {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (splittedModel[splittedModel.length - 2] === 'where') {
      nextWhere = splittedModel.length;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (nextWhere === splittedModel.length - 1) {
      fullSuggestions.push({
        label: str + '=',
        input: str,
        suggestion: '=',
        item: '=',
      });
      currField = splittedModel[splittedModel.length - 2];
      currFieldType = fieldsFromBackend.find((field) => field.label === currField).type;
      return fullSuggestions.filter(({ label }) => label.startsWith(prefix) && prefix !== label);
    } else if (nextWhere === splittedModel.length - 2) {
      return fillSuggestions(
        str,
        prefix,
        await getDataValues(currIndex, currField, currFieldType, dslService)
      );
    } else if (nextWhere === splittedModel.length - 3 || nextStats === splittedModel.length - 4) {
      return [{ label: str + '|', input: str, suggestion: '|' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (inFieldsCommaLoop) {
      return [
        {
          label: str.substring(0, str.length - 1) + ',',
          input: str.substring(0, str.length - 1),
          suggestion: ',',
          item: ',',
        },
        { label: str + '|', input: str, suggestion: '|', item: ',' },
      ].filter(({ label }) => label.startsWith(prefix) && prefix !== label);
    }
    return [];
  }
};

const getIndices = async (dslService: DSLService) => {
  if (indicesFromBackend.length === 0) {
    const indices = (await dslService.fetchIndices()).filter(({ index }) => !index.startsWith('.'));
    for (let i = 0; i < indices.length; i++) {
      indicesFromBackend.push({
        label: indices[i].index,
      });
      indexList.push(indices[i].index);
    }
  }
};

const getFields = async (dslService: DSLService) => {
  if (fieldsFromBackend.length === 0 && currIndex !== '') {
    const res = await dslService.fetchFields(currIndex);
    for (const element in res?.[currIndex].mappings.properties) {
      if (res?.[currIndex].mappings.properties[element].type === 'keyword') {
        fieldsFromBackend.push({ label: element, type: 'string' });
      } else {
        fieldsFromBackend.push({
          label: element,
          type: res?.[currIndex].mappings.properties[element].type,
        });
      }
    }
  }
};

const getDataValues = async (
  index: string,
  field: string,
  fieldType: string,
  dslService: DSLService
) => {
  const res = (await dslService.fetch(getDataValueQuery(index, field))).aggregations.top_tags
    .buckets;
  const dataValuesFromBackend: [] = [];
  res.forEach((e: any) => {
    if (fieldType === 'string') {
      dataValuesFromBackend.push({ label: '"' + e.key + '"', doc_count: e.doc_count });
    } else if (fieldType === 'boolean') {
      if (e.key === 1) {
        dataValuesFromBackend.push({ label: 'True', doc_count: e.doc_count });
      } else {
        dataValuesFromBackend.push({ label: 'False', doc_count: e.doc_count });
      }
    } else if (fieldType !== 'geo_point') {
      dataValuesFromBackend.push({ label: String(e.key), doc_count: e.doc_count });
    }
  });
  return dataValuesFromBackend;
};

const onItemSelect = async ({ setQuery, item }, dslService: DSLService) => {
  if (fieldsFromBackend.length === 0 && indexList.includes(item.itemName)) {
    currIndex = item.itemName;
    getFields(dslService);
  }
  setQuery(item.label + ' ');
};

// Plugin for Algolia Autocomplete
export function createPPLSuggestionsPlugin(
  options: CreatePPLSuggestionsPluginProps
): AutocompletePlugin<PPLSuggestion, undefined> {
  return {
    onStateChange: ({ state }) => {
      if (state.query.length > queryLength) {
        options.handleQueryChange(state.query, currIndex);
        queryLength++;
      }
    },
    onSubmit: () => {
      options.handleQuerySearch();
    },
    getSources() {
      return [
        {
          getItems({ query }) {
            return getSuggestions(query, options.dslService);
          },
          tagName: 'test',
          onSelect: ({ setQuery, item }) => {
            onItemSelect(
              {
                setQuery,
                item,
              },
              options.dslService
            );
          },
          templates: {
            item({ item, createElement }) {
              return createElement('div', {
                dangerouslySetInnerHTML: {
                  __html: `<div>
                    ${item.input}<span class=styling>${item.suggestion}</span>
                  </div>`,
                },
              });
            },
          },
        },
      ];
    },
  };
}
