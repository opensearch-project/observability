/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
} from '../../../../../src/core/server';
import {
  OBSERVABILITY_BASE,
  EVENT_ANALYTICS,
  SAVED_OBJECTS,
  SAVED_QUERY,
  SAVED_VISUALIZATION,
} from '../../../common/constants/shared';
import SavedObjectFacet from '../../services/facets/saved_objects';

export const registerEventAnalyticsRouter = ({
  router,
  savedObjectFacet,
}: {
  router: IRouter;
  savedObjectFacet: SavedObjectFacet;
}) => {
  
  router.get(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}`,
      validate: {},
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.getSavedObject(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success || savedRes?.data?.statusCode === 404) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );
  
  router.get(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/{objectId}`,
      validate: {
        params: schema.object({
          objectId: schema.string(),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.getSavedObjectById(req, req.params.objectId);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success || savedRes?.data?.statusCode === 404) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.post(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`,
      validate: {
        body: schema.object({
          object: schema.object({
            query: schema.string(),
            selected_date_range: schema.object({
              start: schema.string(),
              end: schema.string(),
              text: schema.string(),
            }),
            selected_timestamp: schema.object({
              name: schema.string(),
              type: schema.string(),
            }),
            selected_fields: schema.object({
              tokens: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
              text: schema.string(),
            }),
            name: schema.string(),
            description: schema.string(),
          }),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.createSavedQuery(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.post(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`,
      validate: {
        body: schema.object({
          object: schema.object({
            query: schema.string(),
            selected_date_range: schema.object({
              start: schema.string(),
              end: schema.string(),
              text: schema.string(),
            }),
            selected_timestamp: schema.object({
              name: schema.string(),
              type: schema.string(),
            }),
            selected_fields: schema.object({
              tokens: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
              text: schema.string(),
            }),
            type: schema.string(),
            name: schema.string(),
            description: schema.string(),
            application_id: schema.maybe(schema.string()),
            user_configs: schema.string(),
            sub_type: schema.string(),
            units_of_measure: schema.maybe(schema.string()),
            selected_labels: schema.maybe(schema.object({
              label: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
            })),
          }),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.createSavedVisualization(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.put(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_QUERY}`,
      validate: {
        body: schema.object({
          object_id: schema.string(),
          object: schema.object({
            query: schema.string(),
            selected_date_range: schema.object({
              start: schema.string(),
              end: schema.string(),
              text: schema.string(),
            }),
            selected_timestamp: schema.object({
              name: schema.string(),
              type: schema.string(),
            }),
            selected_fields: schema.object({
              tokens: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
              text: schema.string(),
            }),
            name: schema.string(),
            description: schema.string(),
          }),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.updateSavedQuery(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };
      if (savedRes.success) return res.ok(result);
      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.put(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}${SAVED_VISUALIZATION}`,
      validate: {
        body: schema.object({
          object_id: schema.string(),
          object: schema.object({
            query: schema.string(),
            selected_date_range: schema.object({
              start: schema.string(),
              end: schema.string(),
              text: schema.string(),
            }),
            selected_timestamp: schema.object({
              name: schema.string(),
              type: schema.string(),
            }),
            selected_fields: schema.object({
              tokens: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
              text: schema.string(),
            }),
            type: schema.string(),
            name: schema.string(),
            description: schema.string(),
            application_id: schema.maybe(schema.string()),
            user_configs: schema.string(),
            sub_type: schema.string(),
            units_of_measure: schema.maybe(schema.string()),
            selected_labels: schema.maybe(schema.object({
              labels: schema.arrayOf(schema.object({}, { unknowns: 'allow' })),
            })),
          }),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const updateRes = await savedObjectFacet.updateSavedVisualization(req);
      const result: any = {
        body: {
          ...updateRes.data,
        },
      };
      if (updateRes.success) return res.ok(result);
      result.statusCode = updateRes?.data?.statusCode || 500;
      result.message = updateRes?.data || '';
      return res.custom(result);
    }
  );

  router.post(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/timestamp`,
      validate: {
        body: schema.object({
          name: schema.string(),
          index: schema.string(),
          type: schema.string(),
          dsl_type: schema.string(),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.createSavedTimestamp(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.put(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/timestamp`,
      validate: {
        body: schema.object({
          objectId: schema.string(),
          timestamp: schema.object({
            name: schema.string(),
            index: schema.string(),
            type: schema.string(),
            dsl_type: schema.string(),
          }),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.updateSavedTimestamp(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );

  router.delete(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/{objectIdList}`,
      validate: {
        params: schema.object({
          objectIdList: schema.string(),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const deleteResponse = await savedObjectFacet.deleteSavedObject(req);
      const result: any = {
        body: {
          ...deleteResponse.data,
        },
      };
      if (deleteResponse.success) return res.ok(result);
      result.statusCode = deleteResponse?.data?.statusCode || 500;
      result.message = deleteResponse?.data || '';
      return res.custom(result);
    }
  );

  router.get(
    {
      path: `${OBSERVABILITY_BASE}${EVENT_ANALYTICS}${SAVED_OBJECTS}/addSampleSavedObjects/{sampleRequestor}`,
      validate: {
        params: schema.object({
          sampleRequestor: schema.string(),
        }),
      },
    },
    async (context, req, res): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const savedRes = await savedObjectFacet.createSampleSavedObjects(req);
      const result: any = {
        body: {
          ...savedRes.data,
        },
      };

      if (savedRes.success) return res.ok(result);

      result.statusCode = savedRes?.data?.statusCode || 500;
      result.message = savedRes?.data || '';
      return res.custom(result);
    }
  );
};
