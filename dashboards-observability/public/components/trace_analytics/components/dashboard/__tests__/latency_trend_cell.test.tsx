/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { LatencyTrendCell } from '../latency_trend_cell';

describe('Latency trend cell component', () => {
  configure({ adapter: new Adapter() });

  it('renders latency trend cell', () => {
    const item = JSON.parse(
      `{"trendData":[{"x":[1605027600000],"y":[154.71],"type":"scatter","mode":"lines","hoverinfo":"none","line":{"color":"#000000","width":1}}],"popoverData":[{"x":[1605027600000],"y":[154.71],"type":"scatter","mode":"lines+markers","hovertemplate":"%{x}<br>Average latency: %{y}<extra></extra>","hoverlabel":{"bgcolor":"#d7c2ff"},"marker":{"color":"#987dcb","size":8},"line":{"color":"#987dcb","size":2}}]}`
    );
    const wrapper = mount(<LatencyTrendCell item={item} traceGroupName="order" />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('button[aria-label="Open popover"]').simulate('click');
    wrapper.find('button[aria-label="Close popover"]').simulate('click');
  });
});
