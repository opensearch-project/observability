/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { batch, useDispatch } from 'react-redux';
import { updateFields, sortFields } from '../redux/slices/field_slice';
import { render as renderExplorerVis } from '../redux/slices/visualization_slice';
import { fetchSuccess } from '../redux/slices/query_result_slice';
import {
  QUERIED_FIELDS,
  SELECTED_FIELDS,
} from '../../../../common/constants/explorer';
import { change as changeVizConfig } from '../redux/slices/viualization_config_slice';
import { changeQuery } from '../redux/slices/query_slice';
import { VisualizationState } from 'common/types/explorer';

export interface IVisualizationParams {
  query: string;
  callback: (res: any) => void | null;
}

export const useRenderVisualization = ({ pplService, requestParams }) => {
  const dispatch = useDispatch();
  const fetchVisualizations = async (
    { query }: { query: string },
    format: string,
    successHandler: (res: any) => void,
    errorHandler: (error: any) => void
  ) => {
    await pplService
      .fetch(
        {
          query,
          format,
        },
        (error) => {
          errorHandler(error);
        }
      )
      .then((res: any) => {
        if (res && res.status === 200) {
          successHandler(res);
        }
      });
  };

  const getVisualizations = ({ query, callback }: IVisualizationParams) => {
    fetchVisualizations(
      {
        query,
      },
      'viz',
      (res: any) => {
        callback && callback(res);
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

  const fillVisDataInStore = ({ visData, query, visConfMetadata, visMeta }: VisualizationState) => {
    batch(() => {
      // query
      dispatch(
        changeQuery({
          tabId: requestParams.tabId,
          query,
        })
      );

      // explorerVisualization
      dispatch(
        renderExplorerVis({
          tabId: requestParams.tabId,
          data: visData,
        })
      );

      // queryResults
      dispatch(
        fetchSuccess({
          tabId: requestParams.tabId,
          data: {
            jsonData: visData?.jsonData || {},
          },
        })
      );

      // fields
      dispatch(
        updateFields({
          tabId: requestParams.tabId,
          data: {
            [QUERIED_FIELDS]: visData?.metadata?.fields || [],
            [SELECTED_FIELDS]: [],
          },
        })
      );

      // sort fields
      dispatch(
        sortFields({
          tabId: requestParams.tabId,
          data: [QUERIED_FIELDS],
        })
      );

      // explorerVisualizationConfig
      dispatch(
        changeVizConfig({
          tabId: requestParams.tabId,
          vizId: visMeta.visId,
          data: {
            dataConfig: {
              ...visConfMetadata,
            },
          },
        })
      );
    });
  };

  return {
    getVisualizations,
    fillVisDataInStore,
  };
};
