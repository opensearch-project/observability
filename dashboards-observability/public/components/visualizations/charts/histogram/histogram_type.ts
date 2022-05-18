/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Histogram } from './histogram';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigChartOptions,
  ConfigLegend,
  SliderConfig,
  ConfigColorTheme,
  ConfigInputField,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DefaultChartStyles } from '../../../../../common/constants/shared';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const { LineWidth, FillOpacity } = DefaultChartStyles;

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
  iconType: 'visArea',
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
                name: 'Bucket Size',
                component: ConfigInputField,
                mapTo: 'bucketSize',
                eleType: 'input',
              },
              {
                name: 'Bucket Offset',
                component: ConfigInputField,
                mapTo: 'bucketOffset',
                eleType: 'input',
              },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: LineWidth,
                max: 10,
                eleType: 'slider',
              },
              {
                name: 'Fill Opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
                max: 100,
                eleType: 'slider',
              },
            ],
          },
          {
            id: 'color-theme',
            name: 'Color Theme',
            editor: ConfigColorTheme,
            mapTo: 'colorTheme',
            schemas: [],
          },
          {
            id: 'legend',
            name: 'Legend',
            editor: ConfigLegend,
            mapTo: 'legend',
            schemas: [
              {
                name: 'Show Legend',
                mapTo: 'showLegend',
                component: null,
                props: {
                  options: [
                    { name: 'Show', modeId: 'show' },
                    { name: 'Hidden', modeId: 'hidden' },
                  ],
                  defaultSelections: [{ name: 'Show', modeId: 'show' }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Right', modeId: 'v' },
                    { name: 'Bottom', modeId: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', modeId: 'v' }],
                },
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
