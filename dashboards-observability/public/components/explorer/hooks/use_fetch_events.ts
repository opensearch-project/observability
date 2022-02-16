/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { batch } from 'react-redux';
import { isEmpty } from 'lodash';
import { 
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  FINAL_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS,
  AVAILABLE_FIELDS,
  QUERIED_FIELDS
} from '../../../../common/constants/explorer';
import { fetchSuccess, reset as queryResultReset } from '../slices/query_result_slice';
import { selectQueries } from '../slices/query_slice';
import { reset as visualizationReset } from '../slices/visualization_slice';
import {
  updateFields,
  sortFields,
  selectFields
} from '../slices/field_slice';
import PPLService from '../../../services/requests/ppl';
import { IField } from 'common/types/explorer';

interface IFetchEventsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchEvents = ({
  pplService,
  requestParams,
}: IFetchEventsParams) => {
  
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
    await pplService.fetch({
      query,
      format,
    }, errorHandler)
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
    const selectedFields: Array<string> = fieldsRef.current![requestParams.tabId][SELECTED_FIELDS].map((field: IField) => field.name);
    setResponse(res);
    batch(() => {
      dispatch(queryResultReset({
        tabId: requestParams.tabId
      }));
      dispatch(fetchSuccess({
        tabId: requestParams.tabId,
        data: {
          ...res
        }
      }));
      dispatch(updateFields({
        tabId: requestParams.tabId,
        data: {
          [UNSELECTED_FIELDS]: res?.schema ? [ ...res.schema ] : [],
          [QUERIED_FIELDS]: [],
          [AVAILABLE_FIELDS]: res?.schema ? 
            isEmpty(selectedFields) ? 
            [...res.schema] : [...res?.schema.filter((curField: IField) => !selectedFields.includes(curField.name))] : []
        }
      }));
      dispatch(sortFields({
        tabId: requestParams.tabId,
        data: [AVAILABLE_FIELDS, UNSELECTED_FIELDS]
      }));
      dispatch(visualizationReset({
        tabId: requestParams.tabId,
      }));
    });
  };

  const dispatchOnNoHis = (res: any) => {
    setResponse(res);
    batch(() => {
      dispatch(queryResultReset({
        tabId: requestParams.tabId
      }));
      dispatch(updateFields({
        tabId: requestParams.tabId,
        data: {
          [SELECTED_FIELDS]: [],
          [UNSELECTED_FIELDS]: [],
          [QUERIED_FIELDS]: [],
          [AVAILABLE_FIELDS]: res?.schema ? [...res.schema] : []
        }
      }));
      dispatch(sortFields({
        tabId: requestParams.tabId,
        data: [AVAILABLE_FIELDS]
      }));
      dispatch(visualizationReset({
        tabId: requestParams.tabId,
      }));
    });
  };

  const getLiveTail = (query: string = '', errorHandler?: (error: any) => void) => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    fetchEvents({ query: searchQuery }, 'jdbc', (res: any) => {
      if (!isEmpty(res.jsonData)) {
        if (!isEmpty(responseRef.current)){
          res.jsonData = res.jsonData.concat(responseRef.current.jsonData);
          res.datarows = res.datarows.concat(responseRef.current.datarows);
          res.total = res.total + responseRef.current.total;
          res.size = res.size + responseRef.current.size;
        }
        // // send only first 200 data log arrays
        // if (res.total > 200) {
        //   res.jsonData = res.jsonData.slice(0,200);
        //   res.datarows = res.datarows.slice(0,200);
        //   res.total = 200;
        //   res.size = 200;
        // }
        dispatchOnGettingHis(res);
      } 
      if (isEmpty(res.jsonData) && isEmpty(responseRef.current)) {
        dispatchOnNoHis(res);
      }
    }, errorHandler);
  };

  const getEvents = (query: string = '', errorHandler?: (error: any) => void) => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    fetchEvents({ query: searchQuery }, 'jdbc', (res: any) => {
      if (!isEmpty(res.jsonData)) {
        return dispatchOnGettingHis(res);
      }
      // when no hits and needs to get available fields to override default timestamp
      dispatchOnNoHis(res);
    }, errorHandler);
  };

  const getAvailableFields = (query: string) => {
    fetchEvents({ query, }, 'jdbc', (res: any) => {
      batch(() => {
        dispatch(fetchSuccess({
          tabId: requestParams.tabId,
          data: {
            jsonDataAll: res['jsonData']
          }
        }));
        dispatch(updateFields({
          tabId: requestParams.tabId,
          data: {
            [AVAILABLE_FIELDS]: res?.schema ? [...res.schema] : []
          }
        }));
        dispatch(sortFields({
          tabId: requestParams.tabId,
          data: [AVAILABLE_FIELDS, UNSELECTED_FIELDS]
        }));
      });
    });
  };

  return {
    isEventsLoading,
    getLiveTail,
    getEvents,
    getAvailableFields,
    fetchEvents
  };
};

