import { schema } from '@kbn/config-schema';
import { RequestParams } from '@elastic/elasticsearch';
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/trace_analytics/query',
      validate: {
        body: schema.any(),
        // body: schema.object({
        //   sheet: schema.arrayOf(schema.string()),
        //   extended: schema.maybe(
        //     schema.object({
        //       es: schema.object({
        //         filter: schema.object({
        //           bool: schema.object({
        //             filter: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             must: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             should: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
        //             must_not: schema.maybe(
        //               schema.arrayOf(schema.object({}, { unknowns: 'allow' }))
        //             ),
        //           }),
        //         }),
        //       }),
        //     })
        //   ),
        //   time: schema.maybe(
        //     schema.object({
        //       from: schema.maybe(schema.string()),
        //       interval: schema.string(),
        //       timezone: schema.string(),
        //       to: schema.maybe(schema.string()),
        //     })
        //   ),
        // }),
      },
    },
    async (context, request, response) => {
      const params: RequestParams.Search = {
        index: request.body.index,
        size: request.body.size,
        body: {
          query: request.body.query,
        },
      };
      const resp = await context.core.elasticsearch.dataClient.callAsInternalUser('search', params);
      return response.ok({
        body: {
          total: resp.hits.total.value,
          hits: resp.hits.hits,
        },
      });
    }
  );
}
