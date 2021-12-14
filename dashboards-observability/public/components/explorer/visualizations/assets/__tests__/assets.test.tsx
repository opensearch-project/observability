/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { LensIconChartBar } from '../chart_bar';
import { LensIconChartBarHorizontal } from '../chart_bar_horizontal';
import { LensIconChartLine } from '../chart_line';
import { EuiIconLegend } from '../legend';


describe('Assets components', () => {
  configure({ adapter: new Adapter() });

  it('Renders bar component', async () => {
    
    const wrapper = mount(
      <LensIconChartBar />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders bar horizontal component', async () => {
    
    const wrapper = mount(
      <LensIconChartBarHorizontal />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders line component', async () => {
    
    const wrapper = mount(
      <LensIconChartLine />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});