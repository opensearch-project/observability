import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart } from './types';
import { defineRoutes } from './routes';

export class TraceAnalyticsPlugin
  implements Plugin<TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('trace_analytics: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('trace_analytics: Started');
    return {};
  }

  public stop() {}
}
