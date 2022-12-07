// Generated from ./common/query_manager/antlr/grammar/OpenSearchPPLParser.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly DESCRIBE = 2;
	public static readonly SHOW = 3;
	public static readonly FROM = 4;
	public static readonly WHERE = 5;
	public static readonly FIELDS = 6;
	public static readonly RENAME = 7;
	public static readonly STATS = 8;
	public static readonly DEDUP = 9;
	public static readonly SORT = 10;
	public static readonly EVAL = 11;
	public static readonly HEAD = 12;
	public static readonly TOP = 13;
	public static readonly RARE = 14;
	public static readonly PARSE = 15;
	public static readonly METHOD = 16;
	public static readonly REGEX = 17;
	public static readonly PUNCT = 18;
	public static readonly GROK = 19;
	public static readonly PATTERN = 20;
	public static readonly PATTERNS = 21;
	public static readonly NEW_FIELD = 22;
	public static readonly KMEANS = 23;
	public static readonly AD = 24;
	public static readonly ML = 25;
	public static readonly AS = 26;
	public static readonly BY = 27;
	public static readonly SOURCE = 28;
	public static readonly INDEX = 29;
	public static readonly D = 30;
	public static readonly DESC = 31;
	public static readonly CATALOGS = 32;
	public static readonly SORTBY = 33;
	public static readonly AUTO = 34;
	public static readonly STR = 35;
	public static readonly IP = 36;
	public static readonly NUM = 37;
	public static readonly KEEPEMPTY = 38;
	public static readonly CONSECUTIVE = 39;
	public static readonly DEDUP_SPLITVALUES = 40;
	public static readonly PARTITIONS = 41;
	public static readonly ALLNUM = 42;
	public static readonly DELIM = 43;
	public static readonly CENTROIDS = 44;
	public static readonly ITERATIONS = 45;
	public static readonly DISTANCE_TYPE = 46;
	public static readonly NUMBER_OF_TREES = 47;
	public static readonly SHINGLE_SIZE = 48;
	public static readonly SAMPLE_SIZE = 49;
	public static readonly OUTPUT_AFTER = 50;
	public static readonly TIME_DECAY = 51;
	public static readonly ANOMALY_RATE = 52;
	public static readonly CATEGORY_FIELD = 53;
	public static readonly TIME_FIELD = 54;
	public static readonly TIME_ZONE = 55;
	public static readonly TRAINING_DATA_SIZE = 56;
	public static readonly ANOMALY_SCORE_THRESHOLD = 57;
	public static readonly CASE = 58;
	public static readonly IN = 59;
	public static readonly NOT = 60;
	public static readonly OR = 61;
	public static readonly AND = 62;
	public static readonly XOR = 63;
	public static readonly TRUE = 64;
	public static readonly FALSE = 65;
	public static readonly REGEXP = 66;
	public static readonly DATETIME = 67;
	public static readonly INTERVAL = 68;
	public static readonly MICROSECOND = 69;
	public static readonly MILLISECOND = 70;
	public static readonly SECOND = 71;
	public static readonly MINUTE = 72;
	public static readonly HOUR = 73;
	public static readonly DAY = 74;
	public static readonly WEEK = 75;
	public static readonly MONTH = 76;
	public static readonly QUARTER = 77;
	public static readonly YEAR = 78;
	public static readonly SECOND_MICROSECOND = 79;
	public static readonly MINUTE_MICROSECOND = 80;
	public static readonly MINUTE_SECOND = 81;
	public static readonly HOUR_MICROSECOND = 82;
	public static readonly HOUR_SECOND = 83;
	public static readonly HOUR_MINUTE = 84;
	public static readonly DAY_MICROSECOND = 85;
	public static readonly DAY_SECOND = 86;
	public static readonly DAY_MINUTE = 87;
	public static readonly DAY_HOUR = 88;
	public static readonly YEAR_MONTH = 89;
	public static readonly CONVERT_TZ = 90;
	public static readonly DATAMODEL = 91;
	public static readonly LOOKUP = 92;
	public static readonly SAVEDSEARCH = 93;
	public static readonly INT = 94;
	public static readonly INTEGER = 95;
	public static readonly DOUBLE = 96;
	public static readonly LONG = 97;
	public static readonly FLOAT = 98;
	public static readonly STRING = 99;
	public static readonly BOOLEAN = 100;
	public static readonly PIPE = 101;
	public static readonly COMMA = 102;
	public static readonly DOT = 103;
	public static readonly EQUAL = 104;
	public static readonly GREATER = 105;
	public static readonly LESS = 106;
	public static readonly NOT_GREATER = 107;
	public static readonly NOT_LESS = 108;
	public static readonly NOT_EQUAL = 109;
	public static readonly PLUS = 110;
	public static readonly MINUS = 111;
	public static readonly STAR = 112;
	public static readonly DIVIDE = 113;
	public static readonly MODULE = 114;
	public static readonly EXCLAMATION_SYMBOL = 115;
	public static readonly COLON = 116;
	public static readonly LT_PRTHS = 117;
	public static readonly RT_PRTHS = 118;
	public static readonly LT_SQR_PRTHS = 119;
	public static readonly RT_SQR_PRTHS = 120;
	public static readonly SINGLE_QUOTE = 121;
	public static readonly DOUBLE_QUOTE = 122;
	public static readonly BACKTICK = 123;
	public static readonly BIT_NOT_OP = 124;
	public static readonly BIT_AND_OP = 125;
	public static readonly BIT_XOR_OP = 126;
	public static readonly AVG = 127;
	public static readonly COUNT = 128;
	public static readonly DISTINCT_COUNT = 129;
	public static readonly ESTDC = 130;
	public static readonly ESTDC_ERROR = 131;
	public static readonly MAX = 132;
	public static readonly MEAN = 133;
	public static readonly MEDIAN = 134;
	public static readonly MIN = 135;
	public static readonly MODE = 136;
	public static readonly RANGE = 137;
	public static readonly STDEV = 138;
	public static readonly STDEVP = 139;
	public static readonly SUM = 140;
	public static readonly SUMSQ = 141;
	public static readonly VAR_SAMP = 142;
	public static readonly VAR_POP = 143;
	public static readonly STDDEV_SAMP = 144;
	public static readonly STDDEV_POP = 145;
	public static readonly PERCENTILE = 146;
	public static readonly TAKE = 147;
	public static readonly FIRST = 148;
	public static readonly LAST = 149;
	public static readonly LIST = 150;
	public static readonly VALUES = 151;
	public static readonly EARLIEST = 152;
	public static readonly EARLIEST_TIME = 153;
	public static readonly LATEST = 154;
	public static readonly LATEST_TIME = 155;
	public static readonly PER_DAY = 156;
	public static readonly PER_HOUR = 157;
	public static readonly PER_MINUTE = 158;
	public static readonly PER_SECOND = 159;
	public static readonly RATE = 160;
	public static readonly SPARKLINE = 161;
	public static readonly C = 162;
	public static readonly DC = 163;
	public static readonly ABS = 164;
	public static readonly CEIL = 165;
	public static readonly CEILING = 166;
	public static readonly CONV = 167;
	public static readonly CRC32 = 168;
	public static readonly E = 169;
	public static readonly EXP = 170;
	public static readonly FLOOR = 171;
	public static readonly LN = 172;
	public static readonly LOG = 173;
	public static readonly LOG10 = 174;
	public static readonly LOG2 = 175;
	public static readonly MOD = 176;
	public static readonly PI = 177;
	public static readonly POW = 178;
	public static readonly POWER = 179;
	public static readonly RAND = 180;
	public static readonly ROUND = 181;
	public static readonly SIGN = 182;
	public static readonly SQRT = 183;
	public static readonly TRUNCATE = 184;
	public static readonly ACOS = 185;
	public static readonly ASIN = 186;
	public static readonly ATAN = 187;
	public static readonly ATAN2 = 188;
	public static readonly COS = 189;
	public static readonly COT = 190;
	public static readonly DEGREES = 191;
	public static readonly RADIANS = 192;
	public static readonly SIN = 193;
	public static readonly TAN = 194;
	public static readonly ADDDATE = 195;
	public static readonly CURDATE = 196;
	public static readonly CURRENT_DATE = 197;
	public static readonly CURRENT_TIME = 198;
	public static readonly CURRENT_TIMESTAMP = 199;
	public static readonly CURTIME = 200;
	public static readonly DATE = 201;
	public static readonly DATE_ADD = 202;
	public static readonly DATE_FORMAT = 203;
	public static readonly DATE_SUB = 204;
	public static readonly DAYNAME = 205;
	public static readonly DAYOFMONTH = 206;
	public static readonly DAYOFWEEK = 207;
	public static readonly DAYOFYEAR = 208;
	public static readonly FROM_DAYS = 209;
	public static readonly LOCALTIME = 210;
	public static readonly LOCALTIMESTAMP = 211;
	public static readonly FROM_UNIXTIME = 212;
	public static readonly MAKEDATE = 213;
	public static readonly MAKETIME = 214;
	public static readonly MONTHNAME = 215;
	public static readonly NOW = 216;
	public static readonly PERIOD_ADD = 217;
	public static readonly PERIOD_DIFF = 218;
	public static readonly SUBDATE = 219;
	public static readonly SYSDATE = 220;
	public static readonly TIME = 221;
	public static readonly TIME_TO_SEC = 222;
	public static readonly TIMESTAMP = 223;
	public static readonly TO_DAYS = 224;
	public static readonly UTC_DATE = 225;
	public static readonly UTC_TIME = 226;
	public static readonly UTC_TIMESTAMP = 227;
	public static readonly UNIX_TIMESTAMP = 228;
	public static readonly SUBSTR = 229;
	public static readonly SUBSTRING = 230;
	public static readonly LTRIM = 231;
	public static readonly RTRIM = 232;
	public static readonly TRIM = 233;
	public static readonly TO = 234;
	public static readonly LOWER = 235;
	public static readonly UPPER = 236;
	public static readonly CONCAT = 237;
	public static readonly CONCAT_WS = 238;
	public static readonly LENGTH = 239;
	public static readonly STRCMP = 240;
	public static readonly RIGHT = 241;
	public static readonly LEFT = 242;
	public static readonly ASCII = 243;
	public static readonly LOCATE = 244;
	public static readonly REPLACE = 245;
	public static readonly CAST = 246;
	public static readonly LIKE = 247;
	public static readonly ISNULL = 248;
	public static readonly ISNOTNULL = 249;
	public static readonly IFNULL = 250;
	public static readonly NULLIF = 251;
	public static readonly IF = 252;
	public static readonly TYPEOF = 253;
	public static readonly MATCH = 254;
	public static readonly MATCH_PHRASE = 255;
	public static readonly MATCH_PHRASE_PREFIX = 256;
	public static readonly MATCH_BOOL_PREFIX = 257;
	public static readonly SIMPLE_QUERY_STRING = 258;
	public static readonly MULTI_MATCH = 259;
	public static readonly QUERY_STRING = 260;
	public static readonly ALLOW_LEADING_WILDCARD = 261;
	public static readonly ANALYZE_WILDCARD = 262;
	public static readonly ANALYZER = 263;
	public static readonly AUTO_GENERATE_SYNONYMS_PHRASE_QUERY = 264;
	public static readonly BOOST = 265;
	public static readonly CUTOFF_FREQUENCY = 266;
	public static readonly DEFAULT_FIELD = 267;
	public static readonly DEFAULT_OPERATOR = 268;
	public static readonly ENABLE_POSITION_INCREMENTS = 269;
	public static readonly ESCAPE = 270;
	public static readonly FLAGS = 271;
	public static readonly FUZZY_MAX_EXPANSIONS = 272;
	public static readonly FUZZY_PREFIX_LENGTH = 273;
	public static readonly FUZZY_TRANSPOSITIONS = 274;
	public static readonly FUZZY_REWRITE = 275;
	public static readonly FUZZINESS = 276;
	public static readonly LENIENT = 277;
	public static readonly LOW_FREQ_OPERATOR = 278;
	public static readonly MAX_DETERMINIZED_STATES = 279;
	public static readonly MAX_EXPANSIONS = 280;
	public static readonly MINIMUM_SHOULD_MATCH = 281;
	public static readonly OPERATOR = 282;
	public static readonly PHRASE_SLOP = 283;
	public static readonly PREFIX_LENGTH = 284;
	public static readonly QUOTE_ANALYZER = 285;
	public static readonly QUOTE_FIELD_SUFFIX = 286;
	public static readonly REWRITE = 287;
	public static readonly SLOP = 288;
	public static readonly TIE_BREAKER = 289;
	public static readonly TYPE = 290;
	public static readonly ZERO_TERMS_QUERY = 291;
	public static readonly SPAN = 292;
	public static readonly MS = 293;
	public static readonly S = 294;
	public static readonly M = 295;
	public static readonly H = 296;
	public static readonly W = 297;
	public static readonly Q = 298;
	public static readonly Y = 299;
	public static readonly ID = 300;
	public static readonly INTEGER_LITERAL = 301;
	public static readonly DECIMAL_LITERAL = 302;
	public static readonly ID_DATE_SUFFIX = 303;
	public static readonly DQUOTA_STRING = 304;
	public static readonly SQUOTA_STRING = 305;
	public static readonly BQUOTA_STRING = 306;
	public static readonly ERROR_RECOGNITION = 307;
	public static readonly RULE_root = 0;
	public static readonly RULE_pplStatement = 1;
	public static readonly RULE_pplCommands = 2;
	public static readonly RULE_commands = 3;
	public static readonly RULE_searchCommand = 4;
	public static readonly RULE_describeCommand = 5;
	public static readonly RULE_showCatalogsCommand = 6;
	public static readonly RULE_whereCommand = 7;
	public static readonly RULE_fieldsCommand = 8;
	public static readonly RULE_renameCommand = 9;
	public static readonly RULE_statsCommand = 10;
	public static readonly RULE_dedupCommand = 11;
	public static readonly RULE_sortCommand = 12;
	public static readonly RULE_evalCommand = 13;
	public static readonly RULE_headCommand = 14;
	public static readonly RULE_topCommand = 15;
	public static readonly RULE_rareCommand = 16;
	public static readonly RULE_grokCommand = 17;
	public static readonly RULE_parseCommand = 18;
	public static readonly RULE_patternsCommand = 19;
	public static readonly RULE_patternsParameter = 20;
	public static readonly RULE_patternsMethod = 21;
	public static readonly RULE_kmeansCommand = 22;
	public static readonly RULE_kmeansParameter = 23;
	public static readonly RULE_adCommand = 24;
	public static readonly RULE_adParameter = 25;
	public static readonly RULE_mlCommand = 26;
	public static readonly RULE_mlArg = 27;
	public static readonly RULE_fromClause = 28;
	public static readonly RULE_tableSourceClause = 29;
	public static readonly RULE_renameClasue = 30;
	public static readonly RULE_byClause = 31;
	public static readonly RULE_statsByClause = 32;
	public static readonly RULE_bySpanClause = 33;
	public static readonly RULE_spanClause = 34;
	public static readonly RULE_sortbyClause = 35;
	public static readonly RULE_evalClause = 36;
	public static readonly RULE_statsAggTerm = 37;
	public static readonly RULE_statsFunction = 38;
	public static readonly RULE_statsFunctionName = 39;
	public static readonly RULE_takeAggFunction = 40;
	public static readonly RULE_percentileAggFunction = 41;
	public static readonly RULE_expression = 42;
	public static readonly RULE_logicalExpression = 43;
	public static readonly RULE_comparisonExpression = 44;
	public static readonly RULE_valueExpression = 45;
	public static readonly RULE_primaryExpression = 46;
	public static readonly RULE_constantFunction = 47;
	public static readonly RULE_booleanExpression = 48;
	public static readonly RULE_relevanceExpression = 49;
	public static readonly RULE_singleFieldRelevanceFunction = 50;
	public static readonly RULE_multiFieldRelevanceFunction = 51;
	public static readonly RULE_tableSource = 52;
	public static readonly RULE_tableFunction = 53;
	public static readonly RULE_fieldList = 54;
	public static readonly RULE_wcFieldList = 55;
	public static readonly RULE_sortField = 56;
	public static readonly RULE_sortFieldExpression = 57;
	public static readonly RULE_fieldExpression = 58;
	public static readonly RULE_wcFieldExpression = 59;
	public static readonly RULE_evalFunctionCall = 60;
	public static readonly RULE_dataTypeFunctionCall = 61;
	public static readonly RULE_booleanFunctionCall = 62;
	public static readonly RULE_convertedDataType = 63;
	public static readonly RULE_evalFunctionName = 64;
	public static readonly RULE_functionArgs = 65;
	public static readonly RULE_functionArg = 66;
	public static readonly RULE_relevanceArg = 67;
	public static readonly RULE_relevanceArgName = 68;
	public static readonly RULE_relevanceFieldAndWeight = 69;
	public static readonly RULE_relevanceFieldWeight = 70;
	public static readonly RULE_relevanceField = 71;
	public static readonly RULE_relevanceQuery = 72;
	public static readonly RULE_relevanceArgValue = 73;
	public static readonly RULE_mathematicalFunctionBase = 74;
	public static readonly RULE_trigonometricFunctionName = 75;
	public static readonly RULE_dateAndTimeFunctionBase = 76;
	public static readonly RULE_constantFunctionName = 77;
	public static readonly RULE_conditionFunctionBase = 78;
	public static readonly RULE_systemFunctionBase = 79;
	public static readonly RULE_textFunctionBase = 80;
	public static readonly RULE_comparisonOperator = 81;
	public static readonly RULE_binaryOperator = 82;
	public static readonly RULE_singleFieldRelevanceFunctionName = 83;
	public static readonly RULE_multiFieldRelevanceFunctionName = 84;
	public static readonly RULE_literalValue = 85;
	public static readonly RULE_intervalLiteral = 86;
	public static readonly RULE_stringLiteral = 87;
	public static readonly RULE_integerLiteral = 88;
	public static readonly RULE_decimalLiteral = 89;
	public static readonly RULE_booleanLiteral = 90;
	public static readonly RULE_datetimeLiteral = 91;
	public static readonly RULE_dateLiteral = 92;
	public static readonly RULE_timeLiteral = 93;
	public static readonly RULE_timestampLiteral = 94;
	public static readonly RULE_intervalUnit = 95;
	public static readonly RULE_timespanUnit = 96;
	public static readonly RULE_valueList = 97;
	public static readonly RULE_qualifiedName = 98;
	public static readonly RULE_wcQualifiedName = 99;
	public static readonly RULE_ident = 100;
	public static readonly RULE_wildcard = 101;
	public static readonly RULE_keywordsCanBeId = 102;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"root", "pplStatement", "pplCommands", "commands", "searchCommand", "describeCommand", 
		"showCatalogsCommand", "whereCommand", "fieldsCommand", "renameCommand", 
		"statsCommand", "dedupCommand", "sortCommand", "evalCommand", "headCommand", 
		"topCommand", "rareCommand", "grokCommand", "parseCommand", "patternsCommand", 
		"patternsParameter", "patternsMethod", "kmeansCommand", "kmeansParameter", 
		"adCommand", "adParameter", "mlCommand", "mlArg", "fromClause", "tableSourceClause", 
		"renameClasue", "byClause", "statsByClause", "bySpanClause", "spanClause", 
		"sortbyClause", "evalClause", "statsAggTerm", "statsFunction", "statsFunctionName", 
		"takeAggFunction", "percentileAggFunction", "expression", "logicalExpression", 
		"comparisonExpression", "valueExpression", "primaryExpression", "constantFunction", 
		"booleanExpression", "relevanceExpression", "singleFieldRelevanceFunction", 
		"multiFieldRelevanceFunction", "tableSource", "tableFunction", "fieldList", 
		"wcFieldList", "sortField", "sortFieldExpression", "fieldExpression", 
		"wcFieldExpression", "evalFunctionCall", "dataTypeFunctionCall", "booleanFunctionCall", 
		"convertedDataType", "evalFunctionName", "functionArgs", "functionArg", 
		"relevanceArg", "relevanceArgName", "relevanceFieldAndWeight", "relevanceFieldWeight", 
		"relevanceField", "relevanceQuery", "relevanceArgValue", "mathematicalFunctionBase", 
		"trigonometricFunctionName", "dateAndTimeFunctionBase", "constantFunctionName", 
		"conditionFunctionBase", "systemFunctionBase", "textFunctionBase", "comparisonOperator", 
		"binaryOperator", "singleFieldRelevanceFunctionName", "multiFieldRelevanceFunctionName", 
		"literalValue", "intervalLiteral", "stringLiteral", "integerLiteral", 
		"decimalLiteral", "booleanLiteral", "datetimeLiteral", "dateLiteral", 
		"timeLiteral", "timestampLiteral", "intervalUnit", "timespanUnit", "valueList", 
		"qualifiedName", "wcQualifiedName", "ident", "wildcard", "keywordsCanBeId",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'SEARCH'", "'DESCRIBE'", "'SHOW'", "'FROM'", "'WHERE'", "'FIELDS'", 
		"'RENAME'", "'STATS'", "'DEDUP'", "'SORT'", "'EVAL'", "'HEAD'", "'TOP'", 
		"'RARE'", "'PARSE'", "'METHOD'", "'REGEX'", "'PUNCT'", "'GROK'", "'PATTERN'", 
		"'PATTERNS'", "'NEW_FIELD'", "'KMEANS'", "'AD'", "'ML'", "'AS'", "'BY'", 
		"'SOURCE'", "'INDEX'", "'D'", "'DESC'", "'CATALOGS'", "'SORTBY'", "'AUTO'", 
		"'STR'", "'IP'", "'NUM'", "'KEEPEMPTY'", "'CONSECUTIVE'", "'DEDUP_SPLITVALUES'", 
		"'PARTITIONS'", "'ALLNUM'", "'DELIM'", "'CENTROIDS'", "'ITERATIONS'", 
		"'DISTANCE_TYPE'", "'NUMBER_OF_TREES'", "'SHINGLE_SIZE'", "'SAMPLE_SIZE'", 
		"'OUTPUT_AFTER'", "'TIME_DECAY'", "'ANOMALY_RATE'", "'CATEGORY_FIELD'", 
		"'TIME_FIELD'", "'TIME_ZONE'", "'TRAINING_DATA_SIZE'", "'ANOMALY_SCORE_THRESHOLD'", 
		"'CASE'", "'IN'", "'NOT'", "'OR'", "'AND'", "'XOR'", "'TRUE'", "'FALSE'", 
		"'REGEXP'", "'DATETIME'", "'INTERVAL'", "'MICROSECOND'", "'MILLISECOND'", 
		"'SECOND'", "'MINUTE'", "'HOUR'", "'DAY'", "'WEEK'", "'MONTH'", "'QUARTER'", 
		"'YEAR'", "'SECOND_MICROSECOND'", "'MINUTE_MICROSECOND'", "'MINUTE_SECOND'", 
		"'HOUR_MICROSECOND'", "'HOUR_SECOND'", "'HOUR_MINUTE'", "'DAY_MICROSECOND'", 
		"'DAY_SECOND'", "'DAY_MINUTE'", "'DAY_HOUR'", "'YEAR_MONTH'", "'CONVERT_TZ'", 
		"'DATAMODEL'", "'LOOKUP'", "'SAVEDSEARCH'", "'INT'", "'INTEGER'", "'DOUBLE'", 
		"'LONG'", "'FLOAT'", "'STRING'", "'BOOLEAN'", "'|'", "','", "'.'", "'='", 
		"'>'", "'<'", undefined, undefined, undefined, "'+'", "'-'", "'*'", "'/'", 
		"'%'", "'!'", "':'", "'('", "')'", "'['", "']'", "'''", "'\"'", "'`'", 
		"'~'", "'&'", "'^'", "'AVG'", "'COUNT'", "'DISTINCT_COUNT'", "'ESTDC'", 
		"'ESTDC_ERROR'", "'MAX'", "'MEAN'", "'MEDIAN'", "'MIN'", "'MODE'", "'RANGE'", 
		"'STDEV'", "'STDEVP'", "'SUM'", "'SUMSQ'", "'VAR_SAMP'", "'VAR_POP'", 
		"'STDDEV_SAMP'", "'STDDEV_POP'", "'PERCENTILE'", "'TAKE'", "'FIRST'", 
		"'LAST'", "'LIST'", "'VALUES'", "'EARLIEST'", "'EARLIEST_TIME'", "'LATEST'", 
		"'LATEST_TIME'", "'PER_DAY'", "'PER_HOUR'", "'PER_MINUTE'", "'PER_SECOND'", 
		"'RATE'", "'SPARKLINE'", "'C'", "'DC'", "'ABS'", "'CEIL'", "'CEILING'", 
		"'CONV'", "'CRC32'", "'E'", "'EXP'", "'FLOOR'", "'LN'", "'LOG'", "'LOG10'", 
		"'LOG2'", "'MOD'", "'PI'", "'POW'", "'POWER'", "'RAND'", "'ROUND'", "'SIGN'", 
		"'SQRT'", "'TRUNCATE'", "'ACOS'", "'ASIN'", "'ATAN'", "'ATAN2'", "'COS'", 
		"'COT'", "'DEGREES'", "'RADIANS'", "'SIN'", "'TAN'", "'ADDDATE'", "'CURDATE'", 
		"'CURRENT_DATE'", "'CURRENT_TIME'", "'CURRENT_TIMESTAMP'", "'CURTIME'", 
		"'DATE'", "'DATE_ADD'", "'DATE_FORMAT'", "'DATE_SUB'", "'DAYNAME'", "'DAYOFMONTH'", 
		"'DAYOFWEEK'", "'DAYOFYEAR'", "'FROM_DAYS'", "'LOCALTIME'", "'LOCALTIMESTAMP'", 
		"'FROM_UNIXTIME'", "'MAKEDATE'", "'MAKETIME'", "'MONTHNAME'", "'NOW'", 
		"'PERIOD_ADD'", "'PERIOD_DIFF'", "'SUBDATE'", "'SYSDATE'", "'TIME'", "'TIME_TO_SEC'", 
		"'TIMESTAMP'", "'TO_DAYS'", "'UTC_DATE'", "'UTC_TIME'", "'UTC_TIMESTAMP'", 
		"'UNIX_TIMESTAMP'", "'SUBSTR'", "'SUBSTRING'", "'LTRIM'", "'RTRIM'", "'TRIM'", 
		"'TO'", "'LOWER'", "'UPPER'", "'CONCAT'", "'CONCAT_WS'", "'LENGTH'", "'STRCMP'", 
		"'RIGHT'", "'LEFT'", "'ASCII'", "'LOCATE'", "'REPLACE'", "'CAST'", "'LIKE'", 
		"'ISNULL'", "'ISNOTNULL'", "'IFNULL'", "'NULLIF'", "'IF'", "'TYPEOF'", 
		"'MATCH'", "'MATCH_PHRASE'", "'MATCH_PHRASE_PREFIX'", "'MATCH_BOOL_PREFIX'", 
		"'SIMPLE_QUERY_STRING'", "'MULTI_MATCH'", "'QUERY_STRING'", "'ALLOW_LEADING_WILDCARD'", 
		"'ANALYZE_WILDCARD'", "'ANALYZER'", "'AUTO_GENERATE_SYNONYMS_PHRASE_QUERY'", 
		"'BOOST'", "'CUTOFF_FREQUENCY'", "'DEFAULT_FIELD'", "'DEFAULT_OPERATOR'", 
		"'ENABLE_POSITION_INCREMENTS'", "'ESCAPE'", "'FLAGS'", "'FUZZY_MAX_EXPANSIONS'", 
		"'FUZZY_PREFIX_LENGTH'", "'FUZZY_TRANSPOSITIONS'", "'FUZZY_REWRITE'", 
		"'FUZZINESS'", "'LENIENT'", "'LOW_FREQ_OPERATOR'", "'MAX_DETERMINIZED_STATES'", 
		"'MAX_EXPANSIONS'", "'MINIMUM_SHOULD_MATCH'", "'OPERATOR'", "'PHRASE_SLOP'", 
		"'PREFIX_LENGTH'", "'QUOTE_ANALYZER'", "'QUOTE_FIELD_SUFFIX'", "'REWRITE'", 
		"'SLOP'", "'TIE_BREAKER'", "'TYPE'", "'ZERO_TERMS_QUERY'", "'SPAN'", "'MS'", 
		"'S'", "'M'", "'H'", "'W'", "'Q'", "'Y'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "SEARCH", "DESCRIBE", "SHOW", "FROM", "WHERE", "FIELDS", "RENAME", 
		"STATS", "DEDUP", "SORT", "EVAL", "HEAD", "TOP", "RARE", "PARSE", "METHOD", 
		"REGEX", "PUNCT", "GROK", "PATTERN", "PATTERNS", "NEW_FIELD", "KMEANS", 
		"AD", "ML", "AS", "BY", "SOURCE", "INDEX", "D", "DESC", "CATALOGS", "SORTBY", 
		"AUTO", "STR", "IP", "NUM", "KEEPEMPTY", "CONSECUTIVE", "DEDUP_SPLITVALUES", 
		"PARTITIONS", "ALLNUM", "DELIM", "CENTROIDS", "ITERATIONS", "DISTANCE_TYPE", 
		"NUMBER_OF_TREES", "SHINGLE_SIZE", "SAMPLE_SIZE", "OUTPUT_AFTER", "TIME_DECAY", 
		"ANOMALY_RATE", "CATEGORY_FIELD", "TIME_FIELD", "TIME_ZONE", "TRAINING_DATA_SIZE", 
		"ANOMALY_SCORE_THRESHOLD", "CASE", "IN", "NOT", "OR", "AND", "XOR", "TRUE", 
		"FALSE", "REGEXP", "DATETIME", "INTERVAL", "MICROSECOND", "MILLISECOND", 
		"SECOND", "MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "QUARTER", "YEAR", 
		"SECOND_MICROSECOND", "MINUTE_MICROSECOND", "MINUTE_SECOND", "HOUR_MICROSECOND", 
		"HOUR_SECOND", "HOUR_MINUTE", "DAY_MICROSECOND", "DAY_SECOND", "DAY_MINUTE", 
		"DAY_HOUR", "YEAR_MONTH", "CONVERT_TZ", "DATAMODEL", "LOOKUP", "SAVEDSEARCH", 
		"INT", "INTEGER", "DOUBLE", "LONG", "FLOAT", "STRING", "BOOLEAN", "PIPE", 
		"COMMA", "DOT", "EQUAL", "GREATER", "LESS", "NOT_GREATER", "NOT_LESS", 
		"NOT_EQUAL", "PLUS", "MINUS", "STAR", "DIVIDE", "MODULE", "EXCLAMATION_SYMBOL", 
		"COLON", "LT_PRTHS", "RT_PRTHS", "LT_SQR_PRTHS", "RT_SQR_PRTHS", "SINGLE_QUOTE", 
		"DOUBLE_QUOTE", "BACKTICK", "BIT_NOT_OP", "BIT_AND_OP", "BIT_XOR_OP", 
		"AVG", "COUNT", "DISTINCT_COUNT", "ESTDC", "ESTDC_ERROR", "MAX", "MEAN", 
		"MEDIAN", "MIN", "MODE", "RANGE", "STDEV", "STDEVP", "SUM", "SUMSQ", "VAR_SAMP", 
		"VAR_POP", "STDDEV_SAMP", "STDDEV_POP", "PERCENTILE", "TAKE", "FIRST", 
		"LAST", "LIST", "VALUES", "EARLIEST", "EARLIEST_TIME", "LATEST", "LATEST_TIME", 
		"PER_DAY", "PER_HOUR", "PER_MINUTE", "PER_SECOND", "RATE", "SPARKLINE", 
		"C", "DC", "ABS", "CEIL", "CEILING", "CONV", "CRC32", "E", "EXP", "FLOOR", 
		"LN", "LOG", "LOG10", "LOG2", "MOD", "PI", "POW", "POWER", "RAND", "ROUND", 
		"SIGN", "SQRT", "TRUNCATE", "ACOS", "ASIN", "ATAN", "ATAN2", "COS", "COT", 
		"DEGREES", "RADIANS", "SIN", "TAN", "ADDDATE", "CURDATE", "CURRENT_DATE", 
		"CURRENT_TIME", "CURRENT_TIMESTAMP", "CURTIME", "DATE", "DATE_ADD", "DATE_FORMAT", 
		"DATE_SUB", "DAYNAME", "DAYOFMONTH", "DAYOFWEEK", "DAYOFYEAR", "FROM_DAYS", 
		"LOCALTIME", "LOCALTIMESTAMP", "FROM_UNIXTIME", "MAKEDATE", "MAKETIME", 
		"MONTHNAME", "NOW", "PERIOD_ADD", "PERIOD_DIFF", "SUBDATE", "SYSDATE", 
		"TIME", "TIME_TO_SEC", "TIMESTAMP", "TO_DAYS", "UTC_DATE", "UTC_TIME", 
		"UTC_TIMESTAMP", "UNIX_TIMESTAMP", "SUBSTR", "SUBSTRING", "LTRIM", "RTRIM", 
		"TRIM", "TO", "LOWER", "UPPER", "CONCAT", "CONCAT_WS", "LENGTH", "STRCMP", 
		"RIGHT", "LEFT", "ASCII", "LOCATE", "REPLACE", "CAST", "LIKE", "ISNULL", 
		"ISNOTNULL", "IFNULL", "NULLIF", "IF", "TYPEOF", "MATCH", "MATCH_PHRASE", 
		"MATCH_PHRASE_PREFIX", "MATCH_BOOL_PREFIX", "SIMPLE_QUERY_STRING", "MULTI_MATCH", 
		"QUERY_STRING", "ALLOW_LEADING_WILDCARD", "ANALYZE_WILDCARD", "ANALYZER", 
		"AUTO_GENERATE_SYNONYMS_PHRASE_QUERY", "BOOST", "CUTOFF_FREQUENCY", "DEFAULT_FIELD", 
		"DEFAULT_OPERATOR", "ENABLE_POSITION_INCREMENTS", "ESCAPE", "FLAGS", "FUZZY_MAX_EXPANSIONS", 
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
			this.state = 207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << OpenSearchPPLParser.SEARCH) | (1 << OpenSearchPPLParser.DESCRIBE) | (1 << OpenSearchPPLParser.SHOW) | (1 << OpenSearchPPLParser.SOURCE) | (1 << OpenSearchPPLParser.INDEX) | (1 << OpenSearchPPLParser.D))) !== 0) || ((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & ((1 << (OpenSearchPPLParser.NOT - 60)) | (1 << (OpenSearchPPLParser.TRUE - 60)) | (1 << (OpenSearchPPLParser.FALSE - 60)) | (1 << (OpenSearchPPLParser.DATETIME - 60)) | (1 << (OpenSearchPPLParser.INTERVAL - 60)) | (1 << (OpenSearchPPLParser.MICROSECOND - 60)) | (1 << (OpenSearchPPLParser.MILLISECOND - 60)) | (1 << (OpenSearchPPLParser.SECOND - 60)) | (1 << (OpenSearchPPLParser.MINUTE - 60)) | (1 << (OpenSearchPPLParser.HOUR - 60)) | (1 << (OpenSearchPPLParser.DAY - 60)) | (1 << (OpenSearchPPLParser.WEEK - 60)) | (1 << (OpenSearchPPLParser.MONTH - 60)) | (1 << (OpenSearchPPLParser.QUARTER - 60)) | (1 << (OpenSearchPPLParser.YEAR - 60)) | (1 << (OpenSearchPPLParser.CONVERT_TZ - 60)))) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & ((1 << (OpenSearchPPLParser.DOT - 103)) | (1 << (OpenSearchPPLParser.PLUS - 103)) | (1 << (OpenSearchPPLParser.MINUS - 103)) | (1 << (OpenSearchPPLParser.LT_PRTHS - 103)) | (1 << (OpenSearchPPLParser.BACKTICK - 103)) | (1 << (OpenSearchPPLParser.AVG - 103)) | (1 << (OpenSearchPPLParser.COUNT - 103)) | (1 << (OpenSearchPPLParser.MAX - 103)))) !== 0) || ((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & ((1 << (OpenSearchPPLParser.MIN - 135)) | (1 << (OpenSearchPPLParser.SUM - 135)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 135)) | (1 << (OpenSearchPPLParser.VAR_POP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 135)) | (1 << (OpenSearchPPLParser.FIRST - 135)) | (1 << (OpenSearchPPLParser.LAST - 135)) | (1 << (OpenSearchPPLParser.ABS - 135)) | (1 << (OpenSearchPPLParser.CEIL - 135)) | (1 << (OpenSearchPPLParser.CEILING - 135)))) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & ((1 << (OpenSearchPPLParser.CONV - 167)) | (1 << (OpenSearchPPLParser.CRC32 - 167)) | (1 << (OpenSearchPPLParser.E - 167)) | (1 << (OpenSearchPPLParser.EXP - 167)) | (1 << (OpenSearchPPLParser.FLOOR - 167)) | (1 << (OpenSearchPPLParser.LN - 167)) | (1 << (OpenSearchPPLParser.LOG - 167)) | (1 << (OpenSearchPPLParser.LOG10 - 167)) | (1 << (OpenSearchPPLParser.LOG2 - 167)) | (1 << (OpenSearchPPLParser.MOD - 167)) | (1 << (OpenSearchPPLParser.PI - 167)) | (1 << (OpenSearchPPLParser.POW - 167)) | (1 << (OpenSearchPPLParser.POWER - 167)) | (1 << (OpenSearchPPLParser.RAND - 167)) | (1 << (OpenSearchPPLParser.ROUND - 167)) | (1 << (OpenSearchPPLParser.SIGN - 167)) | (1 << (OpenSearchPPLParser.SQRT - 167)) | (1 << (OpenSearchPPLParser.TRUNCATE - 167)) | (1 << (OpenSearchPPLParser.ACOS - 167)) | (1 << (OpenSearchPPLParser.ASIN - 167)) | (1 << (OpenSearchPPLParser.ATAN - 167)) | (1 << (OpenSearchPPLParser.ATAN2 - 167)) | (1 << (OpenSearchPPLParser.COS - 167)) | (1 << (OpenSearchPPLParser.COT - 167)) | (1 << (OpenSearchPPLParser.DEGREES - 167)) | (1 << (OpenSearchPPLParser.RADIANS - 167)) | (1 << (OpenSearchPPLParser.SIN - 167)) | (1 << (OpenSearchPPLParser.TAN - 167)) | (1 << (OpenSearchPPLParser.ADDDATE - 167)) | (1 << (OpenSearchPPLParser.CURDATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_DATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_TIME - 167)))) !== 0) || ((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (OpenSearchPPLParser.CURRENT_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.CURTIME - 199)) | (1 << (OpenSearchPPLParser.DATE - 199)) | (1 << (OpenSearchPPLParser.DATE_ADD - 199)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 199)) | (1 << (OpenSearchPPLParser.DATE_SUB - 199)) | (1 << (OpenSearchPPLParser.DAYNAME - 199)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 199)) | (1 << (OpenSearchPPLParser.DAYOFWEEK - 199)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 199)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 199)) | (1 << (OpenSearchPPLParser.LOCALTIME - 199)) | (1 << (OpenSearchPPLParser.LOCALTIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.FROM_UNIXTIME - 199)) | (1 << (OpenSearchPPLParser.MAKEDATE - 199)) | (1 << (OpenSearchPPLParser.MAKETIME - 199)) | (1 << (OpenSearchPPLParser.MONTHNAME - 199)) | (1 << (OpenSearchPPLParser.NOW - 199)) | (1 << (OpenSearchPPLParser.PERIOD_ADD - 199)) | (1 << (OpenSearchPPLParser.PERIOD_DIFF - 199)) | (1 << (OpenSearchPPLParser.SUBDATE - 199)) | (1 << (OpenSearchPPLParser.SYSDATE - 199)) | (1 << (OpenSearchPPLParser.TIME - 199)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 199)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.TO_DAYS - 199)) | (1 << (OpenSearchPPLParser.UTC_DATE - 199)) | (1 << (OpenSearchPPLParser.UTC_TIME - 199)) | (1 << (OpenSearchPPLParser.UTC_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.UNIX_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.SUBSTR - 199)) | (1 << (OpenSearchPPLParser.SUBSTRING - 199)))) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & ((1 << (OpenSearchPPLParser.LTRIM - 231)) | (1 << (OpenSearchPPLParser.RTRIM - 231)) | (1 << (OpenSearchPPLParser.TRIM - 231)) | (1 << (OpenSearchPPLParser.LOWER - 231)) | (1 << (OpenSearchPPLParser.UPPER - 231)) | (1 << (OpenSearchPPLParser.CONCAT - 231)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 231)) | (1 << (OpenSearchPPLParser.LENGTH - 231)) | (1 << (OpenSearchPPLParser.STRCMP - 231)) | (1 << (OpenSearchPPLParser.RIGHT - 231)) | (1 << (OpenSearchPPLParser.LEFT - 231)) | (1 << (OpenSearchPPLParser.ASCII - 231)) | (1 << (OpenSearchPPLParser.LOCATE - 231)) | (1 << (OpenSearchPPLParser.REPLACE - 231)) | (1 << (OpenSearchPPLParser.CAST - 231)) | (1 << (OpenSearchPPLParser.LIKE - 231)) | (1 << (OpenSearchPPLParser.ISNULL - 231)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 231)) | (1 << (OpenSearchPPLParser.IFNULL - 231)) | (1 << (OpenSearchPPLParser.NULLIF - 231)) | (1 << (OpenSearchPPLParser.IF - 231)) | (1 << (OpenSearchPPLParser.TYPEOF - 231)) | (1 << (OpenSearchPPLParser.MATCH - 231)) | (1 << (OpenSearchPPLParser.MATCH_PHRASE - 231)) | (1 << (OpenSearchPPLParser.MATCH_PHRASE_PREFIX - 231)) | (1 << (OpenSearchPPLParser.MATCH_BOOL_PREFIX - 231)) | (1 << (OpenSearchPPLParser.SIMPLE_QUERY_STRING - 231)) | (1 << (OpenSearchPPLParser.MULTI_MATCH - 231)) | (1 << (OpenSearchPPLParser.QUERY_STRING - 231)))) !== 0) || ((((_la - 292)) & ~0x1F) === 0 && ((1 << (_la - 292)) & ((1 << (OpenSearchPPLParser.SPAN - 292)) | (1 << (OpenSearchPPLParser.MS - 292)) | (1 << (OpenSearchPPLParser.S - 292)) | (1 << (OpenSearchPPLParser.M - 292)) | (1 << (OpenSearchPPLParser.H - 292)) | (1 << (OpenSearchPPLParser.W - 292)) | (1 << (OpenSearchPPLParser.Q - 292)) | (1 << (OpenSearchPPLParser.Y - 292)) | (1 << (OpenSearchPPLParser.ID - 292)) | (1 << (OpenSearchPPLParser.INTEGER_LITERAL - 292)) | (1 << (OpenSearchPPLParser.DECIMAL_LITERAL - 292)) | (1 << (OpenSearchPPLParser.DQUOTA_STRING - 292)) | (1 << (OpenSearchPPLParser.SQUOTA_STRING - 292)) | (1 << (OpenSearchPPLParser.BQUOTA_STRING - 292)))) !== 0)) {
				{
				this.state = 206;
				this.pplStatement();
				}
			}

			this.state = 209;
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
			this.state = 211;
			this.pplCommands();
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.PIPE) {
				{
				{
				this.state = 212;
				this.match(OpenSearchPPLParser.PIPE);
				this.state = 213;
				this.commands();
				}
				}
				this.state = 218;
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
	public pplCommands(): PplCommandsContext {
		let _localctx: PplCommandsContext = new PplCommandsContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, OpenSearchPPLParser.RULE_pplCommands);
		try {
			this.state = 222;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.SEARCH:
			case OpenSearchPPLParser.SOURCE:
			case OpenSearchPPLParser.INDEX:
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.NOT:
			case OpenSearchPPLParser.TRUE:
			case OpenSearchPPLParser.FALSE:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.PLUS:
			case OpenSearchPPLParser.MINUS:
			case OpenSearchPPLParser.LT_PRTHS:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
			case OpenSearchPPLParser.TYPEOF:
			case OpenSearchPPLParser.MATCH:
			case OpenSearchPPLParser.MATCH_PHRASE:
			case OpenSearchPPLParser.MATCH_PHRASE_PREFIX:
			case OpenSearchPPLParser.MATCH_BOOL_PREFIX:
			case OpenSearchPPLParser.SIMPLE_QUERY_STRING:
			case OpenSearchPPLParser.MULTI_MATCH:
			case OpenSearchPPLParser.QUERY_STRING:
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
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 219;
				this.searchCommand();
				}
				break;
			case OpenSearchPPLParser.DESCRIBE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 220;
				this.describeCommand();
				}
				break;
			case OpenSearchPPLParser.SHOW:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 221;
				this.showCatalogsCommand();
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
	public commands(): CommandsContext {
		let _localctx: CommandsContext = new CommandsContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, OpenSearchPPLParser.RULE_commands);
		try {
			this.state = 240;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.WHERE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 224;
				this.whereCommand();
				}
				break;
			case OpenSearchPPLParser.FIELDS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 225;
				this.fieldsCommand();
				}
				break;
			case OpenSearchPPLParser.RENAME:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 226;
				this.renameCommand();
				}
				break;
			case OpenSearchPPLParser.STATS:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 227;
				this.statsCommand();
				}
				break;
			case OpenSearchPPLParser.DEDUP:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 228;
				this.dedupCommand();
				}
				break;
			case OpenSearchPPLParser.SORT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 229;
				this.sortCommand();
				}
				break;
			case OpenSearchPPLParser.EVAL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 230;
				this.evalCommand();
				}
				break;
			case OpenSearchPPLParser.HEAD:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 231;
				this.headCommand();
				}
				break;
			case OpenSearchPPLParser.TOP:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 232;
				this.topCommand();
				}
				break;
			case OpenSearchPPLParser.RARE:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 233;
				this.rareCommand();
				}
				break;
			case OpenSearchPPLParser.GROK:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 234;
				this.grokCommand();
				}
				break;
			case OpenSearchPPLParser.PARSE:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 235;
				this.parseCommand();
				}
				break;
			case OpenSearchPPLParser.PATTERNS:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 236;
				this.patternsCommand();
				}
				break;
			case OpenSearchPPLParser.KMEANS:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 237;
				this.kmeansCommand();
				}
				break;
			case OpenSearchPPLParser.AD:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 238;
				this.adCommand();
				}
				break;
			case OpenSearchPPLParser.ML:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 239;
				this.mlCommand();
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
		this.enterRule(_localctx, 8, OpenSearchPPLParser.RULE_searchCommand);
		let _la: number;
		try {
			this.state = 258;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				_localctx = new SearchFromContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 243;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 242;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 245;
				this.fromClause();
				}
				break;

			case 2:
				_localctx = new SearchFromFilterContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 247;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 246;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 249;
				this.fromClause();
				this.state = 250;
				this.logicalExpression(0);
				}
				break;

			case 3:
				_localctx = new SearchFilterFromContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.SEARCH) {
					{
					this.state = 252;
					this.match(OpenSearchPPLParser.SEARCH);
					}
				}

				this.state = 255;
				this.logicalExpression(0);
				this.state = 256;
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
	public describeCommand(): DescribeCommandContext {
		let _localctx: DescribeCommandContext = new DescribeCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, OpenSearchPPLParser.RULE_describeCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 260;
			this.match(OpenSearchPPLParser.DESCRIBE);
			this.state = 261;
			this.tableSourceClause();
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
	public showCatalogsCommand(): ShowCatalogsCommandContext {
		let _localctx: ShowCatalogsCommandContext = new ShowCatalogsCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, OpenSearchPPLParser.RULE_showCatalogsCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 263;
			this.match(OpenSearchPPLParser.SHOW);
			this.state = 264;
			this.match(OpenSearchPPLParser.CATALOGS);
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
		this.enterRule(_localctx, 14, OpenSearchPPLParser.RULE_whereCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this.match(OpenSearchPPLParser.WHERE);
			this.state = 267;
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
		this.enterRule(_localctx, 16, OpenSearchPPLParser.RULE_fieldsCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 269;
			this.match(OpenSearchPPLParser.FIELDS);
			this.state = 271;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 270;
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

			this.state = 273;
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
		this.enterRule(_localctx, 18, OpenSearchPPLParser.RULE_renameCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 275;
			this.match(OpenSearchPPLParser.RENAME);
			this.state = 276;
			this.renameClasue();
			this.state = 281;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 277;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 278;
				this.renameClasue();
				}
				}
				this.state = 283;
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
		this.enterRule(_localctx, 20, OpenSearchPPLParser.RULE_statsCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 284;
			this.match(OpenSearchPPLParser.STATS);
			this.state = 288;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PARTITIONS) {
				{
				this.state = 285;
				this.match(OpenSearchPPLParser.PARTITIONS);
				this.state = 286;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 287;
				_localctx._partitions = this.integerLiteral();
				}
			}

			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.ALLNUM) {
				{
				this.state = 290;
				this.match(OpenSearchPPLParser.ALLNUM);
				this.state = 291;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 292;
				_localctx._allnum = this.booleanLiteral();
				}
			}

			this.state = 298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.DELIM) {
				{
				this.state = 295;
				this.match(OpenSearchPPLParser.DELIM);
				this.state = 296;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 297;
				_localctx._delim = this.stringLiteral();
				}
			}

			this.state = 300;
			this.statsAggTerm();
			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 301;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 302;
				this.statsAggTerm();
				}
				}
				this.state = 307;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 309;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 308;
				this.statsByClause();
				}
			}

			this.state = 314;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.DEDUP_SPLITVALUES) {
				{
				this.state = 311;
				this.match(OpenSearchPPLParser.DEDUP_SPLITVALUES);
				this.state = 312;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 313;
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
		this.enterRule(_localctx, 22, OpenSearchPPLParser.RULE_dedupCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this.match(OpenSearchPPLParser.DEDUP);
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 317;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 320;
			this.fieldList();
			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.KEEPEMPTY) {
				{
				this.state = 321;
				this.match(OpenSearchPPLParser.KEEPEMPTY);
				this.state = 322;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 323;
				_localctx._keepempty = this.booleanLiteral();
				}
			}

			this.state = 329;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.CONSECUTIVE) {
				{
				this.state = 326;
				this.match(OpenSearchPPLParser.CONSECUTIVE);
				this.state = 327;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 328;
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
		this.enterRule(_localctx, 24, OpenSearchPPLParser.RULE_sortCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 331;
			this.match(OpenSearchPPLParser.SORT);
			this.state = 332;
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
		this.enterRule(_localctx, 26, OpenSearchPPLParser.RULE_evalCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 334;
			this.match(OpenSearchPPLParser.EVAL);
			this.state = 335;
			this.evalClause();
			this.state = 340;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 336;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 337;
				this.evalClause();
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
	public headCommand(): HeadCommandContext {
		let _localctx: HeadCommandContext = new HeadCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, OpenSearchPPLParser.RULE_headCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 343;
			this.match(OpenSearchPPLParser.HEAD);
			this.state = 345;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 344;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 349;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.FROM) {
				{
				this.state = 347;
				this.match(OpenSearchPPLParser.FROM);
				this.state = 348;
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
		this.enterRule(_localctx, 30, OpenSearchPPLParser.RULE_topCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 351;
			this.match(OpenSearchPPLParser.TOP);
			this.state = 353;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS || _la === OpenSearchPPLParser.INTEGER_LITERAL) {
				{
				this.state = 352;
				_localctx._number = this.integerLiteral();
				}
			}

			this.state = 355;
			this.fieldList();
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 356;
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
		this.enterRule(_localctx, 32, OpenSearchPPLParser.RULE_rareCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 359;
			this.match(OpenSearchPPLParser.RARE);
			this.state = 360;
			this.fieldList();
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.BY) {
				{
				this.state = 361;
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
	public grokCommand(): GrokCommandContext {
		let _localctx: GrokCommandContext = new GrokCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, OpenSearchPPLParser.RULE_grokCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 364;
			this.match(OpenSearchPPLParser.GROK);
			{
			this.state = 365;
			_localctx._source_field = this.expression();
			}
			{
			this.state = 366;
			_localctx._pattern = this.stringLiteral();
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
		this.enterRule(_localctx, 36, OpenSearchPPLParser.RULE_parseCommand);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 368;
			this.match(OpenSearchPPLParser.PARSE);
			{
			this.state = 369;
			_localctx._source_field = this.expression();
			}
			{
			this.state = 370;
			_localctx._pattern = this.stringLiteral();
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
	public patternsCommand(): PatternsCommandContext {
		let _localctx: PatternsCommandContext = new PatternsCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, OpenSearchPPLParser.RULE_patternsCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 372;
			this.match(OpenSearchPPLParser.PATTERNS);
			this.state = 376;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.PATTERN || _la === OpenSearchPPLParser.NEW_FIELD) {
				{
				{
				this.state = 373;
				this.patternsParameter();
				}
				}
				this.state = 378;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			{
			this.state = 379;
			_localctx._source_field = this.expression();
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
	public patternsParameter(): PatternsParameterContext {
		let _localctx: PatternsParameterContext = new PatternsParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, OpenSearchPPLParser.RULE_patternsParameter);
		try {
			this.state = 387;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.NEW_FIELD:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 381;
				this.match(OpenSearchPPLParser.NEW_FIELD);
				this.state = 382;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 383;
				_localctx._new_field = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.PATTERN:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 384;
				this.match(OpenSearchPPLParser.PATTERN);
				this.state = 385;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 386;
				_localctx._pattern = this.stringLiteral();
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
	public patternsMethod(): PatternsMethodContext {
		let _localctx: PatternsMethodContext = new PatternsMethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, OpenSearchPPLParser.RULE_patternsMethod);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 389;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.REGEX || _la === OpenSearchPPLParser.PUNCT)) {
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
	public kmeansCommand(): KmeansCommandContext {
		let _localctx: KmeansCommandContext = new KmeansCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, OpenSearchPPLParser.RULE_kmeansCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 391;
			this.match(OpenSearchPPLParser.KMEANS);
			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & ((1 << (OpenSearchPPLParser.CENTROIDS - 44)) | (1 << (OpenSearchPPLParser.ITERATIONS - 44)) | (1 << (OpenSearchPPLParser.DISTANCE_TYPE - 44)))) !== 0)) {
				{
				{
				this.state = 392;
				this.kmeansParameter();
				}
				}
				this.state = 397;
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
		this.enterRule(_localctx, 46, OpenSearchPPLParser.RULE_kmeansParameter);
		try {
			this.state = 407;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.CENTROIDS:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 398;
				this.match(OpenSearchPPLParser.CENTROIDS);
				this.state = 399;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 400;
				_localctx._centroids = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ITERATIONS:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 401;
				this.match(OpenSearchPPLParser.ITERATIONS);
				this.state = 402;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 403;
				_localctx._iterations = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.DISTANCE_TYPE:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 404;
				this.match(OpenSearchPPLParser.DISTANCE_TYPE);
				this.state = 405;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 406;
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
		this.enterRule(_localctx, 48, OpenSearchPPLParser.RULE_adCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 409;
			this.match(OpenSearchPPLParser.AD);
			this.state = 413;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & ((1 << (OpenSearchPPLParser.NUMBER_OF_TREES - 47)) | (1 << (OpenSearchPPLParser.SHINGLE_SIZE - 47)) | (1 << (OpenSearchPPLParser.SAMPLE_SIZE - 47)) | (1 << (OpenSearchPPLParser.OUTPUT_AFTER - 47)) | (1 << (OpenSearchPPLParser.TIME_DECAY - 47)) | (1 << (OpenSearchPPLParser.ANOMALY_RATE - 47)) | (1 << (OpenSearchPPLParser.CATEGORY_FIELD - 47)) | (1 << (OpenSearchPPLParser.TIME_FIELD - 47)) | (1 << (OpenSearchPPLParser.TIME_ZONE - 47)) | (1 << (OpenSearchPPLParser.TRAINING_DATA_SIZE - 47)) | (1 << (OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD - 47)))) !== 0) || _la === OpenSearchPPLParser.DATE_FORMAT) {
				{
				{
				this.state = 410;
				this.adParameter();
				}
				}
				this.state = 415;
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
		this.enterRule(_localctx, 50, OpenSearchPPLParser.RULE_adParameter);
		try {
			this.state = 452;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.NUMBER_OF_TREES:
				this.enterOuterAlt(_localctx, 1);
				{
				{
				this.state = 416;
				this.match(OpenSearchPPLParser.NUMBER_OF_TREES);
				this.state = 417;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 418;
				_localctx._number_of_trees = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.SHINGLE_SIZE:
				this.enterOuterAlt(_localctx, 2);
				{
				{
				this.state = 419;
				this.match(OpenSearchPPLParser.SHINGLE_SIZE);
				this.state = 420;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 421;
				_localctx._shingle_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.SAMPLE_SIZE:
				this.enterOuterAlt(_localctx, 3);
				{
				{
				this.state = 422;
				this.match(OpenSearchPPLParser.SAMPLE_SIZE);
				this.state = 423;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 424;
				_localctx._sample_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.OUTPUT_AFTER:
				this.enterOuterAlt(_localctx, 4);
				{
				{
				this.state = 425;
				this.match(OpenSearchPPLParser.OUTPUT_AFTER);
				this.state = 426;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 427;
				_localctx._output_after = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_DECAY:
				this.enterOuterAlt(_localctx, 5);
				{
				{
				this.state = 428;
				this.match(OpenSearchPPLParser.TIME_DECAY);
				this.state = 429;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 430;
				_localctx._time_decay = this.decimalLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ANOMALY_RATE:
				this.enterOuterAlt(_localctx, 6);
				{
				{
				this.state = 431;
				this.match(OpenSearchPPLParser.ANOMALY_RATE);
				this.state = 432;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 433;
				_localctx._anomaly_rate = this.decimalLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.CATEGORY_FIELD:
				this.enterOuterAlt(_localctx, 7);
				{
				{
				this.state = 434;
				this.match(OpenSearchPPLParser.CATEGORY_FIELD);
				this.state = 435;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 436;
				_localctx._category_field = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_FIELD:
				this.enterOuterAlt(_localctx, 8);
				{
				{
				this.state = 437;
				this.match(OpenSearchPPLParser.TIME_FIELD);
				this.state = 438;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 439;
				_localctx._time_field = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.DATE_FORMAT:
				this.enterOuterAlt(_localctx, 9);
				{
				{
				this.state = 440;
				this.match(OpenSearchPPLParser.DATE_FORMAT);
				this.state = 441;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 442;
				_localctx._date_format = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TIME_ZONE:
				this.enterOuterAlt(_localctx, 10);
				{
				{
				this.state = 443;
				this.match(OpenSearchPPLParser.TIME_ZONE);
				this.state = 444;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 445;
				_localctx._time_zone = this.stringLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.TRAINING_DATA_SIZE:
				this.enterOuterAlt(_localctx, 11);
				{
				{
				this.state = 446;
				this.match(OpenSearchPPLParser.TRAINING_DATA_SIZE);
				this.state = 447;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 448;
				_localctx._training_data_size = this.integerLiteral();
				}
				}
				break;
			case OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD:
				this.enterOuterAlt(_localctx, 12);
				{
				{
				this.state = 449;
				this.match(OpenSearchPPLParser.ANOMALY_SCORE_THRESHOLD);
				this.state = 450;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 451;
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
	public mlCommand(): MlCommandContext {
		let _localctx: MlCommandContext = new MlCommandContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, OpenSearchPPLParser.RULE_mlCommand);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 454;
			this.match(OpenSearchPPLParser.ML);
			this.state = 458;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.D || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & ((1 << (OpenSearchPPLParser.DATETIME - 67)) | (1 << (OpenSearchPPLParser.MICROSECOND - 67)) | (1 << (OpenSearchPPLParser.MILLISECOND - 67)) | (1 << (OpenSearchPPLParser.SECOND - 67)) | (1 << (OpenSearchPPLParser.MINUTE - 67)) | (1 << (OpenSearchPPLParser.HOUR - 67)) | (1 << (OpenSearchPPLParser.DAY - 67)) | (1 << (OpenSearchPPLParser.WEEK - 67)) | (1 << (OpenSearchPPLParser.MONTH - 67)) | (1 << (OpenSearchPPLParser.QUARTER - 67)) | (1 << (OpenSearchPPLParser.YEAR - 67)) | (1 << (OpenSearchPPLParser.CONVERT_TZ - 67)))) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & ((1 << (OpenSearchPPLParser.DOT - 103)) | (1 << (OpenSearchPPLParser.BACKTICK - 103)) | (1 << (OpenSearchPPLParser.AVG - 103)) | (1 << (OpenSearchPPLParser.COUNT - 103)) | (1 << (OpenSearchPPLParser.MAX - 103)))) !== 0) || ((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & ((1 << (OpenSearchPPLParser.MIN - 135)) | (1 << (OpenSearchPPLParser.SUM - 135)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 135)) | (1 << (OpenSearchPPLParser.VAR_POP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 135)) | (1 << (OpenSearchPPLParser.FIRST - 135)) | (1 << (OpenSearchPPLParser.LAST - 135)) | (1 << (OpenSearchPPLParser.ABS - 135)) | (1 << (OpenSearchPPLParser.CEIL - 135)) | (1 << (OpenSearchPPLParser.CEILING - 135)))) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & ((1 << (OpenSearchPPLParser.CONV - 167)) | (1 << (OpenSearchPPLParser.CRC32 - 167)) | (1 << (OpenSearchPPLParser.E - 167)) | (1 << (OpenSearchPPLParser.EXP - 167)) | (1 << (OpenSearchPPLParser.FLOOR - 167)) | (1 << (OpenSearchPPLParser.LN - 167)) | (1 << (OpenSearchPPLParser.LOG - 167)) | (1 << (OpenSearchPPLParser.LOG10 - 167)) | (1 << (OpenSearchPPLParser.LOG2 - 167)) | (1 << (OpenSearchPPLParser.MOD - 167)) | (1 << (OpenSearchPPLParser.PI - 167)) | (1 << (OpenSearchPPLParser.POW - 167)) | (1 << (OpenSearchPPLParser.POWER - 167)) | (1 << (OpenSearchPPLParser.RAND - 167)) | (1 << (OpenSearchPPLParser.ROUND - 167)) | (1 << (OpenSearchPPLParser.SIGN - 167)) | (1 << (OpenSearchPPLParser.SQRT - 167)) | (1 << (OpenSearchPPLParser.TRUNCATE - 167)) | (1 << (OpenSearchPPLParser.ACOS - 167)) | (1 << (OpenSearchPPLParser.ASIN - 167)) | (1 << (OpenSearchPPLParser.ATAN - 167)) | (1 << (OpenSearchPPLParser.ATAN2 - 167)) | (1 << (OpenSearchPPLParser.COS - 167)) | (1 << (OpenSearchPPLParser.COT - 167)) | (1 << (OpenSearchPPLParser.DEGREES - 167)) | (1 << (OpenSearchPPLParser.RADIANS - 167)) | (1 << (OpenSearchPPLParser.SIN - 167)) | (1 << (OpenSearchPPLParser.TAN - 167)) | (1 << (OpenSearchPPLParser.ADDDATE - 167)) | (1 << (OpenSearchPPLParser.CURDATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_DATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_TIME - 167)))) !== 0) || ((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (OpenSearchPPLParser.CURRENT_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.CURTIME - 199)) | (1 << (OpenSearchPPLParser.DATE - 199)) | (1 << (OpenSearchPPLParser.DATE_ADD - 199)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 199)) | (1 << (OpenSearchPPLParser.DATE_SUB - 199)) | (1 << (OpenSearchPPLParser.DAYNAME - 199)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 199)) | (1 << (OpenSearchPPLParser.DAYOFWEEK - 199)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 199)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 199)) | (1 << (OpenSearchPPLParser.LOCALTIME - 199)) | (1 << (OpenSearchPPLParser.LOCALTIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.FROM_UNIXTIME - 199)) | (1 << (OpenSearchPPLParser.MAKEDATE - 199)) | (1 << (OpenSearchPPLParser.MAKETIME - 199)) | (1 << (OpenSearchPPLParser.MONTHNAME - 199)) | (1 << (OpenSearchPPLParser.NOW - 199)) | (1 << (OpenSearchPPLParser.PERIOD_ADD - 199)) | (1 << (OpenSearchPPLParser.PERIOD_DIFF - 199)) | (1 << (OpenSearchPPLParser.SUBDATE - 199)) | (1 << (OpenSearchPPLParser.SYSDATE - 199)) | (1 << (OpenSearchPPLParser.TIME - 199)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 199)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.TO_DAYS - 199)) | (1 << (OpenSearchPPLParser.UTC_DATE - 199)) | (1 << (OpenSearchPPLParser.UTC_TIME - 199)) | (1 << (OpenSearchPPLParser.UTC_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.UNIX_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.SUBSTR - 199)) | (1 << (OpenSearchPPLParser.SUBSTRING - 199)))) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & ((1 << (OpenSearchPPLParser.LTRIM - 231)) | (1 << (OpenSearchPPLParser.RTRIM - 231)) | (1 << (OpenSearchPPLParser.TRIM - 231)) | (1 << (OpenSearchPPLParser.LOWER - 231)) | (1 << (OpenSearchPPLParser.UPPER - 231)) | (1 << (OpenSearchPPLParser.CONCAT - 231)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 231)) | (1 << (OpenSearchPPLParser.LENGTH - 231)) | (1 << (OpenSearchPPLParser.STRCMP - 231)) | (1 << (OpenSearchPPLParser.RIGHT - 231)) | (1 << (OpenSearchPPLParser.LEFT - 231)) | (1 << (OpenSearchPPLParser.ASCII - 231)) | (1 << (OpenSearchPPLParser.LOCATE - 231)) | (1 << (OpenSearchPPLParser.REPLACE - 231)))) !== 0) || ((((_la - 292)) & ~0x1F) === 0 && ((1 << (_la - 292)) & ((1 << (OpenSearchPPLParser.SPAN - 292)) | (1 << (OpenSearchPPLParser.MS - 292)) | (1 << (OpenSearchPPLParser.S - 292)) | (1 << (OpenSearchPPLParser.M - 292)) | (1 << (OpenSearchPPLParser.H - 292)) | (1 << (OpenSearchPPLParser.W - 292)) | (1 << (OpenSearchPPLParser.Q - 292)) | (1 << (OpenSearchPPLParser.Y - 292)) | (1 << (OpenSearchPPLParser.ID - 292)) | (1 << (OpenSearchPPLParser.BQUOTA_STRING - 292)))) !== 0)) {
				{
				{
				this.state = 455;
				this.mlArg();
				}
				}
				this.state = 460;
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
	public mlArg(): MlArgContext {
		let _localctx: MlArgContext = new MlArgContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, OpenSearchPPLParser.RULE_mlArg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 461;
			_localctx._argName = this.ident();
			this.state = 462;
			this.match(OpenSearchPPLParser.EQUAL);
			this.state = 463;
			_localctx._argValue = this.literalValue();
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
	public fromClause(): FromClauseContext {
		let _localctx: FromClauseContext = new FromClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, OpenSearchPPLParser.RULE_fromClause);
		try {
			this.state = 477;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 465;
				this.match(OpenSearchPPLParser.SOURCE);
				this.state = 466;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 467;
				this.tableSourceClause();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 468;
				this.match(OpenSearchPPLParser.INDEX);
				this.state = 469;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 470;
				this.tableSourceClause();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 471;
				this.match(OpenSearchPPLParser.SOURCE);
				this.state = 472;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 473;
				this.tableFunction();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 474;
				this.match(OpenSearchPPLParser.INDEX);
				this.state = 475;
				this.match(OpenSearchPPLParser.EQUAL);
				this.state = 476;
				this.tableFunction();
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
	public tableSourceClause(): TableSourceClauseContext {
		let _localctx: TableSourceClauseContext = new TableSourceClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, OpenSearchPPLParser.RULE_tableSourceClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 479;
			this.tableSource();
			this.state = 484;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 480;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 481;
				this.tableSource();
				}
				}
				this.state = 486;
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
	public renameClasue(): RenameClasueContext {
		let _localctx: RenameClasueContext = new RenameClasueContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, OpenSearchPPLParser.RULE_renameClasue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 487;
			_localctx._orignalField = this.wcFieldExpression();
			this.state = 488;
			this.match(OpenSearchPPLParser.AS);
			this.state = 489;
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
		this.enterRule(_localctx, 62, OpenSearchPPLParser.RULE_byClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 491;
			this.match(OpenSearchPPLParser.BY);
			this.state = 492;
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
		this.enterRule(_localctx, 64, OpenSearchPPLParser.RULE_statsByClause);
		try {
			this.state = 503;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 494;
				this.match(OpenSearchPPLParser.BY);
				this.state = 495;
				this.fieldList();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 496;
				this.match(OpenSearchPPLParser.BY);
				this.state = 497;
				this.bySpanClause();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 498;
				this.match(OpenSearchPPLParser.BY);
				this.state = 499;
				this.bySpanClause();
				this.state = 500;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 501;
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
		this.enterRule(_localctx, 66, OpenSearchPPLParser.RULE_bySpanClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 505;
			this.spanClause();
			this.state = 508;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.AS) {
				{
				this.state = 506;
				this.match(OpenSearchPPLParser.AS);
				this.state = 507;
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
		this.enterRule(_localctx, 68, OpenSearchPPLParser.RULE_spanClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 510;
			this.match(OpenSearchPPLParser.SPAN);
			this.state = 511;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 512;
			this.fieldExpression();
			this.state = 513;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 514;
			_localctx._value = this.literalValue();
			this.state = 516;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.D || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (OpenSearchPPLParser.MILLISECOND - 70)) | (1 << (OpenSearchPPLParser.SECOND - 70)) | (1 << (OpenSearchPPLParser.MINUTE - 70)) | (1 << (OpenSearchPPLParser.HOUR - 70)) | (1 << (OpenSearchPPLParser.DAY - 70)) | (1 << (OpenSearchPPLParser.WEEK - 70)) | (1 << (OpenSearchPPLParser.MONTH - 70)) | (1 << (OpenSearchPPLParser.QUARTER - 70)) | (1 << (OpenSearchPPLParser.YEAR - 70)))) !== 0) || ((((_la - 293)) & ~0x1F) === 0 && ((1 << (_la - 293)) & ((1 << (OpenSearchPPLParser.MS - 293)) | (1 << (OpenSearchPPLParser.S - 293)) | (1 << (OpenSearchPPLParser.M - 293)) | (1 << (OpenSearchPPLParser.H - 293)) | (1 << (OpenSearchPPLParser.W - 293)) | (1 << (OpenSearchPPLParser.Q - 293)) | (1 << (OpenSearchPPLParser.Y - 293)))) !== 0)) {
				{
				this.state = 515;
				_localctx._unit = this.timespanUnit();
				}
			}

			this.state = 518;
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
		this.enterRule(_localctx, 70, OpenSearchPPLParser.RULE_sortbyClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 520;
			this.sortField();
			this.state = 525;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 521;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 522;
				this.sortField();
				}
				}
				this.state = 527;
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
		this.enterRule(_localctx, 72, OpenSearchPPLParser.RULE_evalClause);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 528;
			this.fieldExpression();
			this.state = 529;
			this.match(OpenSearchPPLParser.EQUAL);
			this.state = 530;
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
		this.enterRule(_localctx, 74, OpenSearchPPLParser.RULE_statsAggTerm);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 532;
			this.statsFunction();
			this.state = 535;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.AS) {
				{
				this.state = 533;
				this.match(OpenSearchPPLParser.AS);
				this.state = 534;
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
		this.enterRule(_localctx, 76, OpenSearchPPLParser.RULE_statsFunction);
		let _la: number;
		try {
			this.state = 552;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				_localctx = new StatsFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 537;
				this.statsFunctionName();
				this.state = 538;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 539;
				this.valueExpression(0);
				this.state = 540;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 2:
				_localctx = new CountAllFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 542;
				this.match(OpenSearchPPLParser.COUNT);
				this.state = 543;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 544;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 3:
				_localctx = new DistinctCountFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 545;
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
				this.state = 546;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 547;
				this.valueExpression(0);
				this.state = 548;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;

			case 4:
				_localctx = new PercentileAggFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 550;
				this.percentileAggFunction();
				}
				break;

			case 5:
				_localctx = new TakeAggFunctionCallContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 551;
				this.takeAggFunction();
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
		this.enterRule(_localctx, 78, OpenSearchPPLParser.RULE_statsFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 554;
			_la = this._input.LA(1);
			if (!(((((_la - 127)) & ~0x1F) === 0 && ((1 << (_la - 127)) & ((1 << (OpenSearchPPLParser.AVG - 127)) | (1 << (OpenSearchPPLParser.COUNT - 127)) | (1 << (OpenSearchPPLParser.MAX - 127)) | (1 << (OpenSearchPPLParser.MIN - 127)) | (1 << (OpenSearchPPLParser.SUM - 127)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 127)) | (1 << (OpenSearchPPLParser.VAR_POP - 127)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 127)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 127)))) !== 0))) {
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
	public takeAggFunction(): TakeAggFunctionContext {
		let _localctx: TakeAggFunctionContext = new TakeAggFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, OpenSearchPPLParser.RULE_takeAggFunction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 556;
			this.match(OpenSearchPPLParser.TAKE);
			this.state = 557;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 558;
			this.fieldExpression();
			this.state = 561;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.COMMA) {
				{
				this.state = 559;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 560;
				_localctx._size = this.integerLiteral();
				}
			}

			this.state = 563;
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
	public percentileAggFunction(): PercentileAggFunctionContext {
		let _localctx: PercentileAggFunctionContext = new PercentileAggFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, OpenSearchPPLParser.RULE_percentileAggFunction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 565;
			this.match(OpenSearchPPLParser.PERCENTILE);
			this.state = 566;
			this.match(OpenSearchPPLParser.LESS);
			this.state = 567;
			_localctx._value = this.integerLiteral();
			this.state = 568;
			this.match(OpenSearchPPLParser.GREATER);
			this.state = 569;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 570;
			_localctx._aggField = this.fieldExpression();
			this.state = 571;
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
		this.enterRule(_localctx, 84, OpenSearchPPLParser.RULE_expression);
		try {
			this.state = 576;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 573;
				this.logicalExpression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 574;
				this.comparisonExpression();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 575;
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
		let _startState: number = 86;
		this.enterRecursionRule(_localctx, 86, OpenSearchPPLParser.RULE_logicalExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 584;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				{
				_localctx = new ComparsionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 579;
				this.comparisonExpression();
				}
				break;

			case 2:
				{
				_localctx = new LogicalNotContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 580;
				this.match(OpenSearchPPLParser.NOT);
				this.state = 581;
				this.logicalExpression(6);
				}
				break;

			case 3:
				{
				_localctx = new BooleanExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 582;
				this.booleanExpression();
				}
				break;

			case 4:
				{
				_localctx = new RelevanceExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 583;
				this.relevanceExpression();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 599;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 597;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
					case 1:
						{
						_localctx = new LogicalOrContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalOrContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 586;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 587;
						this.match(OpenSearchPPLParser.OR);
						this.state = 588;
						(_localctx as LogicalOrContext)._right = this.logicalExpression(6);
						}
						break;

					case 2:
						{
						_localctx = new LogicalAndContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalAndContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 589;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 591;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === OpenSearchPPLParser.AND) {
							{
							this.state = 590;
							this.match(OpenSearchPPLParser.AND);
							}
						}

						this.state = 593;
						(_localctx as LogicalAndContext)._right = this.logicalExpression(5);
						}
						break;

					case 3:
						{
						_localctx = new LogicalXorContext(new LogicalExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalXorContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, OpenSearchPPLParser.RULE_logicalExpression);
						this.state = 594;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 595;
						this.match(OpenSearchPPLParser.XOR);
						this.state = 596;
						(_localctx as LogicalXorContext)._right = this.logicalExpression(4);
						}
						break;
					}
					}
				}
				this.state = 601;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
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
		this.enterRule(_localctx, 88, OpenSearchPPLParser.RULE_comparisonExpression);
		try {
			this.state = 610;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				_localctx = new CompareExprContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 602;
				(_localctx as CompareExprContext)._left = this.valueExpression(0);
				this.state = 603;
				this.comparisonOperator();
				this.state = 604;
				(_localctx as CompareExprContext)._right = this.valueExpression(0);
				}
				break;

			case 2:
				_localctx = new InExprContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 606;
				this.valueExpression(0);
				this.state = 607;
				this.match(OpenSearchPPLParser.IN);
				this.state = 608;
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
		let _startState: number = 90;
		this.enterRecursionRule(_localctx, 90, OpenSearchPPLParser.RULE_valueExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 620;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.LT_PRTHS:
				{
				_localctx = new ParentheticBinaryArithmeticContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 613;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 614;
				(_localctx as ParentheticBinaryArithmeticContext)._left = this.valueExpression(0);
				this.state = 615;
				this.binaryOperator();
				this.state = 616;
				(_localctx as ParentheticBinaryArithmeticContext)._right = this.valueExpression(0);
				this.state = 617;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.TRUE:
			case OpenSearchPPLParser.FALSE:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
			case OpenSearchPPLParser.TYPEOF:
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
				this.state = 619;
				this.primaryExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 628;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
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
					this.state = 622;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 623;
					this.binaryOperator();
					this.state = 624;
					(_localctx as BinaryArithmeticContext)._right = this.valueExpression(4);
					}
					}
				}
				this.state = 630;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
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
		this.enterRule(_localctx, 92, OpenSearchPPLParser.RULE_primaryExpression);
		try {
			this.state = 636;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 631;
				this.evalFunctionCall();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 632;
				this.dataTypeFunctionCall();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 633;
				this.fieldExpression();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 634;
				this.literalValue();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 635;
				this.constantFunction();
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
	public constantFunction(): ConstantFunctionContext {
		let _localctx: ConstantFunctionContext = new ConstantFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, OpenSearchPPLParser.RULE_constantFunction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 638;
			this.constantFunctionName();
			this.state = 639;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 641;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 640;
				this.functionArgs();
				}
				break;
			}
			this.state = 643;
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
	public booleanExpression(): BooleanExpressionContext {
		let _localctx: BooleanExpressionContext = new BooleanExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, OpenSearchPPLParser.RULE_booleanExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 645;
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
		this.enterRule(_localctx, 98, OpenSearchPPLParser.RULE_relevanceExpression);
		try {
			this.state = 649;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.MATCH:
			case OpenSearchPPLParser.MATCH_PHRASE:
			case OpenSearchPPLParser.MATCH_PHRASE_PREFIX:
			case OpenSearchPPLParser.MATCH_BOOL_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 647;
				this.singleFieldRelevanceFunction();
				}
				break;
			case OpenSearchPPLParser.SIMPLE_QUERY_STRING:
			case OpenSearchPPLParser.MULTI_MATCH:
			case OpenSearchPPLParser.QUERY_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 648;
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
		this.enterRule(_localctx, 100, OpenSearchPPLParser.RULE_singleFieldRelevanceFunction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 651;
			this.singleFieldRelevanceFunctionName();
			this.state = 652;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 653;
			_localctx._field = this.relevanceField();
			this.state = 654;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 655;
			_localctx._query = this.relevanceQuery();
			this.state = 660;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 656;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 657;
				this.relevanceArg();
				}
				}
				this.state = 662;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 663;
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
		this.enterRule(_localctx, 102, OpenSearchPPLParser.RULE_multiFieldRelevanceFunction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 665;
			this.multiFieldRelevanceFunctionName();
			this.state = 666;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 667;
			this.match(OpenSearchPPLParser.LT_SQR_PRTHS);
			this.state = 668;
			_localctx._field = this.relevanceFieldAndWeight();
			this.state = 673;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 669;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 670;
				_localctx._field = this.relevanceFieldAndWeight();
				}
				}
				this.state = 675;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 676;
			this.match(OpenSearchPPLParser.RT_SQR_PRTHS);
			this.state = 677;
			this.match(OpenSearchPPLParser.COMMA);
			this.state = 678;
			_localctx._query = this.relevanceQuery();
			this.state = 683;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 679;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 680;
				this.relevanceArg();
				}
				}
				this.state = 685;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 686;
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
		this.enterRule(_localctx, 104, OpenSearchPPLParser.RULE_tableSource);
		try {
			this.state = 690;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
				this.state = 688;
				this.qualifiedName();
				}
				break;
			case OpenSearchPPLParser.ID_DATE_SUFFIX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 689;
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
	public tableFunction(): TableFunctionContext {
		let _localctx: TableFunctionContext = new TableFunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, OpenSearchPPLParser.RULE_tableFunction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 692;
			this.qualifiedName();
			this.state = 693;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 694;
			this.functionArgs();
			this.state = 695;
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
	public fieldList(): FieldListContext {
		let _localctx: FieldListContext = new FieldListContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, OpenSearchPPLParser.RULE_fieldList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this.fieldExpression();
			this.state = 702;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 698;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 699;
				this.fieldExpression();
				}
				}
				this.state = 704;
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
		this.enterRule(_localctx, 110, OpenSearchPPLParser.RULE_wcFieldList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 705;
			this.wcFieldExpression();
			this.state = 710;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 706;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 707;
				this.wcFieldExpression();
				}
				}
				this.state = 712;
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
		this.enterRule(_localctx, 112, OpenSearchPPLParser.RULE_sortField);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 714;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 713;
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

			this.state = 716;
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
		this.enterRule(_localctx, 114, OpenSearchPPLParser.RULE_sortFieldExpression);
		try {
			this.state = 739;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
				this.state = 718;
				this.fieldExpression();
				}
				break;
			case OpenSearchPPLParser.AUTO:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 719;
				this.match(OpenSearchPPLParser.AUTO);
				this.state = 720;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 721;
				this.fieldExpression();
				this.state = 722;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.STR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 724;
				this.match(OpenSearchPPLParser.STR);
				this.state = 725;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 726;
				this.fieldExpression();
				this.state = 727;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.IP:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 729;
				this.match(OpenSearchPPLParser.IP);
				this.state = 730;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 731;
				this.fieldExpression();
				this.state = 732;
				this.match(OpenSearchPPLParser.RT_PRTHS);
				}
				break;
			case OpenSearchPPLParser.NUM:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 734;
				this.match(OpenSearchPPLParser.NUM);
				this.state = 735;
				this.match(OpenSearchPPLParser.LT_PRTHS);
				this.state = 736;
				this.fieldExpression();
				this.state = 737;
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
		this.enterRule(_localctx, 116, OpenSearchPPLParser.RULE_fieldExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 741;
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
		this.enterRule(_localctx, 118, OpenSearchPPLParser.RULE_wcFieldExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 743;
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
		this.enterRule(_localctx, 120, OpenSearchPPLParser.RULE_evalFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 745;
			this.evalFunctionName();
			this.state = 746;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 747;
			this.functionArgs();
			this.state = 748;
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
		this.enterRule(_localctx, 122, OpenSearchPPLParser.RULE_dataTypeFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this.match(OpenSearchPPLParser.CAST);
			this.state = 751;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 752;
			this.expression();
			this.state = 753;
			this.match(OpenSearchPPLParser.AS);
			this.state = 754;
			this.convertedDataType();
			this.state = 755;
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
		this.enterRule(_localctx, 124, OpenSearchPPLParser.RULE_booleanFunctionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 757;
			this.conditionFunctionBase();
			this.state = 758;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 759;
			this.functionArgs();
			this.state = 760;
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
		this.enterRule(_localctx, 126, OpenSearchPPLParser.RULE_convertedDataType);
		try {
			this.state = 772;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.DATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 762;
				_localctx._typeName = this.match(OpenSearchPPLParser.DATE);
				}
				break;
			case OpenSearchPPLParser.TIME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 763;
				_localctx._typeName = this.match(OpenSearchPPLParser.TIME);
				}
				break;
			case OpenSearchPPLParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 764;
				_localctx._typeName = this.match(OpenSearchPPLParser.TIMESTAMP);
				}
				break;
			case OpenSearchPPLParser.INT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 765;
				_localctx._typeName = this.match(OpenSearchPPLParser.INT);
				}
				break;
			case OpenSearchPPLParser.INTEGER:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 766;
				_localctx._typeName = this.match(OpenSearchPPLParser.INTEGER);
				}
				break;
			case OpenSearchPPLParser.DOUBLE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 767;
				_localctx._typeName = this.match(OpenSearchPPLParser.DOUBLE);
				}
				break;
			case OpenSearchPPLParser.LONG:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 768;
				_localctx._typeName = this.match(OpenSearchPPLParser.LONG);
				}
				break;
			case OpenSearchPPLParser.FLOAT:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 769;
				_localctx._typeName = this.match(OpenSearchPPLParser.FLOAT);
				}
				break;
			case OpenSearchPPLParser.STRING:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 770;
				_localctx._typeName = this.match(OpenSearchPPLParser.STRING);
				}
				break;
			case OpenSearchPPLParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 771;
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
		this.enterRule(_localctx, 128, OpenSearchPPLParser.RULE_evalFunctionName);
		try {
			this.state = 779;
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
				this.state = 774;
				this.mathematicalFunctionBase();
				}
				break;
			case OpenSearchPPLParser.DATETIME:
			case OpenSearchPPLParser.MICROSECOND:
			case OpenSearchPPLParser.SECOND:
			case OpenSearchPPLParser.MINUTE:
			case OpenSearchPPLParser.HOUR:
			case OpenSearchPPLParser.DAY:
			case OpenSearchPPLParser.WEEK:
			case OpenSearchPPLParser.MONTH:
			case OpenSearchPPLParser.QUARTER:
			case OpenSearchPPLParser.YEAR:
			case OpenSearchPPLParser.CONVERT_TZ:
			case OpenSearchPPLParser.ADDDATE:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 775;
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
				this.state = 776;
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
				this.state = 777;
				this.conditionFunctionBase();
				}
				break;
			case OpenSearchPPLParser.TYPEOF:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 778;
				this.systemFunctionBase();
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
		this.enterRule(_localctx, 130, OpenSearchPPLParser.RULE_functionArgs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 789;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.D || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (OpenSearchPPLParser.TRUE - 64)) | (1 << (OpenSearchPPLParser.FALSE - 64)) | (1 << (OpenSearchPPLParser.DATETIME - 64)) | (1 << (OpenSearchPPLParser.INTERVAL - 64)) | (1 << (OpenSearchPPLParser.MICROSECOND - 64)) | (1 << (OpenSearchPPLParser.MILLISECOND - 64)) | (1 << (OpenSearchPPLParser.SECOND - 64)) | (1 << (OpenSearchPPLParser.MINUTE - 64)) | (1 << (OpenSearchPPLParser.HOUR - 64)) | (1 << (OpenSearchPPLParser.DAY - 64)) | (1 << (OpenSearchPPLParser.WEEK - 64)) | (1 << (OpenSearchPPLParser.MONTH - 64)) | (1 << (OpenSearchPPLParser.QUARTER - 64)) | (1 << (OpenSearchPPLParser.YEAR - 64)) | (1 << (OpenSearchPPLParser.CONVERT_TZ - 64)))) !== 0) || ((((_la - 103)) & ~0x1F) === 0 && ((1 << (_la - 103)) & ((1 << (OpenSearchPPLParser.DOT - 103)) | (1 << (OpenSearchPPLParser.PLUS - 103)) | (1 << (OpenSearchPPLParser.MINUS - 103)) | (1 << (OpenSearchPPLParser.LT_PRTHS - 103)) | (1 << (OpenSearchPPLParser.BACKTICK - 103)) | (1 << (OpenSearchPPLParser.AVG - 103)) | (1 << (OpenSearchPPLParser.COUNT - 103)) | (1 << (OpenSearchPPLParser.MAX - 103)))) !== 0) || ((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & ((1 << (OpenSearchPPLParser.MIN - 135)) | (1 << (OpenSearchPPLParser.SUM - 135)) | (1 << (OpenSearchPPLParser.VAR_SAMP - 135)) | (1 << (OpenSearchPPLParser.VAR_POP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_SAMP - 135)) | (1 << (OpenSearchPPLParser.STDDEV_POP - 135)) | (1 << (OpenSearchPPLParser.FIRST - 135)) | (1 << (OpenSearchPPLParser.LAST - 135)) | (1 << (OpenSearchPPLParser.ABS - 135)) | (1 << (OpenSearchPPLParser.CEIL - 135)) | (1 << (OpenSearchPPLParser.CEILING - 135)))) !== 0) || ((((_la - 167)) & ~0x1F) === 0 && ((1 << (_la - 167)) & ((1 << (OpenSearchPPLParser.CONV - 167)) | (1 << (OpenSearchPPLParser.CRC32 - 167)) | (1 << (OpenSearchPPLParser.E - 167)) | (1 << (OpenSearchPPLParser.EXP - 167)) | (1 << (OpenSearchPPLParser.FLOOR - 167)) | (1 << (OpenSearchPPLParser.LN - 167)) | (1 << (OpenSearchPPLParser.LOG - 167)) | (1 << (OpenSearchPPLParser.LOG10 - 167)) | (1 << (OpenSearchPPLParser.LOG2 - 167)) | (1 << (OpenSearchPPLParser.MOD - 167)) | (1 << (OpenSearchPPLParser.PI - 167)) | (1 << (OpenSearchPPLParser.POW - 167)) | (1 << (OpenSearchPPLParser.POWER - 167)) | (1 << (OpenSearchPPLParser.RAND - 167)) | (1 << (OpenSearchPPLParser.ROUND - 167)) | (1 << (OpenSearchPPLParser.SIGN - 167)) | (1 << (OpenSearchPPLParser.SQRT - 167)) | (1 << (OpenSearchPPLParser.TRUNCATE - 167)) | (1 << (OpenSearchPPLParser.ACOS - 167)) | (1 << (OpenSearchPPLParser.ASIN - 167)) | (1 << (OpenSearchPPLParser.ATAN - 167)) | (1 << (OpenSearchPPLParser.ATAN2 - 167)) | (1 << (OpenSearchPPLParser.COS - 167)) | (1 << (OpenSearchPPLParser.COT - 167)) | (1 << (OpenSearchPPLParser.DEGREES - 167)) | (1 << (OpenSearchPPLParser.RADIANS - 167)) | (1 << (OpenSearchPPLParser.SIN - 167)) | (1 << (OpenSearchPPLParser.TAN - 167)) | (1 << (OpenSearchPPLParser.ADDDATE - 167)) | (1 << (OpenSearchPPLParser.CURDATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_DATE - 167)) | (1 << (OpenSearchPPLParser.CURRENT_TIME - 167)))) !== 0) || ((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & ((1 << (OpenSearchPPLParser.CURRENT_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.CURTIME - 199)) | (1 << (OpenSearchPPLParser.DATE - 199)) | (1 << (OpenSearchPPLParser.DATE_ADD - 199)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 199)) | (1 << (OpenSearchPPLParser.DATE_SUB - 199)) | (1 << (OpenSearchPPLParser.DAYNAME - 199)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 199)) | (1 << (OpenSearchPPLParser.DAYOFWEEK - 199)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 199)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 199)) | (1 << (OpenSearchPPLParser.LOCALTIME - 199)) | (1 << (OpenSearchPPLParser.LOCALTIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.FROM_UNIXTIME - 199)) | (1 << (OpenSearchPPLParser.MAKEDATE - 199)) | (1 << (OpenSearchPPLParser.MAKETIME - 199)) | (1 << (OpenSearchPPLParser.MONTHNAME - 199)) | (1 << (OpenSearchPPLParser.NOW - 199)) | (1 << (OpenSearchPPLParser.PERIOD_ADD - 199)) | (1 << (OpenSearchPPLParser.PERIOD_DIFF - 199)) | (1 << (OpenSearchPPLParser.SUBDATE - 199)) | (1 << (OpenSearchPPLParser.SYSDATE - 199)) | (1 << (OpenSearchPPLParser.TIME - 199)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 199)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.TO_DAYS - 199)) | (1 << (OpenSearchPPLParser.UTC_DATE - 199)) | (1 << (OpenSearchPPLParser.UTC_TIME - 199)) | (1 << (OpenSearchPPLParser.UTC_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.UNIX_TIMESTAMP - 199)) | (1 << (OpenSearchPPLParser.SUBSTR - 199)) | (1 << (OpenSearchPPLParser.SUBSTRING - 199)))) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & ((1 << (OpenSearchPPLParser.LTRIM - 231)) | (1 << (OpenSearchPPLParser.RTRIM - 231)) | (1 << (OpenSearchPPLParser.TRIM - 231)) | (1 << (OpenSearchPPLParser.LOWER - 231)) | (1 << (OpenSearchPPLParser.UPPER - 231)) | (1 << (OpenSearchPPLParser.CONCAT - 231)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 231)) | (1 << (OpenSearchPPLParser.LENGTH - 231)) | (1 << (OpenSearchPPLParser.STRCMP - 231)) | (1 << (OpenSearchPPLParser.RIGHT - 231)) | (1 << (OpenSearchPPLParser.LEFT - 231)) | (1 << (OpenSearchPPLParser.ASCII - 231)) | (1 << (OpenSearchPPLParser.LOCATE - 231)) | (1 << (OpenSearchPPLParser.REPLACE - 231)) | (1 << (OpenSearchPPLParser.CAST - 231)) | (1 << (OpenSearchPPLParser.LIKE - 231)) | (1 << (OpenSearchPPLParser.ISNULL - 231)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 231)) | (1 << (OpenSearchPPLParser.IFNULL - 231)) | (1 << (OpenSearchPPLParser.NULLIF - 231)) | (1 << (OpenSearchPPLParser.IF - 231)) | (1 << (OpenSearchPPLParser.TYPEOF - 231)))) !== 0) || ((((_la - 292)) & ~0x1F) === 0 && ((1 << (_la - 292)) & ((1 << (OpenSearchPPLParser.SPAN - 292)) | (1 << (OpenSearchPPLParser.MS - 292)) | (1 << (OpenSearchPPLParser.S - 292)) | (1 << (OpenSearchPPLParser.M - 292)) | (1 << (OpenSearchPPLParser.H - 292)) | (1 << (OpenSearchPPLParser.W - 292)) | (1 << (OpenSearchPPLParser.Q - 292)) | (1 << (OpenSearchPPLParser.Y - 292)) | (1 << (OpenSearchPPLParser.ID - 292)) | (1 << (OpenSearchPPLParser.INTEGER_LITERAL - 292)) | (1 << (OpenSearchPPLParser.DECIMAL_LITERAL - 292)) | (1 << (OpenSearchPPLParser.DQUOTA_STRING - 292)) | (1 << (OpenSearchPPLParser.SQUOTA_STRING - 292)) | (1 << (OpenSearchPPLParser.BQUOTA_STRING - 292)))) !== 0)) {
				{
				this.state = 781;
				this.functionArg();
				this.state = 786;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === OpenSearchPPLParser.COMMA) {
					{
					{
					this.state = 782;
					this.match(OpenSearchPPLParser.COMMA);
					this.state = 783;
					this.functionArg();
					}
					}
					this.state = 788;
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
		this.enterRule(_localctx, 132, OpenSearchPPLParser.RULE_functionArg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 794;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				{
				this.state = 791;
				this.ident();
				this.state = 792;
				this.match(OpenSearchPPLParser.EQUAL);
				}
				break;
			}
			this.state = 796;
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
		this.enterRule(_localctx, 134, OpenSearchPPLParser.RULE_relevanceArg);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 798;
			this.relevanceArgName();
			this.state = 799;
			this.match(OpenSearchPPLParser.EQUAL);
			this.state = 800;
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
		this.enterRule(_localctx, 136, OpenSearchPPLParser.RULE_relevanceArgName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 802;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.FIELDS || _la === OpenSearchPPLParser.TIME_ZONE || ((((_la - 261)) & ~0x1F) === 0 && ((1 << (_la - 261)) & ((1 << (OpenSearchPPLParser.ALLOW_LEADING_WILDCARD - 261)) | (1 << (OpenSearchPPLParser.ANALYZE_WILDCARD - 261)) | (1 << (OpenSearchPPLParser.ANALYZER - 261)) | (1 << (OpenSearchPPLParser.AUTO_GENERATE_SYNONYMS_PHRASE_QUERY - 261)) | (1 << (OpenSearchPPLParser.BOOST - 261)) | (1 << (OpenSearchPPLParser.CUTOFF_FREQUENCY - 261)) | (1 << (OpenSearchPPLParser.DEFAULT_FIELD - 261)) | (1 << (OpenSearchPPLParser.DEFAULT_OPERATOR - 261)) | (1 << (OpenSearchPPLParser.ENABLE_POSITION_INCREMENTS - 261)) | (1 << (OpenSearchPPLParser.ESCAPE - 261)) | (1 << (OpenSearchPPLParser.FLAGS - 261)) | (1 << (OpenSearchPPLParser.FUZZY_MAX_EXPANSIONS - 261)) | (1 << (OpenSearchPPLParser.FUZZY_PREFIX_LENGTH - 261)) | (1 << (OpenSearchPPLParser.FUZZY_TRANSPOSITIONS - 261)) | (1 << (OpenSearchPPLParser.FUZZY_REWRITE - 261)) | (1 << (OpenSearchPPLParser.FUZZINESS - 261)) | (1 << (OpenSearchPPLParser.LENIENT - 261)) | (1 << (OpenSearchPPLParser.LOW_FREQ_OPERATOR - 261)) | (1 << (OpenSearchPPLParser.MAX_DETERMINIZED_STATES - 261)) | (1 << (OpenSearchPPLParser.MAX_EXPANSIONS - 261)) | (1 << (OpenSearchPPLParser.MINIMUM_SHOULD_MATCH - 261)) | (1 << (OpenSearchPPLParser.OPERATOR - 261)) | (1 << (OpenSearchPPLParser.PHRASE_SLOP - 261)) | (1 << (OpenSearchPPLParser.PREFIX_LENGTH - 261)) | (1 << (OpenSearchPPLParser.QUOTE_ANALYZER - 261)) | (1 << (OpenSearchPPLParser.QUOTE_FIELD_SUFFIX - 261)) | (1 << (OpenSearchPPLParser.REWRITE - 261)) | (1 << (OpenSearchPPLParser.SLOP - 261)) | (1 << (OpenSearchPPLParser.TIE_BREAKER - 261)) | (1 << (OpenSearchPPLParser.TYPE - 261)) | (1 << (OpenSearchPPLParser.ZERO_TERMS_QUERY - 261)))) !== 0))) {
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
		this.enterRule(_localctx, 138, OpenSearchPPLParser.RULE_relevanceFieldAndWeight);
		try {
			this.state = 812;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 65, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 804;
				_localctx._field = this.relevanceField();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 805;
				_localctx._field = this.relevanceField();
				this.state = 806;
				_localctx._weight = this.relevanceFieldWeight();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 808;
				_localctx._field = this.relevanceField();
				this.state = 809;
				this.match(OpenSearchPPLParser.BIT_XOR_OP);
				this.state = 810;
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
		this.enterRule(_localctx, 140, OpenSearchPPLParser.RULE_relevanceFieldWeight);
		try {
			this.state = 816;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 66, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 814;
				this.integerLiteral();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 815;
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
		this.enterRule(_localctx, 142, OpenSearchPPLParser.RULE_relevanceField);
		try {
			this.state = 820;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
				this.state = 818;
				this.qualifiedName();
				}
				break;
			case OpenSearchPPLParser.DQUOTA_STRING:
			case OpenSearchPPLParser.SQUOTA_STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 819;
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
		this.enterRule(_localctx, 144, OpenSearchPPLParser.RULE_relevanceQuery);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 822;
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
		this.enterRule(_localctx, 146, OpenSearchPPLParser.RULE_relevanceArgValue);
		try {
			this.state = 826;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 824;
				this.qualifiedName();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 825;
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
	public mathematicalFunctionBase(): MathematicalFunctionBaseContext {
		let _localctx: MathematicalFunctionBaseContext = new MathematicalFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, OpenSearchPPLParser.RULE_mathematicalFunctionBase);
		try {
			this.state = 850;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.ABS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 828;
				this.match(OpenSearchPPLParser.ABS);
				}
				break;
			case OpenSearchPPLParser.CEIL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 829;
				this.match(OpenSearchPPLParser.CEIL);
				}
				break;
			case OpenSearchPPLParser.CEILING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 830;
				this.match(OpenSearchPPLParser.CEILING);
				}
				break;
			case OpenSearchPPLParser.CONV:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 831;
				this.match(OpenSearchPPLParser.CONV);
				}
				break;
			case OpenSearchPPLParser.CRC32:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 832;
				this.match(OpenSearchPPLParser.CRC32);
				}
				break;
			case OpenSearchPPLParser.E:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 833;
				this.match(OpenSearchPPLParser.E);
				}
				break;
			case OpenSearchPPLParser.EXP:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 834;
				this.match(OpenSearchPPLParser.EXP);
				}
				break;
			case OpenSearchPPLParser.FLOOR:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 835;
				this.match(OpenSearchPPLParser.FLOOR);
				}
				break;
			case OpenSearchPPLParser.LN:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 836;
				this.match(OpenSearchPPLParser.LN);
				}
				break;
			case OpenSearchPPLParser.LOG:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 837;
				this.match(OpenSearchPPLParser.LOG);
				}
				break;
			case OpenSearchPPLParser.LOG10:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 838;
				this.match(OpenSearchPPLParser.LOG10);
				}
				break;
			case OpenSearchPPLParser.LOG2:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 839;
				this.match(OpenSearchPPLParser.LOG2);
				}
				break;
			case OpenSearchPPLParser.MOD:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 840;
				this.match(OpenSearchPPLParser.MOD);
				}
				break;
			case OpenSearchPPLParser.PI:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 841;
				this.match(OpenSearchPPLParser.PI);
				}
				break;
			case OpenSearchPPLParser.POW:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 842;
				this.match(OpenSearchPPLParser.POW);
				}
				break;
			case OpenSearchPPLParser.POWER:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 843;
				this.match(OpenSearchPPLParser.POWER);
				}
				break;
			case OpenSearchPPLParser.RAND:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 844;
				this.match(OpenSearchPPLParser.RAND);
				}
				break;
			case OpenSearchPPLParser.ROUND:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 845;
				this.match(OpenSearchPPLParser.ROUND);
				}
				break;
			case OpenSearchPPLParser.SIGN:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 846;
				this.match(OpenSearchPPLParser.SIGN);
				}
				break;
			case OpenSearchPPLParser.SQRT:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 847;
				this.match(OpenSearchPPLParser.SQRT);
				}
				break;
			case OpenSearchPPLParser.TRUNCATE:
				this.enterOuterAlt(_localctx, 21);
				{
				this.state = 848;
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
				this.state = 849;
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
		this.enterRule(_localctx, 150, OpenSearchPPLParser.RULE_trigonometricFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 852;
			_la = this._input.LA(1);
			if (!(((((_la - 185)) & ~0x1F) === 0 && ((1 << (_la - 185)) & ((1 << (OpenSearchPPLParser.ACOS - 185)) | (1 << (OpenSearchPPLParser.ASIN - 185)) | (1 << (OpenSearchPPLParser.ATAN - 185)) | (1 << (OpenSearchPPLParser.ATAN2 - 185)) | (1 << (OpenSearchPPLParser.COS - 185)) | (1 << (OpenSearchPPLParser.COT - 185)) | (1 << (OpenSearchPPLParser.DEGREES - 185)) | (1 << (OpenSearchPPLParser.RADIANS - 185)) | (1 << (OpenSearchPPLParser.SIN - 185)) | (1 << (OpenSearchPPLParser.TAN - 185)))) !== 0))) {
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
		this.enterRule(_localctx, 152, OpenSearchPPLParser.RULE_dateAndTimeFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 854;
			_la = this._input.LA(1);
			if (!(((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & ((1 << (OpenSearchPPLParser.DATETIME - 67)) | (1 << (OpenSearchPPLParser.MICROSECOND - 67)) | (1 << (OpenSearchPPLParser.SECOND - 67)) | (1 << (OpenSearchPPLParser.MINUTE - 67)) | (1 << (OpenSearchPPLParser.HOUR - 67)) | (1 << (OpenSearchPPLParser.DAY - 67)) | (1 << (OpenSearchPPLParser.WEEK - 67)) | (1 << (OpenSearchPPLParser.MONTH - 67)) | (1 << (OpenSearchPPLParser.QUARTER - 67)) | (1 << (OpenSearchPPLParser.YEAR - 67)) | (1 << (OpenSearchPPLParser.CONVERT_TZ - 67)))) !== 0) || ((((_la - 195)) & ~0x1F) === 0 && ((1 << (_la - 195)) & ((1 << (OpenSearchPPLParser.ADDDATE - 195)) | (1 << (OpenSearchPPLParser.DATE - 195)) | (1 << (OpenSearchPPLParser.DATE_ADD - 195)) | (1 << (OpenSearchPPLParser.DATE_FORMAT - 195)) | (1 << (OpenSearchPPLParser.DATE_SUB - 195)) | (1 << (OpenSearchPPLParser.DAYNAME - 195)) | (1 << (OpenSearchPPLParser.DAYOFMONTH - 195)) | (1 << (OpenSearchPPLParser.DAYOFWEEK - 195)) | (1 << (OpenSearchPPLParser.DAYOFYEAR - 195)) | (1 << (OpenSearchPPLParser.FROM_DAYS - 195)) | (1 << (OpenSearchPPLParser.FROM_UNIXTIME - 195)) | (1 << (OpenSearchPPLParser.MAKEDATE - 195)) | (1 << (OpenSearchPPLParser.MAKETIME - 195)) | (1 << (OpenSearchPPLParser.MONTHNAME - 195)) | (1 << (OpenSearchPPLParser.PERIOD_ADD - 195)) | (1 << (OpenSearchPPLParser.PERIOD_DIFF - 195)) | (1 << (OpenSearchPPLParser.SUBDATE - 195)) | (1 << (OpenSearchPPLParser.SYSDATE - 195)) | (1 << (OpenSearchPPLParser.TIME - 195)) | (1 << (OpenSearchPPLParser.TIME_TO_SEC - 195)) | (1 << (OpenSearchPPLParser.TIMESTAMP - 195)) | (1 << (OpenSearchPPLParser.TO_DAYS - 195)))) !== 0) || _la === OpenSearchPPLParser.UNIX_TIMESTAMP)) {
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
	public constantFunctionName(): ConstantFunctionNameContext {
		let _localctx: ConstantFunctionNameContext = new ConstantFunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, OpenSearchPPLParser.RULE_constantFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 856;
			_la = this._input.LA(1);
			if (!(((((_la - 196)) & ~0x1F) === 0 && ((1 << (_la - 196)) & ((1 << (OpenSearchPPLParser.CURDATE - 196)) | (1 << (OpenSearchPPLParser.CURRENT_DATE - 196)) | (1 << (OpenSearchPPLParser.CURRENT_TIME - 196)) | (1 << (OpenSearchPPLParser.CURRENT_TIMESTAMP - 196)) | (1 << (OpenSearchPPLParser.CURTIME - 196)) | (1 << (OpenSearchPPLParser.LOCALTIME - 196)) | (1 << (OpenSearchPPLParser.LOCALTIMESTAMP - 196)) | (1 << (OpenSearchPPLParser.NOW - 196)) | (1 << (OpenSearchPPLParser.UTC_DATE - 196)) | (1 << (OpenSearchPPLParser.UTC_TIME - 196)) | (1 << (OpenSearchPPLParser.UTC_TIMESTAMP - 196)))) !== 0))) {
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
		this.enterRule(_localctx, 156, OpenSearchPPLParser.RULE_conditionFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 858;
			_la = this._input.LA(1);
			if (!(((((_la - 247)) & ~0x1F) === 0 && ((1 << (_la - 247)) & ((1 << (OpenSearchPPLParser.LIKE - 247)) | (1 << (OpenSearchPPLParser.ISNULL - 247)) | (1 << (OpenSearchPPLParser.ISNOTNULL - 247)) | (1 << (OpenSearchPPLParser.IFNULL - 247)) | (1 << (OpenSearchPPLParser.NULLIF - 247)) | (1 << (OpenSearchPPLParser.IF - 247)))) !== 0))) {
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
	public systemFunctionBase(): SystemFunctionBaseContext {
		let _localctx: SystemFunctionBaseContext = new SystemFunctionBaseContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, OpenSearchPPLParser.RULE_systemFunctionBase);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 860;
			this.match(OpenSearchPPLParser.TYPEOF);
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
		this.enterRule(_localctx, 160, OpenSearchPPLParser.RULE_textFunctionBase);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 862;
			_la = this._input.LA(1);
			if (!(((((_la - 229)) & ~0x1F) === 0 && ((1 << (_la - 229)) & ((1 << (OpenSearchPPLParser.SUBSTR - 229)) | (1 << (OpenSearchPPLParser.SUBSTRING - 229)) | (1 << (OpenSearchPPLParser.LTRIM - 229)) | (1 << (OpenSearchPPLParser.RTRIM - 229)) | (1 << (OpenSearchPPLParser.TRIM - 229)) | (1 << (OpenSearchPPLParser.LOWER - 229)) | (1 << (OpenSearchPPLParser.UPPER - 229)) | (1 << (OpenSearchPPLParser.CONCAT - 229)) | (1 << (OpenSearchPPLParser.CONCAT_WS - 229)) | (1 << (OpenSearchPPLParser.LENGTH - 229)) | (1 << (OpenSearchPPLParser.STRCMP - 229)) | (1 << (OpenSearchPPLParser.RIGHT - 229)) | (1 << (OpenSearchPPLParser.LEFT - 229)) | (1 << (OpenSearchPPLParser.ASCII - 229)) | (1 << (OpenSearchPPLParser.LOCATE - 229)) | (1 << (OpenSearchPPLParser.REPLACE - 229)))) !== 0))) {
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
		this.enterRule(_localctx, 162, OpenSearchPPLParser.RULE_comparisonOperator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 864;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.REGEXP || ((((_la - 104)) & ~0x1F) === 0 && ((1 << (_la - 104)) & ((1 << (OpenSearchPPLParser.EQUAL - 104)) | (1 << (OpenSearchPPLParser.GREATER - 104)) | (1 << (OpenSearchPPLParser.LESS - 104)) | (1 << (OpenSearchPPLParser.NOT_GREATER - 104)) | (1 << (OpenSearchPPLParser.NOT_LESS - 104)) | (1 << (OpenSearchPPLParser.NOT_EQUAL - 104)))) !== 0))) {
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
		this.enterRule(_localctx, 164, OpenSearchPPLParser.RULE_binaryOperator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 866;
			_la = this._input.LA(1);
			if (!(((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & ((1 << (OpenSearchPPLParser.PLUS - 110)) | (1 << (OpenSearchPPLParser.MINUS - 110)) | (1 << (OpenSearchPPLParser.STAR - 110)) | (1 << (OpenSearchPPLParser.DIVIDE - 110)) | (1 << (OpenSearchPPLParser.MODULE - 110)))) !== 0))) {
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
		this.enterRule(_localctx, 166, OpenSearchPPLParser.RULE_singleFieldRelevanceFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 868;
			_la = this._input.LA(1);
			if (!(((((_la - 254)) & ~0x1F) === 0 && ((1 << (_la - 254)) & ((1 << (OpenSearchPPLParser.MATCH - 254)) | (1 << (OpenSearchPPLParser.MATCH_PHRASE - 254)) | (1 << (OpenSearchPPLParser.MATCH_PHRASE_PREFIX - 254)) | (1 << (OpenSearchPPLParser.MATCH_BOOL_PREFIX - 254)))) !== 0))) {
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
		this.enterRule(_localctx, 168, OpenSearchPPLParser.RULE_multiFieldRelevanceFunctionName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 870;
			_la = this._input.LA(1);
			if (!(((((_la - 258)) & ~0x1F) === 0 && ((1 << (_la - 258)) & ((1 << (OpenSearchPPLParser.SIMPLE_QUERY_STRING - 258)) | (1 << (OpenSearchPPLParser.MULTI_MATCH - 258)) | (1 << (OpenSearchPPLParser.QUERY_STRING - 258)))) !== 0))) {
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
	public literalValue(): LiteralValueContext {
		let _localctx: LiteralValueContext = new LiteralValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, OpenSearchPPLParser.RULE_literalValue);
		try {
			this.state = 878;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 70, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 872;
				this.intervalLiteral();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 873;
				this.stringLiteral();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 874;
				this.integerLiteral();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 875;
				this.decimalLiteral();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 876;
				this.booleanLiteral();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 877;
				this.datetimeLiteral();
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
		this.enterRule(_localctx, 172, OpenSearchPPLParser.RULE_intervalLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 880;
			this.match(OpenSearchPPLParser.INTERVAL);
			this.state = 881;
			this.valueExpression(0);
			this.state = 882;
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
		this.enterRule(_localctx, 174, OpenSearchPPLParser.RULE_stringLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 884;
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
		this.enterRule(_localctx, 176, OpenSearchPPLParser.RULE_integerLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 887;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 886;
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

			this.state = 889;
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
		this.enterRule(_localctx, 178, OpenSearchPPLParser.RULE_decimalLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 892;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === OpenSearchPPLParser.PLUS || _la === OpenSearchPPLParser.MINUS) {
				{
				this.state = 891;
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

			this.state = 894;
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
		this.enterRule(_localctx, 180, OpenSearchPPLParser.RULE_booleanLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 896;
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
	public datetimeLiteral(): DatetimeLiteralContext {
		let _localctx: DatetimeLiteralContext = new DatetimeLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, OpenSearchPPLParser.RULE_datetimeLiteral);
		try {
			this.state = 901;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.DATE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 898;
				this.dateLiteral();
				}
				break;
			case OpenSearchPPLParser.TIME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 899;
				this.timeLiteral();
				}
				break;
			case OpenSearchPPLParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 900;
				this.timestampLiteral();
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
	public dateLiteral(): DateLiteralContext {
		let _localctx: DateLiteralContext = new DateLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, OpenSearchPPLParser.RULE_dateLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 903;
			this.match(OpenSearchPPLParser.DATE);
			this.state = 904;
			_localctx._date = this.stringLiteral();
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
	public timeLiteral(): TimeLiteralContext {
		let _localctx: TimeLiteralContext = new TimeLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, OpenSearchPPLParser.RULE_timeLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 906;
			this.match(OpenSearchPPLParser.TIME);
			this.state = 907;
			_localctx._time = this.stringLiteral();
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
	public timestampLiteral(): TimestampLiteralContext {
		let _localctx: TimestampLiteralContext = new TimestampLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, OpenSearchPPLParser.RULE_timestampLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 909;
			this.match(OpenSearchPPLParser.TIMESTAMP);
			this.state = 910;
			_localctx._timestamp = this.stringLiteral();
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
		this.enterRule(_localctx, 190, OpenSearchPPLParser.RULE_intervalUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 912;
			_la = this._input.LA(1);
			if (!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & ((1 << (OpenSearchPPLParser.MICROSECOND - 69)) | (1 << (OpenSearchPPLParser.SECOND - 69)) | (1 << (OpenSearchPPLParser.MINUTE - 69)) | (1 << (OpenSearchPPLParser.HOUR - 69)) | (1 << (OpenSearchPPLParser.DAY - 69)) | (1 << (OpenSearchPPLParser.WEEK - 69)) | (1 << (OpenSearchPPLParser.MONTH - 69)) | (1 << (OpenSearchPPLParser.QUARTER - 69)) | (1 << (OpenSearchPPLParser.YEAR - 69)) | (1 << (OpenSearchPPLParser.SECOND_MICROSECOND - 69)) | (1 << (OpenSearchPPLParser.MINUTE_MICROSECOND - 69)) | (1 << (OpenSearchPPLParser.MINUTE_SECOND - 69)) | (1 << (OpenSearchPPLParser.HOUR_MICROSECOND - 69)) | (1 << (OpenSearchPPLParser.HOUR_SECOND - 69)) | (1 << (OpenSearchPPLParser.HOUR_MINUTE - 69)) | (1 << (OpenSearchPPLParser.DAY_MICROSECOND - 69)) | (1 << (OpenSearchPPLParser.DAY_SECOND - 69)) | (1 << (OpenSearchPPLParser.DAY_MINUTE - 69)) | (1 << (OpenSearchPPLParser.DAY_HOUR - 69)) | (1 << (OpenSearchPPLParser.YEAR_MONTH - 69)))) !== 0))) {
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
		this.enterRule(_localctx, 192, OpenSearchPPLParser.RULE_timespanUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 914;
			_la = this._input.LA(1);
			if (!(_la === OpenSearchPPLParser.D || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (OpenSearchPPLParser.MILLISECOND - 70)) | (1 << (OpenSearchPPLParser.SECOND - 70)) | (1 << (OpenSearchPPLParser.MINUTE - 70)) | (1 << (OpenSearchPPLParser.HOUR - 70)) | (1 << (OpenSearchPPLParser.DAY - 70)) | (1 << (OpenSearchPPLParser.WEEK - 70)) | (1 << (OpenSearchPPLParser.MONTH - 70)) | (1 << (OpenSearchPPLParser.QUARTER - 70)) | (1 << (OpenSearchPPLParser.YEAR - 70)))) !== 0) || ((((_la - 293)) & ~0x1F) === 0 && ((1 << (_la - 293)) & ((1 << (OpenSearchPPLParser.MS - 293)) | (1 << (OpenSearchPPLParser.S - 293)) | (1 << (OpenSearchPPLParser.M - 293)) | (1 << (OpenSearchPPLParser.H - 293)) | (1 << (OpenSearchPPLParser.W - 293)) | (1 << (OpenSearchPPLParser.Q - 293)) | (1 << (OpenSearchPPLParser.Y - 293)))) !== 0))) {
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
		this.enterRule(_localctx, 194, OpenSearchPPLParser.RULE_valueList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 916;
			this.match(OpenSearchPPLParser.LT_PRTHS);
			this.state = 917;
			this.literalValue();
			this.state = 922;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.COMMA) {
				{
				{
				this.state = 918;
				this.match(OpenSearchPPLParser.COMMA);
				this.state = 919;
				this.literalValue();
				}
				}
				this.state = 924;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 925;
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
		this.enterRule(_localctx, 196, OpenSearchPPLParser.RULE_qualifiedName);
		try {
			let _alt: number;
			_localctx = new IdentsAsQualifiedNameContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 927;
			this.ident();
			this.state = 932;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 928;
					this.match(OpenSearchPPLParser.DOT);
					this.state = 929;
					this.ident();
					}
					}
				}
				this.state = 934;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
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
		this.enterRule(_localctx, 198, OpenSearchPPLParser.RULE_wcQualifiedName);
		let _la: number;
		try {
			_localctx = new IdentsAsWildcardQualifiedNameContext(_localctx);
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 935;
			this.wildcard();
			this.state = 940;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === OpenSearchPPLParser.DOT) {
				{
				{
				this.state = 936;
				this.match(OpenSearchPPLParser.DOT);
				this.state = 937;
				this.wildcard();
				}
				}
				this.state = 942;
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
		this.enterRule(_localctx, 200, OpenSearchPPLParser.RULE_ident);
		let _la: number;
		try {
			this.state = 953;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case OpenSearchPPLParser.DOT:
			case OpenSearchPPLParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 944;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.DOT) {
					{
					this.state = 943;
					this.match(OpenSearchPPLParser.DOT);
					}
				}

				this.state = 946;
				this.match(OpenSearchPPLParser.ID);
				}
				break;
			case OpenSearchPPLParser.BACKTICK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 947;
				this.match(OpenSearchPPLParser.BACKTICK);
				this.state = 948;
				this.ident();
				this.state = 949;
				this.match(OpenSearchPPLParser.BACKTICK);
				}
				break;
			case OpenSearchPPLParser.BQUOTA_STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 951;
				this.match(OpenSearchPPLParser.BQUOTA_STRING);
				}
				break;
			case OpenSearchPPLParser.D:
			case OpenSearchPPLParser.DATETIME:
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
			case OpenSearchPPLParser.CONVERT_TZ:
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
			case OpenSearchPPLParser.CURDATE:
			case OpenSearchPPLParser.CURRENT_DATE:
			case OpenSearchPPLParser.CURRENT_TIME:
			case OpenSearchPPLParser.CURRENT_TIMESTAMP:
			case OpenSearchPPLParser.CURTIME:
			case OpenSearchPPLParser.DATE:
			case OpenSearchPPLParser.DATE_ADD:
			case OpenSearchPPLParser.DATE_FORMAT:
			case OpenSearchPPLParser.DATE_SUB:
			case OpenSearchPPLParser.DAYNAME:
			case OpenSearchPPLParser.DAYOFMONTH:
			case OpenSearchPPLParser.DAYOFWEEK:
			case OpenSearchPPLParser.DAYOFYEAR:
			case OpenSearchPPLParser.FROM_DAYS:
			case OpenSearchPPLParser.LOCALTIME:
			case OpenSearchPPLParser.LOCALTIMESTAMP:
			case OpenSearchPPLParser.FROM_UNIXTIME:
			case OpenSearchPPLParser.MAKEDATE:
			case OpenSearchPPLParser.MAKETIME:
			case OpenSearchPPLParser.MONTHNAME:
			case OpenSearchPPLParser.NOW:
			case OpenSearchPPLParser.PERIOD_ADD:
			case OpenSearchPPLParser.PERIOD_DIFF:
			case OpenSearchPPLParser.SUBDATE:
			case OpenSearchPPLParser.SYSDATE:
			case OpenSearchPPLParser.TIME:
			case OpenSearchPPLParser.TIME_TO_SEC:
			case OpenSearchPPLParser.TIMESTAMP:
			case OpenSearchPPLParser.TO_DAYS:
			case OpenSearchPPLParser.UTC_DATE:
			case OpenSearchPPLParser.UTC_TIME:
			case OpenSearchPPLParser.UTC_TIMESTAMP:
			case OpenSearchPPLParser.UNIX_TIMESTAMP:
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
				this.state = 952;
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
		this.enterRule(_localctx, 202, OpenSearchPPLParser.RULE_wildcard);
		let _la: number;
		try {
			let _alt: number;
			this.state = 978;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 955;
				this.ident();
				this.state = 960;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 956;
						this.match(OpenSearchPPLParser.MODULE);
						this.state = 957;
						this.ident();
						}
						}
					}
					this.state = 962;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
				}
				this.state = 964;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === OpenSearchPPLParser.MODULE) {
					{
					this.state = 963;
					this.match(OpenSearchPPLParser.MODULE);
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 966;
				this.match(OpenSearchPPLParser.SINGLE_QUOTE);
				this.state = 967;
				this.wildcard();
				this.state = 968;
				this.match(OpenSearchPPLParser.SINGLE_QUOTE);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 970;
				this.match(OpenSearchPPLParser.DOUBLE_QUOTE);
				this.state = 971;
				this.wildcard();
				this.state = 972;
				this.match(OpenSearchPPLParser.DOUBLE_QUOTE);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 974;
				this.match(OpenSearchPPLParser.BACKTICK);
				this.state = 975;
				this.wildcard();
				this.state = 976;
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
		this.enterRule(_localctx, 204, OpenSearchPPLParser.RULE_keywordsCanBeId);
		try {
			this.state = 993;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 980;
				this.match(OpenSearchPPLParser.D);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 981;
				this.statsFunctionName();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 982;
				this.match(OpenSearchPPLParser.TIMESTAMP);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 983;
				this.match(OpenSearchPPLParser.DATE);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 984;
				this.match(OpenSearchPPLParser.TIME);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 985;
				this.match(OpenSearchPPLParser.FIRST);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 986;
				this.match(OpenSearchPPLParser.LAST);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 987;
				this.timespanUnit();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 988;
				this.match(OpenSearchPPLParser.SPAN);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 989;
				this.constantFunctionName();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 990;
				this.dateAndTimeFunctionBase();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 991;
				this.textFunctionBase();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 992;
				this.mathematicalFunctionBase();
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
		case 43:
			return this.logicalExpression_sempred(_localctx as LogicalExpressionContext, predIndex);

		case 45:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\u0135\u03E6\x04" +
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
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x03" +
		"\x02\x05\x02\xD2\n\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x07\x03" +
		"\xD9\n\x03\f\x03\x0E\x03\xDC\v\x03\x03\x04\x03\x04\x03\x04\x05\x04\xE1" +
		"\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05" +
		"\xF3\n\x05\x03\x06\x05\x06\xF6\n\x06\x03\x06\x03\x06\x05\x06\xFA\n\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0100\n\x06\x03\x06\x03\x06\x03" +
		"\x06\x05\x06\u0105\n\x06\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03" +
		"\t\x03\t\x03\t\x03\n\x03\n\x05\n\u0112\n\n\x03\n\x03\n\x03\v\x03\v\x03" +
		"\v\x03\v\x07\v\u011A\n\v\f\v\x0E\v\u011D\v\v\x03\f\x03\f\x03\f\x03\f\x05" +
		"\f\u0123\n\f\x03\f\x03\f\x03\f\x05\f\u0128\n\f\x03\f\x03\f\x03\f\x05\f" +
		"\u012D\n\f\x03\f\x03\f\x03\f\x07\f\u0132\n\f\f\f\x0E\f\u0135\v\f\x03\f" +
		"\x05\f\u0138\n\f\x03\f\x03\f\x03\f\x05\f\u013D\n\f\x03\r\x03\r\x05\r\u0141" +
		"\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\u0147\n\r\x03\r\x03\r\x03\r\x05\r\u014C" +
		"\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u0155" +
		"\n\x0F\f\x0F\x0E\x0F\u0158\v\x0F\x03\x10\x03\x10\x05\x10\u015C\n\x10\x03" +
		"\x10\x03\x10\x05\x10\u0160\n\x10\x03\x11\x03\x11\x05\x11\u0164\n\x11\x03" +
		"\x11\x03\x11\x05\x11\u0168\n\x11\x03\x12\x03\x12\x03\x12\x05\x12\u016D" +
		"\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x03\x15\x03\x15\x07\x15\u0179\n\x15\f\x15\x0E\x15\u017C\v\x15\x03\x15" +
		"\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u0186" +
		"\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x07\x18\u018C\n\x18\f\x18\x0E\x18" +
		"\u018F\v\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03" +
		"\x19\x03\x19\x05\x19\u019A\n\x19\x03\x1A\x03\x1A\x07\x1A\u019E\n\x1A\f" +
		"\x1A\x0E\x1A\u01A1\v\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01C7\n\x1B\x03\x1C\x03\x1C\x07\x1C\u01CB" +
		"\n\x1C\f\x1C\x0E\x1C\u01CE\v\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E" +
		"\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x05\x1E\u01E0\n\x1E\x03\x1F\x03\x1F\x03\x1F\x07\x1F\u01E5" +
		"\n\x1F\f\x1F\x0E\x1F\u01E8\v\x1F\x03 \x03 \x03 \x03 \x03!\x03!\x03!\x03" +
		"\"\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x03\"\x05\"\u01FA\n\"\x03" +
		"#\x03#\x03#\x05#\u01FF\n#\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u0207\n$" +
		"\x03$\x03$\x03%\x03%\x03%\x07%\u020E\n%\f%\x0E%\u0211\v%\x03&\x03&\x03" +
		"&\x03&\x03\'\x03\'\x03\'\x05\'\u021A\n\'\x03(\x03(\x03(\x03(\x03(\x03" +
		"(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x03(\x05(\u022B\n(\x03)\x03" +
		")\x03*\x03*\x03*\x03*\x03*\x05*\u0234\n*\x03*\x03*\x03+\x03+\x03+\x03" +
		"+\x03+\x03+\x03+\x03+\x03,\x03,\x03,\x05,\u0243\n,\x03-\x03-\x03-\x03" +
		"-\x03-\x03-\x05-\u024B\n-\x03-\x03-\x03-\x03-\x03-\x05-\u0252\n-\x03-" +
		"\x03-\x03-\x03-\x07-\u0258\n-\f-\x0E-\u025B\v-\x03.\x03.\x03.\x03.\x03" +
		".\x03.\x03.\x03.\x05.\u0265\n.\x03/\x03/\x03/\x03/\x03/\x03/\x03/\x03" +
		"/\x05/\u026F\n/\x03/\x03/\x03/\x03/\x07/\u0275\n/\f/\x0E/\u0278\v/\x03" +
		"0\x030\x030\x030\x030\x050\u027F\n0\x031\x031\x031\x051\u0284\n1\x031" +
		"\x031\x032\x032\x033\x033\x053\u028C\n3\x034\x034\x034\x034\x034\x034" +
		"\x034\x074\u0295\n4\f4\x0E4\u0298\v4\x034\x034\x035\x035\x035\x035\x03" +
		"5\x035\x075\u02A2\n5\f5\x0E5\u02A5\v5\x035\x035\x035\x035\x035\x075\u02AC" +
		"\n5\f5\x0E5\u02AF\v5\x035\x035\x036\x036\x056\u02B5\n6\x037\x037\x037" +
		"\x037\x037\x038\x038\x038\x078\u02BF\n8\f8\x0E8\u02C2\v8\x039\x039\x03" +
		"9\x079\u02C7\n9\f9\x0E9\u02CA\v9\x03:\x05:\u02CD\n:\x03:\x03:\x03;\x03" +
		";\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03" +
		";\x03;\x03;\x03;\x03;\x03;\x05;\u02E6\n;\x03<\x03<\x03=\x03=\x03>\x03" +
		">\x03>\x03>\x03>\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03@\x03@\x03@\x03" +
		"@\x03@\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x05A\u0307\n" +
		"A\x03B\x03B\x03B\x03B\x03B\x05B\u030E\nB\x03C\x03C\x03C\x07C\u0313\nC" +
		"\fC\x0EC\u0316\vC\x05C\u0318\nC\x03D\x03D\x03D\x05D\u031D\nD\x03D\x03" +
		"D\x03E\x03E\x03E\x03E\x03F\x03F\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03" +
		"G\x05G\u032F\nG\x03H\x03H\x05H\u0333\nH\x03I\x03I\x05I\u0337\nI\x03J\x03" +
		"J\x03K\x03K\x05K\u033D\nK\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03" +
		"L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x03L\x05" +
		"L\u0355\nL\x03M\x03M\x03N\x03N\x03O\x03O\x03P\x03P\x03Q\x03Q\x03R\x03" +
		"R\x03S\x03S\x03T\x03T\x03U\x03U\x03V\x03V\x03W\x03W\x03W\x03W\x03W\x03" +
		"W\x05W\u0371\nW\x03X\x03X\x03X\x03X\x03Y\x03Y\x03Z\x05Z\u037A\nZ\x03Z" +
		"\x03Z\x03[\x05[\u037F\n[\x03[\x03[\x03\\\x03\\\x03]\x03]\x03]\x05]\u0388" +
		"\n]\x03^\x03^\x03^\x03_\x03_\x03_\x03`\x03`\x03`\x03a\x03a\x03b\x03b\x03" +
		"c\x03c\x03c\x03c\x07c\u039B\nc\fc\x0Ec\u039E\vc\x03c\x03c\x03d\x03d\x03" +
		"d\x07d\u03A5\nd\fd\x0Ed\u03A8\vd\x03e\x03e\x03e\x07e\u03AD\ne\fe\x0Ee" +
		"\u03B0\ve\x03f\x05f\u03B3\nf\x03f\x03f\x03f\x03f\x03f\x03f\x03f\x05f\u03BC" +
		"\nf\x03g\x03g\x03g\x07g\u03C1\ng\fg\x0Eg\u03C4\vg\x03g\x05g\u03C7\ng\x03" +
		"g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x03g\x05g\u03D5\n" +
		"g\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x03h\x05" +
		"h\u03E4\nh\x03h\x02\x02\x04X\\i\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f" +
		"\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E" +
		"\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02" +
		":\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02" +
		"V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02" +
		"r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88" +
		"\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A" +
		"\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\xAC" +
		"\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA\x02\xBC\x02\xBE" +
		"\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC\x02\xCE\x02\x02" +
		"\x14\x03\x02pq\x03\x02\x13\x14\x04\x02\x83\x83\xA5\xA5\x07\x02\x81\x82" +
		"\x86\x86\x89\x89\x8E\x8E\x90\x93\x05\x02\b\b99\u0107\u0125\x03\x02\xBB" +
		"\xC4\v\x02EEGGIP\\\\\xC5\xC5\xCB\xD3\xD6\xD9\xDB\xE2\xE6\xE6\x06\x02\xC6" +
		"\xCA\xD4\xD5\xDA\xDA\xE3\xE5\x03\x02\xF9\xFE\x04\x02\xE7\xEB\xED\xF7\x04" +
		"\x02DDjo\x03\x02pt\x03\x02\u0100\u0103\x03\x02\u0104\u0106\x03\x02\u0132" +
		"\u0133\x03\x02BC\x04\x02GGI[\x05\x02  HP\u0127\u012D\x02\u0430\x02\xD1" +
		"\x03\x02\x02\x02\x04\xD5\x03\x02\x02\x02\x06\xE0\x03\x02\x02\x02\b\xF2" +
		"\x03\x02\x02\x02\n\u0104\x03\x02\x02\x02\f\u0106\x03\x02\x02\x02\x0E\u0109" +
		"\x03\x02\x02\x02\x10\u010C\x03\x02\x02\x02\x12\u010F\x03\x02\x02\x02\x14" +
		"\u0115\x03\x02\x02\x02\x16\u011E\x03\x02\x02\x02\x18\u013E\x03\x02\x02" +
		"\x02\x1A\u014D\x03\x02\x02\x02\x1C\u0150\x03\x02\x02\x02\x1E\u0159\x03" +
		"\x02\x02\x02 \u0161\x03\x02\x02\x02\"\u0169\x03\x02\x02\x02$\u016E\x03" +
		"\x02\x02\x02&\u0172\x03\x02\x02\x02(\u0176\x03\x02\x02\x02*\u0185\x03" +
		"\x02\x02\x02,\u0187\x03\x02\x02\x02.\u0189\x03\x02\x02\x020\u0199\x03" +
		"\x02\x02\x022\u019B\x03\x02\x02\x024\u01C6\x03\x02\x02\x026\u01C8\x03" +
		"\x02\x02\x028\u01CF\x03\x02\x02\x02:\u01DF\x03\x02\x02\x02<\u01E1\x03" +
		"\x02\x02\x02>\u01E9\x03\x02\x02\x02@\u01ED\x03\x02\x02\x02B\u01F9\x03" +
		"\x02\x02\x02D\u01FB\x03\x02\x02\x02F\u0200\x03\x02\x02\x02H\u020A\x03" +
		"\x02\x02\x02J\u0212\x03\x02\x02\x02L\u0216\x03\x02\x02\x02N\u022A\x03" +
		"\x02\x02\x02P\u022C\x03\x02\x02\x02R\u022E\x03\x02\x02\x02T\u0237\x03" +
		"\x02\x02\x02V\u0242\x03\x02\x02\x02X\u024A\x03\x02\x02\x02Z\u0264\x03" +
		"\x02\x02\x02\\\u026E\x03\x02\x02\x02^\u027E\x03\x02\x02\x02`\u0280\x03" +
		"\x02\x02\x02b\u0287\x03\x02\x02\x02d\u028B\x03\x02\x02\x02f\u028D\x03" +
		"\x02\x02\x02h\u029B\x03\x02\x02\x02j\u02B4\x03\x02\x02\x02l\u02B6\x03" +
		"\x02\x02\x02n\u02BB\x03\x02\x02\x02p\u02C3\x03\x02\x02\x02r\u02CC\x03" +
		"\x02\x02\x02t\u02E5\x03\x02\x02\x02v\u02E7\x03\x02\x02\x02x\u02E9\x03" +
		"\x02\x02\x02z\u02EB\x03\x02\x02\x02|\u02F0\x03\x02\x02\x02~\u02F7\x03" +
		"\x02\x02\x02\x80\u0306\x03\x02\x02\x02\x82\u030D\x03\x02\x02\x02\x84\u0317" +
		"\x03\x02\x02\x02\x86\u031C\x03\x02\x02\x02\x88\u0320\x03\x02\x02\x02\x8A" +
		"\u0324\x03\x02\x02\x02\x8C\u032E\x03\x02\x02\x02\x8E\u0332\x03\x02\x02" +
		"\x02\x90\u0336\x03\x02\x02\x02\x92\u0338\x03\x02\x02\x02\x94\u033C\x03" +
		"\x02\x02\x02\x96\u0354\x03\x02\x02\x02\x98\u0356\x03\x02\x02\x02\x9A\u0358" +
		"\x03\x02\x02\x02\x9C\u035A\x03\x02\x02\x02\x9E\u035C\x03\x02\x02\x02\xA0" +
		"\u035E\x03\x02\x02\x02\xA2\u0360\x03\x02\x02\x02\xA4\u0362\x03\x02\x02" +
		"\x02\xA6\u0364\x03\x02\x02\x02\xA8\u0366\x03\x02\x02\x02\xAA\u0368\x03" +
		"\x02\x02\x02\xAC\u0370\x03\x02\x02\x02\xAE\u0372\x03\x02\x02\x02\xB0\u0376" +
		"\x03\x02\x02\x02\xB2\u0379\x03\x02\x02\x02\xB4\u037E\x03\x02\x02\x02\xB6" +
		"\u0382\x03\x02\x02\x02\xB8\u0387\x03\x02\x02\x02\xBA\u0389\x03\x02\x02" +
		"\x02\xBC\u038C\x03\x02\x02\x02\xBE\u038F\x03\x02\x02\x02\xC0\u0392\x03" +
		"\x02\x02\x02\xC2\u0394\x03\x02\x02\x02\xC4\u0396\x03\x02\x02\x02\xC6\u03A1" +
		"\x03\x02\x02\x02\xC8\u03A9\x03\x02\x02\x02\xCA\u03BB\x03\x02\x02\x02\xCC" +
		"\u03D4\x03\x02\x02\x02\xCE\u03E3\x03\x02\x02\x02\xD0\xD2\x05\x04\x03\x02" +
		"\xD1\xD0\x03\x02\x02\x02\xD1\xD2\x03\x02\x02\x02\xD2\xD3\x03\x02\x02\x02" +
		"\xD3\xD4\x07\x02\x02\x03\xD4\x03\x03\x02\x02\x02\xD5\xDA\x05\x06\x04\x02" +
		"\xD6\xD7\x07g\x02\x02\xD7\xD9\x05\b\x05\x02\xD8\xD6\x03\x02\x02\x02\xD9" +
		"\xDC\x03\x02\x02\x02\xDA\xD8\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB" +
		"\x05\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xE1\x05\n\x06\x02\xDE" +
		"\xE1\x05\f\x07\x02\xDF\xE1\x05\x0E\b\x02\xE0\xDD\x03\x02\x02\x02\xE0\xDE" +
		"\x03\x02\x02\x02\xE0\xDF\x03\x02\x02\x02\xE1\x07\x03\x02\x02\x02\xE2\xF3" +
		"\x05\x10\t\x02\xE3\xF3\x05\x12\n\x02\xE4\xF3\x05\x14\v\x02\xE5\xF3\x05" +
		"\x16\f\x02\xE6\xF3\x05\x18\r\x02\xE7\xF3\x05\x1A\x0E\x02\xE8\xF3\x05\x1C" +
		"\x0F\x02\xE9\xF3\x05\x1E\x10\x02\xEA\xF3\x05 \x11\x02\xEB\xF3\x05\"\x12" +
		"\x02\xEC\xF3\x05$\x13\x02\xED\xF3\x05&\x14\x02\xEE\xF3\x05(\x15\x02\xEF" +
		"\xF3\x05.\x18\x02\xF0\xF3\x052\x1A\x02\xF1\xF3\x056\x1C\x02\xF2\xE2\x03" +
		"\x02\x02\x02\xF2\xE3\x03\x02\x02\x02\xF2\xE4\x03\x02\x02\x02\xF2\xE5\x03" +
		"\x02\x02\x02\xF2\xE6\x03\x02\x02\x02\xF2\xE7\x03\x02\x02\x02\xF2\xE8\x03" +
		"\x02\x02\x02\xF2\xE9\x03\x02\x02\x02\xF2\xEA\x03\x02\x02\x02\xF2\xEB\x03" +
		"\x02\x02\x02\xF2\xEC\x03\x02\x02\x02\xF2\xED\x03\x02\x02\x02\xF2\xEE\x03" +
		"\x02\x02\x02\xF2\xEF\x03\x02\x02\x02\xF2\xF0\x03\x02\x02\x02\xF2\xF1\x03" +
		"\x02\x02\x02\xF3\t\x03\x02\x02\x02\xF4\xF6\x07\x03\x02\x02\xF5\xF4\x03" +
		"\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7\u0105" +
		"\x05:\x1E\x02\xF8\xFA\x07\x03\x02\x02\xF9\xF8\x03\x02\x02\x02\xF9\xFA" +
		"\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02\xFB\xFC\x05:\x1E\x02\xFC\xFD" +
		"\x05X-\x02\xFD\u0105\x03\x02\x02\x02\xFE\u0100\x07\x03\x02\x02\xFF\xFE" +
		"\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02" +
		"\u0101\u0102\x05X-\x02\u0102\u0103\x05:\x1E\x02\u0103\u0105\x03\x02\x02" +
		"\x02\u0104\xF5\x03\x02\x02\x02\u0104\xF9\x03\x02\x02\x02\u0104\xFF\x03" +
		"\x02\x02\x02\u0105\v\x03\x02\x02\x02\u0106\u0107\x07\x04\x02\x02\u0107" +
		"\u0108\x05<\x1F\x02\u0108\r\x03\x02\x02\x02\u0109\u010A\x07\x05\x02\x02" +
		"\u010A\u010B\x07\"\x02\x02\u010B\x0F\x03\x02\x02\x02\u010C\u010D\x07\x07" +
		"\x02\x02\u010D\u010E\x05X-\x02\u010E\x11\x03\x02\x02\x02\u010F\u0111\x07" +
		"\b\x02\x02\u0110\u0112\t\x02\x02\x02\u0111\u0110\x03\x02\x02\x02\u0111" +
		"\u0112\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113\u0114\x05n8\x02" +
		"\u0114\x13\x03\x02\x02\x02\u0115\u0116\x07\t\x02\x02\u0116\u011B\x05>" +
		" \x02\u0117\u0118\x07h\x02\x02\u0118\u011A\x05> \x02\u0119\u0117\x03\x02" +
		"\x02\x02\u011A\u011D\x03\x02\x02\x02\u011B\u0119\x03\x02\x02\x02\u011B" +
		"\u011C\x03\x02\x02\x02\u011C\x15\x03\x02\x02\x02\u011D\u011B\x03\x02\x02" +
		"\x02\u011E\u0122\x07\n\x02\x02\u011F\u0120\x07+\x02\x02\u0120\u0121\x07" +
		"j\x02\x02\u0121\u0123\x05\xB2Z\x02\u0122\u011F\x03\x02\x02\x02\u0122\u0123" +
		"\x03\x02\x02\x02\u0123\u0127\x03\x02\x02\x02\u0124\u0125\x07,\x02\x02" +
		"\u0125\u0126\x07j\x02\x02\u0126\u0128\x05\xB6\\\x02\u0127\u0124\x03\x02" +
		"\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128\u012C\x03\x02\x02\x02\u0129" +
		"\u012A\x07-\x02\x02\u012A\u012B\x07j\x02\x02\u012B\u012D\x05\xB0Y\x02" +
		"\u012C\u0129\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02\u012D\u012E\x03" +
		"\x02\x02\x02\u012E\u0133\x05L\'\x02\u012F\u0130\x07h\x02\x02\u0130\u0132" +
		"\x05L\'\x02\u0131\u012F\x03\x02\x02\x02\u0132\u0135\x03\x02\x02\x02\u0133" +
		"\u0131\x03\x02\x02\x02\u0133\u0134\x03\x02\x02\x02\u0134\u0137\x03\x02" +
		"\x02\x02\u0135\u0133\x03\x02\x02\x02\u0136\u0138\x05B\"\x02\u0137\u0136" +
		"\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02\u0138\u013C\x03\x02\x02\x02" +
		"\u0139\u013A\x07*\x02\x02\u013A\u013B\x07j\x02\x02\u013B\u013D\x05\xB6" +
		"\\\x02\u013C\u0139\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\x17" +
		"\x03\x02\x02\x02\u013E\u0140\x07\v\x02\x02\u013F\u0141\x05\xB2Z\x02\u0140" +
		"\u013F\x03\x02\x02\x02\u0140\u0141\x03\x02\x02\x02\u0141\u0142\x03\x02" +
		"\x02\x02\u0142\u0146\x05n8\x02\u0143\u0144\x07(\x02\x02\u0144\u0145\x07" +
		"j\x02\x02\u0145\u0147\x05\xB6\\\x02\u0146\u0143\x03\x02\x02\x02\u0146" +
		"\u0147\x03\x02\x02\x02\u0147\u014B\x03\x02\x02\x02\u0148\u0149\x07)\x02" +
		"\x02\u0149\u014A\x07j\x02\x02\u014A\u014C\x05\xB6\\\x02\u014B\u0148\x03" +
		"\x02\x02\x02\u014B\u014C\x03\x02\x02\x02\u014C\x19\x03\x02\x02\x02\u014D" +
		"\u014E\x07\f\x02\x02\u014E\u014F\x05H%\x02\u014F\x1B\x03\x02\x02\x02\u0150" +
		"\u0151\x07\r\x02\x02\u0151\u0156\x05J&\x02\u0152\u0153\x07h\x02\x02\u0153" +
		"\u0155\x05J&\x02\u0154\u0152\x03\x02\x02\x02\u0155\u0158\x03\x02\x02\x02" +
		"\u0156\u0154\x03\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0157\x1D\x03" +
		"\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0159\u015B\x07\x0E\x02\x02\u015A" +
		"\u015C\x05\xB2Z\x02\u015B\u015A\x03\x02\x02\x02\u015B\u015C\x03\x02\x02" +
		"\x02\u015C\u015F\x03\x02\x02\x02\u015D\u015E\x07\x06\x02\x02\u015E\u0160" +
		"\x05\xB2Z\x02\u015F\u015D\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02" +
		"\u0160\x1F\x03\x02\x02\x02\u0161\u0163\x07\x0F\x02\x02\u0162\u0164\x05" +
		"\xB2Z\x02\u0163\u0162\x03\x02\x02\x02\u0163\u0164\x03\x02\x02\x02\u0164" +
		"\u0165\x03\x02\x02\x02\u0165\u0167\x05n8\x02\u0166\u0168\x05@!\x02\u0167" +
		"\u0166\x03\x02\x02\x02\u0167\u0168\x03\x02\x02\x02\u0168!\x03\x02\x02" +
		"\x02\u0169\u016A\x07\x10\x02\x02\u016A\u016C\x05n8\x02\u016B\u016D\x05" +
		"@!\x02\u016C\u016B\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D#" +
		"\x03\x02\x02\x02\u016E\u016F\x07\x15\x02\x02\u016F\u0170\x05V,\x02\u0170" +
		"\u0171\x05\xB0Y\x02\u0171%\x03\x02\x02\x02\u0172\u0173\x07\x11\x02\x02" +
		"\u0173\u0174\x05V,\x02\u0174\u0175\x05\xB0Y\x02\u0175\'\x03\x02\x02\x02" +
		"\u0176\u017A\x07\x17\x02\x02\u0177\u0179\x05*\x16\x02\u0178\u0177\x03" +
		"\x02\x02\x02\u0179\u017C\x03\x02\x02\x02\u017A\u0178\x03\x02\x02\x02\u017A" +
		"\u017B\x03\x02\x02\x02\u017B\u017D\x03\x02\x02\x02\u017C\u017A\x03\x02" +
		"\x02\x02\u017D\u017E\x05V,\x02\u017E)\x03\x02\x02\x02\u017F\u0180\x07" +
		"\x18\x02\x02\u0180\u0181\x07j\x02\x02\u0181\u0186\x05\xB0Y\x02\u0182\u0183" +
		"\x07\x16\x02\x02\u0183\u0184\x07j\x02\x02\u0184\u0186\x05\xB0Y\x02\u0185" +
		"\u017F\x03\x02\x02\x02\u0185\u0182\x03\x02\x02\x02\u0186+\x03\x02\x02" +
		"\x02\u0187\u0188\t\x03\x02\x02\u0188-\x03\x02\x02\x02\u0189\u018D\x07" +
		"\x19\x02\x02\u018A\u018C\x050\x19\x02\u018B\u018A\x03\x02\x02\x02\u018C" +
		"\u018F\x03\x02\x02\x02\u018D\u018B\x03\x02\x02\x02\u018D\u018E\x03\x02" +
		"\x02\x02\u018E/\x03\x02\x02\x02\u018F\u018D\x03\x02\x02\x02\u0190\u0191" +
		"\x07.\x02\x02\u0191\u0192\x07j\x02\x02\u0192\u019A\x05\xB2Z\x02\u0193" +
		"\u0194\x07/\x02\x02\u0194\u0195\x07j\x02\x02\u0195\u019A\x05\xB2Z\x02" +
		"\u0196\u0197\x070\x02\x02\u0197\u0198\x07j\x02\x02\u0198\u019A\x05\xB0" +
		"Y\x02\u0199\u0190\x03\x02\x02\x02\u0199\u0193\x03\x02\x02\x02\u0199\u0196" +
		"\x03\x02\x02\x02\u019A1\x03\x02\x02\x02\u019B\u019F\x07\x1A\x02\x02\u019C" +
		"\u019E\x054\x1B\x02\u019D\u019C\x03\x02\x02\x02\u019E\u01A1\x03\x02\x02" +
		"\x02\u019F\u019D\x03\x02\x02\x02\u019F\u01A0\x03\x02\x02\x02\u01A03\x03" +
		"\x02\x02\x02\u01A1\u019F\x03\x02\x02\x02\u01A2\u01A3\x071\x02\x02\u01A3" +
		"\u01A4\x07j\x02\x02\u01A4\u01C7\x05\xB2Z\x02\u01A5\u01A6\x072\x02\x02" +
		"\u01A6\u01A7\x07j\x02\x02\u01A7\u01C7\x05\xB2Z\x02\u01A8\u01A9\x073\x02" +
		"\x02\u01A9\u01AA\x07j\x02\x02\u01AA\u01C7\x05\xB2Z\x02\u01AB\u01AC\x07" +
		"4\x02\x02\u01AC\u01AD\x07j\x02\x02\u01AD\u01C7\x05\xB2Z\x02\u01AE\u01AF" +
		"\x075\x02\x02\u01AF\u01B0\x07j\x02\x02\u01B0\u01C7\x05\xB4[\x02\u01B1" +
		"\u01B2\x076\x02\x02\u01B2\u01B3\x07j\x02\x02\u01B3\u01C7\x05\xB4[\x02" +
		"\u01B4\u01B5\x077\x02\x02\u01B5\u01B6\x07j\x02\x02\u01B6\u01C7\x05\xB0" +
		"Y\x02\u01B7\u01B8\x078\x02\x02\u01B8\u01B9\x07j\x02\x02\u01B9\u01C7\x05" +
		"\xB0Y\x02\u01BA\u01BB\x07\xCD\x02\x02\u01BB\u01BC\x07j\x02\x02\u01BC\u01C7" +
		"\x05\xB0Y\x02\u01BD\u01BE\x079\x02\x02\u01BE\u01BF\x07j\x02\x02\u01BF" +
		"\u01C7\x05\xB0Y\x02\u01C0\u01C1\x07:\x02\x02\u01C1\u01C2\x07j\x02\x02" +
		"\u01C2\u01C7\x05\xB2Z\x02\u01C3\u01C4\x07;\x02\x02\u01C4\u01C5\x07j\x02" +
		"\x02\u01C5\u01C7\x05\xB4[\x02\u01C6\u01A2\x03\x02\x02\x02\u01C6\u01A5" +
		"\x03\x02\x02\x02\u01C6\u01A8\x03\x02\x02\x02\u01C6\u01AB\x03\x02\x02\x02" +
		"\u01C6\u01AE\x03\x02\x02\x02\u01C6\u01B1\x03\x02\x02\x02\u01C6\u01B4\x03" +
		"\x02\x02\x02\u01C6\u01B7\x03\x02\x02\x02\u01C6\u01BA\x03\x02\x02\x02\u01C6" +
		"\u01BD\x03\x02\x02\x02\u01C6\u01C0\x03\x02\x02\x02\u01C6\u01C3\x03\x02" +
		"\x02\x02\u01C75\x03\x02\x02\x02\u01C8\u01CC\x07\x1B\x02\x02\u01C9\u01CB" +
		"\x058\x1D\x02\u01CA\u01C9\x03\x02\x02\x02\u01CB\u01CE\x03\x02\x02\x02" +
		"\u01CC\u01CA\x03\x02\x02\x02\u01CC\u01CD\x03\x02\x02\x02\u01CD7\x03\x02" +
		"\x02\x02\u01CE\u01CC\x03\x02\x02\x02\u01CF\u01D0\x05\xCAf\x02\u01D0\u01D1" +
		"\x07j\x02\x02\u01D1\u01D2\x05\xACW\x02\u01D29\x03\x02\x02\x02\u01D3\u01D4" +
		"\x07\x1E\x02\x02\u01D4\u01D5\x07j\x02\x02\u01D5\u01E0\x05<\x1F\x02\u01D6" +
		"\u01D7\x07\x1F\x02\x02\u01D7\u01D8\x07j\x02\x02\u01D8\u01E0";
	private static readonly _serializedATNSegment1: string =
		"\x05<\x1F\x02\u01D9\u01DA\x07\x1E\x02\x02\u01DA\u01DB\x07j\x02\x02\u01DB" +
		"\u01E0\x05l7\x02\u01DC\u01DD\x07\x1F\x02\x02\u01DD\u01DE\x07j\x02\x02" +
		"\u01DE\u01E0\x05l7\x02\u01DF\u01D3\x03\x02\x02\x02\u01DF\u01D6\x03\x02" +
		"\x02\x02\u01DF\u01D9\x03\x02\x02\x02\u01DF\u01DC\x03\x02\x02\x02\u01E0" +
		";\x03\x02\x02\x02\u01E1\u01E6\x05j6\x02\u01E2\u01E3\x07h\x02\x02\u01E3" +
		"\u01E5\x05j6\x02\u01E4\u01E2\x03\x02\x02\x02\u01E5\u01E8\x03\x02\x02\x02" +
		"\u01E6\u01E4\x03\x02\x02\x02\u01E6\u01E7\x03\x02\x02\x02\u01E7=\x03\x02" +
		"\x02\x02\u01E8\u01E6\x03\x02\x02\x02\u01E9\u01EA\x05x=\x02\u01EA\u01EB" +
		"\x07\x1C\x02\x02\u01EB\u01EC\x05x=\x02\u01EC?\x03\x02\x02\x02\u01ED\u01EE" +
		"\x07\x1D\x02\x02\u01EE\u01EF\x05n8\x02\u01EFA\x03\x02\x02\x02\u01F0\u01F1" +
		"\x07\x1D\x02\x02\u01F1\u01FA\x05n8\x02\u01F2\u01F3\x07\x1D\x02\x02\u01F3" +
		"\u01FA\x05D#\x02\u01F4\u01F5\x07\x1D\x02\x02\u01F5\u01F6\x05D#\x02\u01F6" +
		"\u01F7\x07h\x02\x02\u01F7\u01F8\x05n8\x02\u01F8\u01FA\x03\x02\x02\x02" +
		"\u01F9\u01F0\x03\x02\x02\x02\u01F9\u01F2\x03\x02\x02\x02\u01F9\u01F4\x03" +
		"\x02\x02\x02\u01FAC\x03\x02\x02\x02\u01FB\u01FE\x05F$\x02\u01FC\u01FD" +
		"\x07\x1C\x02\x02\u01FD\u01FF\x05\xC6d\x02\u01FE\u01FC\x03\x02\x02\x02" +
		"\u01FE\u01FF\x03\x02\x02\x02\u01FFE\x03\x02\x02\x02\u0200\u0201\x07\u0126" +
		"\x02\x02\u0201\u0202\x07w\x02\x02\u0202\u0203\x05v<\x02\u0203\u0204\x07" +
		"h\x02\x02\u0204\u0206\x05\xACW\x02\u0205\u0207\x05\xC2b\x02\u0206\u0205" +
		"\x03\x02\x02\x02\u0206\u0207\x03\x02\x02\x02\u0207\u0208\x03\x02\x02\x02" +
		"\u0208\u0209\x07x\x02\x02\u0209G\x03\x02\x02\x02\u020A\u020F\x05r:\x02" +
		"\u020B\u020C\x07h\x02\x02\u020C\u020E\x05r:\x02\u020D\u020B\x03\x02\x02" +
		"\x02\u020E\u0211\x03\x02\x02\x02\u020F\u020D\x03\x02\x02\x02\u020F\u0210" +
		"\x03\x02\x02\x02\u0210I\x03\x02\x02\x02\u0211\u020F\x03\x02\x02\x02\u0212" +
		"\u0213\x05v<\x02\u0213\u0214\x07j\x02\x02\u0214\u0215\x05V,\x02\u0215" +
		"K\x03\x02\x02\x02\u0216\u0219\x05N(\x02\u0217\u0218\x07\x1C\x02\x02\u0218" +
		"\u021A\x05x=\x02\u0219\u0217\x03\x02\x02\x02\u0219\u021A\x03\x02\x02\x02" +
		"\u021AM\x03\x02\x02\x02\u021B\u021C\x05P)\x02\u021C\u021D\x07w\x02\x02" +
		"\u021D\u021E\x05\\/\x02\u021E\u021F\x07x\x02\x02\u021F\u022B\x03\x02\x02" +
		"\x02\u0220\u0221\x07\x82\x02\x02\u0221\u0222\x07w\x02\x02\u0222\u022B" +
		"\x07x\x02\x02\u0223\u0224\t\x04\x02\x02\u0224\u0225\x07w\x02\x02\u0225" +
		"\u0226\x05\\/\x02\u0226\u0227\x07x\x02\x02\u0227\u022B\x03\x02\x02\x02" +
		"\u0228\u022B\x05T+\x02\u0229\u022B\x05R*\x02\u022A\u021B\x03\x02\x02\x02" +
		"\u022A\u0220\x03\x02\x02\x02\u022A\u0223\x03\x02\x02\x02\u022A\u0228\x03" +
		"\x02\x02\x02\u022A\u0229\x03\x02\x02\x02\u022BO\x03\x02\x02\x02\u022C" +
		"\u022D\t\x05\x02\x02\u022DQ\x03\x02\x02\x02\u022E\u022F\x07\x95\x02\x02" +
		"\u022F\u0230\x07w\x02\x02\u0230\u0233\x05v<\x02\u0231\u0232\x07h\x02\x02" +
		"\u0232\u0234\x05\xB2Z\x02\u0233\u0231\x03\x02\x02\x02\u0233\u0234\x03" +
		"\x02\x02\x02\u0234\u0235\x03\x02\x02\x02\u0235\u0236\x07x\x02\x02\u0236" +
		"S\x03\x02\x02\x02\u0237\u0238\x07\x94\x02\x02\u0238\u0239\x07l\x02\x02" +
		"\u0239\u023A\x05\xB2Z\x02\u023A\u023B\x07k\x02\x02\u023B\u023C\x07w\x02" +
		"\x02\u023C\u023D\x05v<\x02\u023D\u023E\x07x\x02\x02\u023EU\x03\x02\x02" +
		"\x02\u023F\u0243\x05X-\x02\u0240\u0243\x05Z.\x02\u0241\u0243\x05\\/\x02" +
		"\u0242\u023F\x03\x02\x02\x02\u0242\u0240\x03\x02\x02\x02\u0242\u0241\x03" +
		"\x02\x02\x02\u0243W\x03\x02\x02\x02\u0244\u0245\b-\x01\x02\u0245\u024B" +
		"\x05Z.\x02\u0246\u0247\x07>\x02\x02\u0247\u024B\x05X-\b\u0248\u024B\x05" +
		"b2\x02\u0249\u024B\x05d3\x02\u024A\u0244\x03\x02\x02\x02\u024A\u0246\x03" +
		"\x02\x02\x02\u024A\u0248\x03\x02\x02\x02\u024A\u0249\x03\x02\x02\x02\u024B" +
		"\u0259\x03\x02\x02\x02\u024C\u024D\f\x07\x02\x02\u024D\u024E\x07?\x02" +
		"\x02\u024E\u0258\x05X-\b\u024F\u0251\f\x06\x02\x02\u0250\u0252\x07@\x02" +
		"\x02\u0251\u0250\x03\x02\x02\x02\u0251\u0252\x03\x02\x02\x02\u0252\u0253" +
		"\x03\x02\x02\x02\u0253\u0258\x05X-\x07\u0254\u0255\f\x05\x02\x02\u0255" +
		"\u0256\x07A\x02\x02\u0256\u0258\x05X-\x06\u0257\u024C\x03\x02\x02\x02" +
		"\u0257\u024F\x03\x02\x02\x02\u0257\u0254\x03\x02\x02\x02\u0258\u025B\x03" +
		"\x02\x02\x02\u0259\u0257\x03\x02\x02\x02\u0259\u025A\x03\x02\x02\x02\u025A" +
		"Y\x03\x02\x02\x02\u025B\u0259\x03\x02\x02\x02\u025C\u025D\x05\\/\x02\u025D" +
		"\u025E\x05\xA4S\x02\u025E\u025F\x05\\/\x02\u025F\u0265\x03\x02\x02\x02" +
		"\u0260\u0261\x05\\/\x02\u0261\u0262\x07=\x02\x02\u0262\u0263\x05\xC4c" +
		"\x02\u0263\u0265\x03\x02\x02\x02\u0264\u025C\x03\x02\x02\x02\u0264\u0260" +
		"\x03\x02\x02\x02\u0265[\x03\x02\x02\x02\u0266\u0267\b/\x01\x02\u0267\u0268" +
		"\x07w\x02\x02\u0268\u0269\x05\\/\x02\u0269\u026A\x05\xA6T\x02\u026A\u026B" +
		"\x05\\/\x02\u026B\u026C\x07x\x02\x02\u026C\u026F\x03\x02\x02\x02\u026D" +
		"\u026F\x05^0\x02\u026E\u0266\x03\x02\x02\x02\u026E\u026D\x03\x02\x02\x02" +
		"\u026F\u0276\x03\x02\x02\x02\u0270\u0271\f\x05\x02\x02\u0271\u0272\x05" +
		"\xA6T\x02\u0272\u0273\x05\\/\x06\u0273\u0275\x03\x02\x02\x02\u0274\u0270" +
		"\x03\x02\x02\x02\u0275\u0278\x03\x02\x02\x02\u0276\u0274\x03\x02\x02\x02" +
		"\u0276\u0277\x03\x02\x02\x02\u0277]\x03\x02\x02\x02\u0278\u0276\x03\x02" +
		"\x02\x02\u0279\u027F\x05z>\x02\u027A\u027F\x05|?\x02\u027B\u027F\x05v" +
		"<\x02\u027C\u027F\x05\xACW\x02\u027D\u027F\x05`1\x02\u027E\u0279\x03\x02" +
		"\x02\x02\u027E\u027A\x03\x02\x02\x02\u027E\u027B\x03\x02\x02\x02\u027E" +
		"\u027C\x03\x02\x02\x02\u027E\u027D\x03\x02\x02\x02\u027F_\x03\x02\x02" +
		"\x02\u0280\u0281\x05\x9CO\x02\u0281\u0283\x07w\x02\x02\u0282\u0284\x05" +
		"\x84C\x02\u0283\u0282\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02\u0284" +
		"\u0285\x03\x02\x02\x02\u0285\u0286\x07x\x02\x02\u0286a\x03\x02\x02\x02" +
		"\u0287\u0288\x05~@\x02\u0288c\x03\x02\x02\x02\u0289\u028C\x05f4\x02\u028A" +
		"\u028C\x05h5\x02\u028B\u0289\x03\x02\x02\x02\u028B\u028A\x03\x02\x02\x02" +
		"\u028Ce\x03\x02\x02\x02\u028D\u028E\x05\xA8U\x02\u028E\u028F\x07w\x02" +
		"\x02\u028F\u0290\x05\x90I\x02\u0290\u0291\x07h\x02\x02\u0291\u0296\x05" +
		"\x92J\x02\u0292\u0293\x07h\x02\x02\u0293\u0295\x05\x88E\x02\u0294\u0292" +
		"\x03\x02\x02\x02\u0295\u0298\x03\x02\x02\x02\u0296\u0294\x03\x02\x02\x02" +
		"\u0296\u0297\x03\x02\x02\x02\u0297\u0299\x03\x02\x02\x02\u0298\u0296\x03" +
		"\x02\x02\x02\u0299\u029A\x07x\x02\x02\u029Ag\x03\x02\x02\x02\u029B\u029C" +
		"\x05\xAAV\x02\u029C\u029D\x07w\x02\x02\u029D\u029E\x07y\x02\x02\u029E" +
		"\u02A3\x05\x8CG\x02\u029F\u02A0\x07h\x02\x02\u02A0\u02A2\x05\x8CG\x02" +
		"\u02A1\u029F\x03\x02\x02\x02\u02A2\u02A5\x03\x02\x02\x02\u02A3\u02A1\x03" +
		"\x02\x02\x02\u02A3\u02A4\x03\x02\x02\x02\u02A4\u02A6\x03\x02\x02\x02\u02A5" +
		"\u02A3\x03\x02\x02\x02\u02A6\u02A7\x07z\x02\x02\u02A7\u02A8\x07h\x02\x02" +
		"\u02A8\u02AD\x05\x92J\x02\u02A9\u02AA\x07h\x02\x02\u02AA\u02AC\x05\x88" +
		"E\x02\u02AB\u02A9\x03\x02\x02\x02\u02AC\u02AF\x03\x02\x02\x02\u02AD\u02AB" +
		"\x03\x02\x02\x02\u02AD\u02AE\x03\x02\x02\x02\u02AE\u02B0\x03\x02\x02\x02" +
		"\u02AF\u02AD\x03\x02\x02\x02\u02B0\u02B1\x07x\x02\x02\u02B1i\x03\x02\x02" +
		"\x02\u02B2\u02B5\x05\xC6d\x02\u02B3\u02B5\x07\u0131\x02\x02\u02B4\u02B2" +
		"\x03\x02\x02\x02\u02B4\u02B3\x03\x02\x02\x02\u02B5k\x03\x02\x02\x02\u02B6" +
		"\u02B7\x05\xC6d\x02\u02B7\u02B8\x07w\x02\x02\u02B8\u02B9\x05\x84C\x02" +
		"\u02B9\u02BA\x07x\x02\x02\u02BAm\x03\x02\x02\x02\u02BB\u02C0\x05v<\x02" +
		"\u02BC\u02BD\x07h\x02\x02\u02BD\u02BF\x05v<\x02\u02BE\u02BC\x03\x02\x02" +
		"\x02\u02BF\u02C2\x03\x02\x02\x02\u02C0\u02BE\x03\x02\x02\x02\u02C0\u02C1" +
		"\x03\x02\x02\x02\u02C1o\x03\x02\x02\x02\u02C2\u02C0\x03\x02\x02\x02\u02C3" +
		"\u02C8\x05x=\x02\u02C4\u02C5\x07h\x02\x02\u02C5\u02C7\x05x=\x02\u02C6" +
		"\u02C4\x03\x02\x02\x02\u02C7\u02CA\x03\x02\x02\x02\u02C8\u02C6\x03\x02" +
		"\x02\x02\u02C8\u02C9\x03\x02\x02\x02\u02C9q\x03\x02\x02\x02\u02CA\u02C8" +
		"\x03\x02\x02\x02\u02CB\u02CD\t\x02\x02\x02\u02CC\u02CB\x03\x02\x02\x02" +
		"\u02CC\u02CD\x03\x02\x02\x02\u02CD\u02CE\x03\x02\x02\x02\u02CE\u02CF\x05" +
		"t;\x02\u02CFs\x03\x02\x02\x02\u02D0\u02E6\x05v<\x02\u02D1\u02D2\x07$\x02" +
		"\x02\u02D2\u02D3\x07w\x02\x02\u02D3\u02D4\x05v<\x02\u02D4\u02D5\x07x\x02" +
		"\x02\u02D5\u02E6\x03\x02\x02\x02\u02D6\u02D7\x07%\x02\x02\u02D7\u02D8" +
		"\x07w\x02\x02\u02D8\u02D9\x05v<\x02\u02D9\u02DA\x07x\x02\x02\u02DA\u02E6" +
		"\x03\x02\x02\x02\u02DB\u02DC\x07&\x02\x02\u02DC\u02DD\x07w\x02\x02\u02DD" +
		"\u02DE\x05v<\x02\u02DE\u02DF\x07x\x02\x02\u02DF\u02E6\x03\x02\x02\x02" +
		"\u02E0\u02E1\x07\'\x02\x02\u02E1\u02E2\x07w\x02\x02\u02E2\u02E3\x05v<" +
		"\x02\u02E3\u02E4\x07x\x02\x02\u02E4\u02E6\x03\x02\x02\x02\u02E5\u02D0" +
		"\x03\x02\x02\x02\u02E5\u02D1\x03\x02\x02\x02\u02E5\u02D6\x03\x02\x02\x02" +
		"\u02E5\u02DB\x03\x02\x02\x02\u02E5\u02E0\x03\x02\x02\x02\u02E6u\x03\x02" +
		"\x02\x02\u02E7\u02E8\x05\xC6d\x02\u02E8w\x03\x02\x02\x02\u02E9\u02EA\x05" +
		"\xC8e\x02\u02EAy\x03\x02\x02\x02\u02EB\u02EC\x05\x82B\x02\u02EC\u02ED" +
		"\x07w\x02\x02\u02ED\u02EE\x05\x84C\x02\u02EE\u02EF\x07x\x02\x02\u02EF" +
		"{\x03\x02\x02\x02\u02F0\u02F1\x07\xF8\x02\x02\u02F1\u02F2\x07w\x02\x02" +
		"\u02F2\u02F3\x05V,\x02\u02F3\u02F4\x07\x1C\x02\x02\u02F4\u02F5\x05\x80" +
		"A\x02\u02F5\u02F6\x07x\x02\x02\u02F6}\x03\x02\x02\x02\u02F7\u02F8\x05" +
		"\x9EP\x02\u02F8\u02F9\x07w\x02\x02\u02F9\u02FA\x05\x84C\x02\u02FA\u02FB" +
		"\x07x\x02\x02\u02FB\x7F\x03\x02\x02\x02\u02FC\u0307\x07\xCB\x02\x02\u02FD" +
		"\u0307\x07\xDF\x02\x02\u02FE\u0307\x07\xE1\x02\x02\u02FF\u0307\x07`\x02" +
		"\x02\u0300\u0307\x07a\x02\x02\u0301\u0307\x07b\x02\x02\u0302\u0307\x07" +
		"c\x02\x02\u0303\u0307\x07d\x02\x02\u0304\u0307\x07e\x02\x02\u0305\u0307" +
		"\x07f\x02\x02\u0306\u02FC\x03\x02\x02\x02\u0306\u02FD\x03\x02\x02\x02" +
		"\u0306\u02FE\x03\x02\x02\x02\u0306\u02FF\x03\x02\x02\x02\u0306\u0300\x03" +
		"\x02\x02\x02\u0306\u0301\x03\x02\x02\x02\u0306\u0302\x03\x02\x02\x02\u0306" +
		"\u0303\x03\x02\x02\x02\u0306\u0304\x03\x02\x02\x02\u0306\u0305\x03\x02" +
		"\x02\x02\u0307\x81\x03\x02\x02\x02\u0308\u030E\x05\x96L\x02\u0309\u030E" +
		"\x05\x9AN\x02\u030A\u030E\x05\xA2R\x02\u030B\u030E\x05\x9EP\x02\u030C" +
		"\u030E\x05\xA0Q\x02\u030D\u0308\x03\x02\x02\x02\u030D\u0309\x03\x02\x02" +
		"\x02\u030D\u030A\x03\x02\x02\x02\u030D\u030B\x03\x02\x02\x02\u030D\u030C" +
		"\x03\x02\x02\x02\u030E\x83\x03\x02\x02\x02\u030F\u0314\x05\x86D\x02\u0310" +
		"\u0311\x07h\x02\x02\u0311\u0313\x05\x86D\x02\u0312\u0310\x03\x02\x02\x02" +
		"\u0313\u0316\x03\x02\x02\x02\u0314\u0312\x03\x02\x02\x02\u0314\u0315\x03" +
		"\x02\x02\x02\u0315\u0318\x03\x02\x02\x02\u0316\u0314\x03\x02\x02\x02\u0317" +
		"\u030F\x03\x02\x02\x02\u0317\u0318\x03\x02\x02\x02\u0318\x85\x03\x02\x02" +
		"\x02\u0319\u031A\x05\xCAf\x02\u031A\u031B\x07j\x02\x02\u031B\u031D\x03" +
		"\x02\x02\x02\u031C\u0319\x03\x02\x02\x02\u031C\u031D\x03\x02\x02\x02\u031D" +
		"\u031E\x03\x02\x02\x02\u031E\u031F\x05\\/\x02\u031F\x87\x03\x02\x02\x02" +
		"\u0320\u0321\x05\x8AF\x02\u0321\u0322\x07j\x02\x02\u0322\u0323\x05\x94" +
		"K\x02\u0323\x89\x03\x02\x02\x02\u0324\u0325\t\x06\x02\x02\u0325\x8B\x03" +
		"\x02\x02\x02\u0326\u032F\x05\x90I\x02\u0327\u0328\x05\x90I\x02\u0328\u0329" +
		"\x05\x8EH\x02\u0329\u032F\x03\x02\x02\x02\u032A\u032B\x05\x90I\x02\u032B" +
		"\u032C\x07\x80\x02\x02\u032C\u032D\x05\x8EH\x02\u032D\u032F\x03\x02\x02" +
		"\x02\u032E\u0326\x03\x02\x02\x02\u032E\u0327\x03\x02\x02\x02\u032E\u032A" +
		"\x03\x02\x02\x02\u032F\x8D\x03\x02\x02\x02\u0330\u0333\x05\xB2Z\x02\u0331" +
		"\u0333\x05\xB4[\x02\u0332\u0330\x03\x02\x02\x02\u0332\u0331\x03\x02\x02" +
		"\x02\u0333\x8F\x03\x02\x02\x02\u0334\u0337\x05\xC6d\x02\u0335\u0337\x05" +
		"\xB0Y\x02\u0336\u0334\x03\x02\x02\x02\u0336\u0335\x03\x02\x02\x02\u0337" +
		"\x91\x03\x02\x02\x02\u0338\u0339\x05\x94K\x02\u0339\x93\x03\x02\x02\x02" +
		"\u033A\u033D\x05\xC6d\x02\u033B\u033D\x05\xACW\x02\u033C\u033A\x03\x02" +
		"\x02\x02\u033C\u033B\x03\x02\x02\x02\u033D\x95\x03\x02\x02\x02\u033E\u0355" +
		"\x07\xA6\x02\x02\u033F\u0355\x07\xA7\x02\x02\u0340\u0355\x07\xA8\x02\x02" +
		"\u0341\u0355\x07\xA9\x02\x02\u0342\u0355\x07\xAA\x02\x02\u0343\u0355\x07" +
		"\xAB\x02\x02\u0344\u0355\x07\xAC\x02\x02\u0345\u0355\x07\xAD\x02\x02\u0346" +
		"\u0355\x07\xAE\x02\x02\u0347\u0355\x07\xAF\x02\x02\u0348\u0355\x07\xB0" +
		"\x02\x02\u0349\u0355\x07\xB1\x02\x02\u034A\u0355\x07\xB2\x02\x02\u034B" +
		"\u0355\x07\xB3\x02\x02\u034C\u0355\x07\xB4\x02\x02\u034D\u0355\x07\xB5" +
		"\x02\x02\u034E\u0355\x07\xB6\x02\x02\u034F\u0355\x07\xB7\x02\x02\u0350" +
		"\u0355\x07\xB8\x02\x02\u0351\u0355\x07\xB9\x02\x02\u0352\u0355\x07\xBA" +
		"\x02\x02\u0353\u0355\x05\x98M\x02\u0354\u033E\x03\x02\x02\x02\u0354\u033F" +
		"\x03\x02\x02\x02\u0354\u0340\x03\x02\x02\x02\u0354\u0341\x03\x02\x02\x02" +
		"\u0354\u0342\x03\x02\x02\x02\u0354\u0343\x03\x02\x02\x02\u0354\u0344\x03" +
		"\x02\x02\x02\u0354\u0345\x03\x02\x02\x02\u0354\u0346\x03\x02\x02\x02\u0354" +
		"\u0347\x03\x02\x02\x02\u0354\u0348\x03\x02\x02\x02\u0354\u0349\x03\x02" +
		"\x02\x02\u0354\u034A\x03\x02\x02\x02\u0354\u034B\x03\x02\x02\x02\u0354" +
		"\u034C\x03\x02\x02\x02\u0354\u034D\x03\x02\x02\x02\u0354\u034E\x03\x02" +
		"\x02\x02\u0354\u034F\x03\x02\x02\x02\u0354\u0350\x03\x02\x02\x02\u0354" +
		"\u0351\x03\x02\x02\x02\u0354\u0352\x03\x02\x02\x02\u0354\u0353\x03\x02" +
		"\x02\x02\u0355\x97\x03\x02\x02\x02\u0356\u0357\t\x07\x02\x02\u0357\x99" +
		"\x03\x02\x02\x02\u0358\u0359\t\b\x02\x02\u0359\x9B\x03\x02\x02\x02\u035A" +
		"\u035B\t\t\x02\x02\u035B\x9D\x03\x02\x02\x02\u035C\u035D\t\n\x02\x02\u035D" +
		"\x9F\x03\x02\x02\x02\u035E\u035F\x07\xFF\x02\x02\u035F\xA1\x03\x02\x02" +
		"\x02\u0360\u0361\t\v\x02\x02\u0361\xA3\x03\x02\x02\x02\u0362\u0363\t\f" +
		"\x02\x02\u0363\xA5\x03\x02\x02\x02\u0364\u0365\t\r\x02\x02\u0365\xA7\x03" +
		"\x02\x02\x02\u0366\u0367\t\x0E\x02\x02\u0367\xA9\x03\x02\x02\x02\u0368" +
		"\u0369\t\x0F\x02\x02\u0369\xAB\x03\x02\x02\x02\u036A\u0371\x05\xAEX\x02" +
		"\u036B\u0371\x05\xB0Y\x02\u036C\u0371\x05\xB2Z\x02\u036D\u0371\x05\xB4" +
		"[\x02\u036E\u0371\x05\xB6\\\x02\u036F\u0371\x05\xB8]\x02\u0370\u036A\x03" +
		"\x02\x02\x02\u0370\u036B\x03\x02\x02\x02\u0370\u036C\x03\x02\x02\x02\u0370" +
		"\u036D\x03\x02\x02\x02\u0370\u036E\x03\x02\x02\x02\u0370\u036F\x03\x02" +
		"\x02\x02\u0371\xAD\x03\x02\x02\x02\u0372\u0373\x07F\x02\x02\u0373\u0374" +
		"\x05\\/\x02\u0374\u0375\x05\xC0a\x02\u0375\xAF\x03\x02\x02\x02\u0376\u0377" +
		"\t\x10\x02\x02\u0377\xB1\x03\x02\x02\x02\u0378\u037A\t\x02\x02\x02\u0379" +
		"\u0378\x03\x02\x02\x02\u0379\u037A\x03\x02\x02\x02\u037A\u037B\x03\x02" +
		"\x02\x02\u037B\u037C\x07\u012F\x02\x02\u037C\xB3\x03\x02\x02\x02\u037D" +
		"\u037F\t\x02\x02\x02\u037E\u037D\x03\x02\x02\x02\u037E\u037F\x03\x02\x02" +
		"\x02\u037F\u0380\x03\x02\x02\x02\u0380\u0381\x07\u0130\x02\x02\u0381\xB5" +
		"\x03\x02\x02\x02\u0382\u0383\t\x11\x02\x02\u0383\xB7\x03\x02\x02\x02\u0384" +
		"\u0388\x05\xBA^\x02\u0385\u0388\x05\xBC_\x02\u0386\u0388\x05\xBE`\x02" +
		"\u0387\u0384\x03\x02\x02\x02\u0387\u0385\x03\x02\x02\x02\u0387\u0386\x03" +
		"\x02\x02\x02\u0388\xB9\x03\x02\x02\x02\u0389\u038A\x07\xCB\x02\x02\u038A" +
		"\u038B\x05\xB0Y\x02\u038B\xBB\x03\x02\x02\x02\u038C\u038D\x07\xDF\x02" +
		"\x02\u038D\u038E\x05\xB0Y\x02\u038E\xBD\x03\x02\x02\x02\u038F\u0390\x07" +
		"\xE1\x02\x02\u0390\u0391\x05\xB0Y\x02\u0391\xBF\x03\x02\x02\x02\u0392" +
		"\u0393\t\x12\x02\x02\u0393\xC1\x03\x02\x02\x02\u0394\u0395\t\x13\x02\x02" +
		"\u0395\xC3\x03\x02\x02\x02\u0396\u0397\x07w\x02\x02\u0397\u039C\x05\xAC" +
		"W\x02\u0398\u0399\x07h\x02\x02\u0399\u039B\x05\xACW\x02\u039A\u0398\x03" +
		"\x02\x02\x02\u039B\u039E\x03\x02\x02\x02\u039C\u039A\x03\x02\x02\x02\u039C" +
		"\u039D\x03\x02\x02\x02\u039D\u039F\x03\x02\x02\x02\u039E\u039C\x03\x02" +
		"\x02\x02\u039F\u03A0\x07x\x02\x02\u03A0\xC5\x03\x02\x02\x02\u03A1\u03A6" +
		"\x05\xCAf\x02\u03A2\u03A3\x07i\x02\x02\u03A3\u03A5\x05\xCAf\x02\u03A4" +
		"\u03A2\x03\x02\x02\x02\u03A5\u03A8\x03\x02\x02\x02\u03A6\u03A4\x03\x02" +
		"\x02\x02\u03A6\u03A7\x03\x02\x02\x02\u03A7\xC7\x03\x02\x02\x02\u03A8\u03A6" +
		"\x03\x02\x02\x02\u03A9\u03AE\x05\xCCg\x02\u03AA\u03AB\x07i\x02\x02\u03AB" +
		"\u03AD\x05\xCCg\x02\u03AC\u03AA\x03\x02\x02\x02\u03AD\u03B0\x03\x02\x02" +
		"\x02\u03AE\u03AC\x03\x02\x02\x02\u03AE\u03AF\x03\x02\x02\x02\u03AF\xC9" +
		"\x03\x02\x02\x02\u03B0\u03AE\x03\x02\x02\x02\u03B1\u03B3\x07i\x02\x02" +
		"\u03B2\u03B1\x03\x02\x02\x02\u03B2\u03B3\x03\x02\x02\x02\u03B3\u03B4\x03" +
		"\x02\x02\x02\u03B4\u03BC\x07\u012E\x02\x02\u03B5\u03B6\x07}\x02\x02\u03B6" +
		"\u03B7\x05\xCAf\x02\u03B7\u03B8\x07}\x02\x02\u03B8\u03BC\x03\x02\x02\x02" +
		"\u03B9\u03BC\x07\u0134\x02\x02\u03BA\u03BC\x05\xCEh\x02\u03BB\u03B2\x03" +
		"\x02\x02\x02\u03BB\u03B5\x03\x02\x02\x02\u03BB\u03B9\x03\x02\x02\x02\u03BB" +
		"\u03BA\x03\x02\x02\x02\u03BC\xCB\x03\x02\x02\x02\u03BD\u03C2\x05\xCAf" +
		"\x02\u03BE\u03BF\x07t\x02\x02\u03BF\u03C1\x05\xCAf\x02\u03C0\u03BE\x03" +
		"\x02\x02\x02\u03C1\u03C4\x03\x02\x02\x02\u03C2\u03C0\x03\x02\x02\x02\u03C2" +
		"\u03C3\x03\x02\x02\x02\u03C3\u03C6\x03\x02\x02\x02\u03C4\u03C2\x03\x02" +
		"\x02\x02\u03C5\u03C7\x07t\x02\x02\u03C6\u03C5\x03\x02\x02\x02\u03C6\u03C7" +
		"\x03\x02\x02\x02\u03C7\u03D5\x03\x02\x02\x02\u03C8\u03C9\x07{\x02\x02" +
		"\u03C9\u03CA\x05\xCCg\x02\u03CA\u03CB\x07{\x02\x02\u03CB\u03D5\x03\x02" +
		"\x02\x02\u03CC\u03CD\x07|\x02\x02\u03CD\u03CE\x05\xCCg\x02\u03CE\u03CF" +
		"\x07|\x02\x02\u03CF\u03D5\x03\x02\x02\x02\u03D0\u03D1\x07}\x02\x02\u03D1" +
		"\u03D2\x05\xCCg\x02\u03D2\u03D3\x07}\x02\x02\u03D3\u03D5\x03\x02\x02\x02" +
		"\u03D4\u03BD\x03\x02\x02\x02\u03D4\u03C8\x03\x02\x02\x02\u03D4\u03CC\x03" +
		"\x02\x02\x02\u03D4\u03D0\x03\x02\x02\x02\u03D5\xCD\x03\x02\x02\x02\u03D6" +
		"\u03E4\x07 \x02\x02\u03D7\u03E4\x05P)\x02\u03D8\u03E4\x07\xE1\x02\x02" +
		"\u03D9\u03E4\x07\xCB\x02\x02\u03DA\u03E4\x07\xDF\x02\x02\u03DB\u03E4\x07" +
		"\x96\x02\x02\u03DC\u03E4\x07\x97\x02\x02\u03DD\u03E4\x05\xC2b\x02\u03DE" +
		"\u03E4\x07\u0126\x02\x02\u03DF\u03E4\x05\x9CO\x02\u03E0\u03E4\x05\x9A" +
		"N\x02\u03E1\u03E4\x05\xA2R\x02\u03E2\u03E4\x05\x96L\x02\u03E3\u03D6\x03" +
		"\x02\x02\x02\u03E3\u03D7\x03\x02\x02\x02\u03E3\u03D8\x03\x02\x02\x02\u03E3" +
		"\u03D9\x03\x02\x02\x02\u03E3\u03DA\x03\x02\x02\x02\u03E3\u03DB\x03\x02" +
		"\x02\x02\u03E3\u03DC\x03\x02\x02\x02\u03E3\u03DD\x03\x02\x02\x02\u03E3" +
		"\u03DE\x03\x02\x02\x02\u03E3\u03DF\x03\x02\x02\x02\u03E3\u03E0\x03\x02" +
		"\x02\x02\u03E3\u03E1\x03\x02\x02\x02\u03E3\u03E2\x03\x02\x02\x02\u03E4" +
		"\xCF\x03\x02\x02\x02U\xD1\xDA\xE0\xF2\xF5\xF9\xFF\u0104\u0111\u011B\u0122" +
		"\u0127\u012C\u0133\u0137\u013C\u0140\u0146\u014B\u0156\u015B\u015F\u0163" +
		"\u0167\u016C\u017A\u0185\u018D\u0199\u019F\u01C6\u01CC\u01DF\u01E6\u01F9" +
		"\u01FE\u0206\u020F\u0219\u022A\u0233\u0242\u024A\u0251\u0257\u0259\u0264" +
		"\u026E\u0276\u027E\u0283\u028B\u0296\u02A3\u02AD\u02B4\u02C0\u02C8\u02CC" +
		"\u02E5\u0306\u030D\u0314\u0317\u031C\u032E\u0332\u0336\u033C\u0354\u0370" +
		"\u0379\u037E\u0387\u039C\u03A6\u03AE\u03B2\u03BB\u03C2\u03C6\u03D4\u03E3";
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
	public pplCommands(): PplCommandsContext {
		return this.getRuleContext(0, PplCommandsContext);
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


export class PplCommandsContext extends ParserRuleContext {
	public searchCommand(): SearchCommandContext | undefined {
		return this.tryGetRuleContext(0, SearchCommandContext);
	}
	public describeCommand(): DescribeCommandContext | undefined {
		return this.tryGetRuleContext(0, DescribeCommandContext);
	}
	public showCatalogsCommand(): ShowCatalogsCommandContext | undefined {
		return this.tryGetRuleContext(0, ShowCatalogsCommandContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_pplCommands; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPplCommands) {
			listener.enterPplCommands(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPplCommands) {
			listener.exitPplCommands(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPplCommands) {
			return visitor.visitPplCommands(this);
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
	public grokCommand(): GrokCommandContext | undefined {
		return this.tryGetRuleContext(0, GrokCommandContext);
	}
	public parseCommand(): ParseCommandContext | undefined {
		return this.tryGetRuleContext(0, ParseCommandContext);
	}
	public patternsCommand(): PatternsCommandContext | undefined {
		return this.tryGetRuleContext(0, PatternsCommandContext);
	}
	public kmeansCommand(): KmeansCommandContext | undefined {
		return this.tryGetRuleContext(0, KmeansCommandContext);
	}
	public adCommand(): AdCommandContext | undefined {
		return this.tryGetRuleContext(0, AdCommandContext);
	}
	public mlCommand(): MlCommandContext | undefined {
		return this.tryGetRuleContext(0, MlCommandContext);
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


export class DescribeCommandContext extends ParserRuleContext {
	public DESCRIBE(): TerminalNode { return this.getToken(OpenSearchPPLParser.DESCRIBE, 0); }
	public tableSourceClause(): TableSourceClauseContext {
		return this.getRuleContext(0, TableSourceClauseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_describeCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDescribeCommand) {
			listener.enterDescribeCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDescribeCommand) {
			listener.exitDescribeCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDescribeCommand) {
			return visitor.visitDescribeCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShowCatalogsCommandContext extends ParserRuleContext {
	public SHOW(): TerminalNode { return this.getToken(OpenSearchPPLParser.SHOW, 0); }
	public CATALOGS(): TerminalNode { return this.getToken(OpenSearchPPLParser.CATALOGS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_showCatalogsCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterShowCatalogsCommand) {
			listener.enterShowCatalogsCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitShowCatalogsCommand) {
			listener.exitShowCatalogsCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitShowCatalogsCommand) {
			return visitor.visitShowCatalogsCommand(this);
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


export class GrokCommandContext extends ParserRuleContext {
	public _source_field!: ExpressionContext;
	public _pattern!: StringLiteralContext;
	public GROK(): TerminalNode { return this.getToken(OpenSearchPPLParser.GROK, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_grokCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterGrokCommand) {
			listener.enterGrokCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitGrokCommand) {
			listener.exitGrokCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitGrokCommand) {
			return visitor.visitGrokCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParseCommandContext extends ParserRuleContext {
	public _source_field!: ExpressionContext;
	public _pattern!: StringLiteralContext;
	public PARSE(): TerminalNode { return this.getToken(OpenSearchPPLParser.PARSE, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
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


export class PatternsCommandContext extends ParserRuleContext {
	public _source_field!: ExpressionContext;
	public PATTERNS(): TerminalNode { return this.getToken(OpenSearchPPLParser.PATTERNS, 0); }
	public patternsParameter(): PatternsParameterContext[];
	public patternsParameter(i: number): PatternsParameterContext;
	public patternsParameter(i?: number): PatternsParameterContext | PatternsParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PatternsParameterContext);
		} else {
			return this.getRuleContext(i, PatternsParameterContext);
		}
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_patternsCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPatternsCommand) {
			listener.enterPatternsCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPatternsCommand) {
			listener.exitPatternsCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPatternsCommand) {
			return visitor.visitPatternsCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternsParameterContext extends ParserRuleContext {
	public _new_field!: StringLiteralContext;
	public _pattern!: StringLiteralContext;
	public NEW_FIELD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NEW_FIELD, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public PATTERN(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PATTERN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_patternsParameter; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPatternsParameter) {
			listener.enterPatternsParameter(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPatternsParameter) {
			listener.exitPatternsParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPatternsParameter) {
			return visitor.visitPatternsParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternsMethodContext extends ParserRuleContext {
	public PUNCT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PUNCT, 0); }
	public REGEX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.REGEX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_patternsMethod; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterPatternsMethod) {
			listener.enterPatternsMethod(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitPatternsMethod) {
			listener.exitPatternsMethod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitPatternsMethod) {
			return visitor.visitPatternsMethod(this);
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
	public _category_field!: StringLiteralContext;
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
	public CATEGORY_FIELD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CATEGORY_FIELD, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public TIME_FIELD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_FIELD, 0); }
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


export class MlCommandContext extends ParserRuleContext {
	public ML(): TerminalNode { return this.getToken(OpenSearchPPLParser.ML, 0); }
	public mlArg(): MlArgContext[];
	public mlArg(i: number): MlArgContext;
	public mlArg(i?: number): MlArgContext | MlArgContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MlArgContext);
		} else {
			return this.getRuleContext(i, MlArgContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_mlCommand; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterMlCommand) {
			listener.enterMlCommand(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitMlCommand) {
			listener.exitMlCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitMlCommand) {
			return visitor.visitMlCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MlArgContext extends ParserRuleContext {
	public _argName!: IdentContext;
	public _argValue!: LiteralValueContext;
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
	public ident(): IdentContext | undefined {
		return this.tryGetRuleContext(0, IdentContext);
	}
	public literalValue(): LiteralValueContext | undefined {
		return this.tryGetRuleContext(0, LiteralValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_mlArg; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterMlArg) {
			listener.enterMlArg(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitMlArg) {
			listener.exitMlArg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitMlArg) {
			return visitor.visitMlArg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromClauseContext extends ParserRuleContext {
	public SOURCE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SOURCE, 0); }
	public EQUAL(): TerminalNode { return this.getToken(OpenSearchPPLParser.EQUAL, 0); }
	public tableSourceClause(): TableSourceClauseContext | undefined {
		return this.tryGetRuleContext(0, TableSourceClauseContext);
	}
	public INDEX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.INDEX, 0); }
	public tableFunction(): TableFunctionContext | undefined {
		return this.tryGetRuleContext(0, TableFunctionContext);
	}
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


export class TableSourceClauseContext extends ParserRuleContext {
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
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_tableSourceClause; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTableSourceClause) {
			listener.enterTableSourceClause(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTableSourceClause) {
			listener.exitTableSourceClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTableSourceClause) {
			return visitor.visitTableSourceClause(this);
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
export class TakeAggFunctionCallContext extends StatsFunctionContext {
	public takeAggFunction(): TakeAggFunctionContext {
		return this.getRuleContext(0, TakeAggFunctionContext);
	}
	constructor(ctx: StatsFunctionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTakeAggFunctionCall) {
			listener.enterTakeAggFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTakeAggFunctionCall) {
			listener.exitTakeAggFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTakeAggFunctionCall) {
			return visitor.visitTakeAggFunctionCall(this);
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


export class TakeAggFunctionContext extends ParserRuleContext {
	public _size!: IntegerLiteralContext;
	public TAKE(): TerminalNode { return this.getToken(OpenSearchPPLParser.TAKE, 0); }
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public fieldExpression(): FieldExpressionContext {
		return this.getRuleContext(0, FieldExpressionContext);
	}
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.COMMA, 0); }
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_takeAggFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTakeAggFunction) {
			listener.enterTakeAggFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTakeAggFunction) {
			listener.exitTakeAggFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTakeAggFunction) {
			return visitor.visitTakeAggFunction(this);
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
	public constantFunction(): ConstantFunctionContext | undefined {
		return this.tryGetRuleContext(0, ConstantFunctionContext);
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


export class ConstantFunctionContext extends ParserRuleContext {
	public constantFunctionName(): ConstantFunctionNameContext {
		return this.getRuleContext(0, ConstantFunctionNameContext);
	}
	public LT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.LT_PRTHS, 0); }
	public RT_PRTHS(): TerminalNode { return this.getToken(OpenSearchPPLParser.RT_PRTHS, 0); }
	public functionArgs(): FunctionArgsContext | undefined {
		return this.tryGetRuleContext(0, FunctionArgsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_constantFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterConstantFunction) {
			listener.enterConstantFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitConstantFunction) {
			listener.exitConstantFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitConstantFunction) {
			return visitor.visitConstantFunction(this);
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


export class TableFunctionContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
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
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_tableFunction; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTableFunction) {
			listener.enterTableFunction(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTableFunction) {
			listener.exitTableFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTableFunction) {
			return visitor.visitTableFunction(this);
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
	public systemFunctionBase(): SystemFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, SystemFunctionBaseContext);
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
	public ident(): IdentContext | undefined {
		return this.tryGetRuleContext(0, IdentContext);
	}
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.EQUAL, 0); }
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
	public ESCAPE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.ESCAPE, 0); }
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
	public CONVERT_TZ(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CONVERT_TZ, 0); }
	public DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE, 0); }
	public DATE_ADD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_ADD, 0); }
	public DATE_FORMAT(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_FORMAT, 0); }
	public DATE_SUB(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATE_SUB, 0); }
	public DATETIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DATETIME, 0); }
	public DAY(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAY, 0); }
	public DAYNAME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYNAME, 0); }
	public DAYOFMONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFMONTH, 0); }
	public DAYOFWEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFWEEK, 0); }
	public DAYOFYEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.DAYOFYEAR, 0); }
	public FROM_DAYS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FROM_DAYS, 0); }
	public FROM_UNIXTIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.FROM_UNIXTIME, 0); }
	public HOUR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.HOUR, 0); }
	public MAKEDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MAKEDATE, 0); }
	public MAKETIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MAKETIME, 0); }
	public MICROSECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MICROSECOND, 0); }
	public MINUTE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MINUTE, 0); }
	public MONTH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTH, 0); }
	public MONTHNAME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MONTHNAME, 0); }
	public PERIOD_ADD(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PERIOD_ADD, 0); }
	public PERIOD_DIFF(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.PERIOD_DIFF, 0); }
	public QUARTER(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUARTER, 0); }
	public SECOND(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SECOND, 0); }
	public SUBDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SUBDATE, 0); }
	public SYSDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SYSDATE, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME, 0); }
	public TIME_TO_SEC(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIME_TO_SEC, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TIMESTAMP, 0); }
	public TO_DAYS(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.TO_DAYS, 0); }
	public UNIX_TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.UNIX_TIMESTAMP, 0); }
	public WEEK(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.WEEK, 0); }
	public YEAR(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.YEAR, 0); }
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


