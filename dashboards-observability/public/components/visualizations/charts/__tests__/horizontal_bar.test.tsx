/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Bar } from '../bar/bar';
import {
  LAYOUT_CONFIG,
  HORIZONTAL_BAR_TEST_VISUALIZATIONS_DATA,
} from '../../../../../test/event_analytics_constants';

describe('Horizontal bar component', () => {
  configure({ adapter: new Adapter() });

  it('Renders horizontal bar component', async () => {
    const wrapper = mount(
      <Bar
        visualizations={HORIZONTAL_BAR_TEST_VISUALIZATIONS_DATA}
        layout={LAYOUT_CONFIG}
        config={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
