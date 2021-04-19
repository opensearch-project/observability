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
import { Plt } from '../plt';

describe('Plotly component', () => {
  configure({ adapter: new Adapter() });

  it('renders plot', () => {
    const data = [
      {
        x: [1576800000000],
        y: [36],
        marker: {
          color: 'rgb(171, 211, 240)',
        },
        type: 'bar',
        text: ['Dec 19, 2019 16:00:00 - Dec 18, 2020 16:00:00'],
        hoverlabel: {
          align: 'left',
        },
        hovertemplate: '%{text}<br>Throughput: %{y:,}<extra></extra>',
      },
    ];
    const wrapper = mount(<Plt data={data} layout={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
