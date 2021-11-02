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
  batch,
  useDispatch,
  useSelector
} from 'react-redux';
import { 
  FINAL_QUERY,
  QUERIED_FIELDS,
  RAW_QUERY,
  SELECTED_FIELDS,
  SELECTED_TIMESTAMP
} from '../../../../common/constants/explorer';
import { render as renderCountDis } from '../slices/count_distribution_slice';
import { selectQueries } from '../slices/query_slice';
import { render as renderExplorerVis } from '../slices/visualization_slice';
import { 
  updateFields,
  sortFields
} from '../slices/field_slice';
import PPLService from '../../../services/requests/ppl';
import { fetchSuccess } from '../slices/query_result_slice';

interface IFetchVisualizationsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchVisualizations = ({
  pplService,
  requestParams
}: IFetchVisualizationsParams) => {
  
  const dispatch = useDispatch();
  const [isVisLoading, setIsVisLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const fetchVisualizations = async (
    { query }: { query: string },
    format: string,
    handler: (res: any) => void
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
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    fetchVisualizations({
      query: `${rawQuery} | stats count() by span(${cur![requestParams.tabId][SELECTED_TIMESTAMP]}, 1${interval = interval ? interval: 'm' })` },
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
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    fetchVisualizations({ 
      query: rawQuery },
      'viz',
      (res: any) => {
        batch(() => {
          dispatch(renderExplorerVis({
            tabId: requestParams.tabId,
            data: res
          }));
          dispatch(fetchSuccess({
            tabId: requestParams.tabId,
            data: {
              jsonData: res?.jsonData || {}
            }
          }));
          dispatch(updateFields({
            tabId: requestParams.tabId,
            data: {
              [QUERIED_FIELDS]: res?.metadata?.fields || [],
              [SELECTED_FIELDS]: []
            }
          }));
          dispatch(sortFields({
            tabId: requestParams.tabId,
            data: [QUERIED_FIELDS]
          }));
        });
    });
  }

  return {
    isVisLoading,
    getVisualizations,
    getCountVisualizations
  };
};

