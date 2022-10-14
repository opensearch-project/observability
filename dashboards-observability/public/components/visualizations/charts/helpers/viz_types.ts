/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import {
  AGGREGATIONS,
  CUSTOM_LABEL,
  GROUPBY,
  PARENTFIELDS,
  SIMILAR_VIZ_TYPES,
  TIMESTAMP,
  TIME_INTERVAL_OPTIONS,
} from '../../../../../common/constants/explorer';
import { VIS_CHART_TYPES } from '../../../../../common/constants/shared';
import { QueryManager } from '../../../../../common/query_manager';
import {
  ExplorerData,
  IField,
  IQuery,
  IVisualizationContainerProps,
} from '../../../../../common/types/explorer';
import { getVisType } from '../vis_types';
import { statsChunk } from '../../../../../common/query_manager/ast/types/stats';
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

const initialSeriesEntry = {
  [CUSTOM_LABEL]: '',
  label: '',
  name: '',
  aggregation: 'count',
};

const initialEntryTreemap = { label: '', name: '' };

const getDefaultXYAxisLabels = (vizFields: IField[], visName: string) => {
  if (isEmpty(vizFields)) return {};
  const vizFieldsWithLabel: Array<{ [key: string]: string }> = vizFields.map((vizField) => ({
    ...vizField,
    label: vizField.name,
  }));

  const mapXaxis = (): Array<{ [key: string]: string }> => {
    const xaxis = vizFieldsWithLabel.filter((field) => field.type === 'timestamp');
    return visName === VIS_CHART_TYPES.Line
      ? xaxis.length === 0
        ? [initialDimensionEntry]
        : xaxis
      : [vizFieldsWithLabel[vizFieldsWithLabel.length - 1]];
  };

  const mapYaxis = (): Array<{ [key: string]: string }> =>
    visName === VIS_CHART_TYPES.Line
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

const getStandardUnitField = (name?: string, value?: string) => ({
  name,
  label: name,
  value,
});

const getSpanValue = (statsTokens: statsChunk) => {
  const fieldInfo = statsTokens.groupby?.span?.span_expression?.field;
  const timeUnit = TIME_INTERVAL_OPTIONS.find(
    (time_unit) => time_unit.value === statsTokens.groupby?.span?.span_expression?.time_unit
  );
  return {
    span: {
      time_field: statsTokens.groupby?.span?.span_expression?.field
        ? [getStandardedOuiField(fieldInfo, TIMESTAMP)]
        : [],
      interval: statsTokens.groupby?.span?.span_expression?.literal_value ?? '0',
      unit: statsTokens.groupby?.span?.span_expression?.time_unit
        ? [getStandardUnitField(timeUnit?.text, timeUnit?.value)]
        : [],
    },
  };
};

const defaultUserConfigs = (queryString, visualizationName: string) => {
  let tempUserConfigs = {};
  const qm = new QueryManager();
  const statsTokens = qm.queryParser().parse(queryString.rawQuery).getStats();
  if (!statsTokens) {
    tempUserConfigs = {
      [AGGREGATIONS]: [],
      [GROUPBY]: [],
    };
  } else {
    tempUserConfigs = { ...(statsTokens.groupby?.span !== null && getSpanValue(statsTokens)) };
    if (visualizationName === VIS_CHART_TYPES.LogsView) {
      const dimensions = statsTokens.aggregations
        .map((agg) => {
          const logViewField = `${agg.function.name}(${agg.function.value_expression})` ?? '';
          return {
            label: logViewField,
            name: logViewField,
          };
        })
        .concat(
          statsTokens.groupby.group_fields?.map((agg) => ({
            label: agg.name ?? '',
            name: agg.name ?? '',
          }))
        );
      if (statsTokens.groupby.span !== null) {
        const { field, literal_value, time_unit } = statsTokens.groupby.span.span_expression;
        const timespanField = `span(${field},${literal_value}${time_unit})`;
        dimensions.push({
          label: timespanField,
          name: timespanField,
        });
      }
      tempUserConfigs = {
        ...tempUserConfigs,
        [AGGREGATIONS]: [],
        [GROUPBY]: dimensions,
      };
    } else if (visualizationName === VIS_CHART_TYPES.HeatMap) {
      tempUserConfigs = {
        ...tempUserConfigs,
        [GROUPBY]: [],
        [AGGREGATIONS]: [],
      };
    } else {
      tempUserConfigs = {
        ...tempUserConfigs,
        [AGGREGATIONS]: statsTokens.aggregations.map((agg) => ({
          [CUSTOM_LABEL]: agg[CUSTOM_LABEL],
          label: agg.function?.value_expression,
          name: agg.function?.value_expression,
          aggregation: agg.function?.name,
        })),
        [GROUPBY]: statsTokens.groupby?.group_fields?.map((agg) => ({
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
  if (!(userSelectedConfigs.dataConfig?.GROUPBY || userSelectedConfigs.dataConfig?.AGGREGATIONS)) {
    switch (visName) {
      case VIS_CHART_TYPES.HeatMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig:
            userSelectedConfigs?.dataConfig === undefined
              ? { ...defaultUserConfigs(query, visName) }
              : {
                  ...userSelectedConfigs?.dataConfig,
                },
        };
        break;
      case VIS_CHART_TYPES.TreeMap:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            [GROUPBY]: [
              {
                childField: { ...(axesData.xaxis ? axesData.xaxis[0] : initialEntryTreemap) },
                parentFields:
                  userSelectedConfigs?.dataConfig !== undefined &&
                  userSelectedConfigs.dataConfig[GROUPBY]?.length > 0
                    ? [...userSelectedConfigs.dataConfig[GROUPBY][0][PARENTFIELDS]]
                    : [],
              },
            ],
            [AGGREGATIONS]: [
              { valueField: { ...(axesData.yaxis ? axesData.yaxis[0] : initialEntryTreemap) } },
            ],
          },
        };
        break;
      case VIS_CHART_TYPES.Histogram:
        configOfUser = {
          ...userSelectedConfigs,
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            [GROUPBY]: [{ bucketSize: '', bucketOffset: '' }],
            [AGGREGATIONS]: [],
          },
        };
        break;
      case VIS_CHART_TYPES.LogsView:
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

export const getVisTypeData = (vizId: string) => {
  if (SIMILAR_VIZ_TYPES.includes(vizId)) {
    return getVisType(vizId, { type: vizId });
  }
  return getVisType(vizId);
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
    SIMILAR_VIZ_TYPES.includes(vizId as VIS_CHART_TYPES)
      ? { ...getVisType(vizId, { type: vizId }) }
      : { ...getVisType(vizId) };

  const userSetConfigs = isEmpty(query)
    ? userConfigs
    : getUserConfigs(userConfigs, rawVizData?.metadata?.fields, getVisTypeData(vizId).name, query);
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
        ...getDefaultXYAxisLabels(rawVizData?.metadata?.fields, getVisTypeData(vizId).name),
      },
      explorer: { ...explorer },
    },
    vis: {
      ...getVisTypeData(vizId),
    },
  };
};
