/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationType } from "common/constants/application_analytics";
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
      throw new Error('Create New Application Error: ' + err);
    }
  }

  // Rename an existing application
  renameApp = async (
    client: ILegacyScopedClusterClient,
    appId: string,
    name: string, 
  ) => {
    const updateApplicationBody = {
      name: name,
    };
    try { 
      const response = await this.updateApp(client, appId, updateApplicationBody);
      return response.objectId;
    } catch (err: any) {
      throw new Error('Rename Application Error: ' + err);
    }
  }

  // Update an existing application
  updateApp = async (
    client: ILegacyScopedClusterClient, 
    appId: string, 
    updateAppBody: Partial<ApplicationType>
  ) => {
    try {
      const response = await client.callAsCurrentUser('observability.updateObjectById', {
        objectId: appId,
        body: {
          application: updateAppBody,
        },
      });
      return response;
    } catch (err: any) {
      throw new Error('Update Panel Error: ' + err)
    }
  }
}