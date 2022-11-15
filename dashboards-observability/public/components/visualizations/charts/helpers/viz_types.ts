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

  return {
    data: {
      appData: { ...appData },
      rawVizData: { ...rawVizData },
      query: { ...query },
      indexFields: { ...indexFields },
      userConfigs: {
        ...userConfigs,
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
