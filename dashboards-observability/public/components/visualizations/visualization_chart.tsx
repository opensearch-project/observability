/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plt } from './plotly/plot';

interface IVisualizationChart {}

export const VisualizationChart = ({ vis, visData, customVizConfigs }: IVisualizationChart) => {
  const Visualization = vis.chart;
  return <Visualization visualizations={visData} {...vis} customVizConfigs={customVizConfigs} />;
};
