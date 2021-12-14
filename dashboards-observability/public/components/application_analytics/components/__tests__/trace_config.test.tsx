/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TraceConfig } from '../config_components/trace_config';
import { coreStartMock } from '../../../../../test/__mocks__/coreMocks';
import DSLService from 'public/services/requests/dsl';

describe('Trace Config component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty trace config', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const dslService = {
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn()
    } as unknown as DSLService;
    const wrapper = mount(
      <TraceConfig
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
        dslService={dslService}
        />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with one trace selected', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const dslService = {
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn()
    } as unknown as DSLService;
    const traceFilter = [{
      field: 'traceGroup',
      operator: 'is',
      value: 'test.auto',
      inverted: false, 
      disabled: false 
    }];
    const wrapper = mount(
      <TraceConfig
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={traceFilter}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true} 
        dslService={dslService}
        />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
