/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualizationChart } from './visualization_chart';
import { EmptyPlaceholder } from '../../components/explorer/visualizations/shared_components/empty_placeholder';

interface IVisualizationProps {}

export const Visualization = ({ visualizations }: IVisualizationProps) => {
  return (
    <>
      {visualizations?.data?.rawVizData?.size && visualizations?.vis?.visConfig ? (
        <VisualizationChart visualizations={visualizations} />
      ) : (
        <EmptyPlaceholder icon={visualizations.vis.icon} />
      )}
    </>
  );
};
