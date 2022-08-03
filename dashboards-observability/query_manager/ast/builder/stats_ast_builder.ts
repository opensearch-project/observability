/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import {
  RootContext,
  PplStatementContext,
  CommandsContext,
  StatsCommandContext,
  BooleanLiteralContext,
  BySpanClauseContext,
  FieldExpressionContext,
  FieldListContext,
  IntegerLiteralContext,
  LiteralValueContext,
  QualifiedNameContext,
  SpanClauseContext,
  StatsAggTermContext,
  StatsByClauseContext,
  StatsFunctionContext,
  StatsFunctionNameContext,
  StringLiteralContext,
  TimespanUnitContext,
  ValueExpressionContext,
  WcFieldExpressionContext,
} from '../../antlr/bin/OpenSearchPPLParser';
import { OpenSearchPPLParserVisitor } from '../../antlr/bin/OpenSearchPPLParserVisitor';
import { PPLNode } from '../node';
import { Aggregations } from '../tree/aggragations';
import {
  AggregateFunction,
  AggregateTerm,
  GroupBy,
  Field,
  Span,
  SpanExpression,
} from '../expression';

type VisitResult = PPLNode | Array<PPLNode> | string;

export class StatsAstBuilder
  extends AbstractParseTreeVisitor<VisitResult>
  implements OpenSearchPPLParserVisitor<VisitResult> {
  protected defaultResult(): PPLNode {
    return new PPLNode('default', [] as Array<PPLNode>);
  }

  visitRoot(ctx: RootContext) {
    return this.visitChildren(ctx.pplStatement()!);
  }

  visitPplStatement(ctx: PplStatementContext): PPLNode {
    let statsTree: VisitResult = this.defaultResult();
    ctx.commands().map((pplCommandContext) => {
      if (this.visitChildren(pplCommandContext).getName() === 'stats_command')
        statsTree = this.visitChildren(pplCommandContext);
    });
    return statsTree;
  }

  visitCommands(ctx: CommandsContext) {
    if (ctx.statsCommand()) {
      return this.visitStatsCommand(ctx.statsCommand()!);
    }
    return this.defaultResult();
  }

  /**
   * Stats command
   */
  visitStatsCommand(ctx: StatsCommandContext): PPLNode {
    return new Aggregations(
      'stats_command',
      [] as Array<PPLNode>,
      ctx.PARTITIONS() && ctx.integerLiteral()
        ? {
            keyword: ctx.PARTITIONS()?.text,
            sign: '',
            value: ctx.integerLiteral()?.text,
          }
        : {}, // visit partitions partial
      ctx.ALLNUM() && ctx.booleanLiteral()
        ? {
            keyword: ctx.ALLNUM()?.text,
            sign: '=',
            value: this.visitBooleanLiteral(ctx.booleanLiteral()[0]),
          }
        : {}, // visit allnum partial
      ctx.DELIM() && ctx.stringLiteral()
        ? {
            keyword: ctx.DELIM()?.text,
            sign: '=',
            value: this.visitStringLiteral(ctx.stringLiteral()!),
          }
        : '', // visit delim partial
      ctx.statsAggTerm().map((aggTermAlternative) => this.visitStatsAggTerm(aggTermAlternative)), // visit statsAggTerm
      ctx.statsByClause() ? this.visitStatsByClause(ctx.statsByClause()!) : ({} as GroupBy), // visit group list
      ctx.DEDUP_SPLITVALUES() && ctx.booleanLiteral()
        ? {
            keyword: ctx.DEDUP_SPLITVALUES()?.text,
            sign: '=',
            value: this.visitBooleanLiteral(ctx.booleanLiteral()[1]),
          }
        : '', // visit dedup split value
      {
        start: ctx.start.startIndex,
        end: ctx.stop?.stopIndex,
      } // stats start/end indices in query for later query concatenation
    );
  }

  visitIntegerLiteral(ctx: IntegerLiteralContext): string {
    return ctx.text;
  }

  visitBooleanLiteral(ctx: BooleanLiteralContext): string {
    return ctx.text;
  }

  visitStringLiteral(ctx: StringLiteralContext): string {
    return ctx.text;
  }

  visitStatsAggTerm(ctx: StatsAggTermContext): PPLNode {
    return new AggregateTerm(
      'stats_agg_term',
      [] as Array<PPLNode>,
      this.visitStatsFunction(ctx.statsFunction()),
      ctx.wcFieldExpression() ? this.visitWcFieldExpression(ctx.wcFieldExpression()!) : ''
    );
  }

  visitWcFieldExpression(ctx: WcFieldExpressionContext): string {
    // return only text from here to all its chilren for now
    return ctx.wcQualifiedName().text;
  }

  visitStatsByClause(ctx: StatsByClauseContext): PPLNode {
    return new GroupBy(
      'stats_by_clause',
      [] as Array<PPLNode>,
      ctx.fieldList() ? this.visitFieldList(ctx.fieldList()!) : [],
      ctx.bySpanClause() ? this.visitBySpanClause(ctx.bySpanClause()!) : this.defaultResult()
    );
  }

  visitBySpanClause(ctx: BySpanClauseContext): PPLNode {
    return new Span(
      'span_clause',
      [] as Array<PPLNode>,
      this.visitSpanClause(ctx.spanClause()),
      ctx.qualifiedName() ? this.visitQualifiedName(ctx.qualifiedName()!) : ''
    );
  }

  visitSpanClause(ctx: SpanClauseContext): PPLNode {
    return new SpanExpression(
      'span_expression',
      [] as Array<PPLNode>,
      this.visitFieldExpression(ctx.fieldExpression()),
      this.visitLiteralValue(ctx.literalValue()),
      ctx.timespanUnit() ? this.visitTimespanUnit(ctx.timespanUnit()!) : ''
    );
  }

  visitLiteralValue(ctx: LiteralValueContext): string {
    return ctx.text;
  }

  visitTimespanUnit(ctx: TimespanUnitContext): string {
    return ctx.text;
  }

  visitStatsFunction(ctx: StatsFunctionContext): PPLNode {
    let funcName = '';
    let valueExpr = '';

    if (typeof ctx.valueExpression === 'function') {
      valueExpr = this.visitValueExpression(ctx.valueExpression());
      if (typeof ctx.statsFunctionName === 'function') {
        funcName = this.visitStatsFunctionName(ctx.statsFunctionName());
      } else {
        funcName = ctx.DISTINCT_COUNT() ? ctx.DISTINCT_COUNT().text : ctx.DC().text;
      }
    } else if (typeof ctx.percentileAggFunction === 'function') {
      // for now just return plain text
    } else {
      funcName = ctx.COUNT().text;
    }

    return new AggregateFunction(
      'stats_function',
      [] as Array<PPLNode>,
      funcName,
      valueExpr,
      typeof ctx.percentileAggFunction === 'function' ? ctx.text : ''
    );
  }

  visitValueExpression(ctx: ValueExpressionContext): string {
    return ctx.text;
  }

  visitStatsFunctionName(ctx: StatsFunctionNameContext): string {
    return ctx.text;
  }

  visitFieldList(ctx: FieldListContext): Array<PPLNode> {
    return ctx.fieldExpression().map((fieldExprAlternative) => {
      return new Field(
        'field_expression',
        [] as Array<PPLNode>,
        this.visitFieldExpression(fieldExprAlternative)
      );
    });
  }

  visitFieldExpression(ctx: FieldExpressionContext): string {
    return this.visitQualifiedName(ctx.qualifiedName());
  }

  visitQualifiedName(ctx: QualifiedNameContext): string {
    return ctx.text;
  }
}
