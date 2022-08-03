/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class AggregateTerm extends PPLNode {
  constructor(
    name: string,
    children: Array<PPLNode>,
    private statsFunction: PPLNode,
    private alias: string
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      function: this.statsFunction.getTokens(),
      alias: this.alias,
    };
  }

  toString(): string {
    if (this.alias) {
      return `${this.statsFunction.toString()} as ${this.alias}`;
    }
    return `${this.statsFunction.toString()}`;
  }
}
