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
