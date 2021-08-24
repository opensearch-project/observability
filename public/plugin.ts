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
} from '../common/constants/shared';
import PPLService from './services/requests/ppl';

export class ObservabilityPlugin implements Plugin<ObservabilitySetup, ObservabilityStart> {

    public setup(core: CoreSetup): ObservabilitySetup {
      
      core.application.register({
        id: observabilityID,
        title: observabilityTitle,
        category: DEFAULT_APP_CATEGORIES.opensearchDashboards,
        order: observabilityPluginOrder,
        async mount(params: AppMountParameters) {
          const { Observability } = await import('./components/index');
          const [ coreStart ] = await core.getStartServices();
          const pplService = new PPLService(coreStart.http);
          return Observability(
            coreStart,
            params,
            pplService
          );
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