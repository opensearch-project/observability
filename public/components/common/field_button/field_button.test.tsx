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
import { FieldButton, SIZES } from './field_button';

const noop = () => {};

describe('sizes', () => {
  SIZES.forEach((size) => {
    test(`${size} is applied`, () => {
      const component = shallow(<FieldButton onClick={noop} fieldName="name" size={size} />);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('isDraggable', () => {
  it('is rendered', () => {
    const component = shallow(<FieldButton onClick={noop} fieldName="name" isDraggable />);
    expect(component).toMatchSnapshot();
  });
});

describe('fieldIcon', () => {
  it('is rendered', () => {
    const component = shallow(
      <FieldButton onClick={noop} fieldName="name" fieldIcon={<span>fieldIcon</span>} />
    );
    expect(component).toMatchSnapshot();
  });
});

describe('fieldAction', () => {
  it('is rendered', () => {
    const component = shallow(
      <FieldButton onClick={noop} fieldName="name" fieldAction={<span>fieldAction</span>} />
    );
    expect(component).toMatchSnapshot();
  });
});

describe('isActive', () => {
  it('defaults to false', () => {
    const component = shallow(<FieldButton onClick={noop} fieldName="name" />);
    expect(component).toMatchSnapshot();
  });
  it('renders true', () => {
    const component = shallow(<FieldButton onClick={noop} fieldName="name" isActive />);
    expect(component).toMatchSnapshot();
  });
});
