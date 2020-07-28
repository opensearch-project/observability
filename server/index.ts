import { PluginInitializerContext } from '../../../src/core/server';
import { TraceAnalyticsPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new TraceAnalyticsPlugin(initializerContext);
}

export { TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart } from './types';
