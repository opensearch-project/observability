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

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

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
            id: 'value_options',
            name: 'Value options',
            editor: ConfigValueOptions,
            mapTo: 'valueOptions',
            schemas: [
              {
                name: 'X-axis',
                isSingleSelection: false,
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
                    { name: 'Vertical', modeId: 'v' },
                    { name: 'Horizontal', modeId: 'h' },
                  ],
                  defaultSelections: [{ name: 'Vertical', modeId: 'v' }],
                },
              },
              {
                name: 'Mode',
                component: ButtonGroupItem,
                mapTo: 'mode',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Group', modeId: 'group' },
                    { name: 'Stack', modeId: 'stack' },
                  ],
                  defaultSelections: [{ name: 'Group', modeId: 'group' }],
                },
              },
              {
                name: 'Rotate bar labels',
                component: SliderConfig,
                mapTo: 'rotateBarLabels',
                eleType: 'slider',
                defaultState: 0,
                props: {
                  ticks:
                    [
                      { label: '-90°', value: -90 },
                      { label: '-45°', value: -45 },
                      { label: '0°', value: 0 },
                      { label: '45°', value: 45 },
                      { label: '90°', value: 90 },
                    ],
                  showTicks: true,
                  min: -90,
                  max: 90
                },
              },
            ],
          }
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
