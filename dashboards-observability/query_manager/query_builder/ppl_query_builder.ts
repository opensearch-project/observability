/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLSyntaxParser } from '../antlr/ppl_syntax_parser';
import { StatsBuilder } from '../ast/builder/stats_builder';
import { StatsAstBuilder } from '../ast/builder/ast_builder';


export class PPLQueryBuilder {

  parser: PPLSyntaxParser | null = null;
  

  build(query: string, pplTokens: any) {
    // parse query
    this.parser = new PPLSyntaxParser().parse(query);

    return this.buildStats(query, pplTokens);
  }

  buildStats(query: string, statsTokens: any) {
    this.visitor = new StatsAstBuilder();
    const statsTree = this.visitor.visitRoot(this.parser!.root());
    const newStatsAstTree = new StatsBuilder(statsTokens).build();
    const indices = statsTree.getStartEndIndicesOfOriginQuery()
    if (indices.start !== undefined && indices.end !== undefined) {
      return query.substring(0, indices.start) + newStatsAstTree.toString() + query.substring(indices.end + 1, query.length);
    }

    return query + ' | ' + newStatsAstTree.toString();
  }
}

