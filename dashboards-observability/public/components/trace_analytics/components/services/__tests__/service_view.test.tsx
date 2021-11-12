/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ServiceView } from '..';
import { coreStartMock } from '../../../../../../test/__mocks__/coreMocks';

describe('Service view component', () => {
  configure({ adapter: new Adapter() });

  it('renders service view', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const addFilter = jest.fn();
    const wrapper = shallow(
      <ServiceView
        serviceName="order"
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        http={core.http}
        query=""
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={false}
        addFilter={addFilter}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
