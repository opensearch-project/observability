/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ServiceBreakdownPanel } from '../service_breakdown_panel';

describe('Service breakdown panel component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty service breakdown panel', () => {
    const wrapper = mount(<ServiceBreakdownPanel data={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders service breakdown panel', () => {
    const data = [
      {
        values: [100],
        labels: ['inventory'],
        marker: { colors: ['#7492e7'] },
        type: 'pie',
        textinfo: 'none',
        hovertemplate: '%{label}<br>%{value:.2f}%<extra></extra>',
      },
    ] as Plotly.Data[];
    const wrapper = mount(<ServiceBreakdownPanel data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
