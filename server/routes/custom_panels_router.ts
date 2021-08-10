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

import { schema } from '@osd/config-schema';
import {
  IRouter,
  IOpenSearchDashboardsResponse,
  ResponseError,
  IScopedClusterClient,
} from '../../../../src/core/server';
import {CUSTOM_PANELS_API_PREFIX as API_PREFIX} from '../../common/constants/custom_panels'

export function CustomPanelsRouter(router: IRouter) {
  
  // NOTE: Currently the API calls are dummy and are not connected to esclient.
  // Fetch all the custom panels available
  router.get(
    {
      path: `${API_PREFIX}/`,
      validate: {},
    },
    async (context, request, response): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const panelsList = [{
          "name": "Dummy Panel 1",
          "id": "2FG6FWGY5",
          "dateCreated": "2021-07-19T21:01:14.871Z",
          "dateModified": "2021-07-19T21:01:14.871Z",
      }];
      try {
        return response.ok({
          body: {
            panels: panelsList,
          },
        });
      } catch (error) {
        console.log('Issue in fetching panels:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}