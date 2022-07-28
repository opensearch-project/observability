/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  getFilterFields,
  getInvertedOperator,
  getOperatorOptions,
  getValidFilterFields,
  getValueComponent,
} from '../filter_helpers';

describe('Filter helper functions', () => {
  configure({ adapter: new Adapter() });

  it('returns fields by page', () => {
    const fields = getFilterFields('dashboard');
    expect(fields).toEqual([
      'traceGroup',
      'serviceName',
      'error',
      'status.message',
      'latency',
    ]);
  });

  it('returns valid fields by page', () => {
    const dashboardFields = getValidFilterFields('dashboard');
    const servicesFields = getValidFilterFields('services');
    expect(dashboardFields).toEqual([
      'traceGroup',
      'serviceName',
      'error',
      'status.message',
      'latency',
      'Latency percentile within trace group',
    ]);
    expect(servicesFields).toEqual([
      'traceGroup',
      'serviceName',
      'error',
      'status.message',
      'latency',
    ]);
  });

  it('returns inverted operators', () => {
    const invertedBetween = getInvertedOperator('is between', true);
    const invertedExist = getInvertedOperator('exists', true);
    const invertedIs = getInvertedOperator('is', true);
    expect(invertedBetween).toEqual('is not between');
    expect(invertedExist).toEqual('does not exist');
    expect(invertedIs).toEqual('is not');
  });

  it('returns operator options by field', () => {
    const options = getOperatorOptions('durationInNanos');
    expect(options).toEqual([
      {
        label: 'is',
      },
      {
        label: 'is not',
      },
      {
        label: 'is between',
      },
      {
        label: 'is not between',
      },
      {
        label: 'exists',
      },
      {
        label: 'does not exist',
      },
    ]);
  });

  it('renders textfield filter', () => {
    const setValue = jest.fn((v) => {});
    const wrapper = mount(getValueComponent('serviceName', 'is', 0, setValue));
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').simulate('change', { target: { value: '100' } });
    expect(setValue).toBeCalledWith('100');
  });

  it('renders range field filter', () => {
    const setValue = jest.fn((v) => {});
    const wrapper = mount(
      getValueComponent('latency', 'is not between', { from: '0', to: '100' }, setValue)
    );
    expect(wrapper).toMatchSnapshot();

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '50' } });
    expect(setValue).toBeCalledWith({ from: '50', to: '100' });

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '200' } });
    expect(setValue).toBeCalledWith({ from: '0', to: '200' });
  });
});
