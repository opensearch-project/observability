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

import React from 'react';
import { shallow } from 'enzyme';
import { JsonCodeBlock } from './json_code_block';
import { IndexPattern } from '../../../../../data/public';

it('returns the `JsonCodeEditor` component', () => {
  const props = {
    hit: { _index: 'test', _type: 'doc', _id: 'foo', _score: 1, _source: { test: 123 } },
    columns: [],
    indexPattern: {} as IndexPattern,
    filter: jest.fn(),
    onAddColumn: jest.fn(),
    onRemoveColumn: jest.fn(),
  };
  expect(shallow(<JsonCodeBlock {...props} />)).toMatchSnapshot();
});
