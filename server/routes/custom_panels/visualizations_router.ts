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
import { CustomPanelsAdaptor } from '../../adaptors/custom_panels/custom_panel_adaptor';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  ILegacyScopedClusterClient,
} from '../../../../../src/core/server';
import { CUSTOM_PANELS_API_PREFIX as API_PREFIX } from '../../../common/constants/custom_panels';

export function VisualizationsRouter(router: IRouter) {
  // Fetch all the savedVisualzations
  const customPanelBackend = new CustomPanelsAdaptor();
  router.get(
    {
      path: `${API_PREFIX}/visualizations`,
      validate: {},
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const visualizationList = await customPanelBackend.viewSavedVisualiationList(
          opensearchNotebooksClient
        );
        return response.ok({
          body: {
            visualizations: visualizationList,
          },
        });
      } catch (error) {
        console.log('Issue in fetching saved visualizations:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Add a new visualization to the panel
  router.post(
    {
      path: `${API_PREFIX}/visualizations`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          newVisualization: schema.object({
            id: schema.string(),
            title: schema.string(),
            query: schema.string(),
            type: schema.string(),
            timeField: schema.string(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newVisualizations = await customPanelBackend.addVisualization(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.newVisualization
        );
        return response.ok({
          body: {
            message: 'Visualization Added',
            visualizations: newVisualizations,
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

  // Add a new visualization to panel from event explorer
  // NOTE: This is a separate endpoint for adding event explorer visualizations to Operational Panels
  // Please use `id = 'panelViz_' + htmlIdGenerator()()` to create unique visualization Id
  router.post(
    {
      path: `${API_PREFIX}/visualizations/event_explorer`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          newVisualization: schema.object({
            id: schema.string(),
            title: schema.string(),
            query: schema.string(),
            type: schema.string(),
            timeField: schema.string(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newVisualizations = await customPanelBackend.addVisualizationFromEvents(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.newVisualization
        );
        return response.ok({
          body: {
            message: 'Visualization Added',
            visualizations: newVisualizations,
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
        body: schema.object({
          panelId: schema.string(),
          oldVisualizationId: schema.string(),
          newVisualization: schema.object({
            id: schema.string(),
            title: schema.string(),
            query: schema.string(),
            type: schema.string(),
            timeField: schema.string(),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newVisualizations = await customPanelBackend.addVisualization(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.newVisualization,
          request.body.oldVisualizationId
        );
        return response.ok({
          body: {
            message: 'Visualization Replaced',
            visualizations: newVisualizations,
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
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newVisualizations = await customPanelBackend.deleteVisualization(
          opensearchNotebooksClient,
          request.params.panelId,
          request.params.visualizationId
        );
        return response.ok({
          body: {
            message: 'Visualization Deleted',
            visualizations: newVisualizations,
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
  // Also removes the visualiations not mentioned
  router.put(
    {
      path: `${API_PREFIX}/visualizations/edit`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          visualizationParams: schema.arrayOf(
            schema.object({
              i: schema.string(),
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
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newVisualizations = await customPanelBackend.editVisualization(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.visualizationParams
        );
        return response.ok({
          body: {
            message: 'Visualizations Edited',
            visualizations: newVisualizations,
          },
        });
      } catch (error) {
        console.log('Issue in Editing visualizations:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
