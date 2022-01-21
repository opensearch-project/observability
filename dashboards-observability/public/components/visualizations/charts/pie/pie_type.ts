/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pie } from './pie';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const pieVisDefinition = {
  name: 'pie',
  type: 'pie',
  subTypes: {
    pie: {
      id: 'pie',
      label: 'Pie',
      fullLabel: 'Pie',
      category: VIS_CATEGORY.BASICS,
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
  component: Pie,
};
