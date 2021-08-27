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
import { 
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  RAW_QUERY
} from '../../../../common/constants/explorer';
import { render as renderCountDis } from '../slices/count_distribution_slice';
import { selectQueries } from '../slices/query_slice';
import { render as renderExplorerVis } from '../slices/visualization_slice';

export const useFetchVisualizations = ({
  pplService,
  requestParams = {}
}: any) => {
  
  const dispatch = useDispatch();
  const [isVisLoading, setIsVisLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const fetchVisualizations = async (
    { query }: any,
    format: string,
    handler: any
  ) => {
    setIsVisLoading(true);
    
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
      setIsVisLoading(false);
    });
  }
  
  const getCountVisualizations = (interval: string) => {
    const cur = queriesRef.current;
    const rawQuery = cur[requestParams.tabId][RAW_QUERY];
    fetchVisualizations({
      query: `${rawQuery} | stats count() by span(timestamp, '1${interval = interval ? interval: 'm' }')` },
      'viz',
      (res: any) => {
      dispatch(renderCountDis({
        tabId: requestParams.tabId,
        data: res
      }));
    });
  }
  
  const getVisualizations = () => {
    const cur = queriesRef.current;
    const rawQuery = cur[requestParams.tabId][RAW_QUERY];
    fetchVisualizations({ 
      query: rawQuery },
      'viz',
      (res: any) => {
      dispatch(renderExplorerVis({
        tabId: requestParams.tabId,
        data: res
      }));
    });
  }

  return {
    isVisLoading,
    getVisualizations,
    getCountVisualizations
  };
};

