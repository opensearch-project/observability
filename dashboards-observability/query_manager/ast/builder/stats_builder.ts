/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryBuilder } from './query_builder';
import { Aggregations } from '../tree/aggragations';
import { PPLNode } from '../node';
import {
  AggregateFunction,
  AggregateTerm,
  Field,
  GroupBy,
  Span,
  SpanExpression,
} from '../expression';
import {
  ExpressionChunk,
  SpanChunk,
  StatsAggregationChunk,
  StatsAggregationFunctionChunk,
  GroupByChunk,
  GroupField,
  statsChunk,
  SpanExpressionChunk,
} from '../types';

export class StatsBuilder implements QueryBuilder<Aggregations> {
  constructor(private statsChunk: statsChunk) {}

  build(): Aggregations {
    // return a new stats subtree
    return new Aggregations(
      'stats_command',
      [] as Array<PPLNode>,
      this.statsChunk.partitions ? this.buildParttions(this.statsChunk.partitions) : '',
      this.statsChunk.all_num ? this.buildAllNum(this.statsChunk.all_num) : '',
      this.statsChunk.delim ? this.buildDelim(this.statsChunk.delim) : '',
      this.statsChunk.aggregations
        ? this.buildAggList(this.statsChunk.aggregations)
        : ([] as Array<PPLNode>),
      this.statsChunk.groupby
        ? this.buildGroupList(this.statsChunk.groupby)
        : new GroupBy('stats_by_clause', [] as Array<PPLNode>, [], null),
      this.statsChunk.dedup_split_value
        ? this.buildDedupSplitValue(this.statsChunk.dedup_split_value)
        : ''
    );
  }

  /**
   * Flags
   */
  buildParttions(partitions: ExpressionChunk) {
    return `${partitions.keyword} ${partitions.sign} ${partitions.value}`;
  }

  buildAllNum(allNum: ExpressionChunk) {
    return `${allNum.keyword} ${allNum.sign} ${allNum.value}`;
  }

  buildDelim(delim: ExpressionChunk) {
    return `${delim.keyword} ${delim.sign} ${delim.value}`;
  }

  buildDedupSplitValue(dedupSplitvalue: ExpressionChunk) {
    return `${dedupSplitvalue.keyword} ${dedupSplitvalue.sign} ${dedupSplitvalue.value}`;
  }

  /**
   * Aggregations
   */
  buildAggList(aggregations: Array<StatsAggregationChunk>) {
    return aggregations.map((aggregation) => {
      return this.buildAggTerm(aggregation);
    });
  }

  buildAggTerm(aggTerm: StatsAggregationChunk) {
    return new AggregateTerm(
      'stats_agg_term',
      [] as Array<PPLNode>,
      this.buildAggregateFunction(aggTerm.function),
      aggTerm.function_alias
    );
  }

  buildAggregateFunction(aggFunction: StatsAggregationFunctionChunk) {
    return new AggregateFunction(
      'stats_function',
      [] as Array<PPLNode>,
      aggFunction.name,
      aggFunction.value_expression,
      aggFunction.percentile_agg_function
    );
  }

  /**
   * Groups
   */
  buildGroupList(groupby: GroupByChunk) {
    return new GroupBy(
      'stats_by_clause',
      [] as Array<PPLNode>,
      this.buildFieldList(groupby.group_fields),
      groupby.span ? this.buildSpan(groupby.span) : null
    );
  }

  buildFieldList(group_fields: Array<GroupField>) {
    return group_fields.map((gf: GroupField) => {
      return new Field('field_expression', [] as Array<PPLNode>, gf.name);
    });
  }

  buildSpan(span: SpanChunk) {
    return new Span(
      'span_clause',
      [] as Array<PPLNode>,
      this.buildeSpanExpression(span.span_expression),
      span.alias
    );
  }

  buildeSpanExpression(spanExpression: SpanExpressionChunk) {
    return new SpanExpression(
      'span_expression',
      [] as Array<PPLNode>,
      spanExpression.field,
      spanExpression.literal_value,
      spanExpression.time_unit
    );
  }
}
