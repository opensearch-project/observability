/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { DataTable } from './data_table';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartDatatable } from '../../assets/chart_datatable';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import {
  InputFieldItem,
  SwitchButton,
  ConfigChartOptions,
  ButtonGroupItem,
} from './../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const COLUMN_WIDTH = 150;

export const createDatatableTypeDefinition = (params: any = {}) => ({
  name: 'data_table',
  type: 'data_table',
  id: 'data_table',
  label: 'Table View',
  fulllabel: 'Table View',
  icontype: 'visTable',
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartDatatable,
  showtableheader: true,
  enablepagination: true,
  colunmfilter: false,
  columnalignment: 'leftAligned',
  columnwidth: COLUMN_WIDTH,
  editorconfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'chart-styles',
            name: 'Chart styles',
            editor: ConfigChartOptions,
            mapTo: 'chartStyles',
            schemas: [
              {
                title: 'Show table header',
                name: 'Show table header',
                component: SwitchButton,
                mapTo: 'showTableHeader',
                eleType: 'switchButton',
                currentValue: true,
              },
              {
                title: 'Enable pagination',
                name: 'Enable pagination',
                component: SwitchButton,
                mapTo: 'enablePagination',
                eleType: 'switchButton',
                currentValue: true,
              },
              {
                name: 'Column alignment',
                component: ButtonGroupItem,
                mapTo: 'columnAlignment',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Left', id: 'leftAligned' },
                    { name: 'Right', id: 'rightAligned' },
                  ],
                  defaultSelections: [{ name: 'Left', id: 'leftAligned' }],
                },
              },
              {
                title: 'Column Width',
                name: 'Column Width',
                component: InputFieldItem,
                mapTo: 'columnWidth',
                eleType: 'input',
                currentValue: 150,
              },
              {
                title: 'Column filter',
                name: 'Column filter',
                component: SwitchButton,
                mapTo: 'colunmFilter',
                eleType: 'switchButton',
                currentValue: false,
              },
            ],
          },
        ],
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
  component: DataTable,
});
