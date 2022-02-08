/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeatMap } from './heatmap';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createMapsVisDefinition = () => ({
  name: 'heatmap',
  type: 'heatmap',
  id: 'heatmap',
  label: 'Heatmap',
  fullLabel: 'Hubble',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartPie,
  editorConfig: {
    editor: null,
    schemas: [
      {
        name: 'X-axis',
        isSingleSelection: true,
        onChangeHandler: 'setXaxisSelections',
        component: null,
        mapTo: 'xaxis',
      },
      {
        name: 'Y-axis',
        isSingleSelection: false,
        onChangeHandler: 'setYaxisSelections',
        component: null,
        mapTo: 'yaxis',
      },
    ],
  },
  visConfig: {
    layout: {
      ...sharedConfigs.layout,
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: HeatMap,
});
