/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigValueOptions } from '../config_panes/config_controls/config_value_options';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../../../test/event_analytics_constants';

describe('ConfigValueOptions component', () => {
  configure({ adapter: new Adapter() });

  it('Renders ConfigValueOptions with empty data', async () => {
    const wrapper = mount(
      <ConfigValueOptions
        visualizations={TEST_VISUALIZATIONS_DATA}
        schemas={[]}
        vizState={[]}
        handleConfigChange={jest.fn()}
        sectionName={'Test name'}
        sectionId={'valueOptions'}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
