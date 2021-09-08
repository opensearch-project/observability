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
import { registerPplRoute } from './ppl';
import PPLFacet from '../services/facets/ppl_facet';
import {CustomPanelsRouter} from './custom_panels_router';
import { registerTraceAnalyticsDslRouter } from './trace_analytics_dsl_router';
import { registerParaRoute } from './notebooks/paraRouter';
import { registerNoteRoute } from './notebooks/noteRouter';
import { registerVizRoute } from './notebooks/vizRouter';
import QueryService from '../services/queryService';
import { registerSqlRoute } from './notebooks/sqlRouter';

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
  // TODO remove trace analytics route when DSL route for autocomplete is added
  registerTraceAnalyticsDslRouter(router);

  // notebooks routes
  registerParaRoute(router);
  registerNoteRoute(router);
  registerVizRoute(router);
  const queryService = new QueryService(client);
  registerSqlRoute(router, queryService);
};
