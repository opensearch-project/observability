/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pie } from './pie';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartPie } from '../../assets/chart_pie';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ColorPalettePicker,
  ConfigChartOptions,
  ConfigLegend,
  InputFieldItem,
  ButtonGroupItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
import { DEFAULT_PALETTE, PIE_PALETTES } from '../../../../../common/constants/colors';
import { PLOTLY_COLOR, DEFAULT_CHART_STYLES } from '../../../../../common/constants/shared';
import { DEFAULT_PIE_CHART_PARAMETERS } from '../../../../../common/constants/explorer';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { ShowLegend, LegendPosition } = DEFAULT_CHART_STYLES;
const { DefaultMode } = DEFAULT_PIE_CHART_PARAMETERS;

export const createPieTypeDefinition = (params: any) => ({
  name: 'pie',
  type: 'pie',
  id: 'pie',
  label: 'Pie',
  fulllabel: 'Pie',
  icontype: 'visPie',
  category: VIS_CATEGORY.BASICS,
  showlegend: ShowLegend,
  legendposition: LegendPosition,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  mode: DefaultMode,
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
                component: null,
                props: {
                  options: [
                    { name: 'Show', id: ShowLegend },
                    { name: 'Hidden', id: 'hidden' },
                  ],
                  defaultSelections: [{ name: 'Show', id: ShowLegend }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Right', id: LegendPosition },
                    { name: 'Bottom', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', id: LegendPosition }],
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
                    { name: 'Pie', id: DefaultMode },
                    { name: 'Donut', id: 'donut' },
                  ],
                  defaultSelections: [{ name: 'Pie', id: DefaultMode }],
                },
              },
              {
                name: 'Label size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
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
    config: {
      ...sharedConfigs.config,
    },
  },
  component: Pie,
});
