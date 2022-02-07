/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Histogram } from './histogram';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createHistogramVisDefinition = (params = {}) => ({
  name: 'histogram',
  type: 'histogram',
  id: 'histogram',
  label: 'Histogram',
  fullLabel: 'Histogram',
  category: VIS_CATEGORY.STATISTIC,
  selection: {
    dataLoss: 'nothing',
  },
  valueSeries: 'yaxis',
  icon: LensIconChartLine,
  editorConfig: {
    editor: null,
    schemas: [
      {
        name: 'X-axis',
        onChangeHandler: 'setXaxisSelections',
        isSingleSelection: false,
        component: null,
        mapTo: 'xaxis',
      },
      {
        name: 'Y-axis',
        onChangeHandler: 'setYaxisSelections',
        isSingleSelection: true,
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
  component: Histogram,
});
