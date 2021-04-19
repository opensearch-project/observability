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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
  CoreSetup,
  CoreStart,
  ILegacyClusterClient,
  Logger,
  Plugin,
  PluginInitializerContext,
} from '../../../src/core/server';
import { OpenSearchNotebooksPlugin } from './adaptors/opensearch_notebooks_plugin';
import sqlPlugin from './clusters/sql/sqlPlugin';
import { serverRoute } from './routes';
import { NotebooksPluginSetup, NotebooksPluginStart } from './types';

export class NotebooksPlugin implements Plugin<NotebooksPluginSetup, NotebooksPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('opensearch_dashboards_notebooks: Setup');
    const router = core.http.createRouter();

    const openSearchNotebooksClient: ILegacyClusterClient = core.opensearch.legacy.createClient(
      'opensearch_notebooks',
      {
        plugins: [OpenSearchNotebooksPlugin, sqlPlugin],
      }
    );
    core.http.registerRouteHandlerContext('notebooks_plugin', (context, request) => {
      return {
        logger: this.logger,
        opensearchNotebooksClient: openSearchNotebooksClient,
      };
    });

    // Register server side APIs
    serverRoute(router, openSearchNotebooksClient);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('opensearch_dashboards_notebooks: Started');
    return {};
  }

  public stop() {}
}
