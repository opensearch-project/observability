/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { CaseInsensitiveCharStream } from './adaptors/case_insensitive_char_stream';
import { OpenSearchPPLLexer } from './output/OpenSearchPPLLexer';
import { OpenSearchPPLParser } from './output/OpenSearchPPLParser';

/**
 * PPL Syntax Parser.
 */
export class PPLSyntaxParser {
  /**
   * Analyze the query syntax.
   */

  parse(query: string) {
    return this.createParser(this.createLexer(query));
  }

  createLexer(query: string) {
    return new OpenSearchPPLLexer(new CaseInsensitiveCharStream(CharStreams.fromString(query)));
  }

  createParser(lexer: OpenSearchPPLLexer) {
    return new OpenSearchPPLParser(new CommonTokenStream(lexer));
  }
}
