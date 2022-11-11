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
        vizState={[
          {
            label: 'max(bytes)',
            name: 'bytes',
            aggregation: 'max',
            customLabel: '',
            side: 'left',
            className: 'color-theme-combo-box-option',
            ctid: 'ct_66861491-61c8-11ed-b89f-53a8c43cc17a',
          },
        ]}
        handleConfigChange={jest.fn()}
        sectionName={'Series position'}
      />
    );

    wrapper.find('button[data-test-subj="add-series-position-button"]').simulate('click');

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
