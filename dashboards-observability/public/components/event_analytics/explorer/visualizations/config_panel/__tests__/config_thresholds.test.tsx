/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigThresholds } from '../config_panes/config_controls/config_thresholds';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../../../test/event_analytics_constants';

describe('ConfigThresholds component', () => {
  configure({ adapter: new Adapter() });

  it('Renders ConfigThresholds with empty data', async () => {
    const wrapper = mount(
      <ConfigThresholds
        handleConfigChange={jest.fn()}
        sectionName={'Thresholds'}
        vizState={[]}
        props={{}}
        visualizations={TEST_VISUALIZATIONS_DATA}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ConfigThresholds with data', async () => {
    const wrapper = mount(
      <ConfigThresholds
        handleConfigChange={jest.fn()}
        sectionName={'Thresholds'}
        vizState={[
          {
            thid: 'thr_a6cf51b1-60e7-11ed-88bc-e547509e6367',
            name: 'test threshold',
            color: '#FC0505',
            value: '10000000',
            isReadOnly: false,
          },
        ]}
        props={{ maxLimit: 1 }}
        visualizations={TEST_VISUALIZATIONS_DATA}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
