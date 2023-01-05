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
import PPLService from 'public/services/requests/ppl';
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query=""
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name="Chic Application"
        description="This is my chic application."
        mode='data_prepper'   
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
      />
    );
    utils.getByText('Log source').click();
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
    const utils = render(
      <CreateApp
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query="source = openserach_dashboard_sample_logs"
        setQuery={setQuery}
        filters={[]}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
      />
    );
    utils.getByText('Log source').click();
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
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
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query=""
        setQuery={setQuery}
        filters={serviceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
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
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query=""
        setQuery={setQuery}
        filters={serviceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
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
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query=""
        setQuery={setQuery}
        filters={traceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
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
    const setToasts = jest.fn();
    const updateApp = jest.fn();
    const clearStorage = jest.fn();
    const setAppConfigs = jest.fn();
    const setStartTimeWithStorage = jest.fn();
    const setEndTimeWithStorage = jest.fn();
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
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
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        pplService={pplService}
        query=""
        setQuery={setQuery}
        filters={traceFilters}
        setFilters={setFilters}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        name=""
        description=""
        mode='data_prepper'
        setNameWithStorage={setNameWithStorage}
        setDescriptionWithStorage={setDescriptionWithStorage}
        setQueryWithStorage={setQueryWithStorage}
        setFiltersWithStorage={setFiltersWithStorage}
        dslService={dslService}
        createApp={createApp}
        clearStorage={clearStorage}
        setToasts={setToasts}
        updateApp={updateApp}
        existingAppId="undefined"
        appConfigs={[]}
        setAppConfigs={setAppConfigs}
        setStartTimeWithStorage={setStartTimeWithStorage}
        setEndTimeWithStorage={setEndTimeWithStorage}
      />
    );
    utils.getByText('Constrain your application to specific trace groups').click();
    utils.getByText('Clear').click();
    utils.getByText('Clear').click();

    expect(utils).toMatchSnapshot();
  });
});
