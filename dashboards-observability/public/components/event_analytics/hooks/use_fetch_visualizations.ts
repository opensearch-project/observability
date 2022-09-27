/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  FINAL_QUERY,
  QUERIED_FIELDS,
  RAW_QUERY,
  SELECTED_FIELDS,
  SELECTED_TIMESTAMP,
} from '../../../../common/constants/explorer';
import { render as renderCountDis } from '../redux/slices/count_distribution_slice';
import { selectQueries } from '../redux/slices/query_slice';
import { render as renderExplorerVis } from '../redux/slices/visualization_slice';
import { updateFields, sortFields } from '../redux/slices/field_slice';
import PPLService from '../../../services/requests/ppl';
import { fetchSuccess } from '../redux/slices/query_result_slice';

interface IFetchVisualizationsParams {
  pplService: PPLService;
  requestParams: { tabId: string };
}

export const useFetchVisualizations = ({
  pplService,
  requestParams,
}: IFetchVisualizationsParams) => {
  const dispatch = useDispatch();
  const [isVisLoading, setIsVisLoading] = useState<boolean>(false);
  const queries = useSelector(selectQueries);
  const queriesRef = useRef();
  queriesRef.current = queries;

  const fetchVisualizations = async (
    { query }: { query: string },
    format: string,
    successHandler: (res: any) => void,
    errorHandler: (error: any) => void
  ) => {
    setIsVisLoading(true);

    await pplService
      .fetch({
        query,
        format,
      }, (error) => {
        errorHandler(error);
        setIsVisLoading(false);
      })
      .then((res: any) => {
        if (res && res.status === 200) {
          successHandler(res);
        }
        setIsVisLoading(false);
      })
  };

  const getCountVisualizations = (interval: string) => {
    const cur = queriesRef.current;
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    fetchVisualizations(
      {
        query: `${rawQuery} | stats count() by span(${
          cur![requestParams.tabId][SELECTED_TIMESTAMP]
        }, 1${(interval = interval ? interval : 'm')})`,
      },
      'viz',
      (res: any) => {
        dispatch(
          renderCountDis({
            tabId: requestParams.tabId,
            data: res,
          })
        );
      },
      (error: Error) => {}
    );
  };

  const getVisualizations = () => {
    const cur = queriesRef.current;
    const rawQuery = cur![requestParams.tabId][FINAL_QUERY];
    fetchVisualizations(
      {
        query: rawQuery,
      },
      'viz',
      (res: any) => {
        batch(() => {
          dispatch(
            renderExplorerVis({
              tabId: requestParams.tabId,
              data: res,
            })
          );
          dispatch(
            fetchSuccess({
              tabId: requestParams.tabId,
              data: {
                jsonData: res?.jsonData || {},
              },
            })
          );
          dispatch(
            updateFields({
              tabId: requestParams.tabId,
              data: {
                [QUERIED_FIELDS]: res?.metadata?.fields || [],
                [SELECTED_FIELDS]: [],
              },
            })
          );
          dispatch(
            sortFields({
              tabId: requestParams.tabId,
              data: [QUERIED_FIELDS],
            })
          );
        });
      },
      (error: any) => {
        dispatch(
          renderExplorerVis({
            tabId: requestParams.tabId,
            data: error.body,
          })
        );
      }
    );
  };

  return {
    isVisLoading,
    getVisualizations,
    getCountVisualizations,
  };
};
