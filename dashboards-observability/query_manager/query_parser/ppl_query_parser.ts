/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLSyntaxParser } from '../antlr/ppl_syntax_parser';
import { OpenSearchPPLParser } from '../antlr/bin/OpenSearchPPLParser';
import { StatsAstBuilder } from '../ast/builder/stats_ast_builder';

export class PPLQueryParser {
  parser: OpenSearchPPLParser | null = null;
  visitor: any = null;
  rawQuery: string = '';

  parse(pplQuery: string) {
    this.rawQuery = pplQuery;
    this.parser = new PPLSyntaxParser().parse(this.rawQuery);
    return this;
  }

  getStats() {
    this.visitor = new StatsAstBuilder();
    return this.visitor.visitRoot(this.parser!.root()).getTokens();
  }
}
