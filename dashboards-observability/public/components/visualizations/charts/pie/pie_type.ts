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
  ConfigLegend,
  InputFieldItem,
  ButtonGroupItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DEFAULT_PALETTE, PIE_PALETTES } from '../../../../../common/constants/colors';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createPieTypeDefinition = (params: any) => ({
  name: 'pie',
  type: 'pie',
  id: 'pie',
  label: 'Pie',
  fulllabel: 'Pie',
  icontype: 'visPie',
  category: VIS_CATEGORY.BASICS,
  showlegend: true,
  legendposition: 'v',
  mode: 'pie',
  labelsize: 12,
  legendsize: 12,
  selection: {
    dataLoss: 'nothing',
  },
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  icon: LensIconChartPie,
  editorconfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Style',
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
                name: 'Show legend',
                mapTo: 'showLegend',
                component: ButtonGroupItem,
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Show', id: 'show' },
                    { name: 'Hidden', id: 'hidden' },
                  ],
                  defaultSelections: [{ name: 'Show', id: 'show' }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: ButtonGroupItem,
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Right', id: 'v' },
                    { name: 'Bottom', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', id: 'v' }],
                },
              },
              {
                name: 'Legend size',
                component: InputFieldItem,
                mapTo: 'size',
                eleType: 'input',
              },
            ],
          },
          fetchConfigObject('Tooltip', {
            options: [
              { name: 'All', id: 'all' },
              { name: 'Label', id: 'label' },
              { name: 'Value', id: 'value' },
              { name: 'Percent', id: 'percent' },
            ],
            defaultSelections: [{ name: 'All', id: 'all' }],
          }),
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Mode',
                isSingleSelection: true,
                component: ButtonGroupItem,
                eleType: 'buttons',
                mapTo: 'mode',
                props: {
                  options: [
                    { name: 'Pie', id: 'pie' },
                    { name: 'Donut', id: 'donut' },
                  ],
                  defaultSelections: [{ name: 'Pie', id: 'pie' }],
                },
              },
              {
                name: 'Label size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Color theme',
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
  visconfig: {
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
