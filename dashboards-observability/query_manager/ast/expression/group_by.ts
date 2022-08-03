/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';
import { Field } from './field';

export class GroupBy extends PPLNode {
  constructor(
    name: string,
    children: Array<PPLNode>,
    private fields: Array<Field>,
    private span: PPLNode | null
  ) {
    super(name, children);
  }

  getTokens() {
    return {
      group_fields: this.fields.map(field => field.getTokens()),
      span: this.span?.getTokens(),
    };
  }

  toString(): string {
    return `by ${this.span? `${this.span.toString()}, ` : ''}${this.fields.map((field) => field.toString()).join(', ')}`;
  }
}