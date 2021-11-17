/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
