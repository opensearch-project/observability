/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import DSLService from 'public/services/requests/dsl';
import { isEmpty } from 'lodash';
import { getDataValueQuery } from './queries/data_queries';
import {
  firstCommand,
  statsCommands,
  numberTypes,
  pipeCommands,
  DataItem,
  FieldItem,
  IndexItem,
  AutocompleteItem,
  regexForIndex,
  regexForSuggestion,
  PIPE_AFTER_WHERE,
  DATA_AFTER_WHERE_EQUAL,
  EMPTY_REGEX,
  EQUAL_AFTER_WHERE_FIELD,
  MATCH_FIELD_AFTER_WHERE,
  FIELD_AFTER_MATCH,
  COMMA_AFTER_FIELD,
  DATA_AFTER_COMMA,
  CLOSE_AFTER_DATA,
  PIPE_AFTER_MATCH,
  FIELD_AFTER_DEDUP,
  FIELD_IN_FIELD_LOOP,
  PIPE_COMMA_AFTER_FIELD,
  PIPE_AFTER_KEEP_EMPTY,
  PIPE_AFTER_CONSECUTIVE,
  FIELD_AFTER_EVAL,
  EQUAL_AFTER_EVAL_FIELD,
  FIELD_AFTER_EVAL_EQUAL,
  MATH_AFTER_FIELD,
  PIPE_MATH_AFTER_EXPRESSIONS,
  PLUS_MINUS_FIELD_AFTER_FIELDS,
  FIELD_AFTER_PLUS_MINUS,
  PIPE_COMMA_AFTER_FIELDS,
  FIELD_IN_FIELDS_LOOP,
} from '../../../../common/constants/autocomplete';

let currIndex: string = '';
let currField: string = '';
let currFieldType: string = '';

let inFieldsCommaLoop: boolean = false;
let inMatch: boolean = false;
let nextWhere: number = Number.MAX_SAFE_INTEGER;
let nextStats: number = Number.MAX_SAFE_INTEGER;

const indexList: string[] = [];
const fieldList: string[] = [];
const fieldsFromBackend: FieldItem[] = [];
const indicesFromBackend: IndexItem[] = [];
const dataValuesFromBackend: DataItem[] = [];

const getIndices = async (dslService: DSLService): Promise<void> => {
  if (indicesFromBackend.length === 0) {
    const indices = (await dslService.fetchIndices()).filter(
      ({ index }: { index: any }) => !index.startsWith('.')
    );
    for (let i = 0; i < indices.length; i++) {
      indicesFromBackend.push({
        label: indices[i].index,
      });
      indexList.push(indices[i].index);
    }
  }
};

