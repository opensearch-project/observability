/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class AggregateFunction extends PPLNode {
  constructor(
    name: string,
    children: Array<PPLNode>,
    private statsFunctionName: string,
    private valueExpression: string,
    private percentileAggFunction: string,
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      name: this.statsFunctionName,
      value_expression: this.valueExpression,
      percentile_agg_function: this.percentileAggFunction
    };
  }

  toString(): string {
    if (this.statsFunctionName && this.valueExpression) {
      return `${this.statsFunctionName}(${this.valueExpression})`
    } else if (this.statsFunctionName) {
      return `${this.statsFunctionName}()`;
    } else if (this.percentileAggFunction) {
      return `${this.percentileAggFunction}`
    }
    return '';
  }
}