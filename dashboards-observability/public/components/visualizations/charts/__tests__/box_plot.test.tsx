/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { BoxPlot } from '../box_plot/box_plot';
import {
  LAYOUT_CONFIG,
  BOX_TEST_VISUALIZATIONS_DATA,
} from '../../../../../test/event_analytics_constants';

describe('BoxPlot component', () => {
  configure({ adapter: new Adapter() });

  it('Renders BoxPlot component', async () => {
    const wrapper = mount(
      <BoxPlot visualizations={BOX_TEST_VISUALIZATIONS_DATA} layout={LAYOUT_CONFIG} config={true} />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
