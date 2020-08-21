/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { IRouter, IKibanaResponse, ResponseError } from '../../../../src/core/server';
import { API_PREFIX } from '../../common';
import { RequestParams } from '@elastic/elasticsearch';

export function vizRouter(router: IRouter) {
  // Fetches available saved visualizations for current user
  router.get(
    {
      path: `${API_PREFIX}/visualizations`,
      validate: {},
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const params: RequestParams.Search = {
        index: '.kibana',
        q: 'type:visualization',
      };
      try {
        const esClientResponse = await context.core.elasticsearch.legacy.client.callAsInternalUser(
          'search',
          params
        );
        const savedVisualizations = esClientResponse.hits.hits;
        const vizResponse = savedVisualizations.map((vizDocument) => ({
          label: vizDocument._source.visualization.title,
          key: vizDocument._id.split(':').pop(),
        }));
        return response.ok({
          body: { savedVisualizations: vizResponse },
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
