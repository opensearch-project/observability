/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pie } from './pie';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ColorPalettePicker,
  ConfigChartOptions,
  ConfigValueOptions,
  ConfigLegend,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DEFAULT_PALETTE, PIE_PALETTES } from '../../../../../common/constants/colors';


const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createPieTypeDefinition = (params: any) => ({
  name: 'pie',
  type: 'pie',
  id: 'pie',
  label: 'Pie',
  fullLabel: 'Pie',
  iconType: 'visPie',
  category: VIS_CATEGORY.BASICS,
  showLegend: true,
  legendPosition: 'v',
  selection: {
    dataLoss: 'nothing',
  },
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
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
            id: 'value_options',
            name: 'Value options',
            editor: ConfigValueOptions,
            mapTo: 'valueOptions',
            schemas: [
              {
                name: 'Label',
                onChangeHandler: 'setXaxisSelections',
                isSingleSelection: false,
                component: null,
                mapTo: 'xaxis',
              },
              {
                name: 'Value',
                onChangeHandler: 'setYaxisSelections',
                isSingleSelection: false,
                component: null,
                mapTo: 'yaxis',
              },
            ],
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
                    { name: 'Show', id: "show" },
                    { name: 'Hidden', id: "hidden" },
                  ],
                  defaultSelections: [{ name: 'Show', id: "show" }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Right', id: 'v' },
                    { name: 'Bottom', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', id: 'v' }],
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
                name: 'Mode',
                isSingleSelection: true,
                component: null,
                mapTo: 'mode',
                props: {
                  dropdownList: [
                    { name: 'Pie', modeId: 'pie' },
                    { name: 'Donut', modeId: 'donut' },
                  ],
                  defaultSelections: [{ name: 'Pie', modeId: 'pie' }],
                },
              },
              {
                name: 'Color Theme',
                isSingleSelection: true,
                component: ColorPalettePicker,
                mapTo: 'colorTheme',
                eleType: 'colorpicker',
                options: PIE_PALETTES,
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
      ...{
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
    },
    config: {
      ...sharedConfigs.config,
    },
  },
  component: Pie,
});
