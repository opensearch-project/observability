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

import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  observabilityID,
  observabilityPluginOrder,
  observabilityTitle,
} from '../common/constants/shared';
import PPLService from './services/requests/ppl';
import DSLService from './services/requests/dsl';
import TimestampUtils from './services/timestamp/timestamp';
import SavedObjects from './services/saved_objects/event_analytics/saved_objects';
import { AppPluginStartDependencies, ObservabilitySetup, ObservabilityStart } from './types';

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
          const [ coreStart, depsStart ] = await core.getStartServices();
          const pplService = new PPLService(coreStart.http);
          const dslService = new DSLService(coreStart.http);
          const savedObjects = new SavedObjects(coreStart.http);
          const timestampUtils = new TimestampUtils(dslService);
          return Observability(
            coreStart,
            depsStart as AppPluginStartDependencies,
            params,
            pplService,
            dslService,
            savedObjects,
            timestampUtils
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