export class ConstantFunctionNameContext extends ParserRuleContext {
	public CURRENT_DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CURRENT_DATE, 0); }
	public CURRENT_TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CURRENT_TIME, 0); }
	public CURRENT_TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CURRENT_TIMESTAMP, 0); }
	public LOCALTIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOCALTIME, 0); }
	public LOCALTIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.LOCALTIMESTAMP, 0); }
	public UTC_TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.UTC_TIMESTAMP, 0); }
	public UTC_DATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.UTC_DATE, 0); }
	public UTC_TIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.UTC_TIME, 0); }
	public CURDATE(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CURDATE, 0); }
	public CURTIME(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.CURTIME, 0); }
	public NOW(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.NOW, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_constantFunctionName; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterConstantFunctionName) {
			listener.enterConstantFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitConstantFunctionName) {
			listener.exitConstantFunctionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitConstantFunctionName) {
			return visitor.visitConstantFunctionName(this);
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


export class SystemFunctionBaseContext extends ParserRuleContext {
	public TYPEOF(): TerminalNode { return this.getToken(OpenSearchPPLParser.TYPEOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_systemFunctionBase; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterSystemFunctionBase) {
			listener.enterSystemFunctionBase(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitSystemFunctionBase) {
			listener.exitSystemFunctionBase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitSystemFunctionBase) {
			return visitor.visitSystemFunctionBase(this);
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
	public MATCH_BOOL_PREFIX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MATCH_BOOL_PREFIX, 0); }
	public MATCH_PHRASE_PREFIX(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MATCH_PHRASE_PREFIX, 0); }
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
	public SIMPLE_QUERY_STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.SIMPLE_QUERY_STRING, 0); }
	public MULTI_MATCH(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.MULTI_MATCH, 0); }
	public QUERY_STRING(): TerminalNode | undefined { return this.tryGetToken(OpenSearchPPLParser.QUERY_STRING, 0); }
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
	public datetimeLiteral(): DatetimeLiteralContext | undefined {
		return this.tryGetRuleContext(0, DatetimeLiteralContext);
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


export class DatetimeLiteralContext extends ParserRuleContext {
	public dateLiteral(): DateLiteralContext | undefined {
		return this.tryGetRuleContext(0, DateLiteralContext);
	}
	public timeLiteral(): TimeLiteralContext | undefined {
		return this.tryGetRuleContext(0, TimeLiteralContext);
	}
	public timestampLiteral(): TimestampLiteralContext | undefined {
		return this.tryGetRuleContext(0, TimestampLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_datetimeLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDatetimeLiteral) {
			listener.enterDatetimeLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDatetimeLiteral) {
			listener.exitDatetimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDatetimeLiteral) {
			return visitor.visitDatetimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateLiteralContext extends ParserRuleContext {
	public _date!: StringLiteralContext;
	public DATE(): TerminalNode { return this.getToken(OpenSearchPPLParser.DATE, 0); }
	public stringLiteral(): StringLiteralContext {
		return this.getRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_dateLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterDateLiteral) {
			listener.enterDateLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitDateLiteral) {
			listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimeLiteralContext extends ParserRuleContext {
	public _time!: StringLiteralContext;
	public TIME(): TerminalNode { return this.getToken(OpenSearchPPLParser.TIME, 0); }
	public stringLiteral(): StringLiteralContext {
		return this.getRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_timeLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTimeLiteral) {
			listener.enterTimeLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTimeLiteral) {
			listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TimestampLiteralContext extends ParserRuleContext {
	public _timestamp!: StringLiteralContext;
	public TIMESTAMP(): TerminalNode { return this.getToken(OpenSearchPPLParser.TIMESTAMP, 0); }
	public stringLiteral(): StringLiteralContext {
		return this.getRuleContext(0, StringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return OpenSearchPPLParser.RULE_timestampLiteral; }
	// @Override
	public enterRule(listener: OpenSearchPPLParserListener): void {
		if (listener.enterTimestampLiteral) {
			listener.enterTimestampLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: OpenSearchPPLParserListener): void {
		if (listener.exitTimestampLiteral) {
			listener.exitTimestampLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: OpenSearchPPLParserVisitor<Result>): Result {
		if (visitor.visitTimestampLiteral) {
			return visitor.visitTimestampLiteral(this);
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
	public constantFunctionName(): ConstantFunctionNameContext | undefined {
		return this.tryGetRuleContext(0, ConstantFunctionNameContext);
	}
	public dateAndTimeFunctionBase(): DateAndTimeFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, DateAndTimeFunctionBaseContext);
	}
	public textFunctionBase(): TextFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, TextFunctionBaseContext);
	}
	public mathematicalFunctionBase(): MathematicalFunctionBaseContext | undefined {
		return this.tryGetRuleContext(0, MathematicalFunctionBaseContext);
	}
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


