/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Text } from './text';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigText } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createTextTypeDefinition = (params: any = {}) => ({
  name: 'text',
  type: 'text',
  id: 'text',
  label: 'Markdown',
  fulllabel: 'Markdown',
  icontype: 'visText',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  editorconfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Style',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'text_editor',
            name: 'Text',
            editor: ConfigText,
            mapTo: 'text',
            schemas: [],
          },
        ],
      },
    ],
  },
  visconfig: {
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
      ...{
        barmode: 'line',
        xaxis: {
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
      },
    },
  },
  component: Text,
});
