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

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  IScopedClusterClient,
} from '../../../../../src/core/server';
import { CUSTOM_PANELS_API_PREFIX as API_PREFIX } from '../../../common/constants/custom_panels';

export function VisualizationsRouter(router: IRouter) {
  // Add a new visualization to the panel
  router.post(
    {
      path: `${API_PREFIX}/visualizations`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          newVisualization: schema.object({
            id: schema.string(),
            title: schema.string(),
            x: schema.number(),
            y: schema.number(),
            w: schema.number(),
            h: schema.number(),
            query: schema.string(),
            type: schema.string(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const visualizations = {};

      try {
        return response.ok({
          body: {
            message: 'Visualization Added',
            visualizations: visualizations,
          },
        });
      } catch (error) {
        console.log('Issue in adding visualization:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Replace an existing visualization
  router.post(
    {
      path: `${API_PREFIX}/visualizations/replace`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          oldVisualizationId: schema.string(),
          newVisualization: schema.object({
            id: schema.string(),
            title: schema.string(),
            x: schema.number(),
            y: schema.number(),
            w: schema.number(),
            h: schema.number(),
            query: schema.string(),
            type: schema.string(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const visualizations = {};

      try {
        return response.ok({
          body: {
            message: 'Visualization Replaced',
            visualizations: visualizations,
          },
        });
      } catch (error) {
        console.log('Issue in replacing visualization:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Clone an existing visualization
  router.post(
    {
      path: `${API_PREFIX}/visualizations/clone`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          cloneVisualizattionId: schema.string(),
          newVisualizationParams: schema.object({
            id: schema.string(),
            title: schema.string(),
            x: schema.number(),
            y: schema.number(),
            w: schema.number(),
            h: schema.number(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const visualizations = {};

      try {
        return response.ok({
          body: {
            message: 'Visualization Cloned',
            visualizations: visualizations,
          },
        });
      } catch (error) {
        console.log('Issue in replacing visualization:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Delete an existing visualization
  router.delete(
    {
      path: `${API_PREFIX}/visualizations/{panelId}/{visualizationId}`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          visualizationId: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const visualizations = {};

      try {
        return response.noContent({
          body: {
            message: 'Visualization Deleted',
          },
        });
      } catch (error) {
        console.log('Issue in deleting visualization:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // changes the position of the mentioned visualizations
  router.put(
    {
      path: `${API_PREFIX}/visualizations/resize`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
          visualizationParams: schema.arrayOf(
            schema.object({
              id: schema.string(),
              x: schema.number(),
              y: schema.number(),
              w: schema.number(),
              h: schema.number(),
            })
          ),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const visualizations = {};

      try {
        return response.ok({
          body: {
            message: 'Visualization Resized',
            visualizations: visualizations,
          },
        });
      } catch (error) {
        console.log('Issue in deleting visualization:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
