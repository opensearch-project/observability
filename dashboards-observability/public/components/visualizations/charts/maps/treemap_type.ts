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
  ConfigLegend,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DEFAULT_PALETTE, COLOR_PALETTES } from '../../../../../common/constants/colors';
import { ButtonGroupItem } from '../../../../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { DefaultChartStyles } from '../../../../../common/constants/shared';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { SortSectors } = DefaultChartStyles;

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
            id: 'legend',
            name: 'Legend',
            editor: ConfigLegend,
            mapTo: 'legend',
            schemas: [
              {
                name: 'Show colorscale',
                mapTo: 'showLegend',
                component: null,
                props: {
                  options: [
                    { name: 'Show', id: 'show' },
                    { name: 'Hidden', id: 'hidden' },
                  ],
                  defaultSelections: [{ name: 'Show', id: 'show' }],
                },
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
                name: 'Tiling algorithm',
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
              {
                name: 'Sort Sectors',
                component: ButtonGroupItem,
                mapTo: 'sort_sectors',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Largest to Smallest', id: 'largest_to_smallest' },
                    { name: 'Random', id: 'random' },
                  ],
                  defaultSelections: [{ name: 'Largest to Smallest', id: SortSectors }],
                },
              },
            ],
          },
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Color theme',
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
