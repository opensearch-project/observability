/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { EmptyPlaceholder } from '../empty_placeholder';
import { LensIconChartBar } from '../../../../../visualizations/assets/chart_bar';
import { ToolbarButton } from '../toolbar_button';

describe('Shared components', () => {
  configure({ adapter: new Adapter() });

  it('Renders empty placeholder component', async () => {
    const wrapper = mount(<EmptyPlaceholder icon={LensIconChartBar} />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders tool bar button component', async () => {
    const handleClick = jest.fn();
    const WrappedComponent = () => <div>testing</div>;

    const wrapper = mount(
      <ToolbarButton onClick={handleClick} fontWeight="bold">
        <WrappedComponent />
      </ToolbarButton>
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
