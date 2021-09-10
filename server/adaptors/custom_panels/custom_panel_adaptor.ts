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

import { PanelType } from '../../../common/constants/custom_panels';
import { ILegacyScopedClusterClient } from '../../../../../src/core/server';

// NOTE: Need to add more functions for using panel APIs 
export class CustomPanelsAdaptor {
  // index a panel
  indexPanel = async function (
    client: ILegacyScopedClusterClient,
    body: any
  ): Promise<{ panelId: string }> {
    try {
      const response = await client.callAsCurrentUser('observability.createPanel', {
        body: {
          panel: body,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Index Panel Error:' + error);
    }
  };

  //update a panel
  updatePanel = async function (
    client: ILegacyScopedClusterClient,
    panelId: string,
    updateBody: Partial<PanelType>
  ) {
    try {
      const response = await client.callAsCurrentUser('observability.updatePanelById', {
        panelId: panelId,
        body: {
          panel: updateBody,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Update Panel Error:' + error);
    }
  };

  //fetch a panel by id
  getPanel = async function (client: ILegacyScopedClusterClient, panelId: string) {
    try {
      const response = await client.callAsCurrentUser('observability.getPanelById', {
        panelId: panelId,
      });
      return response.panelDetails;
    } catch (error) {
      throw new Error('Get Panel Error:' + error);
    }
  };

  // gets list of panels stored in index
  viewPanels = async function (client: ILegacyScopedClusterClient) {
    try {
      const response = await client.callAsCurrentUser('observability.getPanels');
      return response.panelsDetailsList.map((panel) => ({
        path: panel.panel.name,
        id: panel.id,
        dateCreated: panel.panel.dateCreated,
        dateModified: panel.panel.dateModified,
      }));
    } catch (error) {
      if (error.body.error.type === 'index_not_found_exception') {
        return [];
      } else throw new Error('View Panels Error:' + error);
    }
  };

  // Delete a panel by Id
  deleteNote = async function (client: ILegacyScopedClusterClient, panelId: string) {
    try {
      const response = await client.callAsCurrentUser('observability.deletePanelById', {
        panelId: panelId,
      });
      return { status: 'OK', message: response };
    } catch (error) {
      throw new Error('Delete Panel Error:' + error);
    }
  };
}
