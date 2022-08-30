/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Stats } from '../stats/stats';
import {
  LAYOUT_CONFIG,
  STATS_TEST_VISUALIZATIONS_DATA,
} from '../../../../../test/event_analytics_constants';

describe('Stats component', () => {
  configure({ adapter: new Adapter() });

  it('Renders stats component', async () => {
    const wrapper = mount(
      <Stats visualizations={STATS_TEST_VISUALIZATIONS_DATA} layout={LAYOUT_CONFIG} config={true} />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
