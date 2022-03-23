/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButton, EuiContextMenu, EuiPopover } from '@elastic/eui';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { EmptyPanelView } from '../empty_panel';

describe('Empty panel view component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty panel view with disabled popover', () => {
    const addVizDisabled = true;
    const showFlyout = jest.fn();
    const wrapper = mount(
      <EmptyPanelView addVizDisabled={addVizDisabled} showFlyout={showFlyout} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(true);
  });

  it('renders empty panel view with enabled popover', () => {
    const addVizDisabled = false;
    const showFlyout = jest.fn();
    const wrapper = mount(
      <EmptyPanelView addVizDisabled={addVizDisabled} showFlyout={showFlyout} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(false);
  });
});
