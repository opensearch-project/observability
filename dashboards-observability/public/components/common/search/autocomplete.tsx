/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './search.scss';
import $ from 'jquery';
import React, {
  useMemo,
  useState
} from 'react';
import { 
  AutocompleteState,
  createAutocomplete
} from '@algolia/autocomplete-core';
import { EuiTextArea } from '@elastic/eui';
import { IQueryBarProps } from './search';
import { getDataValueQuery } from './queries/data_queries';
import DSLService from 'public/services/requests/dsl';
import { uiSettingsService } from '../../../../common/utils';

let currIndex: string = '';
let currField: string = '';
let currFieldType: string = '';

let inFieldsCommaLoop: boolean = false;
let inMatch: boolean = false;
let nextWhere: number = Number.MAX_SAFE_INTEGER;
let nextStats: number = Number.MAX_SAFE_INTEGER;

const indexList: string[] = [];
const fieldList: string[] = [];
const fieldsFromBackend: fieldItem[] = [];
const indicesFromBackend: indexItem[] = [];
const dataValuesFromBackend: dataItem[] = [];

const firstCommand = [{ label: 'source' }];

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
  { label: 'var_samp(' },
  { label: 'var_pop(' },
  { label: 'stddev_samp(' },
  { label: 'stddev_pop(' },
];

