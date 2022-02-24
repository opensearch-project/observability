/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import { VizDataPanel } from '../../../explorer/visualizations/config_panel/config_editor/default_vis_editor';
import { ConfigEditor } from '../../../explorer/visualizations/config_panel/config_editor/config_editor';
import { getVisType } from '../vis_types';

const getDefaultXYAxisLabels = (vizFields: string[]) => {
  if (isEmpty(vizFields)) return {};
  return {
    xaxis: [vizFields[vizFields.length - 1]] || [],
    yaxis: take(vizFields, vizFields.length - 1 > 0 ? vizFields.length - 1 : 1) || [],
  };
};

export const getVizContainerProps = ({
  vizId,
  rawVizData = {},
  query = {},
  indexFields = {},
  userConfigs = {},
  appData = {},
}: any) => {
  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: { ...userConfigs },
      defaultAxes: {
        ...getDefaultXYAxisLabels(rawVizData?.metadata?.fields),
      },
    },
    vis: {
      ...getVisType(vizId),
    },
  };
};

export const getDefaultVizConfigPanelTabs = () => {
  return [
    {
      id: 'data-panel',
      name: 'Data',
      editor: VizDataPanel,
    },
    {
      id: 'style-panel',
      name: 'Layout',
      editor: ConfigEditor,
    },
  ];
};
