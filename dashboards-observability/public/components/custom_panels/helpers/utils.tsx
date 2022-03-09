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
import { Layout } from 'react-grid-layout';
import { PPL_DATE_FORMAT, PPL_INDEX_REGEX } from '../../../../common/constants/shared';
import PPLService from '../../../services/requests/ppl';
import { CoreStart } from '../../../../../../src/core/public';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../common/constants/custom_panels';
import { VisualizationType, SavedVisualizationType } from '../../../../common/types/custom_panels';
import { Visualization } from '../../visualizations/visualization';
import { getVizContainerProps } from '../../../components/visualizations/charts/helpers';

/*
 * "Utils" This file contains different reused functions in operational panels
 *
 * isNameValid - Validates string to length > 0 and < 50
 * convertDateTime - Converts input datetime string to required format
 * mergeLayoutAndVisualizations - Function to merge current panel layout into the visualizations list
 * getQueryResponse - Get response of PPL query to load visualizations
 * renderSavedVisualization - Fetches savedVisualization by Id and runs getQueryResponse
 * onTimeChange - Function to store recently used time filters and set start and end time.
 * isDateValid - Function to check date validity
 * isPPLFilterValid - Validate if the panel PPL query doesn't contain any Index/Time/Field filters
 * displayVisualization - Function to render the visualzation based of its type
 */

// Name validation 0>Name<=50
export const isNameValid = (name: string) => {
  return name.length >= 50 || name.length === 0 ? false : true;
};

// DateTime convertor to required format
export const convertDateTime = (datetime: string, isStart = true, formatted = true) => {
  let returnTime: undefined | Moment;
  if (isStart) {
    returnTime = dateMath.parse(datetime);
  } else {
    returnTime = dateMath.parse(datetime, { roundUp: true });
  }

  if (formatted) return returnTime?.utc().format(PPL_DATE_FORMAT);
  return returnTime;
};

// Merges new layout into visualizations
export const mergeLayoutAndVisualizations = (
  layout: Layout[],
  newVisualizationList: VisualizationType[],
  setPanelVisualizations: (value: React.SetStateAction<VisualizationType[]>) => void
) => {
  const newPanelVisualizations: VisualizationType[] = [];

  for (let i = 0; i < newVisualizationList.length; i++) {
    for (let j = 0; j < layout.length; j++) {
      if (newVisualizationList[i].id == layout[j].i) {
        newPanelVisualizations.push({
          ...newVisualizationList[i],
          x: layout[j].x,
          y: layout[j].y,
          w: layout[j].w,
          h: layout[j].h,
        });
      }
    }
  }
  setPanelVisualizations(newPanelVisualizations);
};

/* Builds Final Query by adding time and query filters(From panel UI) to the original visualization query
 * -> Final Query is as follows:
 * -> finalQuery = indexPartOfQuery + timeQueryFilter + panelFilterQuery + filterPartOfQuery
 * -> finalQuery = source=opensearch_dashboards_sample_data_flights
 *                  + | where utc_time > ‘2021-07-01 00:00:00’ and utc_time < ‘2021-07-02 00:00:00’
 *                  + | where Carrier='OpenSearch-Air'
 *                  + | stats sum(FlightDelayMin) as delays by Carrier
 */
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
  const timeQueryFilter = ` | where ${timestampField} >= '${convertDateTime(
    startTime
  )}' and ${timestampField} <= '${convertDateTime(endTime, false)}'`;
  const pplFilterQuery = panelFilterQuery === '' ? '' : ` | ${panelFilterQuery}`;
  return indexPartOfQuery + timeQueryFilter + pplFilterQuery + filterPartOfQuery;
};

