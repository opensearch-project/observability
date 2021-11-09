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
  dedupCmd,
  evalCmd,
  fieldsCmd,
  headCmd,
  rareCmd,
  renameCmd,
  searchCmd,
  sortCmd,
  statsCmd,
  syntaxCmd,
  topCmd,
  whereCmd,
} from './commands';
import {
  mathFunction,
  datetimeFunction,
  stringFunction,
  conditionFunction,
  relevanceFunction,
} from './functions';
import { pplDatatypes, pplIdentifiers } from './language_structure';

export const Group1 = {
  label: 'Commands',
  options: [
    {
      label: 'Syntax',
      value: syntaxCmd,
    },
    {
      label: 'dedup',
      value: dedupCmd,
    },
    {
      label: 'eval',
      value: evalCmd,
    },
    {
      label: 'fields',
      value: fieldsCmd,
    },
    {
      label: 'rename',
      value: renameCmd,
    },
    {
      label: 'search',
      value: searchCmd,
    },
    {
      label: 'sort',
      value: sortCmd,
    },
    {
      label: 'stats',
      value: statsCmd,
    },
    {
      label: 'where',
      value: whereCmd,
    },
    {
      label: 'head',
      value: headCmd,
    },
    {
      label: 'rare',
      value: rareCmd,
    },
    {
      label: 'top',
      value: topCmd,
    },
  ],
};

export const Group2 = {
  label: 'Functions',
  options: [
    {
      label: 'Math',
      value: mathFunction,
    },
    {
      label: 'Date and Time',
      value: datetimeFunction,
    },
    {
      label: 'String',
      value: stringFunction,
    },
    {
      label: 'Condition',
      value: conditionFunction,
    },
    {
      label: 'Relevance',
      value: relevanceFunction,
    },
  ],
};

export const Group3 = {
  label: 'Language Structure',
  options: [
    {
      label: 'Identifiers',
      value: pplIdentifiers,
    },
    {
      label: 'Data Types',
      value: pplDatatypes,
    },
  ],
};
