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
