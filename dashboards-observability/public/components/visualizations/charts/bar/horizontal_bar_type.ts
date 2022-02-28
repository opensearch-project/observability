import { Bar } from './bar';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartBarHorizontal } from '../../../visualizations/assets/chart_bar_horizontal';
import { VizDataPanel } from '../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../explorer/visualizations/config_panel/config_editor/config_editor';
import { ConfigValueOptions } from '../../../explorer/visualizations/config_panel/config_editor/config_controls';

const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();

export interface BarTypeParams {}

export const createHorizontalBarTypeDefinition = (params: BarTypeParams = {}) => ({
  id: 'horizontal_bar',
  label: 'H. Bar',
  type: 'bar',
  fullLabel: 'H. Bar',
  selection: {
    dataLoss: 'nothing',
  },
  category: VIS_CATEGORY.BASICS,
  icon: LensIconChartBarHorizontal,
  orientation: 'h',
  component: Bar,
  categoryAxis: 'yaxis',
  seriesAxis: 'xaxis',
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
                name: 'Type',
                onChangeHandler: 'setVisType',
                isSingleSelection: true,
                options: ['bar', 'group', 'stack'],
                component: null,
                mapTo: 'selectedVisType',
              },
              {
                name: 'X-axis',
                onChangeHandler: 'setXaxisSelections',
                isSingleSelection: false,
                component: null,
                mapTo: 'xaxis',
              },
              {
                name: 'Y-axis',
                isSingleSelection: true,
                onChangeHandler: 'setYaxisSelections',
                component: null,
                mapTo: 'yaxis',
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
