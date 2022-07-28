/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ServicesTable } from '../services_table';

describe('Services table component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty services table message', () => {
    const addFilter = jest.fn();
    const setRedirect = jest.fn();
    const nameColumnAction = (item: any) =>
      location.assign(`#/trace_analytics/services/${encodeURIComponent(item)}`);
    const traceColumnAction = () => location.assign('#/trace_analytics/traces');
    const wrapper = mount(
      <ServicesTable
        items={[]}
        nameColumnAction={nameColumnAction}
        traceColumnAction={traceColumnAction}
        addFilter={addFilter}
        setRedirect={setRedirect}
        indicesExist={true}
        loading={false}
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
    const setRedirect = jest.fn();
    const nameColumnAction = (item: any) =>
      location.assign(`#/trace_analytics/services/${encodeURIComponent(item)}`);
    const traceColumnAction = () => location.assign('#/trace_analytics/traces');
    const wrapper = mount(
      <ServicesTable
        items={tableItems}
        nameColumnAction={nameColumnAction}
        traceColumnAction={traceColumnAction}
        addFilter={addFilter}
        setRedirect={setRedirect}
        indicesExist={true}
        loading={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
