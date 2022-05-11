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
  ConfigValueOptions,
  ConfigThresholds,
  ConfigGaugeValueOptions,
} from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

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
            id: 'value_options',
            name: 'Value options',
            editor: ConfigGaugeValueOptions,
            mapTo: 'valueOptions',
            schemas: [
              {
                name: 'Series',
                isSingleSelection: true,
                onChangeHandler: 'setXaxisSelections',
                component: null,
                mapTo: 'series',
              },
              {
                name: 'Value',
                isSingleSelection: false,
                onChangeHandler: 'setYaxisSelections',
                component: null,
                mapTo: 'value',
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
