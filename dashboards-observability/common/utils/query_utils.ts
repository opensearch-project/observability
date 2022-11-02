/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import datemath from '@elastic/datemath';
import { isEmpty } from 'lodash';
import { DATE_PICKER_FORMAT } from '../../common/constants/explorer';
import {
  PPL_INDEX_INSERT_POINT_REGEX,
  PPL_INDEX_REGEX,
  PPL_NEWLINE_REGEX,
} from '../../common/constants/shared';

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
}: {
  rawQuery: string;
  startTime: string;
  endTime: string;
  timeField?: string;
  isLiveQuery: boolean;
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
  appBaseQuery: string
) => {
  const fullQuery = curQuery.includes(appBaseQuery) ? curQuery : buildQuery(appBaseQuery, curQuery);
  if (isEmpty(fullQuery)) return '';
  return preprocessQuery({
    rawQuery: fullQuery,
    startTime: startingTime,
    endTime: endingTime,
    timeField,
    isLiveQuery,
  });
};
