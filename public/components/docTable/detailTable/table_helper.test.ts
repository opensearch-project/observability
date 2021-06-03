/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
