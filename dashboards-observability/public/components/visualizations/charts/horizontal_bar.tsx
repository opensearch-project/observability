/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { merge } from 'lodash';
import { Bar } from './bar/bar';

interface IBarTrace {
  xvalues: any[];
  yvalues: any[];
  mode: string;
  name: string;
}

export interface IStackedBarProps {
  name: string;
  barValues: IBarTrace[];
  layoutConfig?: any;
}

export const HorizontalBar = ({
  visualizations,
  layoutConfig = {},
  dispatch,
  customVizData,
}: any) => {
  // const horizontalBarLayoutConfig = merge(
  //   {
  //     yaxis: {
  //       automargin: true,
  //     },
  //   },
  //   layoutConfig
  // );

  return (
    <Bar
      visualizations={visualizations}
      orientation="h"
      layoutConfig={layoutConfig}
      dispatch={dispatch}
      customVizData={customVizData}
    />
  );
};
