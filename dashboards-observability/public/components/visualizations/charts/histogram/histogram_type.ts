/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Histogram } from './histogram';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const histogramVisDefinition = {
  name: 'histogram',
  type: 'histogram',
  subTypes: {
    histogram: {
      id: 'histogram',
      label: 'Histogram',
      fullLabel: 'Histogram',
      category: VIS_CATEGORY.STATISTIC,
      selection: {
        dataLoss: 'nothing',
      },
      icon: LensIconChartLine,
    },
  },
  defaults: {
    layout: {
      ...sharedConfigs.layout,
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: Histogram,
};
