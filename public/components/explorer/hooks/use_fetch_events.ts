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

import { useState, useRef } from 'react';
import { batch } from 'react-redux';
import { isEmpty } from 'lodash';
import { 
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  RAW_QUERY,
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
  sortFields
} from '../slices/field_slice';
import PPLService from '../../../services/requests/ppl';

interface IFetchEventsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchEvents = ({
  pplService,
  requestParams
}: IFetchEventsParams) => {
  
  const dispatch = useDispatch();
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const fetchEvents = async (
    { query }: { query: string },
    format: string,
    handler: (res: any) => void
  ) => {
    setIsEventsLoading(true);
    await pplService.fetch({
      query,
      format,
    })
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

  const getEvents = (query: string = '') => {
    const cur = queriesRef.current;
    const searchQuery = isEmpty(query) ? cur![requestParams.tabId][FINAL_QUERY] : query;
    fetchEvents({ query: searchQuery }, 'jdbc', (res: any) => {
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
            [SELECTED_FIELDS]: [],
            [UNSELECTED_FIELDS]: res?.schema ? [ ...res.schema ] : [],
            [QUERIED_FIELDS]: [],
            [AVAILABLE_FIELDS]: res?.schema ? [...res.schema] : []
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
    });
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
    getEvents,
    getAvailableFields,
    fetchEvents
  };
};

