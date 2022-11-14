/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Bubble } from '../bubble/bubble';
import {
  LAYOUT_CONFIG,
  TEST_VISUALIZATIONS_DATA,
} from '../../../../../test/event_analytics_constants';

describe('Bubble component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Bubble component', async () => {
    const wrapper = mount(
      <Bubble
        visualizations={TEST_VISUALIZATIONS_DATA}
        layoutConfig={LAYOUT_CONFIG}
        figureConfig={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
