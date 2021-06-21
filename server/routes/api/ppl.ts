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
import PPLFacet from '../../services/facets/pplFacet';
import {
  PPL_BASE,
  PPL_SEARCH
} from '../../../common/index';

export function registerPplRoute({
  router,
  facet,
}: {
  router: IRouter
  facet: PPLFacet
}) {
  router.post({
    path: `${PPL_BASE}${PPL_SEARCH}`,
    validate: { 
      body: schema.object({
        query: schema.string()
    })}
  }, 
  async (
    context,
    req,
    res
  ) => {
    const queryRes = await facet.describeQuery(req);
    const result: any = {
      body: queryRes['data']
    };
    if (queryRes['success']) {
      return res.ok(result);
    }
    result['statusCode'] = 500;
    return res.custom(result);
  });
}
