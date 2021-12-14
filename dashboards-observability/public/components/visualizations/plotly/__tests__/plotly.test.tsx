/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Plt } from '../plot';
import { LAYOUT_CONFIG } from '../../../../../test/event_analytics_constants';

describe('Ploty base component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Ploty base component', async () => {
    
    const barValues = [{
      displaylogo: false,
      marker: {
        color: [
          "#3CA1C7",
          "#8C55A3",
          "#DB748A",
          "#F2BE4B"
        ]
      },
      name: "avg(FlightDelayMin)",
      responsive: true,
      type: 'bar',
      x: [
        "JetBeats",
        "Logstash Airways",
        "OpenSearch Dashboards Airlines",
        "OpenSearch-Air"
      ],
      y: [
        45.957544288332315,
        49.55268688081657,
        46.368274582560296,
        47.41304347826087
      ]
    }];

    const wrapper = mount(
      <Plt
        data={barValues}
        layout={{
          xaxis: {
            showgrid: false,
            visible: true,
          },
          yaxis: {
            showgrid: false,
            visible: true,
          },
          ...LAYOUT_CONFIG,
        }}
        config={{}}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});