/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty } from 'lodash';
import { VisualizationChart } from './visualization_chart';
import { VisCanvassPlaceholder } from '../event_analytics/explorer/visualizations/shared_components';

interface IVisualizationProps {}

export const Visualization = ({ visualizations }: IVisualizationProps) => {
  return (
    <>
      {!isEmpty(visualizations?.data?.rawVizData?.data) ? (
        <VisualizationChart visualizations={visualizations} />
      ) : (
        <VisCanvassPlaceholder message={'No data found'} icon={visualizations?.vis?.icontype} />
      )}
    </>
  );
};
