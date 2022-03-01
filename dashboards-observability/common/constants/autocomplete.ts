/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable prettier/prettier */

import { BaseItem } from '@algolia/autocomplete-core';

export const firstCommand = [{ label: 'source' }];

export const pipeCommands = [
  { label: 'dedup' },
  { label: 'eval' },
  { label: 'fields' },
  { label: 'head' },
  { label: 'parse' },
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
  'unsigned_long',
];

export interface AutocompleteItem extends BaseItem {
  input: string;
  itemName: string;
  label: string;
  suggestion: string;
  __autocomplete_id?: number;
}

export interface FieldItem {
  label: string;
  type: string;
}

export interface IndexItem {
  label: string;
}

export interface DataItem {
  label: string;
  doc_count: any;
}

const JUST_SEARCH_REGEX = /\s*search\s+source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*/;
const SEARCH_WHERE_REGEX = /\s*search\s+source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*\s*\|\s*where\s+\S+\s*=\s*\S+/;
const SEARCH_MATCH_REGEX = /\s*search\s+source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*\s*\|\s*where\s+match\(\S+,\s*\S+\)/;
const JUST_SOURCE_REGEX = /\s*source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*/;
const SOURCE_WHERE_REGEX = /\s*source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*\s*\|\s*where\s+\S+\s*=\s*\S+/;
const SOURCE_MATCH_REGEX = /\s*source\s*=\s*[^\\\/\?\"\<\>\|\s\,\#]*(\s*,\s*[^\\\/\?\"\<\>\|\s\,\#]+)*\s*\|\s*where\s+match\(\S+,\s*\S+\)/;
export const EMPTY_REGEX = /^\s*\S*$/;
export const FIELD_AFTER_COMMAND = /^\s*(dedup|eval|rare|top|rename|where\s+match\()\s+\S*$/;

// Regex for where command
export const MATCH_FIELD_AFTER_WHERE = /^\s*where\s+\S*$/;
export const EQUAL_AFTER_WHERE_FIELD = /^\s*where\s+(\S+)\s+$/;
export const DATA_AFTER_WHERE_EQUAL = /^\s*where\s+\S+\s*=\s*(("(\w|\s)*)|(\d*\.?\d*)|\w*)$/;
export const PIPE_AFTER_WHERE = /^\s*where\s+\S+\s*=\s*(("(\w|\s)+")|(\d+\.?\d*)|\w+)\s+$/;
export const COMMA_AFTER_FIELD = /^\s*where\s+match\(\s*([^\s,]+)\s*$/;
export const DATA_AFTER_COMMA = /^\s*where\s+match\(\s*\S+\s*,\s*(("(\w|\s)*)|(\d*\.?\d*)|\w*)$/;
export const CLOSE_AFTER_DATA = /^\s*where\s+match\(\s*\S+\s*,\s*(("(\w|\s)+")|(\d+\.?\d*)|\w+)\s+$/;
export const PIPE_AFTER_MATCH = /^\s*where\s+match\(\s*\S+\s*,\s*(("(\w|\s)+")|(\d+\.?\d*)|\w+)\s*\)\s*$/;

// Regex for dedup command
export const FIELD_IN_FIELD_LOOP = /^\s*dedup\s*\d*\s+\S+\s*(,\s*\S+\s*)*,\s*([^\s,]*)$/;
export const PIPE_COMMA_AFTER_FIELD = /^\s*dedup\s*\d*\s+\S+\s*(,\s*\S+\s*)*\s+$/;
export const PIPE_AFTER_KEEP_EMPTY = /^\s*dedup\s*\d*\s+\S+\s*(,\s*\S+\s*)*\s*keepempty=true\s+$/;
export const PIPE_AFTER_CONSECUTIVE = /^\s*dedup\s*\d*\s+\S+\s*(,\s*\S+\s*)*\s*consecutive=true\s+$/;

// Regex for eval command
export const EQUAL_AFTER_EVAL_FIELD = /^\s*eval\s+(\S+)\s+$/;
export const FIELD_AFTER_EVAL_EQUAL = /^\s*eval\s+\S+\s*=\s*\S*$/;
export const MATH_AFTER_FIELD = /^\s*eval\s+\S+\s*=\s*\S+\s+$/;
export const PIPE_MATH_AFTER_EXPRESSIONS = /^\s*eval\s+(\S+\s*=\s*\S+(\s*(\+|\-|\*|\/)\s*\S+)+)+\s+$/;

// Regex for fields command
export const PLUS_MINUS_FIELD_AFTER_FIELDS = /^\s*fields\s+\S*$/;
export const FIELD_AFTER_PLUS_MINUS = /^\s*fields\s+(\+|\-)\s*\S*$/;
export const PIPE_COMMA_AFTER_FIELDS = /^\s*fields\s+((\+|\-)\s+)?\S+\s*(,\s*\S+\s*)*\s+$/;
export const FIELD_IN_FIELDS_LOOP = /^\s*fields\s+((\+|\-)\s+)?\S+\s*(,\s*\S+\s*)*,\s*\S*$/;

// Regex for rare/top command
export const PIPE_COMMA_BY_AFTER_FIELD = /^\s*(rare|top(\s+\d+)?)\s+\S+\s*(,\s*\S+\s*)*\s+\S*$/;
export const RARE_TOP_FIELD_LOOP = /^\s*(rare|top(\s+\d+)?)\s+\S+\s*(,\s*\S+\s*)*,\s*\S*$/;
export const FIELD_AFTER_BY = /^\s*(rare|top(\s+\d+)?)\s+\S+\s*(,\s*\S+\s*)*\s+by\s+\S*$/;
export const PIPE_AFTER_GROUP_BY = /^\s*(rare|top(\s+\d+)?)\s+\S+\s*(,\s*\S+\s*)*\s+by\s+\S+\s+$/;

// Regex for rename command
export const AS_AFTER_FIELD = /^\s*rename\s+((,\s*)?\S+\s+as\s+\S+\s*)*\s*(,\s*)?\S+\s+\S*$/;
export const PIPE_COMMA_AFTER_RENAME_FIELD = /^\s*rename\s+((,\s*)?\S+\s+as\s+\S+\s*)+$/;
export const FIELD_AFTER_COMMA = /^\s*rename\s+((,\s*)?\S+\s+as\s+\S+\s*)+\s*,\s+\S*$/;

// Regex for head command
export const PIPE_AFTER_HEAD = /^\s*head\s+\d+\s+/;

// Regex for sort command
export const PLUS_MINUS_FIELD_AFTER_SORT = /^\s*sort(\s+\d+)?\s+\S*$/;
export const FIELD_AFTER_PLUS_MINUS_SORT = /^\s*sort(\s+\d+)?((,\s*)?\s+(\+|\-)?\s*\S+\s*)*\s+(\+|\-)\s*\S*$/;
export const PIPE_COMMA_AFTER_SORT_FIELD = /^\s*sort(\s+\d+)?((,\s*)?\s+(\+|\-)?\s*\S+\s*)*\s+\S+\s+$/;
export const PLUS_MINUS_FIELD_IN_FIELDS_LOOP = /^\s*sort(\s+\d+)?((,\s*)?\s+(\+|\-)?\s*\S+\s*)*,\s+\S*$/;

// Regex for stats command
export const FIELD_SPAN_AFTER_GROUP_BY = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+by\s+\S*$/;
export const NUM_FIELD_AFTER_AGGREGATION = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))*(,\s*)?(sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S*$/;
export const FIELD_AFTER_SPAN =  /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+by\s+span\(\s*([^\s,]*)\s*$/;
export const CLOSE_AFTER_SPAN = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+by\s+span\(\s*[^\s,]+\s*,\s*(("(\w|\s)+")|(\d+\.?\d*)|\w+)\s+$/;
export const PIPE_AFTER_SPAN = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+by\s+span\(\s*[^\s,]+\s*,\s*(("(\w|\s)*")|(\d*\.?\d*)|\w*)\s*\)\s*$/;
export const CLOSE_AFTER_FIELD = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))*(,\s*)?(sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s+$/;
export const PIPE_COMMA_BY_AFTER_AGGREGATION = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+\S*$/;
export const PIPE_AFTER_STATS_GROUP_BY = /^\s*stats\s+((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+by\s+\S+\s+$/;
export const AGGREGATION_FOR_STATS= /^\s*stats\s+(((,\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\(\s*\S+\s*\)\s*)|((,\s*)?count\(\)\s*))+\s+,\s*)?\S*$/;

export const regexForSuggestion = [
  EMPTY_REGEX,
  FIELD_AFTER_COMMAND,
  MATCH_FIELD_AFTER_WHERE,
  EQUAL_AFTER_WHERE_FIELD,
  DATA_AFTER_WHERE_EQUAL,
  PIPE_AFTER_WHERE,
  COMMA_AFTER_FIELD,
  DATA_AFTER_COMMA,
  CLOSE_AFTER_DATA,
  PIPE_AFTER_MATCH,
  FIELD_IN_FIELD_LOOP,
  PIPE_COMMA_AFTER_FIELD,
  PIPE_AFTER_KEEP_EMPTY,
  PIPE_AFTER_CONSECUTIVE,
  EQUAL_AFTER_EVAL_FIELD,
  FIELD_AFTER_EVAL_EQUAL,
  MATH_AFTER_FIELD,
  PIPE_MATH_AFTER_EXPRESSIONS,
  PLUS_MINUS_FIELD_AFTER_FIELDS,
  FIELD_AFTER_PLUS_MINUS,
  PIPE_COMMA_AFTER_FIELDS,
  FIELD_IN_FIELDS_LOOP,
  PIPE_COMMA_BY_AFTER_FIELD,
  RARE_TOP_FIELD_LOOP,
  FIELD_AFTER_BY,
  PIPE_AFTER_GROUP_BY,
  PIPE_COMMA_AFTER_RENAME_FIELD,
  FIELD_AFTER_COMMA,
  AS_AFTER_FIELD,
  PIPE_AFTER_HEAD,
  PLUS_MINUS_FIELD_AFTER_SORT,
  FIELD_AFTER_PLUS_MINUS_SORT,
  PLUS_MINUS_FIELD_IN_FIELDS_LOOP,
  PIPE_COMMA_AFTER_SORT_FIELD,
  FIELD_SPAN_AFTER_GROUP_BY,
  NUM_FIELD_AFTER_AGGREGATION,
  FIELD_AFTER_SPAN,
  CLOSE_AFTER_SPAN,
  PIPE_AFTER_SPAN,
  CLOSE_AFTER_FIELD,
  PIPE_COMMA_BY_AFTER_AGGREGATION,
  PIPE_AFTER_STATS_GROUP_BY,
  AGGREGATION_FOR_STATS,
];

export const regexForIndex = [
  JUST_SOURCE_REGEX,
  SOURCE_WHERE_REGEX,
  SOURCE_MATCH_REGEX,
  JUST_SEARCH_REGEX,
  SEARCH_WHERE_REGEX,
  SEARCH_MATCH_REGEX,
];
