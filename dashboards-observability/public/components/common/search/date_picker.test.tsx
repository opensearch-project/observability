/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DatePicker } from './date_picker';

describe('Panels Table Component', () => {
  configure({ adapter: new Adapter() });
  const startTime = 'now/y';
  const endTime = 'now';
  const setStartTime = jest.fn();
  const setEndTime = jest.fn();
  const setTimeRange = jest.fn();
  const setIsOutputStale = jest.fn();
  const handleTimePickerChange = jest.fn();
  const handleTimeRangePickerRefresh = jest.fn();

  const wrapper = mount(
    <DatePicker
      startTime={startTime}
      endTime={endTime}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      setTimeRange={setTimeRange}
      setIsOutputStale={setIsOutputStale}
      handleTimePickerChange={handleTimePickerChange}
      handleTimeRangePickerRefresh={handleTimeRangePickerRefresh}
    />
  );

  it('renders empty panel table container', async () => {
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
