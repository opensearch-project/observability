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
            field: 'traceGroupFields.name',
            operator: 'exists',
            value: 'exists',
            inverted: false,
            disabled: false,
          },
        ]}
        addFilter={addFilter}
        addPercentileFilter={addPercentileFilter}
        setRedirect={setRedirect}
      />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-1"]').simulate('click');
    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-2"]').simulate('click');
    expect(addPercentileFilter).toBeCalledTimes(2);
    wrapper.find('button[data-test-subj="dashboard-table-trace-group-name-button"]').simulate('click');
    expect(addFilter).toBeCalled();
    wrapper.find('button[data-test-subj="dashboard-table-traces-button"]').simulate('click');
    expect(setRedirect).toBeCalledWith(true);
  });
});
