/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Filters } from '../filters';

describe('Filter component', () => {
  configure({ adapter: new Adapter() });

  it('renders filters', () => {
    const setFilters = jest.fn();
    const wrapper = mount(
      <Filters page="dashboard" filters={[]} setFilters={setFilters} appConfigs={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
