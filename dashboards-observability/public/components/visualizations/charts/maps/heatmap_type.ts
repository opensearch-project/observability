/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeatMap } from './heatmap';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const mapsVisDefinition = {
  name: 'heatmap',
  type: 'heatmap',
  subTypes: {
    heatmap: {
      id: 'heatmap',
      label: 'Heatmap',
      fullLabel: 'Hubble',
      category: VIS_CATEGORY.MAPS,
      selection: {
        dataLoss: 'nothing',
      },
      icon: LensIconChartPie,
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
  component: HeatMap,
};
