/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TEST_SERVICE_MAP, TEST_SERVICE_MAP_GRAPH } from '../../../../../../test/constants';
import {
  calculateTicks,
  filtersToDsl,
  fixedIntervalToMilli,
  fixedIntervalToTickFormat,
  getPercentileFilter,
  getServiceMapGraph,
  getServiceMapScaleColor,
  getServiceMapTargetResources,
  milliToNanoSec,
  minFixedInterval,
  MissingConfigurationMessage,
  nanoToMilliSec,
  NoMatchMessage,
  PanelTitle,
  renderBenchmark,
} from '../helper_functions';

describe('Helper functions', () => {
  configure({ adapter: new Adapter() });

  it('renders panel title', () => {
    const title = shallow(<PanelTitle title="test" totalItems={10} />);
    const titleZeroCount = shallow(<PanelTitle title="test" />);
    expect(title).toMatchSnapshot();
    expect(titleZeroCount).toMatchSnapshot();
  });

  it('renders no match and missing configuration messages', () => {
    const noMatchMessage = shallow(<NoMatchMessage size="s" />);
    const missingConfigurationMessage = shallow(<MissingConfigurationMessage />);
    expect(noMatchMessage).toMatchSnapshot();
    expect(missingConfigurationMessage).toMatchSnapshot();
  });

  it('renders benchmark', () => {
    // @ts-ignore
    const benchmarkPositive = mount(renderBenchmark(50));
    // @ts-ignore
    const benchmarkNegative = mount(renderBenchmark(-50));
    // @ts-ignore
    const benchmarkZero = mount(renderBenchmark(0));
    expect(benchmarkPositive).toMatchSnapshot();
    expect(benchmarkNegative).toMatchSnapshot();
    expect(benchmarkZero).toMatchSnapshot();
  });

  it('converts nanoseconds and milliseconds', () => {
    const ms = nanoToMilliSec(123456789);
    expect(ms).toEqual(123.456789);
    const ns = milliToNanoSec(123.456789);
    expect(ns).toEqual(123456789);
    // @ts-ignore
    const invalidMs = nanoToMilliSec('abc');
    expect(invalidMs).toEqual(0);
    // @ts-ignore
    const invalidNs = milliToNanoSec('abc');
    expect(invalidNs).toEqual(0);
  });

  it('returns service map scale color', () => {
    const color = getServiceMapScaleColor(0.5, 'latency');
    expect(color).toEqual('134, 105, 173');
  });

  it('returns service map graph', () => {
    const serviceMapGraph = getServiceMapGraph(TEST_SERVICE_MAP, 'latency', [
      0,
      50,
      100,
      150,
      200,
      250,
    ]);
    expect(serviceMapGraph).toEqual(TEST_SERVICE_MAP_GRAPH);
  });

  it('returns target resources by service name', () => {
    const targetResources = getServiceMapTargetResources(TEST_SERVICE_MAP, 'order');
    expect(targetResources).toEqual(['clear_order', 'update_order', 'get_order', 'pay_order']);
  });

  it('calculates ticks', () => {
    const ticks = calculateTicks(500, 200);
    const ticks2 = calculateTicks(0, 200, 10);
    expect(ticks).toEqual([0, 50, 100, 150, 200]);
    expect(ticks2).toEqual([0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]);
  });

  it('calculates fixed_interval for date_histograms', () => {
    const fixedInterval = minFixedInterval('now-5y', 'now');
    expect(fixedInterval).toEqual('365d');
    const ms = fixedIntervalToMilli('1h');
    expect(ms).toEqual(3600000);
    const tickFormat = fixedIntervalToTickFormat('1h');
    expect(tickFormat).toEqual('');
  });

  it('returns percentile filter DSL', () => {
    const DSL = getPercentileFilter(
      [{ traceGroupName: 'order', durationFilter: { gte: 1000 } }],
      '>= 95th'
    );
    expect(DSL).toEqual(
      JSON.parse(
        `{"field":"Latency percentile within trace group","operator":"","value":">= 95th","inverted":false,"disabled":false,"custom":{"query":{"bool":{"must":[],"filter":[],"should":[{"bool":{"must":[{"term":{"traceGroup":{"value":"order"}}},{"range":{"traceGroupFields.durationInNanos":{"gte":1000}}}]}}],"must_not":[],"minimum_should_match":1}}}}`
      )
    );
  });

  it('converts filters to DSL', () => {
    const getTestDslFromFilters = (field = 'traceGroup', operator = 'exists') =>
      filtersToDsl(
        [
          {
            field,
            operator,
            value: { from: '100', to: '\u221E' },
            inverted: false,
            disabled: false,
          },
        ],
        'order',
        'now-5m',
        'now'
      );
    const existsDSL = getTestDslFromFilters();
    expect(JSON.stringify(existsDSL)).toEqual(
      '{"query":{"bool":{"must":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}},{"query_string":{"query":"order"}},{"exists":{"field":"traceGroup"}}],"filter":[],"should":[],"must_not":[]}},"custom":{"timeFilter":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}}],"serviceNames":[],"serviceNamesExclude":[],"traceGroup":[],"traceGroupExclude":[],"percentiles":{"query":{"bool":{"should":[]}}}}}'
    );

    const isDSL = getTestDslFromFilters('traceGroup', 'is');
    expect(JSON.stringify(isDSL)).toEqual(
      '{"query":{"bool":{"must":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}},{"query_string":{"query":"order"}},{"term":{"traceGroup":{"from":"100","to":"∞"}}}],"filter":[],"should":[],"must_not":[]}},"custom":{"timeFilter":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}}],"serviceNames":[],"serviceNamesExclude":[],"traceGroup":[],"traceGroupExclude":[],"percentiles":{"query":{"bool":{"should":[]}}}}}'
    );
    const isBetweenDSL = getTestDslFromFilters('durationInNanos', 'is between');
    expect(JSON.stringify(isBetweenDSL)).toEqual(
      `{"query":{"bool":{"must":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}},{"query_string":{"query":"order"}},{"range":{"durationInNanos":{"gte":"100"}}}],"filter":[],"should":[],"must_not":[]}},"custom":{"timeFilter":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}}],"serviceNames":[],"serviceNamesExclude":[],"traceGroup":[],"traceGroupExclude":[],"percentiles":{"query":{"bool":{"should":[]}}}}}`
    );

    const customDSL = filtersToDsl(
      [
        {
          field: 'serviceName',
          operator: 'is',
          value: 'order',
          inverted: false,
          disabled: false,
          custom: { query: { bool: { should: ['test'], minimum_should_match: 1 } } },
        },
      ],
      'order',
      'now-5m',
      'now'
    );
    expect(JSON.stringify(customDSL)).toEqual(
      `{"query":{"bool":{"must":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}},{"query_string":{"query":"order"}}],"filter":[],"should":["test"],"must_not":[],"minimum_should_match":1}},"custom":{"timeFilter":[{"range":{"startTime":{"gte":"now-5m","lte":"now"}}}],"serviceNames":[],"serviceNamesExclude":[],"traceGroup":[],"traceGroupExclude":[],"percentiles":{"query":{"bool":{"should":["test"],"minimum_should_match":1}}}}}`
    );
  });
});
