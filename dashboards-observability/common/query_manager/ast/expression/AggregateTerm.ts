/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { CUSTOM_LABEL } from '../../../../common/constants/explorer';
import { PPLNode } from '../node';
import { CUSTOM_LABEL } from '../../../../common/constants/explorer';
export class AggregateTerm extends PPLNode {
  constructor(
    name: string,
    children: PPLNode[],
    private statsFunction: PPLNode,
    private customLabel: string
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      function: this.statsFunction.getTokens(),
      [CUSTOM_LABEL]: this[CUSTOM_LABEL],
    };
  }

  toString(): string {
    if (this[CUSTOM_LABEL]) {
      return `${this.statsFunction.toString()}${
        this[CUSTOM_LABEL] ? ` as ${this[CUSTOM_LABEL]}` : ''
      }`;
    }
    return `${this.statsFunction.toString()}`;
  }
}
