/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { CaseInsensitiveCharStream } from '../antlr/adaptors/case_insensitive_char_stream';
import { OpenSearchPPLLexer } from '../antlr/bin/OpenSearchPPLLexer';
import { OpenSearchPPLParser } from '../antlr/bin/OpenSearchPPLParser';

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
