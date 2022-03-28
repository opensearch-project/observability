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
  COMMA_AFTER_FIELD,
  DATA_AFTER_COMMA,
  CLOSE_AFTER_DATA,
  PIPE_AFTER_MATCH,
  FIELD_IN_FIELD_LOOP,
  COMMA_PIPE_AFTER_FIELD,
  PIPE_AFTER_KEEP_EMPTY,
  PIPE_AFTER_CONSECUTIVE,
  EQUAL_AFTER_EVAL_FIELD,
  FIELD_AFTER_EVAL_EQUAL,
  MATH_AFTER_FIELD,
  PIPE_MATH_AFTER_EXPRESSIONS,
  PLUS_MINUS_FIELD_AFTER_FIELDS,
  FIELD_AFTER_PLUS_MINUS,
  COMMA_PIPE_AFTER_FIELDS,
  FIELD_IN_FIELDS_LOOP,
  RARE_TOP_FIELD_LOOP,
  COMMA_PIPE_BY_AFTER_FIELD,
  FIELD_AFTER_BY,
  PIPE_AFTER_GROUP_BY,
  AS_AFTER_FIELD,
  COMMA_PIPE_AFTER_RENAME_FIELD,
  FIELD_AFTER_COMMA,
  PIPE_AFTER_HEAD,
  PLUS_MINUS_FIELD_AFTER_SORT,
  FIELD_AFTER_PLUS_MINUS_SORT,
  COMMA_PIPE_AFTER_SORT_FIELD,
  PLUS_MINUS_FIELD_IN_FIELDS_LOOP,
  FIELD_AFTER_COMMAND,
  FIELD_SPAN_AFTER_GROUP_BY,
  NUM_FIELD_AFTER_AGGREGATION,
  CLOSE_AFTER_FIELD,
  COMMA_PIPE_BY_AFTER_AGGREGATION,
  PIPE_AFTER_STATS_GROUP_BY,
  AGGREGATION_FOR_STATS,
  FIELD_AFTER_SPAN,
  CLOSE_AFTER_SPAN,
  PIPE_AFTER_SPAN,
  STRING_FIELD_AFTER_PARSE,
  PIPE_AFTER_PARSE,
  EQUAL_AFTER_SOURCE,
  INDEX_AFTER_EQUAL,
  PIPE_COMMA_AFTER_INDEX,
  MORE_INDEX_AFTER_COMMA,
} from '../../../../common/constants/autocomplete';

let currIndices: string[] = [];
let currField: string = '';
let currFieldType: string = '';

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
  if (!isEmpty(currIndices)) {
    fieldsFromBackend.length = 0;
    for (let i = 0; i < currIndices.length; i++) {
      const index = currIndices[i];
      const res = await dslService.fetchFields(index);
      if (!res) {
        return;
      }
      const resFieldList = Object.keys(res?.[index].mappings.properties);
      for (let j = 0; j < resFieldList.length; j++) {
        const element = resFieldList[j];
        if (
          res?.[index].mappings.properties[element].properties ||
          res?.[index].mappings.properties[element].fields
        ) {
          fieldsFromBackend.push({ label: element, type: 'string' });
        } else if (res?.[index].mappings.properties[element].type === 'keyword') {
          fieldsFromBackend.push({ label: element, type: 'string' });
        } else {
          fieldsFromBackend.push({
            label: element,
            type: res?.[index].mappings.properties[element].type,
          });
        }
        fieldList.push(element);
      }
    }
  }
};

const getDataValues = async (
  indices: string[],
  field: string,
  fieldType: string,
  dslService: DSLService
): Promise<DataItem[]> => {
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const res = (await dslService.fetch(getDataValueQuery(index, field)))?.aggregations?.top_tags
      ?.buckets;
    if (isEmpty(res)) {
      continue;
    }
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
  }
  return [];
};

