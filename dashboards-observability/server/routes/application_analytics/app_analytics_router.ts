/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  ILegacyScopedClusterClient,
} from '../../../../../src/core/server';
import { APP_ANALYTICS_API_PREFIX as API_PREFIX } from '../../../common/constants/application_analytics';
import { ApplicationType } from '../../../common/types/application_analytics';
import { AppAnalyticsAdaptor } from '../../../server/adaptors/application_analytics/app_analytics_adaptor';
import { addRequestToMetric } from '../../common/metrics/metrics_helper';

export function registerAppAnalyticsRouter(router: IRouter) {
  const appAnalyticsBackend = new AppAnalyticsAdaptor();

  // Fetches all existing applications
  router.get(
    {
      path: `${API_PREFIX}/`,
      validate: {},
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'get', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      let applicationsData: ApplicationType[] = [];
      try {
        applicationsData = await appAnalyticsBackend.fetchApps(opensearchClient);
        return response.ok({
          body: {
            data: applicationsData,
          },
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'get', err);
        console.error('Error occurred while fetching applications', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

  // Fetch application by id
  router.get(
    {
      path: `${API_PREFIX}/{appId}`,
      validate: {
        params: schema.object({
          appId: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'get', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const appObject = await appAnalyticsBackend.fetchAppById(
          opensearchClient,
          request.params.appId
        );
        return response.ok({
          body: appObject,
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'get', err);
        console.error('Error occurred while fetching application', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

  // Create a new application
  router.post(
    {
      path: `${API_PREFIX}/`,
      validate: {
        body: schema.object({
          name: schema.string(),
          description: schema.maybe(schema.string()),
          baseQuery: schema.string(),
          servicesEntities: schema.arrayOf(schema.string()),
          traceGroups: schema.arrayOf(schema.string()),
          availabilityVisId: schema.maybe(schema.string()),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'create', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newAppId = await appAnalyticsBackend.createNewApp(opensearchClient, request.body);
        return response.ok({
          body: {
            message: 'Application Created',
            newAppId,
          },
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'get', err);
        console.error('Error occurred while creating a new application', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

  // Renames an existing application
  router.put(
    {
      path: `${API_PREFIX}/rename`,
      validate: {
        body: schema.object({
          appId: schema.string(),
          name: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'update', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        await appAnalyticsBackend.renameApp(
          opensearchClient,
          request.body.appId,
          request.body.name
        );
        return response.ok({
          body: {
            message: 'Application Renamed',
          },
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'update', err);
        console.error('Error occurred while renaming an existing application', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

  // Updates an existing application
  router.put(
    {
      path: `${API_PREFIX}/`,
      validate: {
        body: schema.object({
          appId: schema.string(),
          updateBody: schema.object({
            name: schema.maybe(schema.string()),
            description: schema.maybe(schema.string()),
            servicesEntities: schema.maybe(schema.arrayOf(schema.string())),
            traceGroups: schema.maybe(schema.arrayOf(schema.string())),
            panelId: schema.maybe(schema.string()),
            availabilityVisId: schema.maybe(schema.string()),
          }),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'update', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const updatedAppId = await appAnalyticsBackend.updateApp(
          opensearchClient,
          request.body.appId,
          request.body.updateBody
        );
        return response.ok({
          body: {
            message: 'Application Updated',
            updatedAppId,
          },
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'update', err);
        console.error('Error occurred while updating an existing application', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

  // Delete applications
  router.delete(
    {
      path: `${API_PREFIX}/{appList}`,
      validate: {
        params: schema.object({
          appList: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('application_analytics', 'delete', 'count');
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const delResponse = await appAnalyticsBackend.deleteApp(
          opensearchClient,
          request.params.appList
        );
        return response.ok({
          body: delResponse,
        });
      } catch (err: any) {
        addRequestToMetric('application_analytics', 'delete', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );
}
