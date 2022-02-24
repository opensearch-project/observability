/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationListType, ApplicationType } from '../../../common/types/app_analytics';
import { ILegacyScopedClusterClient } from '../../../../../src/core/server';

export class AppAnalyticsAdaptor {
  // Fetch all existing applications
  fetchApps = async (client: ILegacyScopedClusterClient) => {
    try {
      const response = await client.callAsCurrentUser('observability.getObject', {
        objectType: 'application',
      });
      return response.observabilityObjectList.map((application: any) => ({
        name: application.application.name,
        id: application.objectId,
        panelId: application.application.panelId,
        dateModified: application.dateModified,
        dateCreated: application.dateCreated,
      }));
    } catch (err: any) {
      throw new Error('Fetch All Applications Error: ' + err);
    }
  };

  // Fetch application by id
  fetchAppById = async (client: ILegacyScopedClusterClient, appId: string) => {
    try {
      const response = await client.callAsCurrentUser('observability.getObjectById', {
        objectId: appId,
      });
      return response.observabilityObjectList[0];
    } catch (err: any) {
      throw new Error('Fetch Application By Id Error: ' + err);
    }
  };

  // Create a new application
  createNewApp = async (
    client: ILegacyScopedClusterClient,
    name: string,
    description: string,
    baseQuery: string,
    servicesEntities: string[],
    traceGroups: string[]
  ) => {
    const appBody = {
      name,
      description,
      baseQuery,
      servicesEntities,
      traceGroups,
    };

    try {
      const response = await client.callAsCurrentUser('observability.createObject', {
        body: {
          application: appBody,
        },
      });
      return response.objectId;
    } catch (err) {
      throw new Error('Create New Application Error: ' + err);
    }
  };

  // Rename an existing application
  renameApp = async (client: ILegacyScopedClusterClient, appId: string, name: string) => {
    const updateApplicationBody = {
      name,
    };
    try {
      const response = await client.callAsCurrentUser('observability.updateObjectById', {
        objectId: appId,
        body: {
          application: updateApplicationBody,
        },
      });
      return response.objectId;
    } catch (err: any) {
      throw new Error('Rename Application Error: ' + err);
    }
  };

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
      return response.objectId;
    } catch (err: any) {
      throw new Error('Update Panel Error: ' + err);
    }
  };

  // Delete existing applications
  deleteApp = async (client: ILegacyScopedClusterClient, appList: string) => {
    try {
      const response = await client.callAsCurrentUser('observability.deleteObjectByIdList', {
        objectIdList: appList,
      });
      return { status: 'OK', message: response };
    } catch (err: any) {
      throw new Error('Delete Application Error: ' + err);
    }
  };
}
