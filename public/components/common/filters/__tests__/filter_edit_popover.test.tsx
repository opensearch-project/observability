/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
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
