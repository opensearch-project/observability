/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createBarTypeDefinition = (params: BarTypeParams = {}) => ({
  name: 'bar',
  type: 'bar',
  id: 'bar',
  label: 'Bar',
  fullLabel: 'Bar',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  orientation: 'v',
  component: Bar,
  editorConfig: {
    editor: null,
    schemas: [
      {
        name: 'Type',
        isSingleSelection: true,
        component: null,
        options: ['bar', 'group'],
        mapTo: 'selectedVisType',
      },
      {
        name: 'X-axis',
        isSingleSelection: true,
        component: null,
        mapTo: 'xaxis',
      },
      {
        name: 'Y-axis',
        isSingleSelection: false,
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
    isUniColor: false,
  },
});
