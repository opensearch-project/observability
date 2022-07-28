/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ErrorRatePlt } from '../error_rate_plt';
import { LatencyPlt, LinePlt } from '../latency_trend_plt';

describe('Latency trend plot component', () => {
  configure({ adapter: new Adapter() });

  it('renders line plot', () => {
    const data = [
      {
        x: [1605027600000, 1605027700000],
        y: [78.16, 100],
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        line: {
          color: '#000000',
          width: 1,
        },
      },
    ] as Plotly.Data[];
    const wrapper = shallow(<LinePlt data={data} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders dash', () => {
    const data = [
      {
        x: [1605027600000],
        y: [78.16],
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        line: {
          color: '#000000',
          width: 1,
        },
      },
    ] as Plotly.Data[];
    const wrapper = shallow(<LinePlt data={data} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders latency plot', () => {
    const data = [
      {
        x: [1605027600000],
        y: [284.47],
        type: 'scatter',
        mode: 'lines+markers',
        hovertemplate: '%{x}<br>Average latency: %{y}<extra></extra>',
        hoverlabel: {
          bgcolor: '#d7c2ff',
        },
        marker: {
          color: '#987dcb',
          size: 8,
        },
        line: {
          color: '#987dcb',
        },
      },
    ] as Plotly.Data[];
    const wrapper = shallow(<LatencyPlt data={data} />);

    expect(wrapper).toMatchSnapshot();
  });
});
