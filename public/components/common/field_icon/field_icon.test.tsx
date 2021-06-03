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
import { FieldIcon, typeToEuiIconMap } from './field_icon';

const availableTypes = Object.keys(typeToEuiIconMap);

describe('FieldIcon renders known field types', () => {
  availableTypes.forEach((type) => {
    test(`${type} is rendered`, () => {
      const component = shallow(<FieldIcon type={type} />);
      expect(component).toMatchSnapshot();
    });
  });
});

test('FieldIcon renders an icon for an unknown type', () => {
  const component = shallow(<FieldIcon type="sdfsdf" label="test" />);
  expect(component).toMatchSnapshot();
});

test('FieldIcon supports same props as EuiToken', () => {
  const component = shallow(
    <FieldIcon
      type="number"
      label="test"
      color="euiColorVis0"
      size="l"
      shape="circle"
      fill="none"
    />
  );
  expect(component).toMatchSnapshot();
});

test('FieldIcon changes fill when scripted is true', () => {
  const component = shallow(<FieldIcon type="number" label="test" scripted={true} />);
  expect(component).toMatchSnapshot();
});

test('FieldIcon renders with className if provided', () => {
  const component = shallow(<FieldIcon type="sdfsdf" label="test" className="myClass" />);
  expect(component).toMatchSnapshot();
});
