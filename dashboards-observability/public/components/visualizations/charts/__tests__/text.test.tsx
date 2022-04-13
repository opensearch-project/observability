/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Text } from '../text/text';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../test/event_analytics_constants';

describe('Text component', () => {
  configure({ adapter: new Adapter() });

  it('Renders text component', async () => {
    const wrapper = mount(
      <Text
        visualizations={TEST_VISUALIZATIONS_DATA}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
