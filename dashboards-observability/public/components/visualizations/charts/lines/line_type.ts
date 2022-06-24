/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Line } from './line';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigValueOptions,
  ConfigThresholds,
  ConfigLineChartStyles,
  ConfigLegend,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { DefaultChartStyles } from '../../../../../common/constants/shared';
import { ButtonGroupItem } from '../../../../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { SliderConfig } from '../../../../../public/components/event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const { DefaultMode, Interpolation, LineWidth, FillOpacity, MarkerSize, LegendPosition, ShowLegend } = DefaultChartStyles;

export const createLineTypeDefinition = (params: any = {}) => ({
  name: 'line',
  type: 'line',
  id: 'line',
  label: 'Line',
  fullLabel: 'Line',
  iconType: 'visLine',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
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
                name: 'X-axis',
                isSingleSelection: true,
                component: null,
                mapTo: 'xaxis',
              },
              {
                name: 'Y-axis',
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
                    { name: 'Show', modeId: "show" },
                    { name: 'Hidden', modeId: "hidden" },
                  ],
                  defaultSelections: [{ name: 'Show', modeId: ShowLegend }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Right', modeId: 'v' },
                    { name: 'Bottom', modeId: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', modeId: LegendPosition }],
                },
              },
            ],
          },
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
                    { name: 'Lines', modeId: 'lines' },
                    { name: 'Bars', modeId: 'bar' },
                    { name: 'Points', modeId: 'markers' },
                    { name: 'Lines + Points', modeId: 'lines+markers' }
                  ],
                  defaultSelections: [{ name: 'Lines', modeId: DefaultMode }],
                },
              },
              {
                name: 'Interpolation',
                component: ButtonGroupItem,
                mapTo: 'interpolation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Linear', modeId: 'linear' },
                    { name: 'Smooth', modeId: 'spline' },
                    { name: 'Step before', modeId: 'hv' },
                    { name: 'Step after', modeId: 'vh' },
                  ],
                  defaultSelections: [{ name: 'Smooth', modeId: Interpolation }],
                },
              },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: LineWidth,
                max: 10,
                eleType: 'slider',
              },
              {
                name: 'Fill Opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
                max: 100,
                eleType: 'slider',
              },
              {
                name: 'Point Size',
                component: SliderConfig,
                mapTo: 'pointSize',
                defaultState: MarkerSize,
                max: 40,
                eleType: 'slider',
              },
            ],
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
      ...{
        barmode: 'line',
        xaxis: {
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
      },
    },
  },
  component: Line,
});
