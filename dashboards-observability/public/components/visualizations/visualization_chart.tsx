/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, merge, isEmpty } from 'lodash';

interface IVisualizationChart {}

export const VisualizationChart = ({ visualizations }: IVisualizationChart) => {
  const { data, vis } = visualizations;
  const {
    metadata: { fields },
  } = visualizations?.data?.rawVizData;
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
