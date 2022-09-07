/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * stats chunck types
 */
export interface StatsAggregationChunk {
  function: StatsAggregationFunctionChunk;
  function_alias: string;
}

export interface StatsAggregationFunctionChunk {
  name: string;
  value_expression: string;
  percentile_agg_function: string;
}

export interface GroupField {
  name: string;
}

export interface SpanChunk {
  alias: string;
  span_expression: SpanExpressionChunk;
}

export interface SpanExpressionChunk {
  type: string;
  field: string;
  time_unit: string;
  literal_value: string;
}

export interface GroupByChunk {
  group_fields: Array<GroupField>;
  span: SpanChunk | null;
}

export interface statsChunk {
  aggregations: Array<StatsAggregationChunk>;
  groupby: GroupByChunk;
  partitions: ExpressionChunk;
  all_num: ExpressionChunk;
  delim: ExpressionChunk;
  dedup_split_value: ExpressionChunk;
}

export interface ExpressionChunk {
  keyword: string;
  sign: string;
  value: string | number;
}

export interface DataConfigMetric {
  alias: string;
  label: string;
  name: string;
  aggregation: string;
}

export interface AggregationConfigurations {
  metrics: Array<DataConfigMetric>;
  dimensions: Array<GroupField>;
  span: SpanChunk;
}

export interface PreviouslyParsedStaleStats {
  partitions: ExpressionChunk;
  all_num: ExpressionChunk;
  delim: ExpressionChunk;
  dedup_split_value: ExpressionChunk;
}
