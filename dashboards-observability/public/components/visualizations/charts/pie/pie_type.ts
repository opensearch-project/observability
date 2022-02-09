/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pie } from './pie';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createPieTypeDefinition = (params: any) => ({
  name: 'pie',
  type: 'pie',
  id: 'pie',
  label: 'Pie',
  fullLabel: 'Pie',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  icon: LensIconChartPie,
  editorConfig: {
    editor: null,
    schemas: [
      {
        name: 'Label',
        onChangeHandler: 'setXaxisSelections',
        isSingleSelection: false,
        component: null,
        mapTo: 'xaxis',
      },
      {
        name: 'Value',
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
      ...{
        colorway: PLOTLY_COLOR,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        xaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
      },
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: Pie,
});