// PPL Service requestor
const pplServiceRequestor = async (
  pplService: PPLService,
  finalQuery: string,
  type: string,
  setVisualizationData: React.Dispatch<React.SetStateAction<any[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>
) => {
  await pplService
    .fetch({ query: finalQuery, format: 'viz' })
    .then((res) => {
      if (res === undefined) setIsError('Please check the validity of PPL Filter');
      setVisualizationData(res);
    })
    .catch((error: Error) => {
      setIsError(error.stack || 'Issue in fetching visualization');
      console.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// Fetched Saved Visualization By Id
export const fetchVisualizationById = async (
  http: CoreStart['http'],
  savedVisualizationId: string,
  setIsError: (value: string) => void
) => {
  let savedVisualization = {} as SavedVisualizationType;
  await http
    .get(`${CUSTOM_PANELS_API_PREFIX}/visualizations/${savedVisualizationId}`)
    .then((res) => {
      savedVisualization = res.visualization;
    })
    .catch((err) => {
      setIsError(`Could not locate saved visualization id:${savedVisualizationId}`);
      console.error('Issue in fetching the saved Visualization by Id', err);
    });

  return savedVisualization;
};

// Get PPL Query Response
export const getQueryResponse = (
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
    finalQuery = queryAccumulator(query, timestampField, startTime, endTime, filterQuery);
  } catch (error) {
    const errorMessage = 'Issue in building final query';
    setIsError(errorMessage);
    console.error(errorMessage, error);
    setIsLoading(false);
    return;
  }

  pplServiceRequestor(pplService, finalQuery, type, setVisualizationData, setIsLoading, setIsError);
};

// Fetches savedVisualization by Id and runs getQueryResponse
export const renderSavedVisualization = async (
  http: CoreStart['http'],
  pplService: PPLService,
  savedVisualizationId: string,
  startTime: string,
  endTime: string,
  filterQuery: string,
  setVisualizationTitle: React.Dispatch<React.SetStateAction<string>>,
  setVisualizationType: React.Dispatch<React.SetStateAction<string>>,
  setVisualizationData: React.Dispatch<React.SetStateAction<Plotly.Data[]>>,
  setVisualizationMetaData: React.Dispatch<React.SetStateAction<undefined>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>
) => {
  setIsLoading(true);
  setIsError('');

  let visualization = {} as SavedVisualizationType;
  visualization = await fetchVisualizationById(http, savedVisualizationId, setIsError);

  if (_.isEmpty(visualization)) {
    setIsLoading(false);
    return;
  }

  if (visualization.name) {
    setVisualizationTitle(visualization.name);
  }

  if (visualization.type) {
    setVisualizationType(visualization.type);
  }

  setVisualizationMetaData(visualization);

  getQueryResponse(
    pplService,
    visualization.query,
    visualization.type,
    startTime,
    endTime,
    setVisualizationData,
    setIsLoading,
    setIsError,
    filterQuery,
    visualization.timeField
  );
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
  setRecentlyUsedRanges(recentlyUsedRange.slice(0, 9));
};

// Function to check date validity
export const isDateValid = (
  start: string | Moment | undefined,
  end: string | Moment | undefined,
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void,
  side?: string | undefined
) => {
  if (end! < start!) {
    setToast('Time range entered is invalid', 'danger', undefined, side);
    return false;
  } else return true;
};

// Check for time filter in query
const checkIndexExists = (query: string) => {
  return PPL_INDEX_REGEX.test(query);
};

// Check PPL Query in Panel UI
// Validate if the query doesn't contain any Index
export const isPPLFilterValid = (
  query: string,
  setToast: (
    title: string,
    color?: string,
    text?: React.ReactChild | undefined,
    side?: string | undefined
  ) => void
) => {
  if (checkIndexExists(query)) {
    setToast('Please remove index from PPL Filter', 'danger', undefined);
    return false;
  }
  return true;
};

// Renders visualization in the vizualization container component
export const displayVisualization = (metaData: any, data: any, type: string) => {
  if (metaData === undefined || metaData === {}) {
    return <></>;
  }
  return (
    <Visualization
      visualizations={getVizContainerProps({
        vizId: type,
        rawVizData: data,
        query: {},
        indexFields: {},
        userConfigs: metaData.user_configs,
      })}
    />
  );
};
