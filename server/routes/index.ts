import { RequestParams } from '@elastic/elasticsearch';
import { schema } from '@kbn/config-schema';
import { IRouter } from '../../../../src/core/server';
import { INDEX_NAME } from '../../common';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/trace_analytics/query',
      validate: {
        body: schema.object({
          from: schema.maybe(schema.number()),
          size: schema.number(),
          query: schema.maybe(
            schema.object({
              bool: schema.object({
                filter: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                must: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                should: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
                must_not: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
              }),
            })
          ),
          aggs: schema.maybe(schema.any()),
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
      const { size, ...rest } = request.body;
      const params: RequestParams.Search = {
        index: INDEX_NAME,
        size,
        body: rest,
      };
      try {
        const resp = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
          'search',
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
}