const getFields = async (dslService: DSLService): Promise<void> => {
  if (currIndex !== '') {
    const res = await dslService.fetchFields(currIndex);
    fieldsFromBackend.length = 0;
    if (!res) {
      return;
    }
    const resFieldList = Object.keys(res?.[currIndex].mappings.properties);
    for (let i = 0; i < resFieldList.length; i++) {
      const element = resFieldList[i];
      if (
        res?.[currIndex].mappings.properties[element].properties ||
        res?.[currIndex].mappings.properties[element].fields
      ) {
        fieldsFromBackend.push({ label: element, type: 'string' });
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
): Promise<DataItem[]> => {
  const res =
    (await dslService.fetch(getDataValueQuery(index, field)))?.aggregations?.top_tags?.buckets ||
    [];
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

export const onItemSelect = async (
  { setQuery, item }: { setQuery: any; item: any },
  dslService: DSLService
) => {
  if (fieldsFromBackend.length === 0 && indexList.includes(item.itemName)) {
    currIndex = item.itemName;
    getFields(dslService);
  }
  setQuery(item.label + ' ');
};

// Function to create the array of objects to be suggested
const fillSuggestions = (str: string, word: string, items: any): AutocompleteItem[] => {
  const lowerWord = word.toLowerCase();
  const suggestionList = [];
  for (let i = 0; i < items.length; i++) {
    suggestionList.push({
      label: str.substring(0, str.lastIndexOf(word)) + items[i].label,
      input: str,
      suggestion: items[i].label.substring(word.length),
      itemName: items[i].label,
    });
  }
  return filterSuggestions(suggestionList, lowerWord);
};

// Function for the first command in query, also needs to get available indices
const getFirstPipe = async (str: string, dslService: DSLService): Promise<AutocompleteItem[]> => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  getIndices(dslService);
  return fillSuggestions(str, prefix, firstCommand);
};

// Function to filter out currently inputed suggestions
const filterSuggestions = (suggestions: AutocompleteItem[], prefix: string) => {
  return suggestions.filter(
    ({ itemName }) =>
      itemName.toLowerCase().startsWith(prefix) && prefix.localeCompare(itemName.toLowerCase())
  );
};

// Main logic behind autocomplete (Based on most recent inputs)
export const getFullSuggestions = async (
  base: string,
  str: string,
  dslService: DSLService
): Promise<AutocompleteItem[]> => {
  const splittedModel = str.split(' ');
  const prefix = splittedModel[splittedModel.length - 1];
  const lowerPrefix = prefix.toLowerCase();
  const fullSuggestions: AutocompleteItem[] = [];

  // Check the last full word in the query, then suggest inputs based off that
  if (splittedModel.length === 1) {
    currField = '';
    currIndex = '';
    return getFirstPipe(str, dslService);
  } else if (splittedModel.length > 1) {
    // Suggest commands after pipe
    if (splittedModel[splittedModel.length - 2] === '|') {
      inFieldsCommaLoop = false;
      inMatch = false;
      nextWhere = Number.MAX_SAFE_INTEGER;
      nextStats = Number.MAX_SAFE_INTEGER;
      currField = '';
      currFieldType = '';
      return fillSuggestions(str, prefix, pipeCommands);
    } else if (splittedModel[splittedModel.length - 2].includes(',')) {
      // Suggest more fields if in fields command
      if (inFieldsCommaLoop) {
        return fillSuggestions(str, prefix, fieldsFromBackend);
      }
      // Suggest data values if in match command
      if (inMatch) {
        inMatch = true;
        return fillSuggestions(str, prefix, dataValuesFromBackend);
      }
      return fullSuggestions;
      // Suggest = after source
    } else if (splittedModel[splittedModel.length - 2] === 'source') {
      return filterSuggestions(
        [{ label: str + '=', input: str, suggestion: '=', itemName: '=' }],
        lowerPrefix
      );
      // Suggest indices after source =
    } else if (splittedModel.length > 2 && splittedModel[splittedModel.length - 3] === 'source') {
      return fillSuggestions(str, prefix, indicesFromBackend);
      // Suggest pipe after setting source
    } else if (indexList.includes(splittedModel[splittedModel.length - 2])) {
      currIndex = splittedModel[splittedModel.length - 2];
      getFields(dslService);
      return filterSuggestions(
        [{ label: str + '|', input: str, suggestion: '|', itemName: '|' }],
        lowerPrefix
      );
      // Suggest stats commands after stats
    } else if (splittedModel[splittedModel.length - 2] === 'stats') {
      nextStats = splittedModel.length;
      return fillSuggestions(str, prefix, statsCommands);
    } else if (nextStats === splittedModel.length - 1) {
      if (
        statsCommands.filter((c) => c.label === splittedModel[splittedModel.length - 2]).length > 0
      ) {
        // Suggest by after count()
        if (splittedModel[splittedModel.length - 2] === 'count()') {
          return filterSuggestions(
            [
              {
                label: str + 'by',
                input: str,
                suggestion: 'by'.substring(prefix.length),
                itemName: 'by',
              },
            ],
            lowerPrefix
          );
          // Suggest fields with number type after other stats commands
        } else {
          const numberFields = fieldsFromBackend.filter((field: { type: string }) =>
            numberTypes.includes(field.type)
          );
          for (let i = 0; i < numberFields.length; i++) {
            const field: { label: string } = numberFields[i];
            fullSuggestions.push({
              label: str.substring(0, str.lastIndexOf(prefix)) + field.label + ' )',
              input: str,
              suggestion: field.label.substring(prefix.length) + ' )',
              itemName: field.label + ' )',
            });
          }
          return filterSuggestions(fullSuggestions, lowerPrefix);
        }
      }
      // Suggest fields after count() by
    } else if (
      nextStats === splittedModel.length - 2 &&
      splittedModel[splittedModel.length - 3] === 'count()'
    ) {
      return fillSuggestions(str, prefix, fieldsFromBackend);
    } else if (nextStats === splittedModel.length - 3) {
      // Suggest pipe after count() by [field]
      if (splittedModel[splittedModel.length - 3] === 'by') {
        return filterSuggestions(
          [{ label: str + '|', input: str, suggestion: '|', itemName: '|' }],
          lowerPrefix
        );
        // Suggest by and pipe after stats command for grouping or to start new command
      } else {
        return filterSuggestions(
          [
            {
              label: str + 'by',
              input: str,
              suggestion: 'by'.substring(prefix.length),
              itemName: 'by',
            },
            { label: str + '|', input: str, suggestion: '|', itemName: '|' },
          ],
          lowerPrefix
        );
      }
      // Suggest fields after stats command for grouping
    } else if (nextStats === splittedModel.length - 4) {
      return fillSuggestions(str, prefix, fieldsFromBackend);
      // Suggest fields after fields
    } else if (splittedModel[splittedModel.length - 2] === 'fields') {
      inFieldsCommaLoop = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
      // Suggest fields after dedup
    } else if (splittedModel[splittedModel.length - 2] === 'dedup') {
      return fillSuggestions(str, prefix, fieldsFromBackend);
      // Suggest 'match(' or fields after where
    } else if (splittedModel[splittedModel.length - 2] === 'where') {
      nextWhere = splittedModel.length;
      return fillSuggestions(str, prefix, [{ label: 'match(' }, ...fieldsFromBackend]);
      // Suggest fields after match(
    } else if (splittedModel[splittedModel.length - 2] === 'match(') {
      inMatch = true;
      return fillSuggestions(str, prefix, fieldsFromBackend);
      // Suggest = after where [field]
    } else if (nextWhere === splittedModel.length - 1) {
      fullSuggestions.push({
        label: str + '=',
        input: str,
        suggestion: '=',
        itemName: '=',
      });
      currField = splittedModel[splittedModel.length - 2];
      currFieldType =
        fieldsFromBackend.find(
          (field: { label: string; type: string }) => field.label === currField
        )?.type || '';
      await getDataValues(currIndex, currField, currFieldType, dslService);
      return filterSuggestions(fullSuggestions, lowerPrefix);
      // Suggest , after match([field]
    } else if (inMatch && fieldList.includes(splittedModel[splittedModel.length - 2])) {
      currField = splittedModel[splittedModel.length - 2];
      currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
      await getDataValues(currIndex, currField, currFieldType, dslService);
      return filterSuggestions(
        [{ label: str + ',', input: str, suggestion: ',', itemName: ',' }],
        lowerPrefix
      );
      // Suggest data values after where [field] =
    } else if (nextWhere === splittedModel.length - 2) {
      return fillSuggestions(str, prefix, dataValuesFromBackend);
      // Suggest pipe after where or stats command is finished
    } else if (
      nextWhere === splittedModel.length - 3 ||
      nextStats === splittedModel.length - 5 ||
      nextWhere === splittedModel.length - 5
    ) {
      return filterSuggestions(
        [{ label: str + '|', input: str, suggestion: '|', itemName: '|' }],
        lowerPrefix
      );
      // Suggest , after first field in fields command
    } else if (inFieldsCommaLoop) {
      return filterSuggestions(
        [
          {
            label: str.substring(0, str.length - 1) + ',',
            input: str.substring(0, str.length - 1),
            suggestion: ',',
            itemName: ',',
          },
          { label: str + '|', input: str, suggestion: '|', itemName: '|' },
        ],
        lowerPrefix
      );
      // Suggest ) after match([field], [data])
    } else if (inMatch) {
      inMatch = false;
      return filterSuggestions(
        [{ label: str + ')', input: str, suggestion: ')', itemName: ')' }],
        lowerPrefix
      );
    }
    return [];
  }
  return [];
};

const parseForIndex = (query: string) => {
  for (let i = 0; i < regexForIndex.length; i++) {
    const groupArray = regexForIndex[i].exec(query);
    if (groupArray) {
      return groupArray[1];
    }
  }
  return '';
};

const parseForNextSuggestion = (command: string) => {
  for (let i = 0; i < regexForSuggestion.length; i++) {
    const groupArray = regexForSuggestion[i].exec(command);
    if (groupArray) {
      return regexForSuggestion[i];
    }
  }
};

export const getSuggestionsAfterSource = async (
  base: string,
  currQuery: string,
  dslService: DSLService
) => {
  const fullQuery = base + '| ' + currQuery;
  const splitSpaceQuery = fullQuery.split(' ');
  const splitPipeQuery = fullQuery.split('|');

  const lastWord = splitSpaceQuery[splitSpaceQuery.length - 1];
  const lastCommand = splitPipeQuery[splitPipeQuery.length - 1];

  if (isEmpty(currQuery)) {
    currIndex = parseForIndex(base);
    getFields(dslService);
    currField = '';
    currFieldType = '';
    return fillSuggestions(currQuery, lastWord, pipeCommands);
  }
  const next = parseForNextSuggestion(lastCommand);
  console.log(next);
  if (next) {
    switch (next) {
      case PIPE_COMMA_AFTER_FIELDS:
        return fillSuggestions(currQuery, lastWord, [{ label: ',' }, { label: '|' }]);
      case PLUS_MINUS_FIELD_AFTER_FIELDS:
        return fillSuggestions(currQuery, lastWord, [
          { label: '+' },
          { label: '-' },
          ...fieldsFromBackend,
        ]);
      case PIPE_MATH_AFTER_EXPRESSIONS:
        return fillSuggestions(currQuery, lastWord, [
          { label: '|' },
          { label: '+' },
          { label: '-' },
          { label: '*' },
          { label: '/' },
        ]);
      case MATH_AFTER_FIELD:
        return fillSuggestions(currQuery, lastWord, [
          { label: '+' },
          { label: '-' },
          { label: '*' },
          { label: '/' },
        ]);
      case PIPE_COMMA_AFTER_FIELD:
        return fillSuggestions(currQuery, lastWord, [
          { label: ',' },
          { label: '|' },
          { label: 'keepempty=true' },
          { label: 'consecutive=true' },
        ]);
      case CLOSE_AFTER_DATA:
        return fillSuggestions(currQuery, lastWord, [{ label: ')' }]);
      case COMMA_AFTER_FIELD:
        currField = COMMA_AFTER_FIELD.exec(lastCommand)![1];
        currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
        await getDataValues(currIndex, currField, currFieldType, dslService);
        return fillSuggestions(currQuery, lastWord, [{ label: ',' }]);
      case FIELD_AFTER_MATCH:
      case FIELD_AFTER_DEDUP:
      case FIELD_IN_FIELD_LOOP:
      case FIELD_AFTER_EVAL:
      case FIELD_AFTER_EVAL_EQUAL:
      case FIELD_AFTER_PLUS_MINUS:
      case FIELD_IN_FIELDS_LOOP:
        return fillSuggestions(currQuery, lastWord, fieldsFromBackend);
      case PIPE_AFTER_WHERE:
      case PIPE_AFTER_MATCH:
      case PIPE_AFTER_KEEP_EMPTY:
      case PIPE_AFTER_CONSECUTIVE:
        return fillSuggestions(currQuery, lastWord, [{ label: '|' }]);
      case DATA_AFTER_WHERE_EQUAL:
      case DATA_AFTER_COMMA:
        return fillSuggestions(currQuery, lastWord, dataValuesFromBackend);
      case EQUAL_AFTER_WHERE_FIELD:
      case EQUAL_AFTER_EVAL_FIELD:
        currField = next.exec(lastCommand)![1];
        currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
        await getDataValues(currIndex, currField, currFieldType, dslService);
        return fillSuggestions(currQuery, lastWord, [{ label: '=' }]);
      case MATCH_FIELD_AFTER_WHERE:
        return fillSuggestions(currQuery, lastWord, [{ label: 'match(' }, ...fieldsFromBackend]);
      case EMPTY_REGEX:
        return fillSuggestions(currQuery, lastWord, pipeCommands);
    }
  }

  return [];
};
