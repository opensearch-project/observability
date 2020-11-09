import { RequestParams } from '@elastic/elasticsearch';
import { ILegacyClusterClient, IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';
import { SQL_ROUTE } from '../utils/constants';

export function RegisterSqlRouter(router: IRouter, sqlClient: ILegacyClusterClient) {
  router.post(
    {
      path: SQL_ROUTE,
      validate: {
        body: schema.object({
          query: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      const params: RequestParams.Search = {
        body: request.body,
      };
      try {
        const resp = await sqlClient.asScoped(request).callAsCurrentUser('sql.sqlQuery', params);

        return response.ok({
          body: JSON.stringify(resp),
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
