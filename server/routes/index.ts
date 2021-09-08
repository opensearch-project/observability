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

import { IRouter, ILegacyClusterClient } from '../../../../src/core/server';
import { registerPplRoute } from './ppl';
import PPLFacet from '../services/facets/ppl_facet';
import { PanelsRouter } from './custom_panels/panels_router';
import { VisualizationsRouter } from './custom_panels/visualizations_router';

export function setupRoutes({ router, client }: { router: IRouter; client: ILegacyClusterClient }) {
  PanelsRouter(router);
  VisualizationsRouter(router);
  const pplFacet = new PPLFacet(client);
  registerPplRoute({ router, facet: pplFacet });
}
