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
  DSL_SEARCH
} from '../../../common/index';

export function registerDslRoute({
  router,
  facet,
}: {
  router: IRouter
  facet: DSLFacet
}) {
  router.post({
    path: `${DSL_BASE}${DSL_SEARCH}`,
    validate: false
  },
  async (
    context,
    req,
    res
  ) => {
    console.log('before queryRes')
    const queryRes = await facet.describeQuery(req);
    const result: any = {
      body: JSON.stringify(queryRes['data'])
    };
    if (queryRes['success']) {
      return res.ok(result);
    }
    result['statusCode'] = 500;
    return res.custom(result);
  });
}