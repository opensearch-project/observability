/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Line } from '../lines/line';
import {
  LAYOUT_CONFIG,
  TEST_VISUALIZATIONS_DATA
} from '../../../../../test/event_analytics_constants';

describe('Line component', () => {
  configure({ adapter: new Adapter() });

  it('Renders line component', async () => {
    const wrapper = mount(
      <Line
        visualizations={TEST_VISUALIZATIONS_DATA}
        layout={LAYOUT_CONFIG}
        config={{}}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
