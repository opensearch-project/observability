/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLSyntaxParser } from '../antlr/ppl_syntax_parser';
import { OpenSearchPPLParser } from '../antlr/bin/OpenSearchPPLParser';
import { StatsBuilder } from '../ast/builder/stats_builder';
import { StatsAstBuilder } from '../ast/builder/ast_builder';

export class PPLQueryParser {

  parser : OpenSearchPPLParser | null = null;
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
    // const statsTree = this.visitor.visitRoot(this.parser!.root());
    // const statsIndices = statsTree.getStartEndIndicesOfOriginQuery();
    // const newAgg = {
    //   alias: '',
    //   function: {
    //     name: 'max',
    //     percentile_agg_function: '',
    //     value_expression: 'bytes'
    //   }
    // };
    // const currentAggs = [...statsTree.getTokens().aggregations, newAgg];
    // const newTree = {
    //   ...statsTree.getTokens(),
    //   aggregations: currentAggs
    // };
    // const newAstTree = new StatsBuilder(newTree).build();
    // const finalQuery = this.raw.substring(0, statsIndices.start) + newAstTree.toString() + this.query.substring(statsIndices.end + 1, this.query.length);
    // return finalQuery
  }

  getQuery() {
    // this.visitor = new StatsAstBuilder();
    // const statsIndices = this.visitor.visitRoot(this.parser!.root()).getStartEndIndicesOfOriginQuery();
    // return this.raw.substring(0, statsIndices.start) + newAstTree.toString() + this.rawQuery.substring(statsIndices.end + 1, this.rawQuery.length);
  };
}