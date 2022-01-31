/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty } from 'lodash';
import datemath from '@elastic/datemath';
import { DATE_PICKER_FORMAT } from '../../common/constants/explorer';
import {
  PPL_INDEX_REGEX,
  PPL_INDEX_INSERT_POINT_REGEX,
  PPL_NEWLINE_REGEX
} from '../../common/constants/shared';

export const getIndexPatternFromRawQuery = (query: string) : string => {
  const matches = query.match(PPL_INDEX_REGEX);
  if (matches) {
    return matches[2];
  }
  return '';
};

const commandExists = (query: string, command: string): boolean => {
  return new RegExp(`\\|\\s*${command}\\b`).test(query);
}

export const insertDateRangeToQuery = ({
  rawQuery,
  startTime,
  endTime,
  timeField,
}: {
  rawQuery: string;
  startTime: string;
  endTime: string;
  timeField?: string;
}) => {

  let finalQuery = '';

  if (isEmpty(rawQuery)) return finalQuery;
    
  // convert to moment
  const start = datemath.parse(startTime)?.format(DATE_PICKER_FORMAT);
  const end = datemath.parse(endTime)?.format(DATE_PICKER_FORMAT);
  const tokens = rawQuery.replaceAll(PPL_NEWLINE_REGEX, '').match(PPL_INDEX_INSERT_POINT_REGEX);
  
  if (isEmpty(tokens)) return finalQuery;

  let conditions = `| where ${timeField} >= '${start}' and ${timeField} <= '${end}'`;
  if (commandExists(rawQuery, 'parse')) {
    conditions += ` | sort - ${timeField} | head 10000`;
  }
  finalQuery = `${tokens![1]}=${tokens![2]} ${conditions} ${tokens![3]}`;

  return finalQuery;
};
