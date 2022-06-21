/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TreeMap } from './treemaps';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigValueOptions,
  ColorPalettePicker,
  ConfigChartOptions,
  ConfigTreemapParentFields,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DEFAULT_PALETTE, COLOR_PALETTES } from '../../../../../common/constants/colors';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createTreeMapDefinition = (params: BarTypeParams = {}) => ({
  name: 'tree_map',
  type: 'tree_map',
  id: 'tree_map',
  label: 'Tree Map',
  fullLabel: 'Tree Map',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  iconType: 'heatmap',
  icon: LensIconChartBar,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  orientation: 'v',
  component: TreeMap,
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
                name: 'Child Field',
                isSingleSelection: true,
                component: null,
                mapTo: 'childField',
              },
              {
                name: 'Value Field',
                isSingleSelection: true,
                component: null,
                mapTo: 'valueField',
              },
              {
                name: 'Parent Fields',
                component: ConfigTreemapParentFields,
                mapTo: 'parentFields',
                defaultState: [],
              },
            ],
          },
          {
            id: 'treemap_options',
            name: 'Treemap',
            editor: ConfigValueOptions,
            mapTo: 'treemapOptions',
            schemas: [
              {
                name: 'Tiling Algorithm',
                isSingleSelection: true,
                component: null,
                mapTo: 'tilingAlgorithm',
                options: [
                  { name: 'Squarify', value: 'squarify' },
                  { name: 'Binary', value: 'binary' },
                  { name: 'Dice', value: 'dice' },
                  { name: 'Slice', value: 'slice' },
                  { name: 'Slice Dice', value: 'slice-dice' },
                  { name: 'Dice Slice', value: 'dice-slice' },
                ],
                defaultState: [{ name: 'Squarify', label: 'Squarify', value: 'squarify' }],
                props: {
                  isClearable: false,
                },
              },
            ],
          },
          {
            id: 'chart_styles',
            name: 'Chart Styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Color Theme',
                isSingleSelection: true,
                component: ColorPalettePicker,
                mapTo: 'colorTheme',
                eleType: 'treemapColorPicker',
                options: COLOR_PALETTES,
                defaultState: { name: DEFAULT_PALETTE },
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
