/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { formatNumWithCommas } from '../format_number_with_commas';

describe('Test formatNumWithCommas function', () => {
  it('validates return string with commas', () => {
    expect(formatNumWithCommas('')).toBe('');
    expect(formatNumWithCommas()).toBe('undefined');
    expect(formatNumWithCommas(1111)).toBe('1,111');
    expect(formatNumWithCommas(1111111)).toBe('1,111,111');
  });
});
