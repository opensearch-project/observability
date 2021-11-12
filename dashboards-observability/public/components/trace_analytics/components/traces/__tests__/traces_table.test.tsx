/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TracesTable } from '../traces_table';

describe('Traces table component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty traces table message', () => {
    const refresh = jest.fn();
    const noIndicesTable = mount(
      <TracesTable items={[]} refresh={refresh} indicesExist={false} loading={false} />
    );
    expect(noIndicesTable).toMatchSnapshot();

    const emptyTable = mount(
      <TracesTable items={[]} refresh={refresh} indicesExist={true} loading={false} />
    );
    expect(emptyTable).toMatchSnapshot();
  });

  it('renders traces table', () => {
    jest.mock('../../../../../../common/constants/trace_analytics', () => ({ TRACES_MAX_NUM: 1 }));
    const tableItems = [
      {
        trace_id: '00079a615e31e61766fcb20b557051c1',
        trace_group: 'HTTP GET',
        latency: 19.91,
        last_updated: '11/10/2020 09:55:45',
        error_count: 'Yes',
        percentile_in_trace_group: 30,
        actions: '#',
      },
    ];
    const refresh = jest.fn();
    const wrapper = mount(
      <TracesTable items={tableItems} refresh={refresh} indicesExist={true} loading={false} />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.find('button[data-test-subj="tableHeaderSortButton"]').at(0).simulate('click');
  });
});
