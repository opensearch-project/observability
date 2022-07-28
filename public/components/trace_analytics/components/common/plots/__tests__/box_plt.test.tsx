/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BoxPlt } from '../box_plt';

describe('Box plot component', () => {
  configure({ adapter: new Adapter() });

  it('renders box plot', () => {
    const addFilter = jest.fn();
    const wrapper = shallow(
      <BoxPlt
        plotParams={{
          min: 0,
          max: 100,
          left: 20,
          mid: 50,
          right: 80,
          currPercentileFilter:'',
          addFilter,
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
