/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';
import { renderDatePicker, SearchBar } from '../search_bar';

describe('Search bar components', () => {
  configure({ adapter: new Adapter() });

  it('renders date picker', () => {
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const wrapper = mount(renderDatePicker('now-5m', setStartTime, 'now', setEndTime));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders search bar', () => {
    const clock = sinon.useFakeTimers();

    const refresh = jest.fn();
    const setQuery = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setFilters = jest.fn();
    const wrapper = mount(
      <SearchBar
        refresh={refresh}
        page="dashboard"
        query="test"
        setQuery={setQuery}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        filters={[]}
        setFilters={setFilters}
        appConfigs={[]}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper
      .find('input[data-test-subj="search-bar-input-box"]')
      .simulate('change', { target: { value: 'queryTest' } });

    clock.tick(100);
    expect(setQuery).toBeCalledWith('queryTest');
  });
});
