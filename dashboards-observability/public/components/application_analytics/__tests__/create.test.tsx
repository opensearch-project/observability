/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateApp } from '../components/create';
import { coreStartMock } from '../../../../test/__mocks__/coreMocks';
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
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
      />
    );

    expect(utils).toMatchSnapshot();
  });

  it('renders with name and description', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name="Chic Application"
        description="This is my chic application."
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
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
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
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
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
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
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const serviceFilters = [
      {
        field: 'serviceName',
        operator: 'is',
        value: 'User',
        inverted: false,
        disabled: false,
      },
    ];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={serviceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
      />
    );
    utils.getByText('Select services & entities to include in this application').click();
    utils.getByText('Clear').click();
    utils.getByText('Cancel').click();

    expect(utils).toMatchSnapshot();
  });

  it('clears service selected', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const serviceFilters = [
      {
        field: 'serviceName',
        operator: 'is',
        value: 'User',
        inverted: false,
        disabled: false,
      },
    ];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={serviceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
      />
    );
    utils.getByText('Select services & entities to include in this application').click();
    utils.getByText('Clear').click();
    utils.getByText('Clear').click();

    expect(utils).toMatchSnapshot();
  });

  it('renders with one trace selected', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const traceFilters = [
      {
        field: 'traceGroup',
        operator: 'is',
        value: 'test.auto',
        inverted: false,
        disabled: false,
      },
    ];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={traceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
      />
    );
    utils.getByText('Constrain your application to specific trace groups').click();
    utils.getByText('Clear').click();
    utils.getByText('Cancel').click();

    expect(utils).toMatchSnapshot();
  });

  it('clears one trace selected', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const setNameWithStorage = jest.fn();
    const setDescriptionWithStorage = jest.fn();
    const setQueryWithStorage = jest.fn();
    const setFiltersWithStorage = jest.fn();
    const createApp = jest.fn();
    const clearStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const traceFilters = [
      {
        field: 'traceGroup',
        operator: 'is',
        value: 'test.auto',
        inverted: false,
        disabled: false,
      },
    ];
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumb={{ text: 'test', href: 'test#/' }}
        query=""
        setQuery={setQuery}
        filters={traceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        name=""
        description=""
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
      />
    );
    utils.getByText('Constrain your application to specific trace groups').click();
    utils.getByText('Clear').click();
    utils.getByText('Clear').click();

    expect(utils).toMatchSnapshot();
  });
});
