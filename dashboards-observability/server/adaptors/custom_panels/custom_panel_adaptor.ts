/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { v4 as uuidv4 } from 'uuid';
import { CustomPanelListType, PanelType, VisualizationType } from '../../../common/types/custom_panels';
import { ILegacyScopedClusterClient } from '../../../../../src/core/server';
import { createDemoPanel } from '../../common/helpers/custom_panels/sample_panels';

interface boxType {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

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
        maxItems: 10000,
      });
      return response.observabilityObjectList
        .filter((panel: any) => !panel.operationalPanel.applicationId)
        .map((panel: any) => ({
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
  createNewPanel = async (client: ILegacyScopedClusterClient, panelName: string, appId?: string) => {
    var panelBody: PanelType = {
      name: panelName,
      visualizations: [],
      timeRange: {
        to: 'now',
        from: 'now-1d',
      },
      queryFilter: {
        query: '',
        language: 'ppl',
      }
    };
    if (appId) {
      panelBody.applicationId = appId;
    }

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

  calculatOverlapArea = (bb1: boxType, bb2: boxType) => {
    const x_left = Math.max(bb1.x1, bb2.x1);
    const y_top = Math.max(bb1.y1, bb2.y1);
    const x_right = Math.min(bb1.x2, bb2.x2);
    const y_bottom = Math.min(bb1.y2, bb2.y2);

    if (x_right < x_left || y_bottom < y_top) return 0;
    return (x_right - x_left) * (y_bottom - y_top);
  };

  getTotalOverlapArea = (panelVisualizations: VisualizationType[]) => {
    const newVizBox = { x1: 0, y1: 0, x2: 6, y2: 4 };
    const currentVizBoxes = panelVisualizations.map((visualization) => {
      return {
        x1: visualization.x,
        y1: visualization.y,
        x2: visualization.x + visualization.w,
        y2: visualization.y + visualization.h,
      };
    });

    let isOverlapping = 0;
    currentVizBoxes.map((viz) => {
      isOverlapping += this.calculatOverlapArea(viz, newVizBox);
    });
    return isOverlapping;
  };

  // We want to check if the new visualization being added, can be placed at { x: 0, y: 0, w: 6, h: 4 };
  // To check this we try to calculate overlap between all the current visualizations and new visualization
  // if there is no overalap (i.e Total Overlap Area is 0), we place the new viz. in default position
  // else, we add it to the bottom of the panel
  getNewVizDimensions = (panelVisualizations: VisualizationType[]) => {
    let maxY: number = 0;
    let maxYH: number = 0;

    // check if we can place the new visualization at default location
    if (this.getTotalOverlapArea(panelVisualizations) === 0) {
      return { x: 0, y: 0, w: 6, h: 4 };
    }

    // else place the new visualization at the bottom of the panel
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

  // Create Sample Panels
  addSamplePanels = async (client: ILegacyScopedClusterClient, savedVisualizationIds: string[]) => {
    try {
      const panelBody = createDemoPanel(savedVisualizationIds);
      const indexResponse = await this.indexPanel(client, panelBody);
      const fetchPanel = await this.getPanel(client, indexResponse.objectId);
      const fetchResponse = {
        name: fetchPanel.operationalPanel.name,
        id: fetchPanel.objectId,
        dateCreated: fetchPanel.createdTimeMs,
        dateModified: fetchPanel.lastUpdatedTimeMs,
      };
      return [fetchResponse];
    } catch (error) {
      throw new Error('Create New Panel Error:' + error);
    }
  };
}
