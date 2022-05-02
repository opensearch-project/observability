/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { CountDistribution } from '../count_distribution';
import { SAMPLE_VISUALIZATIONS } from '../../../../../../../test/event_analytics_constants';

describe('Count distribution component', () => {
  configure({ adapter: new Adapter() });

  it('Renders empty count distribution component', async () => {
    
    const wrapper = mount(
      <CountDistribution />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders count distribution component with data', async () => {

    const wrapper = mount(
      <CountDistribution
        countDistribution={SAMPLE_VISUALIZATIONS}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});