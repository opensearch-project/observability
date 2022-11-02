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
  TEST_VISUALIZATIONS_DATA
} from '../../../../../test/event_analytics_constants';

describe('Veritcal Bar component', () => {
  configure({ adapter: new Adapter() });

  it('Renders veritcal bar component', async () => {
    const wrapper = mount(
      <Bar
        visualizations={TEST_VISUALIZATIONS_DATA}
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
