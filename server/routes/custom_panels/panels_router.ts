/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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

export function PanelsRouter(router: IRouter) {
  const customPanelBackend = new CustomPanelsAdaptor();
  // Fetch all the custom panels available
  router.get(
    {
      path: `${API_PREFIX}/panels`,
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
        const panelsList = await customPanelBackend.viewPanelList(opensearchNotebooksClient);
        return response.ok({
          body: {
            panels: panelsList,
          },
        });
      } catch (error: any) {
        console.error('Issue in fetching panel list:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Fetch the required panel by id
  router.get(
    {
      path: `${API_PREFIX}/panels/{panelId}`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
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
        const panelObject = await customPanelBackend.getPanel(
          opensearchNotebooksClient,
          request.params.panelId
        );
        return response.ok({
          body: panelObject,
        });
      } catch (error: any) {
        console.error('Issue in fetching panel:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  //Create a new panel
  router.post(
    {
      path: `${API_PREFIX}/panels`,
      validate: {
        body: schema.object({
          panelName: schema.string(),
          applicationId: schema.maybe(schema.string()),
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
        const newPanelId = await customPanelBackend.createNewPanel(
          opensearchNotebooksClient,
          request.body.panelName,
          request.body.applicationId || '',
        );
        return response.ok({
          body: {
            message: 'Panel Created',
            newPanelId: newPanelId,
          },
        });
      } catch (error: any) {
        console.error('Issue in creating new panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // rename an existing panel
  router.patch(
    {
      path: `${API_PREFIX}/panels/rename`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          panelName: schema.string(),
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
        const responseBody = await customPanelBackend.renamePanel(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.panelName
        );
        return response.ok({
          body: {
            message: 'Panel Renamed',
          },
        });
      } catch (error: any) {
        console.error('Issue in renaming panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // clones an existing panel
  // returns new panel Id
  router.post(
    {
      path: `${API_PREFIX}/panels/clone`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          panelName: schema.string(),
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
        const cloneResponse = await customPanelBackend.clonePanel(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.panelName
        );
        return response.ok({
          body: {
            message: 'Panel Cloned',
            clonePanelId: cloneResponse.clonePanelId,
            dateCreated: cloneResponse.dateCreated,
            dateModified: cloneResponse.dateModified,
          },
        });
      } catch (error: any) {
        console.error('Issue in cloning panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // delete an existing panel
  router.delete(
    {
      path: `${API_PREFIX}/panels/{panelId}`,
      validate: {
        params: schema.object({
          panelId: schema.string(),
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
        const deleteResponse = await customPanelBackend.deletePanel(
          opensearchNotebooksClient,
          request.params.panelId
        );
        return response.noContent({
          body: {
            message: 'Panel Deleted',
          },
        });
      } catch (error: any) {
        console.error('Issue in deleting panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // delete an existing panel(s)
  router.delete(
    {
      path: `${API_PREFIX}/panelList/{panelIdList}`,
      validate: {
        params: schema.object({
          panelIdList: schema.string(),
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
        const deleteResponse = await customPanelBackend.deletePanelList(
          opensearchNotebooksClient,
          request.params.panelIdList
        );
        return response.noContent({
          body: {
            message: 'Panel Deleted',
          },
        });
      } catch (error: any) {
        console.error('Issue in deleting panel', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // replaces the ppl query filter in panel
  router.patch(
    {
      path: `${API_PREFIX}/panels/filter`,
      validate: {
        body: schema.object({
          panelId: schema.string(),
          query: schema.string(),
          language: schema.string(),
          to: schema.string(),
          from: schema.string(),
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
        const panelFilterResponse = await customPanelBackend.addPanelFilter(
          opensearchNotebooksClient,
          request.body.panelId,
          request.body.query,
          request.body.language,
          request.body.to,
          request.body.from
        );
        return response.ok({
          body: {
            message: 'Panel PPL Filter Changed',
          },
        });
      } catch (error: any) {
        console.error('Issue in adding query filter', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Add Sample Panels
  router.post(
    {
      path: `${API_PREFIX}/panels/addSamplePanels`,
      validate: {
        body: schema.object({
          savedVisualizationIds: schema.arrayOf(schema.string()),
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
        const panelsData = await customPanelBackend.addSamplePanels(
          opensearchNotebooksClient,
          request.body.savedVisualizationIds
        );
        return response.ok({
          body: {
            demoPanelsData: panelsData,
          },
        });
      } catch (error: any) {
        console.error('Issue in fetching panel list:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
