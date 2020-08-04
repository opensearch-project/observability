import { i18n } from '@kbn/i18n';
import {
  AppMountParameters,
  CoreSetup,
  CoreStart,
  Plugin,
  DEFAULT_APP_CATEGORIES,
} from '../../../src/core/public';
import {
  TraceAnalyticsPluginSetup,
  TraceAnalyticsPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME, PLUGIN_ID } from '../common';

export class TraceAnalyticsPlugin
  implements Plugin<TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart> {
  public setup(core: CoreSetup): TraceAnalyticsPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: PLUGIN_ID,
      title: PLUGIN_NAME,
      category: DEFAULT_APP_CATEGORIES.kibana,
      order: 8040,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public start(core: CoreStart): TraceAnalyticsPluginStart {
    return {};
  }

  public stop() {}
}
