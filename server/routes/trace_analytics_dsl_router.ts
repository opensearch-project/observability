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
import { schema } from '@osd/config-schema';
import { IRouter } from '../../../../src/core/server';
import {
  DSL_ROUTE,
  INDICES_ROUTE,
  RAW_INDEX_NAME,
  SERVICE_MAP_INDEX_NAME,
} from '../../public/components/trace_analytics/components/common';

export function registerTraceAnalyticsDslRouter(router: IRouter) {
  router.post(
    {
      path: INDICES_ROUTE,
      validate: false,
    },
    async (context, request, response) => {
      const params: RequestParams.IndicesExists = {
        index: [RAW_INDEX_NAME, SERVICE_MAP_INDEX_NAME],
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
      path: DSL_ROUTE,
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
        index: index || RAW_INDEX_NAME,
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
