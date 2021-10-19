/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { arrayContainsObjects } from './table_helper';

describe('arrayContainsObjects', () => {
  it(`returns false for an array of primitives`, () => {
    const actual = arrayContainsObjects(['test', 'test']);
    expect(actual).toBeFalsy();
  });

  it(`returns true for an array of objects`, () => {
    const actual = arrayContainsObjects([{}, {}]);
    expect(actual).toBeTruthy();
  });

  it(`returns true for an array of objects and primitves`, () => {
    const actual = arrayContainsObjects([{}, 'sdf']);
    expect(actual).toBeTruthy();
  });

  it(`returns false for an array of null values`, () => {
    const actual = arrayContainsObjects([null, null]);
    expect(actual).toBeFalsy();
  });

  it(`returns false if no array is given`, () => {
    const actual = arrayContainsObjects([null, null]);
    expect(actual).toBeFalsy();
  });
});
