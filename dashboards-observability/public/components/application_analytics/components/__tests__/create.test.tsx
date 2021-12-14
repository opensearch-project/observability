/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateApp } from '../create';
import { coreStartMock } from '../../../../../test/__mocks__/coreMocks';
import DSLService from 'public/services/requests/dsl';
import { render } from '@testing-library/react';

describe('Create Page', () => {
  configure({ adapter: new Adapter() });

  it('renders empty', () => {
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
    const utils = render(
      <CreateApp
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

    expect(utils).toMatchSnapshot();
  });

  it('renders with query', () => {
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
    const utils = render(
      <CreateApp
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
      />
    );
    utils.getByText('Log Source').click();
    utils.getByText('Clear').click();
    utils.getByText('Cancel').click();

    expect(utils).toMatchSnapshot();
  });

  it('can clear query', () => {
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
    const utils = render(
      <CreateApp
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
      />
    );
    utils.getByText('Log Source').click();
    utils.getByText('Clear').click();
    utils.getByText('Clear').click();

    expect(utils).toMatchSnapshot();
  });

  it('renders with one service selected', () => {
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
    const serviceFilters = [{
      field: 'serviceName',
      operator: 'is',
      value: 'User',
      inverted: false, 
      disabled: false 
    }];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={serviceFilters}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true} 
        dslService={dslService}
      />
    );
    utils.getByText('Select services & entities to include in this application').click();

    expect(utils).toMatchSnapshot();
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
    const traceFilters = [{
      field: 'traceGroup',
      operator: 'is',
      value: 'test.auto',
      inverted: false, 
      disabled: false 
    }];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={traceFilters}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true} 
        dslService={dslService}
      />
    );

    expect(utils).toMatchSnapshot();
  });
});
