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
import PPLService from './services/requests/ppl';
// import {
//   XYVisualization
// } from './services/visualizations'

export class ObservabilityPlugin implements Plugin<ObservabilitySetup, ObservabilityStart> {

    // private xyVisualization;
    
    constructor() {
      // this.xyVisualization = new XYVisualization();
    }

    public setup(core: CoreSetup): ObservabilitySetup {
      
      /** setup all services **/
      // Visualization setup
      // this.xyVisualization.setup();
      
      core.application.register({
        id: observabilityID,
        title: observabilityTitle,
        category: DEFAULT_APP_CATEGORIES.opensearchDashboards,
        order: observabilityPluginOrder,
        async mount(params: AppMountParameters) {
          const { Observability } = await import('./components/index');
          const [ coreStart ] = await core.getStartServices();
          const pplService = new PPLService(coreStart.http);
          console.log('pplService: ', pplService);
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