/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Line } from './line';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const lineVisDefinition = {
  name: 'line',
  type: 'line',
  subTypes: {
    line: {
      id: 'line',
      label: 'Line',
      fullLabel: 'Line',
      category: VIS_CATEGORY.BASICS,
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
  component: Line,
};
