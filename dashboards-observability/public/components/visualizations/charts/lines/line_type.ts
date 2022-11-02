/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Line } from './line';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigThresholds,
  ConfigLineChartStyles,
  ConfigLegend,
  InputFieldItem,
  ConfigColorTheme,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import {
  DEFAULT_CHART_STYLES,
  VIS_CHART_TYPES,
  PLOTLY_COLOR,
} from '../../../../../common/constants/shared';
import { ButtonGroupItem } from '../../../../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { SliderConfig } from '../../../../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const {
  DefaultModeLine,
  DefaultModeScatter,
  Interpolation,
  LineWidth,
  FillOpacity,
  MarkerSize,
  LegendPosition,
  ShowLegend,
  LabelAngle,
} = DEFAULT_CHART_STYLES;

export const createLineTypeDefinition = (params: any = {}) => ({
  name: params.type,
  type: params.type,
  id: params.type,
  label: params.type === VIS_CHART_TYPES.Line ? 'Time series' : 'Scatter',
  fulllabel: params.type === VIS_CHART_TYPES.Line ? 'Time series' : 'Scatter',
  icontype: 'visLine',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
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
          fetchConfigObject('Tooltip', {
            options: [
              { name: 'All', id: 'all' },
              { name: 'Dimension', id: 'x' },
              { name: 'Series', id: 'y' },
            ],
            defaultSelections: [{ name: 'All', id: 'all' }],
          }),
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigLineChartStyles,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Mode',
                component: ButtonGroupItem,
                mapTo: 'style',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Lines', id: 'lines' },
                    { name: 'Marker', id: 'markers' },
                    { name: 'Lines + Markers', id: 'lines+markers' },
                  ],
                  defaultSelections: [
                    params.type === VIS_CHART_TYPES.Line
                      ? { name: 'Lines', id: DefaultModeLine }
                      : { name: 'Marker', id: DefaultModeScatter },
                  ],
                },
              },
              {
                name: 'Interpolation',
                component: ButtonGroupItem,
                mapTo: 'interpolation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Linear', id: 'linear' },
                    { name: 'Smooth', id: 'spline' },
                    { name: 'Step before', id: 'hv' },
                    { name: 'Step after', id: 'vh' },
                  ],
                  defaultSelections: [{ name: 'Smooth', id: Interpolation }],
                },
              },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: LineWidth,
                eleType: 'slider',
                props: {
                  max: 10,
                },
              },
              {
                name: 'Fill opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
                eleType: 'slider',
                props: {
                  max: 100,
                },
              },
              {
                name: 'Point size',
                component: SliderConfig,
                mapTo: 'pointSize',
                defaultState: MarkerSize,
                eleType: 'slider',
                props: {
                  max: 40,
                },
              },
              {
                title: 'Label size',
                name: 'Label size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Rotate labels',
                component: SliderConfig,
                mapTo: 'rotateLabels',
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
            ],
          },
          {
            id: 'color-theme',
            name: 'Color theme',
            editor: ConfigColorTheme,
            mapTo: 'colorTheme',
            schemas: [],
          },
          {
            id: 'thresholds',
            name: 'Thresholds',
            editor: ConfigThresholds,
            mapTo: 'thresholds',
            defaultState: [],
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
      barmode: params.type,
      xaxis: {
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
    },
  },
  component: Line,
});
