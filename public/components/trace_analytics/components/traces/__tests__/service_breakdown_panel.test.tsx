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
