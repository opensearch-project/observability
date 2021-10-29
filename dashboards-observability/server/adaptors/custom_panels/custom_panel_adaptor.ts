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

import { v4 as uuidv4 } from 'uuid';
import { PanelType, VisualizationType } from '../../../common/types/custom_panels';
import { ILegacyScopedClusterClient } from '../../../../../src/core/server';

export class CustomPanelsAdaptor {
  // index a panel
  indexPanel = async function (
    client: ILegacyScopedClusterClient,
    panelBody: PanelType
  ): Promise<{ objectId: string }> {
    try {
      const response = await client.callAsCurrentUser('observability.createObject', {
        body: {
          operationalPanel: panelBody,
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
    updatePanelBody: Partial<PanelType>
  ) {
    try {
      const response = await client.callAsCurrentUser('observability.updateObjectById', {
        objectId: panelId,
        body: {
          operationalPanel: updatePanelBody,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Update Panel Error:' + error);
    }
  };

  // fetch a panel by id
  getPanel = async function (client: ILegacyScopedClusterClient, panelId: string) {
    try {
      const response = await client.callAsCurrentUser('observability.getObjectById', {
        objectId: panelId,
      });
      return response.observabilityObjectList[0];
    } catch (error) {
      throw new Error('Get Panel Error:' + error);
    }
  };

  // gets list of panels stored in index
  viewPanelList = async function (client: ILegacyScopedClusterClient) {
    try {
      const response = await client.callAsCurrentUser('observability.getObject', {
        objectType: 'operationalPanel',
      });
      return response.observabilityObjectList.map((panel: any) => ({
        name: panel.operationalPanel.name,
        id: panel.objectId,
        dateCreated: panel.createdTimeMs,
        dateModified: panel.lastUpdatedTimeMs,
      }));
    } catch (error) {
      throw new Error('View Panel List Error:' + error);
    }
  };

  // Delete a panel by Id
  deletePanel = async function (client: ILegacyScopedClusterClient, panelId: string) {
    try {
      const response = await client.callAsCurrentUser('observability.deleteObjectById', {
        objectId: panelId,
      });
      return { status: 'OK', message: response };
    } catch (error) {
      throw new Error('Delete Panel Error:' + error);
    }
  };

  // Delete a panel by Id
  deletePanelList = async function (client: ILegacyScopedClusterClient, panelIdList: string) {
    try {
      const response = await client.callAsCurrentUser('observability.deleteObjectByIdList', {
        objectIdList: panelIdList,
      });
      return { status: 'OK', message: response };
    } catch (error) {
      throw new Error('Delete Panel List Error:' + error);
    }
  };

  // Create a new Panel
  createNewPanel = async (client: ILegacyScopedClusterClient, panelName: string) => {
    const panelBody = {
      name: panelName,
      visualizations: [],
      timeRange: {
        to: 'now',
        from: 'now-1d',
      },
      queryFilter: {
        query: '',
        language: 'ppl',
      },
    };

    try {
      const response = await this.indexPanel(client, panelBody);
      return response.objectId;
    } catch (error) {
      throw new Error('Create New Panel Error:' + error);
    }
  };

  // Rename an existing panel
  renamePanel = async (client: ILegacyScopedClusterClient, panelId: string, panelName: string) => {
    const updatePanelBody = {
      name: panelName,
    };
    try {
      const response = await this.updatePanel(client, panelId, updatePanelBody);
      return response.objectId;
    } catch (error) {
      throw new Error('Rename Panel Error:' + error);
    }
  };

  // Clone an existing panel
  clonePanel = async (client: ILegacyScopedClusterClient, panelId: string, panelName: string) => {
    const updatePanelBody = {
      name: panelName,
    };
    try {
      const getPanel = await this.getPanel(client, panelId);
      const clonePanelBody = {
        name: panelName,
        visualizations: getPanel.operationalPanel.visualizations,
        timeRange: getPanel.operationalPanel.timeRange,
        queryFilter: getPanel.operationalPanel.queryFilter,
      };
      const indexResponse = await this.indexPanel(client, clonePanelBody);
      const getClonedPanel = await this.getPanel(client, indexResponse.objectId);
      return {
        clonePanelId: getClonedPanel.objectId,
        dateCreated: getClonedPanel.createdTimeMs,
        dateModified: getClonedPanel.lastUpdatedTimeMs,
      };
    } catch (error) {
      throw new Error('Clone Panel Error:' + error);
    }
  };

  // Add filters to an existing panel
  addPanelFilter = async (
    client: ILegacyScopedClusterClient,
    panelId: string,
    query: string,
    language: string,
    to: string,
    from: string
  ) => {
    const updatePanelBody = {
      timeRange: {
        to: to,
        from: from,
      },
      queryFilter: {
        query: query,
        language: language,
      },
    };
    try {
      const response = await this.updatePanel(client, panelId, updatePanelBody);
      return response.objectId;
    } catch (error) {
      throw new Error('Add Panel Filter Error:' + error);
    }
  };

  // gets all saved visualizations
  getAllSavedVisualizations = async (client: ILegacyScopedClusterClient) => {
    try {
      const response = await client.callAsCurrentUser('observability.getObject', {
        objectType: 'savedVisualization',
      });
      return response.observabilityObjectList.map((visualization: any) => ({
        id: visualization.objectId,
        name: visualization.savedVisualization.name,
        query: visualization.savedVisualization.query,
        type: visualization.savedVisualization.type,
        timeField: visualization.savedVisualization.selected_timestamp.name,
      }));
    } catch (error) {
      throw new Error('View Saved Visualizations Error:' + error);
    }
  };

  // gets list of savedVisualizations by Id
  getSavedVisualizationById = async (
    client: ILegacyScopedClusterClient,
    savedVisualizationId: string
  ) => {
    try {
      const response = await client.callAsCurrentUser('observability.getObjectById', {
        objectId: savedVisualizationId,
      });
      const visualization = response.observabilityObjectList[0];
      return {
        id: visualization.objectId,
        name: visualization.savedVisualization.name,
        query: visualization.savedVisualization.query,
        type: visualization.savedVisualization.type,
        timeField: visualization.savedVisualization.selected_timestamp.name,
      };
    } catch (error) {
      throw new Error('Fetch Saved Visualizations By Id Error:' + error);
    }
  };

  //Get All Visualizations from a Panel
  //Add Visualization
  getVisualizations = async (client: ILegacyScopedClusterClient, panelId: string) => {
    try {
      const response = await client.callAsCurrentUser('observability.getObjectById', {
        objectId: panelId,
      });
      return response.observabilityObjectList[0].operationalPanel.visualizations;
    } catch (error) {
      throw new Error('Get Visualizations Error:' + error);
    }
  };

  // Calculate new visualization dimensions
  // New visualization always joins to the end of the panel
  getNewVizDimensions = (panelVisualizations: VisualizationType[]) => {
    let maxY: number = 0;
    let maxYH: number = 0;

    panelVisualizations.map((panelVisualization: VisualizationType) => {
      if (panelVisualization.y >= maxY) {
        maxY = panelVisualization.y;
        maxYH = panelVisualization.h;
      }
    });

    return { x: 0, y: maxY + maxYH, w: 6, h: 4 };
  };

  //Add Visualization in the  Panel
  addVisualization = async (
    client: ILegacyScopedClusterClient,
    panelId: string,
    savedVisualizationId: string,
    oldVisualizationId?: string
  ) => {
    try {
      const allPanelVisualizations = await this.getVisualizations(client, panelId);

      let newDimensions;
      let visualizationsList = <VisualizationType[]>[];
      if (oldVisualizationId === undefined) {
        newDimensions = this.getNewVizDimensions(allPanelVisualizations);
        visualizationsList = allPanelVisualizations;
      } else {
        allPanelVisualizations.map((visualization: VisualizationType) => {
          if (visualization.id != oldVisualizationId) {
            visualizationsList.push(visualization);
          } else {
            newDimensions = {
              x: visualization.x,
              y: visualization.y,
              w: visualization.w,
              h: visualization.h,
            };
          }
        });
      }
      const newPanelVisualizations = [
        ...visualizationsList,
        {
          id: 'panel_viz_' + uuidv4(),
          savedVisualizationId: savedVisualizationId,
          ...newDimensions,
        },
      ];
      const updatePanelResponse = await this.updatePanel(client, panelId, {
        visualizations: newPanelVisualizations,
      });
      return newPanelVisualizations;
    } catch (error) {
      throw new Error('Add/Replace Visualization Error:' + error);
    }
  };

  //Edits all Visualizations in the Panel
  editVisualization = async (
    client: ILegacyScopedClusterClient,
    panelId: string,
    visualizationParams: {
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
    }[]
  ) => {
    try {
      const allPanelVisualizations = await this.getVisualizations(client, panelId);
      let filteredPanelVisualizations = <Array<VisualizationType>>[];

      for (let i = 0; i < allPanelVisualizations.length; i++) {
        for (let j = 0; j < visualizationParams.length; j++) {
          if (allPanelVisualizations[i].id === visualizationParams[j].i) {
            filteredPanelVisualizations.push({
              ...allPanelVisualizations[i],
              x: visualizationParams[j].x,
              y: visualizationParams[j].y,
              w: visualizationParams[j].w,
              h: visualizationParams[j].h,
            });
          }
        }
      }
      const updatePanelResponse = await this.updatePanel(client, panelId, {
        visualizations: filteredPanelVisualizations,
      });
      return filteredPanelVisualizations;
    } catch (error) {
      throw new Error('Edit Visualizations Error:' + error);
    }
  };
}
