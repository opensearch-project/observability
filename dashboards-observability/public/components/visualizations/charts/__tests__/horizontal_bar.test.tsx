/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { HorizontalBar } from '../horizontal_bar';
import {
  LAYOUT_CONFIG,
  SAMPLE_VISUALIZATIONS,
} from '../../../../../test/event_analytics_constants';

describe.skip('Horizontal bar component', () => {
  configure({ adapter: new Adapter() });

  it('Renders horizontal bar component', async () => {
    const wrapper = mount(
      <HorizontalBar
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
