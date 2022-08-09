/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ButtonGroupItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { ConfigBarChartStyles } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_bar_chart_styles';
import { SliderConfig } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
import {
  ConfigLegend,
  InputFieldItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
import { DefaultChartStyles, visChartTypes } from '../../../../../common/constants/shared';

import { ConfigColorTheme } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_color_theme';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { LegendPosition, ShowLegend } = DefaultChartStyles;
export const createBarTypeDefinition = (params: any) => ({
  name: params.type ? params.type : 'bar',
  type: 'bar',
  id: params.type ? params.type : 'bar',
  label: params.type === visChartTypes.HorizontalBar ? 'Horizontal Bar' : 'Vertical bar',
  fulllabel: params.type === visChartTypes.HorizontalBar ? 'Horizontal Bar' : 'Vertical bar',
  icontype: 'visBarVerticalStacked',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  orientation: params.type === visChartTypes.HorizontalBar ? 'h' : 'v',
  mode: 'group',
  labelangle: 0,
  linewidth: 1,
  fillOpacity: 80,
  groupwidth: 0.7,
  barwidth: 0.97,
  showlegend: ShowLegend,
  legendposition: LegendPosition,
  component: Bar,
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
              { name: 'Dimension', id: 'x' },
              { name: 'Metrics', id: 'y' },
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
                name: 'Show legend',
                mapTo: 'showLegend',
                component: null,
                props: {
                  options: [
                    { name: 'Show', id: 'show' },
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
                    { name: 'Right', id: 'v' },
                    { name: 'Bottom', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', id: LegendPosition }],
                },
              },
            ],
          },
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigBarChartStyles,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Mode',
                component: ButtonGroupItem,
                mapTo: 'mode',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Group', id: 'group' },
                    { name: 'Stack', id: 'stack' },
                  ],
                  defaultSelections: [{ name: 'Group', id: 'group' }],
                },
              },
              {
                name: 'Label size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Rotate bar labels',
                component: SliderConfig,
                mapTo: 'rotateBarLabels',
                eleType: 'slider',
                defaultState: 0,
                props: {
                  ticks: [
                    { label: '-90°', value: -90 },
                    { label: '-45°', value: -45 },
                    { label: '0°', value: 0 },
                    { label: '45°', value: 45 },
                    { label: '90°', value: 90 },
                  ],
                  showTicks: true,
                  min: -90,
                  max: 90,
                },
              },
              {
                name: 'Group width',
                component: SliderConfig,
                mapTo: 'groupWidth',
                defaultState: 0.7,
                props: {
                  max: 1,
                  step: 0.01,
                },
                eleType: 'slider',
              },
              {
                name: 'Bar width',
                component: SliderConfig,
                mapTo: 'barWidth',
                defaultState: 0.97,
                props: {
                  max: 1,
                  step: 0.01,
                },
                eleType: 'slider',
              },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: 1,
                props: {
                  max: 10,
                },
                eleType: 'slider',
              },
              {
                name: 'Fill opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: 80,
                props: {
                  max: 100,
                },
                eleType: 'slider',
              },
            ],
          },
          {
            id: 'color-theme',
            name: 'Color theme',
            editor: ConfigColorTheme,
            mapTo: 'colorTheme',
            schemas: [],
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
      {
        id: 'availability-panel',
        name: 'Availability',
        mapTo: 'availabilityConfig',
        editor: ConfigAvailability,
      },
    ],
  },
  visconfig: {
    layout: {
      ...sharedConfigs.layout,
    },
    config: {
      ...sharedConfigs.config,
    },
    isUniColor: false,
  },
});
