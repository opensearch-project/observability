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

import {
  AutocompletePlugin,
} from '@algolia/autocomplete-js';
import DSLService from 'public/services/requests/dsl';
import { getDataValueQuery } from './queries/data_queries';

type PPLSuggestion = {
  label: string;
  input: string;
  suggestion: string;
  item: string;
}

type CreatePPLSuggestionsPluginProps = {
  handleQueryChange: (query: string, index: string) => void;
  handleQuerySearch: () => void
  dslService: DSLService;
}

let currIndex: string = '';
  
let currField: string = ''
let currFieldType: string = '';

let inFieldsCommaLoop: boolean = false;
let nextWhere: number = 99999;
let nextStats: number = 99999;
let indexList: string[] = [];

const fieldsFromBackend: [] = [];
const indicesFromBackend: [] = [];

const firstCommand = [
  { label: 'index' },
  { label: 'search' },
  { label: 'source' }
];

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

const fillSuggestions = ( str: string, word: string, items: any ) => {
  const filteredList = items.filter(
    (item: { label: string }) => item.label.startsWith(word) && word !== item.label
  )
  const suggestionList = []
  for (let i = 0; i < filteredList.length; i++ ) {
    suggestionList.push({
      label: str.substring(0, str.lastIndexOf(word)) + filteredList[i].label,
      input: str,
      suggestion: filteredList[i].label.substring(word.length),
      itemName: filteredList[i].label
    })
  }
  return suggestionList;
}

const getFirstPipe = async (str: string, dslService: DSLService) => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  getIndices(dslService);
  return fillSuggestions(str, prefix, firstCommand)
}

const getCommands = async (str: string) => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  const itemSuggestions = pipeCommands.filter(
    ({ label }) => label.startsWith(prefix) && prefix !== label
  );
  return fillSuggestions(str, prefix, itemSuggestions)
}

