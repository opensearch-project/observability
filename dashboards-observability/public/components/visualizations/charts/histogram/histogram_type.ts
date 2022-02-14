/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Histogram } from './histogram';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { VizDataPanel } from '../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../explorer/visualizations/config_panel/config_editor/config_editor';
import { ConfigValueOptions } from '../../../explorer/visualizations/config_panel/config_editor/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createHistogramVisDefinition = (params = {}) => ({
  name: 'histogram',
  type: 'histogram',
  id: 'histogram',
  label: 'Histogram',
  fullLabel: 'Histogram',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  valueSeries: 'yaxis',
  icon: LensIconChartLine,
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
  },
  component: Histogram,
});
