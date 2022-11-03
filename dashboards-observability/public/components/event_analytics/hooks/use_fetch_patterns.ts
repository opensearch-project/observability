/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IField, PatternTableData } from 'common/types/explorer';
import { isUndefined } from 'lodash';
import PPLService from 'public/services/requests/ppl';
import { useRef } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  FINAL_QUERY,
  PATTERNS_REGEX,
  PATTERN_REGEX,
  SELECTED_PATTERN_FIELD,
  SELECTED_TIMESTAMP,
} from '../../../../common/constants/explorer';
import { buildPatternsQuery } from '../../../../common/utils/query_utils';
import { IPPLEventsDataSource } from '../../../../server/common/types';
import { reset as resetPatterns, setPatterns } from '../redux/slices/patterns_slice';
import { changeQuery, selectQueries } from '../redux/slices/query_slice';
import { useFetchEvents } from './use_fetch_events';

interface IFetchPatternsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchPatterns = ({ pplService, requestParams }: IFetchPatternsParams) => {
  const dispatch = useDispatch();
  const { isEventsLoading, fetchEvents } = useFetchEvents({
    pplService,
    requestParams,
  });
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const dispatchOnPatterns = (res: { patternTableData: PatternTableData[]; total: number[] }) => {
    batch(() => {
      dispatch(
        resetPatterns({
          tabId: requestParams.tabId,
        })
      );
      dispatch(
        setPatterns({
          tabId: requestParams.tabId,
          data: {
            ...res,
          },
        })
      );
    });
  };

  const buildPatternDataQuery = (query: string, patternField: string, patternRegex: string) => {
    let statsQuery = buildPatternsQuery(query, patternField, patternRegex);
    statsQuery += ` | stats count(), take(\`${patternField}\`, 1) by patterns_field`;
    return statsQuery;
  };

  const buildPatternAnomaliesQuery = (
    query: string,
    patternField: string,
    patternRegex: string,
    timestampField: string,
    interval: string
  ) => {
    let adQuery = buildPatternsQuery(query, patternField, patternRegex);
    adQuery +=
      ` | stats count() by span(\`${timestampField}\`, 1${interval || 'm'}) as timestamp, ` +
      `patterns_field | AD time_field='timestamp' category_field='patterns_field'`;
    return adQuery;
  };

  const clearPatternCommands = (query: string) => query.replace(PATTERNS_REGEX, '');

  const getPatterns = (interval: string, errorHandler: (error: any) => void, query?: string) => {
    const cur = queriesRef.current;
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    const searchQuery = isUndefined(query) ? clearPatternCommands(rawQuery) : query;
    const patternField = cur![requestParams.tabId][SELECTED_PATTERN_FIELD];
    const timestampField = cur![requestParams.tabId][SELECTED_TIMESTAMP];
    const patternRegex = cur![requestParams.tabId][PATTERN_REGEX];
    const statsQuery = buildPatternDataQuery(searchQuery, patternField, patternRegex);
    const anomaliesQuery = buildPatternAnomaliesQuery(
      searchQuery,
      patternField,
      patternRegex,
      timestampField,
      interval
    );
    // Fetch patterns data for the current query results
    Promise.all([
      fetchEvents({ query: statsQuery }, 'jdbc', (res) => res, errorHandler),
      fetchEvents({ query: anomaliesQuery }, 'jdbc', (res) => res, errorHandler),
      fetchEvents({ query: `${searchQuery} | stats count()` }, 'jdbc', (res) => res, errorHandler),
    ]).then((res) => {
      const [statsRes, anomaliesRes, countRes] = res as IPPLEventsDataSource[];
      const anomaliesMap: { [x: string]: number } = {};
      anomaliesRes.datarows.forEach((row) => {
        const pattern = row[2];
        const score = row[3];
        if (score > 0) {
          anomaliesMap[pattern] = (anomaliesMap[pattern] || 0) + 1;
        }
      });
      const formatToTableData: PatternTableData[] = statsRes.datarows.map((row) => ({
        count: row[0],
        pattern: row[2],
        sampleLog: row[1][0],
        anomalyCount: anomaliesMap[row[2]] || 0,
      }));
      dispatchOnPatterns({
        patternTableData: formatToTableData,
        total: countRes.datarows[0],
      });
    });
  };

  const setDefaultPatternsField = async (
    index: string,
    pattern: string,
    errorHandler: (error: any) => void
  ) => {
    let patternField = pattern;
    if (!pattern) {
      if (!index) {
        return;
      }
      const query = `source = ${index} | head 1`;
      await fetchEvents(
        { query },
        'jdbc',
        async (res: any) => {
          // Create array of only string type fields
          const textFields = res.schema.filter((field: IField) => field.type === 'string');
          // Loop through array and find field with longest value
          let defaultPatternField = '';
          let maxLength = 0;
          textFields.forEach((field: IField, i: number) => {
            const curLength = res.jsonData[0][field.name].length;
            if (curLength > maxLength) {
              maxLength = curLength;
              defaultPatternField = field.name;
            }
          });
          patternField = defaultPatternField;
        },
        errorHandler
      );
    }
    // Set pattern to the pattern passed in or the default pattern field found if pattern is empty
    await dispatch(
      changeQuery({
        tabId: requestParams.tabId,
        query: {
          [SELECTED_PATTERN_FIELD]: patternField,
        },
      })
    );
  };

  return {
    isEventsLoading,
    getPatterns,
    setDefaultPatternsField,
  };
};
