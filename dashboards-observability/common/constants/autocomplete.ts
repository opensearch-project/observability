/* eslint-disable prettier/prettier */
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
  'unsigned_long',
];

export interface AutocompleteItem {
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

const JUST_SEARCH_REGEX = new RegExp('\\s*search\\s+source\\s*=\\s*(\\S+)');
const SEARCH_WHERE_REGEX = new RegExp(
  '\\s*search\\s+source\\s*=\\s*(\\S+)\\s*\\|\\s*where\\s+\\S+\\s*=\\s*\\S+'
);
const SEARCH_MATCH_REGEX = new RegExp(
  '\\s*search\\s+source\\s*=\\s*(\\S+)\\s*\\|\\s*where\\s+match\\(\\S+,\\s*\\S+\\)'
);
const JUST_SOURCE_REGEX = new RegExp('\\s*source\\s*=\\s*(\\S+)');
const SOURCE_WHERE_REGEX = new RegExp(
  '\\s*source\\s*=\\s*(\\S+)\\s*\\|\\s*where\\s+\\S+\\s*=\\s*\\S+'
);
const SOURCE_MATCH_REGEX = new RegExp(
  '\\s*source\\s*=\\s*(\\S+)\\s*\\|\\s*where\\s+match\\(\\S+,\\s*\\S+\\)'
);
export const EMPTY_REGEX = new RegExp('^\\s*\\S*$');
export const FIELD_AFTER_COMMAND = new RegExp('^\\s*(dedup|eval|rare|top|rename|)\\s+\\S*$');

// Regex for where command
export const MATCH_FIELD_AFTER_WHERE = new RegExp('^\\s*where\\s+\\S*$');
export const EQUAL_AFTER_WHERE_FIELD = new RegExp('^\\s*where\\s+(\\S+)\\s+$');
export const DATA_AFTER_WHERE_EQUAL = new RegExp('^\\s*where\\s+\\S+\\s*=\\s*\\S*$');
export const PIPE_AFTER_WHERE = new RegExp('^\\s*where\\s+\\S+\\s*=\\s*\\S+\\s+$');
export const FIELD_AFTER_MATCH = new RegExp('^\\s*where\\s+match\\(\\s*\\S*$');
export const COMMA_AFTER_FIELD = new RegExp('^\\s*where\\s+match\\(\\s*(\\S+)\\s+$');
export const DATA_AFTER_COMMA = new RegExp('^\\s*where\\s+match\\(\\s*\\S+\\s*,\\s*$');
export const CLOSE_AFTER_DATA = new RegExp('^\\s*where\\s+match\\(\\s*\\S+\\s*,\\s*\\S+\\s+$');
export const PIPE_AFTER_MATCH = new RegExp('^\\s*where\\s+match\\(\\s*\\S+\\s*,\\s*\\S+\\s*\\S+\\s*\\)\\s*$');

// Regex for dedup command
export const FIELD_IN_FIELD_LOOP = new RegExp('^\\s*dedup\\s*\\d*\\s+\\S+\\s*(,\\s*\\S+\\s*)*,\\s*\\S*$');
export const PIPE_COMMA_AFTER_FIELD = new RegExp('^\\s*dedup\\s*\\d*\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s+$');
export const PIPE_AFTER_KEEP_EMPTY = new RegExp('^\\s*dedup\\s*\\d*\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s*keepempty=true\\s+$');
export const PIPE_AFTER_CONSECUTIVE = new RegExp('^\\s*dedup\\s*\\d*\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s*consecutive=true\\s+$');

// Regex for eval command
export const EQUAL_AFTER_EVAL_FIELD = new RegExp('^\\s*eval\\s+(\\S+)\\s+$');
export const FIELD_AFTER_EVAL_EQUAL = new RegExp('^\\s*eval\\s+\\S+\\s*=\\s*\\S*$');
export const MATH_AFTER_FIELD = new RegExp('^\\s*eval\\s+\\S+\\s*=\\s*\\S+\\s+$');
export const PIPE_MATH_AFTER_EXPRESSIONS = new RegExp('^\\s*eval\\s+(\\S+\\s*=\\s*\\S+(\\s*(\\+|\\-|\\*|\\/)\\s*\\S+)+)+\\s+$');

// Regex for fields command
export const PLUS_MINUS_FIELD_AFTER_FIELDS = new RegExp('^\\s*fields\\s+\\S*$');
export const FIELD_AFTER_PLUS_MINUS = new RegExp('^\\s*fields\\s+(\\+|\\-)\\s*\\S*$');
export const PIPE_COMMA_AFTER_FIELDS = new RegExp('^\\s*fields\\s+((\\+|\\-)\\s+)?\\S+\\s*(,\\s*\\S+\\s*)*\\s+$');
export const FIELD_IN_FIELDS_LOOP = new RegExp('^\\s*fields\\s+((\\+|\\-)\\s+)?\\S+\\s*(,\\s*\\S+\\s*)*,\\s*\\S*$');

// Regex for rare/top command
export const PIPE_COMMA_BY_AFTER_FIELD = new RegExp('^\\s*(rare|top(\\s+\\d+)?)\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s+\\S*$');
export const RARE_TOP_FIELD_LOOP = new RegExp('^\\s*(rare|top(\\s+\\d+)?)\\s+\\S+\\s*(,\\s*\\S+\\s*)*,\\s*\\S*$');
export const FIELD_AFTER_BY = new RegExp('^\\s*(rare|top(\\s+\\d+)?)\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s+by\\s+\\S*$');
export const PIPE_AFTER_GROUP_BY = new RegExp('^\\s*(rare|top(\\s+\\d+)?)\\s+\\S+\\s*(,\\s*\\S+\\s*)*\\s+by\\s+\\S+\\s+$');

// Regex for rename command
export const AS_AFTER_FIELD = new RegExp('^\\s*rename\\s+((,\\s*)?\\S+\\s+as\\s+\\S+\\s*)*\\s*(,\\s*)?\\S+\\s+\\S*$');
export const PIPE_COMMA_AFTER_RENAME_FIELD = new RegExp('^\\s*rename\\s+((,\\s*)?\\S+\\s+as\\s+\\S+\\s*)+$');
export const FIELD_AFTER_COMMA = new RegExp('^\\s*rename\\s+((,\\s*)?\\S+\\s+as\\s+\\S+\\s*)+\\s*,\\s+\\S*$');

// Regex for head command
export const PIPE_AFTER_HEAD = new RegExp('^\\s*head\\s+\\d+\\s+');

// Regex for sort command
export const PLUS_MINUS_FIELD_AFTER_SORT = new RegExp('^\\s*sort(\\s+\\d+)?\\s+\\S*$');
export const FIELD_AFTER_PLUS_MINUS_SORT = new RegExp('^\\s*sort(\\s+\\d+)?((,\\s*)?\\s+(\\+|\\-)?\\s*\\S+\\s*)*\\s+(\\+|\\-)\\s*\\S*$');
export const PIPE_COMMA_AFTER_SORT_FIELD = new RegExp('^\\s*sort(\\s+\\d+)?((,\\s*)?\\s+(\\+|\\-)?\\s*\\S+\\s*)*\\s+\\S+\\s+$')
export const PLUS_MINUS_FIELD_IN_FIELDS_LOOP = new RegExp('^\\s*sort(\\s+\\d+)?((,\\s*)?\\s+(\\+|\\-)?\\s*\\S+\\s*)*,\\s+\\S*$');

// Regex for stats command
export const AGGREGATION_AFTER_STATS = new RegExp('^\\s*stats\\s+\\S*$');
export const FIELD_AFTER_STATS_GROUP_BY = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))+\\s+by\\s+\\S*$');
export const FIELD_AFTER_AGGREGATION = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))*(,\\s*)?(sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S*$');
export const CLOSE_AFTER_FIELD = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))*(,\\s*)?(sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s+$');
export const PIPE_COMMA_BY_AFTER_AGGREGATION = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))+\\s+\\S*$');
export const PIPE_AFTER_STATS_GROUP_BY = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))+\\s+by\\s+\\S+\\s+$');
export const AGGREGATION_LOOP_AFTER_COMMA = new RegExp('^\\s*stats\\s+((,\\s*)?((sum|avg|max|min|var_samp|var_pop|stddev_samp|stddev_pop)\\(\\s*\\S+\\s*\\)\\s*)|((,\\s*)?count\\(\\)\\s*))+\\s+,\\s*\\S*$');

export const regexForSuggestion = [
  EMPTY_REGEX,
  FIELD_AFTER_COMMAND,
  MATCH_FIELD_AFTER_WHERE,
  FIELD_AFTER_MATCH,
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
  AGGREGATION_AFTER_STATS,
  FIELD_AFTER_STATS_GROUP_BY,
  FIELD_AFTER_AGGREGATION,
  CLOSE_AFTER_FIELD,
  PIPE_COMMA_BY_AFTER_AGGREGATION,
  PIPE_AFTER_STATS_GROUP_BY,
  AGGREGATION_LOOP_AFTER_COMMA,
];

export const regexForIndex = [
  JUST_SOURCE_REGEX,
  SOURCE_WHERE_REGEX,
  SOURCE_MATCH_REGEX,
  JUST_SEARCH_REGEX,
  SEARCH_WHERE_REGEX,
  SEARCH_MATCH_REGEX,
];
