/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  ILegacyClusterClient,
} from '../../../src/core/server';

import { TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart } from './types';
import { defineRoutes } from './routes';
import sqlPlugin from './clusters/sql/sqlPlugin';
import { SQL_CLUSTER } from './utils/constants';

export class TraceAnalyticsPlugin
  implements Plugin<TraceAnalyticsPluginSetup, TraceAnalyticsPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('trace_analytics: Setup');
    const router = core.http.createRouter();

    // const sqlClient: ILegacyClusterClient = core.opensearch.legacy.createClient(SQL_CLUSTER, {
    //   plugins: [sqlPlugin],
    // });

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('trace_analytics: Started');
    return {};
  }

  public stop() {}
}
