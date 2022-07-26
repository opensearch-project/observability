/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { has, map } from 'lodash';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { 
  BooleanLiteralContext,
  BySpanClauseContext,
  CommandsContext,
  FieldExpressionContext,
  FieldListContext,
  FieldsCommandContext,
  IntegerLiteralContext,
  LiteralValueContext,
  LogicalExpressionContext,
  PplStatementContext,
  QualifiedNameContext,
  RootContext,
  SearchCommandContext,
  SpanClauseContext,
  StatsAggTermContext,
  StatsByClauseContext,
  StatsCommandContext,
  StatsFunctionContext,
  StatsFunctionNameContext,
  StringLiteralContext,
  TimespanUnitContext,
  ValueExpressionContext,
  WcFieldExpressionContext,
  WhereCommandContext
} from '../antlr/bin/OpenSearchPPLParser';
import { OpenSearchPPLParserVisitor } from '../antlr/bin/OpenSearchPPLParserVisitor';
import { AggregateFunction } from '../ast/expression';
import { 
  PPLNode
} from '../ast';

// interface PPLPartial {
//   text: string;
// }

// interface StatsPatial {
//   partitions?: StatsPartitions;
//   delim?: StatsDelim;
//   agg_terms: StatsAggTerms;
//   groupby_fields?: StatsGroupByFields;
//   raw_tex: string;
//   dedup_splitvalue?: string;
// }

// interface StatsSpanPartial {
//   field_expr_name: string;
//   liter_value: string;
//   timespan_unit?: string;
//   field_alias?: string;
//   span_text: string
// }

// interface StatsPartitions {
//   // keyword: string;

// }

// interface StatsDelim {
//   keyword: string;
//   string_literal: string;
//   raw_text: string;
// }

// interface StatsGroupByFields {
//   [index: number]: StatsGroupByField;
// }

// interface StatsGroupByField {
//   name: string;
// }

// interface StatsAggTerms {
//   [index: number] : StatsAggTermPartial;
// }

// interface WcFieldExpressionPartial {}

// interface StatsAggTermPartial {
//   function_partial: StatsFuncPartial;
//   alias_partial: WcFieldExpressionPartial;
// }

// interface StatsFuncPartial {
//   func_name: string;
//   value_expr: string;
//   raw_text: string;
//   percentile_agg_function?: string;
//   dedup_splitvalue?: string;
// }

// type PPLPartial = 
//   string 
//   | StatsPatial
//   | StatsAggTermPartial
//   | StatsAggTerms
//   | StatsGroupByFields
//   | StatsSpanPartial
//   | StatsGroupByField
//   | StatsFuncPartial;

type VisitResult = PPLNode | string;

export class PPLStatsVisitor extends AbstractParseTreeVisitor<VisitResult> implements OpenSearchPPLParserVisitor<VisitResult> {
  protected defaultResult(): PPLNode {
    return new PPLNode(
      'default',
      [] as Array<PPLNode>
    );
  }

  visitRoot(ctx: RootContext) {
    return this.visit(ctx.pplStatement()!);
  }

  visitPplStatement(ctx: PplStatementContext) {
    console.log('ctx: ', ctx);
    console.log('ctx.commands(): ', ctx.commands());
    const comandsContext = [] as Array<CommandsContext>;
    return ctx.commands().map((pplCommandContext) => {
      console.log('pplCommandContext: ', pplCommandContext);
      return this.visitChildren(pplCommandContext);
    });
    
    // return this.visitStatsCommand(ctx.statsComand());
    // return ctx.children?.filter((childCtx) => childCtx.isEmpty !== undefined && !childCtx.isEmpty).map((childCtx) => {
    //   return this.visit(childCtx);
    // });
  }

  // visitSearchCommand(ctx: SearchCommandContext) {
  //   return this.visitCommands(ctx.c);
  // }

  visitCommands(ctx: CommandsContext) {
    return this.visitStatsCommand(ctx.statsCommand()!);
  }

  /**
   * Where command
   */
  // visitWhereCommand(ctx: WhereCommandContext) {
  //   return this.visitLogicalExpression(ctx.logicalExpression());
  // }

  // visitLogicalExpression(ctx: LogicalExpressionContext) {
  //   console.log('LogicalExpressionContext: ', ctx);
  //   return ctx.WHERE().text + ' ' + ctx.text;
  // }

  // visitFieldsCommand(ctx: FieldsCommandContext) {
  //   return ctx.text;
  // }

  /**
   * Stats command
   */

