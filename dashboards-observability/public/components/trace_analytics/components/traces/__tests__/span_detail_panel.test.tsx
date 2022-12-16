/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SpanDetailPanel } from '../span_detail_panel';
import { BarOrientation } from '../../../../../../common/constants/shared';

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
          orientation: BarOrientation.horizontal,
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
          orientation: BarOrientation.horizontal,
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
    const wrapper = mount(<SpanDetailPanel data={data} setData={jest.fn()} mode='data_prepper' />);
    expect(wrapper).toMatchSnapshot();
  });
});
