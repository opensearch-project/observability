/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PatternJSONData, PatternTableData } from 'common/types/explorer';
import { isEmpty } from 'lodash';
import PPLService from 'public/services/requests/ppl';
import { useRef } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { FINAL_QUERY, PATTERN_STATS_QUERY } from '../../../../common/constants/explorer';
import { setPatterns, reset as resetPatterns } from '../redux/slices/patterns_slice';
import { selectQueries } from '../redux/slices/query_slice';
import { useFetchEvents } from './use_fetch_events';

interface IFetchPatternsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchPatterns = ({ pplService, requestParams }: IFetchPatternsParams) => {
  const dispatch = useDispatch();
  const { fetchEvents } = useFetchEvents({
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

  const getPatterns = (query: string = '', errorHandler: (error: any) => void) => {
    const cur = queriesRef.current;
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    const searchQuery = isEmpty(query) ? rawQuery : query;
    const statsQuery = searchQuery + PATTERN_STATS_QUERY;
    // Fetch patterns data for the current query results
    fetchEvents(
      { query: statsQuery },
      'jdbc',
      (res: { jsonData: PatternJSONData[] }) => {
        if (!isEmpty(res.jsonData)) {
          const formatToTableData = res.jsonData.map((json: PatternJSONData) => {
            return {
              count: json['count()'],
              pattern: json.patterns_field,
              sampleLog: '',
            } as PatternTableData;
          });
          // Fetch total number of events to divide count by for ratio
          fetchEvents(
            {
              query: `${rawQuery} | stats count()`,
            },
            'jdbc',
            (countRes: any) => {
              dispatchOnPatterns({
                patternTableData: formatToTableData,
                total: countRes.datarows[0],
              });
            },
            errorHandler
          );
        }
      },
      errorHandler
    );
  };

  return {
    getPatterns,
  };
};
