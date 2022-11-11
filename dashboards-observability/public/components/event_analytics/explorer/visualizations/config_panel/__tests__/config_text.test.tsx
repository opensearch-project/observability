/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigText } from '../config_panes/config_controls/config_text';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../../../test/event_analytics_constants';

describe('Config text input component', () => {
  configure({ adapter: new Adapter() });
  it('Renders ConfigText with empty data', async () => {
    const wrapper = mount(
      <ConfigText
        visualizations={TEST_VISUALIZATIONS_DATA}
        schemas={[]}
        vizState={{}}
        handleConfigChange={jest.fn()}
      />
    );

    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ConfigText with data', async () => {
    const wrapper = mount(
      <ConfigText
        visualizations={TEST_VISUALIZATIONS_DATA}
        schemas={[]}
        vizState={{}}
        handleConfigChange={jest.fn()}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
