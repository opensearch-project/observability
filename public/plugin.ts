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
  AppMountParameters
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
import DSLService from './services/requests/dsl';

export class ObservabilityPlugin implements Plugin<ObservabilitySetup, ObservabilityStart> {

    public setup(core: CoreSetup): ObservabilitySetup {
      
      core.application.register({
        id: observabilityID,
        title: observabilityTitle,
        category: {
          id: 'opensearch',
          label: 'OpenSearch Plugins',
          order: 2000,
        },
        order: observabilityPluginOrder,
        async mount(params: AppMountParameters) {
          const { Observability } = await import('./components/index');
          const [ coreStart ] = await core.getStartServices();
          const pplService = new PPLService(coreStart.http);
          const dslService = new DSLService(coreStart.http);
          return Observability(
            coreStart,
            params,
            pplService,
            dslService
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