/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty } from 'lodash';
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
      group_fields: this.fields.map((field) => field.getTokens()),
      span: this.span?.getTokens(),
    };
  }

  toString(): string {
    return (
      `${!isEmpty(this.fields) || !isEmpty(this.span) ? 'by ' : ''}` +
      `${
        !isEmpty(this.span) ? `${this.span.toString()}${this.fields.length > 0 ? ', ' : ''}` : ''
      }${this.fields.map((field) => field.toString()).join(', ')}`
    );
  }
}
