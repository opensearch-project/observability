/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRouter, ILegacyClusterClient } from '../../../../src/core/server';
import { registerPplRoute } from './ppl';
import PPLFacet from '../services/facets/ppl_facet';
import { registerDslRoute } from './dsl';
import DSLFacet from '../services/facets/dsl_facet';
import SavedObjectFacet from '../services/facets/saved_objects';
import { PanelsRouter } from './custom_panels/panels_router';
import { VisualizationsRouter } from './custom_panels/visualizations_router';
import { registerTraceAnalyticsDslRouter } from './trace_analytics_dsl_router';
import { registerParaRoute } from './notebooks/paraRouter';
import { registerNoteRoute } from './notebooks/noteRouter';
import { registerVizRoute } from './notebooks/vizRouter';
import QueryService from '../services/queryService';
import { registerSqlRoute } from './notebooks/sqlRouter';
import { registerEventAnalyticsRouter } from './event_analytics/event_analytics_router';


export function setupRoutes({ router, client }: { router: IRouter; client: ILegacyClusterClient }) {
  PanelsRouter(router);
  VisualizationsRouter(router);
  registerPplRoute({ router, facet: new PPLFacet(client) });
  registerDslRoute({ router, facet: new DSLFacet(client)});
  registerEventAnalyticsRouter({ router, savedObjectFacet: new SavedObjectFacet(client) });
  
  // TODO remove trace analytics route when DSL route for autocomplete is added
  registerTraceAnalyticsDslRouter(router);

  // notebooks routes
  registerParaRoute(router);
  registerNoteRoute(router);
  registerVizRoute(router);
  const queryService = new QueryService(client);
  registerSqlRoute(router, queryService);
};
