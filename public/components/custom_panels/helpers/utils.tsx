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

import dateMath from '@elastic/datemath';
import { ShortDate } from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import _ from 'lodash';
import { VisualizationType } from '../../../../common/constants/custom_panels';
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../../common/constants/shared';
import PPLService from '../../../services/requests/ppl';

/*
 * "Utils" This file contains different reused functions in operational panels
 */

// Name validation 0>Name<=50
export const isNameValid = (name: string) => {
  return name.length >= 50 || name.length === 0 ? false : true;
};

// DateTime convertor to required format
export const convertDateTime = (datetime: string, isStart = true) => {
  if (isStart) return dateMath.parse(datetime).format(PPL_DATE_FORMAT);
  return dateMath.parse(datetime, { roundUp: true }).format(PPL_DATE_FORMAT);
};

// Builds Final Query by adding time and query filters to the original visualization query
// -> Final Query is as follows:
// -> finalQuery = indexPartOfQuery + timeQueryFilter + panelFilterQuery + filterPartOfQuery
// -> finalQuery = source=opensearch_dashboards_sample_data_flights
//                  + | where utc_time > timestamp(‘2021-07-01 00:00:00’) and utc_time < timestamp(‘2021-07-02 00:00:00’)
//                  + | where Carrier='OpenSearch-Air'
//                  + | stats sum(FlightDelayMin) as delays by Carrier
const queryAccumulator = (
  originalQuery: string,
  timestampField: string,
  startTime: string,
  endTime: string,
  panelFilterQuery: string
) => {
  const indexMatchArray = originalQuery.match(PPL_INDEX_REGEX);
  if (indexMatchArray == null) {
    throw Error('index not found in Query');
  }
  const indexPartOfQuery = indexMatchArray[0];
  const filterPartOfQuery = originalQuery.replace(PPL_INDEX_REGEX, '');
  const timeQueryFilter = ` | where ${timestampField} >= timestamp('${convertDateTime(
    startTime
  )}') and ${timestampField} <= timestamp('${convertDateTime(endTime, false)}')`;
  const pplFilterQuery = panelFilterQuery === '' ? '' : ` | ${panelFilterQuery}`;
  return indexPartOfQuery + timeQueryFilter + pplFilterQuery + filterPartOfQuery;
};

// Get PPL Query Response
export const getQueryResponse = async (
  pplService: PPLService,
  query: string,
  type: string,
  startTime: string,
  endTime: string,
  setVisualizationData: React.Dispatch<React.SetStateAction<any[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
  filterQuery = '',
  timestampField = 'timestamp'
) => {
  setIsLoading(true);
  setIsError('');

  let finalQuery = '';
  try {
    finalQuery = queryAccumulator(
      _.unescape(query),
      timestampField,
      startTime,
      endTime,
      filterQuery
    );
  } catch (error) {
    console.log('Issue in building final query', error.stack);
    setIsLoading(false);
    return;
  }

  await pplService
    .fetch({ query: finalQuery, format: 'viz' })
    .then((res) => {
      setVisualizationData([
        {
          x: res.data[res.metadata.xfield.name],
          y: res.data[res.metadata.yfield.name],
          type: type,
        },
      ]);
    })
    .catch((error: Error) => {
      setIsError(error.stack);
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// Calculate new visualization dimensions
// New visualization always joins to the end of the panel
export const getNewVizDimensions = (panelVisualizations: VisualizationType[]) => {
  let maxY: number = 0,
    maxYH: number = 0;

  panelVisualizations.map((panelVisualization: VisualizationType) => {
    if (maxY < panelVisualization.y) {
      maxY = panelVisualization.y;
      maxYH = panelVisualization.h;
    }
  });

  return { x: 0, y: maxY + maxYH, w: 6, h: 4 };
};

// Function to store recently used time filters and set start and end time.
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
  setRecentlyUsedRanges(
    recentlyUsedRange.length > 10 ? recentlyUsedRange.slice(0, 9) : recentlyUsedRange
  );
};
