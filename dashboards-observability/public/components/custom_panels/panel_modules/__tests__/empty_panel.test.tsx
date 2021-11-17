/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { EmptyPanelView } from '../empty_panel';

describe('Empty panel view component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty panel view with disabled popover', () => {
    const getVizContextPanels = jest.fn();
    const wrapper = mount(
      <EmptyPanelView addVizDisabled={true} getVizContextPanels={getVizContextPanels} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(true);
  });

  it('renders empty panel view with enabled popover', () => {
    const getVizContextPanels = jest.fn();
    const wrapper = mount(
      <EmptyPanelView addVizDisabled={false} getVizContextPanels={getVizContextPanels} />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('EuiButton').prop('disabled')).toBe(false);
  });

});
