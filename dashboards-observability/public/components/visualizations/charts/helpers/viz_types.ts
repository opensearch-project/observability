/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import { getVisType } from '../vis_types';
import {
  IVisualizationContainerProps,
  IField,
  IQuery,
  ExplorerData,
} from '../../../../../common/types/explorer';
import { visChartTypes } from '../../../../../common/constants/shared';
import { QueryManager } from '../../../../../common/query_manager';
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

const getStandardedOuiField = (name?: string, type?: string) => ({
  name,
  label: name,
  type,
});

const defaultUserConfigs = (queryString) => {
  let obj = {};
  const qm = new QueryManager();
  const statsTokens = qm.queryParser().parse(queryString.rawQuery).getStats();
  console.log(statsTokens, 'Stats Tokens');
  if (!statsTokens) {
    obj = {
      metrics: [],
      dimensions: [],
    };
  } else {
    const fieldInfo = statsTokens.groupby?.span?.span_expression?.field;
    obj = {
      metrics: statsTokens.aggregations.map((agg) => ({
        alias: agg.alias,
        label: agg.function?.value_expression,
        name: agg.function?.value_expression,
        aggregation: agg.function?.name,
      })),
      dimensions: statsTokens.groupby?.group_fields?.map((agg) => ({
        label: agg.name ?? '',
        name: agg.name ?? '',
      })),
      span: {
        time_field: statsTokens.groupby?.span?.span_expression?.field
          ? [getStandardedOuiField(fieldInfo, 'timestamp')]
          : [],
        interval: statsTokens.groupby?.span?.span_expression?.literal_value ?? '0',
        unit: statsTokens.groupby?.span?.span_expression?.time_unit
          ? [getStandardedOuiField(statsTokens.groupby?.span?.span_expression?.time_unit)]
          : [],
      },
    };
  }
  return obj;
};

const getUserConfigs = (
  userSelectedConfigs: object,
  vizFields: IField[],
  visName: string,
  query
) => {
  let configOfUser = userSelectedConfigs;
  const axesData = getDefaultXYAxisLabels(vizFields, visName);
  if (!(userSelectedConfigs.dataConfig?.dimensions || userSelectedConfigs.dataConfig?.metrics)) {
    console.log(userSelectedConfigs, 'UserSelectedConfigs from if');
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
            ...defaultUserConfigs(query),
            // metrics: axesData.yaxis ?? [],
            // dimensions: axesData.xaxis ?? [],
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
  const getVisTypeData = () =>
    vizId === visChartTypes.Line || vizId === visChartTypes.Scatter
      ? { ...getVisType(vizId, { type: vizId }) }
      : { ...getVisType(vizId) };

  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: {
        ...getUserConfigs(userConfigs, rawVizData?.metadata?.fields, getVisTypeData().name, query),
      },
      defaultAxes: {
        ...getDefaultXYAxisLabels(rawVizData?.metadata?.fields, getVisTypeData().name),
      },
      explorer: { ...explorer },
    },
    vis: {
      ...getVisTypeData(),
    },
  };
};
