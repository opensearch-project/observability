/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
  ObservabilityStart,
  AppPluginStartDependencies
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
          const [coreStart, depsStart] = await core.getStartServices();
          return Observability(coreStart, depsStart as AppPluginStartDependencies, params);
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