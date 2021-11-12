/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { shallow } from 'enzyme';
import { LensFieldIcon } from './lens_field_icon';

test('LensFieldIcon renders properly', () => {
  const component = shallow(<LensFieldIcon type={'date'} />);
  expect(component).toMatchSnapshot();
});

test('LensFieldIcon accepts FieldIcon props', () => {
  const component = shallow(<LensFieldIcon type={'date'} fill={'none'} />);
  expect(component).toMatchSnapshot();
});
