import { schema } from '@kbn/config-schema';
import { RequestParams } from '@elastic/elasticsearch';
import { IRouter } from '../../../../src/core/server';
import { INDEX_NAME } from '../util/constants';

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: '/api/trace_analytics/query',
      validate: {
        body: schema.any(),
      },
    },
    async (context, request, response) => {
      const { size, ...rest } = request.body;
      const params: RequestParams.Search = {
        index: INDEX_NAME,
        size,
        body: rest,
      };
      const resp = await context.core.elasticsearch.dataClient.callAsInternalUser('search', params);
      return response.ok({
        body: resp,
      });
    }
  );
}
