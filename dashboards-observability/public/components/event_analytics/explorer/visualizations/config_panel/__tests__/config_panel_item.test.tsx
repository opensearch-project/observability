/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { PanelItem } from '../config_panes/config_controls/config_panel_item';

describe('Config panel item component', () => {
  configure({ adapter: new Adapter() });

  it('Renders PanelItem with empty data', async () => {
    const wrapper = mount(
      <PanelItem
        paddingTitle={'Test Title'}
        selectedAxis={[]}
        dropdownList={[]}
        onSelectChange={jest.fn()}
        isInvalid={true}
        isSingleSelection={false}
        isClearable={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders PanelItem with data', async () => {
    const wrapper = mount(
      <PanelItem
        paddingTitle={'Test Mode'}
        selectedAxis={[
          {
            name: 'spectrum',
            label: 'spectrum',
            value: 'spectrum',
          },
        ]}
        dropdownList={[
          {
            name: 'spectrum',
            label: 'spectrum',
            value: 'spectrum',
          },
          {
            name: 'opacity',
            label: 'opacity',
            value: 'opacity',
          },
        ]}
        onSelectChange={jest.fn()}
        isInvalid={false}
        isSingleSelection={false}
        isClearable={true}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
