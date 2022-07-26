// Generated from ./antlr/OpenSearchPPLParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { OpenSearchPPLParserListener } from "./OpenSearchPPLParserListener";
import { OpenSearchPPLParserVisitor } from "./OpenSearchPPLParserVisitor";


export class OpenSearchPPLParser extends Parser {
	public static readonly SEARCH = 1;
	public static readonly FROM = 2;
	public static readonly WHERE = 3;
	public static readonly FIELDS = 4;
	public static readonly RENAME = 5;
	public static readonly STATS = 6;
	public static readonly DEDUP = 7;
	public static readonly SORT = 8;
	public static readonly EVAL = 9;
	public static readonly HEAD = 10;
	public static readonly TOP = 11;
	public static readonly RARE = 12;
	public static readonly PARSE = 13;
	public static readonly KMEANS = 14;
	public static readonly AD = 15;
	public static readonly AS = 16;
	public static readonly BY = 17;
	public static readonly SOURCE = 18;
	public static readonly INDEX = 19;
	public static readonly D = 20;
	public static readonly DESC = 21;
	public static readonly SORTBY = 22;
	public static readonly AUTO = 23;
	public static readonly STR = 24;
	public static readonly IP = 25;
	public static readonly NUM = 26;
	public static readonly KEEPEMPTY = 27;
	public static readonly CONSECUTIVE = 28;
	public static readonly DEDUP_SPLITVALUES = 29;
	public static readonly PARTITIONS = 30;
	public static readonly ALLNUM = 31;
	public static readonly DELIM = 32;
	public static readonly CENTROIDS = 33;
	public static readonly ITERATIONS = 34;
	public static readonly DISTANCE_TYPE = 35;
	public static readonly NUMBER_OF_TREES = 36;
	public static readonly SHINGLE_SIZE = 37;
	public static readonly SAMPLE_SIZE = 38;
	public static readonly OUTPUT_AFTER = 39;
	public static readonly TIME_DECAY = 40;
	public static readonly ANOMALY_RATE = 41;
	public static readonly TIME_FIELD = 42;
	public static readonly TIME_ZONE = 43;
	public static readonly TRAINING_DATA_SIZE = 44;
	public static readonly ANOMALY_SCORE_THRESHOLD = 45;
	public static readonly CASE = 46;
	public static readonly IN = 47;
	public static readonly NOT = 48;
	public static readonly OR = 49;
	public static readonly AND = 50;
	public static readonly XOR = 51;
	public static readonly TRUE = 52;
	public static readonly FALSE = 53;
	public static readonly REGEXP = 54;
	public static readonly DATETIME = 55;
	public static readonly INTERVAL = 56;
	public static readonly MICROSECOND = 57;
	public static readonly MILLISECOND = 58;
	public static readonly SECOND = 59;
	public static readonly MINUTE = 60;
	public static readonly HOUR = 61;
	public static readonly DAY = 62;
	public static readonly WEEK = 63;
	public static readonly MONTH = 64;
	public static readonly QUARTER = 65;
	public static readonly YEAR = 66;
	public static readonly SECOND_MICROSECOND = 67;
	public static readonly MINUTE_MICROSECOND = 68;
	public static readonly MINUTE_SECOND = 69;
	public static readonly HOUR_MICROSECOND = 70;
	public static readonly HOUR_SECOND = 71;
	public static readonly HOUR_MINUTE = 72;
	public static readonly DAY_MICROSECOND = 73;
	public static readonly DAY_SECOND = 74;
	public static readonly DAY_MINUTE = 75;
	public static readonly DAY_HOUR = 76;
	public static readonly YEAR_MONTH = 77;
	public static readonly DATAMODEL = 78;
	public static readonly LOOKUP = 79;
	public static readonly SAVEDSEARCH = 80;
	public static readonly INT = 81;
	public static readonly INTEGER = 82;
	public static readonly DOUBLE = 83;
	public static readonly LONG = 84;
	public static readonly FLOAT = 85;
	public static readonly STRING = 86;
	public static readonly BOOLEAN = 87;
	public static readonly PIPE = 88;
	public static readonly COMMA = 89;
	public static readonly DOT = 90;
	public static readonly EQUAL = 91;
	public static readonly GREATER = 92;
	public static readonly LESS = 93;
	public static readonly NOT_GREATER = 94;
	public static readonly NOT_LESS = 95;
	public static readonly NOT_EQUAL = 96;
	public static readonly PLUS = 97;
	public static readonly MINUS = 98;
	public static readonly STAR = 99;
	public static readonly DIVIDE = 100;
	public static readonly MODULE = 101;
	public static readonly EXCLAMATION_SYMBOL = 102;
	public static readonly COLON = 103;
	public static readonly LT_PRTHS = 104;
	public static readonly RT_PRTHS = 105;
	public static readonly LT_SQR_PRTHS = 106;
	public static readonly RT_SQR_PRTHS = 107;
	public static readonly SINGLE_QUOTE = 108;
	public static readonly DOUBLE_QUOTE = 109;
	public static readonly BACKTICK = 110;
	public static readonly BIT_NOT_OP = 111;
	public static readonly BIT_AND_OP = 112;
	public static readonly BIT_XOR_OP = 113;
	public static readonly AVG = 114;
	public static readonly COUNT = 115;
	public static readonly DISTINCT_COUNT = 116;
	public static readonly ESTDC = 117;
	public static readonly ESTDC_ERROR = 118;
	public static readonly MAX = 119;
	public static readonly MEAN = 120;
	public static readonly MEDIAN = 121;
	public static readonly MIN = 122;
	public static readonly MODE = 123;
	public static readonly RANGE = 124;
	public static readonly STDEV = 125;
	public static readonly STDEVP = 126;
	public static readonly SUM = 127;
	public static readonly SUMSQ = 128;
	public static readonly VAR_SAMP = 129;
	public static readonly VAR_POP = 130;
	public static readonly STDDEV_SAMP = 131;
	public static readonly STDDEV_POP = 132;
	public static readonly PERCENTILE = 133;
	public static readonly FIRST = 134;
	public static readonly LAST = 135;
	public static readonly LIST = 136;
	public static readonly VALUES = 137;
	public static readonly EARLIEST = 138;
	public static readonly EARLIEST_TIME = 139;
	public static readonly LATEST = 140;
	public static readonly LATEST_TIME = 141;
	public static readonly PER_DAY = 142;
	public static readonly PER_HOUR = 143;
	public static readonly PER_MINUTE = 144;
	public static readonly PER_SECOND = 145;
	public static readonly RATE = 146;
	public static readonly SPARKLINE = 147;
	public static readonly C = 148;
	public static readonly DC = 149;
	public static readonly ABS = 150;
	public static readonly CEIL = 151;
	public static readonly CEILING = 152;
	public static readonly CONV = 153;
	public static readonly CRC32 = 154;
	public static readonly E = 155;
	public static readonly EXP = 156;
	public static readonly FLOOR = 157;
	public static readonly LN = 158;
	public static readonly LOG = 159;
	public static readonly LOG10 = 160;
	public static readonly LOG2 = 161;
	public static readonly MOD = 162;
	public static readonly PI = 163;
	public static readonly POW = 164;
	public static readonly POWER = 165;
	public static readonly RAND = 166;
	public static readonly ROUND = 167;
	public static readonly SIGN = 168;
	public static readonly SQRT = 169;
	public static readonly TRUNCATE = 170;
	public static readonly ACOS = 171;
	public static readonly ASIN = 172;
	public static readonly ATAN = 173;
	public static readonly ATAN2 = 174;
	public static readonly COS = 175;
	public static readonly COT = 176;
	public static readonly DEGREES = 177;
	public static readonly RADIANS = 178;
	public static readonly SIN = 179;
	public static readonly TAN = 180;
	public static readonly ADDDATE = 181;
	public static readonly DATE = 182;
	public static readonly DATE_ADD = 183;
	public static readonly DATE_SUB = 184;
	public static readonly DAYOFMONTH = 185;
	public static readonly DAYOFWEEK = 186;
	public static readonly DAYOFYEAR = 187;
	public static readonly DAYNAME = 188;
	public static readonly FROM_DAYS = 189;
	public static readonly MONTHNAME = 190;
	public static readonly SUBDATE = 191;
	public static readonly TIME = 192;
	public static readonly TIME_TO_SEC = 193;
	public static readonly TIMESTAMP = 194;
	public static readonly DATE_FORMAT = 195;
	public static readonly TO_DAYS = 196;
	public static readonly SUBSTR = 197;
	public static readonly SUBSTRING = 198;
	public static readonly LTRIM = 199;
	public static readonly RTRIM = 200;
	public static readonly TRIM = 201;
	public static readonly TO = 202;
	public static readonly LOWER = 203;
	public static readonly UPPER = 204;
	public static readonly CONCAT = 205;
	public static readonly CONCAT_WS = 206;
	public static readonly LENGTH = 207;
	public static readonly STRCMP = 208;
	public static readonly RIGHT = 209;
	public static readonly LEFT = 210;
	public static readonly ASCII = 211;
	public static readonly LOCATE = 212;
	public static readonly REPLACE = 213;
	public static readonly CAST = 214;
	public static readonly LIKE = 215;
	public static readonly ISNULL = 216;
	public static readonly ISNOTNULL = 217;
	public static readonly IFNULL = 218;
	public static readonly NULLIF = 219;
	public static readonly IF = 220;
	public static readonly MATCH = 221;
	public static readonly MATCH_PHRASE = 222;
	public static readonly SIMPLE_QUERY_STRING = 223;
	public static readonly ALLOW_LEADING_WILDCARD = 224;
	public static readonly ANALYZE_WILDCARD = 225;
	public static readonly ANALYZER = 226;
	public static readonly AUTO_GENERATE_SYNONYMS_PHRASE_QUERY = 227;
	public static readonly BOOST = 228;
	public static readonly CUTOFF_FREQUENCY = 229;
	public static readonly DEFAULT_FIELD = 230;
	public static readonly DEFAULT_OPERATOR = 231;
	public static readonly ENABLE_POSITION_INCREMENTS = 232;
	public static readonly FLAGS = 233;
	public static readonly FUZZY_MAX_EXPANSIONS = 234;
	public static readonly FUZZY_PREFIX_LENGTH = 235;
	public static readonly FUZZY_TRANSPOSITIONS = 236;
	public static readonly FUZZY_REWRITE = 237;
	public static readonly FUZZINESS = 238;
	public static readonly LENIENT = 239;
	public static readonly LOW_FREQ_OPERATOR = 240;
	public static readonly MAX_DETERMINIZED_STATES = 241;
	public static readonly MAX_EXPANSIONS = 242;
	public static readonly MINIMUM_SHOULD_MATCH = 243;
	public static readonly OPERATOR = 244;
	public static readonly PHRASE_SLOP = 245;
	public static readonly PREFIX_LENGTH = 246;
	public static readonly QUOTE_ANALYZER = 247;
	public static readonly QUOTE_FIELD_SUFFIX = 248;
	public static readonly REWRITE = 249;
	public static readonly SLOP = 250;
	public static readonly TIE_BREAKER = 251;
	public static readonly TYPE = 252;
	public static readonly ZERO_TERMS_QUERY = 253;
	public static readonly SPAN = 254;
	public static readonly MS = 255;
	public static readonly S = 256;
	public static readonly M = 257;
	public static readonly H = 258;
	public static readonly W = 259;
	public static readonly Q = 260;
	public static readonly Y = 261;
	public static readonly ID = 262;
	public static readonly INTEGER_LITERAL = 263;
	public static readonly DECIMAL_LITERAL = 264;
	public static readonly ID_DATE_SUFFIX = 265;
	public static readonly DQUOTA_STRING = 266;
	public static readonly SQUOTA_STRING = 267;
	public static readonly BQUOTA_STRING = 268;
	public static readonly ERROR_RECOGNITION = 269;
	public static readonly RULE_root = 0;
	public static readonly RULE_pplStatement = 1;
	public static readonly RULE_commands = 2;
	public static readonly RULE_searchCommand = 3;
	public static readonly RULE_whereCommand = 4;
	public static readonly RULE_fieldsCommand = 5;
	public static readonly RULE_renameCommand = 6;
	public static readonly RULE_statsCommand = 7;
	public static readonly RULE_dedupCommand = 8;
	public static readonly RULE_sortCommand = 9;
	public static readonly RULE_evalCommand = 10;
	public static readonly RULE_headCommand = 11;
	public static readonly RULE_topCommand = 12;
	public static readonly RULE_rareCommand = 13;
	public static readonly RULE_parseCommand = 14;
	public static readonly RULE_kmeansCommand = 15;
	public static readonly RULE_kmeansParameter = 16;
	public static readonly RULE_adCommand = 17;
	public static readonly RULE_adParameter = 18;
	public static readonly RULE_fromClause = 19;
	public static readonly RULE_renameClasue = 20;
	public static readonly RULE_byClause = 21;
	public static readonly RULE_statsByClause = 22;
	public static readonly RULE_bySpanClause = 23;
	public static readonly RULE_spanClause = 24;
	public static readonly RULE_sortbyClause = 25;
	public static readonly RULE_evalClause = 26;
	public static readonly RULE_statsAggTerm = 27;
	public static readonly RULE_statsFunction = 28;
	public static readonly RULE_statsFunctionName = 29;
	public static readonly RULE_percentileAggFunction = 30;
	public static readonly RULE_expression = 31;
	public static readonly RULE_logicalExpression = 32;
	public static readonly RULE_comparisonExpression = 33;
	public static readonly RULE_valueExpression = 34;
	public static readonly RULE_primaryExpression = 35;
	public static readonly RULE_booleanExpression = 36;
	public static readonly RULE_relevanceExpression = 37;
	public static readonly RULE_singleFieldRelevanceFunction = 38;
	public static readonly RULE_multiFieldRelevanceFunction = 39;
	public static readonly RULE_tableSource = 40;
	public static readonly RULE_fieldList = 41;
	public static readonly RULE_wcFieldList = 42;
	public static readonly RULE_sortField = 43;
	public static readonly RULE_sortFieldExpression = 44;
	public static readonly RULE_fieldExpression = 45;
	public static readonly RULE_wcFieldExpression = 46;
	public static readonly RULE_evalFunctionCall = 47;
	public static readonly RULE_dataTypeFunctionCall = 48;
	public static readonly RULE_booleanFunctionCall = 49;
	public static readonly RULE_convertedDataType = 50;
	public static readonly RULE_evalFunctionName = 51;
	public static readonly RULE_functionArgs = 52;
	public static readonly RULE_functionArg = 53;
	public static readonly RULE_relevanceArg = 54;
	public static readonly RULE_relevanceArgName = 55;
	public static readonly RULE_relevanceFieldAndWeight = 56;
	public static readonly RULE_relevanceFieldWeight = 57;
	public static readonly RULE_relevanceField = 58;
	public static readonly RULE_relevanceQuery = 59;
	public static readonly RULE_relevanceArgValue = 60;
	public static readonly RULE_mathematicalFunctionBase = 61;
	public static readonly RULE_trigonometricFunctionName = 62;
	public static readonly RULE_dateAndTimeFunctionBase = 63;
	public static readonly RULE_conditionFunctionBase = 64;
	public static readonly RULE_textFunctionBase = 65;
	public static readonly RULE_comparisonOperator = 66;
	public static readonly RULE_binaryOperator = 67;
	public static readonly RULE_singleFieldRelevanceFunctionName = 68;
	public static readonly RULE_multiFieldRelevanceFunctionName = 69;
	public static readonly RULE_literalValue = 70;
	public static readonly RULE_intervalLiteral = 71;
	public static readonly RULE_stringLiteral = 72;
	public static readonly RULE_integerLiteral = 73;
	public static readonly RULE_decimalLiteral = 74;
	public static readonly RULE_booleanLiteral = 75;
	public static readonly RULE_pattern = 76;
	public static readonly RULE_intervalUnit = 77;
	public static readonly RULE_timespanUnit = 78;
	public static readonly RULE_valueList = 79;
	public static readonly RULE_qualifiedName = 80;
	public static readonly RULE_wcQualifiedName = 81;
	public static readonly RULE_ident = 82;
	public static readonly RULE_wildcard = 83;
	public static readonly RULE_keywordsCanBeId = 84;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "pplStatement", "commands", "searchCommand", "whereCommand", "fieldsCommand", 
		"renameCommand", "statsCommand", "dedupCommand", "sortCommand", "evalCommand", 
		"headCommand", "topCommand", "rareCommand", "parseCommand", "kmeansCommand", 
		"kmeansParameter", "adCommand", "adParameter", "fromClause", "renameClasue", 
		"byClause", "statsByClause", "bySpanClause", "spanClause", "sortbyClause", 
		"evalClause", "statsAggTerm", "statsFunction", "statsFunctionName", "percentileAggFunction", 
		"expression", "logicalExpression", "comparisonExpression", "valueExpression", 
		"primaryExpression", "booleanExpression", "relevanceExpression", "singleFieldRelevanceFunction", 
		"multiFieldRelevanceFunction", "tableSource", "fieldList", "wcFieldList", 
		"sortField", "sortFieldExpression", "fieldExpression", "wcFieldExpression", 
		"evalFunctionCall", "dataTypeFunctionCall", "booleanFunctionCall", "convertedDataType", 
		"evalFunctionName", "functionArgs", "functionArg", "relevanceArg", "relevanceArgName", 
		"relevanceFieldAndWeight", "relevanceFieldWeight", "relevanceField", "relevanceQuery", 
		"relevanceArgValue", "mathematicalFunctionBase", "trigonometricFunctionName", 
		"dateAndTimeFunctionBase", "conditionFunctionBase", "textFunctionBase", 
		"comparisonOperator", "binaryOperator", "singleFieldRelevanceFunctionName", 
		"multiFieldRelevanceFunctionName", "literalValue", "intervalLiteral", 
		"stringLiteral", "integerLiteral", "decimalLiteral", "booleanLiteral", 
		"pattern", "intervalUnit", "timespanUnit", "valueList", "qualifiedName", 
		"wcQualifiedName", "ident", "wildcard", "keywordsCanBeId",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'SEARCH'", "'FROM'", "'WHERE'", "'FIELDS'", "'RENAME'", "'STATS'", 
		"'DEDUP'", "'SORT'", "'EVAL'", "'HEAD'", "'TOP'", "'RARE'", "'PARSE'", 
		"'KMEANS'", "'AD'", "'AS'", "'BY'", "'SOURCE'", "'INDEX'", "'D'", "'DESC'", 
		"'SORTBY'", "'AUTO'", "'STR'", "'IP'", "'NUM'", "'KEEPEMPTY'", "'CONSECUTIVE'", 
		"'DEDUP_SPLITVALUES'", "'PARTITIONS'", "'ALLNUM'", "'DELIM'", "'CENTROIDS'", 
		"'ITERATIONS'", "'DISTANCE_TYPE'", "'NUMBER_OF_TREES'", "'SHINGLE_SIZE'", 
		"'SAMPLE_SIZE'", "'OUTPUT_AFTER'", "'TIME_DECAY'", "'ANOMALY_RATE'", "'TIME_FIELD'", 
		"'TIME_ZONE'", "'TRAINING_DATA_SIZE'", "'ANOMALY_SCORE_THRESHOLD'", "'CASE'", 
		"'IN'", "'NOT'", "'OR'", "'AND'", "'XOR'", "'TRUE'", "'FALSE'", "'REGEXP'", 
		"'DATETIME'", "'INTERVAL'", "'MICROSECOND'", "'MILLISECOND'", "'SECOND'", 
		"'MINUTE'", "'HOUR'", "'DAY'", "'WEEK'", "'MONTH'", "'QUARTER'", "'YEAR'", 
		"'SECOND_MICROSECOND'", "'MINUTE_MICROSECOND'", "'MINUTE_SECOND'", "'HOUR_MICROSECOND'", 
		"'HOUR_SECOND'", "'HOUR_MINUTE'", "'DAY_MICROSECOND'", "'DAY_SECOND'", 
		"'DAY_MINUTE'", "'DAY_HOUR'", "'YEAR_MONTH'", "'DATAMODEL'", "'LOOKUP'", 
		"'SAVEDSEARCH'", "'INT'", "'INTEGER'", "'DOUBLE'", "'LONG'", "'FLOAT'", 
		"'STRING'", "'BOOLEAN'", "'|'", "','", "'.'", "'='", "'>'", "'<'", undefined, 
		undefined, undefined, "'+'", "'-'", "'*'", "'/'", "'%'", "'!'", "':'", 
		"'('", "')'", "'['", "']'", "'''", "'\"'", "'`'", "'~'", "'&'", "'^'", 
		"'AVG'", "'COUNT'", "'DISTINCT_COUNT'", "'ESTDC'", "'ESTDC_ERROR'", "'MAX'", 
		"'MEAN'", "'MEDIAN'", "'MIN'", "'MODE'", "'RANGE'", "'STDEV'", "'STDEVP'", 
		"'SUM'", "'SUMSQ'", "'VAR_SAMP'", "'VAR_POP'", "'STDDEV_SAMP'", "'STDDEV_POP'", 
		"'PERCENTILE'", "'FIRST'", "'LAST'", "'LIST'", "'VALUES'", "'EARLIEST'", 
		"'EARLIEST_TIME'", "'LATEST'", "'LATEST_TIME'", "'PER_DAY'", "'PER_HOUR'", 
		"'PER_MINUTE'", "'PER_SECOND'", "'RATE'", "'SPARKLINE'", "'C'", "'DC'", 
		"'ABS'", "'CEIL'", "'CEILING'", "'CONV'", "'CRC32'", "'E'", "'EXP'", "'FLOOR'", 
		"'LN'", "'LOG'", "'LOG10'", "'LOG2'", "'MOD'", "'PI'", "'POW'", "'POWER'", 
		"'RAND'", "'ROUND'", "'SIGN'", "'SQRT'", "'TRUNCATE'", "'ACOS'", "'ASIN'", 
		"'ATAN'", "'ATAN2'", "'COS'", "'COT'", "'DEGREES'", "'RADIANS'", "'SIN'", 
		"'TAN'", "'ADDDATE'", "'DATE'", "'DATE_ADD'", "'DATE_SUB'", "'DAYOFMONTH'", 
		"'DAYOFWEEK'", "'DAYOFYEAR'", "'DAYNAME'", "'FROM_DAYS'", "'MONTHNAME'", 
		"'SUBDATE'", "'TIME'", "'TIME_TO_SEC'", "'TIMESTAMP'", "'DATE_FORMAT'", 
		"'TO_DAYS'", "'SUBSTR'", "'SUBSTRING'", "'LTRIM'", "'RTRIM'", "'TRIM'", 
		"'TO'", "'LOWER'", "'UPPER'", "'CONCAT'", "'CONCAT_WS'", "'LENGTH'", "'STRCMP'", 
		"'RIGHT'", "'LEFT'", "'ASCII'", "'LOCATE'", "'REPLACE'", "'CAST'", "'LIKE'", 
		"'ISNULL'", "'ISNOTNULL'", "'IFNULL'", "'NULLIF'", "'IF'", "'MATCH'", 
		"'MATCH_PHRASE'", "'SIMPLE_QUERY_STRING'", "'ALLOW_LEADING_WILDCARD'", 
		"'ANALYZE_WILDCARD'", "'ANALYZER'", "'AUTO_GENERATE_SYNONYMS_PHRASE_QUERY'", 
		"'BOOST'", "'CUTOFF_FREQUENCY'", "'DEFAULT_FIELD'", "'DEFAULT_OPERATOR'", 
		"'ENABLE_POSITION_INCREMENTS'", "'FLAGS'", "'FUZZY_MAX_EXPANSIONS'", "'FUZZY_PREFIX_LENGTH'", 
		"'FUZZY_TRANSPOSITIONS'", "'FUZZY_REWRITE'", "'FUZZINESS'", "'LENIENT'", 
		"'LOW_FREQ_OPERATOR'", "'MAX_DETERMINIZED_STATES'", "'MAX_EXPANSIONS'", 
		"'MINIMUM_SHOULD_MATCH'", "'OPERATOR'", "'PHRASE_SLOP'", "'PREFIX_LENGTH'", 
		"'QUOTE_ANALYZER'", "'QUOTE_FIELD_SUFFIX'", "'REWRITE'", "'SLOP'", "'TIE_BREAKER'", 
		"'TYPE'", "'ZERO_TERMS_QUERY'", "'SPAN'", "'MS'", "'S'", "'M'", "'H'", 
		"'W'", "'Q'", "'Y'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "SEARCH", "FROM", "WHERE", "FIELDS", "RENAME", "STATS", "DEDUP", 
		"SORT", "EVAL", "HEAD", "TOP", "RARE", "PARSE", "KMEANS", "AD", "AS", 
		"BY", "SOURCE", "INDEX", "D", "DESC", "SORTBY", "AUTO", "STR", "IP", "NUM", 
		"KEEPEMPTY", "CONSECUTIVE", "DEDUP_SPLITVALUES", "PARTITIONS", "ALLNUM", 
		"DELIM", "CENTROIDS", "ITERATIONS", "DISTANCE_TYPE", "NUMBER_OF_TREES", 
		"SHINGLE_SIZE", "SAMPLE_SIZE", "OUTPUT_AFTER", "TIME_DECAY", "ANOMALY_RATE", 
		"TIME_FIELD", "TIME_ZONE", "TRAINING_DATA_SIZE", "ANOMALY_SCORE_THRESHOLD", 
		"CASE", "IN", "NOT", "OR", "AND", "XOR", "TRUE", "FALSE", "REGEXP", "DATETIME", 
		"INTERVAL", "MICROSECOND", "MILLISECOND", "SECOND", "MINUTE", "HOUR", 
		"DAY", "WEEK", "MONTH", "QUARTER", "YEAR", "SECOND_MICROSECOND", "MINUTE_MICROSECOND", 
		"MINUTE_SECOND", "HOUR_MICROSECOND", "HOUR_SECOND", "HOUR_MINUTE", "DAY_MICROSECOND", 
		"DAY_SECOND", "DAY_MINUTE", "DAY_HOUR", "YEAR_MONTH", "DATAMODEL", "LOOKUP", 
		"SAVEDSEARCH", "INT", "INTEGER", "DOUBLE", "LONG", "FLOAT", "STRING", 
		"BOOLEAN", "PIPE", "COMMA", "DOT", "EQUAL", "GREATER", "LESS", "NOT_GREATER", 
		"NOT_LESS", "NOT_EQUAL", "PLUS", "MINUS", "STAR", "DIVIDE", "MODULE", 
		"EXCLAMATION_SYMBOL", "COLON", "LT_PRTHS", "RT_PRTHS", "LT_SQR_PRTHS", 
		"RT_SQR_PRTHS", "SINGLE_QUOTE", "DOUBLE_QUOTE", "BACKTICK", "BIT_NOT_OP", 
		"BIT_AND_OP", "BIT_XOR_OP", "AVG", "COUNT", "DISTINCT_COUNT", "ESTDC", 
		"ESTDC_ERROR", "MAX", "MEAN", "MEDIAN", "MIN", "MODE", "RANGE", "STDEV", 
		"STDEVP", "SUM", "SUMSQ", "VAR_SAMP", "VAR_POP", "STDDEV_SAMP", "STDDEV_POP", 
		"PERCENTILE", "FIRST", "LAST", "LIST", "VALUES", "EARLIEST", "EARLIEST_TIME", 
		"LATEST", "LATEST_TIME", "PER_DAY", "PER_HOUR", "PER_MINUTE", "PER_SECOND", 
		"RATE", "SPARKLINE", "C", "DC", "ABS", "CEIL", "CEILING", "CONV", "CRC32", 
		"E", "EXP", "FLOOR", "LN", "LOG", "LOG10", "LOG2", "MOD", "PI", "POW", 
		"POWER", "RAND", "ROUND", "SIGN", "SQRT", "TRUNCATE", "ACOS", "ASIN", 
		"ATAN", "ATAN2", "COS", "COT", "DEGREES", "RADIANS", "SIN", "TAN", "ADDDATE", 
		"DATE", "DATE_ADD", "DATE_SUB", "DAYOFMONTH", "DAYOFWEEK", "DAYOFYEAR", 
		"DAYNAME", "FROM_DAYS", "MONTHNAME", "SUBDATE", "TIME", "TIME_TO_SEC", 
		"TIMESTAMP", "DATE_FORMAT", "TO_DAYS", "SUBSTR", "SUBSTRING", "LTRIM", 
		"RTRIM", "TRIM", "TO", "LOWER", "UPPER", "CONCAT", "CONCAT_WS", "LENGTH", 
		"STRCMP", "RIGHT", "LEFT", "ASCII", "LOCATE", "REPLACE", "CAST", "LIKE", 
		"ISNULL", "ISNOTNULL", "IFNULL", "NULLIF", "IF", "MATCH", "MATCH_PHRASE", 
		"SIMPLE_QUERY_STRING", "ALLOW_LEADING_WILDCARD", "ANALYZE_WILDCARD", "ANALYZER", 
		"AUTO_GENERATE_SYNONYMS_PHRASE_QUERY", "BOOST", "CUTOFF_FREQUENCY", "DEFAULT_FIELD", 
		"DEFAULT_OPERATOR", "ENABLE_POSITION_INCREMENTS", "FLAGS", "FUZZY_MAX_EXPANSIONS", 
		"FUZZY_PREFIX_LENGTH", "FUZZY_TRANSPOSITIONS", "FUZZY_REWRITE", "FUZZINESS", 
		"LENIENT", "LOW_FREQ_OPERATOR", "MAX_DETERMINIZED_STATES", "MAX_EXPANSIONS", 
		"MINIMUM_SHOULD_MATCH", "OPERATOR", "PHRASE_SLOP", "PREFIX_LENGTH", "QUOTE_ANALYZER", 
		"QUOTE_FIELD_SUFFIX", "REWRITE", "SLOP", "TIE_BREAKER", "TYPE", "ZERO_TERMS_QUERY", 
		"SPAN", "MS", "S", "M", "H", "W", "Q", "Y", "ID", "INTEGER_LITERAL", "DECIMAL_LITERAL", 
		"ID_DATE_SUFFIX", "DQUOTA_STRING", "SQUOTA_STRING", "BQUOTA_STRING", "ERROR_RECOGNITION",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(OpenSearchPPLParser._LITERAL_NAMES, OpenSearchPPLParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return OpenSearchPPLParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "OpenSearchPPLParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return OpenSearchPPLParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return OpenSearchPPLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(OpenSearchPPLParser._ATN, this);
	}
	// @RuleVersion(0)
	public root(): RootContext {
		let _localctx: RootContext = new RootContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, OpenSearchPPLParser.RULE_root);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << OpenSearchPPLParser.SEARCH) | (1 << OpenSearchPPLParser.SOURCE) | (1 << OpenSearchPPLParser.INDEX) | (1 << OpenSearchPPLParser.D))) !== 0) || ((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & ((1 << (OpenSearchPPLParser.NOT - 48)) | (1 << (OpenSearchPPLParser.TRUE - 48)) | (1 << (OpenSearchPPLParser.FALSE - 48)) | (1 << (OpenSearchPPLParser.INTERVAL - 48)) | (1 << (OpenSearchPPLParser.MICROSECOND - 48)) | (1 << (OpenSearchPPLParser.MILLISECOND - 48)) | (1 << (OpenSearchPPLParser.SECOND - 48)) | (1 << (OpenSearchPPLParser.MINUTE - 48)) | (1 << (OpenSearchPPLParser.HOUR - 48)) | (1 << (OpenSearchPPLParser.DAY - 48)) | (1 << (OpenSearchPPLParser.WEEK - 48)) | (1 << (OpenSearchPPLParser.MONTH - 48)) | (1 << (OpenSearchPPLParser.QUARTER - 48)) | (1 << (OpenSearchPPLParser.YEAR - 48)))) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & ((1 << (OpenSearchPPLParser.DOT - 90)) | (1 << (OpenSearchPPLParser.PLUS - 90)) | (1 << (OpenSearchPPLParser.MINUS - 90)) | (1 << (OpenSearchPPLParser.LT_PRTHS - 90)) | (1 << (OpenSearchPPLParser.BACKTICK - 90)) | (1 << (OpenSearchPPLParser.AVG - 90)) | (1 << (OpenSearchPPLParser.COUNT - 90)) | (1 << (OpenSearchPPLParser.MAX - 90)))) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & ((1 << (OpenSearchPPLParser.MIN - 122)) | (1 << (OpenSearchPPLParser.SUM - 122)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 122)) | (1 << (OpenSearchPPLParser.VAR_POP - 122)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 122)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 122)) | (1 << (OpenSearchPPLParser.FIRST - 122)) | (1 << (OpenSearchPPLParser.LAST - 122)) | (1 << (OpenSearchPPLParser.ABS - 122)) | (1 << (OpenSearchPPLParser.CEIL - 122)) | (1 << (OpenSearchPPLParser.CEILING - 122)) | (1 << (OpenSearchPPLParser.CONV - 122)))) !== 0) || ((((_la - 154)) & ~0x1F) === 0 && ((1 << (_la - 154)) & ((1 << (OpenSearchPPLParser.CRC32 - 154)) | (1 << (OpenSearchPPLParser.E - 154)) | (1 << (OpenSearchPPLParser.EXP - 154)) | (1 << (OpenSearchPPLParser.FLOOR - 154)) | (1 << (OpenSearchPPLParser.LN - 154)) | (1 << (OpenSearchPPLParser.LOG - 154)) | (1 << (OpenSearchPPLParser.LOG10 - 154)) | (1 << (OpenSearchPPLParser.LOG2 - 154)) | (1 << (OpenSearchPPLParser.MOD - 154)) | (1 << (OpenSearchPPLParser.PI - 154)) | (1 << (OpenSearchPPLParser.POW - 154)) | (1 << (OpenSearchPPLParser.POWER - 154)) | (1 << (OpenSearchPPLParser.RAND - 154)) | (1 << (OpenSearchPPLParser.ROUND - 154)) | (1 << (OpenSearchPPLParser.SIGN - 154)) | (1 << (OpenSearchPPLParser.SQRT - 154)) | (1 << (OpenSearchPPLParser.TRUNCATE - 154)) | (1 << (OpenSearchPPLParser.ACOS - 154)) | (1 << (OpenSearchPPLParser.ASIN - 154)) | (1 << (OpenSearchPPLParser.ATAN - 154)) | (1 << (OpenSearchPPLParser.ATAN2 - 154)) | (1 << (OpenSearchPPLParser.COS - 154)) | (1 << (OpenSearchPPLParser.COT - 154)) | (1 << (OpenSearchPPLParser.DEGREES - 154)) | (1 << (OpenSearchPPLParser.RADIANS - 154)) | (1 << (OpenSearchPPLParser.SIN - 154)) | (1 << (OpenSearchPPLParser.TAN - 154)) | (1 << (OpenSearchPPLParser.ADDDATE - 154)) | (1 << (OpenSearchPPLParser.DATE - 154)) | (1 << (OpenSearchPPLParser.DATE_ADD - 154)) | (1 << (OpenSearchPPLParser.DATE_SUB - 154)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 154)))) !== 0) || ((((_la - 186)) & ~0x1F) === 0 && ((1 << (_la - 186)) & ((1 << (OpenSearchPPLParser.DAYOFWEEK - 186)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 186)) | (1 << (OpenSearchPPLParser.DAYNAME - 186)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 186)) | (1 << (OpenSearchPPLParser.MONTHNAME - 186)) | (1 << (OpenSearchPPLParser.SUBDATE - 186)) | (1 << (OpenSearchPPLParser.TIME - 186)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 186)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 186)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 186)) | (1 << (OpenSearchPPLParser.TO_DAYS - 186)) | (1 << (OpenSearchPPLParser.SUBSTR - 186)) | (1 << (OpenSearchPPLParser.SUBSTRING - 186)) | (1 << (OpenSearchPPLParser.LTRIM - 186)) | (1 << (OpenSearchPPLParser.RTRIM - 186)) | (1 << (OpenSearchPPLParser.TRIM - 186)) | (1 << (OpenSearchPPLParser.LOWER - 186)) | (1 << (OpenSearchPPLParser.UPPER - 186)) | (1 << (OpenSearchPPLParser.CONCAT - 186)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 186)) | (1 << (OpenSearchPPLParser.LENGTH - 186)) | (1 << (OpenSearchPPLParser.STRCMP - 186)) | (1 << (OpenSearchPPLParser.RIGHT - 186)) | (1 << (OpenSearchPPLParser.LEFT - 186)) | (1 << (OpenSearchPPLParser.ASCII - 186)) | (1 << (OpenSearchPPLParser.LOCATE - 186)) | (1 << (OpenSearchPPLParser.REPLACE - 186)) | (1 << (OpenSearchPPLParser.CAST - 186)) | (1 << (OpenSearchPPLParser.LIKE - 186)) | (1 << (OpenSearchPPLParser.ISNULL - 186)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 186)))) !== 0) || ((((_la - 218)) & ~0x1F) === 0 && ((1 << (_la - 218)) & ((1 << (OpenSearchPPLParser.IFNULL - 218)) | (1 << (OpenSearchPPLParser.NULLIF - 218)) | (1 << (OpenSearchPPLParser.IF - 218)) | (1 << (OpenSearchPPLParser.MATCH - 218)) | (1 << (OpenSearchPPLParser.MATCH_PHRASE - 218)) | (1 << (OpenSearchPPLParser.SIMPLE_QUERY_STRING - 218)))) !== 0) || ((((_la - 254)) & ~0x1F) === 0 && ((1 << (_la - 254)) & ((1 << (OpenSearchPPLParser.SPAN - 254)) | (1 << (OpenSearchPPLParser.MS - 254)) | (1 << (OpenSearchPPLParser.S - 254)) | (1 << (OpenSearchPPLParser.M - 254)) | (1 << (OpenSearchPPLParser.H - 254)) | (1 << (OpenSearchPPLParser.W - 254)) | (1 << (OpenSearchPPLParser.Q - 254)) | (1 << (OpenSearchPPLParser.Y - 254)) | (1 << (OpenSearchPPLParser.ID - 254)) | (1 << (OpenSearchPPLParser.INTEGER_LITERAL - 254)) | (1 << (OpenSearchPPLParser.DECIMAL_LITERAL - 254)) | (1 << (OpenSearchPPLParser.DQUOTA_STRING - 254)) | (1 << (OpenSearchPPLParser.SQUOTA_STRING - 254)) | (1 << (OpenSearchPPLParser.BQUOTA_STRING - 254)))) !== 0)) {
				{
				this.state = 170;
				this.pplStatement();
				}
			}

			this.state = 173;
			this.match(OpenSearchPPLParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pplStatement(): PplStatementContext {
		let _localctx: PplStatementContext = new PplStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, OpenSearchPPLParser.RULE_pplStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 175;
			this.searchCommand();
			this.state = 180;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.PIPE) {
				{
				{
				this.state = 176;
				this.match(OpenSearchPPLParser.PIPE);
				this.state = 177;
				this.commands();
				}
				}
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commands(): CommandsContext {
		let _localctx: CommandsContext = new CommandsContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, OpenSearchPPLParser.RULE_commands);
		try {
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.WHERE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 183;
				this.whereCommand();
				}
				break;
			case OpenSearchPPLParser.FIELDS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 184;
				this.fieldsCommand();
				}
				break;
			case OpenSearchPPLParser.RENAME:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 185;
				this.renameCommand();
				}
				break;
			case OpenSearchPPLParser.STATS:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 186;
				this.statsCommand();
				}
				break;
			case OpenSearchPPLParser.DEDUP:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 187;
				this.dedupCommand();
				}
				break;
			case OpenSearchPPLParser.SORT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 188;
				this.sortCommand();
				}
				break;
			case OpenSearchPPLParser.EVAL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 189;
				this.evalCommand();
				}
				break;
			case OpenSearchPPLParser.HEAD:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 190;
				this.headCommand();
				}
				break;
			case OpenSearchPPLParser.TOP:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 191;
				this.topCommand();
				}
				break;
			case OpenSearchPPLParser.RARE:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 192;
				this.rareCommand();
				}
				break;
			case OpenSearchPPLParser.PARSE:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 193;
				this.parseCommand();
				}
				break;
			case OpenSearchPPLParser.KMEANS:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 194;
				this.kmeansCommand();
				}
				break;
			case OpenSearchPPLParser.AD:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 195;
				this.adCommand();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public searchCommand(): SearchCommandContext {
		let _localctx: SearchCommandContext = new SearchCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, OpenSearchPPLParser.RULE_searchCommand);
		let _la: number;
		try {
			this.state = 214;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				_localctx = new SearchFromContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 199;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 198;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 201;
				this.fromClause();
				}
				break;

			case 2:
				_localctx = new SearchFromFilterContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 202;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 205;
				this.fromClause();
				this.state = 206;
				this.logicalExpression(0);
				}
				break;

			case 3:
				_localctx = new SearchFilterFromContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 208;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 211;
				this.logicalExpression(0);
				this.state = 212;
				this.fromClause();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whereCommand(): WhereCommandContext {
		let _localctx: WhereCommandContext = new WhereCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, OpenSearchPPLParser.RULE_whereCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 216;
			this.match(OpenSearchPPLParser.WHERE);
			this.state = 217;
			this.logicalExpression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldsCommand(): FieldsCommandContext {
		let _localctx: FieldsCommandContext = new FieldsCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, OpenSearchPPLParser.RULE_fieldsCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 219;
			this.match(OpenSearchPPLParser.FIELDS);
			this.state = 221;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 220;
				_la = this._input.LA(1);
				if (!(_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 223;
			this.fieldList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public renameCommand(): RenameCommandContext {
		let _localctx: RenameCommandContext = new RenameCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, OpenSearchPPLParser.RULE_renameCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 225;
			this.match(OpenSearchPPLParser.RENAME);
			this.state = 226;
			this.renameClasue();
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 227;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 228;
				this.renameClasue();
				}
				}
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statsCommand(): StatsCommandContext {
		let _localctx: StatsCommandContext = new StatsCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, OpenSearchPPLParser.RULE_statsCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 234;
			this.match(OpenSearchPPLParser.STATS);
			this.state = 238;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PARTITIONS) {
				{
				this.state = 235;
				this.match(OpenSearchPPLParser.PARTITIONS);
				this.state = 236;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 237;
				_localctx._partitions = this.integerLiteral();
				}
			}

			this.state = 243;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.ALLNUM) {
				{
				this.state = 240;
				this.match(OpenSearchPPLParser.ALLNUM);
				this.state = 241;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 242;
				_localctx._allnum = this.booleanLiteral();
				}
			}

			this.state = 248;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.DELIM) {
				{
				this.state = 245;
				this.match(OpenSearchPPLParser.DELIM);
				this.state = 246;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 247;
				_localctx._delim = this.stringLiteral();
				}
			}

			this.state = 250;
			this.statsAggTerm();
			this.state = 255;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 251;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 252;
				this.statsAggTerm();
				}
				}
				this.state = 257;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 259;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 258;
				this.statsByClause();
				}
			}

			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.DEDUP_SPLITVALUES) {
				{
				this.state = 261;
				this.match(OpenSearchPPLParser.DEDUP_SPLITVALUES);
				this.state = 262;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 263;
				_localctx._dedupsplit = this.booleanLiteral();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dedupCommand(): DedupCommandContext {
		let _localctx: DedupCommandContext = new DedupCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, OpenSearchPPLParser.RULE_dedupCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this.match(OpenSearchPPLParser.DEDUP);
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 267;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 270;
			this.fieldList();
			this.state = 274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.KEEPEMPTY) {
				{
				this.state = 271;
				this.match(OpenSearchPPLParser.KEEPEMPTY);
				this.state = 272;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 273;
				_localctx._keepempty = this.booleanLiteral();
				}
			}

			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.CONSECUTIVE) {
				{
				this.state = 276;
				this.match(OpenSearchPPLParser.CONSECUTIVE);
				this.state = 277;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 278;
				_localctx._consecutive = this.booleanLiteral();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sortCommand(): SortCommandContext {
		let _localctx: SortCommandContext = new SortCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, OpenSearchPPLParser.RULE_sortCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 281;
			this.match(OpenSearchPPLParser.SORT);
			this.state = 282;
			this.sortbyClause();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalCommand(): EvalCommandContext {
		let _localctx: EvalCommandContext = new EvalCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, OpenSearchPPLParser.RULE_evalCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			this.match(OpenSearchPPLParser.EVAL);
			this.state = 285;
			this.evalClause();
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 286;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 287;
				this.evalClause();
				}
				}
				this.state = 292;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public headCommand(): HeadCommandContext {
		let _localctx: HeadCommandContext = new HeadCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, OpenSearchPPLParser.RULE_headCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 293;
			this.match(OpenSearchPPLParser.HEAD);
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 294;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.FROM) {
				{
				this.state = 297;
				this.match(OpenSearchPPLParser.FROM);
				this.state = 298;
				_localctx._from = this.integerLiteral();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public topCommand(): TopCommandContext {
		let _localctx: TopCommandContext = new TopCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, OpenSearchPPLParser.RULE_topCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this.match(OpenSearchPPLParser.TOP);
			this.state = 303;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 302;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 305;
			this.fieldList();
			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 306;
				this.byClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rareCommand(): RareCommandContext {
		let _localctx: RareCommandContext = new RareCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, OpenSearchPPLParser.RULE_rareCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 309;
			this.match(OpenSearchPPLParser.RARE);
			this.state = 310;
			this.fieldList();
			this.state = 312;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 311;
				this.byClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parseCommand(): ParseCommandContext {
		let _localctx: ParseCommandContext = new ParseCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, OpenSearchPPLParser.RULE_parseCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this.match(OpenSearchPPLParser.PARSE);
			this.state = 315;
			this.expression();
			this.state = 316;
			this.pattern();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public kmeansCommand(): KmeansCommandContext {
		let _localctx: KmeansCommandContext = new KmeansCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, OpenSearchPPLParser.RULE_kmeansCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 318;
			this.match(OpenSearchPPLParser.KMEANS);
			this.state = 322;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (OpenSearchPPLParser.CENTROIDS - 33)) | (1 << (OpenSearchPPLParser.ITERATIONS - 33)) | (1 << (OpenSearchPPLParser.DISTANCE_TYPE - 33)))) !== 0)) {
				{
				{
				this.state = 319;
				this.kmeansParameter();
				}
				}
				this.state = 324;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public kmeansParameter(): KmeansParameterContext {
		let _localctx: KmeansParameterContext = new KmeansParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, OpenSearchPPLParser.RULE_kmeansParameter);
		try {
			this.state = 334;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.CENTROIDS:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 325;
				this.match(OpenSearchPPLParser.CENTROIDS);
				this.state = 326;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 327;
				_localctx._centroids = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ITERATIONS:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 328;
				this.match(OpenSearchPPLParser.ITERATIONS);
				this.state = 329;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 330;
				_localctx._iterations = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.DISTANCE_TYPE:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 331;
				this.match(OpenSearchPPLParser.DISTANCE_TYPE);
				this.state = 332;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 333;
				_localctx._distance_type = this.stringLiteral();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public adCommand(): AdCommandContext {
		let _localctx: AdCommandContext = new AdCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, OpenSearchPPLParser.RULE_adCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 336;
			this.match(OpenSearchPPLParser.AD);
			this.state = 340;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (OpenSearchPPLParser.NUMBER_OF_TREES - 36)) | (1 << (OpenSearchPPLParser.SHINGLE_SIZE - 36)) | (1 << (OpenSearchPPLParser.SAMPLE_SIZE - 36)) | (1 << (OpenSearchPPLParser.OUTPUT_AFTER - 36)) | (1 << (OpenSearchPPLParser.TIME_DECAY - 36)) | (1 << (OpenSearchPPLParser.ANOMALY_RATE - 36)) | (1 << (OpenSearchPPLParser.TIME_FIELD - 36)) | (1 << (OpenSearchPPLParser.TIME_ZONE - 36)) | (1 << (OpenSearchPPLParser.TRAINING_DATA_SIZE - 36)) | (1 << (OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD - 36)))) !== 0) || _la === OpenSearchPPLParser.DATE_FORMAT) {
				{
				{
				this.state = 337;
				this.adParameter();
				}
				}
				this.state = 342;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public adParameter(): AdParameterContext {
		let _localctx: AdParameterContext = new AdParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, OpenSearchPPLParser.RULE_adParameter);
		try {
			this.state = 376;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.NUMBER_OF_TREES:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 343;
				this.match(OpenSearchPPLParser.NUMBER_OF_TREES);
				this.state = 344;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 345;
				_localctx._number_of_trees = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.SHINGLE_SIZE:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 346;
				this.match(OpenSearchPPLParser.SHINGLE_SIZE);
				this.state = 347;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 348;
				_localctx._shingle_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.SAMPLE_SIZE:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 349;
				this.match(OpenSearchPPLParser.SAMPLE_SIZE);
				this.state = 350;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 351;
				_localctx._sample_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.OUTPUT_AFTER:
				this.enterOuterAlt(_localctx, 4);
				{
				{
				this.state = 352;
				this.match(OpenSearchPPLParser.OUTPUT_AFTER);
				this.state = 353;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 354;
				_localctx._output_after = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_DECAY:
				this.enterOuterAlt(_localctx, 5);
				{
				{
				this.state = 355;
				this.match(OpenSearchPPLParser.TIME_DECAY);
				this.state = 356;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 357;
				_localctx._time_decay = this.decimalLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ANOMALY_RATE:
				this.enterOuterAlt(_localctx, 6);
				{
				{
				this.state = 358;
				this.match(OpenSearchPPLParser.ANOMALY_RATE);
				this.state = 359;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 360;
				_localctx._anomaly_rate = this.decimalLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_FIELD:
				this.enterOuterAlt(_localctx, 7);
				{
				{
				this.state = 361;
				this.match(OpenSearchPPLParser.TIME_FIELD);
				this.state = 362;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 363;
				_localctx._time_field = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.DATE_FORMAT:
				this.enterOuterAlt(_localctx, 8);
				{
				{
				this.state = 364;
				this.match(OpenSearchPPLParser.DATE_FORMAT);
				this.state = 365;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 366;
				_localctx._date_format = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_ZONE:
				this.enterOuterAlt(_localctx, 9);
				{
				{
				this.state = 367;
				this.match(OpenSearchPPLParser.TIME_ZONE);
				this.state = 368;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 369;
				_localctx._time_zone = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TRAINING_DATA_SIZE:
				this.enterOuterAlt(_localctx, 10);
				{
				{
				this.state = 370;
				this.match(OpenSearchPPLParser.TRAINING_DATA_SIZE);
				this.state = 371;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 372;
				_localctx._training_data_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD:
				this.enterOuterAlt(_localctx, 11);
				{
				{
				this.state = 373;
				this.match(OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD);
				this.state = 374;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 375;
				_localctx._anomaly_score_threshold = this.decimalLiteral();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromClause(): FromClauseContext {
		let _localctx: FromClauseContext = new FromClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, OpenSearchPPLParser.RULE_fromClause);
		let _la: number;
		try {
			this.state = 398;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.SOURCE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 378;
				this.match(OpenSearchPPLParser.SOURCE);
				this.state = 379;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 380;
				this.tableSource();
				this.state = 385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === OpenSearchPPLParser.COMMA) {
					{
					{
					this.state = 381;
					this.match(OpenSearchPPLParser.COMMA);
					this.state = 382;
					this.tableSource();
					}
					}
					this.state = 387;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case OpenSearchPPLParser.INDEX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 388;
				this.match(OpenSearchPPLParser.INDEX);
				this.state = 389;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 390;
				this.tableSource();
				this.state = 395;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === OpenSearchPPLParser.COMMA) {
					{
					{
					this.state = 391;
					this.match(OpenSearchPPLParser.COMMA);
					this.state = 392;
					this.tableSource();
					}
					}
					this.state = 397;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public renameClasue(): RenameClasueContext {
		let _localctx: RenameClasueContext = new RenameClasueContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, OpenSearchPPLParser.RULE_renameClasue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 400;
			_localctx._orignalField = this.wcFieldExpression();
			this.state = 401;
			this.match(OpenSearchPPLParser.AS);
			this.state = 402;
			_localctx._renamedField = this.wcFieldExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public byClause(): ByClauseContext {
		let _localctx: ByClauseContext = new ByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, OpenSearchPPLParser.RULE_byClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this.match(OpenSearchPPLParser.BY);
			this.state = 405;
			this.fieldList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statsByClause(): StatsByClauseContext {
		let _localctx: StatsByClauseContext = new StatsByClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, OpenSearchPPLParser.RULE_statsByClause);
		try {
			this.state = 416;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 407;
				this.match(OpenSearchPPLParser.BY);
				this.state = 408;
				this.fieldList();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 409;
				this.match(OpenSearchPPLParser.BY);
				this.state = 410;
				this.bySpanClause();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 411;
				this.match(OpenSearchPPLParser.BY);
				this.state = 412;
				this.bySpanClause();
				this.state = 413;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 414;
				this.fieldList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public bySpanClause(): BySpanClauseContext {
		let _localctx: BySpanClauseContext = new BySpanClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, OpenSearchPPLParser.RULE_bySpanClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 418;
			this.spanClause();
			this.state = 421;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.AS) {
				{
				this.state = 419;
				this.match(OpenSearchPPLParser.AS);
				this.state = 420;
				_localctx._alias = this.qualifiedName();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public spanClause(): SpanClauseContext {
		let _localctx: SpanClauseContext = new SpanClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, OpenSearchPPLParser.RULE_spanClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 423;
			this.match(OpenSearchPPLParser.SPAN);
			this.state = 424;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 425;
			this.fieldExpression();
			this.state = 426;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 427;
			_localctx._value = this.literalValue();
			this.state = 429;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.D || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & ((1 << (OpenSearchPPLParser.MILLISECOND - 58)) | (1 << (OpenSearchPPLParser.SECOND - 58)) | (1 << (OpenSearchPPLParser.MINUTE - 58)) | (1 << (OpenSearchPPLParser.HOUR - 58)) | (1 << (OpenSearchPPLParser.DAY - 58)) | (1 << (OpenSearchPPLParser.WEEK - 58)) | (1 << (OpenSearchPPLParser.MONTH - 58)) | (1 << (OpenSearchPPLParser.QUARTER - 58)) | (1 << (OpenSearchPPLParser.YEAR - 58)))) !== 0) || ((((_la - 255)) & ~0x1F) === 0 && ((1 << (_la - 255)) & ((1 << (OpenSearchPPLParser.MS - 255)) | (1 << (OpenSearchPPLParser.S - 255)) | (1 << (OpenSearchPPLParser.M - 255)) | (1 << (OpenSearchPPLParser.H - 255)) | (1 << (OpenSearchPPLParser.W - 255)) | (1 << (OpenSearchPPLParser.Q - 255)) | (1 << (OpenSearchPPLParser.Y - 255)))) !== 0)) {
				{
				this.state = 428;
				_localctx._unit = this.timespanUnit();
				}
			}

			this.state = 431;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sortbyClause(): SortbyClauseContext {
		let _localctx: SortbyClauseContext = new SortbyClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, OpenSearchPPLParser.RULE_sortbyClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 433;
			this.sortField();
			this.state = 438;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 434;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 435;
				this.sortField();
				}
				}
				this.state = 440;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalClause(): EvalClauseContext {
		let _localctx: EvalClauseContext = new EvalClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, OpenSearchPPLParser.RULE_evalClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 441;
			this.fieldExpression();
			this.state = 442;
			this.match(OpenSearchPPLParser.EQUAL);
			this.state = 443;
			this.expression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statsAggTerm(): StatsAggTermContext {
		let _localctx: StatsAggTermContext = new StatsAggTermContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, OpenSearchPPLParser.RULE_statsAggTerm);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 445;
			this.statsFunction();
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.AS) {
				{
				this.state = 446;
				this.match(OpenSearchPPLParser.AS);
				this.state = 447;
				_localctx._alias = this.wcFieldExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statsFunction(): StatsFunctionContext {
		let _localctx: StatsFunctionContext = new StatsFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, OpenSearchPPLParser.RULE_statsFunction);
		let _la: number;
		try {
			this.state = 464;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				_localctx = new StatsFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 450;
				this.statsFunctionName();
				this.state = 451;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 452;
				this.valueExpression(0);
				this.state = 453;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 2:
				_localctx = new CountAllFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 455;
				this.match(OpenSearchPPLParser.COUNT);
				this.state = 456;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 457;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 3:
				_localctx = new DistinctCountFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 458;
				_la = this._input.LA(1);
				if (!(_la === OpenSearchPPLParser.DISTINCT_COUNT || _la === OpenSearchPPLParser.DC)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 459;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 460;
				this.valueExpression(0);
				this.state = 461;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 4:
				_localctx = new PercentileAggFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 463;
				this.percentileAggFunction();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statsFunctionName(): StatsFunctionNameContext {
		let _localctx: StatsFunctionNameContext = new StatsFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, OpenSearchPPLParser.RULE_statsFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 466;
			_la = this._input.LA(1);
			if (!(((((_la - 114)) & ~0x1F) === 0 && ((1 << (_la - 114)) & ((1 << (OpenSearchPPLParser.AVG - 114)) | (1 << (OpenSearchPPLParser.COUNT - 114)) | (1 << (OpenSearchPPLParser.MAX - 114)) | (1 << (OpenSearchPPLParser.MIN - 114)) | (1 << (OpenSearchPPLParser.SUM - 114)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 114)) | (1 << (OpenSearchPPLParser.VAR_POP - 114)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 114)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 114)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public percentileAggFunction(): PercentileAggFunctionContext {
		let _localctx: PercentileAggFunctionContext = new PercentileAggFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, OpenSearchPPLParser.RULE_percentileAggFunction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 468;
			this.match(OpenSearchPPLParser.PERCENTILE);
			this.state = 469;
			this.match(OpenSearchPPLParser.LESS);
			this.state = 470;
			_localctx._value = this.integerLiteral();
			this.state = 471;
			this.match(OpenSearchPPLParser.GREATER);
			this.state = 472;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 473;
			_localctx._aggField = this.fieldExpression();
			this.state = 474;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, OpenSearchPPLParser.RULE_expression);
		try {
			this.state = 479;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 476;
				this.logicalExpression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 477;
				this.comparisonExpression();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 478;
				this.valueExpression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public logicalExpression(): LogicalExpressionContext;
	public logicalExpression(_p: number): LogicalExpressionContext;
	// @RuleVersion(0)
	public logicalExpression(_p?: number): LogicalExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: LogicalExpressionContext = new LogicalExpressionContext(this._ctx, _parentState);
		let _prevctx: LogicalExpressionContext = _localctx;
		let _startState: number = 64;
		this.enterRecursionRule(_localctx, 64, OpenSearchPPLParser.RULE_logicalExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 487;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				{
				_localctx = new ComparsionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 482;
				this.comparisonExpression();
				}
				break;

			case 2:
				{
				_localctx = new LogicalNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 483;
				this.match(OpenSearchPPLParser.NOT);
				this.state = 484;
				this.logicalExpression(6);
				}
				break;

			case 3:
				{
				_localctx = new BooleanExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 485;
				this.booleanExpression();
				}
				break;

			case 4:
				{
				_localctx = new RelevanceExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 486;
				this.relevanceExpression();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 502;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 500;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
					case 1:
						{
						_localctx = new LogicalOrContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalOrContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 489;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 490;
						this.match(OpenSearchPPLParser.OR);
						this.state = 491;
						(_localctx as LogicalOrContext)._right = this.logicalExpression(6);
						}
						break;

					case 2:
						{
						_localctx = new LogicalAndContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalAndContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 492;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 494;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === OpenSearchPPLParser.AND) {
							{
							this.state = 493;
							this.match(OpenSearchPPLParser.AND);
							}
						}

						this.state = 496;
						(_localctx as LogicalAndContext)._right = this.logicalExpression(5);
						}
						break;

					case 3:
						{
						_localctx = new LogicalXorContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalXorContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 497;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 498;
						this.match(OpenSearchPPLParser.XOR);
						this.state = 499;
						(_localctx as LogicalXorContext)._right = this.logicalExpression(4);
						}
						break;
					}
					}
				}
				this.state = 504;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonExpression(): ComparisonExpressionContext {
		let _localctx: ComparisonExpressionContext = new ComparisonExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, OpenSearchPPLParser.RULE_comparisonExpression);
		try {
			this.state = 513;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				_localctx = new CompareExprContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 505;
				(_localctx as CompareExprContext)._left = this.valueExpression(0);
				this.state = 506;
				this.comparisonOperator();
				this.state = 507;
				(_localctx as CompareExprContext)._right = this.valueExpression(0);
				}
				break;

			case 2:
				_localctx = new InExprContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 509;
				this.valueExpression(0);
				this.state = 510;
				this.match(OpenSearchPPLParser.IN);
				this.state = 511;
				this.valueList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public valueExpression(): ValueExpressionContext;
	public valueExpression(_p: number): ValueExpressionContext;
	// @RuleVersion(0)
	public valueExpression(_p?: number): ValueExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ValueExpressionContext = new ValueExpressionContext(this._ctx, _parentState);
		let _prevctx: ValueExpressionContext = _localctx;
		let _startState: number = 68;
		this.enterRecursionRule(_localctx, 68, OpenSearchPPLParser.RULE_valueExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 523;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.LT_PRTHS:
				{
				_localctx = new ParentheticBinaryArithmeticContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 516;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 517;
				(_localctx as ParentheticBinaryArithmeticContext)._left = this.valueExpression(0);
				this.state = 518;
				this.binaryOperator();
				this.state = 519;
				(_localctx as ParentheticBinaryArithmeticContext)._right = this.valueExpression(0);
				this.state = 520;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.TRUE:
			case OpenSearchPPLParser.FALSE:
			case OpenSearchPPLParser.INTERVAL:
			case OpenSearchPPLParser.MICROSECOND:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.PLUS:
			case OpenSearchPPLParser.MINUS:
			case OpenSearchPPLParser.BACKTICK:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.ABS:
			case OpenSearchPPLParser.CEIL:
			case OpenSearchPPLParser.CEILING:
			case OpenSearchPPLParser.CONV:
			case OpenSearchPPLParser.CRC32:
			case OpenSearchPPLParser.E:
			case OpenSearchPPLParser.EXP:
			case OpenSearchPPLParser.FLOOR:
			case OpenSearchPPLParser.LN:
			case OpenSearchPPLParser.LOG:
			case OpenSearchPPLParser.LOG10:
			case OpenSearchPPLParser.LOG2:
			case OpenSearchPPLParser.MOD:
			case OpenSearchPPLParser.PI:
			case OpenSearchPPLParser.POW:
			case OpenSearchPPLParser.POWER:
			case OpenSearchPPLParser.RAND:
			case OpenSearchPPLParser.ROUND:
			case OpenSearchPPLParser.SIGN:
			case OpenSearchPPLParser.SQRT:
			case OpenSearchPPLParser.TRUNCATE:
			case OpenSearchPPLParser.ACOS:
			case OpenSearchPPLParser.ASIN:
			case OpenSearchPPLParser.ATAN:
			case OpenSearchPPLParser.ATAN2:
			case OpenSearchPPLParser.COS:
			case OpenSearchPPLParser.COT:
			case OpenSearchPPLParser.DEGREES:
			case OpenSearchPPLParser.RADIANS:
			case OpenSearchPPLParser.SIN:
			case OpenSearchPPLParser.TAN:
			case OpenSearchPPLParser.ADDDATE:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.SUBSTR:
			case OpenSearchPPLParser.SUBSTRING:
			case OpenSearchPPLParser.LTRIM:
			case OpenSearchPPLParser.RTRIM:
			case OpenSearchPPLParser.TRIM:
			case OpenSearchPPLParser.LOWER:
			case OpenSearchPPLParser.UPPER:
			case OpenSearchPPLParser.CONCAT:
			case OpenSearchPPLParser.CONCAT_WS:
			case OpenSearchPPLParser.LENGTH:
			case OpenSearchPPLParser.STRCMP:
			case OpenSearchPPLParser.RIGHT:
			case OpenSearchPPLParser.LEFT:
			case OpenSearchPPLParser.ASCII:
			case OpenSearchPPLParser.LOCATE:
			case OpenSearchPPLParser.REPLACE:
			case OpenSearchPPLParser.CAST:
			case OpenSearchPPLParser.LIKE:
			case OpenSearchPPLParser.ISNULL:
			case OpenSearchPPLParser.ISNOTNULL:
			case OpenSearchPPLParser.IFNULL:
			case OpenSearchPPLParser.NULLIF:
			case OpenSearchPPLParser.IF:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
			case OpenSearchPPLParser.ID:
			case OpenSearchPPLParser.INTEGER_LITERAL:
			case OpenSearchPPLParser.DECIMAL_LITERAL:
			case OpenSearchPPLParser.DQUOTA_STRING:
			case OpenSearchPPLParser.SQUOTA_STRING:
			case OpenSearchPPLParser.BQUOTA_STRING:
				{
				_localctx = new ValueExpressionDefaultContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 522;
				this.primaryExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 531;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new BinaryArithmeticContext(new ValueExpressionContext(_parentctx, _parentState));
					(_localctx as BinaryArithmeticContext)._left = _prevctx;
					this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_valueExpression);
					this.state = 525;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 526;
					this.binaryOperator();
					this.state = 527;
					(_localctx as BinaryArithmeticContext)._right = this.valueExpression(4);
					}
					}
				}
				this.state = 533;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primaryExpression(): PrimaryExpressionContext {
		let _localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, OpenSearchPPLParser.RULE_primaryExpression);
		try {
			this.state = 538;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 534;
				this.evalFunctionCall();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 535;
				this.dataTypeFunctionCall();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 536;
				this.fieldExpression();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 537;
				this.literalValue();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanExpression(): BooleanExpressionContext {
		let _localctx: BooleanExpressionContext = new BooleanExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, OpenSearchPPLParser.RULE_booleanExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 540;
			this.booleanFunctionCall();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceExpression(): RelevanceExpressionContext {
		let _localctx: RelevanceExpressionContext = new RelevanceExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, OpenSearchPPLParser.RULE_relevanceExpression);
		try {
			this.state = 544;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.MATCH:
			case OpenSearchPPLParser.MATCH_PHRASE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 542;
				this.singleFieldRelevanceFunction();
				}
				break;
			case OpenSearchPPLParser.SIMPLE_QUERY_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 543;
				this.multiFieldRelevanceFunction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public singleFieldRelevanceFunction(): SingleFieldRelevanceFunctionContext {
		let _localctx: SingleFieldRelevanceFunctionContext = new SingleFieldRelevanceFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, OpenSearchPPLParser.RULE_singleFieldRelevanceFunction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 546;
			this.singleFieldRelevanceFunctionName();
			this.state = 547;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 548;
			_localctx._field = this.relevanceField();
			this.state = 549;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 550;
			_localctx._query = this.relevanceQuery();
			this.state = 555;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 551;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 552;
				this.relevanceArg();
				}
				}
				this.state = 557;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 558;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiFieldRelevanceFunction(): MultiFieldRelevanceFunctionContext {
		let _localctx: MultiFieldRelevanceFunctionContext = new MultiFieldRelevanceFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, OpenSearchPPLParser.RULE_multiFieldRelevanceFunction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 560;
			this.multiFieldRelevanceFunctionName();
			this.state = 561;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 562;
			this.match(OpenSearchPPLParser.LT_SQR_PRTHS);
			this.state = 563;
			_localctx._field = this.relevanceFieldAndWeight();
			this.state = 568;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 564;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 565;
				_localctx._field = this.relevanceFieldAndWeight();
				}
				}
				this.state = 570;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 571;
			this.match(OpenSearchPPLParser.RT_SQR_PRTHS);
			this.state = 572;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 573;
			_localctx._query = this.relevanceQuery();
			this.state = 578;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 574;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 575;
				this.relevanceArg();
				}
				}
				this.state = 580;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 581;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableSource(): TableSourceContext {
		let _localctx: TableSourceContext = new TableSourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, OpenSearchPPLParser.RULE_tableSource);
		try {
			this.state = 585;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.BACKTICK:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
			case OpenSearchPPLParser.ID:
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 583;
				this.qualifiedName();
				}
				break;
			case OpenSearchPPLParser.ID_DATE_SUFFIX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 584;
				this.match(OpenSearchPPLParser.ID_DATE_SUFFIX);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldList(): FieldListContext {
		let _localctx: FieldListContext = new FieldListContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, OpenSearchPPLParser.RULE_fieldList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 587;
			this.fieldExpression();
			this.state = 592;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 588;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 589;
				this.fieldExpression();
				}
				}
				this.state = 594;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wcFieldList(): WcFieldListContext {
		let _localctx: WcFieldListContext = new WcFieldListContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, OpenSearchPPLParser.RULE_wcFieldList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 595;
			this.wcFieldExpression();
			this.state = 600;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 596;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 597;
				this.wcFieldExpression();
				}
				}
				this.state = 602;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sortField(): SortFieldContext {
		let _localctx: SortFieldContext = new SortFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, OpenSearchPPLParser.RULE_sortField);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 604;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 603;
				_la = this._input.LA(1);
				if (!(_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 606;
			this.sortFieldExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sortFieldExpression(): SortFieldExpressionContext {
		let _localctx: SortFieldExpressionContext = new SortFieldExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, OpenSearchPPLParser.RULE_sortFieldExpression);
		try {
			this.state = 629;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.BACKTICK:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
			case OpenSearchPPLParser.ID:
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 608;
				this.fieldExpression();
				}
				break;
			case OpenSearchPPLParser.AUTO:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 609;
				this.match(OpenSearchPPLParser.AUTO);
				this.state = 610;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 611;
				this.fieldExpression();
				this.state = 612;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.STR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 614;
				this.match(OpenSearchPPLParser.STR);
				this.state = 615;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 616;
				this.fieldExpression();
				this.state = 617;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.IP:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 619;
				this.match(OpenSearchPPLParser.IP);
				this.state = 620;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 621;
				this.fieldExpression();
				this.state = 622;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.NUM:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 624;
				this.match(OpenSearchPPLParser.NUM);
				this.state = 625;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 626;
				this.fieldExpression();
				this.state = 627;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldExpression(): FieldExpressionContext {
		let _localctx: FieldExpressionContext = new FieldExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, OpenSearchPPLParser.RULE_fieldExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 631;
			this.qualifiedName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wcFieldExpression(): WcFieldExpressionContext {
		let _localctx: WcFieldExpressionContext = new WcFieldExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, OpenSearchPPLParser.RULE_wcFieldExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 633;
			this.wcQualifiedName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalFunctionCall(): EvalFunctionCallContext {
		let _localctx: EvalFunctionCallContext = new EvalFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, OpenSearchPPLParser.RULE_evalFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 635;
			this.evalFunctionName();
			this.state = 636;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 637;
			this.functionArgs();
			this.state = 638;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataTypeFunctionCall(): DataTypeFunctionCallContext {
		let _localctx: DataTypeFunctionCallContext = new DataTypeFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, OpenSearchPPLParser.RULE_dataTypeFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 640;
			this.match(OpenSearchPPLParser.CAST);
			this.state = 641;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 642;
			this.expression();
			this.state = 643;
			this.match(OpenSearchPPLParser.AS);
			this.state = 644;
			this.convertedDataType();
			this.state = 645;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanFunctionCall(): BooleanFunctionCallContext {
		let _localctx: BooleanFunctionCallContext = new BooleanFunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, OpenSearchPPLParser.RULE_booleanFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 647;
			this.conditionFunctionBase();
			this.state = 648;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 649;
			this.functionArgs();
			this.state = 650;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public convertedDataType(): ConvertedDataTypeContext {
		let _localctx: ConvertedDataTypeContext = new ConvertedDataTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, OpenSearchPPLParser.RULE_convertedDataType);
		try {
			this.state = 662;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.DATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 652;
				_localctx._typeName = this.match(OpenSearchPPLParser.DATE);
				}
				break;
			case OpenSearchPPLParser.TIME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 653;
				_localctx._typeName = this.match(OpenSearchPPLParser.TIME);
				}
				break;
			case OpenSearchPPLParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 654;
				_localctx._typeName = this.match(OpenSearchPPLParser.TIMESTAMP);
				}
				break;
			case OpenSearchPPLParser.INT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 655;
				_localctx._typeName = this.match(OpenSearchPPLParser.INT);
				}
				break;
			case OpenSearchPPLParser.INTEGER:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 656;
				_localctx._typeName = this.match(OpenSearchPPLParser.INTEGER);
				}
				break;
			case OpenSearchPPLParser.DOUBLE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 657;
				_localctx._typeName = this.match(OpenSearchPPLParser.DOUBLE);
				}
				break;
			case OpenSearchPPLParser.LONG:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 658;
				_localctx._typeName = this.match(OpenSearchPPLParser.LONG);
				}
				break;
			case OpenSearchPPLParser.FLOAT:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 659;
				_localctx._typeName = this.match(OpenSearchPPLParser.FLOAT);
				}
				break;
			case OpenSearchPPLParser.STRING:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 660;
				_localctx._typeName = this.match(OpenSearchPPLParser.STRING);
				}
				break;
			case OpenSearchPPLParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 661;
				_localctx._typeName = this.match(OpenSearchPPLParser.BOOLEAN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public evalFunctionName(): EvalFunctionNameContext {
		let _localctx: EvalFunctionNameContext = new EvalFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, OpenSearchPPLParser.RULE_evalFunctionName);
		try {
			this.state = 668;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.ABS:
			case OpenSearchPPLParser.CEIL:
			case OpenSearchPPLParser.CEILING:
			case OpenSearchPPLParser.CONV:
			case OpenSearchPPLParser.CRC32:
			case OpenSearchPPLParser.E:
			case OpenSearchPPLParser.EXP:
			case OpenSearchPPLParser.FLOOR:
			case OpenSearchPPLParser.LN:
			case OpenSearchPPLParser.LOG:
			case OpenSearchPPLParser.LOG10:
			case OpenSearchPPLParser.LOG2:
			case OpenSearchPPLParser.MOD:
			case OpenSearchPPLParser.PI:
			case OpenSearchPPLParser.POW:
			case OpenSearchPPLParser.POWER:
			case OpenSearchPPLParser.RAND:
			case OpenSearchPPLParser.ROUND:
			case OpenSearchPPLParser.SIGN:
			case OpenSearchPPLParser.SQRT:
			case OpenSearchPPLParser.TRUNCATE:
			case OpenSearchPPLParser.ACOS:
			case OpenSearchPPLParser.ASIN:
			case OpenSearchPPLParser.ATAN:
			case OpenSearchPPLParser.ATAN2:
			case OpenSearchPPLParser.COS:
			case OpenSearchPPLParser.COT:
			case OpenSearchPPLParser.DEGREES:
			case OpenSearchPPLParser.RADIANS:
			case OpenSearchPPLParser.SIN:
			case OpenSearchPPLParser.TAN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 664;
				this.mathematicalFunctionBase();
				}
				break;
			case OpenSearchPPLParser.MICROSECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.ADDDATE:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.TO_DAYS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 665;
				this.dateAndTimeFunctionBase();
				}
				break;
			case OpenSearchPPLParser.SUBSTR:
			case OpenSearchPPLParser.SUBSTRING:
			case OpenSearchPPLParser.LTRIM:
			case OpenSearchPPLParser.RTRIM:
			case OpenSearchPPLParser.TRIM:
			case OpenSearchPPLParser.LOWER:
			case OpenSearchPPLParser.UPPER:
			case OpenSearchPPLParser.CONCAT:
			case OpenSearchPPLParser.CONCAT_WS:
			case OpenSearchPPLParser.LENGTH:
			case OpenSearchPPLParser.STRCMP:
			case OpenSearchPPLParser.RIGHT:
			case OpenSearchPPLParser.LEFT:
			case OpenSearchPPLParser.ASCII:
			case OpenSearchPPLParser.LOCATE:
			case OpenSearchPPLParser.REPLACE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 666;
				this.textFunctionBase();
				}
				break;
			case OpenSearchPPLParser.LIKE:
			case OpenSearchPPLParser.ISNULL:
			case OpenSearchPPLParser.ISNOTNULL:
			case OpenSearchPPLParser.IFNULL:
			case OpenSearchPPLParser.NULLIF:
			case OpenSearchPPLParser.IF:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 667;
				this.conditionFunctionBase();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionArgs(): FunctionArgsContext {
		let _localctx: FunctionArgsContext = new FunctionArgsContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, OpenSearchPPLParser.RULE_functionArgs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 678;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.D || ((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & ((1 << (OpenSearchPPLParser.TRUE - 52)) | (1 << (OpenSearchPPLParser.FALSE - 52)) | (1 << (OpenSearchPPLParser.INTERVAL - 52)) | (1 << (OpenSearchPPLParser.MICROSECOND - 52)) | (1 << (OpenSearchPPLParser.MILLISECOND - 52)) | (1 << (OpenSearchPPLParser.SECOND - 52)) | (1 << (OpenSearchPPLParser.MINUTE - 52)) | (1 << (OpenSearchPPLParser.HOUR - 52)) | (1 << (OpenSearchPPLParser.DAY - 52)) | (1 << (OpenSearchPPLParser.WEEK - 52)) | (1 << (OpenSearchPPLParser.MONTH - 52)) | (1 << (OpenSearchPPLParser.QUARTER - 52)) | (1 << (OpenSearchPPLParser.YEAR - 52)))) !== 0) || ((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & ((1 << (OpenSearchPPLParser.DOT - 90)) | (1 << (OpenSearchPPLParser.PLUS - 90)) | (1 << (OpenSearchPPLParser.MINUS - 90)) | (1 << (OpenSearchPPLParser.LT_PRTHS - 90)) | (1 << (OpenSearchPPLParser.BACKTICK - 90)) | (1 << (OpenSearchPPLParser.AVG - 90)) | (1 << (OpenSearchPPLParser.COUNT - 90)) | (1 << (OpenSearchPPLParser.MAX - 90)))) !== 0) || ((((_la - 122)) & ~0x1F) === 0 && ((1 << (_la - 122)) & ((1 << (OpenSearchPPLParser.MIN - 122)) | (1 << (OpenSearchPPLParser.SUM - 122)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 122)) | (1 << (OpenSearchPPLParser.VAR_POP - 122)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 122)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 122)) | (1 << (OpenSearchPPLParser.FIRST - 122)) | (1 << (OpenSearchPPLParser.LAST - 122)) | (1 << (OpenSearchPPLParser.ABS - 122)) | (1 << (OpenSearchPPLParser.CEIL - 122)) | (1 << (OpenSearchPPLParser.CEILING - 122)) | (1 << (OpenSearchPPLParser.CONV - 122)))) !== 0) || ((((_la - 154)) & ~0x1F) === 0 && ((1 << (_la - 154)) & ((1 << (OpenSearchPPLParser.CRC32 - 154)) | (1 << (OpenSearchPPLParser.E - 154)) | (1 << (OpenSearchPPLParser.EXP - 154)) | (1 << (OpenSearchPPLParser.FLOOR - 154)) | (1 << (OpenSearchPPLParser.LN - 154)) | (1 << (OpenSearchPPLParser.LOG - 154)) | (1 << (OpenSearchPPLParser.LOG10 - 154)) | (1 << (OpenSearchPPLParser.LOG2 - 154)) | (1 << (OpenSearchPPLParser.MOD - 154)) | (1 << (OpenSearchPPLParser.PI - 154)) | (1 << (OpenSearchPPLParser.POW - 154)) | (1 << (OpenSearchPPLParser.POWER - 154)) | (1 << (OpenSearchPPLParser.RAND - 154)) | (1 << (OpenSearchPPLParser.ROUND - 154)) | (1 << (OpenSearchPPLParser.SIGN - 154)) | (1 << (OpenSearchPPLParser.SQRT - 154)) | (1 << (OpenSearchPPLParser.TRUNCATE - 154)) | (1 << (OpenSearchPPLParser.ACOS - 154)) | (1 << (OpenSearchPPLParser.ASIN - 154)) | (1 << (OpenSearchPPLParser.ATAN - 154)) | (1 << (OpenSearchPPLParser.ATAN2 - 154)) | (1 << (OpenSearchPPLParser.COS - 154)) | (1 << (OpenSearchPPLParser.COT - 154)) | (1 << (OpenSearchPPLParser.DEGREES - 154)) | (1 << (OpenSearchPPLParser.RADIANS - 154)) | (1 << (OpenSearchPPLParser.SIN - 154)) | (1 << (OpenSearchPPLParser.TAN - 154)) | (1 << (OpenSearchPPLParser.ADDDATE - 154)) | (1 << (OpenSearchPPLParser.DATE - 154)) | (1 << (OpenSearchPPLParser.DATE_ADD - 154)) | (1 << (OpenSearchPPLParser.DATE_SUB - 154)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 154)))) !== 0) || ((((_la - 186)) & ~0x1F) === 0 && ((1 << (_la - 186)) & ((1 << (OpenSearchPPLParser.DAYOFWEEK - 186)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 186)) | (1 << (OpenSearchPPLParser.DAYNAME - 186)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 186)) | (1 << (OpenSearchPPLParser.MONTHNAME - 186)) | (1 << (OpenSearchPPLParser.SUBDATE - 186)) | (1 << (OpenSearchPPLParser.TIME - 186)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 186)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 186)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 186)) | (1 << (OpenSearchPPLParser.TO_DAYS - 186)) | (1 << (OpenSearchPPLParser.SUBSTR - 186)) | (1 << (OpenSearchPPLParser.SUBSTRING - 186)) | (1 << (OpenSearchPPLParser.LTRIM - 186)) | (1 << (OpenSearchPPLParser.RTRIM - 186)) | (1 << (OpenSearchPPLParser.TRIM - 186)) | (1 << (OpenSearchPPLParser.LOWER - 186)) | (1 << (OpenSearchPPLParser.UPPER - 186)) | (1 << (OpenSearchPPLParser.CONCAT - 186)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 186)) | (1 << (OpenSearchPPLParser.LENGTH - 186)) | (1 << (OpenSearchPPLParser.STRCMP - 186)) | (1 << (OpenSearchPPLParser.RIGHT - 186)) | (1 << (OpenSearchPPLParser.LEFT - 186)) | (1 << (OpenSearchPPLParser.ASCII - 186)) | (1 << (OpenSearchPPLParser.LOCATE - 186)) | (1 << (OpenSearchPPLParser.REPLACE - 186)) | (1 << (OpenSearchPPLParser.CAST - 186)) | (1 << (OpenSearchPPLParser.LIKE - 186)) | (1 << (OpenSearchPPLParser.ISNULL - 186)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 186)))) !== 0) || ((((_la - 218)) & ~0x1F) === 0 && ((1 << (_la - 218)) & ((1 << (OpenSearchPPLParser.IFNULL - 218)) | (1 << (OpenSearchPPLParser.NULLIF - 218)) | (1 << (OpenSearchPPLParser.IF - 218)))) !== 0) || ((((_la - 254)) & ~0x1F) === 0 && ((1 << (_la - 254)) & ((1 << (OpenSearchPPLParser.SPAN - 254)) | (1 << (OpenSearchPPLParser.MS - 254)) | (1 << (OpenSearchPPLParser.S - 254)) | (1 << (OpenSearchPPLParser.M - 254)) | (1 << (OpenSearchPPLParser.H - 254)) | (1 << (OpenSearchPPLParser.W - 254)) | (1 << (OpenSearchPPLParser.Q - 254)) | (1 << (OpenSearchPPLParser.Y - 254)) | (1 << (OpenSearchPPLParser.ID - 254)) | (1 << (OpenSearchPPLParser.INTEGER_LITERAL - 254)) | (1 << (OpenSearchPPLParser.DECIMAL_LITERAL - 254)) | (1 << (OpenSearchPPLParser.DQUOTA_STRING - 254)) | (1 << (OpenSearchPPLParser.SQUOTA_STRING - 254)) | (1 << (OpenSearchPPLParser.BQUOTA_STRING - 254)))) !== 0)) {
				{
				this.state = 670;
				this.functionArg();
				this.state = 675;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === OpenSearchPPLParser.COMMA) {
					{
					{
					this.state = 671;
					this.match(OpenSearchPPLParser.COMMA);
					this.state = 672;
					this.functionArg();
					}
					}
					this.state = 677;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionArg(): FunctionArgContext {
		let _localctx: FunctionArgContext = new FunctionArgContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, OpenSearchPPLParser.RULE_functionArg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 680;
			this.valueExpression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceArg(): RelevanceArgContext {
		let _localctx: RelevanceArgContext = new RelevanceArgContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, OpenSearchPPLParser.RULE_relevanceArg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 682;
			this.relevanceArgName();
			this.state = 683;
			this.match(OpenSearchPPLParser.EQUAL);
			this.state = 684;
			this.relevanceArgValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceArgName(): RelevanceArgNameContext {
		let _localctx: RelevanceArgNameContext = new RelevanceArgNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, OpenSearchPPLParser.RULE_relevanceArgName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 686;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.FIELDS || _la === OpenSearchPPLParser.TIME_ZONE || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & ((1 << (OpenSearchPPLParser.ALLOW_LEADING_WILDCARD - 224)) | (1 << (OpenSearchPPLParser.ANALYZE_WILDCARD - 224)) | (1 << (OpenSearchPPLParser.ANALYZER - 224)) | (1 << (OpenSearchPPLParser.AUTO_GENERATE_SYNONYMS_PHRASE_QUERY - 224)) | (1 << (OpenSearchPPLParser.BOOST - 224)) | (1 << (OpenSearchPPLParser.CUTOFF_FREQUENCY - 224)) | (1 << (OpenSearchPPLParser.DEFAULT_FIELD - 224)) | (1 << (OpenSearchPPLParser.DEFAULT_OPERATOR - 224)) | (1 << (OpenSearchPPLParser.ENABLE_POSITION_INCREMENTS - 224)) | (1 << (OpenSearchPPLParser.FLAGS - 224)) | (1 << (OpenSearchPPLParser.FUZZY_MAX_EXPANSIONS - 224)) | (1 << (OpenSearchPPLParser.FUZZY_PREFIX_LENGTH - 224)) | (1 << (OpenSearchPPLParser.FUZZY_TRANSPOSITIONS - 224)) | (1 << (OpenSearchPPLParser.FUZZY_REWRITE - 224)) | (1 << (OpenSearchPPLParser.FUZZINESS - 224)) | (1 << (OpenSearchPPLParser.LENIENT - 224)) | (1 << (OpenSearchPPLParser.LOW_FREQ_OPERATOR - 224)) | (1 << (OpenSearchPPLParser.MAX_DETERMINIZED_STATES - 224)) | (1 << (OpenSearchPPLParser.MAX_EXPANSIONS - 224)) | (1 << (OpenSearchPPLParser.MINIMUM_SHOULD_MATCH - 224)) | (1 << (OpenSearchPPLParser.OPERATOR - 224)) | (1 << (OpenSearchPPLParser.PHRASE_SLOP - 224)) | (1 << (OpenSearchPPLParser.PREFIX_LENGTH - 224)) | (1 << (OpenSearchPPLParser.QUOTE_ANALYZER - 224)) | (1 << (OpenSearchPPLParser.QUOTE_FIELD_SUFFIX - 224)) | (1 << (OpenSearchPPLParser.REWRITE - 224)) | (1 << (OpenSearchPPLParser.SLOP - 224)) | (1 << (OpenSearchPPLParser.TIE_BREAKER - 224)) | (1 << (OpenSearchPPLParser.TYPE - 224)) | (1 << (OpenSearchPPLParser.ZERO_TERMS_QUERY - 224)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceFieldAndWeight(): RelevanceFieldAndWeightContext {
		let _localctx: RelevanceFieldAndWeightContext = new RelevanceFieldAndWeightContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, OpenSearchPPLParser.RULE_relevanceFieldAndWeight);
		try {
			this.state = 696;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 688;
				_localctx._field = this.relevanceField();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 689;
				_localctx._field = this.relevanceField();
				this.state = 690;
				_localctx._weight = this.relevanceFieldWeight();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 692;
				_localctx._field = this.relevanceField();
				this.state = 693;
				this.match(OpenSearchPPLParser.BIT_XOR_OP);
				this.state = 694;
				_localctx._weight = this.relevanceFieldWeight();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceFieldWeight(): RelevanceFieldWeightContext {
		let _localctx: RelevanceFieldWeightContext = new RelevanceFieldWeightContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, OpenSearchPPLParser.RULE_relevanceFieldWeight);
		try {
			this.state = 700;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 698;
				this.integerLiteral();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 699;
				this.decimalLiteral();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceField(): RelevanceFieldContext {
		let _localctx: RelevanceFieldContext = new RelevanceFieldContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, OpenSearchPPLParser.RULE_relevanceField);
		try {
			this.state = 704;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.BACKTICK:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
			case OpenSearchPPLParser.ID:
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 702;
				this.qualifiedName();
				}
				break;
			case OpenSearchPPLParser.DQUOTA_STRING:
			case OpenSearchPPLParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 703;
				this.stringLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceQuery(): RelevanceQueryContext {
		let _localctx: RelevanceQueryContext = new RelevanceQueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, OpenSearchPPLParser.RULE_relevanceQuery);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 706;
			this.relevanceArgValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public relevanceArgValue(): RelevanceArgValueContext {
		let _localctx: RelevanceArgValueContext = new RelevanceArgValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, OpenSearchPPLParser.RULE_relevanceArgValue);
		try {
			this.state = 710;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.BACKTICK:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
			case OpenSearchPPLParser.ID:
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 708;
				this.qualifiedName();
				}
				break;
			case OpenSearchPPLParser.TRUE:
			case OpenSearchPPLParser.FALSE:
			case OpenSearchPPLParser.INTERVAL:
			case OpenSearchPPLParser.PLUS:
			case OpenSearchPPLParser.MINUS:
			case OpenSearchPPLParser.INTEGER_LITERAL:
			case OpenSearchPPLParser.DECIMAL_LITERAL:
			case OpenSearchPPLParser.DQUOTA_STRING:
			case OpenSearchPPLParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 709;
				this.literalValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mathematicalFunctionBase(): MathematicalFunctionBaseContext {
		let _localctx: MathematicalFunctionBaseContext = new MathematicalFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, OpenSearchPPLParser.RULE_mathematicalFunctionBase);
		try {
			this.state = 734;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.ABS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 712;
				this.match(OpenSearchPPLParser.ABS);
				}
				break;
			case OpenSearchPPLParser.CEIL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 713;
				this.match(OpenSearchPPLParser.CEIL);
				}
				break;
			case OpenSearchPPLParser.CEILING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 714;
				this.match(OpenSearchPPLParser.CEILING);
				}
				break;
			case OpenSearchPPLParser.CONV:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 715;
				this.match(OpenSearchPPLParser.CONV);
				}
				break;
			case OpenSearchPPLParser.CRC32:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 716;
				this.match(OpenSearchPPLParser.CRC32);
				}
				break;
			case OpenSearchPPLParser.E:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 717;
				this.match(OpenSearchPPLParser.E);
				}
				break;
			case OpenSearchPPLParser.EXP:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 718;
				this.match(OpenSearchPPLParser.EXP);
				}
				break;
			case OpenSearchPPLParser.FLOOR:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 719;
				this.match(OpenSearchPPLParser.FLOOR);
				}
				break;
			case OpenSearchPPLParser.LN:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 720;
				this.match(OpenSearchPPLParser.LN);
				}
				break;
			case OpenSearchPPLParser.LOG:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 721;
				this.match(OpenSearchPPLParser.LOG);
				}
				break;
			case OpenSearchPPLParser.LOG10:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 722;
				this.match(OpenSearchPPLParser.LOG10);
				}
				break;
			case OpenSearchPPLParser.LOG2:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 723;
				this.match(OpenSearchPPLParser.LOG2);
				}
				break;
			case OpenSearchPPLParser.MOD:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 724;
				this.match(OpenSearchPPLParser.MOD);
				}
				break;
			case OpenSearchPPLParser.PI:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 725;
				this.match(OpenSearchPPLParser.PI);
				}
				break;
			case OpenSearchPPLParser.POW:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 726;
				this.match(OpenSearchPPLParser.POW);
				}
				break;
			case OpenSearchPPLParser.POWER:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 727;
				this.match(OpenSearchPPLParser.POWER);
				}
				break;
			case OpenSearchPPLParser.RAND:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 728;
				this.match(OpenSearchPPLParser.RAND);
				}
				break;
			case OpenSearchPPLParser.ROUND:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 729;
				this.match(OpenSearchPPLParser.ROUND);
				}
				break;
			case OpenSearchPPLParser.SIGN:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 730;
				this.match(OpenSearchPPLParser.SIGN);
				}
				break;
			case OpenSearchPPLParser.SQRT:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 731;
				this.match(OpenSearchPPLParser.SQRT);
				}
				break;
			case OpenSearchPPLParser.TRUNCATE:
				this.enterOuterAlt(_localctx, 21);
				{
				this.state = 732;
				this.match(OpenSearchPPLParser.TRUNCATE);
				}
				break;
			case OpenSearchPPLParser.ACOS:
			case OpenSearchPPLParser.ASIN:
			case OpenSearchPPLParser.ATAN:
			case OpenSearchPPLParser.ATAN2:
			case OpenSearchPPLParser.COS:
			case OpenSearchPPLParser.COT:
			case OpenSearchPPLParser.DEGREES:
			case OpenSearchPPLParser.RADIANS:
			case OpenSearchPPLParser.SIN:
			case OpenSearchPPLParser.TAN:
				this.enterOuterAlt(_localctx, 22);
				{
				this.state = 733;
				this.trigonometricFunctionName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public trigonometricFunctionName(): TrigonometricFunctionNameContext {
		let _localctx: TrigonometricFunctionNameContext = new TrigonometricFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, OpenSearchPPLParser.RULE_trigonometricFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 736;
			_la = this._input.LA(1);
			if (!(((((_la - 171)) & ~0x1F) === 0 && ((1 << (_la - 171)) & ((1 << (OpenSearchPPLParser.ACOS - 171)) | (1 << (OpenSearchPPLParser.ASIN - 171)) | (1 << (OpenSearchPPLParser.ATAN - 171)) | (1 << (OpenSearchPPLParser.ATAN2 - 171)) | (1 << (OpenSearchPPLParser.COS - 171)) | (1 << (OpenSearchPPLParser.COT - 171)) | (1 << (OpenSearchPPLParser.DEGREES - 171)) | (1 << (OpenSearchPPLParser.RADIANS - 171)) | (1 << (OpenSearchPPLParser.SIN - 171)) | (1 << (OpenSearchPPLParser.TAN - 171)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dateAndTimeFunctionBase(): DateAndTimeFunctionBaseContext {
		let _localctx: DateAndTimeFunctionBaseContext = new DateAndTimeFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, OpenSearchPPLParser.RULE_dateAndTimeFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 738;
			_la = this._input.LA(1);
			if (!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & ((1 << (OpenSearchPPLParser.MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.SECOND - 57)) | (1 << (OpenSearchPPLParser.MINUTE - 57)) | (1 << (OpenSearchPPLParser.HOUR - 57)) | (1 << (OpenSearchPPLParser.DAY - 57)) | (1 << (OpenSearchPPLParser.WEEK - 57)) | (1 << (OpenSearchPPLParser.MONTH - 57)) | (1 << (OpenSearchPPLParser.QUARTER - 57)) | (1 << (OpenSearchPPLParser.YEAR - 57)))) !== 0) || ((((_la - 181)) & ~0x1F) === 0 && ((1 << (_la - 181)) & ((1 << (OpenSearchPPLParser.ADDDATE - 181)) | (1 << (OpenSearchPPLParser.DATE - 181)) | (1 << (OpenSearchPPLParser.DATE_ADD - 181)) | (1 << (OpenSearchPPLParser.DATE_SUB - 181)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 181)) | (1 << (OpenSearchPPLParser.DAYOFWEEK - 181)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 181)) | (1 << (OpenSearchPPLParser.DAYNAME - 181)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 181)) | (1 << (OpenSearchPPLParser.MONTHNAME - 181)) | (1 << (OpenSearchPPLParser.SUBDATE - 181)) | (1 << (OpenSearchPPLParser.TIME - 181)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 181)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 181)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 181)) | (1 << (OpenSearchPPLParser.TO_DAYS - 181)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditionFunctionBase(): ConditionFunctionBaseContext {
		let _localctx: ConditionFunctionBaseContext = new ConditionFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, OpenSearchPPLParser.RULE_conditionFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 740;
			_la = this._input.LA(1);
			if (!(((((_la - 215)) & ~0x1F) === 0 && ((1 << (_la - 215)) & ((1 << (OpenSearchPPLParser.LIKE - 215)) | (1 << (OpenSearchPPLParser.ISNULL - 215)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 215)) | (1 << (OpenSearchPPLParser.IFNULL - 215)) | (1 << (OpenSearchPPLParser.NULLIF - 215)) | (1 << (OpenSearchPPLParser.IF - 215)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public textFunctionBase(): TextFunctionBaseContext {
		let _localctx: TextFunctionBaseContext = new TextFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, OpenSearchPPLParser.RULE_textFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 742;
			_la = this._input.LA(1);
			if (!(((((_la - 197)) & ~0x1F) === 0 && ((1 << (_la - 197)) & ((1 << (OpenSearchPPLParser.SUBSTR - 197)) | (1 << (OpenSearchPPLParser.SUBSTRING - 197)) | (1 << (OpenSearchPPLParser.LTRIM - 197)) | (1 << (OpenSearchPPLParser.RTRIM - 197)) | (1 << (OpenSearchPPLParser.TRIM - 197)) | (1 << (OpenSearchPPLParser.LOWER - 197)) | (1 << (OpenSearchPPLParser.UPPER - 197)) | (1 << (OpenSearchPPLParser.CONCAT - 197)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 197)) | (1 << (OpenSearchPPLParser.LENGTH - 197)) | (1 << (OpenSearchPPLParser.STRCMP - 197)) | (1 << (OpenSearchPPLParser.RIGHT - 197)) | (1 << (OpenSearchPPLParser.LEFT - 197)) | (1 << (OpenSearchPPLParser.ASCII - 197)) | (1 << (OpenSearchPPLParser.LOCATE - 197)) | (1 << (OpenSearchPPLParser.REPLACE - 197)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comparisonOperator(): ComparisonOperatorContext {
		let _localctx: ComparisonOperatorContext = new ComparisonOperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, OpenSearchPPLParser.RULE_comparisonOperator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.REGEXP || ((((_la - 91)) & ~0x1F) === 0 && ((1 << (_la - 91)) & ((1 << (OpenSearchPPLParser.EQUAL - 91)) | (1 << (OpenSearchPPLParser.GREATER - 91)) | (1 << (OpenSearchPPLParser.LESS - 91)) | (1 << (OpenSearchPPLParser.NOT_GREATER - 91)) | (1 << (OpenSearchPPLParser.NOT_LESS - 91)) | (1 << (OpenSearchPPLParser.NOT_EQUAL - 91)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public binaryOperator(): BinaryOperatorContext {
		let _localctx: BinaryOperatorContext = new BinaryOperatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, OpenSearchPPLParser.RULE_binaryOperator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 746;
			_la = this._input.LA(1);
			if (!(((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & ((1 << (OpenSearchPPLParser.PLUS - 97)) | (1 << (OpenSearchPPLParser.MINUS - 97)) | (1 << (OpenSearchPPLParser.STAR - 97)) | (1 << (OpenSearchPPLParser.DIVIDE - 97)) | (1 << (OpenSearchPPLParser.MODULE - 97)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public singleFieldRelevanceFunctionName(): SingleFieldRelevanceFunctionNameContext {
		let _localctx: SingleFieldRelevanceFunctionNameContext = new SingleFieldRelevanceFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, OpenSearchPPLParser.RULE_singleFieldRelevanceFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 748;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.MATCH || _la === OpenSearchPPLParser.MATCH_PHRASE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiFieldRelevanceFunctionName(): MultiFieldRelevanceFunctionNameContext {
		let _localctx: MultiFieldRelevanceFunctionNameContext = new MultiFieldRelevanceFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, OpenSearchPPLParser.RULE_multiFieldRelevanceFunctionName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this.match(OpenSearchPPLParser.SIMPLE_QUERY_STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literalValue(): LiteralValueContext {
		let _localctx: LiteralValueContext = new LiteralValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, OpenSearchPPLParser.RULE_literalValue);
		try {
			this.state = 757;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 752;
				this.intervalLiteral();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 753;
				this.stringLiteral();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 754;
				this.integerLiteral();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 755;
				this.decimalLiteral();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 756;
				this.booleanLiteral();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intervalLiteral(): IntervalLiteralContext {
		let _localctx: IntervalLiteralContext = new IntervalLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, OpenSearchPPLParser.RULE_intervalLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this.match(OpenSearchPPLParser.INTERVAL);
			this.state = 760;
			this.valueExpression(0);
			this.state = 761;
			this.intervalUnit();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let _localctx: StringLiteralContext = new StringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, OpenSearchPPLParser.RULE_stringLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 763;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.DQUOTA_STRING || _la === OpenSearchPPLParser.SQUOTA_STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integerLiteral(): IntegerLiteralContext {
		let _localctx: IntegerLiteralContext = new IntegerLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, OpenSearchPPLParser.RULE_integerLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 766;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 765;
				_la = this._input.LA(1);
				if (!(_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 768;
			this.match(OpenSearchPPLParser.INTEGER_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decimalLiteral(): DecimalLiteralContext {
		let _localctx: DecimalLiteralContext = new DecimalLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, OpenSearchPPLParser.RULE_decimalLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 771;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 770;
				_la = this._input.LA(1);
				if (!(_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 773;
			this.match(OpenSearchPPLParser.DECIMAL_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanLiteral(): BooleanLiteralContext {
		let _localctx: BooleanLiteralContext = new BooleanLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, OpenSearchPPLParser.RULE_booleanLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 775;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.TRUE || _la === OpenSearchPPLParser.FALSE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pattern(): PatternContext {
		let _localctx: PatternContext = new PatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, OpenSearchPPLParser.RULE_pattern);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 777;
			this.stringLiteral();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intervalUnit(): IntervalUnitContext {
		let _localctx: IntervalUnitContext = new IntervalUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, OpenSearchPPLParser.RULE_intervalUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 779;
			_la = this._input.LA(1);
			if (!(((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & ((1 << (OpenSearchPPLParser.MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.SECOND - 57)) | (1 << (OpenSearchPPLParser.MINUTE - 57)) | (1 << (OpenSearchPPLParser.HOUR - 57)) | (1 << (OpenSearchPPLParser.DAY - 57)) | (1 << (OpenSearchPPLParser.WEEK - 57)) | (1 << (OpenSearchPPLParser.MONTH - 57)) | (1 << (OpenSearchPPLParser.QUARTER - 57)) | (1 << (OpenSearchPPLParser.YEAR - 57)) | (1 << (OpenSearchPPLParser.SECOND_MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.MINUTE_MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.MINUTE_SECOND - 57)) | (1 << (OpenSearchPPLParser.HOUR_MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.HOUR_SECOND - 57)) | (1 << (OpenSearchPPLParser.HOUR_MINUTE - 57)) | (1 << (OpenSearchPPLParser.DAY_MICROSECOND - 57)) | (1 << (OpenSearchPPLParser.DAY_SECOND - 57)) | (1 << (OpenSearchPPLParser.DAY_MINUTE - 57)) | (1 << (OpenSearchPPLParser.DAY_HOUR - 57)) | (1 << (OpenSearchPPLParser.YEAR_MONTH - 57)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public timespanUnit(): TimespanUnitContext {
		let _localctx: TimespanUnitContext = new TimespanUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, OpenSearchPPLParser.RULE_timespanUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 781;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.D || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & ((1 << (OpenSearchPPLParser.MILLISECOND - 58)) | (1 << (OpenSearchPPLParser.SECOND - 58)) | (1 << (OpenSearchPPLParser.MINUTE - 58)) | (1 << (OpenSearchPPLParser.HOUR - 58)) | (1 << (OpenSearchPPLParser.DAY - 58)) | (1 << (OpenSearchPPLParser.WEEK - 58)) | (1 << (OpenSearchPPLParser.MONTH - 58)) | (1 << (OpenSearchPPLParser.QUARTER - 58)) | (1 << (OpenSearchPPLParser.YEAR - 58)))) !== 0) || ((((_la - 255)) & ~0x1F) === 0 && ((1 << (_la - 255)) & ((1 << (OpenSearchPPLParser.MS - 255)) | (1 << (OpenSearchPPLParser.S - 255)) | (1 << (OpenSearchPPLParser.M - 255)) | (1 << (OpenSearchPPLParser.H - 255)) | (1 << (OpenSearchPPLParser.W - 255)) | (1 << (OpenSearchPPLParser.Q - 255)) | (1 << (OpenSearchPPLParser.Y - 255)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public valueList(): ValueListContext {
		let _localctx: ValueListContext = new ValueListContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, OpenSearchPPLParser.RULE_valueList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 783;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 784;
			this.literalValue();
			this.state = 789;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 785;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 786;
				this.literalValue();
				}
				}
				this.state = 791;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 792;
			this.match(OpenSearchPPLParser.RT_PRTHS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedName(): QualifiedNameContext {
		let _localctx: QualifiedNameContext = new QualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, OpenSearchPPLParser.RULE_qualifiedName);
		try {
			let _alt: number;
			_localctx = new IdentsAsQualifiedNameContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 794;
			this.ident();
			this.state = 799;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 795;
					this.match(OpenSearchPPLParser.DOT);
					this.state = 796;
					this.ident();
					}
					}
				}
				this.state = 801;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wcQualifiedName(): WcQualifiedNameContext {
		let _localctx: WcQualifiedNameContext = new WcQualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, OpenSearchPPLParser.RULE_wcQualifiedName);
		let _la: number;
		try {
			_localctx = new IdentsAsWildcardQualifiedNameContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 802;
			this.wildcard();
			this.state = 807;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.DOT) {
				{
				{
				this.state = 803;
				this.match(OpenSearchPPLParser.DOT);
				this.state = 804;
				this.wildcard();
				}
				}
				this.state = 809;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ident(): IdentContext {
		let _localctx: IdentContext = new IdentContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, OpenSearchPPLParser.RULE_ident);
		let _la: number;
		try {
			this.state = 820;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 811;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.DOT) {
					{
					this.state = 810;
					this.match(OpenSearchPPLParser.DOT);
					}
				}

				this.state = 813;
				this.match(OpenSearchPPLParser.ID);
				}
				break;
			case OpenSearchPPLParser.BACKTICK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 814;
				this.match(OpenSearchPPLParser.BACKTICK);
				this.state = 815;
				this.ident();
				this.state = 816;
				this.match(OpenSearchPPLParser.BACKTICK);
				}
				break;
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 818;
				this.match(OpenSearchPPLParser.BQUOTA_STRING);
				}
				break;
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.MILLISECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.AVG:
			case OpenSearchPPLParser.COUNT:
			case OpenSearchPPLParser.MAX:
			case OpenSearchPPLParser.MIN:
			case OpenSearchPPLParser.SUM:
			case OpenSearchPPLParser.VAR_SAMP:
			case OpenSearchPPLParser.VAR_POP:
			case OpenSearchPPLParser.STDDEV_SAMP:
			case OpenSearchPPLParser.STDDEV_POP:
			case OpenSearchPPLParser.FIRST:
			case OpenSearchPPLParser.LAST:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.SPAN:
			case OpenSearchPPLParser.MS:
			case OpenSearchPPLParser.S:
			case OpenSearchPPLParser.M:
			case OpenSearchPPLParser.H:
			case OpenSearchPPLParser.W:
			case OpenSearchPPLParser.Q:
			case OpenSearchPPLParser.Y:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 819;
				this.keywordsCanBeId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public wildcard(): WildcardContext {
		let _localctx: WildcardContext = new WildcardContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, OpenSearchPPLParser.RULE_wildcard);
		let _la: number;
		try {
			let _alt: number;
			this.state = 845;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 822;
				this.ident();
				this.state = 827;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 72, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 823;
						this.match(OpenSearchPPLParser.MODULE);
						this.state = 824;
						this.ident();
						}
						}
					}
					this.state = 829;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 72, this._ctx);
				}
				this.state = 831;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.MODULE) {
					{
					this.state = 830;
					this.match(OpenSearchPPLParser.MODULE);
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 833;
				this.match(OpenSearchPPLParser.SINGLE_QUOTE);
				this.state = 834;
				this.wildcard();
				this.state = 835;
				this.match(OpenSearchPPLParser.SINGLE_QUOTE);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 837;
				this.match(OpenSearchPPLParser.DOUBLE_QUOTE);
				this.state = 838;
				this.wildcard();
				this.state = 839;
				this.match(OpenSearchPPLParser.DOUBLE_QUOTE);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 841;
				this.match(OpenSearchPPLParser.BACKTICK);
				this.state = 842;
				this.wildcard();
				this.state = 843;
				this.match(OpenSearchPPLParser.BACKTICK);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public keywordsCanBeId(): KeywordsCanBeIdContext {
		let _localctx: KeywordsCanBeIdContext = new KeywordsCanBeIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, OpenSearchPPLParser.RULE_keywordsCanBeId);
		try {
			this.state = 856;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 75, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 847;
				this.match(OpenSearchPPLParser.D);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 848;
				this.statsFunctionName();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 849;
				this.match(OpenSearchPPLParser.TIMESTAMP);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 850;
				this.match(OpenSearchPPLParser.DATE);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 851;
				this.match(OpenSearchPPLParser.TIME);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 852;
				this.match(OpenSearchPPLParser.FIRST);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 853;
				this.match(OpenSearchPPLParser.LAST);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 854;
				this.timespanUnit();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 855;
				this.match(OpenSearchPPLParser.SPAN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 32:
			return this.logicalExpression_sempred(_localctx as LogicalExpressionContext, predIndex);

		case 34:
			return this.valueExpression_sempred(_localctx as ValueExpressionContext, predIndex);
		}
		return true;
	}
	private logicalExpression_sempred(_localctx: LogicalExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 5);

		case 1:
			return this.precpred(this._ctx, 4);

		case 2:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}
	private valueExpression_sempred(_localctx: ValueExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\u010F\u035D\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
		"\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04" +
		"#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t" +
		"+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x03\x02\x05" +
		"\x02\xAE\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x07\x03\xB5\n\x03" +
		"\f\x03\x0E\x03\xB8\v\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\xC7\n" +
		"\x04\x03\x05\x05\x05\xCA\n\x05\x03\x05\x03\x05\x05\x05\xCE\n\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x05\x05\xD4\n\x05\x03\x05\x03\x05\x03\x05\x05" +
		"\x05\xD9\n\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x05\x07\xE0\n\x07" +
		"\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x07\b\xE8\n\b\f\b\x0E\b\xEB\v" +
		"\b\x03\t\x03\t\x03\t\x03\t\x05\t\xF1\n\t\x03\t\x03\t\x03\t\x05\t\xF6\n" +
		"\t\x03\t\x03\t\x03\t\x05\t\xFB\n\t\x03\t\x03\t\x03\t\x07\t\u0100\n\t\f" +
		"\t\x0E\t\u0103\v\t\x03\t\x05\t\u0106\n\t\x03\t\x03\t\x03\t\x05\t\u010B" +
		"\n\t\x03\n\x03\n\x05\n\u010F\n\n\x03\n\x03\n\x03\n\x03\n\x05\n\u0115\n" +
		"\n\x03\n\x03\n\x03\n\x05\n\u011A\n\n\x03\v\x03\v\x03\v\x03\f\x03\f\x03" +
		"\f\x03\f\x07\f\u0123\n\f\f\f\x0E\f\u0126\v\f\x03\r\x03\r\x05\r\u012A\n" +
		"\r\x03\r\x03\r\x05\r\u012E\n\r\x03\x0E\x03\x0E\x05\x0E\u0132\n\x0E\x03" +
		"\x0E\x03\x0E\x05\x0E\u0136\n\x0E\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u013B" +
		"\n\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x07\x11\u0143\n" +
		"\x11\f\x11\x0E\x11\u0146\v\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u0151\n\x12\x03\x13\x03\x13\x07" +
		"\x13\u0155\n\x13\f\x13\x0E\x13\u0158\v\x13\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x05\x14\u017B\n\x14\x03\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x15\x07\x15\u0182\n\x15\f\x15\x0E\x15\u0185\v\x15\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x07\x15\u018C\n\x15\f\x15\x0E\x15\u018F\v\x15" +
		"\x05\x15\u0191\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03" +
		"\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x05\x18\u01A3\n\x18\x03\x19\x03\x19\x03\x19\x05\x19\u01A8\n\x19\x03" +
		"\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u01B0\n\x1A\x03\x1A" +
		"\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x07\x1B\u01B7\n\x1B\f\x1B\x0E\x1B\u01BA" +
		"\v\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x05\x1D" +
		"\u01C3\n\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03" +
		"\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x05\x1E\u01D3\n\x1E" +
		"\x03\x1F\x03\x1F\x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03!\x03!\x03" +
		"!\x05!\u01E2\n!\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x05\"\u01EA\n\"\x03" +
		"\"\x03\"\x03\"\x03\"\x03\"\x05\"\u01F1\n\"\x03\"\x03\"\x03\"\x03\"\x07" +
		"\"\u01F7\n\"\f\"\x0E\"\u01FA\v\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x05#\u0204\n#\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u020E\n$" +
		"\x03$\x03$\x03$\x03$\x07$\u0214\n$\f$\x0E$\u0217\v$\x03%\x03%\x03%\x03" +
		"%\x05%\u021D\n%\x03&\x03&\x03\'\x03\'\x05\'\u0223\n\'\x03(\x03(\x03(\x03" +
		"(\x03(\x03(\x03(\x07(\u022C\n(\f(\x0E(\u022F\v(\x03(\x03(\x03)\x03)\x03" +
		")\x03)\x03)\x03)\x07)\u0239\n)\f)\x0E)\u023C\v)\x03)\x03)\x03)\x03)\x03" +
		")\x07)\u0243\n)\f)\x0E)\u0246\v)\x03)\x03)\x03*\x03*\x05*\u024C\n*\x03" +
		"+\x03+\x03+\x07+\u0251\n+\f+\x0E+\u0254\v+\x03,\x03,\x03,\x07,\u0259\n" +
		",\f,\x0E,\u025C\v,\x03-\x05-\u025F\n-\x03-\x03-\x03.\x03.\x03.\x03.\x03" +
		".\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03.\x03" +
		".\x03.\x03.\x05.\u0278\n.\x03/\x03/\x030\x030\x031\x031\x031\x031\x03" +
		"1\x032\x032\x032\x032\x032\x032\x032\x033\x033\x033\x033\x033\x034\x03" +
		"4\x034\x034\x034\x034\x034\x034\x034\x034\x054\u0299\n4\x035\x035\x03" +
		"5\x035\x055\u029F\n5\x036\x036\x036\x076\u02A4\n6\f6\x0E6\u02A7\v6\x05" +
		"6\u02A9\n6\x037\x037\x038\x038\x038\x038\x039\x039\x03:\x03:\x03:\x03" +
		":\x03:\x03:\x03:\x03:\x05:\u02BB\n:\x03;\x03;\x05;\u02BF\n;\x03<\x03<" +
		"\x05<\u02C3\n<\x03=\x03=\x03>\x03>\x05>\u02C9\n>\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x03?\x05?\u02E1\n?\x03@\x03@\x03A\x03A\x03B\x03B\x03C\x03" +
		"C\x03D\x03D\x03E\x03E\x03F\x03F\x03G\x03G\x03H\x03H\x03H\x03H\x03H\x05" +
		"H\u02F8\nH\x03I\x03I\x03I\x03I\x03J\x03J\x03K\x05K\u0301\nK\x03K\x03K" +
		"\x03L\x05L\u0306\nL\x03L\x03L\x03M\x03M\x03N\x03N\x03O\x03O\x03P\x03P" +
		"\x03Q\x03Q\x03Q\x03Q\x07Q\u0316\nQ\fQ\x0EQ\u0319\vQ\x03Q\x03Q\x03R\x03" +
		"R\x03R\x07R\u0320\nR\fR\x0ER\u0323\vR\x03S\x03S\x03S\x07S\u0328\nS\fS" +
		"\x0ES\u032B\vS\x03T\x05T\u032E\nT\x03T\x03T\x03T\x03T\x03T\x03T\x03T\x05" +
		"T\u0337\nT\x03U\x03U\x03U\x07U\u033C\nU\fU\x0EU\u033F\vU\x03U\x05U\u0342" +
		"\nU\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x05U\u0350" +
		"\nU\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x05V\u035B\nV\x03V\x02" +
		"\x02\x04BFW\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02" +
		"\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02" +
		"&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02" +
		"B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02" +
		"^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02" +
		"z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02" +
		"\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02" +
		"\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\x02\x11\x03\x02cd\x04" +
		"\x02vv\x97\x97\x07\x02tuyy||\x81\x81\x83\x86\x05\x02\x06\x06--\xE2\xFF" +
		"\x03\x02\xAD\xB6\x05\x02;;=D\xB7\xC6\x03\x02\xD9\xDE\x04\x02\xC7\xCB\xCD" +
		"\xD7\x04\x0288]b\x03\x02cg\x03\x02\xDF\xE0\x03\x02\u010C\u010D\x03\x02" +
		"67\x04\x02;;=O\x05\x02\x16\x16<D\u0101\u0107\x02\u03A2\x02\xAD\x03\x02" +
		"\x02\x02\x04\xB1\x03\x02\x02\x02\x06\xC6\x03\x02\x02\x02\b\xD8\x03\x02" +
		"\x02\x02\n\xDA\x03\x02\x02\x02\f\xDD\x03\x02\x02\x02\x0E\xE3\x03\x02\x02" +
		"\x02\x10\xEC\x03\x02\x02\x02\x12\u010C\x03\x02\x02\x02\x14\u011B\x03\x02" +
		"\x02\x02\x16\u011E\x03\x02\x02\x02\x18\u0127\x03\x02\x02\x02\x1A\u012F" +
		"\x03\x02\x02\x02\x1C\u0137\x03\x02\x02\x02\x1E\u013C\x03\x02\x02\x02 " +
		"\u0140\x03\x02\x02\x02\"\u0150\x03\x02\x02\x02$\u0152\x03\x02\x02\x02" +
		"&\u017A\x03\x02\x02\x02(\u0190\x03\x02\x02\x02*\u0192\x03\x02\x02\x02" +
		",\u0196\x03\x02\x02\x02.\u01A2\x03\x02\x02\x020\u01A4\x03\x02\x02\x02" +
		"2\u01A9\x03\x02\x02\x024\u01B3\x03\x02\x02\x026\u01BB\x03\x02\x02\x02" +
		"8\u01BF\x03\x02\x02\x02:\u01D2\x03\x02\x02\x02<\u01D4\x03\x02\x02\x02" +
		">\u01D6\x03\x02\x02\x02@\u01E1\x03\x02\x02\x02B\u01E9\x03\x02\x02\x02" +
		"D\u0203\x03\x02\x02\x02F\u020D\x03\x02\x02\x02H\u021C\x03\x02\x02\x02" +
		"J\u021E\x03\x02\x02\x02L\u0222\x03\x02\x02\x02N\u0224\x03\x02\x02\x02" +
		"P\u0232\x03\x02\x02\x02R\u024B\x03\x02\x02\x02T\u024D\x03\x02\x02\x02" +
		"V\u0255\x03\x02\x02\x02X\u025E\x03\x02\x02\x02Z\u0277\x03\x02\x02\x02" +
		"\\\u0279\x03\x02\x02\x02^\u027B\x03\x02\x02\x02`\u027D\x03\x02\x02\x02" +
		"b\u0282\x03\x02\x02\x02d\u0289\x03\x02\x02\x02f\u0298\x03\x02\x02\x02" +
		"h\u029E\x03\x02\x02\x02j\u02A8\x03\x02\x02\x02l\u02AA\x03\x02\x02\x02" +
		"n\u02AC\x03\x02\x02\x02p\u02B0\x03\x02\x02\x02r\u02BA\x03\x02\x02\x02" +
		"t\u02BE\x03\x02\x02\x02v\u02C2\x03\x02\x02\x02x\u02C4\x03\x02\x02\x02" +
		"z\u02C8\x03\x02\x02\x02|\u02E0\x03\x02\x02\x02~\u02E2\x03\x02\x02\x02" +
		"\x80\u02E4\x03\x02\x02\x02\x82\u02E6\x03\x02\x02\x02\x84\u02E8\x03\x02" +
		"\x02\x02\x86\u02EA\x03\x02\x02\x02\x88\u02EC\x03\x02\x02\x02\x8A\u02EE" +
		"\x03\x02\x02\x02\x8C\u02F0\x03\x02\x02\x02\x8E\u02F7\x03\x02\x02\x02\x90" +
		"\u02F9\x03\x02\x02\x02\x92\u02FD\x03\x02\x02\x02\x94\u0300\x03\x02\x02" +
		"\x02\x96\u0305\x03\x02\x02\x02\x98\u0309\x03\x02\x02\x02\x9A\u030B\x03" +
		"\x02\x02\x02\x9C\u030D\x03\x02\x02\x02\x9E\u030F\x03\x02\x02\x02\xA0\u0311" +
		"\x03\x02\x02\x02\xA2\u031C\x03\x02\x02\x02\xA4\u0324\x03\x02\x02\x02\xA6" +
		"\u0336\x03\x02\x02\x02\xA8\u034F\x03\x02\x02\x02\xAA\u035A\x03\x02\x02" +
		"\x02\xAC\xAE\x05\x04\x03\x02\xAD\xAC\x03\x02\x02\x02\xAD\xAE\x03\x02\x02" +
		"\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB0\x07\x02\x02\x03\xB0\x03\x03\x02\x02" +
		"\x02\xB1\xB6\x05\b\x05\x02\xB2\xB3\x07Z\x02\x02\xB3\xB5\x05\x06\x04\x02" +
		"\xB4\xB2\x03\x02\x02\x02\xB5\xB8\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02" +
		"\xB6\xB7\x03\x02\x02\x02\xB7\x05\x03\x02\x02\x02\xB8\xB6\x03\x02\x02\x02" +
		"\xB9\xC7\x05\n\x06\x02\xBA\xC7\x05\f\x07\x02\xBB\xC7\x05\x0E\b\x02\xBC" +
		"\xC7\x05\x10\t\x02\xBD\xC7\x05\x12\n\x02\xBE\xC7\x05\x14\v\x02\xBF\xC7" +
		"\x05\x16\f\x02\xC0\xC7\x05\x18\r\x02\xC1\xC7\x05\x1A\x0E\x02\xC2\xC7\x05" +
		"\x1C\x0F\x02\xC3\xC7\x05\x1E\x10\x02\xC4\xC7\x05 \x11\x02\xC5\xC7\x05" +
		"$\x13\x02\xC6\xB9\x03\x02\x02\x02\xC6\xBA\x03\x02\x02\x02\xC6\xBB\x03" +
		"\x02\x02\x02\xC6\xBC\x03\x02\x02\x02\xC6\xBD\x03\x02\x02\x02\xC6\xBE\x03" +
		"\x02\x02\x02\xC6\xBF\x03\x02\x02\x02\xC6\xC0\x03\x02\x02\x02\xC6\xC1\x03" +
		"\x02\x02\x02\xC6\xC2\x03\x02\x02\x02\xC6\xC3\x03\x02\x02\x02\xC6\xC4\x03" +
		"\x02\x02\x02\xC6\xC5\x03\x02\x02\x02\xC7\x07\x03\x02\x02\x02\xC8\xCA\x07" +
		"\x03\x02\x02\xC9\xC8\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCB\x03" +
		"\x02\x02\x02\xCB\xD9\x05(\x15\x02\xCC\xCE\x07\x03\x02\x02\xCD\xCC\x03" +
		"\x02\x02\x02\xCD\xCE\x03\x02\x02\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD0\x05" +
		"(\x15\x02\xD0\xD1\x05B\"\x02\xD1\xD9\x03\x02\x02\x02\xD2\xD4\x07\x03\x02" +
		"\x02\xD3\xD2\x03\x02\x02\x02\xD3\xD4\x03\x02\x02\x02\xD4\xD5\x03\x02\x02" +
		"\x02\xD5\xD6\x05B\"\x02\xD6\xD7\x05(\x15\x02\xD7\xD9\x03\x02\x02\x02\xD8" +
		"\xC9\x03\x02\x02\x02\xD8\xCD\x03\x02\x02\x02\xD8\xD3\x03\x02\x02\x02\xD9" +
		"\t\x03\x02\x02\x02\xDA\xDB\x07\x05\x02\x02\xDB\xDC\x05B\"\x02\xDC\v\x03" +
		"\x02\x02\x02\xDD\xDF\x07\x06\x02\x02\xDE\xE0\t\x02\x02\x02\xDF\xDE\x03" +
		"\x02\x02\x02\xDF\xE0\x03\x02\x02\x02\xE0\xE1\x03\x02\x02\x02\xE1\xE2\x05" +
		"T+\x02\xE2\r\x03\x02\x02\x02\xE3\xE4\x07\x07\x02\x02\xE4\xE9\x05*\x16" +
		"\x02\xE5\xE6\x07[\x02\x02\xE6\xE8\x05*\x16\x02\xE7\xE5\x03\x02\x02\x02" +
		"\xE8\xEB\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02" +
		"\xEA\x0F\x03\x02\x02\x02\xEB\xE9\x03\x02\x02\x02\xEC\xF0\x07\b\x02\x02" +
		"\xED\xEE\x07 \x02\x02\xEE\xEF\x07]\x02\x02\xEF\xF1\x05\x94K\x02\xF0\xED" +
		"\x03\x02\x02\x02\xF0\xF1\x03\x02\x02\x02\xF1\xF5\x03\x02\x02\x02\xF2\xF3" +
		"\x07!\x02\x02\xF3\xF4\x07]\x02\x02\xF4\xF6\x05\x98M\x02\xF5\xF2\x03\x02" +
		"\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xFA\x03\x02\x02\x02\xF7\xF8\x07\"" +
		"\x02\x02\xF8\xF9\x07]\x02\x02\xF9\xFB\x05\x92J\x02\xFA\xF7\x03\x02\x02" +
		"\x02\xFA\xFB\x03\x02\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\u0101\x058\x1D" +
		"\x02\xFD\xFE\x07[\x02\x02\xFE\u0100\x058\x1D\x02\xFF\xFD\x03\x02\x02\x02" +
		"\u0100\u0103\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0101\u0102\x03" +
		"\x02\x02\x02\u0102\u0105\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0104" +
		"\u0106\x05.\x18\x02\u0105\u0104\x03\x02\x02\x02\u0105\u0106\x03\x02\x02" +
		"\x02\u0106\u010A\x03\x02\x02\x02\u0107\u0108\x07\x1F\x02\x02\u0108\u0109" +
		"\x07]\x02\x02\u0109\u010B\x05\x98M\x02\u010A\u0107\x03\x02\x02\x02\u010A" +
		"\u010B\x03\x02\x02\x02\u010B\x11\x03\x02\x02\x02\u010C\u010E\x07\t\x02" +
		"\x02\u010D\u010F\x05\x94K\x02\u010E\u010D\x03\x02\x02\x02\u010E\u010F" +
		"\x03\x02\x02\x02\u010F\u0110\x03\x02\x02\x02\u0110\u0114\x05T+\x02\u0111" +
		"\u0112\x07\x1D\x02\x02\u0112\u0113\x07]\x02\x02\u0113\u0115\x05\x98M\x02" +
		"\u0114\u0111\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115\u0119\x03" +
		"\x02\x02\x02\u0116\u0117\x07\x1E\x02\x02\u0117\u0118\x07]\x02\x02\u0118" +
		"\u011A\x05\x98M\x02\u0119\u0116\x03\x02\x02\x02\u0119\u011A\x03\x02\x02" +
		"\x02\u011A\x13\x03\x02\x02\x02\u011B\u011C\x07\n\x02\x02\u011C\u011D\x05" +
		"4\x1B\x02\u011D\x15\x03\x02\x02\x02\u011E\u011F\x07\v\x02\x02\u011F\u0124" +
		"\x056\x1C\x02\u0120\u0121\x07[\x02\x02\u0121\u0123\x056\x1C\x02\u0122" +
		"\u0120\x03\x02\x02\x02\u0123\u0126\x03\x02\x02\x02\u0124\u0122\x03\x02" +
		"\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\x17\x03\x02\x02\x02\u0126\u0124" +
		"\x03\x02\x02\x02\u0127\u0129\x07\f\x02\x02\u0128\u012A\x05\x94K\x02\u0129" +
		"\u0128\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u012D\x03\x02" +
		"\x02\x02\u012B\u012C\x07\x04\x02\x02\u012C\u012E\x05\x94K\x02\u012D\u012B" +
		"\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E\x19\x03\x02\x02\x02" +
		"\u012F\u0131\x07\r\x02\x02\u0130\u0132\x05\x94K\x02\u0131\u0130\x03\x02" +
		"\x02\x02\u0131\u0132\x03\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133" +
		"\u0135\x05T+\x02\u0134\u0136\x05,\x17\x02\u0135\u0134\x03\x02\x02\x02" +
		"\u0135\u0136\x03\x02\x02\x02\u0136\x1B\x03\x02\x02\x02\u0137\u0138\x07" +
		"\x0E\x02\x02\u0138\u013A\x05T+\x02\u0139\u013B\x05,\x17\x02\u013A\u0139" +
		"\x03\x02\x02\x02\u013A\u013B\x03\x02\x02\x02\u013B\x1D\x03\x02\x02\x02" +
		"\u013C\u013D\x07\x0F\x02\x02\u013D\u013E\x05@!\x02\u013E\u013F\x05\x9A" +
		"N\x02\u013F\x1F\x03\x02\x02\x02\u0140\u0144\x07\x10\x02\x02\u0141\u0143" +
		"\x05\"\x12\x02\u0142\u0141\x03\x02\x02\x02\u0143\u0146\x03\x02\x02\x02" +
		"\u0144\u0142\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02\u0145!\x03\x02" +
		"\x02\x02\u0146\u0144\x03\x02\x02\x02\u0147\u0148\x07#\x02\x02\u0148\u0149" +
		"\x07]\x02\x02\u0149\u0151\x05\x94K\x02\u014A\u014B\x07$\x02\x02\u014B" +
		"\u014C\x07]\x02\x02\u014C\u0151\x05\x94K\x02\u014D\u014E\x07%\x02\x02" +
		"\u014E\u014F\x07]\x02\x02\u014F\u0151\x05\x92J\x02\u0150\u0147\x03\x02" +
		"\x02\x02\u0150\u014A\x03\x02\x02\x02\u0150\u014D\x03\x02\x02\x02\u0151" +
		"#\x03\x02\x02\x02\u0152\u0156\x07\x11\x02\x02\u0153\u0155\x05&\x14\x02" +
		"\u0154\u0153\x03\x02\x02\x02\u0155\u0158\x03\x02\x02\x02\u0156\u0154\x03" +
		"\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0157%\x03\x02\x02\x02\u0158" +
		"\u0156\x03\x02\x02\x02\u0159\u015A\x07&\x02\x02\u015A\u015B\x07]\x02\x02" +
		"\u015B\u017B\x05\x94K\x02\u015C\u015D\x07\'\x02\x02\u015D\u015E\x07]\x02" +
		"\x02\u015E\u017B\x05\x94K\x02\u015F\u0160\x07(\x02\x02\u0160\u0161\x07" +
		"]\x02\x02\u0161\u017B\x05\x94K\x02\u0162\u0163\x07)\x02\x02\u0163\u0164" +
		"\x07]\x02\x02\u0164\u017B\x05\x94K\x02\u0165\u0166\x07*\x02\x02\u0166" +
		"\u0167\x07]\x02\x02\u0167\u017B\x05\x96L\x02\u0168\u0169\x07+\x02\x02" +
		"\u0169\u016A\x07]\x02\x02\u016A\u017B\x05\x96L\x02\u016B\u016C\x07,\x02" +
		"\x02\u016C\u016D\x07]\x02\x02\u016D\u017B\x05\x92J\x02\u016E\u016F\x07" +
		"\xC5\x02\x02\u016F\u0170\x07]\x02\x02\u0170\u017B\x05\x92J\x02\u0171\u0172" +
		"\x07-\x02\x02\u0172\u0173\x07]\x02\x02\u0173\u017B\x05\x92J\x02\u0174" +
		"\u0175\x07.\x02\x02\u0175\u0176\x07]\x02\x02\u0176\u017B\x05\x94K\x02" +
		"\u0177\u0178\x07/\x02\x02\u0178\u0179\x07]\x02\x02\u0179\u017B\x05\x96" +
		"L\x02\u017A\u0159\x03\x02\x02\x02\u017A\u015C\x03\x02\x02\x02\u017A\u015F" +
		"\x03\x02\x02\x02\u017A\u0162\x03\x02\x02\x02\u017A\u0165\x03\x02\x02\x02" +
		"\u017A\u0168\x03\x02\x02\x02\u017A\u016B\x03\x02\x02\x02\u017A\u016E\x03" +
		"\x02\x02\x02\u017A\u0171\x03\x02\x02\x02\u017A\u0174\x03\x02\x02\x02\u017A" +
		"\u0177\x03\x02\x02\x02\u017B\'\x03\x02\x02\x02\u017C\u017D\x07\x14\x02" +
		"\x02\u017D\u017E\x07]\x02\x02\u017E\u0183\x05R*\x02\u017F\u0180\x07[\x02" +
		"\x02\u0180\u0182\x05R*\x02\u0181\u017F\x03\x02\x02\x02\u0182\u0185\x03" +
		"\x02\x02\x02\u0183\u0181\x03\x02\x02\x02\u0183\u0184\x03\x02\x02\x02\u0184" +
		"\u0191\x03\x02\x02\x02\u0185\u0183\x03\x02\x02\x02\u0186\u0187\x07\x15" +
		"\x02\x02\u0187\u0188\x07]\x02\x02\u0188\u018D\x05R*\x02\u0189\u018A\x07" +
		"[\x02\x02\u018A\u018C\x05R*\x02\u018B\u0189\x03\x02\x02\x02\u018C\u018F" +
		"\x03\x02\x02\x02\u018D\u018B\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02" +
		"\u018E\u0191\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02\u0190\u017C\x03" +
		"\x02\x02\x02\u0190\u0186\x03\x02\x02\x02\u0191)\x03\x02\x02\x02\u0192" +
		"\u0193\x05^0\x02\u0193\u0194\x07\x12\x02\x02\u0194\u0195\x05^0\x02\u0195" +
		"+\x03\x02\x02\x02\u0196\u0197\x07\x13\x02\x02\u0197\u0198\x05T+\x02\u0198" +
		"-\x03\x02\x02\x02\u0199\u019A\x07\x13\x02\x02\u019A\u01A3\x05T+\x02\u019B" +
		"\u019C\x07\x13\x02\x02\u019C\u01A3\x050\x19\x02\u019D\u019E\x07\x13\x02" +
		"\x02\u019E\u019F\x050\x19\x02\u019F\u01A0\x07[\x02\x02\u01A0\u01A1\x05" +
		"T+\x02\u01A1\u01A3\x03\x02\x02\x02\u01A2\u0199\x03\x02\x02\x02\u01A2\u019B" +
		"\x03\x02\x02\x02\u01A2\u019D\x03\x02\x02\x02\u01A3/\x03\x02\x02\x02\u01A4" +
		"\u01A7\x052\x1A\x02\u01A5\u01A6\x07\x12\x02\x02\u01A6\u01A8\x05\xA2R\x02" +
		"\u01A7\u01A5\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A81\x03\x02" +
		"\x02\x02\u01A9\u01AA\x07\u0100\x02\x02\u01AA\u01AB\x07j\x02\x02\u01AB" +
		"\u01AC\x05\\/\x02\u01AC\u01AD\x07[\x02\x02\u01AD\u01AF\x05\x8EH\x02\u01AE" +
		"\u01B0\x05\x9EP\x02\u01AF\u01AE\x03\x02\x02\x02\u01AF\u01B0\x03\x02\x02" +
		"\x02\u01B0\u01B1\x03\x02\x02\x02\u01B1\u01B2\x07k\x02\x02\u01B23\x03\x02" +
		"\x02\x02\u01B3\u01B8\x05X-\x02\u01B4\u01B5\x07[\x02\x02\u01B5\u01B7\x05" +
		"X-\x02\u01B6\u01B4\x03\x02\x02\x02\u01B7\u01BA\x03\x02\x02\x02\u01B8\u01B6" +
		"\x03\x02\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B95\x03\x02\x02\x02\u01BA" +
		"\u01B8\x03\x02\x02\x02\u01BB\u01BC\x05\\/\x02\u01BC\u01BD\x07]\x02\x02" +
		"\u01BD\u01BE\x05@!\x02\u01BE7\x03\x02\x02\x02\u01BF\u01C2\x05:\x1E\x02" +
		"\u01C0\u01C1\x07\x12\x02\x02\u01C1\u01C3\x05^0\x02\u01C2\u01C0\x03\x02" +
		"\x02\x02\u01C2\u01C3\x03\x02\x02\x02\u01C39\x03\x02\x02\x02\u01C4\u01C5" +
		"\x05<\x1F\x02\u01C5\u01C6\x07j\x02\x02\u01C6\u01C7\x05F$\x02\u01C7\u01C8" +
		"\x07k\x02\x02\u01C8\u01D3\x03\x02\x02\x02\u01C9\u01CA\x07u\x02\x02\u01CA" +
		"\u01CB\x07j\x02\x02\u01CB\u01D3\x07k\x02\x02\u01CC\u01CD\t\x03\x02\x02" +
		"\u01CD\u01CE\x07j\x02\x02\u01CE\u01CF\x05F$\x02\u01CF\u01D0\x07k\x02\x02" +
		"\u01D0\u01D3\x03\x02\x02\x02\u01D1\u01D3\x05> \x02\u01D2\u01C4\x03\x02" +
		"\x02\x02\u01D2\u01C9\x03\x02\x02\x02\u01D2\u01CC\x03\x02\x02\x02\u01D2" +
		"\u01D1\x03\x02\x02\x02\u01D3;\x03\x02\x02\x02\u01D4\u01D5\t\x04\x02\x02" +
		"\u01D5=\x03\x02\x02\x02\u01D6\u01D7\x07\x87\x02\x02\u01D7\u01D8\x07_\x02" +
		"\x02\u01D8\u01D9\x05\x94K\x02\u01D9\u01DA\x07^\x02\x02\u01DA\u01DB\x07" +
		"j\x02\x02\u01DB\u01DC\x05\\/\x02\u01DC\u01DD\x07k\x02\x02\u01DD?\x03\x02" +
		"\x02\x02\u01DE\u01E2\x05B\"\x02\u01DF\u01E2\x05D#\x02\u01E0\u01E2\x05" +
		"F$\x02\u01E1\u01DE\x03\x02\x02\x02\u01E1\u01DF\x03\x02\x02\x02\u01E1\u01E0" +
		"\x03\x02\x02\x02\u01E2A\x03\x02\x02\x02\u01E3\u01E4\b\"\x01\x02\u01E4" +
		"\u01EA\x05D#\x02\u01E5\u01E6\x072\x02\x02\u01E6\u01EA\x05B\"\b\u01E7\u01EA" +
		"\x05J&\x02\u01E8\u01EA\x05L\'\x02\u01E9\u01E3\x03\x02\x02\x02\u01E9\u01E5" +
		"\x03\x02\x02\x02\u01E9\u01E7\x03\x02\x02\x02\u01E9\u01E8\x03\x02\x02\x02" +
		"\u01EA\u01F8\x03\x02\x02\x02\u01EB\u01EC\f\x07\x02\x02\u01EC\u01ED\x07" +
		"3\x02\x02\u01ED\u01F7\x05B\"\b\u01EE\u01F0\f\x06\x02\x02\u01EF\u01F1\x07" +
		"4\x02\x02\u01F0\u01EF\x03\x02\x02\x02\u01F0\u01F1\x03\x02\x02\x02\u01F1" +
		"\u01F2\x03\x02\x02\x02\u01F2\u01F7\x05B\"\x07\u01F3\u01F4\f\x05\x02\x02" +
		"\u01F4\u01F5\x075\x02\x02\u01F5\u01F7\x05B\"\x06\u01F6\u01EB\x03\x02\x02" +
		"\x02\u01F6\u01EE";
	private static readonly _serializedATNSegment1: string =
		"\x03\x02\x02\x02\u01F6\u01F3\x03\x02\x02\x02\u01F7\u01FA\x03\x02\x02\x02" +
		"\u01F8\u01F6\x03\x02\x02\x02\u01F8\u01F9\x03\x02\x02\x02\u01F9C\x03\x02" +
		"\x02\x02\u01FA\u01F8\x03\x02\x02\x02\u01FB\u01FC\x05F$\x02\u01FC\u01FD" +
		"\x05\x86D\x02\u01FD\u01FE\x05F$\x02\u01FE\u0204\x03\x02\x02\x02\u01FF" +
		"\u0200\x05F$\x02\u0200\u0201\x071\x02\x02\u0201\u0202\x05\xA0Q\x02\u0202" +
		"\u0204\x03\x02\x02\x02\u0203\u01FB\x03\x02\x02\x02\u0203\u01FF\x03\x02" +
		"\x02\x02\u0204E\x03\x02\x02\x02\u0205\u0206\b$\x01\x02\u0206\u0207\x07" +
		"j\x02\x02\u0207\u0208\x05F$\x02\u0208\u0209\x05\x88E\x02\u0209\u020A\x05" +
		"F$\x02\u020A\u020B\x07k\x02\x02\u020B\u020E\x03\x02\x02\x02\u020C\u020E" +
		"\x05H%\x02\u020D\u0205\x03\x02\x02\x02\u020D\u020C\x03\x02\x02\x02\u020E" +
		"\u0215\x03\x02\x02\x02\u020F\u0210\f\x05\x02\x02\u0210\u0211\x05\x88E" +
		"\x02\u0211\u0212\x05F$\x06\u0212\u0214\x03\x02\x02\x02\u0213\u020F\x03" +
		"\x02\x02\x02\u0214\u0217\x03\x02\x02\x02\u0215\u0213\x03\x02\x02\x02\u0215" +
		"\u0216\x03\x02\x02\x02\u0216G\x03\x02\x02\x02\u0217\u0215\x03\x02\x02" +
		"\x02\u0218\u021D\x05`1\x02\u0219\u021D\x05b2\x02\u021A\u021D\x05\\/\x02" +
		"\u021B\u021D\x05\x8EH\x02\u021C\u0218\x03\x02\x02\x02\u021C\u0219\x03" +
		"\x02\x02\x02\u021C\u021A\x03\x02\x02\x02\u021C\u021B\x03\x02\x02\x02\u021D" +
		"I\x03\x02\x02\x02\u021E\u021F\x05d3\x02\u021FK\x03\x02\x02\x02\u0220\u0223" +
		"\x05N(\x02\u0221\u0223\x05P)\x02\u0222\u0220\x03\x02\x02\x02\u0222\u0221" +
		"\x03\x02\x02\x02\u0223M\x03\x02\x02\x02\u0224\u0225\x05\x8AF\x02\u0225" +
		"\u0226\x07j\x02\x02\u0226\u0227\x05v<\x02\u0227\u0228\x07[\x02\x02\u0228" +
		"\u022D\x05x=\x02\u0229\u022A\x07[\x02\x02\u022A\u022C\x05n8\x02\u022B" +
		"\u0229\x03\x02\x02\x02\u022C\u022F\x03\x02\x02\x02\u022D\u022B\x03\x02" +
		"\x02\x02\u022D\u022E\x03\x02\x02\x02\u022E\u0230\x03\x02\x02\x02\u022F" +
		"\u022D\x03\x02\x02\x02\u0230\u0231\x07k\x02\x02\u0231O\x03\x02\x02\x02" +
		"\u0232\u0233\x05\x8CG\x02\u0233\u0234\x07j\x02\x02\u0234\u0235\x07l\x02" +
		"\x02\u0235\u023A\x05r:\x02\u0236\u0237\x07[\x02\x02\u0237\u0239\x05r:" +
		"\x02\u0238\u0236\x03\x02\x02\x02\u0239\u023C\x03\x02\x02\x02\u023A\u0238" +
		"\x03\x02\x02\x02\u023A\u023B\x03\x02\x02\x02\u023B\u023D\x03\x02\x02\x02" +
		"\u023C\u023A\x03\x02\x02\x02\u023D\u023E\x07m\x02\x02\u023E\u023F\x07" +
		"[\x02\x02\u023F\u0244\x05x=\x02\u0240\u0241\x07[\x02\x02\u0241\u0243\x05" +
		"n8\x02\u0242\u0240\x03\x02\x02\x02\u0243\u0246\x03\x02\x02\x02\u0244\u0242" +
		"\x03\x02\x02\x02\u0244\u0245\x03\x02\x02\x02\u0245\u0247\x03\x02\x02\x02" +
		"\u0246\u0244\x03\x02\x02\x02\u0247\u0248\x07k\x02\x02\u0248Q\x03\x02\x02" +
		"\x02\u0249\u024C\x05\xA2R\x02\u024A\u024C\x07\u010B\x02\x02\u024B\u0249" +
		"\x03\x02\x02\x02\u024B\u024A\x03\x02\x02\x02\u024CS\x03\x02\x02\x02\u024D" +
		"\u0252\x05\\/\x02\u024E\u024F\x07[\x02\x02\u024F\u0251\x05\\/\x02\u0250" +
		"\u024E\x03\x02\x02\x02\u0251\u0254\x03\x02\x02\x02\u0252\u0250\x03\x02" +
		"\x02\x02\u0252\u0253\x03\x02\x02\x02\u0253U\x03\x02\x02\x02\u0254\u0252" +
		"\x03\x02\x02\x02\u0255\u025A\x05^0\x02\u0256\u0257\x07[\x02\x02\u0257" +
		"\u0259\x05^0\x02\u0258\u0256\x03\x02\x02\x02\u0259\u025C\x03\x02\x02\x02" +
		"\u025A\u0258\x03\x02\x02\x02\u025A\u025B\x03\x02\x02\x02\u025BW\x03\x02" +
		"\x02\x02\u025C\u025A\x03\x02\x02\x02\u025D\u025F\t\x02\x02\x02\u025E\u025D" +
		"\x03\x02\x02\x02\u025E\u025F\x03\x02\x02\x02\u025F\u0260\x03\x02\x02\x02" +
		"\u0260\u0261\x05Z.\x02\u0261Y\x03\x02\x02\x02\u0262\u0278\x05\\/\x02\u0263" +
		"\u0264\x07\x19\x02\x02\u0264\u0265\x07j\x02\x02\u0265\u0266\x05\\/\x02" +
		"\u0266\u0267\x07k\x02\x02\u0267\u0278\x03\x02\x02\x02\u0268\u0269\x07" +
		"\x1A\x02\x02\u0269\u026A\x07j\x02\x02\u026A\u026B\x05\\/\x02\u026B\u026C" +
		"\x07k\x02\x02\u026C\u0278\x03\x02\x02\x02\u026D\u026E\x07\x1B\x02\x02" +
		"\u026E\u026F\x07j\x02\x02\u026F\u0270\x05\\/\x02\u0270\u0271\x07k\x02" +
		"\x02\u0271\u0278\x03\x02\x02\x02\u0272\u0273\x07\x1C\x02\x02\u0273\u0274" +
		"\x07j\x02\x02\u0274\u0275\x05\\/\x02\u0275\u0276\x07k\x02\x02\u0276\u0278" +
		"\x03\x02\x02\x02\u0277\u0262\x03\x02\x02\x02\u0277\u0263\x03\x02\x02\x02" +
		"\u0277\u0268\x03\x02\x02\x02\u0277\u026D\x03\x02\x02\x02\u0277\u0272\x03" +
		"\x02\x02\x02\u0278[\x03\x02\x02\x02\u0279\u027A\x05\xA2R\x02\u027A]\x03" +
		"\x02\x02\x02\u027B\u027C\x05\xA4S\x02\u027C_\x03\x02\x02\x02\u027D\u027E" +
		"\x05h5\x02\u027E\u027F\x07j\x02\x02\u027F\u0280\x05j6\x02\u0280\u0281" +
		"\x07k\x02\x02\u0281a\x03\x02\x02\x02\u0282\u0283\x07\xD8\x02\x02\u0283" +
		"\u0284\x07j\x02\x02\u0284\u0285\x05@!\x02\u0285\u0286\x07\x12\x02\x02" +
		"\u0286\u0287\x05f4\x02\u0287\u0288\x07k\x02\x02\u0288c\x03\x02\x02\x02" +
		"\u0289\u028A\x05\x82B\x02\u028A\u028B\x07j\x02\x02\u028B\u028C\x05j6\x02" +
		"\u028C\u028D\x07k\x02\x02\u028De\x03\x02\x02\x02\u028E\u0299\x07\xB8\x02" +
		"\x02\u028F\u0299\x07\xC2\x02\x02\u0290\u0299\x07\xC4\x02\x02\u0291\u0299" +
		"\x07S\x02\x02\u0292\u0299\x07T\x02\x02\u0293\u0299\x07U\x02\x02\u0294" +
		"\u0299\x07V\x02\x02\u0295\u0299\x07W\x02\x02\u0296\u0299\x07X\x02\x02" +
		"\u0297\u0299\x07Y\x02\x02\u0298\u028E\x03\x02\x02\x02\u0298\u028F\x03" +
		"\x02\x02\x02\u0298\u0290\x03\x02\x02\x02\u0298\u0291\x03\x02\x02\x02\u0298" +
		"\u0292\x03\x02\x02\x02\u0298\u0293\x03\x02\x02\x02\u0298\u0294\x03\x02" +
		"\x02\x02\u0298\u0295\x03\x02\x02\x02\u0298\u0296\x03\x02\x02\x02\u0298" +
		"\u0297\x03\x02\x02\x02\u0299g\x03\x02\x02\x02\u029A\u029F\x05|?\x02\u029B" +
		"\u029F\x05\x80A\x02\u029C\u029F\x05\x84C\x02\u029D\u029F\x05\x82B\x02" +
		"\u029E\u029A\x03\x02\x02\x02\u029E\u029B\x03\x02\x02\x02\u029E\u029C\x03" +
		"\x02\x02\x02\u029E\u029D\x03\x02\x02\x02\u029Fi\x03\x02\x02\x02\u02A0" +
		"\u02A5\x05l7\x02\u02A1\u02A2\x07[\x02\x02\u02A2\u02A4\x05l7\x02\u02A3" +
		"\u02A1\x03\x02\x02\x02\u02A4\u02A7\x03\x02\x02\x02\u02A5\u02A3\x03\x02" +
		"\x02\x02\u02A5\u02A6\x03\x02\x02\x02\u02A6\u02A9\x03\x02\x02\x02\u02A7" +
		"\u02A5\x03\x02\x02\x02\u02A8\u02A0\x03\x02\x02\x02\u02A8\u02A9\x03\x02" +
		"\x02\x02\u02A9k\x03\x02\x02\x02\u02AA\u02AB\x05F$\x02\u02ABm\x03\x02\x02" +
		"\x02\u02AC\u02AD\x05p9\x02\u02AD\u02AE\x07]\x02\x02\u02AE\u02AF\x05z>" +
		"\x02\u02AFo\x03\x02\x02\x02\u02B0\u02B1\t\x05\x02\x02\u02B1q\x03\x02\x02" +
		"\x02\u02B2\u02BB\x05v<\x02\u02B3\u02B4\x05v<\x02\u02B4\u02B5\x05t;\x02" +
		"\u02B5\u02BB\x03\x02\x02\x02\u02B6\u02B7\x05v<\x02\u02B7\u02B8\x07s\x02" +
		"\x02\u02B8\u02B9\x05t;\x02\u02B9\u02BB\x03\x02\x02\x02\u02BA\u02B2\x03" +
		"\x02\x02\x02\u02BA\u02B3\x03\x02\x02\x02\u02BA\u02B6\x03\x02\x02\x02\u02BB" +
		"s\x03\x02\x02\x02\u02BC\u02BF\x05\x94K\x02\u02BD\u02BF\x05\x96L\x02\u02BE" +
		"\u02BC\x03\x02\x02\x02\u02BE\u02BD\x03\x02\x02\x02\u02BFu\x03\x02\x02" +
		"\x02\u02C0\u02C3\x05\xA2R\x02\u02C1\u02C3\x05\x92J\x02\u02C2\u02C0\x03" +
		"\x02\x02\x02\u02C2\u02C1\x03\x02\x02\x02\u02C3w\x03\x02\x02\x02\u02C4" +
		"\u02C5\x05z>\x02\u02C5y\x03\x02\x02\x02\u02C6\u02C9\x05\xA2R\x02\u02C7" +
		"\u02C9\x05\x8EH\x02\u02C8\u02C6\x03\x02\x02\x02\u02C8\u02C7\x03\x02\x02" +
		"\x02\u02C9{\x03\x02\x02\x02\u02CA\u02E1\x07\x98\x02\x02\u02CB\u02E1\x07" +
		"\x99\x02\x02\u02CC\u02E1\x07\x9A\x02\x02\u02CD\u02E1\x07\x9B\x02\x02\u02CE" +
		"\u02E1\x07\x9C\x02\x02\u02CF\u02E1\x07\x9D\x02\x02\u02D0\u02E1\x07\x9E" +
		"\x02\x02\u02D1\u02E1\x07\x9F\x02\x02\u02D2\u02E1\x07\xA0\x02\x02\u02D3" +
		"\u02E1\x07\xA1\x02\x02\u02D4\u02E1\x07\xA2\x02\x02\u02D5\u02E1\x07\xA3" +
		"\x02\x02\u02D6\u02E1\x07\xA4\x02\x02\u02D7\u02E1\x07\xA5\x02\x02\u02D8" +
		"\u02E1\x07\xA6\x02\x02\u02D9\u02E1\x07\xA7\x02\x02\u02DA\u02E1\x07\xA8" +
		"\x02\x02\u02DB\u02E1\x07\xA9\x02\x02\u02DC\u02E1\x07\xAA\x02\x02\u02DD" +
		"\u02E1\x07\xAB\x02\x02\u02DE\u02E1\x07\xAC\x02\x02\u02DF\u02E1\x05~@\x02" +
		"\u02E0\u02CA\x03\x02\x02\x02\u02E0\u02CB\x03\x02\x02\x02\u02E0\u02CC\x03" +
		"\x02\x02\x02\u02E0\u02CD\x03\x02\x02\x02\u02E0\u02CE\x03\x02\x02\x02\u02E0" +
		"\u02CF\x03\x02\x02\x02\u02E0\u02D0\x03\x02\x02\x02\u02E0\u02D1\x03\x02" +
		"\x02\x02\u02E0\u02D2\x03\x02\x02\x02\u02E0\u02D3\x03\x02\x02\x02\u02E0" +
		"\u02D4\x03\x02\x02\x02\u02E0\u02D5\x03\x02\x02\x02\u02E0\u02D6\x03\x02" +
		"\x02\x02\u02E0\u02D7\x03\x02\x02\x02\u02E0\u02D8\x03\x02\x02\x02\u02E0" +
		"\u02D9\x03\x02\x02\x02\u02E0\u02DA\x03\x02\x02\x02\u02E0\u02DB\x03\x02" +
		"\x02\x02\u02E0\u02DC\x03\x02\x02\x02\u02E0\u02DD\x03\x02\x02\x02\u02E0" +
		"\u02DE\x03\x02\x02\x02\u02E0\u02DF\x03\x02\x02\x02\u02E1}\x03\x02\x02" +
		"\x02\u02E2\u02E3\t\x06\x02\x02\u02E3\x7F\x03\x02\x02\x02\u02E4\u02E5\t" +
		"\x07\x02\x02\u02E5\x81\x03\x02\x02\x02\u02E6\u02E7\t\b\x02\x02\u02E7\x83" +
		"\x03\x02\x02\x02\u02E8\u02E9\t\t\x02\x02\u02E9\x85\x03\x02\x02\x02\u02EA" +
		"\u02EB\t\n\x02\x02\u02EB\x87\x03\x02\x02\x02\u02EC\u02ED\t\v\x02\x02\u02ED" +
		"\x89\x03\x02\x02\x02\u02EE\u02EF\t\f\x02\x02\u02EF\x8B\x03\x02\x02\x02" +
		"\u02F0\u02F1\x07\xE1\x02\x02\u02F1\x8D\x03\x02\x02\x02\u02F2\u02F8\x05" +
		"\x90I\x02\u02F3\u02F8\x05\x92J\x02\u02F4\u02F8\x05\x94K\x02\u02F5\u02F8" +
		"\x05\x96L\x02\u02F6\u02F8\x05\x98M\x02\u02F7\u02F2\x03\x02\x02\x02\u02F7" +
		"\u02F3\x03\x02\x02\x02\u02F7\u02F4\x03\x02\x02\x02\u02F7\u02F5\x03\x02" +
		"\x02\x02\u02F7\u02F6\x03\x02\x02\x02\u02F8\x8F\x03\x02\x02\x02\u02F9\u02FA" +
		"\x07:\x02\x02\u02FA\u02FB\x05F$\x02\u02FB\u02FC\x05\x9CO\x02\u02FC\x91" +
		"\x03\x02\x02\x02\u02FD\u02FE\t\r\x02\x02\u02FE\x93\x03\x02\x02\x02\u02FF" +
		"\u0301\t\x02\x02\x02\u0300\u02FF\x03\x02\x02\x02\u0300\u0301\x03\x02\x02" +
		"\x02\u0301\u0302\x03\x02\x02\x02\u0302\u0303\x07\u0109\x02\x02\u0303\x95" +
		"\x03\x02\x02\x02\u0304\u0306\t\x02\x02\x02\u0305\u0304\x03\x02\x02\x02" +
		"\u0305\u0306\x03\x02\x02\x02\u0306\u0307\x03\x02\x02\x02\u0307\u0308\x07" +
		"\u010A\x02\x02\u0308\x97\x03\x02\x02\x02\u0309\u030A\t\x0E\x02\x02\u030A" +
		"\x99\x03\x02\x02\x02\u030B\u030C\x05\x92J\x02\u030C\x9B\x03\x02\x02\x02" +
		"\u030D\u030E\t\x0F\x02\x02\u030E\x9D\x03\x02\x02\x02\u030F\u0310\t\x10" +
		"\x02\x02\u0310\x9F\x03\x02\x02\x02\u0311\u0312\x07j\x02\x02\u0312\u0317" +
		"\x05\x8EH\x02\u0313\u0314\x07[\x02\x02\u0314\u0316\x05\x8EH\x02\u0315" +
		"\u0313\x03\x02\x02\x02\u0316\u0319\x03\x02\x02\x02\u0317\u0315\x03\x02" +
		"\x02\x02\u0317\u0318\x03\x02\x02\x02\u0318\u031A\x03\x02\x02\x02\u0319" +
		"\u0317\x03\x02\x02\x02\u031A\u031B\x07k\x02\x02\u031B\xA1\x03\x02\x02" +
		"\x02\u031C\u0321\x05\xA6T\x02\u031D\u031E\x07\\\x02\x02\u031E\u0320\x05" +
		"\xA6T\x02\u031F\u031D\x03\x02\x02\x02\u0320\u0323\x03\x02\x02\x02\u0321" +
		"\u031F\x03\x02\x02\x02\u0321\u0322\x03\x02\x02\x02\u0322\xA3\x03\x02\x02" +
		"\x02\u0323\u0321\x03\x02\x02\x02\u0324\u0329\x05\xA8U\x02\u0325\u0326" +
		"\x07\\\x02\x02\u0326\u0328\x05\xA8U\x02\u0327\u0325\x03\x02\x02\x02\u0328" +
		"\u032B\x03\x02\x02\x02\u0329\u0327\x03\x02\x02\x02\u0329\u032A\x03\x02" +
		"\x02\x02\u032A\xA5\x03\x02\x02\x02\u032B\u0329\x03\x02\x02\x02\u032C\u032E" +
		"\x07\\\x02\x02\u032D\u032C\x03\x02\x02\x02\u032D\u032E\x03\x02\x02\x02" +
		"\u032E\u032F\x03\x02\x02\x02\u032F\u0337\x07\u0108\x02\x02\u0330\u0331" +
		"\x07p\x02\x02\u0331\u0332\x05\xA6T\x02\u0332\u0333\x07p\x02\x02\u0333" +
		"\u0337\x03\x02\x02\x02\u0334\u0337\x07\u010E\x02\x02\u0335\u0337\x05\xAA" +
		"V\x02\u0336\u032D\x03\x02\x02\x02\u0336\u0330\x03\x02\x02\x02\u0336\u0334" +
		"\x03\x02\x02\x02\u0336\u0335\x03\x02\x02\x02\u0337\xA7\x03\x02\x02\x02" +
		"\u0338\u033D\x05\xA6T\x02\u0339\u033A\x07g\x02\x02\u033A\u033C\x05\xA6" +
		"T\x02\u033B\u0339\x03\x02\x02\x02\u033C\u033F\x03\x02\x02\x02\u033D\u033B" +
		"\x03\x02\x02\x02\u033D\u033E\x03\x02\x02\x02\u033E\u0341\x03\x02\x02\x02" +
		"\u033F\u033D\x03\x02\x02\x02\u0340\u0342\x07g\x02\x02\u0341\u0340\x03" +
		"\x02\x02\x02\u0341\u0342\x03\x02\x02\x02\u0342\u0350\x03\x02\x02\x02\u0343" +
		"\u0344\x07n\x02\x02\u0344\u0345\x05\xA8U\x02\u0345\u0346\x07n\x02\x02" +
		"\u0346\u0350\x03\x02\x02\x02\u0347\u0348\x07o\x02\x02\u0348\u0349\x05" +
		"\xA8U\x02\u0349\u034A\x07o\x02\x02\u034A\u0350\x03\x02\x02\x02\u034B\u034C" +
		"\x07p\x02\x02\u034C\u034D\x05\xA8U\x02\u034D\u034E\x07p\x02\x02\u034E" +
		"\u0350\x03\x02\x02\x02\u034F\u0338\x03\x02\x02\x02\u034F\u0343\x03\x02" +
		"\x02\x02\u034F\u0347\x03\x02\x02\x02\u034F\u034B\x03\x02\x02\x02\u0350" +
		"\xA9\x03\x02\x02\x02\u0351\u035B\x07\x16\x02\x02\u0352\u035B\x05<\x1F" +
		"\x02\u0353\u035B\x07\xC4\x02\x02\u0354\u035B\x07\xB8\x02\x02\u0355\u035B" +
		"\x07\xC2\x02\x02\u0356\u035B\x07\x88\x02\x02\u0357\u035B\x07\x89\x02\x02" +
		"\u0358\u035B\x05\x9EP\x02\u0359\u035B\x07\u0100\x02\x02\u035A\u0351\x03" +
		"\x02\x02\x02\u035A\u0352\x03\x02\x02\x02\u035A\u0353\x03\x02\x02\x02\u035A" +
		"\u0354\x03\x02\x02\x02\u035A\u0355\x03\x02\x02\x02\u035A\u0356\x03\x02" +
		"\x02\x02\u035A\u0357\x03\x02\x02\x02\u035A\u0358\x03\x02\x02\x02\u035A" +
		"\u0359\x03\x02\x02\x02\u035B\xAB\x03\x02\x02\x02N\xAD\xB6\xC6\xC9\xCD" +
		"\xD3\xD8\xDF\xE9\xF0\xF5\xFA\u0101\u0105\u010A\u010E\u0114\u0119\u0124" +
		"\u0129\u012D\u0131\u0135\u013A\u0144\u0150\u0156\u017A\u0183\u018D\u0190" +
		"\u01A2\u01A7\u01AF\u01B8\u01C2\u01D2\u01E1\u01E9\u01F0\u01F6\u01F8\u0203" +
		"\u020D\u0215\u021C\u0222\u022D\u023A\u0244\u024B\u0252\u025A\u025E\u0277" +
		"\u0298\u029E\u02A5\u02A8\u02BA\u02BE\u02C2\u02C8\u02E0\u02F7\u0300\u0305" +
		"\u0317\u0321\u0329\u032D\u0336\u033D\u0341\u034F\u035A";
	public static readonly _serializedATN: string = Utils.join(
		[
			OpenSearchPPLParser._serializedATNSegment0,
			OpenSearchPPLParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!OpenSearchPPLParser.__ATN) {
			OpenSearchPPLParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(OpenSearchPPLParser._serializedATN));
		}

		return OpenSearchPPLParser.__ATN;
	}

}

export class RootContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(OpenSearchPPLParser.EOF, 0); }
	public pplStatement(): PplStatementContext | undefined {
		return this.tryGetRuleContext(0, PplStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_root; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRoot) {
			listener.enterRoot(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRoot) {
			listener.exitRoot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRoot) {
			return visitor.visitRoot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PplStatementContext extends ParserRuleContext {
	public searchCommand(): SearchCommandContext {
		return this.getRuleContext(0, SearchCommandContext);
	}
	public PIPE(): TerminalNode[];
	public PIPE(i: number): TerminalNode;
	public PIPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.PIPE);
		} else {
			return this.getToken(OpenSearchPPLParser.PIPE, i);
		}
	}
	public commands(): CommandsContext[];
	public commands(i: number): CommandsContext;
	public commands(i?: number): CommandsContext | CommandsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommandsContext);
		} else {
			return this.getRuleContext(i, CommandsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_pplStatement; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPplStatement) {
			listener.enterPplStatement(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPplStatement) {
			listener.exitPplStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPplStatement) {
			return visitor.visitPplStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommandsContext extends ParserRuleContext {
	public whereCommand(): WhereCommandContext | undefined {
		return this.tryGetRuleContext(0, WhereCommandContext);
	}
	public fieldsCommand(): FieldsCommandContext | undefined {
		return this.tryGetRuleContext(0, FieldsCommandContext);
	}
	public renameCommand(): RenameCommandContext | undefined {
		return this.tryGetRuleContext(0, RenameCommandContext);
	}
	public statsCommand(): StatsCommandContext | undefined {
		return this.tryGetRuleContext(0, StatsCommandContext);
	}
	public dedupCommand(): DedupCommandContext | undefined {
		return this.tryGetRuleContext(0, DedupCommandContext);
	}
	public sortCommand(): SortCommandContext | undefined {
		return this.tryGetRuleContext(0, SortCommandContext);
	}
	public evalCommand(): EvalCommandContext | undefined {
		return this.tryGetRuleContext(0, EvalCommandContext);
	}
	public headCommand(): HeadCommandContext | undefined {
		return this.tryGetRuleContext(0, HeadCommandContext);
	}
	public topCommand(): TopCommandContext | undefined {
		return this.tryGetRuleContext(0, TopCommandContext);
	}
	public rareCommand(): RareCommandContext | undefined {
		return this.tryGetRuleContext(0, RareCommandContext);
	}
	public parseCommand(): ParseCommandContext | undefined {
		return this.tryGetRuleContext(0, ParseCommandContext);
	}
	public kmeansCommand(): KmeansCommandContext | undefined {
		return this.tryGetRuleContext(0, KmeansCommandContext);
	}
	public adCommand(): AdCommandContext | undefined {
		return this.tryGetRuleContext(0, AdCommandContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_commands; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterCommands) {
			listener.enterCommands(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitCommands) {
			listener.exitCommands(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitCommands) {
			return visitor.visitCommands(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SearchCommandContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_searchCommand; }
	public copyFrom(ctx: SearchCommandContext): void {
		super.copyFrom(ctx);
	}
}
export class SearchFromContext extends SearchCommandContext {
	public fromClause(): FromClauseContext {
		return this.getRuleContext(0, FromClauseContext);
	}
	public SEARCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SEARCH, 0); }
	constructor(ctx: SearchCommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSearchFrom) {
			listener.enterSearchFrom(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSearchFrom) {
			listener.exitSearchFrom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSearchFrom) {
			return visitor.visitSearchFrom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SearchFromFilterContext extends SearchCommandContext {
	public fromClause(): FromClauseContext {
		return this.getRuleContext(0, FromClauseContext);
	}
	public logicalExpression(): LogicalExpressionContext {
		return this.getRuleContext(0, LogicalExpressionContext);
	}
	public SEARCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SEARCH, 0); }
	constructor(ctx: SearchCommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSearchFromFilter) {
			listener.enterSearchFromFilter(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSearchFromFilter) {
			listener.exitSearchFromFilter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSearchFromFilter) {
			return visitor.visitSearchFromFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SearchFilterFromContext extends SearchCommandContext {
	public logicalExpression(): LogicalExpressionContext {
		return this.getRuleContext(0, LogicalExpressionContext);
	}
	public fromClause(): FromClauseContext {
		return this.getRuleContext(0, FromClauseContext);
	}
	public SEARCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SEARCH, 0); }
	constructor(ctx: SearchCommandContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSearchFilterFrom) {
			listener.enterSearchFilterFrom(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSearchFilterFrom) {
			listener.exitSearchFilterFrom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSearchFilterFrom) {
			return visitor.visitSearchFilterFrom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereCommandContext extends ParserRuleContext {
	public WHERE(): TerminalNode { return this.getToken(OpenSearchPPLParser.WHERE, 0); }
	public logicalExpression(): LogicalExpressionContext {
		return this.getRuleContext(0, LogicalExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_whereCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterWhereCommand) {
			listener.enterWhereCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitWhereCommand) {
			listener.exitWhereCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitWhereCommand) {
			return visitor.visitWhereCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldsCommandContext extends ParserRuleContext {
	public FIELDS(): TerminalNode { return this.getToken(OpenSearchPPLParser.FIELDS, 0); }
	public fieldList(): FieldListContext {
		return this.getRuleContext(0, FieldListContext);
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_fieldsCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFieldsCommand) {
			listener.enterFieldsCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFieldsCommand) {
			listener.exitFieldsCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFieldsCommand) {
			return visitor.visitFieldsCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RenameCommandContext extends ParserRuleContext {
	public RENAME(): TerminalNode { return this.getToken(OpenSearchPPLParser.RENAME, 0); }
	public renameClasue(): RenameClasueContext[];
	public renameClasue(i: number): RenameClasueContext;
	public renameClasue(i?: number): RenameClasueContext | RenameClasueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RenameClasueContext);
		} else {
			return this.getRuleContext(i, RenameClasueContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_renameCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRenameCommand) {
			listener.enterRenameCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRenameCommand) {
			listener.exitRenameCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRenameCommand) {
			return visitor.visitRenameCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsCommandContext extends ParserRuleContext {
	public _partitions!: IntegerLiteralContext;
	public _allnum!: BooleanLiteralContext;
	public _delim!: StringLiteralContext;
	public _dedupsplit!: BooleanLiteralContext;
	public STATS(): TerminalNode { return this.getToken(OpenSearchPPLParser.STATS, 0); }
	public statsAggTerm(): StatsAggTermContext[];
	public statsAggTerm(i: number): StatsAggTermContext;
	public statsAggTerm(i?: number): StatsAggTermContext | StatsAggTermContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatsAggTermContext);
		} else {
			return this.getRuleContext(i, StatsAggTermContext);
		}
	}
	public PARTITIONS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PARTITIONS, 0); }
	public EQUAL(): TerminalNode[];
	public EQUAL(i: number): TerminalNode;
	public EQUAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.EQUAL);
		} else {
			return this.getToken(OpenSearchPPLParser.EQUAL, i);
		}
	}
	public ALLNUM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ALLNUM, 0); }
	public DELIM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DELIM, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	public statsByClause(): StatsByClauseContext | undefined {
		return this.tryGetRuleContext(0, StatsByClauseContext);
	}
	public DEDUP_SPLITVALUES(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DEDUP_SPLITVALUES, 0); }
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public booleanLiteral(): BooleanLiteralContext[];
	public booleanLiteral(i: number): BooleanLiteralContext;
	public booleanLiteral(i?: number): BooleanLiteralContext | BooleanLiteralContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BooleanLiteralContext);
		} else {
			return this.getRuleContext(i, BooleanLiteralContext);
		}
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_statsCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStatsCommand) {
			listener.enterStatsCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStatsCommand) {
			listener.exitStatsCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStatsCommand) {
			return visitor.visitStatsCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DedupCommandContext extends ParserRuleContext {
	public _number!: IntegerLiteralContext;
	public _keepempty!: BooleanLiteralContext;
	public _consecutive!: BooleanLiteralContext;
	public DEDUP(): TerminalNode { return this.getToken(OpenSearchPPLParser.DEDUP, 0); }
	public fieldList(): FieldListContext {
		return this.getRuleContext(0, FieldListContext);
	}
	public KEEPEMPTY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.KEEPEMPTY, 0); }
	public EQUAL(): TerminalNode[];
	public EQUAL(i: number): TerminalNode;
	public EQUAL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.EQUAL);
		} else {
			return this.getToken(OpenSearchPPLParser.EQUAL, i);
		}
	}
	public CONSECUTIVE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CONSECUTIVE, 0); }
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public booleanLiteral(): BooleanLiteralContext[];
	public booleanLiteral(i: number): BooleanLiteralContext;
	public booleanLiteral(i?: number): BooleanLiteralContext | BooleanLiteralContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BooleanLiteralContext);
		} else {
			return this.getRuleContext(i, BooleanLiteralContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_dedupCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDedupCommand) {
			listener.enterDedupCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDedupCommand) {
			listener.exitDedupCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDedupCommand) {
			return visitor.visitDedupCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortCommandContext extends ParserRuleContext {
	public SORT(): TerminalNode { return this.getToken(OpenSearchPPLParser.SORT, 0); }
	public sortbyClause(): SortbyClauseContext {
		return this.getRuleContext(0, SortbyClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_sortCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSortCommand) {
			listener.enterSortCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSortCommand) {
			listener.exitSortCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSortCommand) {
			return visitor.visitSortCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalCommandContext extends ParserRuleContext {
	public EVAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.EVAL, 0); }
	public evalClause(): EvalClauseContext[];
	public evalClause(i: number): EvalClauseContext;
	public evalClause(i?: number): EvalClauseContext | EvalClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EvalClauseContext);
		} else {
			return this.getRuleContext(i, EvalClauseContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_evalCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterEvalCommand) {
			listener.enterEvalCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitEvalCommand) {
			listener.exitEvalCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitEvalCommand) {
			return visitor.visitEvalCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HeadCommandContext extends ParserRuleContext {
	public _number!: IntegerLiteralContext;
	public _from!: IntegerLiteralContext;
	public HEAD(): TerminalNode { return this.getToken(OpenSearchPPLParser.HEAD, 0); }
	public FROM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FROM, 0); }
	public integerLiteral(): IntegerLiteralContext[];
	public integerLiteral(i: number): IntegerLiteralContext;
	public integerLiteral(i?: number): IntegerLiteralContext | IntegerLiteralContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntegerLiteralContext);
		} else {
			return this.getRuleContext(i, IntegerLiteralContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_headCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterHeadCommand) {
			listener.enterHeadCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitHeadCommand) {
			listener.exitHeadCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitHeadCommand) {
			return visitor.visitHeadCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TopCommandContext extends ParserRuleContext {
	public _number!: IntegerLiteralContext;
	public TOP(): TerminalNode { return this.getToken(OpenSearchPPLParser.TOP, 0); }
	public fieldList(): FieldListContext {
		return this.getRuleContext(0, FieldListContext);
	}
	public byClause(): ByClauseContext | undefined {
		return this.tryGetRuleContext(0, ByClauseContext);
	}
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_topCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTopCommand) {
			listener.enterTopCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTopCommand) {
			listener.exitTopCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTopCommand) {
			return visitor.visitTopCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RareCommandContext extends ParserRuleContext {
	public RARE(): TerminalNode { return this.getToken(OpenSearchPPLParser.RARE, 0); }
	public fieldList(): FieldListContext {
		return this.getRuleContext(0, FieldListContext);
	}
	public byClause(): ByClauseContext | undefined {
		return this.tryGetRuleContext(0, ByClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_rareCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRareCommand) {
			listener.enterRareCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRareCommand) {
			listener.exitRareCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRareCommand) {
			return visitor.visitRareCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParseCommandContext extends ParserRuleContext {
	public PARSE(): TerminalNode { return this.getToken(OpenSearchPPLParser.PARSE, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_parseCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterParseCommand) {
			listener.enterParseCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitParseCommand) {
			listener.exitParseCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitParseCommand) {
			return visitor.visitParseCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KmeansCommandContext extends ParserRuleContext {
	public KMEANS(): TerminalNode { return this.getToken(OpenSearchPPLParser.KMEANS, 0); }
	public kmeansParameter(): KmeansParameterContext[];
	public kmeansParameter(i: number): KmeansParameterContext;
	public kmeansParameter(i?: number): KmeansParameterContext | KmeansParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(KmeansParameterContext);
		} else {
			return this.getRuleContext(i, KmeansParameterContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_kmeansCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterKmeansCommand) {
			listener.enterKmeansCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitKmeansCommand) {
			listener.exitKmeansCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitKmeansCommand) {
			return visitor.visitKmeansCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KmeansParameterContext extends ParserRuleContext {
	public _centroids!: IntegerLiteralContext;
	public _iterations!: IntegerLiteralContext;
	public _distance_type!: StringLiteralContext;
	public CENTROIDS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CENTROIDS, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public ITERATIONS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ITERATIONS, 0); }
	public DISTANCE_TYPE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DISTANCE_TYPE, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_kmeansParameter; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterKmeansParameter) {
			listener.enterKmeansParameter(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitKmeansParameter) {
			listener.exitKmeansParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitKmeansParameter) {
			return visitor.visitKmeansParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdCommandContext extends ParserRuleContext {
	public AD(): TerminalNode { return this.getToken(OpenSearchPPLParser.AD, 0); }
	public adParameter(): AdParameterContext[];
	public adParameter(i: number): AdParameterContext;
	public adParameter(i?: number): AdParameterContext | AdParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AdParameterContext);
		} else {
			return this.getRuleContext(i, AdParameterContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_adCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterAdCommand) {
			listener.enterAdCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitAdCommand) {
			listener.exitAdCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitAdCommand) {
			return visitor.visitAdCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdParameterContext extends ParserRuleContext {
	public _number_of_trees!: IntegerLiteralContext;
	public _shingle_size!: IntegerLiteralContext;
	public _sample_size!: IntegerLiteralContext;
	public _output_after!: IntegerLiteralContext;
	public _time_decay!: DecimalLiteralContext;
	public _anomaly_rate!: DecimalLiteralContext;
	public _time_field!: StringLiteralContext;
	public _date_format!: StringLiteralContext;
	public _time_zone!: StringLiteralContext;
	public _training_data_size!: IntegerLiteralContext;
	public _anomaly_score_threshold!: DecimalLiteralContext;
	public NUMBER_OF_TREES(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NUMBER_OF_TREES, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public SHINGLE_SIZE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SHINGLE_SIZE, 0); }
	public SAMPLE_SIZE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SAMPLE_SIZE, 0); }
	public OUTPUT_AFTER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.OUTPUT_AFTER, 0); }
	public TIME_DECAY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_DECAY, 0); }
	public decimalLiteral(): DecimalLiteralContext | undefined {
		return this.tryGetRuleContext(0, DecimalLiteralContext);
	}
	public ANOMALY_RATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ANOMALY_RATE, 0); }
	public TIME_FIELD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_FIELD, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public DATE_FORMAT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_FORMAT, 0); }
	public TIME_ZONE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_ZONE, 0); }
	public TRAINING_DATA_SIZE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TRAINING_DATA_SIZE, 0); }
	public ANOMALY_SCORE_THRESHOLD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_adParameter; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterAdParameter) {
			listener.enterAdParameter(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitAdParameter) {
			listener.exitAdParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitAdParameter) {
			return visitor.visitAdParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromClauseContext extends ParserRuleContext {
	public SOURCE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SOURCE, 0); }
	public EQUAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.EQUAL, 0); }
	public tableSource(): TableSourceContext[];
	public tableSource(i: number): TableSourceContext;
	public tableSource(i?: number): TableSourceContext | TableSourceContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableSourceContext);
		} else {
			return this.getRuleContext(i, TableSourceContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	public INDEX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.INDEX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_fromClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFromClause) {
			listener.enterFromClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFromClause) {
			listener.exitFromClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFromClause) {
			return visitor.visitFromClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RenameClasueContext extends ParserRuleContext {
	public _orignalField!: WcFieldExpressionContext;
	public _renamedField!: WcFieldExpressionContext;
	public AS(): TerminalNode { return this.getToken(OpenSearchPPLParser.AS, 0); }
	public wcFieldExpression(): WcFieldExpressionContext[];
	public wcFieldExpression(i: number): WcFieldExpressionContext;
	public wcFieldExpression(i?: number): WcFieldExpressionContext | WcFieldExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WcFieldExpressionContext);
		} else {
			return this.getRuleContext(i, WcFieldExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_renameClasue; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRenameClasue) {
			listener.enterRenameClasue(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRenameClasue) {
			listener.exitRenameClasue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRenameClasue) {
			return visitor.visitRenameClasue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ByClauseContext extends ParserRuleContext {
	public BY(): TerminalNode { return this.getToken(OpenSearchPPLParser.BY, 0); }
	public fieldList(): FieldListContext {
		return this.getRuleContext(0, FieldListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_byClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterByClause) {
			listener.enterByClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitByClause) {
			listener.exitByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitByClause) {
			return visitor.visitByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsByClauseContext extends ParserRuleContext {
	public BY(): TerminalNode { return this.getToken(OpenSearchPPLParser.BY, 0); }
	public fieldList(): FieldListContext | undefined {
		return this.tryGetRuleContext(0, FieldListContext);
	}
	public bySpanClause(): BySpanClauseContext | undefined {
		return this.tryGetRuleContext(0, BySpanClauseContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_statsByClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStatsByClause) {
			listener.enterStatsByClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStatsByClause) {
			listener.exitStatsByClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStatsByClause) {
			return visitor.visitStatsByClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BySpanClauseContext extends ParserRuleContext {
	public _alias!: QualifiedNameContext;
	public spanClause(): SpanClauseContext {
		return this.getRuleContext(0, SpanClauseContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AS, 0); }
	public qualifiedName(): QualifiedNameContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_bySpanClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBySpanClause) {
			listener.enterBySpanClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBySpanClause) {
			listener.exitBySpanClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBySpanClause) {
			return visitor.visitBySpanClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpanClauseContext extends ParserRuleContext {
	public _value!: LiteralValueContext;
	public _unit!: TimespanUnitContext;
	public SPAN(): TerminalNode { return this.getToken(OpenSearchPPLParser.SPAN, 0); }
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public fieldExpression(): FieldExpressionContext {
		return this.getRuleContext(0, FieldExpressionContext);
	}
	public COMMA(): TerminalNode { return this.getToken(OpenSearchPPLParser.COMMA, 0); }
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public literalValue(): LiteralValueContext {
		return this.getRuleContext(0, LiteralValueContext);
	}
	public timespanUnit(): TimespanUnitContext | undefined {
		return this.tryGetRuleContext(0, TimespanUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_spanClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSpanClause) {
			listener.enterSpanClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSpanClause) {
			listener.exitSpanClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSpanClause) {
			return visitor.visitSpanClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortbyClauseContext extends ParserRuleContext {
	public sortField(): SortFieldContext[];
	public sortField(i: number): SortFieldContext;
	public sortField(i?: number): SortFieldContext | SortFieldContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SortFieldContext);
		} else {
			return this.getRuleContext(i, SortFieldContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_sortbyClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSortbyClause) {
			listener.enterSortbyClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSortbyClause) {
			listener.exitSortbyClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSortbyClause) {
			return visitor.visitSortbyClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalClauseContext extends ParserRuleContext {
	public fieldExpression(): FieldExpressionContext {
		return this.getRuleContext(0, FieldExpressionContext);
	}
	public EQUAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.EQUAL, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_evalClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterEvalClause) {
			listener.enterEvalClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitEvalClause) {
			listener.exitEvalClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitEvalClause) {
			return visitor.visitEvalClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsAggTermContext extends ParserRuleContext {
	public _alias!: WcFieldExpressionContext;
	public statsFunction(): StatsFunctionContext {
		return this.getRuleContext(0, StatsFunctionContext);
	}
	public AS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AS, 0); }
	public wcFieldExpression(): WcFieldExpressionContext | undefined {
		return this.tryGetRuleContext(0, WcFieldExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_statsAggTerm; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStatsAggTerm) {
			listener.enterStatsAggTerm(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStatsAggTerm) {
			listener.exitStatsAggTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStatsAggTerm) {
			return visitor.visitStatsAggTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsFunctionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_statsFunction; }
	public copyFrom(ctx: StatsFunctionContext): void {
		super.copyFrom(ctx);
	}
}
export class StatsFunctionCallContext extends StatsFunctionContext {
	public statsFunctionName(): StatsFunctionNameContext {
		return this.getRuleContext(0, StatsFunctionNameContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public valueExpression(): ValueExpressionContext {
		return this.getRuleContext(0, ValueExpressionContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	constructor(ctx: StatsFunctionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStatsFunctionCall) {
			listener.enterStatsFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStatsFunctionCall) {
			listener.exitStatsFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStatsFunctionCall) {
			return visitor.visitStatsFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CountAllFunctionCallContext extends StatsFunctionContext {
	public COUNT(): TerminalNode { return this.getToken(OpenSearchPPLParser.COUNT, 0); }
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	constructor(ctx: StatsFunctionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterCountAllFunctionCall) {
			listener.enterCountAllFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitCountAllFunctionCall) {
			listener.exitCountAllFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitCountAllFunctionCall) {
			return visitor.visitCountAllFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DistinctCountFunctionCallContext extends StatsFunctionContext {
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public valueExpression(): ValueExpressionContext {
		return this.getRuleContext(0, ValueExpressionContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public DISTINCT_COUNT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DISTINCT_COUNT, 0); }
	public DC(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DC, 0); }
	constructor(ctx: StatsFunctionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDistinctCountFunctionCall) {
			listener.enterDistinctCountFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDistinctCountFunctionCall) {
			listener.exitDistinctCountFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDistinctCountFunctionCall) {
			return visitor.visitDistinctCountFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PercentileAggFunctionCallContext extends StatsFunctionContext {
	public percentileAggFunction(): PercentileAggFunctionContext {
		return this.getRuleContext(0, PercentileAggFunctionContext);
	}
	constructor(ctx: StatsFunctionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPercentileAggFunctionCall) {
			listener.enterPercentileAggFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPercentileAggFunctionCall) {
			listener.exitPercentileAggFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPercentileAggFunctionCall) {
			return visitor.visitPercentileAggFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatsFunctionNameContext extends ParserRuleContext {
	public AVG(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AVG, 0); }
	public COUNT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.COUNT, 0); }
	public SUM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SUM, 0); }
	public MIN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MIN, 0); }
	public MAX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MAX, 0); }
	public VAR_SAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.VAR_SAMP, 0); }
	public VAR_POP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.VAR_POP, 0); }
	public STDDEV_SAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STDDEV_SAMP, 0); }
	public STDDEV_POP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STDDEV_POP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_statsFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStatsFunctionName) {
			listener.enterStatsFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStatsFunctionName) {
			listener.exitStatsFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStatsFunctionName) {
			return visitor.visitStatsFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PercentileAggFunctionContext extends ParserRuleContext {
	public _value!: IntegerLiteralContext;
	public _aggField!: FieldExpressionContext;
	public PERCENTILE(): TerminalNode { return this.getToken(OpenSearchPPLParser.PERCENTILE, 0); }
	public LESS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LESS, 0); }
	public GREATER(): TerminalNode { return this.getToken(OpenSearchPPLParser.GREATER, 0); }
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public integerLiteral(): IntegerLiteralContext {
		return this.getRuleContext(0, IntegerLiteralContext);
	}
	public fieldExpression(): FieldExpressionContext {
		return this.getRuleContext(0, FieldExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_percentileAggFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPercentileAggFunction) {
			listener.enterPercentileAggFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPercentileAggFunction) {
			listener.exitPercentileAggFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPercentileAggFunction) {
			return visitor.visitPercentileAggFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public logicalExpression(): LogicalExpressionContext | undefined {
		return this.tryGetRuleContext(0, LogicalExpressionContext);
	}
	public comparisonExpression(): ComparisonExpressionContext | undefined {
		return this.tryGetRuleContext(0, ComparisonExpressionContext);
	}
	public valueExpression(): ValueExpressionContext | undefined {
		return this.tryGetRuleContext(0, ValueExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_expression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_logicalExpression; }
	public copyFrom(ctx: LogicalExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ComparsionContext extends LogicalExpressionContext {
	public comparisonExpression(): ComparisonExpressionContext {
		return this.getRuleContext(0, ComparisonExpressionContext);
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterComparsion) {
			listener.enterComparsion(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitComparsion) {
			listener.exitComparsion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitComparsion) {
			return visitor.visitComparsion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalNotContext extends LogicalExpressionContext {
	public NOT(): TerminalNode { return this.getToken(OpenSearchPPLParser.NOT, 0); }
	public logicalExpression(): LogicalExpressionContext {
		return this.getRuleContext(0, LogicalExpressionContext);
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterLogicalNot) {
			listener.enterLogicalNot(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitLogicalNot) {
			listener.exitLogicalNot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitLogicalNot) {
			return visitor.visitLogicalNot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalOrContext extends LogicalExpressionContext {
	public _left!: LogicalExpressionContext;
	public _right!: LogicalExpressionContext;
	public OR(): TerminalNode { return this.getToken(OpenSearchPPLParser.OR, 0); }
	public logicalExpression(): LogicalExpressionContext[];
	public logicalExpression(i: number): LogicalExpressionContext;
	public logicalExpression(i?: number): LogicalExpressionContext | LogicalExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalExpressionContext);
		} else {
			return this.getRuleContext(i, LogicalExpressionContext);
		}
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterLogicalOr) {
			listener.enterLogicalOr(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitLogicalOr) {
			listener.exitLogicalOr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitLogicalOr) {
			return visitor.visitLogicalOr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalAndContext extends LogicalExpressionContext {
	public _left!: LogicalExpressionContext;
	public _right!: LogicalExpressionContext;
	public logicalExpression(): LogicalExpressionContext[];
	public logicalExpression(i: number): LogicalExpressionContext;
	public logicalExpression(i?: number): LogicalExpressionContext | LogicalExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalExpressionContext);
		} else {
			return this.getRuleContext(i, LogicalExpressionContext);
		}
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AND, 0); }
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterLogicalAnd) {
			listener.enterLogicalAnd(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitLogicalAnd) {
			listener.exitLogicalAnd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitLogicalAnd) {
			return visitor.visitLogicalAnd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalXorContext extends LogicalExpressionContext {
	public _left!: LogicalExpressionContext;
	public _right!: LogicalExpressionContext;
	public XOR(): TerminalNode { return this.getToken(OpenSearchPPLParser.XOR, 0); }
	public logicalExpression(): LogicalExpressionContext[];
	public logicalExpression(i: number): LogicalExpressionContext;
	public logicalExpression(i?: number): LogicalExpressionContext | LogicalExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LogicalExpressionContext);
		} else {
			return this.getRuleContext(i, LogicalExpressionContext);
		}
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterLogicalXor) {
			listener.enterLogicalXor(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitLogicalXor) {
			listener.exitLogicalXor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitLogicalXor) {
			return visitor.visitLogicalXor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanExprContext extends LogicalExpressionContext {
	public booleanExpression(): BooleanExpressionContext {
		return this.getRuleContext(0, BooleanExpressionContext);
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBooleanExpr) {
			listener.enterBooleanExpr(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBooleanExpr) {
			listener.exitBooleanExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpr) {
			return visitor.visitBooleanExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RelevanceExprContext extends LogicalExpressionContext {
	public relevanceExpression(): RelevanceExpressionContext {
		return this.getRuleContext(0, RelevanceExpressionContext);
	}
	constructor(ctx: LogicalExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceExpr) {
			listener.enterRelevanceExpr(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceExpr) {
			listener.exitRelevanceExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceExpr) {
			return visitor.visitRelevanceExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_comparisonExpression; }
	public copyFrom(ctx: ComparisonExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class CompareExprContext extends ComparisonExpressionContext {
	public _left!: ValueExpressionContext;
	public _right!: ValueExpressionContext;
	public comparisonOperator(): ComparisonOperatorContext {
		return this.getRuleContext(0, ComparisonOperatorContext);
	}
	public valueExpression(): ValueExpressionContext[];
	public valueExpression(i: number): ValueExpressionContext;
	public valueExpression(i?: number): ValueExpressionContext | ValueExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueExpressionContext);
		} else {
			return this.getRuleContext(i, ValueExpressionContext);
		}
	}
	constructor(ctx: ComparisonExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterCompareExpr) {
			listener.enterCompareExpr(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitCompareExpr) {
			listener.exitCompareExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitCompareExpr) {
			return visitor.visitCompareExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InExprContext extends ComparisonExpressionContext {
	public valueExpression(): ValueExpressionContext {
		return this.getRuleContext(0, ValueExpressionContext);
	}
	public IN(): TerminalNode { return this.getToken(OpenSearchPPLParser.IN, 0); }
	public valueList(): ValueListContext {
		return this.getRuleContext(0, ValueListContext);
	}
	constructor(ctx: ComparisonExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterInExpr) {
			listener.enterInExpr(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitInExpr) {
			listener.exitInExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitInExpr) {
			return visitor.visitInExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_valueExpression; }
	public copyFrom(ctx: ValueExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class BinaryArithmeticContext extends ValueExpressionContext {
	public _left!: ValueExpressionContext;
	public _right!: ValueExpressionContext;
	public binaryOperator(): BinaryOperatorContext {
		return this.getRuleContext(0, BinaryOperatorContext);
	}
	public valueExpression(): ValueExpressionContext[];
	public valueExpression(i: number): ValueExpressionContext;
	public valueExpression(i?: number): ValueExpressionContext | ValueExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueExpressionContext);
		} else {
			return this.getRuleContext(i, ValueExpressionContext);
		}
	}
	constructor(ctx: ValueExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBinaryArithmetic) {
			listener.enterBinaryArithmetic(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBinaryArithmetic) {
			listener.exitBinaryArithmetic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBinaryArithmetic) {
			return visitor.visitBinaryArithmetic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParentheticBinaryArithmeticContext extends ValueExpressionContext {
	public _left!: ValueExpressionContext;
	public _right!: ValueExpressionContext;
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public binaryOperator(): BinaryOperatorContext {
		return this.getRuleContext(0, BinaryOperatorContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public valueExpression(): ValueExpressionContext[];
	public valueExpression(i: number): ValueExpressionContext;
	public valueExpression(i?: number): ValueExpressionContext | ValueExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueExpressionContext);
		} else {
			return this.getRuleContext(i, ValueExpressionContext);
		}
	}
	constructor(ctx: ValueExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterParentheticBinaryArithmetic) {
			listener.enterParentheticBinaryArithmetic(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitParentheticBinaryArithmetic) {
			listener.exitParentheticBinaryArithmetic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitParentheticBinaryArithmetic) {
			return visitor.visitParentheticBinaryArithmetic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ValueExpressionDefaultContext extends ValueExpressionContext {
	public primaryExpression(): PrimaryExpressionContext {
		return this.getRuleContext(0, PrimaryExpressionContext);
	}
	constructor(ctx: ValueExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterValueExpressionDefault) {
			listener.enterValueExpressionDefault(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitValueExpressionDefault) {
			listener.exitValueExpressionDefault(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitValueExpressionDefault) {
			return visitor.visitValueExpressionDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExpressionContext extends ParserRuleContext {
	public evalFunctionCall(): EvalFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, EvalFunctionCallContext);
	}
	public dataTypeFunctionCall(): DataTypeFunctionCallContext | undefined {
		return this.tryGetRuleContext(0, DataTypeFunctionCallContext);
	}
	public fieldExpression(): FieldExpressionContext | undefined {
		return this.tryGetRuleContext(0, FieldExpressionContext);
	}
	public literalValue(): LiteralValueContext | undefined {
		return this.tryGetRuleContext(0, LiteralValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_primaryExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPrimaryExpression) {
			listener.enterPrimaryExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPrimaryExpression) {
			listener.exitPrimaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPrimaryExpression) {
			return visitor.visitPrimaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanExpressionContext extends ParserRuleContext {
	public booleanFunctionCall(): BooleanFunctionCallContext {
		return this.getRuleContext(0, BooleanFunctionCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_booleanExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBooleanExpression) {
			listener.enterBooleanExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBooleanExpression) {
			listener.exitBooleanExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBooleanExpression) {
			return visitor.visitBooleanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceExpressionContext extends ParserRuleContext {
	public singleFieldRelevanceFunction(): SingleFieldRelevanceFunctionContext | undefined {
		return this.tryGetRuleContext(0, SingleFieldRelevanceFunctionContext);
	}
	public multiFieldRelevanceFunction(): MultiFieldRelevanceFunctionContext | undefined {
		return this.tryGetRuleContext(0, MultiFieldRelevanceFunctionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceExpression) {
			listener.enterRelevanceExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceExpression) {
			listener.exitRelevanceExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceExpression) {
			return visitor.visitRelevanceExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SingleFieldRelevanceFunctionContext extends ParserRuleContext {
	public _field!: RelevanceFieldContext;
	public _query!: RelevanceQueryContext;
	public singleFieldRelevanceFunctionName(): SingleFieldRelevanceFunctionNameContext {
		return this.getRuleContext(0, SingleFieldRelevanceFunctionNameContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public relevanceField(): RelevanceFieldContext {
		return this.getRuleContext(0, RelevanceFieldContext);
	}
	public relevanceQuery(): RelevanceQueryContext {
		return this.getRuleContext(0, RelevanceQueryContext);
	}
	public relevanceArg(): RelevanceArgContext[];
	public relevanceArg(i: number): RelevanceArgContext;
	public relevanceArg(i?: number): RelevanceArgContext | RelevanceArgContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelevanceArgContext);
		} else {
			return this.getRuleContext(i, RelevanceArgContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_singleFieldRelevanceFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSingleFieldRelevanceFunction) {
			listener.enterSingleFieldRelevanceFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSingleFieldRelevanceFunction) {
			listener.exitSingleFieldRelevanceFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSingleFieldRelevanceFunction) {
			return visitor.visitSingleFieldRelevanceFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiFieldRelevanceFunctionContext extends ParserRuleContext {
	public _field!: RelevanceFieldAndWeightContext;
	public _query!: RelevanceQueryContext;
	public multiFieldRelevanceFunctionName(): MultiFieldRelevanceFunctionNameContext {
		return this.getRuleContext(0, MultiFieldRelevanceFunctionNameContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public LT_SQR_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_SQR_PRTHS, 0); }
	public RT_SQR_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_SQR_PRTHS, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public relevanceFieldAndWeight(): RelevanceFieldAndWeightContext[];
	public relevanceFieldAndWeight(i: number): RelevanceFieldAndWeightContext;
	public relevanceFieldAndWeight(i?: number): RelevanceFieldAndWeightContext | RelevanceFieldAndWeightContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelevanceFieldAndWeightContext);
		} else {
			return this.getRuleContext(i, RelevanceFieldAndWeightContext);
		}
	}
	public relevanceQuery(): RelevanceQueryContext {
		return this.getRuleContext(0, RelevanceQueryContext);
	}
	public relevanceArg(): RelevanceArgContext[];
	public relevanceArg(i: number): RelevanceArgContext;
	public relevanceArg(i?: number): RelevanceArgContext | RelevanceArgContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RelevanceArgContext);
		} else {
			return this.getRuleContext(i, RelevanceArgContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_multiFieldRelevanceFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterMultiFieldRelevanceFunction) {
			listener.enterMultiFieldRelevanceFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitMultiFieldRelevanceFunction) {
			listener.exitMultiFieldRelevanceFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitMultiFieldRelevanceFunction) {
			return visitor.visitMultiFieldRelevanceFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TableSourceContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameContext);
	}
	public ID_DATE_SUFFIX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ID_DATE_SUFFIX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_tableSource; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTableSource) {
			listener.enterTableSource(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTableSource) {
			listener.exitTableSource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTableSource) {
			return visitor.visitTableSource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldListContext extends ParserRuleContext {
	public fieldExpression(): FieldExpressionContext[];
	public fieldExpression(i: number): FieldExpressionContext;
	public fieldExpression(i?: number): FieldExpressionContext | FieldExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FieldExpressionContext);
		} else {
			return this.getRuleContext(i, FieldExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_fieldList; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFieldList) {
			listener.enterFieldList(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFieldList) {
			listener.exitFieldList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFieldList) {
			return visitor.visitFieldList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WcFieldListContext extends ParserRuleContext {
	public wcFieldExpression(): WcFieldExpressionContext[];
	public wcFieldExpression(i: number): WcFieldExpressionContext;
	public wcFieldExpression(i?: number): WcFieldExpressionContext | WcFieldExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WcFieldExpressionContext);
		} else {
			return this.getRuleContext(i, WcFieldExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_wcFieldList; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterWcFieldList) {
			listener.enterWcFieldList(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitWcFieldList) {
			listener.exitWcFieldList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitWcFieldList) {
			return visitor.visitWcFieldList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortFieldContext extends ParserRuleContext {
	public sortFieldExpression(): SortFieldExpressionContext {
		return this.getRuleContext(0, SortFieldExpressionContext);
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_sortField; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSortField) {
			listener.enterSortField(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSortField) {
			listener.exitSortField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSortField) {
			return visitor.visitSortField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortFieldExpressionContext extends ParserRuleContext {
	public fieldExpression(): FieldExpressionContext {
		return this.getRuleContext(0, FieldExpressionContext);
	}
	public AUTO(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AUTO, 0); }
	public LT_PRTHS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public RT_PRTHS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public STR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STR, 0); }
	public IP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.IP, 0); }
	public NUM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NUM, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_sortFieldExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSortFieldExpression) {
			listener.enterSortFieldExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSortFieldExpression) {
			listener.exitSortFieldExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSortFieldExpression) {
			return visitor.visitSortFieldExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldExpressionContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_fieldExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFieldExpression) {
			listener.enterFieldExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFieldExpression) {
			listener.exitFieldExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFieldExpression) {
			return visitor.visitFieldExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WcFieldExpressionContext extends ParserRuleContext {
	public wcQualifiedName(): WcQualifiedNameContext {
		return this.getRuleContext(0, WcQualifiedNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_wcFieldExpression; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterWcFieldExpression) {
			listener.enterWcFieldExpression(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitWcFieldExpression) {
			listener.exitWcFieldExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitWcFieldExpression) {
			return visitor.visitWcFieldExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalFunctionCallContext extends ParserRuleContext {
	public evalFunctionName(): EvalFunctionNameContext {
		return this.getRuleContext(0, EvalFunctionNameContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public functionArgs(): FunctionArgsContext {
		return this.getRuleContext(0, FunctionArgsContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_evalFunctionCall; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterEvalFunctionCall) {
			listener.enterEvalFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitEvalFunctionCall) {
			listener.exitEvalFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitEvalFunctionCall) {
			return visitor.visitEvalFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DataTypeFunctionCallContext extends ParserRuleContext {
	public CAST(): TerminalNode { return this.getToken(OpenSearchPPLParser.CAST, 0); }
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public AS(): TerminalNode { return this.getToken(OpenSearchPPLParser.AS, 0); }
	public convertedDataType(): ConvertedDataTypeContext {
		return this.getRuleContext(0, ConvertedDataTypeContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_dataTypeFunctionCall; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDataTypeFunctionCall) {
			listener.enterDataTypeFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDataTypeFunctionCall) {
			listener.exitDataTypeFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDataTypeFunctionCall) {
			return visitor.visitDataTypeFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanFunctionCallContext extends ParserRuleContext {
	public conditionFunctionBase(): ConditionFunctionBaseContext {
		return this.getRuleContext(0, ConditionFunctionBaseContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public functionArgs(): FunctionArgsContext {
		return this.getRuleContext(0, FunctionArgsContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_booleanFunctionCall; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBooleanFunctionCall) {
			listener.enterBooleanFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBooleanFunctionCall) {
			listener.exitBooleanFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBooleanFunctionCall) {
			return visitor.visitBooleanFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConvertedDataTypeContext extends ParserRuleContext {
	public _typeName!: Token;
	public DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIMESTAMP, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.INT, 0); }
	public INTEGER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.INTEGER, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DOUBLE, 0); }
	public LONG(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LONG, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FLOAT, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STRING, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.BOOLEAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_convertedDataType; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterConvertedDataType) {
			listener.enterConvertedDataType(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitConvertedDataType) {
			listener.exitConvertedDataType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitConvertedDataType) {
			return visitor.visitConvertedDataType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EvalFunctionNameContext extends ParserRuleContext {
	public mathematicalFunctionBase(): MathematicalFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, MathematicalFunctionBaseContext);
	}
	public dateAndTimeFunctionBase(): DateAndTimeFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, DateAndTimeFunctionBaseContext);
	}
	public textFunctionBase(): TextFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, TextFunctionBaseContext);
	}
	public conditionFunctionBase(): ConditionFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, ConditionFunctionBaseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_evalFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterEvalFunctionName) {
			listener.enterEvalFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitEvalFunctionName) {
			listener.exitEvalFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitEvalFunctionName) {
			return visitor.visitEvalFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionArgsContext extends ParserRuleContext {
	public functionArg(): FunctionArgContext[];
	public functionArg(i: number): FunctionArgContext;
	public functionArg(i?: number): FunctionArgContext | FunctionArgContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionArgContext);
		} else {
			return this.getRuleContext(i, FunctionArgContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_functionArgs; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFunctionArgs) {
			listener.enterFunctionArgs(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFunctionArgs) {
			listener.exitFunctionArgs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFunctionArgs) {
			return visitor.visitFunctionArgs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionArgContext extends ParserRuleContext {
	public valueExpression(): ValueExpressionContext {
		return this.getRuleContext(0, ValueExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_functionArg; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterFunctionArg) {
			listener.enterFunctionArg(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitFunctionArg) {
			listener.exitFunctionArg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitFunctionArg) {
			return visitor.visitFunctionArg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceArgContext extends ParserRuleContext {
	public relevanceArgName(): RelevanceArgNameContext {
		return this.getRuleContext(0, RelevanceArgNameContext);
	}
	public EQUAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.EQUAL, 0); }
	public relevanceArgValue(): RelevanceArgValueContext {
		return this.getRuleContext(0, RelevanceArgValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceArg; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceArg) {
			listener.enterRelevanceArg(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceArg) {
			listener.exitRelevanceArg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceArg) {
			return visitor.visitRelevanceArg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceArgNameContext extends ParserRuleContext {
	public ALLOW_LEADING_WILDCARD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ALLOW_LEADING_WILDCARD, 0); }
	public ANALYZER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ANALYZER, 0); }
	public ANALYZE_WILDCARD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ANALYZE_WILDCARD, 0); }
	public AUTO_GENERATE_SYNONYMS_PHRASE_QUERY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.AUTO_GENERATE_SYNONYMS_PHRASE_QUERY, 0); }
	public BOOST(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.BOOST, 0); }
	public CUTOFF_FREQUENCY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CUTOFF_FREQUENCY, 0); }
	public DEFAULT_FIELD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DEFAULT_FIELD, 0); }
	public DEFAULT_OPERATOR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DEFAULT_OPERATOR, 0); }
	public ENABLE_POSITION_INCREMENTS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ENABLE_POSITION_INCREMENTS, 0); }
	public FIELDS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FIELDS, 0); }
	public FLAGS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FLAGS, 0); }
	public FUZZINESS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FUZZINESS, 0); }
	public FUZZY_MAX_EXPANSIONS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FUZZY_MAX_EXPANSIONS, 0); }
	public FUZZY_PREFIX_LENGTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FUZZY_PREFIX_LENGTH, 0); }
	public FUZZY_REWRITE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FUZZY_REWRITE, 0); }
	public FUZZY_TRANSPOSITIONS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FUZZY_TRANSPOSITIONS, 0); }
	public LENIENT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LENIENT, 0); }
	public LOW_FREQ_OPERATOR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOW_FREQ_OPERATOR, 0); }
	public MAX_DETERMINIZED_STATES(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MAX_DETERMINIZED_STATES, 0); }
	public MAX_EXPANSIONS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MAX_EXPANSIONS, 0); }
	public MINIMUM_SHOULD_MATCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINIMUM_SHOULD_MATCH, 0); }
	public OPERATOR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.OPERATOR, 0); }
	public PHRASE_SLOP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PHRASE_SLOP, 0); }
	public PREFIX_LENGTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PREFIX_LENGTH, 0); }
	public QUOTE_ANALYZER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUOTE_ANALYZER, 0); }
	public QUOTE_FIELD_SUFFIX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUOTE_FIELD_SUFFIX, 0); }
	public REWRITE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.REWRITE, 0); }
	public SLOP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SLOP, 0); }
	public TIE_BREAKER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIE_BREAKER, 0); }
	public TIME_ZONE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_ZONE, 0); }
	public TYPE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TYPE, 0); }
	public ZERO_TERMS_QUERY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ZERO_TERMS_QUERY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceArgName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceArgName) {
			listener.enterRelevanceArgName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceArgName) {
			listener.exitRelevanceArgName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceArgName) {
			return visitor.visitRelevanceArgName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceFieldAndWeightContext extends ParserRuleContext {
	public _field!: RelevanceFieldContext;
	public _weight!: RelevanceFieldWeightContext;
	public relevanceField(): RelevanceFieldContext {
		return this.getRuleContext(0, RelevanceFieldContext);
	}
	public relevanceFieldWeight(): RelevanceFieldWeightContext | undefined {
		return this.tryGetRuleContext(0, RelevanceFieldWeightContext);
	}
	public BIT_XOR_OP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.BIT_XOR_OP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceFieldAndWeight; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceFieldAndWeight) {
			listener.enterRelevanceFieldAndWeight(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceFieldAndWeight) {
			listener.exitRelevanceFieldAndWeight(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceFieldAndWeight) {
			return visitor.visitRelevanceFieldAndWeight(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceFieldWeightContext extends ParserRuleContext {
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public decimalLiteral(): DecimalLiteralContext | undefined {
		return this.tryGetRuleContext(0, DecimalLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceFieldWeight; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceFieldWeight) {
			listener.enterRelevanceFieldWeight(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceFieldWeight) {
			listener.exitRelevanceFieldWeight(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceFieldWeight) {
			return visitor.visitRelevanceFieldWeight(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceFieldContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameContext);
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceField; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceField) {
			listener.enterRelevanceField(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceField) {
			listener.exitRelevanceField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceField) {
			return visitor.visitRelevanceField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceQueryContext extends ParserRuleContext {
	public relevanceArgValue(): RelevanceArgValueContext {
		return this.getRuleContext(0, RelevanceArgValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceQuery; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceQuery) {
			listener.enterRelevanceQuery(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceQuery) {
			listener.exitRelevanceQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceQuery) {
			return visitor.visitRelevanceQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelevanceArgValueContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameContext);
	}
	public literalValue(): LiteralValueContext | undefined {
		return this.tryGetRuleContext(0, LiteralValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_relevanceArgValue; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterRelevanceArgValue) {
			listener.enterRelevanceArgValue(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitRelevanceArgValue) {
			listener.exitRelevanceArgValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitRelevanceArgValue) {
			return visitor.visitRelevanceArgValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MathematicalFunctionBaseContext extends ParserRuleContext {
	public ABS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ABS, 0); }
	public CEIL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CEIL, 0); }
	public CEILING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CEILING, 0); }
	public CONV(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CONV, 0); }
	public CRC32(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CRC32, 0); }
	public E(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.E, 0); }
	public EXP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EXP, 0); }
	public FLOOR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FLOOR, 0); }
	public LN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LN, 0); }
	public LOG(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOG, 0); }
	public LOG10(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOG10, 0); }
	public LOG2(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOG2, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MOD, 0); }
	public PI(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PI, 0); }
	public POW(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.POW, 0); }
	public POWER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.POWER, 0); }
	public RAND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.RAND, 0); }
	public ROUND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ROUND, 0); }
	public SIGN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SIGN, 0); }
	public SQRT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SQRT, 0); }
	public TRUNCATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TRUNCATE, 0); }
	public trigonometricFunctionName(): TrigonometricFunctionNameContext | undefined {
		return this.tryGetRuleContext(0, TrigonometricFunctionNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_mathematicalFunctionBase; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterMathematicalFunctionBase) {
			listener.enterMathematicalFunctionBase(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitMathematicalFunctionBase) {
			listener.exitMathematicalFunctionBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitMathematicalFunctionBase) {
			return visitor.visitMathematicalFunctionBase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TrigonometricFunctionNameContext extends ParserRuleContext {
	public ACOS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ACOS, 0); }
	public ASIN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ASIN, 0); }
	public ATAN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ATAN, 0); }
	public ATAN2(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ATAN2, 0); }
	public COS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.COS, 0); }
	public COT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.COT, 0); }
	public DEGREES(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DEGREES, 0); }
	public RADIANS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.RADIANS, 0); }
	public SIN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SIN, 0); }
	public TAN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_trigonometricFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTrigonometricFunctionName) {
			listener.enterTrigonometricFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTrigonometricFunctionName) {
			listener.exitTrigonometricFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTrigonometricFunctionName) {
			return visitor.visitTrigonometricFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateAndTimeFunctionBaseContext extends ParserRuleContext {
	public ADDDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ADDDATE, 0); }
	public DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE, 0); }
	public DATE_ADD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_ADD, 0); }
	public DATE_SUB(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_SUB, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY, 0); }
	public DAYNAME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYNAME, 0); }
	public DAYOFMONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFMONTH, 0); }
	public DAYOFWEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFWEEK, 0); }
	public DAYOFYEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFYEAR, 0); }
	public FROM_DAYS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FROM_DAYS, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR, 0); }
	public MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MICROSECOND, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE, 0); }
	public MONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTH, 0); }
	public MONTHNAME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTHNAME, 0); }
	public QUARTER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUARTER, 0); }
	public SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SECOND, 0); }
	public SUBDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SUBDATE, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME, 0); }
	public TIME_TO_SEC(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_TO_SEC, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIMESTAMP, 0); }
	public TO_DAYS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TO_DAYS, 0); }
	public YEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.YEAR, 0); }
	public WEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.WEEK, 0); }
	public DATE_FORMAT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_FORMAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_dateAndTimeFunctionBase; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDateAndTimeFunctionBase) {
			listener.enterDateAndTimeFunctionBase(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDateAndTimeFunctionBase) {
			listener.exitDateAndTimeFunctionBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDateAndTimeFunctionBase) {
			return visitor.visitDateAndTimeFunctionBase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionFunctionBaseContext extends ParserRuleContext {
	public LIKE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LIKE, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.IF, 0); }
	public ISNULL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ISNULL, 0); }
	public ISNOTNULL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ISNOTNULL, 0); }
	public IFNULL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.IFNULL, 0); }
	public NULLIF(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NULLIF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_conditionFunctionBase; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterConditionFunctionBase) {
			listener.enterConditionFunctionBase(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitConditionFunctionBase) {
			listener.exitConditionFunctionBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitConditionFunctionBase) {
			return visitor.visitConditionFunctionBase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TextFunctionBaseContext extends ParserRuleContext {
	public SUBSTR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SUBSTR, 0); }
	public SUBSTRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SUBSTRING, 0); }
	public TRIM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TRIM, 0); }
	public LTRIM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LTRIM, 0); }
	public RTRIM(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.RTRIM, 0); }
	public LOWER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOWER, 0); }
	public UPPER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.UPPER, 0); }
	public CONCAT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CONCAT, 0); }
	public CONCAT_WS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CONCAT_WS, 0); }
	public LENGTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LENGTH, 0); }
	public STRCMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STRCMP, 0); }
	public RIGHT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.RIGHT, 0); }
	public LEFT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LEFT, 0); }
	public ASCII(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ASCII, 0); }
	public LOCATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOCATE, 0); }
	public REPLACE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.REPLACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_textFunctionBase; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTextFunctionBase) {
			listener.enterTextFunctionBase(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTextFunctionBase) {
			listener.exitTextFunctionBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTextFunctionBase) {
			return visitor.visitTextFunctionBase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparisonOperatorContext extends ParserRuleContext {
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
	public NOT_EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NOT_EQUAL, 0); }
	public LESS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LESS, 0); }
	public NOT_LESS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NOT_LESS, 0); }
	public GREATER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.GREATER, 0); }
	public NOT_GREATER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NOT_GREATER, 0); }
	public REGEXP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.REGEXP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_comparisonOperator; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterComparisonOperator) {
			listener.enterComparisonOperator(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitComparisonOperator) {
			listener.exitComparisonOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitComparisonOperator) {
			return visitor.visitComparisonOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinaryOperatorContext extends ParserRuleContext {
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.STAR, 0); }
	public DIVIDE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DIVIDE, 0); }
	public MODULE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MODULE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_binaryOperator; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBinaryOperator) {
			listener.enterBinaryOperator(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBinaryOperator) {
			listener.exitBinaryOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBinaryOperator) {
			return visitor.visitBinaryOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SingleFieldRelevanceFunctionNameContext extends ParserRuleContext {
	public MATCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MATCH, 0); }
	public MATCH_PHRASE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MATCH_PHRASE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_singleFieldRelevanceFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSingleFieldRelevanceFunctionName) {
			listener.enterSingleFieldRelevanceFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSingleFieldRelevanceFunctionName) {
			listener.exitSingleFieldRelevanceFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSingleFieldRelevanceFunctionName) {
			return visitor.visitSingleFieldRelevanceFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiFieldRelevanceFunctionNameContext extends ParserRuleContext {
	public SIMPLE_QUERY_STRING(): TerminalNode { return this.getToken(OpenSearchPPLParser.SIMPLE_QUERY_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_multiFieldRelevanceFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterMultiFieldRelevanceFunctionName) {
			listener.enterMultiFieldRelevanceFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitMultiFieldRelevanceFunctionName) {
			listener.exitMultiFieldRelevanceFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitMultiFieldRelevanceFunctionName) {
			return visitor.visitMultiFieldRelevanceFunctionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralValueContext extends ParserRuleContext {
	public intervalLiteral(): IntervalLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntervalLiteralContext);
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public decimalLiteral(): DecimalLiteralContext | undefined {
		return this.tryGetRuleContext(0, DecimalLiteralContext);
	}
	public booleanLiteral(): BooleanLiteralContext | undefined {
		return this.tryGetRuleContext(0, BooleanLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_literalValue; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterLiteralValue) {
			listener.enterLiteralValue(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitLiteralValue) {
			listener.exitLiteralValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitLiteralValue) {
			return visitor.visitLiteralValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalLiteralContext extends ParserRuleContext {
	public INTERVAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.INTERVAL, 0); }
	public valueExpression(): ValueExpressionContext {
		return this.getRuleContext(0, ValueExpressionContext);
	}
	public intervalUnit(): IntervalUnitContext {
		return this.getRuleContext(0, IntervalUnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_intervalLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIntervalLiteral) {
			listener.enterIntervalLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIntervalLiteral) {
			listener.exitIntervalLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIntervalLiteral) {
			return visitor.visitIntervalLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	public DQUOTA_STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DQUOTA_STRING, 0); }
	public SQUOTA_STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SQUOTA_STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_stringLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterStringLiteral) {
			listener.enterStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitStringLiteral) {
			listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerLiteralContext extends ParserRuleContext {
	public INTEGER_LITERAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.INTEGER_LITERAL, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_integerLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIntegerLiteral) {
			listener.enterIntegerLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIntegerLiteral) {
			listener.exitIntegerLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIntegerLiteral) {
			return visitor.visitIntegerLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecimalLiteralContext extends ParserRuleContext {
	public DECIMAL_LITERAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.DECIMAL_LITERAL, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_decimalLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDecimalLiteral) {
			listener.enterDecimalLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDecimalLiteral) {
			listener.exitDecimalLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDecimalLiteral) {
			return visitor.visitDecimalLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanLiteralContext extends ParserRuleContext {
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FALSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_booleanLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterBooleanLiteral) {
			listener.enterBooleanLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitBooleanLiteral) {
			listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternContext extends ParserRuleContext {
	public stringLiteral(): StringLiteralContext {
		return this.getRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_pattern; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPattern) {
			listener.enterPattern(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPattern) {
			listener.exitPattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPattern) {
			return visitor.visitPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalUnitContext extends ParserRuleContext {
	public MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MICROSECOND, 0); }
	public SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SECOND, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY, 0); }
	public WEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.WEEK, 0); }
	public MONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTH, 0); }
	public QUARTER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUARTER, 0); }
	public YEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.YEAR, 0); }
	public SECOND_MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SECOND_MICROSECOND, 0); }
	public MINUTE_MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE_MICROSECOND, 0); }
	public MINUTE_SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE_SECOND, 0); }
	public HOUR_MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR_MICROSECOND, 0); }
	public HOUR_SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR_SECOND, 0); }
	public HOUR_MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR_MINUTE, 0); }
	public DAY_MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY_MICROSECOND, 0); }
	public DAY_SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY_SECOND, 0); }
	public DAY_MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY_MINUTE, 0); }
	public DAY_HOUR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY_HOUR, 0); }
	public YEAR_MONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.YEAR_MONTH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_intervalUnit; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIntervalUnit) {
			listener.enterIntervalUnit(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIntervalUnit) {
			listener.exitIntervalUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIntervalUnit) {
			return visitor.visitIntervalUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimespanUnitContext extends ParserRuleContext {
	public MS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MS, 0); }
	public S(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.S, 0); }
	public M(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.M, 0); }
	public H(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.H, 0); }
	public D(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.D, 0); }
	public W(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.W, 0); }
	public Q(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.Q, 0); }
	public Y(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.Y, 0); }
	public MILLISECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MILLISECOND, 0); }
	public SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SECOND, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY, 0); }
	public WEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.WEEK, 0); }
	public MONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTH, 0); }
	public QUARTER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUARTER, 0); }
	public YEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.YEAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_timespanUnit; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTimespanUnit) {
			listener.enterTimespanUnit(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTimespanUnit) {
			listener.exitTimespanUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTimespanUnit) {
			return visitor.visitTimespanUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueListContext extends ParserRuleContext {
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public literalValue(): LiteralValueContext[];
	public literalValue(i: number): LiteralValueContext;
	public literalValue(i?: number): LiteralValueContext | LiteralValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LiteralValueContext);
		} else {
			return this.getRuleContext(i, LiteralValueContext);
		}
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.COMMA);
		} else {
			return this.getToken(OpenSearchPPLParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_valueList; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterValueList) {
			listener.enterValueList(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitValueList) {
			listener.exitValueList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitValueList) {
			return visitor.visitValueList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_qualifiedName; }
	public copyFrom(ctx: QualifiedNameContext): void {
		super.copyFrom(ctx);
	}
}
export class IdentsAsQualifiedNameContext extends QualifiedNameContext {
	public ident(): IdentContext[];
	public ident(i: number): IdentContext;
	public ident(i?: number): IdentContext | IdentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentContext);
		} else {
			return this.getRuleContext(i, IdentContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.DOT);
		} else {
			return this.getToken(OpenSearchPPLParser.DOT, i);
		}
	}
	constructor(ctx: QualifiedNameContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIdentsAsQualifiedName) {
			listener.enterIdentsAsQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIdentsAsQualifiedName) {
			listener.exitIdentsAsQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIdentsAsQualifiedName) {
			return visitor.visitIdentsAsQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WcQualifiedNameContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_wcQualifiedName; }
	public copyFrom(ctx: WcQualifiedNameContext): void {
		super.copyFrom(ctx);
	}
}
export class IdentsAsWildcardQualifiedNameContext extends WcQualifiedNameContext {
	public wildcard(): WildcardContext[];
	public wildcard(i: number): WildcardContext;
	public wildcard(i?: number): WildcardContext | WildcardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WildcardContext);
		} else {
			return this.getRuleContext(i, WildcardContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.DOT);
		} else {
			return this.getToken(OpenSearchPPLParser.DOT, i);
		}
	}
	constructor(ctx: WcQualifiedNameContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIdentsAsWildcardQualifiedName) {
			listener.enterIdentsAsWildcardQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIdentsAsWildcardQualifiedName) {
			listener.exitIdentsAsWildcardQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIdentsAsWildcardQualifiedName) {
			return visitor.visitIdentsAsWildcardQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ID, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DOT, 0); }
	public BACKTICK(): TerminalNode[];
	public BACKTICK(i: number): TerminalNode;
	public BACKTICK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.BACKTICK);
		} else {
			return this.getToken(OpenSearchPPLParser.BACKTICK, i);
		}
	}
	public ident(): IdentContext | undefined {
		return this.tryGetRuleContext(0, IdentContext);
	}
	public BQUOTA_STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.BQUOTA_STRING, 0); }
	public keywordsCanBeId(): KeywordsCanBeIdContext | undefined {
		return this.tryGetRuleContext(0, KeywordsCanBeIdContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_ident; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterIdent) {
			listener.enterIdent(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitIdent) {
			listener.exitIdent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitIdent) {
			return visitor.visitIdent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WildcardContext extends ParserRuleContext {
	public ident(): IdentContext[];
	public ident(i: number): IdentContext;
	public ident(i?: number): IdentContext | IdentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentContext);
		} else {
			return this.getRuleContext(i, IdentContext);
		}
	}
	public MODULE(): TerminalNode[];
	public MODULE(i: number): TerminalNode;
	public MODULE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.MODULE);
		} else {
			return this.getToken(OpenSearchPPLParser.MODULE, i);
		}
	}
	public SINGLE_QUOTE(): TerminalNode[];
	public SINGLE_QUOTE(i: number): TerminalNode;
	public SINGLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.SINGLE_QUOTE);
		} else {
			return this.getToken(OpenSearchPPLParser.SINGLE_QUOTE, i);
		}
	}
	public wildcard(): WildcardContext | undefined {
		return this.tryGetRuleContext(0, WildcardContext);
	}
	public DOUBLE_QUOTE(): TerminalNode[];
	public DOUBLE_QUOTE(i: number): TerminalNode;
	public DOUBLE_QUOTE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.DOUBLE_QUOTE);
		} else {
			return this.getToken(OpenSearchPPLParser.DOUBLE_QUOTE, i);
		}
	}
	public BACKTICK(): TerminalNode[];
	public BACKTICK(i: number): TerminalNode;
	public BACKTICK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(OpenSearchPPLParser.BACKTICK);
		} else {
			return this.getToken(OpenSearchPPLParser.BACKTICK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_wildcard; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterWildcard) {
			listener.enterWildcard(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitWildcard) {
			listener.exitWildcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitWildcard) {
			return visitor.visitWildcard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordsCanBeIdContext extends ParserRuleContext {
	public D(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.D, 0); }
	public statsFunctionName(): StatsFunctionNameContext | undefined {
		return this.tryGetRuleContext(0, StatsFunctionNameContext);
	}
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIMESTAMP, 0); }
	public DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME, 0); }
	public FIRST(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FIRST, 0); }
	public LAST(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LAST, 0); }
	public timespanUnit(): TimespanUnitContext | undefined {
		return this.tryGetRuleContext(0, TimespanUnitContext);
	}
	public SPAN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SPAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_keywordsCanBeId; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterKeywordsCanBeId) {
			listener.enterKeywordsCanBeId(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitKeywordsCanBeId) {
			listener.exitKeywordsCanBeId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitKeywordsCanBeId) {
			return visitor.visitKeywordsCanBeId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


