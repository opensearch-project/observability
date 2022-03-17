/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Services } from '..';
import { coreStartMock } from '../../../../../../test/__mocks__/coreMocks';

describe('Services component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty services page', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const serviceBreadcrumbs = [
      {
        text: 'Trace analytics',
        href: '#/trace_analytics/home',
      },
      {
        text: 'Services',
        href: '#/trace_analytics/services',
      },
    ];
    const nameColumnAction = (item: any) =>
      location.assign(`#/trace_analytics/services/${encodeURIComponent(item)}`);
    const traceColumnAction = () => location.assign('#/trace_analytics/traces');
    const wrapper = mount(
      <Services
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        childBreadcrumbs={serviceBreadcrumbs}
        nameColumnAction={nameColumnAction}
        traceColumnAction={traceColumnAction}
        query=""
        setQuery={setQuery}
        filters={[]}
        appConfigs={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={false}
        page="services"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders services page', () => {
    const core = coreStartMock;
    const setQuery = jest.fn();
    const setFilters = jest.fn();
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const serviceBreadcrumbs = [
      {
        text: 'Trace analytics',
        href: '#/trace_analytics/home',
      },
      {
        text: 'Services',
        href: '#/trace_analytics/services',
      },
    ];
    const nameColumnAction = (item: any) =>
      location.assign(`#/trace_analytics/services/${encodeURIComponent(item)}`);
    const traceColumnAction = () => location.assign('#/trace_analytics/traces');
    const wrapper = mount(
      <Services
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        childBreadcrumbs={serviceBreadcrumbs}
        nameColumnAction={nameColumnAction}
        traceColumnAction={traceColumnAction}
        query=""
        setQuery={setQuery}
        filters={[]}
        appConfigs={[]}
        setFilters={setFilters}
        startTime="now-5m"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        indicesExist={true}
        page="services"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
