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

import React from 'react';
import { merge } from 'lodash';
import { Bar } from './bar';

interface IBarTrace {
  xvalues: Array<any>;
  yvalues: Array<any>;
  mode: string;
  name: string;
}

export interface IStackedBarProps {
  name: string;
  barValues: Array<IBarTrace>;
  layoutConfig?: any;
}

export const HorizontalBar = ({ visualizations, horizontalConfig, layoutConfig = {} }: any) => {
  const horizontalBarConfig = merge(
    {
      orientation: 'h',
    },
    horizontalConfig
  );

  const horizontalBarLayoutConfig = merge(
    {
      yaxis: {
        automargin: true,
      },
    },
    layoutConfig
  );

  return (
    <Bar
      visualizations={visualizations}
      barConfig={horizontalBarConfig}
      layoutConfig={horizontalBarLayoutConfig}
    />
  );
};
