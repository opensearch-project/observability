/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
