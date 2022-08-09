/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import {
  IVisualizationContainerProps,
  IField,
  IQuery,
  ExplorerData,
} from '../../../../../common/types/explorer';
import { visChartTypes } from '../../../../../common/constants/shared';
import { getVisTypeData } from '../../../custom_panels/helpers/utils';

interface IVizContainerProps {
  vizId: string;
  appData?: { fromApp: boolean };
  rawVizData?: any;
  query?: IQuery;
  indexFields?: IField[];
  userConfigs?: any;
  defaultAxes?: {
    xaxis: IField[];
    yaxis: IField[];
  };
  explorer?: ExplorerData;
}

const initialConfigEntry = {
  label: '',
  aggregation: '',
  custom_label: '',
  name: '',
  side: 'right',
  type: '',
};

const initialEntryTreemap = { label: '', name: '' };

const getDefaultXYAxisLabels = (vizFields: IField[], visName: string) => {
  if (isEmpty(vizFields)) return {};
  const vizFieldsWithLabel: { [key: string]: string }[] = vizFields.map((vizField) => ({
    ...vizField,
    label: vizField.name,
  }));

  const mapXaxis = (): { [key: string]: string }[] => {
    const xaxis = vizFieldsWithLabel.filter((field) => field.type === 'timestamp');
    return visName === visChartTypes.Line
      ? xaxis.length === 0
        ? [initialConfigEntry]
        : xaxis
      : [vizFieldsWithLabel[vizFieldsWithLabel.length - 1]];
  };

  const mapYaxis = (): { [key: string]: string }[] =>
    visName === visChartTypes.Line
      ? vizFieldsWithLabel.filter((field) => field.type !== 'timestamp')
      : take(
          vizFieldsWithLabel,
          vizFieldsWithLabel.length - 1 > 0 ? vizFieldsWithLabel.length - 1 : 1
        ) || [];

  return { xaxis: mapXaxis(), yaxis: mapYaxis() };
};

const getUserConfigs = (userSelectedConfigs: object, vizFields: IField[], visName: string) => {
  let configOfUser = userSelectedConfigs;
  const axesData = getDefaultXYAxisLabels(vizFields, visName);
  if (!userSelectedConfigs.dataConfig?.valueOptions) {
    switch (visName) {
      case visChartTypes.HeatMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            valueOptions: {
              dimensions: [initialConfigEntry, initialConfigEntry],
              metrics: [initialConfigEntry],
            },
          },
        };
        break;
      case visChartTypes.TreeMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            valueOptions: {
              dimensions: [
                {
                  childField: { ...(axesData.xaxis ? axesData.xaxis[0] : initialEntryTreemap) },
                  parentFields: [],
                },
              ],
              metrics: [
                { valueField: { ...(axesData.yaxis ? axesData.yaxis[0] : initialEntryTreemap) } },
              ],
            },
          },
        };
        break;
      case visChartTypes.Histogram:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            valueOptions: {
              dimensions: [{ bucketSize: '', bucketOffset: '' }],
              metrics: [],
            },
          },
        };
        break;
      case visChartTypes.LogsView:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            valueOptions: {
              dimensions:
                axesData.xaxis && axesData.yaxis ? axesData.xaxis.concat(axesData.yaxis) : [],
              metrics: [],
            },
          },
        };
        break;
      default:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            valueOptions: {
              metrics: axesData.yaxis ?? [],
              dimensions: axesData.xaxis ?? [],
            },
          },
        };
        break;
    }
  }
  return isEmpty(configOfUser) ? userSelectedConfigs : configOfUser;
};

export const getVizContainerProps = ({
  vizId,
  rawVizData = {},
  query = {},
  indexFields = {},
  userConfigs = {},
  appData = {},
  explorer = { explorerData: { jsonData: [], jsonDataAll: [] } },
}: IVizContainerProps): IVisualizationContainerProps => {

  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: {
        ...getUserConfigs(userConfigs, rawVizData?.metadata?.fields, getVisTypeData().name),
      },
      defaultAxes: {
        ...getDefaultXYAxisLabels(rawVizData?.metadata?.fields, getVisTypeData(vizId).name),
      },
      explorer: { ...explorer },
    },
    vis: {
      ...getVisTypeData(vizId),
    },
  };
};
