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
import { ServicesTable } from '../services_table';

describe('Services table component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty services table message', () => {
    const addFilter = jest.fn();
    const setServiceQuery = jest.fn();
    const setRedirect = jest.fn();
    const refresh = jest.fn();
    const wrapper = mount(
      <ServicesTable
        items={[]}
        addFilter={addFilter}
        setRedirect={setRedirect}
        serviceQuery="test"
        setServiceQuery={setServiceQuery}
        refresh={refresh}
        indicesExist={true}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders services table', () => {
    const tableItems = [
      {
        name: 'database',
        average_latency: 49.54,
        error_rate: 3.77,
        throughput: 53,
        traces: 31,
        connected_services: ['order', 'inventory'],
        number_of_connected_services: 2,
      },
    ];
    const addFilter = jest.fn();
    const setServiceQuery = jest.fn();
    const setRedirect = jest.fn();
    const refresh = jest.fn();
    const wrapper = mount(
      <ServicesTable
        items={tableItems}
        addFilter={addFilter}
        setRedirect={setRedirect}
        serviceQuery="test"
        setServiceQuery={setServiceQuery}
        refresh={refresh}
        indicesExist={true}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
