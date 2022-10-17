/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { useState, useRef } from 'react';
import { batch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { IField, PatternJSONData, PatternTableData } from 'common/types/explorer';
import {
  FINAL_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  QUERIED_FIELDS,
  PATTERN_STATS_QUERY,
} from '../../../../common/constants/explorer';
import { fetchSuccess, reset as queryResultReset } from '../redux/slices/query_result_slice';
import { setPatterns, reset as patternsReset } from '../redux/slices/patterns_slice';
import { selectQueries } from '../redux/slices/query_slice';
import { reset as visualizationReset } from '../redux/slices/visualization_slice';
import { updateFields, sortFields, selectFields } from '../redux/slices/field_slice';
import PPLService from '../../../services/requests/ppl';

interface IFetchEventsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchEvents = ({ pplService, requestParams }: IFetchEventsParams) => {
  const dispatch = useDispatch();
  const [isEventsLoading, setIsEventsLoading] = useState(false);
  const queries = useSelector(selectQueries);
  const fields = useSelector(selectFields);
  const [response, setResponse] = useState();
  const queriesRef = useRef();
  const fieldsRef = useRef();
  const responseRef = useRef();
  queriesRef.current = queries;
  fieldsRef.current = fields;
  responseRef.current = response;

  const fetchEvents = async (
    { query }: { query: string },
    format: string,
    handler: (res: any) => void,
    errorHandler?: (error: any) => void
  ) => {
    setIsEventsLoading(true);
    await pplService
      .fetch(
        {
          query,
          format,
        },
        errorHandler
      )
      .then((res: any) => {
        handler(res);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setIsEventsLoading(false);
      });
  };

  const dispatchOnGettingHis = (res: any) => {
    const selectedFields: string[] = fieldsRef.current![requestParams.tabId][SELECTED_FIELDS].map(
      (field: IField) => field.name
    );
    setResponse(res);
    batch(() => {
      dispatch(
        queryResultReset({
          tabId: requestParams.tabId,
        })
      );
      dispatch(
        fetchSuccess({
          tabId: requestParams.tabId,
          data: {
            ...res,
          },
        })
      );
      dispatch(
        updateFields({
          tabId: requestParams.tabId,
          data: {
            [UNSELECTED_FIELDS]: res?.schema ? [...res.schema] : [],
            [QUERIED_FIELDS]: [],
            [SELECTED_FIELDS]: [],
            [AVAILABLE_FIELDS]: res?.schema
              ? isEmpty(selectedFields)
                ? [...res.schema]
                : [
                    ...res?.schema.filter(
                      (curField: IField) => !selectedFields.includes(curField.name)
                    ),
                  ]
              : [],
          },
        })
      );
      dispatch(
        sortFields({
          tabId: requestParams.tabId,
          data: [AVAILABLE_FIELDS, UNSELECTED_FIELDS],
        })
      );
      dispatch(
        visualizationReset({
          tabId: requestParams.tabId,
        })
      );
    });
  };

  const dispatchOnNoHis = (res: any) => {
    setResponse(res);
    batch(() => {
      dispatch(
        queryResultReset({
          tabId: requestParams.tabId,
        })
      );
      dispatch(
        updateFields({
          tabId: requestParams.tabId,
          data: {
            [SELECTED_FIELDS]: [],
            [UNSELECTED_FIELDS]: [],
            [QUERIED_FIELDS]: [],
            [AVAILABLE_FIELDS]: res?.schema ? [...res.schema] : [],
          },
        })
      );
      dispatch(
        sortFields({
          tabId: requestParams.tabId,
          data: [AVAILABLE_FIELDS],
        })
      );
      dispatch(
        visualizationReset({
          tabId: requestParams.tabId,
        })
      );
    });
  };

  const dispatchOnPatterns = (res: { patternTableData: PatternTableData[] }) => {
    batch(() => {
      // dispatch(
      //   patternsReset({
      //     tabId: requestParams.tabId,
      //   })
      // );
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

  const getLiveTail = (query: string = '', errorHandler?: (error: any) => void) => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    fetchEvents(
      { query: searchQuery },
      'jdbc',
      (res: any) => {
        if (!isEmpty(res.jsonData)) {
          if (!isEmpty(responseRef.current)) {
            res.jsonData = res.jsonData.concat(responseRef.current.jsonData);
            res.datarows = res.datarows.concat(responseRef.current.datarows);
            res.total = res.total + responseRef.current.total;
            res.size = res.size + responseRef.current.size;
          }
          dispatchOnGettingHis(res);
        }
        if (isEmpty(res.jsonData) && isEmpty(responseRef.current)) {
          dispatchOnNoHis(res);
        }
      },
      errorHandler
    );
  };

  const getEvents = (query: string = '', errorHandler?: (error: any) => void) => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    fetchEvents(
      { query: searchQuery },
      'jdbc',
      (res: any) => {
        if (!isEmpty(res.jsonData)) {
          return dispatchOnGettingHis(res);
        }
        // when no hits and needs to get available fields to override default timestamp
        dispatchOnNoHis(res);
      },
      errorHandler
    );
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

  const getAvailableFields = (query: string) => {
    fetchEvents({ query }, 'jdbc', (res: any) => {
      batch(() => {
        dispatch(
          fetchSuccess({
            tabId: requestParams.tabId,
            data: {
              jsonDataAll: res.jsonData,
            },
          })
        );
        dispatch(
          updateFields({
            tabId: requestParams.tabId,
            data: {
              [AVAILABLE_FIELDS]: res?.schema ? [...res.schema] : [],
            },
          })
        );
        dispatch(
          sortFields({
            tabId: requestParams.tabId,
            data: [AVAILABLE_FIELDS, UNSELECTED_FIELDS],
          })
        );
      });
    });
  };

  return {
    isEventsLoading,
    getLiveTail,
    getEvents,
    getPatterns,
    getAvailableFields,
    fetchEvents,
  };
};
