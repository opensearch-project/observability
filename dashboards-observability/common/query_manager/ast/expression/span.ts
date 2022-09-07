/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class Span extends PPLNode {
  constructor(
    name: string,
    children: Array<PPLNode>,
    private spanExpression: PPLNode,
    private alias: string
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      span_expression: this.spanExpression.getTokens(),
      alias: this.alias,
    };
  }

  toString(): string {
    return `${this.spanExpression.toString()} as ${this.alias}`;
  }
}
