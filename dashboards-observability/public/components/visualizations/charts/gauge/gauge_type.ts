/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gauge } from './gauge';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createGaugeTypeDefinition = (params: any = {}) => ({
  name: 'Guage',
  type: 'indicator',
  id: 'guage',
  label: 'Guage',
  fullLabel: 'Guage',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  valueSeries: 'yaxis',
  editorConfig: {
    editor: null,
    schemas: [
      {
        name: 'Value',
        isSingleSelection: true,
        onChangeHandler: 'setXaxisSelections',
        component: null,
        mapTo: 'xaxis',
      },
      // {
      //   name: 'Guage',
      //   isSingleSelection: false,
      //   onChangeHandler: 'setYaxisSelections',
      //   component: null,
      //   mapTo: 'yaxis',
      // },
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
  component: Gauge,
});
