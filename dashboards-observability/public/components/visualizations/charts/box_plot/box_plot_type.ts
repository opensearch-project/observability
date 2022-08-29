/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigLegend,
  InputFieldItem,
  ConfigChartOptions,
  ConfigAvailability,
  ButtonGroupItem,
  SliderConfig,
  ConfigColorTheme,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { BoxPlot } from './box_plot';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
import { DefaultChartStyles } from '../../../../../common/constants/shared';
import { DefaultBoxChartStyles } from '../../../../../common/constants/explorer';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

const { LegendPosition, ShowLegend, LabelAngle, FillOpacity, MarkerSize } = DefaultChartStyles;
const { BoxGap, Jitter, BoxMode, Orientation } = DefaultBoxChartStyles;
export const createBoxPlotTypeDefinition = () => ({
  name: 'box',
  type: 'box',
  id: 'box_plot',
  label: 'Box plot',
  fulllabel: 'Box plot',
  icontype: 'visBarVerticalStacked',
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  orientation: Orientation,
  labelangle: LabelAngle,
  markersize: MarkerSize,
  fillopacity: FillOpacity,
  boxgap: BoxGap,
  jitter: Jitter,
  boxmode: BoxMode,
  showlegend: ShowLegend,
  legendposition: LegendPosition,
  component: BoxPlot,
  editorconfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
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
            editor: ConfigChartOptions,
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
                  defaultSelections: [{ name: 'Vertical', id: Orientation }],
                },
              },
              {
                name: 'Mode',
                component: ButtonGroupItem,
                mapTo: 'boxMode',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Overlay', id: 'overlay' },
                    { name: 'Group', id: 'group' },
                  ],
                  defaultSelections: [{ name: 'Overlay', id: BoxMode }],
                },
              },
              {
                name: 'Label size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Rotate box labels',
                component: SliderConfig,
                mapTo: 'rotateBoxLabels',
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
                name: 'Box gap',
                component: SliderConfig,
                mapTo: 'boxGap',
                defaultState: BoxGap,
                props: {
                  max: 1,
                  step: 0.1,
                  min: 0,
                },
                eleType: 'slider',
              },
              {
                name: 'Marker size',
                component: SliderConfig,
                mapTo: 'markerSize',
                defaultState: MarkerSize,
                props: {
                  max: 10,
                  min: 1,
                },
                eleType: 'slider',
              },
              {
                name: 'Jitter',
                component: SliderConfig,
                mapTo: 'jitter',
                defaultState: Jitter,
                props: {
                  max: 1,
                  min: 0,
                  step: 0.1,
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
