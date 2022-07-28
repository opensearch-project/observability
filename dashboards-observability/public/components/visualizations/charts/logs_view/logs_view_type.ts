/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogsView } from './logs_view';
import { getPlotlyCategory, getPlotlySharedConfigs } from '../shared/shared_configs';
import { LensIconChartDatatable } from '../../assets/chart_datatable';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { ConfigLogsView } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_logs_view';
import { ButtonGroupItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { ConfigSwitch } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_switch';
import { InputFieldItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';

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
        sections: [
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigLogsView,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Time',
                component: ConfigSwitch,
                mapTo: 'time',
                defaultState: true,
                eleType: 'switch',
              },
              {
                name: 'Log Details View',
                component: ConfigSwitch,
                mapTo: 'enableLogDetails',
                defaultState: true,
                eleType: 'switch',
              },
              {
                name: 'View',
                mapTo: 'view',
                component: ButtonGroupItem,
                props: {
                  options: [
                    { name: 'Default', id: 'default' },
                    { name: 'Wrap lines', id: 'wrapLines' },
                    { name: 'Prettify JSON', id: 'prettifyJSON' },
                  ],
                  defaultSelections: [{ name: 'Default', id: 'default' }],
                },
                eleType: 'buttons',
              },
              {
                name: 'Label Size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
            ],
          },
        ],
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
