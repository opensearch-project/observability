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
  SAMPLE_VISUALIZATIONS,
} from '../../../../../test/event_analytics_constants';

describe('Bar component', () => {
  configure({ adapter: new Adapter() });

  it('Renders bar component', async () => {
    const wrapper = mount(
      <Bar
        visualizations={SAMPLE_VISUALIZATIONS}
        name="Event counts"
        layoutConfig={LAYOUT_CONFIG}
        isUniColor={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
