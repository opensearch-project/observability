/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ILegacyScopedClusterClient } from "../../../../../src/core/server";

export class AppAnalyticsAdaptor {

  // Create a new application
  createNewApp = async (
    client: ILegacyScopedClusterClient, 
    name: string, 
    description: string,
    baseQuery: string,
    servicesEntities: Array<string>, 
    traceGroups: Array<string>
  ) => {
    const appBody = {
      name: name, 
      description: description,
      baseQuery: baseQuery,
      servicesEntities: servicesEntities,
      traceGroups: traceGroups,
    };

    try {
      const response = await client.callAsCurrentUser('observability.createObject', {
        body: {
          application: appBody,
        }
      });
      return response.objectId;
    } catch (err) {
      throw new Error('Create New Application Error: ' + JSON.stringify(err));
    }
  }
}