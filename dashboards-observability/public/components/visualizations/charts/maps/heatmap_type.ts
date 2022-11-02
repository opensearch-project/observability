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
  ConfigLegend,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import {
  COLOR_PALETTES,
  HEATMAP_SINGLE_COLOR,
  HEATMAP_PALETTE_COLOR,
} from '../../../../../common/constants/colors';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createMapsVisDefinition = () => ({
  name: 'heatmap',
  type: 'heatmap',
  id: 'heatmap',
  label: 'Heatmap',
  fulllabel: 'Hubble',
  icontype: 'heatmap',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartPie,
  editorconfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Style',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          fetchConfigObject('Tooltip', {
            options: [
              { name: 'All', id: 'all' },
              { name: 'Dim 1', id: 'x' },
              { name: 'Dim 2', id: 'y' },
              { name: 'Metrics', id: 'z' },
            ],
            defaultSelections: [{ name: 'All', id: 'all' }],
          }),
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
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Color mode',
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
    ],
  },
  visconfig: {
    layout: {
      ...sharedConfigs.layout,
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      margin: { left: 60 },
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: HeatMap,
});
