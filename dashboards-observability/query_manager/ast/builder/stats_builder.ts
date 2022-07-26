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
  SpanExpression
} from '../expression';

export class StatsBuilder implements QueryBuilder<Aggregations> {
  
  constructor(private statsChunck) {}
  
  build() {
    // return a new stats subtree
    return new Aggregations(
      'stats_command',
      [] as Array<PPLNode>,
      this.statsChunck.partitions ? this.buildParttions(this.statsChunck.partitions) : '',
      this.statsChunck.all_num ? this.buildAllNum(this.statsChunck.all_num) : '',
      this.statsChunck.delim ? this.buildDelim(this.statsChunck.delim) : '',
      this.statsChunck.aggregations ? this.buildAggList(this.statsChunck.aggregations) : [] as Array<PPLNode>,
      this.statsChunck.groupby ? this.buildGroupList(this.statsChunck.groupby) : new GroupBy('stats_by_clause', [] as Array<PPLNode>, [], null),
      this.statsChunck.dedup_split_value ? this.buildDedupSplitValue(this.statsChunck.dedup_split_value) : ''
    );
  }

  buildParttions(partitions) {
    return partitions;
  }

  buildAllNum(allNum) {
    return allNum;
  }

  buildDelim(delim) {
    return delim;
  }

  /**
   * Aggregation list
   */
  buildAggList(aggregations) {
    return aggregations.map((aggregation) => {
      return this.buildAggTerm(aggregation);
    });
  }

  buildAggTerm(aggTerm) {
    return new AggregateTerm(
      'stats_agg_term',
      [] as Array<PPLNode>,
      this.buildAggregateFunction(aggTerm.function),
      aggTerm.function_alias
    );
  }

  buildAggregateFunction(aggFunction) {
    return new AggregateFunction(
      'stats_function',
      [] as Array<PPLNode>,
      aggFunction.name,
      aggFunction.value_expression,
      aggFunction.percentile_agg_function
    )
  }

  /**
   * Group list
   */
  buildGroupList(groupby) {
    return new GroupBy(
      'stats_by_clause',
      [] as Array<PPLNode>,
      this.buildFieldList(groupby.group_fields),
      this.buildSpan(groupby.span)
    );
  }

  buildFieldList(group_fields) {
    return group_fields.map((gf) => {
      return new Field(
        'field_expression',
        [] as Array<PPLNode>,
        gf.name
      );
    });
  }

  buildSpan(span) {
    return new Span(
      'span_clause',
      [] as Array<PPLNode>,
      this.buildeSpanExpression(span.span_expression),
      span.alias
    );
  }

  buildeSpanExpression(spanExpression) {
    return new SpanExpression(
      'span_expression',
      [] as Array<PPLNode>,
      spanExpression.field,
      spanExpression.literal_value,
      spanExpression.time_unit
    );
  }

  buildDedupSplitValue(dedupSplitvalue) {
    return dedupSplitvalue.text;
  }
}