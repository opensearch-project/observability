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
  Plugin,
  CoreSetup,
  CoreStart,
  AppMountParameters, 
  PluginInitializerContext,
  DEFAULT_APP_CATEGORIES
} from '../../../src/core/public';
import {
  ObservabilitySetup,
  ObservabilityStart
} from './types';
import {
  observabilityID,
  observabilityTitle,
  observabilityPluginOrder
} from '../common/index';

export class ObservabilityPlugin implements Plugin<ObservabilitySetup, ObservabilityStart> {
    
    constructor(initializerContext: PluginInitializerContext) {}

    public setup(core: CoreSetup): ObservabilitySetup {
      core.application.register({
        id: observabilityID,
        title: observabilityTitle,
        category: DEFAULT_APP_CATEGORIES.opensearchDashboards,
        order: observabilityPluginOrder,
        async mount(params: AppMountParameters) {
          const { Observability } = await import('./components/index');
          const [ coreStart ] = await core.getStartServices();
          return Observability(coreStart, params);
        },
      });

      // Return methods that should be available to other plugins
      return {};
    }
    public start(core: CoreStart): ObservabilityStart {
      return {};
    }
    public stop() {}
}