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
import { SpanDetailPanel } from '../span_detail_panel';

describe('Service breakdown panel component', () => {
  configure({ adapter: new Adapter() });

  it('renders service breakdown panel', () => {
    const data = {
      gantt: [
        {
          x: [0],
          y: ['inventory <br>HTTP GET 4dec6080-61af-11eb-aee3-ef2f84ffa4a2'],
          marker: { color: 'rgba(0, 0, 0, 0)' },
          width: 0.4,
          type: 'bar',
          orientation: 'h',
          hoverinfo: 'none',
          showlegend: false,
        },
        {
          x: [19.91],
          y: ['inventory <br>HTTP GET 4dec6080-61af-11eb-aee3-ef2f84ffa4a2'],
          text: ['Error'],
          textfont: { color: ['#c14125'] },
          textposition: 'outside',
          marker: { color: '#7492e7' },
          width: 0.4,
          type: 'bar',
          orientation: 'h',
          hovertemplate: '%{x}<extra></extra>',
        },
      ] as Plotly.Data[],
      table: [
        {
          service_name: 'inventory',
          span_id: '32c641131b569afa',
          latency: 19.91,
          vs_benchmark: 0,
          error: 'Error',
          start_time: '2020-11-10T17:55:45.219652629Z',
          end_time: '2020-11-10T17:55:45.239564396Z',
        },
      ],
      ganttMaxX: 19.91,
    };
    const wrapper = mount(<SpanDetailPanel data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
