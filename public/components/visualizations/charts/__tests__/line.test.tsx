/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Line } from '../line';
import { 
  LAYOUT_CONFIG,
  SAMPLE_VISUALIZATIONS
} from '../../../../../test/event_analytics_constants';

describe('Line component', () => {
  configure({ adapter: new Adapter() });

  it('Renders line component', async () => {
    
    const wrapper = mount(
      <Line 
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