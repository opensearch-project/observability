/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharStream } from 'antlr4ts';

export class CaseInsensitiveCharStream {
  private stream: CharStream;

  get index(): number {
    return this.stream.index;
  }

  get size(): number {
    return this.stream.size;
  }

  get sourceName(): string {
    return 'pplquery';
  }

  constructor(stream: CharStream) {
    this.stream = stream;
  }

  LA(offset: number): number {
    const c: number = this.stream.LA(offset);
    if (c <= 0) {
      return c;
    }

    // case insensitivity support for PPL
    return String.fromCodePoint(c).toUpperCase().codePointAt(0)!;
  }

  consume(): void {
    this.stream.consume();
  }

  mark(): number {
    return this.stream.mark();
  }

  release(marker: number): void {
    this.stream.release(marker);
  }

  seek(index: number): void {
    this.stream.seek(index);
  }

  getText(interval: any): string {
    return this.stream.getText(interval);
  }

  toString(): string {
    return this.stream.toString();
  }
}
