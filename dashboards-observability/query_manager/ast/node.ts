/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

interface PPLNodeProps {
  getName: () => string;
  getChildren: () => Array<PPLNode>;
  toString: () => string;
  getTokens: () => any;
}

export class PPLNode implements PPLNodeProps {
  
  constructor(
    private name: string, 
    private children: Array<PPLNode>
  ) {}

  getChildren() : Array<PPLNode> {
    return this.children;
  }

  getName() : string {
    return this.name;
  }

  toString() : string {
    return '';
  }

  getTokens() : any {
    return null;
  }
}