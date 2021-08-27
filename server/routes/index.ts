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
  ILegacyClusterClient
 } from '../../../../src/core/server';
import { registerDslRoute } from './dsl';
import DSLFacet from '../services/facets/dslFacet';
import { registerPplRoute } from './ppl';
import PPLFacet from '../services/facets/ppl_facet';
import {CustomPanelsRouter} from './custom_panels_router';

export function setupRoutes({
  router,
  client,
}: {
  router: IRouter
  client: ILegacyClusterClient
}) {

  CustomPanelsRouter(router);
  const pplFacet = new PPLFacet(client);
  registerPplRoute({ router, facet: pplFacet });
  const dslFacet = new DSLFacet(client);
  registerDslRoute({ router, facet: dslFacet})
};
