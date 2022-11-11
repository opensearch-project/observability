/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigYAxisSide } from '../config_panes/config_controls/config_yaxis_side';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../../../test/event_analytics_constants';

describe('ConfigYAxisSide component', () => {
  configure({ adapter: new Adapter() });

  it('Renders ConfigYAxisSide with empty data', async () => {
    const wrapper = mount(
      <ConfigYAxisSide
        visualizations={TEST_VISUALIZATIONS_DATA}
        schemas={[]}
        vizState={[]}
        handleConfigChange={jest.fn()}
        sectionName={'Series position'}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ConfigYAxisSide with data', async () => {
    const wrapper = mount(
      <ConfigYAxisSide
        visualizations={TEST_VISUALIZATIONS_DATA}
        schemas={[]}
        vizState={[]}
        handleConfigChange={jest.fn()}
        sectionName={'Series position'}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
