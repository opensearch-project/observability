/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogsView } from './logs_view';
import { getPlotlyCategory, getPlotlySharedConfigs } from '../shared/shared_configs';
import { LensIconChartDatatable } from '../../assets/chart_datatable';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createLogsViewTypeDefinition = (params: any = {}) => ({
  name: 'logs_view',
  type: 'logs_view',
  id: 'logs_view',
  label: 'Logs View',
  fullLabel: 'Logs View',
  iconType: 'visTable',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartDatatable,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Style',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [],
      },
    ],
  },
  visConfig: {
    layout: {
      ...sharedConfigs.layout,
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
    config: {
      ...sharedConfigs.config,
      barmode: 'line',
      xaxis: {
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
    },
  },
  component: LogsView,
});
