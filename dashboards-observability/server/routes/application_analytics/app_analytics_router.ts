/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  ILegacyScopedClusterClient,
} from '../../../../../src/core/server';
import { APP_ANALYTICS_API_PREFIX as API_PREFIX } from '../../../common/constants/application_analytics';
import { AppAnalyticsAdaptor } from '../../../server/adaptors/application_analytics/app_analytics_adaptor';

export function registerAppAnalyticsRouter(router: IRouter) {
  const appAnalyticsBackend = new AppAnalyticsAdaptor();
  
  // Create a new application
  router.post(
    {
      path: `${API_PREFIX}/application`,
      validate: {
        body: schema.object({
          name: schema.string(),
          description: schema.string(),
          baseQuery: schema.string(),
          servicesEntities: schema.arrayOf(schema.string()),
          traceGroups: schema.arrayOf(schema.string())
        }),
      },
    },
    async(
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );

      try {
        const newAppId = await appAnalyticsBackend.createNewApp(
          opensearchClient,
          request.body.name,
          request.body.description,
          request.body.baseQuery,
          request.body.servicesEntities,
          request.body.traceGroups
        );
        return response.ok({
          body: {
            message: 'Application Created',
            newAppId: newAppId,
          }
        });
      } catch (err: any) {
        console.error('Error occureed while creating a new application', err);
        return response.custom({
          statusCode: err.statusCode || 500,
          body: err.message,
        });
      }
    }
  );

}