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
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  ILegacyClusterClient,
} from '../../../src/core/server';

import { ObservabilityPluginSetup, ObservabilityPluginStart } from './types';
import { setupRoutes } from './routes/index';
import { PPLPlugin } from './adaptors/ppl_plugin';
import { OpenSearchObservabilityPlugin } from './adaptors/opensearch_observability_plugin';

export class ObservabilityPlugin implements Plugin<ObservabilityPluginSetup, ObservabilityPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('Observability: Setup');
    const router = core.http.createRouter();
    const observabilityClient: ILegacyClusterClient = core.opensearch.legacy.createClient(
      'opensearch_observability', 
      {
        'plugins': [PPLPlugin]
      }
    );

    core.http.registerRouteHandlerContext('observability_plugin', (context, request) => {
      return {
        logger: this.logger,
        observabilityClient: OpenSearchObservabilityPlugin,
      };
    });

    // Register server side APIs
    setupRoutes({ router, client: observabilityClient });

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('Observability: Started');
    return {};
  }

  public stop() {}
}