export const onItemSelect = async (
  { setQuery, item }: { setQuery: any; item: any },
  dslService: DSLService
) => {
  if (fieldsFromBackend.length === 0 && indexList.includes(item.itemName)) {
    currIndices = [item.itemName];
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

// Function to filter out currently inputed suggestions
const filterSuggestions = (suggestions: AutocompleteItem[], prefix: string) => {
  return suggestions.filter(
    ({ itemName }) =>
      itemName.toLowerCase().startsWith(prefix) && prefix.localeCompare(itemName.toLowerCase())
  );
};

export const parseForIndices = (query: string) => {
  for (let i = 0; i < regexForIndex.length; i++) {
    const groupArray = regexForIndex[i].exec(query);
    if (groupArray) {
      const afterEqual = query.substring(query.indexOf('=') + 1);
      const beforePipe = afterEqual.substring(0, afterEqual.indexOf('|')) || afterEqual;
      const noSpaces = beforePipe.replaceAll(/\s/g, '');
      return noSpaces.split(',');
    }
  }
  return [];
};

const parseForNextSuggestion = (command: string) => {
  for (let i = 0; i < regexForSuggestion.length; i++) {
    const groupArray = regexForSuggestion[i].exec(command);
    if (groupArray) {
      return regexForSuggestion[i];
    }
  }
};

export const parseGetSuggestions = async (
  base: string,
  currQuery: string,
  dslService: DSLService,
  possibleCommands: Array<{ label: string }> = pipeCommands
) => {
  const fullQuery = base ? base + '| ' + currQuery : currQuery;
  const splitSpaceQuery = fullQuery.split(' ');
  const splitPipeQuery = fullQuery.split('|');

  const lastWord = splitSpaceQuery[splitSpaceQuery.length - 1];
  const lastCommand = splitPipeQuery[splitPipeQuery.length - 1];

  if (!base && isEmpty(indicesFromBackend)) {
    await getIndices(dslService);
  }

  if (fullQuery.match(EMPTY_REGEX)) {
    return fillSuggestions(currQuery, lastWord, [{ label: 'source' }]);
  }

  if (isEmpty(currIndices)) {
    currIndices = parseForIndices(base);
    await getFields(dslService);
    currField = '';
    currFieldType = '';
  }

  const next = parseForNextSuggestion(lastCommand);
  if (next) {
    switch (next) {
      case AGGREGATION_FOR_STATS:
        return fillSuggestions(currQuery, lastWord, statsCommands);
      case AS_AFTER_FIELD:
        return fillSuggestions(currQuery, lastWord, [{ label: 'as' }]);
      case COMMA_PIPE_BY_AFTER_FIELD:
      case COMMA_PIPE_BY_AFTER_AGGREGATION:
        return fillSuggestions(currQuery, lastWord, [
          { label: ',' },
          { label: '|' },
          { label: 'by' },
        ]);
      case COMMA_PIPE_AFTER_FIELDS:
      case COMMA_PIPE_AFTER_RENAME_FIELD:
      case COMMA_PIPE_AFTER_SORT_FIELD:
        return fillSuggestions(currQuery, lastWord, [{ label: ',' }, { label: '|' }]);
      case PIPE_COMMA_AFTER_INDEX:
        return filterSuggestions(
          [
            { label: currQuery + '|', input: currQuery, suggestion: '|', itemName: '|' },
            { label: currQuery.trim() + ',', input: currQuery, suggestion: ',', itemName: ',' },
          ],
          lastWord
        );
      case PLUS_MINUS_FIELD_AFTER_FIELDS:
      case PLUS_MINUS_FIELD_AFTER_SORT:
      case PLUS_MINUS_FIELD_IN_FIELDS_LOOP:
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
      case COMMA_PIPE_AFTER_FIELD:
        return fillSuggestions(currQuery, lastWord, [
          { label: ',' },
          { label: '|' },
          { label: 'keepempty=true' },
          { label: 'consecutive=true' },
        ]);
      case CLOSE_AFTER_DATA:
      case CLOSE_AFTER_FIELD:
      case CLOSE_AFTER_SPAN:
        return fillSuggestions(currQuery, lastWord, [{ label: ')' }]);
      case COMMA_AFTER_FIELD:
        currField = COMMA_AFTER_FIELD.exec(lastCommand)![1];
        currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
        await getDataValues(currIndices, currField, currFieldType, dslService);
        return fillSuggestions(currQuery, lastWord, [{ label: ',' }]);
      case FIELD_AFTER_SPAN:
        const matchArray = FIELD_AFTER_SPAN.exec(lastCommand);
        const tempField = matchArray![matchArray!.length - 1];
        if (fieldList.includes(tempField)) {
          currField = tempField;
          currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
          await getDataValues(currIndices, currField, currFieldType, dslService);
          return fillSuggestions(currQuery, lastWord, [{ label: ',' }]);
        } else {
          return fillSuggestions(currQuery, lastWord, fieldsFromBackend);
        }
      case FIELD_AFTER_COMMAND:
      case FIELD_IN_FIELD_LOOP:
      case FIELD_AFTER_EVAL_EQUAL:
      case FIELD_AFTER_PLUS_MINUS:
      case FIELD_IN_FIELDS_LOOP:
      case RARE_TOP_FIELD_LOOP:
      case FIELD_AFTER_BY:
      case FIELD_AFTER_COMMA:
      case FIELD_AFTER_PLUS_MINUS_SORT:
        return fillSuggestions(currQuery, lastWord, fieldsFromBackend);
      case FIELD_SPAN_AFTER_GROUP_BY:
        return fillSuggestions(currQuery, lastWord, [{ label: 'span(' }, ...fieldsFromBackend]);
      case NUM_FIELD_AFTER_AGGREGATION:
        const numberFields = fieldsFromBackend.filter((field: { type: string }) =>
          numberTypes.includes(field.type)
        );
        return fillSuggestions(currQuery, lastWord, numberFields);
      case STRING_FIELD_AFTER_PARSE:
        return fillSuggestions(
          currQuery,
          lastWord,
          fieldsFromBackend.filter((field) => field.type === 'string')
        );
      case PIPE_AFTER_WHERE:
      case PIPE_AFTER_MATCH:
      case PIPE_AFTER_KEEP_EMPTY:
      case PIPE_AFTER_CONSECUTIVE:
      case PIPE_AFTER_GROUP_BY:
      case PIPE_AFTER_HEAD:
      case PIPE_AFTER_STATS_GROUP_BY:
      case PIPE_AFTER_SPAN:
      case PIPE_AFTER_PARSE:
        return fillSuggestions(currQuery, lastWord, [{ label: '|' }]);
      case DATA_AFTER_WHERE_EQUAL:
      case DATA_AFTER_COMMA:
        return fillSuggestions(currQuery, lastWord, dataValuesFromBackend);
      case EQUAL_AFTER_WHERE_FIELD:
      case EQUAL_AFTER_EVAL_FIELD:
        currField = next.exec(lastCommand)![1];
        currFieldType = fieldsFromBackend.find((field) => field.label === currField)?.type || '';
        await getDataValues(currIndices, currField, currFieldType, dslService);
        return fillSuggestions(currQuery, lastWord, [{ label: '=' }]);
      case MATCH_FIELD_AFTER_WHERE:
        return fillSuggestions(currQuery, lastWord, [{ label: 'match(' }, ...fieldsFromBackend]);
      case EQUAL_AFTER_SOURCE:
        return fillSuggestions(currQuery, lastWord, [{ label: '=' }]);
      case INDEX_AFTER_EQUAL:
        return fillSuggestions(currQuery, lastWord, indicesFromBackend);
      case MORE_INDEX_AFTER_COMMA:
        const trimmedIndices = indicesFromBackend.map((index) => {
          return {
            label: currQuery.substring(0, currQuery.lastIndexOf(lastWord)).trim() + index.label,
            input: currQuery,
            suggestion: index.label.substring(lastWord.length),
            itemName: index.label,
          };
        });
        return filterSuggestions(trimmedIndices, lastWord);
      case EMPTY_REGEX:
        if (!base) {
          currIndices = parseForIndices(splitPipeQuery[0]);
          await getFields(dslService);
          currField = '';
          currFieldType = '';
        }
        return fillSuggestions(currQuery, lastWord, possibleCommands);
    }
  }

  return [];
};
