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

// import { schema } from '@osd/config-schema';
// import { RequestParams } from '@elastic/elasticsearch';
import { 
  IRouter,
  ILegacyClusterClient
 } from '../../../../src/core/server';
import { registerPplRoute } from './api/ppl';
import { registerDslRoute } from './api/dsl';
import PPLFacet from '../services/facets/pplFacet';
import DSLFacet from '../services/facets/dslFacet';

export function setupRoutes({
  router,
  client,
}: {
  router: IRouter
  client: ILegacyClusterClient
}) {
  const pplFacet = new PPLFacet(client);
  registerPplRoute({ router, facet: pplFacet });
  const dslFacet = new DSLFacet(client);
  registerDslRoute({ router, facet: dslFacet})
};