  visitStatsCommand(ctx: StatsCommandContext) : PPLNode {
    console.log('StatsCommandContext: ', ctx);
    console.log('start and stop: ', ctx.start.startIndex, ', ', ctx.stop?.stopIndex);
    const statsTokens = {
      raw_text: ctx.text
    };

    // visit partitions partial
    if (ctx.PARTITIONS() && ctx.integerLiteral()) {
      statsTokens['partitions'] = {
        keyword: ctx.PARTITIONS()!.text,
        integer_literal: this.visitIntegerLiteral(ctx.integerLiteral()!),
        raw_text: ctx.PARTITIONS()!.text
      };
    }

    // visit allnum partial
    if (ctx.ALLNUM() && ctx.booleanLiteral()) {
      this.visitBooleanLiteral(ctx.booleanLiteral()!);
    }

    // visit delim partial
    if (ctx.DELIM() && ctx.stringLiteral()) {
      statsTokens['delim'] = {
        keyword: ctx.DELIM()!.text,
        string_literal: this.visitStringLiteral(ctx.stringLiteral()!),
        raw_text: ctx.DELIM()!.text
      };
    }

    // visit statsAggTerm
    statsTokens['agg_terms'] = 
      ctx
        .statsAggTerm()
        .map((aggTermAlternative) => this.visitStatsAggTerm(aggTermAlternative));

    if (ctx.statsByClause()) {
      statsTokens['groupby_fields'] = this.visitStatsByClause(ctx.statsByClause()!);
    }


    if (ctx.DEDUP_SPLITVALUES() && ctx.booleanLiteral()) {
      statsTokens['dedup_splitvalue'] = this.visitBooleanLiteral(ctx.booleanLiteral()!)
    }

    return statsTokens;
  }

  visitIntegerLiteral(ctx: IntegerLiteralContext) : string {
    return ctx.text;
  }

  visitBooleanLiteral(ctx: BooleanLiteralContext) : string {
    return ctx.text;
  }

  visitStringLiteral(ctx: StringLiteralContext) : string {
    return ctx.text;
  }

  visitStatsAggTerm(ctx: StatsAggTermContext) : PPLNode {

    const statsAggTermPartial = {
      function_partial: this.visitStatsFunction(ctx.statsFunction()),
    } as StatsAggTermPartial;

    if (ctx.wcFieldExpression()) {
      statsAggTermPartial['alias_partial'] = this.visitWcFieldExpression(ctx.wcFieldExpression()!);
    }

    return statsAggTermPartial;
  }

  visitWcFieldExpression(ctx: WcFieldExpressionContext) : string {
    // return only text from here to all its chilren for now
    return ctx.wcQualifiedName().text;
  }

  visitStatsByClause(ctx: StatsByClauseContext) : StatsGroupByFields {
    let statsGroupByFields = [] as StatsGroupByFields;

    if (ctx.fieldList) {
      statsGroupByFields = [...statsGroupByFields, ...this.visitFieldList(ctx.fieldList()!)];
    }

    if (ctx.bySpanClause()) {
      statsGroupByFields.push(this.visitBySpanClause(ctx.bySpanClause()!));
    }

    return statsGroupByFields;
  }

  visitBySpanClause(ctx: BySpanClauseContext) : PPLNode {
    const spanTokens = this.visitSpanClause(ctx.spanClause());
    if (ctx.qualifiedName()) {
      spanTokens['field_alias'] = this.visitQualifiedName(ctx.qualifiedName()!);
    }
    return spanTokens;
  }

  visitSpanClause(ctx: SpanClauseContext) : PPLNode {
    return {
      field_expr_name: this.visitFieldExpression(ctx.fieldExpression()),
      liter_value: this.visitLiteralValue(ctx.literalValue()),
      timespan_unit: ctx.timespanUnit() ? this.visitTimespanUnit(ctx.timespanUnit()!) : '',
      span_text: ctx.text
    };
  }

  visitLiteralValue(ctx: LiteralValueContext) : string {
    return ctx.text;
  }

  visitTimespanUnit(ctx: TimespanUnitContext) : string {
    return ctx.text;
  }

  visitStatsFunction(ctx: StatsFunctionContext) : PPLNode {
    const aggToken = {
      func_name: '',
      value_expr: '',
      raw_text: ctx.text,
    };

    if (typeof ctx.valueExpression === 'function') {
      aggToken.value_expr = this.visitValueExpression(ctx.valueExpression());
      if (typeof ctx.statsFunctionName === 'function') {
        aggToken.func_name = this.visitStatsFunctionName(ctx.statsFunctionName());
      } else {
        aggToken.func_name = ctx.DISTINCT_COUNT() ? ctx.DISTINCT_COUNT().text : ctx.DC().text;
      }
    } else if (typeof ctx.percentileAggFunction === 'function') {
      // for now just return plain text
    } else {
      aggToken.func_name = ctx.COUNT().text;
    }

    return new AggregateFunction(
      'stats_function',
      [] as Array<PPLNode>,
      aggToken.func_name,
      aggToken.value_expr,
      ctx.percentileAggFunction === 'function' ? ctx.percentileAggFunction().text : ''
    );

    // return aggToken;
  }

  visitValueExpression(ctx: ValueExpressionContext) : string {
    return ctx.text;
  }

  visitStatsFunctionName(ctx: StatsFunctionNameContext) : string {
    return ctx.text;
  }

  visitFieldList(ctx: FieldListContext) : PPLNode {
    return ctx.fieldExpression().map((fieldExprAlternative) => {
      return { 
        name: this.visitFieldExpression(fieldExprAlternative)
      }
    }
    );
  }

  visitFieldExpression(ctx: FieldExpressionContext) : string {
    return this.visitQualifiedName(ctx.qualifiedName());
  }

  visitQualifiedName(ctx: QualifiedNameContext) : string {
    return ctx.text;
  }
}