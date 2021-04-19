/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

import { IRouter, IOpenSearchDashboardsResponse, ResponseError } from '../../../../src/core/server';
import { API_PREFIX, FETCH_SIZE } from '../../common';
import { RequestParams } from '@elastic/elasticsearch';

export function vizRouter(router: IRouter) {
  // Fetches available saved visualizations for current user
  router.get(
    {
      path: `${API_PREFIX}/visualizations`,
      validate: {},
    },
    async (context, request, response): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const params: RequestParams.Search = {
        index: '.opensearch_dashboards',
        size: FETCH_SIZE,
        q: 'type:visualization',
      };
      try {
        const opensearchClientResponse = await context.core.opensearch.legacy.client.callAsCurrentUser(
          'search',
          params
        );
        const savedVisualizations = opensearchClientResponse.hits.hits;
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
