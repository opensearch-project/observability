/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
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
