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

export const useFetchQueryResponse = ({
  pplService,
  requestParams = {}
}: any) => {
  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;
  //const rawQuery = queries[requestParams.tabId][RAW_QUERY];

  const getQueryResponse = async () => {
    setIsLoading(true);
    const cur = queriesRef.current;
    await pplService.fetch({
      query: cur[requestParams.tabId][RAW_QUERY]
    })
    .then((res) => {
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
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return {
    isLoading,
    getQueryResponse
  };
};

