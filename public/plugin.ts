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
  IUiSettingsClient, 
  HttpSetup, 
  AppMountParameters, 
  PluginInitializerContext,
  DEFAULT_APP_CATEGORIES
} from '../../../src/core/public';
import {
  DiscoverSetup,
  DiscoverStart,
  DiscoverSetupPlugins,
  DiscoverStartPlugins
} from '../../../src/plugins/discover/public/plugin';
import { AppPluginStartDependencies } from './types';

export interface ObservabilityDependencies extends Partial<CoreStart> {
    uiSettings: IUiSettingsClient;
    http: HttpSetup;
}

export class ObservabilityPlugin implements Plugin<DiscoverSetup, DiscoverStart, DiscoverSetupPlugins, DiscoverStartPlugins> {
    
    constructor(initializerContext: PluginInitializerContext) {}

    public setup(core: CoreSetup<DiscoverStartPlugins, DiscoverStart>, plugins: DiscoverSetupPlugins) {
      console.log('DiscoverSetupPlugins: ', plugins);
      core.application.register({
        id: 'opensearchObservability',
        title: 'Observability',
        category: DEFAULT_APP_CATEGORIES.opensearchDashboards,
        order: 500,
        async mount(params: AppMountParameters) {
          const { Observability } = await import('./components/index');
          const [coreStart, depsStart] = await core.getStartServices();
          // const plugins = await this.getPlugin();
          return Observability(coreStart, params);
        },
      });
    }
    public start(core: CoreStart, plugins: DiscoverStartPlugins) {}
    public stop() {}
}

// export type CustomObservabilitySetup = ReturnType<ObservabilityPlugin['setup']>;
// export type CustomObservabilityStart = ReturnType<ObservabilityPlugin['start']>;