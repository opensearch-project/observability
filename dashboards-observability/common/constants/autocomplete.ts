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

const JUST_SEARCH_REGEX = new RegExp(' search source = (\\S+)');
const SEARCH_WHERE_REGEX = new RegExp('search source = (\\S+) \\| where \\S+ = \\S+');
const SEARCH_MATCH_REGEX = new RegExp('search source = (\\S+) \\| where match\\(\\S+, \\S+\\)');
const JUST_SOURCE_REGEX = new RegExp('source = (\\S+)');
const SOURCE_WHERE_REGEX = new RegExp('source = (\\S+) \\| where \\S+ = \\S+');
const SOURCE_MATCH_REGEX = new RegExp('source = (\\S+) \\| where match\\(\\S+, \\S+\\)');
export const EMPTY_REGEX = new RegExp('^\\s*\\S*$');

// Regex for where command
export const MATCH_FIELD_AFTER_WHERE = new RegExp('^\\s*where\\s+\\S*$');
export const EQUAL_AFTER_WHERE_FIELD = new RegExp('^\\s*where\\s+(\\S+)\\s+$');
export const DATA_AFTER_WHERE_EQUAL = new RegExp('^\\s*where\\s+\\S+\\s*=\\s*\\S*$');
export const PIPE_AFTER_WHERE = new RegExp('^\\s*where\\s+\\S+\\s*=\\s*\\S+\\s+$');
export const FIELD_AFTER_MATCH = new RegExp('^\\s*where\\s+match\\(\\s*\\S*$');
export const COMMA_AFTER_FIELD = new RegExp('^\\s*where\\s+match\\(\\s*(\\S+)\\s+$');
export const DATA_AFTER_COMMA = new RegExp('^\\s*where\\s+match\\(\\s*\\S+\\s*,\\s*$');
export const CLOSE_AFTER_DATA = new RegExp('^\\s*where\\s+match\\(\\s*\\S+\\s*,\\s*\\S+\\s+$');
export const PIPE_AFTER_MATCH = new RegExp(
  '^\\s*where\\s*match\\(\\s*\\S+\\s*,\\s*\\S+\\s*\\S+\\s*\\)\\s*$'
);
// Regex for dedup command
export const FIELD_AFTER_DEDUP = new RegExp('^\\s*dedup\\s*\\S*$');
export const PIPE_COMMA_AFTER_FIELD = new RegExp('^\\s*dedup\\s*\\S+\\s+\\S*$');
export const FIELD_IN_FIELD_LOOP = new RegExp('^\\s*dedup\\s*\\S+\\s*(,\\s*\\S+\\s*)*,\\s*\\S*$');
export const PIPE_COMMA_AFTER_FIELD_LOOP = new RegExp(
  '^\\s*dedup\\s*\\S+\\s*(,\\s*\\S+)+\\s+\\S*$'
);
export const PIPE_AFTER_KEEP_EMPTY = new RegExp(
  '^\\s*dedup\\s*\\S+\\s*(,\\s*\\S+\\s*)*\\s*keepempty=true\\s+$'
);
export const PIPE_AFTER_CONSECUTIVE = new RegExp(
  '^\\s*dedup\\s*\\S+\\s*(,\\s*\\S+\\s*)*\\s*consecutive=true\\s+$'
);

// Regex for eval command
export const FIELD_AFTER_EVAL = new RegExp('^\\s*eval\\s+\\S*$');
export const EQUAL_AFTER_EVAL_FIELD = new RegExp('^\\s*eval\\s+(\\S+)\\s+$');
export const FIELD_AFTER_EVAL_EQUAL = new RegExp('^\\s*eval\\s+\\S+\\s*=\\s*\\S*$');
export const MATH_AFTER_FIELD = new RegExp('^\\s*eval\\s+\\S+\\s*=\\s*\\S+\\s+$');
export const PIPE_MATH_AFTER_EXPRESSIONS = new RegExp(
  '^\\s*eval\\s+(\\S+\\s*=\\s*\\S+(\\s*(\\+|\\-|\\*|\\/)\\s*\\S+)+)+\\s+$'
);

export const regexForSuggestion = [
  EMPTY_REGEX,
  MATCH_FIELD_AFTER_WHERE,
  EQUAL_AFTER_WHERE_FIELD,
  DATA_AFTER_WHERE_EQUAL,
  PIPE_AFTER_WHERE,
  FIELD_AFTER_MATCH,
  COMMA_AFTER_FIELD,
  DATA_AFTER_COMMA,
  CLOSE_AFTER_DATA,
  PIPE_AFTER_MATCH,
  FIELD_AFTER_DEDUP,
  PIPE_COMMA_AFTER_FIELD,
  FIELD_IN_FIELD_LOOP,
  PIPE_COMMA_AFTER_FIELD_LOOP,
  PIPE_AFTER_KEEP_EMPTY,
  PIPE_AFTER_CONSECUTIVE,
  FIELD_AFTER_EVAL,
  EQUAL_AFTER_EVAL_FIELD,
  FIELD_AFTER_EVAL_EQUAL,
  MATH_AFTER_FIELD,
  PIPE_MATH_AFTER_EXPRESSIONS,
];

export const regexForIndex = [
  JUST_SOURCE_REGEX,
  SOURCE_WHERE_REGEX,
  SOURCE_MATCH_REGEX,
  JUST_SEARCH_REGEX,
  SEARCH_WHERE_REGEX,
  SEARCH_MATCH_REGEX,
];
