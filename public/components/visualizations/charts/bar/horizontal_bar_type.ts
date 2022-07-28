import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBar } from '../../assets/chart_bar';
import { VizDataPanel } from '../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../explorer/visualizations/config_panel/config_editor/config_editor';
import { ConfigValueOptions } from '../../../explorer/visualizations/config_panel/config_editor/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createHorizontalBarTypeDefinition = (params: BarTypeParams = {}) => ({
  id: 'horizontal_bar',
  name: 'horizontal_bar',
  type: 'bar',
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
  orientation: 'h',
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
                  defaultSelections: [{ name: 'Horizontal', orientationId: 'h' }],
                },
              },
              {
                name: 'Mode',
                isSingleSelection: true,
                component: null,
                mapTo: 'mode',
                props: {
                  dropdownList: [
                    { name: 'Group', modeId: 'group' },
                    { name: 'Stack', modeId: 'stack' },
                  ],
                  defaultSelections: [{ name: 'Group', modeId: 'group' }],
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
