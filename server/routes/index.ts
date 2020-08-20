import { schema } from '@kbn/config-schema';
import { RequestParams } from '@elastic/elasticsearch';
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/trace_analytics/query',
      validate: {
        body: schema.any(),
      },
    },
    async (context, request, response) => {
      const params: RequestParams.Search = {
        index: request.body.index,
        size: request.body.size,
        body: request.body.query,
      };
      const resp = await context.core.elasticsearch.dataClient.callAsInternalUser('search', params);
      return response.ok({
        body: resp,
      });
    }
  );
}
