/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class Span extends PPLNode {
  constructor(
    name: string,
    children: PPLNode[],
    private spanExpression: PPLNode,
    private customLabel: string
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      span_expression: this.spanExpression.getTokens(),
      customLabel: this.customLabel,
    };
  }

  toString(): string {
    return `${this.spanExpression.toString()}${this.customLabel ? ` as ${this.customLabel}` : ''}`;
  }
}
