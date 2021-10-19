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
import { Dashboard } from '..';
import { CoreStart } from '../../../../../../../../src/core/public';
import { coreStartMock } from '../../../../../../test/__mocks__/coreMocks';

describe('Dashboard component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty dashboard', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const wrapper = mount(
      <Dashboard
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{
          text: 'test',
          href: 'test#/',
        }}
        query=""
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders dashboard', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const wrapper = mount(
      <Dashboard
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
      />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-1"]').simulate('click');
    wrapper.find('button[data-test-subj="dashboard-table-percentile-button-2"]').simulate('click');
  });
});
