/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { ObservabilityPluginSetup, ObservabilityPluginStart } from './types';
import { setupRoutes } from './routes/index';
import { Client } from '@elastic/elasticsearch';

export class ObservabilityPlugin implements Plugin<ObservabilityPluginSetup, ObservabilityPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('Observability: Setup');
    const router = core.http.createRouter();

    const client = new Client({ 
      node: 'http://localhost:9200'
    });
    client.extend('pplSearch', ({ makeRequest, ConfigurationError }) => {
      return function pplSearch (params: any, options: any) {
        const { 
          body, 
          index,
          plugin,
          ...querystring
        } = params;

        if (body == null) throw new ConfigurationError('Missing body');
        if (index == null) throw new ConfigurationError('Missing index');
        
        const requestParams = {
          method: 'POST',
          path: `/${index}/${plugin}`,
          body: body,
          ...querystring
        };

        return makeRequest(requestParams, options);
      }
    });

    // Register server side APIs
    setupRoutes({ router, client });

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('Observability: Started');
    return {};
  }

  public stop() {}
}
