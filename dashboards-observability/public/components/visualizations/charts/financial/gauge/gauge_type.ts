/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gauge } from './gauge';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../../shared/shared_configs';
import { LensIconChartLine } from '../../../assets/chart_line';
import { VizDataPanel } from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigThresholds,
  InputFieldItem,
  SwitchButton,
  ConfigChartOptions,
  ButtonGroupItem,
} from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DefaultChartStyles } from '../../../../../../common/constants/shared';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const { ThresholdsMaxLimit } = DefaultChartStyles;

export const createGaugeTypeDefinition = (params: any = {}) => ({
  name: 'Gauge',
  type: 'indicator',
  id: 'gauge',
  label: 'Gauge',
  fullLabel: 'Gauge',
  iconType: 'visGauge',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  valueSeries: 'yaxis',
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'chart-styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Orientation',
                component: ButtonGroupItem,
                mapTo: 'orientation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Auto', id: 'auto' },
                    { name: 'Vertical', id: 'v' },
                    { name: 'Horizontal', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Auto', id: 'auto' }],
                },
              },
              {
                title: 'Title Size',
                name: 'Title Size',
                component: InputFieldItem,
                mapTo: 'titleSize',
                eleType: 'input',
              },
              {
                title: 'Value Size',
                name: 'Value Size',
                component: InputFieldItem,
                mapTo: 'valueSize',
                eleType: 'input',
              },
              {
                title: 'Show threshold labels',
                name: 'Show threshold labels',
                component: SwitchButton,
                mapTo: 'showThresholdLabels',
                eleType: 'switchButton',
                currentValue: false,
              },
              {
                title: 'Show threshold markers',
                name: 'Show threshold markers',
                component: SwitchButton,
                mapTo: 'showThresholdMarkers',
                eleType: 'switchButton',
                currentValue: true,
              },
            ],
          },
          {
            id: 'thresholds',
            name: 'Thresholds',
            editor: ConfigThresholds,
            mapTo: 'thresholds',
            defaultState: [],
            schemas: [],
            props: {
              maxLimit: ThresholdsMaxLimit,
            },
          },
        ],
      },
      {
        id: 'style-panel',
        name: 'Layout',
        mapTo: 'layoutConfig',
        editor: ConfigEditor,
        content: [],
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
  component: Gauge,
});
