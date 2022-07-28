/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FilterEditPopover } from '../filter_edit_popover';
import { getFilterFields } from '../filter_helpers';

describe('Filter popover component', () => {
  configure({ adapter: new Adapter() });

  it('renders filter popover', () => {
    const setFilter = jest.fn();
    const closePopover = jest.fn();
    const filterFieldOptions = getFilterFields('dashboard').map((field) => ({ label: field }));
    const wrapper = mount(
      <FilterEditPopover
        filterFieldOptions={filterFieldOptions}
        index={0}
        setFilter={setFilter}
        closePopover={closePopover}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper
      .find('input')
      .at(0)
      .simulate('change', [{ label: 'traceGroup' }]);
    wrapper
      .find('input')
      .at(1)
      .simulate('change', [{ label: 'exists' }]);
    wrapper.find('button[data-test-subj="filter-popover-cancel-button"]').simulate('click');

    expect(closePopover).toBeCalled();

    wrapper.find('button[data-test-subj="comboBoxToggleListButton"]').at(0).simulate('click');
  });
});
