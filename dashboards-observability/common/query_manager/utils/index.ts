/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { CUSTOM_LABEL } from '../../../common/constants/explorer';
import { AggregationConfigurations, PreviouslyParsedStaleStats } from '../ast/types';

export const composeAggregations = (
  aggConfig: AggregationConfigurations,
  staleStats: PreviouslyParsedStaleStats
) => {
  return {
    aggregations: aggConfig.series.map((metric) => ({
      function_alias: metric[CUSTOM_LABEL],
      function: {
        name: metric.aggregation,
        value_expression: metric.name,
        percentile_agg_function: '',
      },
    })),
    groupby: {
      group_fields: aggConfig.dimensions.map((dimension) => ({ name: dimension.name })),
      ...(aggConfig.span &&
        JSON.stringify(aggConfig.span) !== '{}' && { span: composeSpan(aggConfig.span) }),
    },
    partitions: staleStats?.partitions ?? {},
    all_num: staleStats?.all_num ?? {},
    delim: staleStats?.delim ?? {},
    dedup_split_value: staleStats?.dedup_split_value ?? {},
  };
};

const composeSpan = (spanConfig) => {
  return {
    [CUSTOM_LABEL]: spanConfig[CUSTOM_LABEL] ?? '',
    span_expression: {
      type: spanConfig.time_field[0]?.type ?? 'timestamp',
      field: spanConfig.time_field[0]?.name ?? 'timestamp',
      time_unit: spanConfig.unit[0]?.value ?? 'd',
      literal_value: spanConfig.interval ?? 1,
    },
  };
};
