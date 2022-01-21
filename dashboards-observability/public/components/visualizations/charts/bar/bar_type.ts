/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { LensIconChartBarHorizontal } from '../../../visualizations/assets/chart_bar_horizontal';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const barVisDefinition = {
  name: 'bar',
  type: 'bar',
  subTypes: {
    bar: {
      id: 'bar',
      label: 'Bar',
      fullLabel: 'Bar',
      selection: {
        dataLoss: 'nothing',
      },
      category: VIS_CATEGORY.BASICS,
      icon: LensIconChartBar,
      orientation: 'v',
    },
    horizontal_bar: {
      id: 'horizontal_bar',
      label: 'H. Bar',
      fullLabel: 'H. Bar',
      selection: {
        dataLoss: 'nothing',
      },
      category: VIS_CATEGORY.BASICS,
      icon: LensIconChartBarHorizontal,
      orientation: 'h',
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
  component: Bar,
};
