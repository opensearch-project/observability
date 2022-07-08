/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeatMap } from './heatmap';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigValueOptions,
  HeatmapColorPalettePicker,
  ConfigChartOptions,
  PanelItem,
  SingleColorPicker,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import {
  COLOR_PALETTES,
  HEATMAP_SINGLE_COLOR,
  HEATMAP_PALETTE_COLOR,
} from '../../../../../common/constants/colors';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createMapsVisDefinition = () => ({
  name: 'heatmap',
  type: 'heatmap',
  id: 'heatmap',
  label: 'Heatmap',
  fullLabel: 'Hubble',
  iconType: 'heatmap',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartPie,
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'chart_styles',
            name: 'Chart Styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Color Mode',
                component: PanelItem,
                mapTo: 'colorMode',
                eleType: 'list',
                isSingleSelection: true,
                options: [
                  { name: 'spectrum', label: 'spectrum', value: 'spectrum' },
                  { name: 'opacity', label: 'opacity', value: 'opacity' },
                ],
                defaultState: [{ name: 'spectrum', label: 'spectrum', value: 'spectrum' }],
                props: {
                  isClearable: false,
                },
              },
              {
                name: 'Scheme',
                component: HeatmapColorPalettePicker,
                mapTo: 'scheme',
                eleType: 'palettePicker',
                options: COLOR_PALETTES.filter((color) => color.type !== 'text'),
                defaultState: HEATMAP_PALETTE_COLOR,
              },
              {
                name: 'Color',
                component: SingleColorPicker,
                mapTo: 'color',
                eleType: 'singleColorPicker',
                defaultState: HEATMAP_SINGLE_COLOR,
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
      ...{
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        margin: { left: 60 },
      },
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: HeatMap,
});
