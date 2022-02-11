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

const JUST_SOURCE_REGEX = new RegExp('source = (\\S+)');
const SOURCE_WHERE_REGEX = new RegExp('source = (\\S+) \\| where \\S+ = \\S+');
const SOURCE_MATCH_REGEX = new RegExp('source = (\\S+) \\| where match\\(\\S+, \\S+\\)');
export const EMPTY_REGEX = new RegExp('\\s+');
export const MATCH_FIELD_AFTER_WHERE = new RegExp('\\s*where\\s*\\S*');
export const EQUAL_AFTER_FIELD = new RegExp('\\s*where\\s*(\\S+)\\s+');
export const DATA_AFTER_EQUAL = new RegExp('\\s*where\\s*\\S+\\s*=\\s*\\S*');
export const PIPE_AFTER_WHERE = new RegExp('\\s*where\\s*\\S+\\s*=\\s*\\S+\\s+');
export const FIELD_AFTER_MATCH = new RegExp('\\s*where\\s*match\\(\\s*\\S*');
export const COMMA_AFTER_FIELD = new RegExp('\\s*where\\s*match\\(\\s*(\\S+)\\s+');
export const DATA_AFTER_COMMA = new RegExp('\\s*where\\s*match\\(\\s*\\S+\\s*,\\s*');
export const CLOSE_AFTER_DATA = new RegExp('\\s*where\\s*match\\(\\s*\\S+\\s*,\\s*\\S+\\s+');
export const PIPE_AFTER_MATCH = new RegExp(
  '\\s*where\\s*match\\(\\s*\\S+\\s*,\\s*\\S+\\s*\\S+\\s*\\)\\s*'
);
export const FIELD_AFTER_DEDUP = new RegExp('\\s*dedup\\s*\\S*');
export const PIPE_AFTER_FIELD = new RegExp('\\s*dedup\\s*\\S+\\s+');

export const regexForSuggestion = [
  PIPE_AFTER_FIELD,
  FIELD_AFTER_DEDUP,
  PIPE_AFTER_MATCH,
  CLOSE_AFTER_DATA,
  DATA_AFTER_COMMA,
  COMMA_AFTER_FIELD,
  FIELD_AFTER_MATCH,
  PIPE_AFTER_WHERE,
  DATA_AFTER_EQUAL,
  EQUAL_AFTER_FIELD,
  MATCH_FIELD_AFTER_WHERE,
  EMPTY_REGEX,
];

export const regexForIndex = [JUST_SOURCE_REGEX, SOURCE_WHERE_REGEX, SOURCE_MATCH_REGEX];
