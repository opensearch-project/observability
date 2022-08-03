/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const composeAggregations = (aggConfig, staleStats) => {
  return {
    aggregations: aggConfig.metrics.map((metric) => ({
      function: {
        name: metric.aggregation,
        value_expression: metric.name,
        percentile_agg_function: '',
      },
    })),
    groupby: {
      group_fields: aggConfig.dimensions.map((dimension) => ({ name: dimension.name })),
      span: aggConfig.dimensions.filter((dimension) => dimension.type === 'timestamp')
        ? aggConfig.dimensions.filter((dimension) => dimension.type === 'timestamp')[0]
        : '',
    },
    partitions: staleStats.partitions,
    all_num: staleStats.all_num,
    delim: staleStats.delim,
    dedup_split_value: staleStats.dedup_split_value,
  };
};
