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
import { 
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  RAW_QUERY,
  SELECTED_FIELDS,
  UNSELECTED_FIELDS
} from '../../../common/constants/explorer';
import { fetchSuccess } from '../slices/queryResultSlice';
import { selectQueries } from '../slices/querySlice';
import {
  updateFields,
} from '../slices/fieldSlice';

export const useFetchEvents = ({
  pplService,
  requestParams = {}
}: any) => {
  
  const dispatch = useDispatch();
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const fetchEvents = async (
    { query }: any,
    format: string,
    handler: any
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

  const getEvents = () => {
    const cur = queriesRef.current;
    Promise.all([]).then((values) => {});
    fetchEvents({ query: cur[requestParams.tabId][RAW_QUERY] }, 'jdbc', (res) => {
      batch(() => {
        dispatch(fetchSuccess({
          tabId: requestParams.tabId,
          data: res
        }));
        dispatch(updateFields({
          tabId: requestParams.tabId,
          data: {
            [SELECTED_FIELDS]: [],
            [UNSELECTED_FIELDS]: res?.schema
          }
        }));
      });
    });
  };

  return {
    isEventsLoading,
    getEvents
  };
};

