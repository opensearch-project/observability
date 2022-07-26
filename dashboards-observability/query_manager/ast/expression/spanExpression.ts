/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class SpanExpression extends PPLNode {
  constructor(
    name: string,
    children: Array<PPLNode>,
    private fieldExpression: string,
    private literalValue: string,
    private timeUnit: string
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      field: this.fieldExpression,
      literal_value: this.literalValue,
      time_unit: this.timeUnit
    };
  }

  toString(): string {
    return `span(${this.fieldExpression}, ${this.literalValue}${this.timeUnit})`;
  }
}