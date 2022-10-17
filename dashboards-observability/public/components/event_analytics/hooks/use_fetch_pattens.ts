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
import { setPatterns } from '../redux/slices/patterns_slice';
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

  const dispatchOnPatterns = (res: { patternTableData: PatternTableData[] }) => {
    batch(() => {
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

  const getPatterns = (query: string = '', errorHandler?: (error: any) => void) => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    const statsQuery = searchQuery + PATTERN_STATS_QUERY;
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
          dispatchOnPatterns({ patternTableData: formatToTableData });
        }
      },
      errorHandler
    );
  };

  return {
    getPatterns,
  };
};
