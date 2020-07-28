import './index.scss';

import { TraceAnalyticsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new TraceAnalyticsPlugin();
}
export { TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart } from './types';
