/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import { ConfigValueOptions } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ButtonGroupItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { ConfigBarChartStyles } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_bar_chart_styles';
import { SliderConfig } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
import {
  ConfigLegend,
  InputFieldItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { DefaultChartStyles } from '../../../../../common/constants/shared';

import { ConfigColorTheme } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_color_theme';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { LegendPosition, ShowLegend } = DefaultChartStyles;
export const createBarTypeDefinition = (params: any) => ({
  name: 'bar',
  type: 'bar',
  id: 'bar',
  label: 'Bar',
  fullLabel: 'Bar',
  iconType: 'visBarVerticalStacked',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  orientation: 'v',
  mode: 'group',
  labelAngle: 0,
  lineWidth: 1,
  fillOpacity: 80,
  groupWidth: 0.7,
  barWidth: 0.97,
  showLegend: ShowLegend,
  legendPosition: LegendPosition,
  component: Bar,
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
                name: 'Show Legend',
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
                name: 'Orientation',
                component: ButtonGroupItem,
                mapTo: 'orientation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Vertical', id: 'v' },
                    { name: 'Horizontal', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Vertical', id: 'v' }],
                },
              },
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
                name: 'Label Size',
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
                name: 'Fill Opacity',
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
            name: 'Color Theme',
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
