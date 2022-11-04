/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { SearchBar } from '../search_bar';
import { sampleAllAvailableMetrics } from '../../../../../test/metrics_contants';

describe('Search Bar Component', () => {
  configure({ adapter: new Adapter() });

  it('Search Side Bar Component with no available metrics', async () => {
    const allAvailableMetrics: any = [];
    const handleAddMetric = jest.fn();

    const wrapper = mount(
      <SearchBar allAvailableMetrics={allAvailableMetrics} handleAddMetric={handleAddMetric} />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Search Side Bar Component with available metrics', async () => {
    const allAvailableMetrics = sampleAllAvailableMetrics;
    const handleAddMetric = jest.fn();

    const wrapper = mount(
      <SearchBar allAvailableMetrics={allAvailableMetrics} handleAddMetric={handleAddMetric} />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
