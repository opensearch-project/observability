/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { RequestParams } from '@elastic/elasticsearch';
import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';
import { TRACE_ANALYTICS_DSL_ROUTE, TRACE_ANALYTICS_INDICES_ROUTE, DATA_PREPPER_INDEX_NAME, DATA_PREPPER_SERVICE_INDEX_NAME } from '../../common/constants/trace_analytics';

export function registerTraceAnalyticsDslRouter(router: IRouter) {
  router.post(
    {
      path: TRACE_ANALYTICS_INDICES_ROUTE,
      validate: false,
    },
    async (context, request, response) => {
      const params: RequestParams.IndicesExists = {
        index: [DATA_PREPPER_INDEX_NAME, DATA_PREPPER_SERVICE_INDEX_NAME],
        allow_no_indices: false,
      };
      try {
        const resp = await context.core.opensearch.legacy.client.callAsCurrentUser(
          'indices.exists',
          params
        );
        return response.ok({
          body: resp,
        });
      } catch (error) {
        console.error(error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
  router.post(
    {
      path: TRACE_ANALYTICS_DSL_ROUTE,
      validate: {
        body: schema.object({
          index: schema.maybe(schema.string()),
          from: schema.maybe(schema.number()),
          size: schema.number(),
          query: schema.maybe(
            schema.object({
              bool: schema.object({
                filter: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                must: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                should: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                must_not: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                minimum_should_match: schema.maybe(schema.number()),
                adjust_pure_negative: schema.maybe(schema.boolean()),
                boost: schema.maybe(schema.any()),
              }),
            })
          ),
          aggs: schema.maybe(schema.any()),
          aggregations: schema.maybe(schema.any()),
          sort: schema.maybe(schema.arrayOf(schema.any())),
          _source: schema.maybe(
            schema.object({
              includes: schema.arrayOf(schema.string()),
            })
          ),
          script_fields: schema.maybe(schema.any()),
        }),
      },
    },
    async (context, request, response) => {
      const { index, size, ...rest } = request.body;
      const params: RequestParams.Search = {
        index: index || DATA_PREPPER_INDEX_NAME,
        size,
        body: rest,
      };
      try {
        const resp = await context.core.opensearch.legacy.client.callAsCurrentUser(
          'search',
          params
        );
        return response.ok({
          body: resp,
        });
      } catch (error) {
        if (error.statusCode !== 404) console.error(error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
