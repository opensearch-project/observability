/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../explorer/visualizations/config_panel/config_editor/config_editor';
import {
  ConfigValueOptions,
  ConfigDataLinks,
  ConfigThresholds,
} from '../../../explorer/visualizations/config_panel/config_editor/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createBarTypeDefinition = (params: BarTypeParams = {}) => ({
  name: 'bar',
  type: 'bar',
  id: 'bar',
  label: 'Bar',
  fullLabel: 'Bar',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBar,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  orientation: 'v',
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
            id: 'chart_options',
            name: 'Chart options',
            editor: ConfigValueOptions,
            mapTo: 'chartOptions',
            schemas: [
              {
                name: 'Orientation',
                isSingleSelection: true,
                component: null,
                mapTo: 'orientation',
                props: {
                  dropdownList: [
                    { name: 'Vertical', orientationId: 'v' },
                    { name: 'Horizontal', orientationId: 'h' },
                  ],
                  defaultSelections: [{ name: 'Vertical' }],
                },
              },
              {
                name: 'Mode',
                isSingleSelection: true,
                component: null,
                mapTo: 'mode',
                props: {
                  dropdownList: [
                    { name: 'Default', modeId: '' },
                    { name: 'Group', modeId: 'group' },
                    { name: 'Stack', modeId: 'stack' },
                  ],
                  defaultSelections: [{ name: 'Default' }],
                },
              },
            ],
          },
          {
            id: 'data_links',
            name: 'Data links',
            editor: ConfigDataLinks,
            mapTo: 'dataLinks',
            schemas: [],
          },
          {
            id: 'thresholds',
            name: 'Thresholds',
            editor: ConfigThresholds,
            mapTo: 'thresholds',
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
