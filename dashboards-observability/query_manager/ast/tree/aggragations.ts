/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PPLNode } from '../node';
import { GroupBy } from '../expression/group_by';

export class Aggregations extends PPLNode {

  constructor(
    name: string,
    children: Array<PPLNode>,
    private partitions: String,
    private allNum: string,
    private delim: string,
    private aggExprList: Array<PPLNode>,
    private groupExprList: GroupBy,
    private dedupSplitValue: string,
    private start?: number,
    private end?: number
  ) {
    super(name, children);
  }

  getStartEndIndicesOfOriginQuery() {
    return {
      start: this.start,
      end: this.end
    }
  }

  getTokens() {
    return {
      partitions: this.partitions,
      all_num: this.allNum,
      delim: this.delim,
      aggregations: this.aggExprList.map((aggTerm) => aggTerm.getTokens()),
      groupby: this.groupExprList.getTokens(),
      dedup_split_value: this.dedupSplitValue
    }
  }

  toString() {
    return `stats ${this.partitions ?? ''} ${this.allNum ?? ''} ${this.delim ?? ''} ${this.aggExprList.map((aggTerm) => aggTerm.toString()).join(', ')} ${this.groupExprList.toString()} ${this.dedupSplitValue ?? ''}`
  }
}