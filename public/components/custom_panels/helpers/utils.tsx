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
import _ from 'lodash';
import {
  DATE_FORMAT,
  INDEX_REGEX,
  VisualizationType,
} from '../../../../common/constants/custom_panels';
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
  if (isStart) return dateMath.parse(datetime).format(DATE_FORMAT);
  return dateMath.parse(datetime, { roundUp: true }).format(DATE_FORMAT);
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
  const indexMatchArray = originalQuery.match(INDEX_REGEX);
  if (indexMatchArray == null) {
    throw Error('index not found in Query');
  }
  const indexPartOfQuery = indexMatchArray[0];
  const filterPartOfQuery = originalQuery.replace(INDEX_REGEX, '');
  const timeQueryFilter = ` | where ${timestampField} > timestamp('${convertDateTime(
    startTime
  )}') and ${timestampField} < timestamp('${convertDateTime(endTime, false)}')`;
  const finalQuery = indexPartOfQuery + timeQueryFilter + panelFilterQuery + filterPartOfQuery;

  return finalQuery;
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
  timestampField = 'timestamp',
  filterQuery = ''
) => {
  setIsLoading(true);

  let finalQuery = '';
  try {
    finalQuery = queryAccumulator(
      _.unescape(query),
      timestampField,
      startTime,
      endTime,
      filterQuery
    );
  } catch (Error) {
    console.log('Issue in building final query', Error.stack);
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
    .catch((err: Error) => {
      setIsError(err.stack);
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
