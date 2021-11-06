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

export const createDemoPanel = (savedVisualizationIds: string[]) => {
  return {
    name: 'Sample Panel',
    visualizations: [
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[0],
        x: 0,
        y: 0,
        w: 4,
        h: 3,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[1],
        x: 4,
        y: 0,
        w: 5,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[2],
        x: 4,
        y: 2,
        w: 8,
        h: 3,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[3],
        x: 0,
        y: 5,
        w: 12,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[4],
        x: 9,
        y: 0,
        w: 3,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[5],
        x: 0,
        y: 3,
        w: 4,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[6],
        x: 5,
        y: 7,
        w: 7,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[7],
        x: 0,
        y: 7,
        w: 5,
        h: 2,
      },
      {
        id: 'panel_viz_' + uuidv4(),
        savedVisualizationId: savedVisualizationIds[8],
        x: 0,
        y: 9,
        w: 12,
        h: 1,
      },
    ],
    timeRange: { to: 'now/y', from: 'now/y' },
    queryFilter: { query: '', language: 'ppl' },
  };
};
