/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CandleStick } from './candle_stick';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../../shared/shared_configs';
import { LensIconChartBar } from '../../../assets/chart_bar';
import { VizDataPanel } from '../../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../../explorer/visualizations/config_panel/config_editor/config_editor';
import { ConfigValueOptions } from '../../../../explorer/visualizations/config_panel/config_editor/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createCandleStickDefinition = (params: BarTypeParams = {}) => ({
  name: 'candle_stick',
  type: 'candle_stick',
  id: 'candle_stick',
  label: 'Candle Stick',
  fullLabel: 'Candle Stick',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  orientation: 'v',
  component: CandleStick,
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
            editor: ConfigValueOptions,
            mapTo: 'valueOptions',
            schemas: [
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
    isUniColor: false,
  },
});
