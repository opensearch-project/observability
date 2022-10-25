/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import dateMath from '@elastic/datemath';
import { ShortDate } from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import _ from 'lodash';
import { Moment } from 'moment-timezone';
import React from 'react';
import { SavedVisualizationType } from 'common/types/custom_panels';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../../common/constants/shared';
import PPLService from '../../../services/requests/ppl';
import { CoreStart } from '../../../../../../src/core/public';

export const convertDateTime = (datetime: string, isStart = true, formatted = true) => {
  let returnTime: undefined | Moment;
  if (isStart) {
    returnTime = dateMath.parse(datetime);
  } else {
    returnTime = dateMath.parse(datetime, { roundUp: true });
  }

  if (formatted) return returnTime!.format(PPL_DATE_FORMAT);
  return returnTime;
};

export const onTimeChange = (
  start: ShortDate,
  end: ShortDate,
  recentlyUsedRanges: DurationRange[],
  setRecentlyUsedRanges: React.Dispatch<React.SetStateAction<DurationRange[]>>,
  setStart: React.Dispatch<React.SetStateAction<string>>,
  setEnd: React.Dispatch<React.SetStateAction<string>>
) => {
  const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
    const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
    return !isDuplicate;
  });
  recentlyUsedRange.unshift({ start, end });
  setStart(start);
  setEnd(end);
  setRecentlyUsedRanges(recentlyUsedRange.slice(0, 9));
};

// Fetch Saved Visualizations
export const fetchVisualizations = async (http: CoreStart['http']) => {
  let savedVisualizations;
  await http
    .get(`${CUSTOM_PANELS_API_PREFIX}/visualizations/`)
    .then((res) => {
      savedVisualizations = res.visualizations;
    })
    .catch((err) => {
      console.error('Issue in fetching all saved visualizations', err);
    });
  return savedVisualizations;
};
