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

import { isEmpty } from 'lodash';
import datemath from '@elastic/datemath';
import { DATE_PICKER_FORMAT } from '../../common/constants/explorer';
import {
  PPL_INDEX_REGEX,
  PPL_INDEX_INSERT_POINT_REGEX
} from '../../common/constants/shared';

export const getIndexPatternFromRawQuery = (query: string) : string => {
  const matches = query.match(PPL_INDEX_REGEX);
  if (matches) {
    return matches[2];
  }
  return '';
};

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
  const tokens = rawQuery.match(PPL_INDEX_INSERT_POINT_REGEX);
  
  if (isEmpty(tokens)) return finalQuery;
  finalQuery = `search ${tokens![1]}=${tokens![2]} | where ${timeField} >= timestamp('${start}') and ${timeField} <= timestamp('${end}')${tokens![3]}`;

  return finalQuery;
};