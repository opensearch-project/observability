/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bubble } from './bubble';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const bubbleVisDefinition = {
  name: 'bubble',
  type: 'bubble',
  subTypes: {
    bubble: {
      id: 'bubble',
      label: 'Bubble',
      fullLabel: 'Bubble',
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
  component: Bubble,
};
