/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigTreemapParentFields } from '../config_panes/config_controls/config_treemap_parents';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../../../test/event_analytics_constants';

describe('ConfigTreemapParentFields component', () => {
  configure({ adapter: new Adapter() });

  it('Renders ConfigTreemapParentFields with empty data', async () => {
    const wrapper = mount(
      <ConfigTreemapParentFields
        selectedAxis={[]}
        setSelectedParentItem={jest.fn()}
        handleUpdateParentFields={jest.fn()}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders ConfigTreemapParentFields with data', async () => {
    const wrapper = mount(
      <ConfigTreemapParentFields
        selectedAxis={[
          {
            name: 'spectrum',
            label: 'spectrum',
            type: 'spectrum',
          },
        ]}
        setSelectedParentItem={jest.fn()}
        handleUpdateParentFields={jest.fn()}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
