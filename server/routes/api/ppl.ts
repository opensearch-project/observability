/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
