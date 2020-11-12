/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

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
