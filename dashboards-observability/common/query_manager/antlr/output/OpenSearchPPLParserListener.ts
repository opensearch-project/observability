// Generated from ./common/query_manager/antlr/grammar/OpenSearchPPLParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `OpenSearchPPLParser`.
 */
export interface OpenSearchPPLParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `identsAsWildcardQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 */
	enterIdentsAsWildcardQualifiedName?: (ctx: IdentsAsWildcardQualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by the `identsAsWildcardQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 */
	exitIdentsAsWildcardQualifiedName?: (ctx: IdentsAsWildcardQualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by the `searchFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	enterSearchFrom?: (ctx: SearchFromContext) => void;
	/**
	 * Exit a parse tree produced by the `searchFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	exitSearchFrom?: (ctx: SearchFromContext) => void;

	/**
	 * Enter a parse tree produced by the `searchFromFilter`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	enterSearchFromFilter?: (ctx: SearchFromFilterContext) => void;
	/**
	 * Exit a parse tree produced by the `searchFromFilter`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	exitSearchFromFilter?: (ctx: SearchFromFilterContext) => void;

	/**
	 * Enter a parse tree produced by the `searchFilterFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	enterSearchFilterFrom?: (ctx: SearchFilterFromContext) => void;
	/**
	 * Exit a parse tree produced by the `searchFilterFrom`
	 * labeled alternative in `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	exitSearchFilterFrom?: (ctx: SearchFilterFromContext) => void;

	/**
	 * Enter a parse tree produced by the `statsFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	enterStatsFunctionCall?: (ctx: StatsFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by the `statsFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	exitStatsFunctionCall?: (ctx: StatsFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by the `countAllFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	enterCountAllFunctionCall?: (ctx: CountAllFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by the `countAllFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	exitCountAllFunctionCall?: (ctx: CountAllFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by the `distinctCountFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	enterDistinctCountFunctionCall?: (ctx: DistinctCountFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by the `distinctCountFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	exitDistinctCountFunctionCall?: (ctx: DistinctCountFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by the `percentileAggFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	enterPercentileAggFunctionCall?: (ctx: PercentileAggFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by the `percentileAggFunctionCall`
	 * labeled alternative in `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	exitPercentileAggFunctionCall?: (ctx: PercentileAggFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by the `identsAsQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	enterIdentsAsQualifiedName?: (ctx: IdentsAsQualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by the `identsAsQualifiedName`
	 * labeled alternative in `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	exitIdentsAsQualifiedName?: (ctx: IdentsAsQualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by the `binaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	enterBinaryArithmetic?: (ctx: BinaryArithmeticContext) => void;
	/**
	 * Exit a parse tree produced by the `binaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	exitBinaryArithmetic?: (ctx: BinaryArithmeticContext) => void;

	/**
	 * Enter a parse tree produced by the `parentheticBinaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	enterParentheticBinaryArithmetic?: (ctx: ParentheticBinaryArithmeticContext) => void;
	/**
	 * Exit a parse tree produced by the `parentheticBinaryArithmetic`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	exitParentheticBinaryArithmetic?: (ctx: ParentheticBinaryArithmeticContext) => void;

	/**
	 * Enter a parse tree produced by the `valueExpressionDefault`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	enterValueExpressionDefault?: (ctx: ValueExpressionDefaultContext) => void;
	/**
	 * Exit a parse tree produced by the `valueExpressionDefault`
	 * labeled alternative in `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	exitValueExpressionDefault?: (ctx: ValueExpressionDefaultContext) => void;

	/**
	 * Enter a parse tree produced by the `compareExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	enterCompareExpr?: (ctx: CompareExprContext) => void;
	/**
	 * Exit a parse tree produced by the `compareExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	exitCompareExpr?: (ctx: CompareExprContext) => void;

	/**
	 * Enter a parse tree produced by the `inExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	enterInExpr?: (ctx: InExprContext) => void;
	/**
	 * Exit a parse tree produced by the `inExpr`
	 * labeled alternative in `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	exitInExpr?: (ctx: InExprContext) => void;

	/**
	 * Enter a parse tree produced by the `comparsion`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterComparsion?: (ctx: ComparsionContext) => void;
	/**
	 * Exit a parse tree produced by the `comparsion`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitComparsion?: (ctx: ComparsionContext) => void;

	/**
	 * Enter a parse tree produced by the `logicalNot`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalNot?: (ctx: LogicalNotContext) => void;
	/**
	 * Exit a parse tree produced by the `logicalNot`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalNot?: (ctx: LogicalNotContext) => void;

	/**
	 * Enter a parse tree produced by the `logicalOr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalOr?: (ctx: LogicalOrContext) => void;
	/**
	 * Exit a parse tree produced by the `logicalOr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalOr?: (ctx: LogicalOrContext) => void;

	/**
	 * Enter a parse tree produced by the `logicalAnd`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalAnd?: (ctx: LogicalAndContext) => void;
	/**
	 * Exit a parse tree produced by the `logicalAnd`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalAnd?: (ctx: LogicalAndContext) => void;

	/**
	 * Enter a parse tree produced by the `logicalXor`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalXor?: (ctx: LogicalXorContext) => void;
	/**
	 * Exit a parse tree produced by the `logicalXor`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalXor?: (ctx: LogicalXorContext) => void;

	/**
	 * Enter a parse tree produced by the `booleanExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterBooleanExpr?: (ctx: BooleanExprContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitBooleanExpr?: (ctx: BooleanExprContext) => void;

	/**
	 * Enter a parse tree produced by the `relevanceExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterRelevanceExpr?: (ctx: RelevanceExprContext) => void;
	/**
	 * Exit a parse tree produced by the `relevanceExpr`
	 * labeled alternative in `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitRelevanceExpr?: (ctx: RelevanceExprContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.root`.
	 * @param ctx the parse tree
	 */
	enterRoot?: (ctx: RootContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.root`.
	 * @param ctx the parse tree
	 */
	exitRoot?: (ctx: RootContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.pplStatement`.
	 * @param ctx the parse tree
	 */
	enterPplStatement?: (ctx: PplStatementContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.pplStatement`.
	 * @param ctx the parse tree
	 */
	exitPplStatement?: (ctx: PplStatementContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.commands`.
	 * @param ctx the parse tree
	 */
	enterCommands?: (ctx: CommandsContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.commands`.
	 * @param ctx the parse tree
	 */
	exitCommands?: (ctx: CommandsContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	enterSearchCommand?: (ctx: SearchCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.searchCommand`.
	 * @param ctx the parse tree
	 */
	exitSearchCommand?: (ctx: SearchCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.whereCommand`.
	 * @param ctx the parse tree
	 */
	enterWhereCommand?: (ctx: WhereCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.whereCommand`.
	 * @param ctx the parse tree
	 */
	exitWhereCommand?: (ctx: WhereCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.fieldsCommand`.
	 * @param ctx the parse tree
	 */
	enterFieldsCommand?: (ctx: FieldsCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.fieldsCommand`.
	 * @param ctx the parse tree
	 */
	exitFieldsCommand?: (ctx: FieldsCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.renameCommand`.
	 * @param ctx the parse tree
	 */
	enterRenameCommand?: (ctx: RenameCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.renameCommand`.
	 * @param ctx the parse tree
	 */
	exitRenameCommand?: (ctx: RenameCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.statsCommand`.
	 * @param ctx the parse tree
	 */
	enterStatsCommand?: (ctx: StatsCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.statsCommand`.
	 * @param ctx the parse tree
	 */
	exitStatsCommand?: (ctx: StatsCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.dedupCommand`.
	 * @param ctx the parse tree
	 */
	enterDedupCommand?: (ctx: DedupCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.dedupCommand`.
	 * @param ctx the parse tree
	 */
	exitDedupCommand?: (ctx: DedupCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.sortCommand`.
	 * @param ctx the parse tree
	 */
	enterSortCommand?: (ctx: SortCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.sortCommand`.
	 * @param ctx the parse tree
	 */
	exitSortCommand?: (ctx: SortCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.evalCommand`.
	 * @param ctx the parse tree
	 */
	enterEvalCommand?: (ctx: EvalCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.evalCommand`.
	 * @param ctx the parse tree
	 */
	exitEvalCommand?: (ctx: EvalCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.headCommand`.
	 * @param ctx the parse tree
	 */
	enterHeadCommand?: (ctx: HeadCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.headCommand`.
	 * @param ctx the parse tree
	 */
	exitHeadCommand?: (ctx: HeadCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.topCommand`.
	 * @param ctx the parse tree
	 */
	enterTopCommand?: (ctx: TopCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.topCommand`.
	 * @param ctx the parse tree
	 */
	exitTopCommand?: (ctx: TopCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.rareCommand`.
	 * @param ctx the parse tree
	 */
	enterRareCommand?: (ctx: RareCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.rareCommand`.
	 * @param ctx the parse tree
	 */
	exitRareCommand?: (ctx: RareCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.parseCommand`.
	 * @param ctx the parse tree
	 */
	enterParseCommand?: (ctx: ParseCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.parseCommand`.
	 * @param ctx the parse tree
	 */
	exitParseCommand?: (ctx: ParseCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.kmeansCommand`.
	 * @param ctx the parse tree
	 */
	enterKmeansCommand?: (ctx: KmeansCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.kmeansCommand`.
	 * @param ctx the parse tree
	 */
	exitKmeansCommand?: (ctx: KmeansCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.kmeansParameter`.
	 * @param ctx the parse tree
	 */
	enterKmeansParameter?: (ctx: KmeansParameterContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.kmeansParameter`.
	 * @param ctx the parse tree
	 */
	exitKmeansParameter?: (ctx: KmeansParameterContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.adCommand`.
	 * @param ctx the parse tree
	 */
	enterAdCommand?: (ctx: AdCommandContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.adCommand`.
	 * @param ctx the parse tree
	 */
	exitAdCommand?: (ctx: AdCommandContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.adParameter`.
	 * @param ctx the parse tree
	 */
	enterAdParameter?: (ctx: AdParameterContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.adParameter`.
	 * @param ctx the parse tree
	 */
	exitAdParameter?: (ctx: AdParameterContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.fromClause`.
	 * @param ctx the parse tree
	 */
	enterFromClause?: (ctx: FromClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.fromClause`.
	 * @param ctx the parse tree
	 */
	exitFromClause?: (ctx: FromClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.renameClasue`.
	 * @param ctx the parse tree
	 */
	enterRenameClasue?: (ctx: RenameClasueContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.renameClasue`.
	 * @param ctx the parse tree
	 */
	exitRenameClasue?: (ctx: RenameClasueContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.byClause`.
	 * @param ctx the parse tree
	 */
	enterByClause?: (ctx: ByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.byClause`.
	 * @param ctx the parse tree
	 */
	exitByClause?: (ctx: ByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.statsByClause`.
	 * @param ctx the parse tree
	 */
	enterStatsByClause?: (ctx: StatsByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.statsByClause`.
	 * @param ctx the parse tree
	 */
	exitStatsByClause?: (ctx: StatsByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.bySpanClause`.
	 * @param ctx the parse tree
	 */
	enterBySpanClause?: (ctx: BySpanClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.bySpanClause`.
	 * @param ctx the parse tree
	 */
	exitBySpanClause?: (ctx: BySpanClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.spanClause`.
	 * @param ctx the parse tree
	 */
	enterSpanClause?: (ctx: SpanClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.spanClause`.
	 * @param ctx the parse tree
	 */
	exitSpanClause?: (ctx: SpanClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.sortbyClause`.
	 * @param ctx the parse tree
	 */
	enterSortbyClause?: (ctx: SortbyClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.sortbyClause`.
	 * @param ctx the parse tree
	 */
	exitSortbyClause?: (ctx: SortbyClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.evalClause`.
	 * @param ctx the parse tree
	 */
	enterEvalClause?: (ctx: EvalClauseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.evalClause`.
	 * @param ctx the parse tree
	 */
	exitEvalClause?: (ctx: EvalClauseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.statsAggTerm`.
	 * @param ctx the parse tree
	 */
	enterStatsAggTerm?: (ctx: StatsAggTermContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.statsAggTerm`.
	 * @param ctx the parse tree
	 */
	exitStatsAggTerm?: (ctx: StatsAggTermContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	enterStatsFunction?: (ctx: StatsFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.statsFunction`.
	 * @param ctx the parse tree
	 */
	exitStatsFunction?: (ctx: StatsFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.statsFunctionName`.
	 * @param ctx the parse tree
	 */
	enterStatsFunctionName?: (ctx: StatsFunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.statsFunctionName`.
	 * @param ctx the parse tree
	 */
	exitStatsFunctionName?: (ctx: StatsFunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.percentileAggFunction`.
	 * @param ctx the parse tree
	 */
	enterPercentileAggFunction?: (ctx: PercentileAggFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.percentileAggFunction`.
	 * @param ctx the parse tree
	 */
	exitPercentileAggFunction?: (ctx: PercentileAggFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalExpression?: (ctx: LogicalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.logicalExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalExpression?: (ctx: LogicalExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	enterComparisonExpression?: (ctx: ComparisonExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.comparisonExpression`.
	 * @param ctx the parse tree
	 */
	exitComparisonExpression?: (ctx: ComparisonExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	enterValueExpression?: (ctx: ValueExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.valueExpression`.
	 * @param ctx the parse tree
	 */
	exitValueExpression?: (ctx: ValueExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.booleanExpression`.
	 * @param ctx the parse tree
	 */
	enterBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.booleanExpression`.
	 * @param ctx the parse tree
	 */
	exitBooleanExpression?: (ctx: BooleanExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceExpression`.
	 * @param ctx the parse tree
	 */
	enterRelevanceExpression?: (ctx: RelevanceExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceExpression`.
	 * @param ctx the parse tree
	 */
	exitRelevanceExpression?: (ctx: RelevanceExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 */
	enterSingleFieldRelevanceFunction?: (ctx: SingleFieldRelevanceFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 */
	exitSingleFieldRelevanceFunction?: (ctx: SingleFieldRelevanceFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 */
	enterMultiFieldRelevanceFunction?: (ctx: MultiFieldRelevanceFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunction`.
	 * @param ctx the parse tree
	 */
	exitMultiFieldRelevanceFunction?: (ctx: MultiFieldRelevanceFunctionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.tableSource`.
	 * @param ctx the parse tree
	 */
	enterTableSource?: (ctx: TableSourceContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.tableSource`.
	 * @param ctx the parse tree
	 */
	exitTableSource?: (ctx: TableSourceContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.fieldList`.
	 * @param ctx the parse tree
	 */
	enterFieldList?: (ctx: FieldListContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.fieldList`.
	 * @param ctx the parse tree
	 */
	exitFieldList?: (ctx: FieldListContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.wcFieldList`.
	 * @param ctx the parse tree
	 */
	enterWcFieldList?: (ctx: WcFieldListContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.wcFieldList`.
	 * @param ctx the parse tree
	 */
	exitWcFieldList?: (ctx: WcFieldListContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.sortField`.
	 * @param ctx the parse tree
	 */
	enterSortField?: (ctx: SortFieldContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.sortField`.
	 * @param ctx the parse tree
	 */
	exitSortField?: (ctx: SortFieldContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.sortFieldExpression`.
	 * @param ctx the parse tree
	 */
	enterSortFieldExpression?: (ctx: SortFieldExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.sortFieldExpression`.
	 * @param ctx the parse tree
	 */
	exitSortFieldExpression?: (ctx: SortFieldExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.fieldExpression`.
	 * @param ctx the parse tree
	 */
	enterFieldExpression?: (ctx: FieldExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.fieldExpression`.
	 * @param ctx the parse tree
	 */
	exitFieldExpression?: (ctx: FieldExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.wcFieldExpression`.
	 * @param ctx the parse tree
	 */
	enterWcFieldExpression?: (ctx: WcFieldExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.wcFieldExpression`.
	 * @param ctx the parse tree
	 */
	exitWcFieldExpression?: (ctx: WcFieldExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.evalFunctionCall`.
	 * @param ctx the parse tree
	 */
	enterEvalFunctionCall?: (ctx: EvalFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.evalFunctionCall`.
	 * @param ctx the parse tree
	 */
	exitEvalFunctionCall?: (ctx: EvalFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.dataTypeFunctionCall`.
	 * @param ctx the parse tree
	 */
	enterDataTypeFunctionCall?: (ctx: DataTypeFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.dataTypeFunctionCall`.
	 * @param ctx the parse tree
	 */
	exitDataTypeFunctionCall?: (ctx: DataTypeFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.booleanFunctionCall`.
	 * @param ctx the parse tree
	 */
	enterBooleanFunctionCall?: (ctx: BooleanFunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.booleanFunctionCall`.
	 * @param ctx the parse tree
	 */
	exitBooleanFunctionCall?: (ctx: BooleanFunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.convertedDataType`.
	 * @param ctx the parse tree
	 */
	enterConvertedDataType?: (ctx: ConvertedDataTypeContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.convertedDataType`.
	 * @param ctx the parse tree
	 */
	exitConvertedDataType?: (ctx: ConvertedDataTypeContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.evalFunctionName`.
	 * @param ctx the parse tree
	 */
	enterEvalFunctionName?: (ctx: EvalFunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.evalFunctionName`.
	 * @param ctx the parse tree
	 */
	exitEvalFunctionName?: (ctx: EvalFunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.functionArgs`.
	 * @param ctx the parse tree
	 */
	enterFunctionArgs?: (ctx: FunctionArgsContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.functionArgs`.
	 * @param ctx the parse tree
	 */
	exitFunctionArgs?: (ctx: FunctionArgsContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.functionArg`.
	 * @param ctx the parse tree
	 */
	enterFunctionArg?: (ctx: FunctionArgContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.functionArg`.
	 * @param ctx the parse tree
	 */
	exitFunctionArg?: (ctx: FunctionArgContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceArg`.
	 * @param ctx the parse tree
	 */
	enterRelevanceArg?: (ctx: RelevanceArgContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceArg`.
	 * @param ctx the parse tree
	 */
	exitRelevanceArg?: (ctx: RelevanceArgContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceArgName`.
	 * @param ctx the parse tree
	 */
	enterRelevanceArgName?: (ctx: RelevanceArgNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceArgName`.
	 * @param ctx the parse tree
	 */
	exitRelevanceArgName?: (ctx: RelevanceArgNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceFieldAndWeight`.
	 * @param ctx the parse tree
	 */
	enterRelevanceFieldAndWeight?: (ctx: RelevanceFieldAndWeightContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceFieldAndWeight`.
	 * @param ctx the parse tree
	 */
	exitRelevanceFieldAndWeight?: (ctx: RelevanceFieldAndWeightContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceFieldWeight`.
	 * @param ctx the parse tree
	 */
	enterRelevanceFieldWeight?: (ctx: RelevanceFieldWeightContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceFieldWeight`.
	 * @param ctx the parse tree
	 */
	exitRelevanceFieldWeight?: (ctx: RelevanceFieldWeightContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceField`.
	 * @param ctx the parse tree
	 */
	enterRelevanceField?: (ctx: RelevanceFieldContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceField`.
	 * @param ctx the parse tree
	 */
	exitRelevanceField?: (ctx: RelevanceFieldContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceQuery`.
	 * @param ctx the parse tree
	 */
	enterRelevanceQuery?: (ctx: RelevanceQueryContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceQuery`.
	 * @param ctx the parse tree
	 */
	exitRelevanceQuery?: (ctx: RelevanceQueryContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.relevanceArgValue`.
	 * @param ctx the parse tree
	 */
	enterRelevanceArgValue?: (ctx: RelevanceArgValueContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.relevanceArgValue`.
	 * @param ctx the parse tree
	 */
	exitRelevanceArgValue?: (ctx: RelevanceArgValueContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.mathematicalFunctionBase`.
	 * @param ctx the parse tree
	 */
	enterMathematicalFunctionBase?: (ctx: MathematicalFunctionBaseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.mathematicalFunctionBase`.
	 * @param ctx the parse tree
	 */
	exitMathematicalFunctionBase?: (ctx: MathematicalFunctionBaseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.trigonometricFunctionName`.
	 * @param ctx the parse tree
	 */
	enterTrigonometricFunctionName?: (ctx: TrigonometricFunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.trigonometricFunctionName`.
	 * @param ctx the parse tree
	 */
	exitTrigonometricFunctionName?: (ctx: TrigonometricFunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.dateAndTimeFunctionBase`.
	 * @param ctx the parse tree
	 */
	enterDateAndTimeFunctionBase?: (ctx: DateAndTimeFunctionBaseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.dateAndTimeFunctionBase`.
	 * @param ctx the parse tree
	 */
	exitDateAndTimeFunctionBase?: (ctx: DateAndTimeFunctionBaseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.conditionFunctionBase`.
	 * @param ctx the parse tree
	 */
	enterConditionFunctionBase?: (ctx: ConditionFunctionBaseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.conditionFunctionBase`.
	 * @param ctx the parse tree
	 */
	exitConditionFunctionBase?: (ctx: ConditionFunctionBaseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.textFunctionBase`.
	 * @param ctx the parse tree
	 */
	enterTextFunctionBase?: (ctx: TextFunctionBaseContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.textFunctionBase`.
	 * @param ctx the parse tree
	 */
	exitTextFunctionBase?: (ctx: TextFunctionBaseContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.comparisonOperator`.
	 * @param ctx the parse tree
	 */
	enterComparisonOperator?: (ctx: ComparisonOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.comparisonOperator`.
	 * @param ctx the parse tree
	 */
	exitComparisonOperator?: (ctx: ComparisonOperatorContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.binaryOperator`.
	 * @param ctx the parse tree
	 */
	enterBinaryOperator?: (ctx: BinaryOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.binaryOperator`.
	 * @param ctx the parse tree
	 */
	exitBinaryOperator?: (ctx: BinaryOperatorContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 */
	enterSingleFieldRelevanceFunctionName?: (ctx: SingleFieldRelevanceFunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.singleFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 */
	exitSingleFieldRelevanceFunctionName?: (ctx: SingleFieldRelevanceFunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 */
	enterMultiFieldRelevanceFunctionName?: (ctx: MultiFieldRelevanceFunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.multiFieldRelevanceFunctionName`.
	 * @param ctx the parse tree
	 */
	exitMultiFieldRelevanceFunctionName?: (ctx: MultiFieldRelevanceFunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.literalValue`.
	 * @param ctx the parse tree
	 */
	enterLiteralValue?: (ctx: LiteralValueContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.literalValue`.
	 * @param ctx the parse tree
	 */
	exitLiteralValue?: (ctx: LiteralValueContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.intervalLiteral`.
	 * @param ctx the parse tree
	 */
	enterIntervalLiteral?: (ctx: IntervalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.intervalLiteral`.
	 * @param ctx the parse tree
	 */
	exitIntervalLiteral?: (ctx: IntervalLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.integerLiteral`.
	 * @param ctx the parse tree
	 */
	enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.integerLiteral`.
	 * @param ctx the parse tree
	 */
	exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.decimalLiteral`.
	 * @param ctx the parse tree
	 */
	enterDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.decimalLiteral`.
	 * @param ctx the parse tree
	 */
	exitDecimalLiteral?: (ctx: DecimalLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.booleanLiteral`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.booleanLiteral`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.pattern`.
	 * @param ctx the parse tree
	 */
	enterPattern?: (ctx: PatternContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.pattern`.
	 * @param ctx the parse tree
	 */
	exitPattern?: (ctx: PatternContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.intervalUnit`.
	 * @param ctx the parse tree
	 */
	enterIntervalUnit?: (ctx: IntervalUnitContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.intervalUnit`.
	 * @param ctx the parse tree
	 */
	exitIntervalUnit?: (ctx: IntervalUnitContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.timespanUnit`.
	 * @param ctx the parse tree
	 */
	enterTimespanUnit?: (ctx: TimespanUnitContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.timespanUnit`.
	 * @param ctx the parse tree
	 */
	exitTimespanUnit?: (ctx: TimespanUnitContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.valueList`.
	 * @param ctx the parse tree
	 */
	enterValueList?: (ctx: ValueListContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.valueList`.
	 * @param ctx the parse tree
	 */
	exitValueList?: (ctx: ValueListContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	enterQualifiedName?: (ctx: QualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	exitQualifiedName?: (ctx: QualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 */
	enterWcQualifiedName?: (ctx: WcQualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.wcQualifiedName`.
	 * @param ctx the parse tree
	 */
	exitWcQualifiedName?: (ctx: WcQualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.ident`.
	 * @param ctx the parse tree
	 */
	enterIdent?: (ctx: IdentContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.ident`.
	 * @param ctx the parse tree
	 */
	exitIdent?: (ctx: IdentContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.wildcard`.
	 * @param ctx the parse tree
	 */
	enterWildcard?: (ctx: WildcardContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.wildcard`.
	 * @param ctx the parse tree
	 */
	exitWildcard?: (ctx: WildcardContext) => void;

	/**
	 * Enter a parse tree produced by `OpenSearchPPLParser.keywordsCanBeId`.
	 * @param ctx the parse tree
	 */
	enterKeywordsCanBeId?: (ctx: KeywordsCanBeIdContext) => void;
	/**
	 * Exit a parse tree produced by `OpenSearchPPLParser.keywordsCanBeId`.
	 * @param ctx the parse tree
	 */
	exitKeywordsCanBeId?: (ctx: KeywordsCanBeIdContext) => void;
}

