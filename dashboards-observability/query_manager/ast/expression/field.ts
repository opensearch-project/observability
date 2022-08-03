/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';

export class Field extends PPLNode {
  constructor(name: string, children: Array<PPLNode>, private fieldExpression: string) {
    super(name, children);
  }

  getTokens() {
    return { name: this.fieldExpression ?? '' };
  }

  toString(): string {
    return this.fieldExpression ?? '';
  }
}
