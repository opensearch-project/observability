/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface IVisualizationChart {}

export const VisualizationChart = ({ visualizations }: IVisualizationChart) => {
  const { vis } = visualizations;
  const { layout = {}, config = {} } = visualizations?.data?.userConfigs;
  const Visualization = visualizations?.vis?.component;

  const finalFigureConfig = useMemo(() => {
    return {
      ...vis.visConfig?.config,
      ...config,
    };
  }, [config, vis]);

  const finalFigureLayout = useMemo(() => {
    return {
      ...vis.visConfig?.layout,
      ...layout,
    };
  }, [layout, vis]);

  return (
    <Visualization
      visualizations={visualizations}
      layout={finalFigureLayout}
      config={finalFigureConfig}
    />
  );
};
