/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LogConfig } from '../components/config_components/log_config';
import { coreStartMock } from '../../../../test/__mocks__/coreMocks';
import DSLService from 'public/services/requests/dsl';

describe('Log Config component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty log config', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsFlyoutVisible = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const wrapper = mount(
      <LogConfig
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
        setIsFlyoutVisible={setIsFlyoutVisible}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
        editMode={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders with query', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setIsFlyoutVisible = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const wrapper = mount(
      <LogConfig
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        dslService={dslService}
        setIsFlyoutVisible={setIsFlyoutVisible}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
        editMode={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
