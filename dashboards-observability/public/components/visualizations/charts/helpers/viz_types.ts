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
import { VIS_CHART_TYPES } from '../../../../../common/constants/shared';
import { QueryManager } from '../../../../../common/query_manager';
import {
  AGGREGATIONS,
  GROUPBY,
  TIME_INTERVAL_OPTIONS,
  CUSTOM_LABEL,
} from '../../../../../common/constants/explorer';
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
    if (visualizationName === VIS_CHART_TYPES.LogsView) {
      tempUserConfigs = {
        ...tempUserConfigs,
        [AGGREGATIONS]: [],
        [GROUPBY]: statsTokens.aggregations
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
    } else if (visualizationName === VIS_CHART_TYPES.HeatMap) {
      tempUserConfigs = {
        ...tempUserConfigs,
        [GROUPBY]: [initialDimensionEntry, initialDimensionEntry],
        [AGGREGATIONS]: [initialSeriesEntry],
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
          dataConfig: {
            ...userSelectedConfigs?.dataConfig,
            ...defaultUserConfigs(query, visName),
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
                parentFields: [],
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
    vizId === VIS_CHART_TYPES.Line || vizId === VIS_CHART_TYPES.Scatter
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
