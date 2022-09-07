// Generated from ./common/query_manager/antlr/grammar/OpenSearchPPLParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { IdentsAsWildcardQualifiedNameContext } from "./OpenSearchPPLParser";
import { SearchFromContext } from "./OpenSearchPPLParser";
import { SearchFromFilterContext } from "./OpenSearchPPLParser";
import { SearchFilterFromContext } from "./OpenSearchPPLParser";
import { StatsFunctionCallContext } from "./OpenSearchPPLParser";
import { CountAllFunctionCallContext } from "./OpenSearchPPLParser";
import { DistinctCountFunctionCallContext } from "./OpenSearchPPLParser";
import { PercentileAggFunctionCallContext } from "./OpenSearchPPLParser";
import { IdentsAsQualifiedNameContext } from "./OpenSearchPPLParser";
import { BinaryArithmeticContext } from "./OpenSearchPPLParser";
import { ParentheticBinaryArithmeticContext } from "./OpenSearchPPLParser";
import { ValueExpressionDefaultContext } from "./OpenSearchPPLParser";
import { CompareExprContext } from "./OpenSearchPPLParser";
import { InExprContext } from "./OpenSearchPPLParser";
import { ComparsionContext } from "./OpenSearchPPLParser";
import { LogicalNotContext } from "./OpenSearchPPLParser";
import { LogicalOrContext } from "./OpenSearchPPLParser";
import { LogicalAndContext } from "./OpenSearchPPLParser";
import { LogicalXorContext } from "./OpenSearchPPLParser";
import { BooleanExprContext } from "./OpenSearchPPLParser";
import { RelevanceExprContext } from "./OpenSearchPPLParser";
import { RootContext } from "./OpenSearchPPLParser";
import { PplStatementContext } from "./OpenSearchPPLParser";
import { CommandsContext } from "./OpenSearchPPLParser";
import { SearchCommandContext } from "./OpenSearchPPLParser";
import { WhereCommandContext } from "./OpenSearchPPLParser";
import { FieldsCommandContext } from "./OpenSearchPPLParser";
import { RenameCommandContext } from "./OpenSearchPPLParser";
import { StatsCommandContext } from "./OpenSearchPPLParser";
import { DedupCommandContext } from "./OpenSearchPPLParser";
import { SortCommandContext } from "./OpenSearchPPLParser";
import { EvalCommandContext } from "./OpenSearchPPLParser";
import { HeadCommandContext } from "./OpenSearchPPLParser";
import { TopCommandContext } from "./OpenSearchPPLParser";
import { RareCommandContext } from "./OpenSearchPPLParser";
import { ParseCommandContext } from "./OpenSearchPPLParser";
import { KmeansCommandContext } from "./OpenSearchPPLParser";
import { KmeansParameterContext } from "./OpenSearchPPLParser";
import { AdCommandContext } from "./OpenSearchPPLParser";
import { AdParameterContext } from "./OpenSearchPPLParser";
import { FromClauseContext } from "./OpenSearchPPLParser";
import { RenameClasueContext } from "./OpenSearchPPLParser";
import { ByClauseContext } from "./OpenSearchPPLParser";
import { StatsByClauseContext } from "./OpenSearchPPLParser";
import { BySpanClauseContext } from "./OpenSearchPPLParser";
import { SpanClauseContext } from "./OpenSearchPPLParser";
import { SortbyClauseContext } from "./OpenSearchPPLParser";
import { EvalClauseContext } from "./OpenSearchPPLParser";
import { StatsAggTermContext } from "./OpenSearchPPLParser";
import { StatsFunctionContext } from "./OpenSearchPPLParser";
import { StatsFunctionNameContext } from "./OpenSearchPPLParser";
import { PercentileAggFunctionContext } from "./OpenSearchPPLParser";
import { ExpressionContext } from "./OpenSearchPPLParser";
import { LogicalExpressionContext } from "./OpenSearchPPLParser";
import { ComparisonExpressionContext } from "./OpenSearchPPLParser";
import { ValueExpressionContext } from "./OpenSearchPPLParser";
import { PrimaryExpressionContext } from "./OpenSearchPPLParser";
import { BooleanExpressionContext } from "./OpenSearchPPLParser";
import { RelevanceExpressionContext } from "./OpenSearchPPLParser";
import { SingleFieldRelevanceFunctionContext } from "./OpenSearchPPLParser";
import { MultiFieldRelevanceFunctionContext } from "./OpenSearchPPLParser";
import { TableSourceContext } from "./OpenSearchPPLParser";
import { FieldListContext } from "./OpenSearchPPLParser";
import { WcFieldListContext } from "./OpenSearchPPLParser";
import { SortFieldContext } from "./OpenSearchPPLParser";
import { SortFieldExpressionContext } from "./OpenSearchPPLParser";
import { FieldExpressionContext } from "./OpenSearchPPLParser";
import { WcFieldExpressionContext } from "./OpenSearchPPLParser";
import { EvalFunctionCallContext } from "./OpenSearchPPLParser";
import { DataTypeFunctionCallContext } from "./OpenSearchPPLParser";
import { BooleanFunctionCallContext } from "./OpenSearchPPLParser";
import { ConvertedDataTypeContext } from "./OpenSearchPPLParser";
import { EvalFunctionNameContext } from "./OpenSearchPPLParser";
import { FunctionArgsContext } from "./OpenSearchPPLParser";
import { FunctionArgContext } from "./OpenSearchPPLParser";
import { RelevanceArgContext } from "./OpenSearchPPLParser";
import { RelevanceArgNameContext } from "./OpenSearchPPLParser";
import { RelevanceFieldAndWeightContext } from "./OpenSearchPPLParser";
import { RelevanceFieldWeightContext } from "./OpenSearchPPLParser";
import { RelevanceFieldContext } from "./OpenSearchPPLParser";
import { RelevanceQueryContext } from "./OpenSearchPPLParser";
import { RelevanceArgValueContext } from "./OpenSearchPPLParser";
import { MathematicalFunctionBaseContext } from "./OpenSearchPPLParser";
import { TrigonometricFunctionNameContext } from "./OpenSearchPPLParser";
import { DateAndTimeFunctionBaseContext } from "./OpenSearchPPLParser";
import { ConditionFunctionBaseContext } from "./OpenSearchPPLParser";
import { TextFunctionBaseContext } from "./OpenSearchPPLParser";
import { ComparisonOperatorContext } from "./OpenSearchPPLParser";
import { BinaryOperatorContext } from "./OpenSearchPPLParser";
import { SingleFieldRelevanceFunctionNameContext } from "./OpenSearchPPLParser";
import { MultiFieldRelevanceFunctionNameContext } from "./OpenSearchPPLParser";
import { LiteralValueContext } from "./OpenSearchPPLParser";
import { IntervalLiteralContext } from "./OpenSearchPPLParser";
import { StringLiteralContext } from "./OpenSearchPPLParser";
import { IntegerLiteralContext } from "./OpenSearchPPLParser";
import { DecimalLiteralContext } from "./OpenSearchPPLParser";
import { BooleanLiteralContext } from "./OpenSearchPPLParser";
import { PatternContext } from "./OpenSearchPPLParser";
import { IntervalUnitContext } from "./OpenSearchPPLParser";
import { TimespanUnitContext } from "./OpenSearchPPLParser";
import { ValueListContext } from "./OpenSearchPPLParser";
import { QualifiedNameContext } from "./OpenSearchPPLParser";
import { WcQualifiedNameContext } from "./OpenSearchPPLParser";
import { IdentContext } from "./OpenSearchPPLParser";
import { WildcardContext } from "./OpenSearchPPLParser";
import { KeywordsCanBeIdContext } from "./OpenSearchPPLParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `OpenSearchPPLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface OpenSearchPPLParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `identsAsWildcardQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentsAsWildcardQualifiedName?: (ctx: IdentsAsWildcardQualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by the `searchFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchFrom?: (ctx: SearchFromContext) => Result;

	/**
	 * Visit a parse tree produced by the `searchFromFilter`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchFromFilter?: (ctx: SearchFromFilterContext) => Result;

	/**
	 * Visit a parse tree produced by the `searchFilterFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchFilterFrom?: (ctx: SearchFilterFromContext) => Result;

	/**
	 * Visit a parse tree produced by the `statsFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsFunctionCall?: (ctx: StatsFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `countAllFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCountAllFunctionCall?: (ctx: CountAllFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `distinctCountFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDistinctCountFunctionCall?: (ctx: DistinctCountFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `percentileAggFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPercentileAggFunctionCall?: (ctx: PercentileAggFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `identsAsQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentsAsQualifiedName?: (ctx: IdentsAsQualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by the `binaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryArithmetic?: (ctx: BinaryArithmeticContext) => Result;

	/**
	 * Visit a parse tree produced by the `parentheticBinaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheticBinaryArithmetic?: (ctx: ParentheticBinaryArithmeticContext) => Result;

	/**
	 * Visit a parse tree produced by the `valueExpressionDefault`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueExpressionDefault?: (ctx: ValueExpressionDefaultContext) => Result;

	/**
	 * Visit a parse tree produced by the `compareExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompareExpr?: (ctx: CompareExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `inExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInExpr?: (ctx: InExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `comparsion`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparsion?: (ctx: ComparsionContext) => Result;

	/**
	 * Visit a parse tree produced by the `logicalNot`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalNot?: (ctx: LogicalNotContext) => Result;

	/**
	 * Visit a parse tree produced by the `logicalOr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOr?: (ctx: LogicalOrContext) => Result;

	/**
	 * Visit a parse tree produced by the `logicalAnd`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAnd?: (ctx: LogicalAndContext) => Result;

	/**
	 * Visit a parse tree produced by the `logicalXor`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalXor?: (ctx: LogicalXorContext) => Result;

	/**
	 * Visit a parse tree produced by the `booleanExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpr?: (ctx: BooleanExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `relevanceExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceExpr?: (ctx: RelevanceExprContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.root`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRoot?: (ctx: RootContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.pplStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPplStatement?: (ctx: PplStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.commands`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommands?: (ctx: CommandsContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchCommand?: (ctx: SearchCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.whereCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereCommand?: (ctx: WhereCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.fieldsCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldsCommand?: (ctx: FieldsCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.renameCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRenameCommand?: (ctx: RenameCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.statsCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsCommand?: (ctx: StatsCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.dedupCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDedupCommand?: (ctx: DedupCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.sortCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortCommand?: (ctx: SortCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.evalCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalCommand?: (ctx: EvalCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.headCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeadCommand?: (ctx: HeadCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.topCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopCommand?: (ctx: TopCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.rareCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRareCommand?: (ctx: RareCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.parseCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParseCommand?: (ctx: ParseCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.kmeansCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKmeansCommand?: (ctx: KmeansCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.kmeansParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKmeansParameter?: (ctx: KmeansParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.adCommand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdCommand?: (ctx: AdCommandContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.adParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdParameter?: (ctx: AdParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.fromClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromClause?: (ctx: FromClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.renameClasue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRenameClasue?: (ctx: RenameClasueContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.byClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitByClause?: (ctx: ByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.statsByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsByClause?: (ctx: StatsByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.bySpanClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBySpanClause?: (ctx: BySpanClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.spanClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpanClause?: (ctx: SpanClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.sortbyClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortbyClause?: (ctx: SortbyClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.evalClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalClause?: (ctx: EvalClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.statsAggTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsAggTerm?: (ctx: StatsAggTermContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsFunction?: (ctx: StatsFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.statsFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatsFunctionName?: (ctx: StatsFunctionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.percentileAggFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPercentileAggFunction?: (ctx: PercentileAggFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalExpression?: (ctx: LogicalExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonExpression?: (ctx: ComparisonExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueExpression?: (ctx: ValueExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.primaryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.booleanExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpression?: (ctx: BooleanExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceExpression?: (ctx: RelevanceExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleFieldRelevanceFunction?: (ctx: SingleFieldRelevanceFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiFieldRelevanceFunction?: (ctx: MultiFieldRelevanceFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.tableSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableSource?: (ctx: TableSourceContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.fieldList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldList?: (ctx: FieldListContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.wcFieldList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWcFieldList?: (ctx: WcFieldListContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.sortField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortField?: (ctx: SortFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.sortFieldExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortFieldExpression?: (ctx: SortFieldExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.fieldExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldExpression?: (ctx: FieldExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.wcFieldExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWcFieldExpression?: (ctx: WcFieldExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.evalFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalFunctionCall?: (ctx: EvalFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.dataTypeFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataTypeFunctionCall?: (ctx: DataTypeFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.booleanFunctionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanFunctionCall?: (ctx: BooleanFunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.convertedDataType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConvertedDataType?: (ctx: ConvertedDataTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.evalFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvalFunctionName?: (ctx: EvalFunctionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.functionArgs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionArgs?: (ctx: FunctionArgsContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.functionArg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionArg?: (ctx: FunctionArgContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceArg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceArg?: (ctx: RelevanceArgContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceArgName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceArgName?: (ctx: RelevanceArgNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceFieldAndWeight`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceFieldAndWeight?: (ctx: RelevanceFieldAndWeightContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceFieldWeight`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceFieldWeight?: (ctx: RelevanceFieldWeightContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceField?: (ctx: RelevanceFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceQuery`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceQuery?: (ctx: RelevanceQueryContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.relevanceArgValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelevanceArgValue?: (ctx: RelevanceArgValueContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.mathematicalFunctionBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathematicalFunctionBase?: (ctx: MathematicalFunctionBaseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.trigonometricFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrigonometricFunctionName?: (ctx: TrigonometricFunctionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.dateAndTimeFunctionBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateAndTimeFunctionBase?: (ctx: DateAndTimeFunctionBaseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.conditionFunctionBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionFunctionBase?: (ctx: ConditionFunctionBaseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.textFunctionBase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTextFunctionBase?: (ctx: TextFunctionBaseContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.comparisonOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonOperator?: (ctx: ComparisonOperatorContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.binaryOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryOperator?: (ctx: BinaryOperatorContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleFieldRelevanceFunctionName?: (ctx: SingleFieldRelevanceFunctionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiFieldRelevanceFunctionName?: (ctx: MultiFieldRelevanceFunctionNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.literalValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralValue?: (ctx: LiteralValueContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.intervalLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalLiteral?: (ctx: IntervalLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.stringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.integerLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerLiteral?: (ctx: IntegerLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.decimalLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalLiteral?: (ctx: DecimalLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.booleanLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.pattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPattern?: (ctx: PatternContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.intervalUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalUnit?: (ctx: IntervalUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.timespanUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimespanUnit?: (ctx: TimespanUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.valueList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueList?: (ctx: ValueListContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedName?: (ctx: QualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWcQualifiedName?: (ctx: WcQualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.ident`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdent?: (ctx: IdentContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.wildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWildcard?: (ctx: WildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `OpenSearchPPLParser.keywordsCanBeId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeywordsCanBeId?: (ctx: KeywordsCanBeIdContext) => Result;
}

