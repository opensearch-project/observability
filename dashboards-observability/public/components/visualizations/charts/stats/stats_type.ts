/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Stats } from './stats';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigThresholds,
  InputFieldItem,
  ButtonGroupItem,
  ConfigChartOptions,
  TextInputFieldItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { fetchConfigObject } from '../../../../components/event_analytics/utils/utils';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { DefaultStatsParameters } from '../../../../../common/constants/explorer';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const {
  DefaultTextMode,
  DefaultOrientation,
  DefaultChartType,
  DefaultPrecision,
  DefaultTitleSize,
  DefaultValueSize,
  BaseThreshold,
} = DefaultStatsParameters;

export const createStatsTypeDefinition = (params: any = {}) => ({
  name: 'Stats',
  type: 'stats',
  id: 'stats',
  label: 'Stats',
  fulllabel: 'Stats',
  icontype: 'stats',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryaxis: 'xaxis',
  seriesaxis: 'yaxis',
  charttype: DefaultChartType,
  precisionvalue: DefaultPrecision,
  titlesize: DefaultTitleSize,
  valuesize: DefaultValueSize,
  textmode: DefaultTextMode,
  orientation: DefaultOrientation,
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
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Chart type',
                mapTo: 'chartType',
                component: ButtonGroupItem,
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Auto', id: DefaultChartType },
                    { name: 'Horizontal', id: 'horizontal' },
                    { name: 'Text mode', id: 'text' },
                  ],
                  defaultSelections: [{ name: 'Auto', id: DefaultChartType }],
                },
              },
              {
                name: 'Orientation',
                component: ButtonGroupItem,
                mapTo: 'orientation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Auto', id: DefaultOrientation },
                    { name: 'Horizontal', id: 'h' },
                    { name: 'Vertical', id: 'v' },
                  ],
                  defaultSelections: [{ name: 'Auto', id: DefaultOrientation }],
                },
              },
              {
                title: 'Metrics units',
                name: 'Metric units',
                component: TextInputFieldItem,
                mapTo: 'metricUnits',
                eleType: 'textInput',
              },
              {
                title: 'Metrics precision',
                name: 'Metrics precision',
                component: InputFieldItem,
                mapTo: 'precisionValue',
                eleType: 'input',
                props: {
                  minLimit: 0,
                },
              },
              {
                title: 'Title size',
                name: 'Title size',
                component: InputFieldItem,
                mapTo: 'titleSize',
                eleType: 'input',
              },
              {
                title: 'Value size',
                name: 'Value size',
                component: InputFieldItem,
                mapTo: 'valueSize',
                eleType: 'input',
              },
              {
                name: 'Text mode',
                component: ButtonGroupItem,
                mapTo: 'textMode',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Auto', id: DefaultTextMode },
                    { name: 'Names', id: 'names' },
                    { name: 'Values', id: 'values' },
                    { name: 'Values + Names', id: 'values+names' },
                  ],
                  defaultSelections: [{ name: 'Values + Names', id: DefaultTextMode }],
                },
              },
            ],
          },
          {
            id: 'thresholds',
            name: 'Thresholds',
            editor: ConfigThresholds,
            mapTo: 'thresholds',
            defaultState: [BaseThreshold],
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
  component: Stats,
});
