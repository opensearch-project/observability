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

import { NoteRouter } from './noteRouter';
import { ParaRouter } from './paraRouter';
import { vizRouter } from './vizRouter';
import { sqlRouter } from './sqlRouter';
import { ILegacyClusterClient, IRouter } from '../../../../src/core/server';
import QueryService from '../services/queryService';

export function serverRoute(router: IRouter, client: ILegacyClusterClient) {
  ParaRouter(router);
  NoteRouter(router);
  vizRouter(router);

  const queryService = new QueryService(client);
  sqlRouter(router, queryService);
}
