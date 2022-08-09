/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AggregationConfigurations, PreviouslyParsedStaleStats } from '../ast/types';

export const composeAggregations = (
  aggConfig: AggregationConfigurations,
  staleStats: PreviouslyParsedStaleStats
) => {
  return {
    aggregations: aggConfig.metrics.map((metric) => ({
      function_alias: metric.alias,
      function: {
        name: metric.aggregation,
        value_expression: metric.name,
        percentile_agg_function: '',
      },
    })),
    groupby: {
      group_fields: aggConfig.dimensions.map((dimension) => ({ name: dimension.name })),
      span: aggConfig.span ?? null,
    },
    partitions: staleStats?.partitions ?? {},
    all_num: staleStats?.all_num ?? {},
    delim: staleStats?.delim ?? {},
    dedup_split_value: staleStats?.dedup_split_value ?? {},
  };
};
