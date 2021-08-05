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
