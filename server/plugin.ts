import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  ILegacyClusterClient,
} from '../../../src/core/server';

import { TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart } from './types';
import { defineRoutes } from './routes';
import sqlPlugin from './clusters/sql/sqlPlugin';
import { SQL_CLUSTER } from './utils/constants';

export class TraceAnalyticsPlugin
  implements Plugin<TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('trace_analytics: Setup');
    const router = core.http.createRouter();

    const sqlClient: ILegacyClusterClient = core.elasticsearch.legacy.createClient(SQL_CLUSTER, {
      plugins: [sqlPlugin],
    });

    // Register server side APIs
    defineRoutes(router, sqlClient);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('trace_analytics: Started');
    return {};
  }

  public stop() {}
}
