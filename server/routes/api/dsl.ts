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

import {
  IRouter,
} from '../../../../../src/core/server';
import { schema } from '@osd/config-schema';
import DSLFacet from '../../services/facets/dslFacet';
import {
  DSL_BASE,
  DSL_SEARCH,
  DSL_CAT,
  DSL_MAPPING
} from '../../../common/index';
import { RequestParams } from '@elastic/elasticsearch';

export function registerDslRoute({
  router,
  facet,
}: {
  router: IRouter
  facet: DSLFacet
}) {
  router.post({
    path: `${DSL_BASE}${DSL_SEARCH}`,
    validate: { body:schema.any() }
  },
  async (context, request, response) => {
    const { index, size, ...rest } = request.body;
    const params: RequestParams.Search = {
      index: index,
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
  })

  router.get({
    path: `${DSL_BASE}${DSL_CAT}`,
    validate: { query: schema.object({
      format: schema.string()
    }) }
  },
  async (context, request, response) => {
    try {
      const resp = await context.core.opensearch.legacy.client.callAsCurrentUser(
        'cat.indices',
        //{format: 'json'}
        request.query
      );
      return response.ok({
        body: resp
      });
    } catch (error) {
      if (error.statusCode !== 404) console.error(error);
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message
      })
    }
  })
  
  router.get({
    path: `${DSL_BASE}${DSL_MAPPING}`,
    validate: { query: schema.any() }
  },
  async (context, request, response) => {
    try {
      const resp = await context.core.opensearch.legacy.client.callAsCurrentUser(
        'indices.getMapping',
        { index: request.query.index }
      );
      return response.ok({
        body: resp
      });
    } catch (error) {
      if (error.statusCode !== 404) console.error(error);
      return response.custom({
        statusCode: error.statusCode || 500,
        body: error.message,
      })
    }
  }
  )
}