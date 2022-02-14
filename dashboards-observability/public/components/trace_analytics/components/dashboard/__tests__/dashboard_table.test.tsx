/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DashboardTable } from '../dashboard_table';

describe('Dashboard table component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty dashboard table message', () => {
    const addFilter = jest.fn();
    const addPercentileFilter = jest.fn();
    const setRedirect = jest.fn();
    const wrapper = mount(
      <DashboardTable
        items={[]}
        filters={[]}
        addFilter={addFilter}
        addPercentileFilter={addPercentileFilter}
        setRedirect={setRedirect}
        loading={false}
        page="dashboard"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders dashboard table', () => {
    const tableItems = [
      {
        dashboard_trace_group_name: 'client_create_order',
        dashboard_average_latency: 187.27,
        dashboard_traces: 7,
        dashboard_latency_variance: [26.43, 325.4, 325.4],
        dashboard_error_rate: 14.285714285714285,
        '24_hour_latency_trend': null,
      },
    ];
    const addFilter = jest.fn();
    const addPercentileFilter = jest.fn();
    const setRedirect = jest.fn();
    const wrapper = mount(
      <DashboardTable
        items={tableItems}
        filters={[
          {
            field: 'traceGroup',
            operator: 'exists',
            value: 'exists',
            inverted: false,
            disabled: false,
          },
        ]}
        addFilter={addFilter}
        addPercentileFilter={addPercentileFilter}
        setRedirect={setRedirect}
        loading={false}
        page="dashboard"
      />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-1"]').simulate('click');
    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-2"]').simulate('click');
    expect(addPercentileFilter).toBeCalledTimes(2);
    wrapper
      .find('button[data-test-subj="dashboard-table-trace-group-name-button"]')
      .simulate('click');
    expect(addFilter).toBeCalled();
    wrapper.find('button[data-test-subj="dashboard-table-traces-button"]').simulate('click');
    expect(setRedirect).toBeCalledWith(true);
  });
});
