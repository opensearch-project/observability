/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigLegend,
  InputFieldItem,
  ConfigColorTheme,
  SliderConfig,
  ConfigBarChartStyles,
  ButtonGroupItem,
  ConfigAvailability,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { BarOrientation, DEFAULT_CHART_STYLES } from '../../../../../common/constants/shared';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
import { VIS_CHART_TYPES } from '../../../../../common/constants/shared';
import { DEFAULT_BAR_CHART_STYLES } from '../../../../../common/constants/explorer';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { LegendPosition, ShowLegend, LabelAngle, FillOpacity, LineWidth } = DEFAULT_CHART_STYLES;
const { BarMode, GroupWidth, BarWidth } = DEFAULT_BAR_CHART_STYLES;
const isHorizontalBar = (paramstype: string) =>
  paramstype === VIS_CHART_TYPES.HorizontalBar ? true : false;

export const createBarTypeDefinition = (params: any) => ({
  name: params.type || 'bar',
  type: 'bar',
  id: params.type || 'bar',
  label: isHorizontalBar(params.type) ? 'Horizontal bar' : 'Vertical bar',
  fulllabel: isHorizontalBar(params.type) ? 'Horizontal bar' : 'Vertical bar',
  icontype: isHorizontalBar(params.type) ? 'visBarHorizontalStacked' : 'visBarVerticalStacked',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  orientation: isHorizontalBar(params.type) ? BarOrientation.horizontal : BarOrientation.vertical,
  mode: BarMode,
  labelangle: LabelAngle,
  linewidth: LineWidth,
  fillopacity: FillOpacity,
  groupwidth: GroupWidth,
  barwidth: BarWidth,
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
              { name: 'Series', id: 'y' },
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
              {
                title: 'Legend size',
                name: 'Legend size',
                component: InputFieldItem,
                mapTo: 'legendSize',
                eleType: 'input',
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
                    { name: 'Group', id: BarMode },
                    { name: 'Stack', id: 'stack' },
                  ],
                  defaultSelections: [{ name: 'Group', id: BarMode }],
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
                defaultState: LabelAngle,
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
                defaultState: GroupWidth,
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
                defaultState: BarWidth,
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
                defaultState: LineWidth,
                props: {
                  max: 10,
                },
                eleType: 'slider',
              },
              {
                name: 'Fill opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
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
        id: 'availability-panel',
        name: 'Availability',
        mapTo: 'availabilityConfig',
        editor: ConfigAvailability,
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
