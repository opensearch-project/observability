/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import datemath from '@elastic/datemath';
import { isEmpty } from 'lodash';
import {
  DATE_PICKER_FORMAT,
  PPL_DEFAULT_PATTERN_REGEX_FILETER,
} from '../../common/constants/explorer';
import {
  PPL_INDEX_INSERT_POINT_REGEX,
  PPL_INDEX_REGEX,
  PPL_NEWLINE_REGEX,
  PPL_STATS_REGEX,
} from '../../common/constants/shared';

/**
 * @param literal - string literal that will be put inside single quotes in PPL command
 * @returns string with inner single quotes escaped
 */
const escapeQuotes = (literal: string) => {
  return literal.replaceAll("'", "''");
};

export const getIndexPatternFromRawQuery = (query: string): string => {
  const matches = query.match(PPL_INDEX_REGEX);
  if (matches) {
    return matches[2];
  }
  return '';
};

// insert time filter command and additional commands based on raw query
export const preprocessQuery = ({
  rawQuery,
  startTime,
  endTime,
  timeField,
  isLiveQuery,
  selectedPatternField,
  patternRegex,
  filteredPattern,
}: {
  rawQuery: string;
  startTime: string;
  endTime: string;
  timeField?: string;
  isLiveQuery: boolean;
  selectedPatternField?: string;
  patternRegex?: string;
  filteredPattern?: string;
}) => {
  let finalQuery = '';

  if (isEmpty(rawQuery)) return finalQuery;

  // convert to moment
  const start = datemath.parse(startTime)?.utc().format(DATE_PICKER_FORMAT);
  const end = datemath.parse(endTime, { roundUp: true })?.utc().format(DATE_PICKER_FORMAT);
  const tokens = rawQuery.replaceAll(PPL_NEWLINE_REGEX, '').match(PPL_INDEX_INSERT_POINT_REGEX);

  if (isEmpty(tokens)) return finalQuery;

  finalQuery = `${tokens![1]}=${
    tokens![2]
  } | where ${timeField} >= '${start}' and ${timeField} <= '${end}'${tokens![3]}`;

  if (isLiveQuery) {
    finalQuery = finalQuery + ` | sort - ${timeField}`;
  }

  // if a pattern is selected as filter, build it into finalQuery
  if (selectedPatternField && filteredPattern)
    finalQuery = buildPatternsQuery(
      finalQuery,
      selectedPatternField,
      patternRegex,
      filteredPattern
    );

  return finalQuery;
};

export const buildPatternsQuery = (
  baseQuery: string,
  selectedPatternField?: string,
  patternRegex?: string,
  filteredPattern?: string
) => {
  let finalQuery = baseQuery;
  if (selectedPatternField) {
    finalQuery += ` | patterns `;
    if (patternRegex && patternRegex !== PPL_DEFAULT_PATTERN_REGEX_FILETER) {
      finalQuery += `pattern='${escapeQuotes(patternRegex)}' `;
    }
    finalQuery += `\`${selectedPatternField}\` `;
    if (filteredPattern) {
      finalQuery += `| where patterns_field='${escapeQuotes(filteredPattern)}'`;
    }
  }
  return finalQuery;
};

export const buildQuery = (baseQuery: string, currQuery: string) => {
  let fullQuery: string;
  if (baseQuery) {
    fullQuery = baseQuery;
    if (currQuery) {
      fullQuery += '| ' + currQuery;
    }
  } else {
    fullQuery = currQuery;
  }
  return fullQuery;
};

export const composeFinalQuery = (
  curQuery: string,
  startingTime: string,
  endingTime: string,
  timeField: string,
  isLiveQuery: boolean,
  appBaseQuery: string,
  selectedPatternField?: string,
  patternRegex?: string,
  filteredPattern?: string
) => {
  const fullQuery = curQuery.includes(appBaseQuery) ? curQuery : buildQuery(appBaseQuery, curQuery);
  if (isEmpty(fullQuery)) return '';
  return preprocessQuery({
    rawQuery: fullQuery,
    startTime: startingTime,
    endTime: endingTime,
    timeField,
    isLiveQuery,
    selectedPatternField,
    patternRegex,
    filteredPattern,
  });
};

export const removeBacktick = (stringContainsBacktick: string) => {
  if (!stringContainsBacktick) return '';
  return stringContainsBacktick.replace(/`/g, '');
};
