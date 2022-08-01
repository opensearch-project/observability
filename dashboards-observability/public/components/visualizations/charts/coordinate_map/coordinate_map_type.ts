/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoordinateMap } from './coordinate_map';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigLegend,
  DualRangeSlider,
  InputFieldItem,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigBarChartStyles } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_bar_chart_styles';
import { HIDDEN, LAT_RANGE, LON_RANGE, SHOW, TextPosition } from '../../../../../common/constants/explorer';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export const createCoordinatedMapTypeDefinition = (params: any) => ({
  name: 'scattergeo',
  type: 'scattergeo',
  id: 'scattergeo',
  label: 'Coordinate Map',
  fullLabel: 'Coordinate Map',
  iconType: 'visMapCoordinate',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  showtext: true,
  fontsize: 14,
  latrange: LAT_RANGE,
  lonrange: LON_RANGE,
  icon: LensIconChartBar,
  component: CoordinateMap,
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'text',
            name: 'Text',
            editor: ConfigLegend,
            mapTo: 'text',
            schemas: [
              {
                name: 'Show Text',
                mapTo: 'showText',
                component: null,
                props: {
                  options: [
                    { name: 'Show', id: SHOW },
                    { name: 'Hidden', id: HIDDEN },
                  ],
                  defaultSelections: [{ name: 'Show', id: SHOW }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Top', id: TextPosition.TOP },
                    { name: 'Right', id: TextPosition.RIGHT },
                    { name: 'Bottom', id: TextPosition.BOTTOM },
                    { name: 'Left', id: TextPosition.LEFT },
                  ],
                  defaultSelections: [{ name: 'Top', id: TextPosition.TOP }],
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
                name: 'Label Size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Latitude Range',
                component: DualRangeSlider,
                mapTo: 'latitudeRange',
                eleType: 'dual_slider',
                defaultState: LAT_RANGE,
                props: {
                  min: -90,
                  max: 90,
                  step: 1,
                },
              },
              {
                name: 'Longitude Range',
                component: DualRangeSlider,
                mapTo: 'longitudeRange',
                eleType: 'dual_slider',
                defaultState: LON_RANGE,
                props: {
                  min: -180,
                  max: 180,
                  step: 1,
                },
              },
            ],
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
