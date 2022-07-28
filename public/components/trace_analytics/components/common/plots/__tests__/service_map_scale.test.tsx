/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ServiceMapScale } from '../service_map_scale';

describe('Service map scale component', () => {
  configure({ adapter: new Adapter() });

  it('renders service map scale plot', () => {
    const wrapper = mount(
      <ServiceMapScale
        idSelected="latency"
        serviceMap={undefined}
        ticks={[0, 50, 100, 150, 200, 250]}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