const getSuggestions = async (str: string, dslService: DSLService) => {

  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  let itemSuggestions: any = [];
  const fullSuggestions: any = [];

  if (splittedModel.length === 1) {
    currField = ''
    currIndex = ''
    return getFirstPipe(str, dslService);
  }

  else if (splittedModel.length > 1) {
    if (splittedModel[splittedModel.length - 2] === '|') {
      inFieldsCommaLoop = false;
      nextWhere = 99999;
      nextStats = 99999;
      currField = '';
      return fillSuggestions(str, prefix, pipeCommands);
    } else if (splittedModel[splittedModel.length - 2].includes(',')) {
      if (inFieldsCommaLoop) {
        return fillSuggestions(str, prefix, fieldsFromBackend)
      }
      return fullSuggestions;
    } else if (splittedModel[splittedModel.length - 2] === 'source' || splittedModel[splittedModel.length - 2] === 'index') {
      return [{ label: str + '=', input: str, suggestion: '=' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (indexList.includes(splittedModel[splittedModel.length - 2])) {
      currIndex = splittedModel[splittedModel.length - 2];
      getFields(dslService);
      return [{ label: str + '|', input: str, suggestion: '|' }].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    } else if (splittedModel[splittedModel.length - 2] === 'search') {
      return fillSuggestions(str, prefix, [{label: 'source'}]);
    } else if (splittedModel[splittedModel.length - 2] === 'stats') {
      nextStats = splittedModel.length;
      return fillSuggestions(str, prefix, statsCommands);

    }
    else if (nextStats === splittedModel.length - 1) {
      if (splittedModel[splittedModel.length - 2] !== 'count()'){
        itemSuggestions = fieldsFromBackend.filter(
          ({ label, type }) => label.startsWith(prefix) && prefix !== label && (type === 'float' || type === 'integer')
        );
        for (let i = 0; i < itemSuggestions.length; i++) {
          fullSuggestions.push({
            label: str.substring(0, str.length - 1) + itemSuggestions[i].label + ')',
            input: str.substring(0, str.length - 1),
            suggestion: itemSuggestions[i].label.substring(prefix.length) + ')',
            itemName: itemSuggestions[i].label
          });
        }
        nextStats = nextStats - 1;
        return fullSuggestions;
      }
    }
    else if (splittedModel[splittedModel.length - 2] === 'fields') {
      inFieldsCommaLoop = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    }
    else if (splittedModel[splittedModel.length - 2] === 'dedup') {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    }
    else if (splittedModel[splittedModel.length - 2] === 'where') {
      nextWhere = splittedModel.length;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    }
    else if (nextWhere + 1 === splittedModel.length) {
      fullSuggestions.push({
        label: str + '=', 
        input: str,
        suggestion: '=',
        item: '='
      })
      currField = splittedModel[splittedModel.length - 2];
      currFieldType = fieldsFromBackend.find( field => field.label === currField).type;
      return fullSuggestions.filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      );
    }
    else if (nextWhere + 2 === splittedModel.length) {
      return fillSuggestions(str, prefix, await getDataValues(currIndex, currField, currFieldType, dslService))
    }
    else if (nextWhere + 3 === splittedModel.length || nextStats === splittedModel.length - 2) {
      return [{label: str + '|', input: str, suggestion: '|'}].filter(
        ({ label }) => label.startsWith(prefix) && prefix !== label
      )
    }
    else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source'
      || splittedModel[splittedModel.length - 3] === 'index') {
      return fillSuggestions(str, prefix, indicesFromBackend);
    } else if (inFieldsCommaLoop) {
      return [
        { label: str.substring(0, str.length - 1) + ',', input: str.substring(0, str.length - 1), suggestion: ',', item: ',' },
        { label: str + '|', input: str, suggestion: '|', item: ',' },
      ].filter(({ label }) => label.startsWith(prefix) && prefix !== label);
    }
    return []
  }
}

const getIndices = async (dslService: DSLService) => {
  if(indicesFromBackend.length === 0) {
    const indices = (await dslService.fetchIndices()).filter(
      ({ index }) => !index.startsWith('.')
    )
    for (let i = 0; i < indices.length; i++) {
      indicesFromBackend.push({
        label: indices[i].index
      });
      indexList.push(indices[i].index);
    }
  }
}

const getFields = async (dslService: DSLService) => {
  if (fieldsFromBackend.length === 0 && currIndex !== '') {
    const res = await dslService.fetchFields(currIndex);
    for (let element in res?.[currIndex].mappings.properties) {
      if (res?.[currIndex].mappings.properties[element].type === 'keyword') {
        fieldsFromBackend.push({ label: element, type: 'string' });  
      }
      else {
      fieldsFromBackend.push({ label: element, type: res?.[currIndex].mappings.properties[element].type });
      }
    }
  }
}

const getDataValues = async (index: string, field: string, fieldType: string, dslService: DSLService) => {
  const res = (await dslService.fetch(getDataValueQuery(index, field))).aggregations.top_tags.buckets;
  const dataValuesFromBackend: [] = [];
  res.forEach( (e) => {
    if (fieldType === 'string'){
      dataValuesFromBackend.push({label: '"' + e.key + '"', doc_count: e.doc_count});
    }
    else if (fieldType === 'boolean') {
      if (e.key === 1) {
        dataValuesFromBackend.push({label: 'True', doc_count: e.doc_count});
      }
      else {
        dataValuesFromBackend.push({label: 'False', doc_count: e.doc_count});
      }
    }
    else if (fieldType !== 'geo_point'){
      dataValuesFromBackend.push({label: String(e.key), doc_count: e.doc_count});
    }
  })
  return dataValuesFromBackend;
}

const onItemSelect = async ({ setIsOpen, setQuery, item, setStatus }, dslService: DSLService) => {
  if (fieldsFromBackend.length === 0 && indexList.includes(item.itemName)){
    currIndex = item.itemName
    getFields(dslService);
  }
  setQuery(item.label + ' ');
};

export function createPPLSuggestionsPlugin(
  options: CreatePPLSuggestionsPluginProps
): AutocompletePlugin<PPLSuggestion, undefined> {
  return {
    onStateChange: ({ state }) => {
      options.handleQueryChange(state.query, currIndex);
    },
    onSubmit: () => {
      options.handleQuerySearch();
    },
    getSources({ query }) {
      return [
        {
          getItems({ query }) {
            return getSuggestions(query, options.dslService);
          },
          tagName: 'test',
          onSelect: ({ setQuery, setIsOpen, item, state, setStatus}) => {
            onItemSelect({
              setIsOpen,
              setQuery,
              item,
              setStatus,
            }, options.dslService);
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
    }
  }
}