const numberTypes = [
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

// Function to create the array of objects to be suggested
const fillSuggestions = (str: string, word: string, items: any) => {
  const lowerWord = word.toLowerCase();
  const filteredList = items.filter(
    (item: { label: string }) => item.label.toLowerCase().startsWith(lowerWord) && lowerWord.localeCompare(item.label.toLowerCase())
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
  const lowerPrefix = prefix.toLowerCase();
  const fullSuggestions: any = [];

  // Check the last full word in the query, then suggest inputs based off that
  if (splittedModel.length === 1) {
    currField = '';
    currIndex = '';
    return getFirstPipe(str, dslService);
  } else if (splittedModel.length > 1) {
    if (splittedModel[splittedModel.length - 2] === '|') {
      inFieldsCommaLoop = false;
      inMatch = false;
      nextWhere = Number.MAX_SAFE_INTEGER;
      nextStats = Number.MAX_SAFE_INTEGER;
      currField = '';
      currFieldType = '';
      return fillSuggestions(str, prefix, pipeCommands);
    } else if (splittedModel[splittedModel.length - 2].includes(',')) {
      if (inFieldsCommaLoop) {
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      if (inMatch) {
        inMatch = true;
        return fillSuggestions(
          str, 
          prefix,
          dataValuesFromBackend
        );
      }
      return fullSuggestions;
    } else if (
      splittedModel[splittedModel.length - 2] === 'source'
    ) {
      return [{ label: str + '=', input: str, suggestion: '=', itemName: '=' }].filter(
        ({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase())
      );
    } else if (
      (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source')
    ) {
      return fillSuggestions(str, prefix, indicesFromBackend);
    } else if (indexList.includes(splittedModel[splittedModel.length - 2])) {
      currIndex = splittedModel[splittedModel.length - 2];
      getFields(dslService);
      return [{ label: str + '|', input: str, suggestion: '|', itemName: '|' }].filter(
        ({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase())
      );
    } else if (splittedModel[splittedModel.length - 2] === 'stats') {
      nextStats = splittedModel.length;
      return fillSuggestions(str, prefix, statsCommands);
    } else if (nextStats === splittedModel.length - 1) {
      if (statsCommands.filter(c => c.label === splittedModel[splittedModel.length - 2]).length > 0) {
        if (splittedModel[splittedModel.length - 2] === 'count()') {
          return [
            { label: str + 'by', input: str, suggestion: 'by'.substring(prefix.length), itemName: 'by' }
          ].filter(({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase())
          );
        } else {
        const numberFields = fieldsFromBackend.filter(
          (field: { label: string, type: string }) =>
            field.label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(field.label.toLowerCase()) && numberTypes.includes(field.type)
        );
        for (let i = 0; i < numberFields.length; i++) {
          var field: {label: string} = numberFields[i];
          fullSuggestions.push({
            label: str.substring(0, str.lastIndexOf(prefix)) + field.label + ' )',
            input: str,
            suggestion: field.label.substring(prefix.length) + ' )',
            itemName: field.label + ' )',
          });
        }
        return fullSuggestions;
        }
      }
    } else if (nextStats === splittedModel.length - 2 && splittedModel[splittedModel.length - 3] === 'count()') {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (nextStats === splittedModel.length - 3) {
      return [
        { label: str + 'by', input: str, suggestion: 'by'.substring(prefix.length), itemName: 'by' },
        { label: str + '|', input: str, suggestion: '|', itemName: '|' }
      ].filter(({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase())
      );
    } else if (nextStats === splittedModel.length - 4) {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    }
    else if (splittedModel[splittedModel.length - 2] === 'fields') {
      inFieldsCommaLoop = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (splittedModel[splittedModel.length - 2] === 'dedup') {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (splittedModel[splittedModel.length - 2] === 'where') {
      nextWhere = splittedModel.length;
      return fillSuggestions(str, prefix, [{label: 'match('}, ...fieldsFromBackend]);
    } else if (splittedModel[splittedModel.length - 2] === 'match(') {
      inMatch = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (nextWhere === splittedModel.length - 1) {
      fullSuggestions.push({
        label: str + '=',
        input: str,
        suggestion: '=',
        itemName: '=',
      });
      currField = splittedModel[splittedModel.length - 2];
      currFieldType = fieldsFromBackend.find((field: {label: string, type: string}) => field.label === currField)?.type || '';
      await getDataValues(currIndex, currField, currFieldType, dslService);
      return fullSuggestions.filter((suggestion: { label: string }) => suggestion.label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(suggestion.label.toLowerCase()));
    }  else if (inMatch && fieldList.includes(splittedModel[splittedModel.length - 2])) {
      inMatch = true;
      currField = splittedModel[splittedModel.length - 2];
      currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
      await getDataValues(currIndex, currField, currFieldType, dslService);
      return [{ label: str + ',', input: str, suggestion: ',', itemName: ','}].filter(
        ({ suggestion }) => suggestion.startsWith(prefix) && prefix !== suggestion
      );
    } else if (nextWhere === splittedModel.length - 2) {
        return fillSuggestions(
          str,
          prefix,
          dataValuesFromBackend
        );
    } else if (nextWhere === splittedModel.length - 3 || nextStats === splittedModel.length - 5 || nextWhere === splittedModel.length - 5) {
      return [{ label: str + '|', input: str, suggestion: '|', itemName: '|' }].filter(
        ({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase())
      );
    } else if (inFieldsCommaLoop) {
      return [
        {
          label: str.substring(0, str.length - 1) + ',',
          input: str.substring(0, str.length - 1),
          suggestion: ',',
          itemName: ',',
        },
        { label: str + '|', input: str, suggestion: '|', itemName: '|' },
      ].filter(({ label }) => label.toLowerCase().startsWith(lowerPrefix) && lowerPrefix.localeCompare(label.toLowerCase()));
    }  else if (inMatch) {
      inMatch = false;
      return [{ label: str + ')', input: str, suggestion: ')', itemName: ')' }].filter(
      ({ suggestion }) => suggestion.startsWith(prefix) && prefix !== suggestion
      );
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
  if (currIndex !== '') {
    const res = await dslService.fetchFields(currIndex);
    fieldsFromBackend.length = 0;
    for (const element in res?.[currIndex].mappings.properties) {
      if (res?.[currIndex].mappings.properties[element].properties) {
        fieldsFromBackend.push({ label: element, type: 'string' })
      } else if (res?.[currIndex].mappings.properties[element].type === 'keyword') {
        fieldsFromBackend.push({ label: element, type: 'string' });
      } else {
        fieldsFromBackend.push({
          label: element,
          type: res?.[currIndex].mappings.properties[element].type,
        });
      }
      fieldList.push(element);
    }
  }
};

const getDataValues = async (
  index: string,
  field: string,
  fieldType: string,
  dslService: DSLService
) => {
  const res = (await dslService.fetch(getDataValueQuery(index, field)))?.aggregations?.top_tags?.buckets || [];
  dataValuesFromBackend.length = 0;
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

type AutocompleteItem = {
  input: string;
  itemName: string;
  label: string;
  suggestion: string;
  __autocomplete_id: number;
};

type fieldItem = {
  label: string;
  type: string;
}

type indexItem = {
  label: string;
}

type dataItem = {
  label: string;
  doc_count: any;
}

export function Autocomplete({
  query,
  tempQuery,
  handleQueryChange,
  handleQuerySearch,
  dslService
}: IQueryBarProps) {

  const [autocompleteState, setAutocompleteState] = useState<AutocompleteState<AutocompleteItem>>({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: tempQuery,
    activeItemId: null,
    status: 'idle',
  });

  const searchBar = document.getElementById('autocomplete-textarea');

  searchBar?.addEventListener('keydown', function (e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && e.shiftKey) {
      handleQuerySearch();
    }
    return () => {
      $('#autocomplete-textarea').unbind('keydown');
    };
  })

  const autocomplete = useMemo(
    () => {
      return createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >(
        {
          openOnFocus: true,
          defaultActiveItemId: 0,
          onStateChange: ({ state }) => {
            setAutocompleteState({
              ...state,
            });
            handleQueryChange(state.query);
          },
          initialState: { 
            ...autocompleteState,
            query: query || '',
          },
          getSources() {
            return [
              {
                sourceId: 'querySuggestions',
                async getItems({ query }) {
                  const suggestions = await getSuggestions(query, dslService);
                  return suggestions;
                },
                onSelect: ({ setQuery, item }) => {
                  onItemSelect(
                    {
                      setQuery,
                      item,
                    },
                    dslService
                  );
                  $("#autocomplete-textarea").blur();
                  $("#autocomplete-textarea").focus();
                }
              },
            ];
          },
        }
      );
  }, [query]);

  return (
    <div
      className="aa-Autocomplete"
      {...autocomplete.getRootProps({ 'id': 'autocomplete-root' })}
    >
      <EuiTextArea
        {...autocomplete.getInputProps({
          id: 'autocomplete-textarea',
          placeholder: 'Enter PPL query to retrieve logs',
          inputElement: null
        })}
      />
      {autocompleteState.isOpen && (
        <div
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
          .filter(Boolean)
          .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
          {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;
              const filteredItems = items.filter((item, index) => { return items.findIndex(i => i.itemName === item.itemName) === index })
              return (
                <div key={`scrollable-${index}`} className="aa-PanelLayout aa-Panel--scrollable" style={uiSettingsService.get('theme:darkMode') ? {backgroundColor: '#1D1E24', border: '2px groove #383444'} : {}}>
                  <div key={`source-${index}`} className="aa-Source">
                    {items.length > 0 && (
                      <ul className="aa-List" {...autocomplete.getListProps()}>
                        {filteredItems.map((item, index) => {
                          const fullWord = item.itemName;
                          return (
                            <li
                              key={item.__autocomplete_id}
                              className="aa-Item"
                              {...autocomplete.getItemProps({
                                item,
                                source,
                              })}
                              style={uiSettingsService.get('theme:darkMode') ? {color: '#DFE5EF'}: {}}
                            >
                              <div className="aa-ItemWrapper">
                                <div className="aa-ItemContent">
                                  <div className="aa-ItemContentBody">
                                    <div
                                      className="aa-ItemContentTitle"
                                      dangerouslySetInnerHTML={{
                                        __html: `<div>
                                        <span><b>${fullWord.slice(0, -item.suggestion.length)}</b>${item.suggestion}</span>
                                      </div>`
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
