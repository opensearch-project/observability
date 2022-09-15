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
import { TIME_INTERVAL_OPTIONS } from '../../../../../common/constants/explorer';
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

const initialDimensionEntry = {
  label: '',
  name: '',
};

const initialMetricEntry = {
  alias: '',
  label: '',
  name: '',
  aggregation: 'count',
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
        ? [initialDimensionEntry]
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

const defaultUserConfigs = (queryString, visualizationName: string) => {
  let tempUserConfigs = {};
  const qm = new QueryManager();
  const statsTokens = qm.queryParser().parse(queryString.rawQuery).getStats();
  if (!statsTokens) {
    tempUserConfigs = {
      metrics: [],
      dimensions: [],
    };
  } else {
    const fieldInfo = statsTokens.groupby?.span?.span_expression?.field;
    tempUserConfigs = {
      span: {
        time_field: statsTokens.groupby?.span?.span_expression?.field
          ? [getStandardedOuiField(fieldInfo, 'timestamp')]
          : [],
        interval: statsTokens.groupby?.span?.span_expression?.literal_value ?? '0',
        unit: statsTokens.groupby?.span?.span_expression?.time_unit
          ? [
              getStandardedOuiField(
                TIME_INTERVAL_OPTIONS.find(
                  (time_unit) =>
                    time_unit.value === statsTokens.groupby?.span.span_expression.time_unit
                )?.text
              ),
            ]
          : [],
      },
    };
    if (visualizationName === visChartTypes.LogsView) {
      tempUserConfigs = {
        ...tempUserConfigs,
        metrics: [],
        dimensions: statsTokens.aggregations
          .map((agg) => ({
            label: agg.name ?? '',
            name: agg.name ?? '',
          }))
          .concat(
            statsTokens.groupby?.group_fields?.map((agg) => ({
              label: agg.name ?? '',
              name: agg.name ?? '',
            }))
          ),
      };
    } else if (visualizationName === visChartTypes.HeatMap) {
      tempUserConfigs = {
        ...tempUserConfigs,
        dimensions: [initialDimensionEntry, initialDimensionEntry],
        metrics: [initialMetricEntry],
      };
    } else if (visualizationName === visChartTypes.TreeMap) {
      tempUserConfigs = {
        dimensions: [
          {
            childField: {
              ...(statsTokens.groupby?.group_fields.length > 0
                ? {
                    label: statsTokens.groupby?.group_fields[0].name,
                    name: statsTokens.groupby?.group_fields[0].name,
                  }
                : initialEntryTreemap),
            },
            parentFields: [],
          },
        ],
        metrics: [
          {
            valueField: {
              ...(statsTokens.aggregations.length > 0
                ? {
                    label: statsTokens.aggregations[0].function?.value_expression,
                    name: statsTokens.aggregations[0].function?.value_expression,
                  }
                : initialEntryTreemap),
            },
          },
        ],
      };
    } else {
      tempUserConfigs = {
        ...tempUserConfigs,
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
      };
    }
  }
  return tempUserConfigs;
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
    switch (visName) {
      case visChartTypes.HeatMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            ...defaultUserConfigs(query, visName),
          },
        };
        break;
      case visChartTypes.TreeMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            ...defaultUserConfigs(query, visName),
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
            ...defaultUserConfigs(query, visName),
          },
        };
        break;
      default:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            ...defaultUserConfigs(query, visName),
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

  const userSetConfigs = isEmpty(query)
    ? userConfigs
    : getUserConfigs(userConfigs, rawVizData?.metadata?.fields, getVisTypeData().name, query);
  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: {
        ...userSetConfigs,
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
