/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { getFieldTypeName } from './field_type_name';

describe('Test fieldTypeName function', () => {
  it('validates return string', () => {
    expect(getFieldTypeName()).toBe('Unknown field');
    expect(getFieldTypeName('')).toBe('Unknown field');
    expect(getFieldTypeName(1)).toBe('Unknown field');
    expect(getFieldTypeName('boolean')).toBe('Boolean field');
    expect(getFieldTypeName('conflict')).toBe('Conflicting field');
    expect(getFieldTypeName('date')).toBe('Date field');
    expect(getFieldTypeName('geo_point')).toBe('Geo point field');
    expect(getFieldTypeName('geo_shape')).toBe('Geo shape field');
    expect(getFieldTypeName('ip')).toBe('IP address field');
    expect(getFieldTypeName('murmur3')).toBe('Murmur3 field');
    expect(getFieldTypeName('number')).toBe('Number field');
    expect(getFieldTypeName('source')).toBe('Source field');
    expect(getFieldTypeName('string')).toBe('String field');
    expect(getFieldTypeName('nested')).toBe('Nested field');
  });
});