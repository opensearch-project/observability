/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';
import {
  CAPACITY,
    COMPONENTS,
  DEFAULT_ROLLING_COUNTER,
  GLOBAL_BASIC_COUNTER,
  INTERVAL,
  MILLIS_MULTIPLIER,
  WINDOW,
} from './constants';
import { ComponentType, CounterNameType, CounterType, RequestType } from './types';

export const time2CountWin: Map<number, CounterType> = new Map();

export const addRequestToMetric = (
  component: ComponentType,
  request: RequestType,
  counter: CounterNameType
) => {
  // remove outdated key-value pairs
  trim();

  const timeKey = getKey(Date.now());
  const rollingCounter = time2CountWin.get(timeKey) || _.cloneDeep(DEFAULT_ROLLING_COUNTER);

  rollingCounter[component][request][counter]!++;
  if (counter === 'count') {
    GLOBAL_BASIC_COUNTER[component][request]['total']!++;
  }

  time2CountWin.set(timeKey, rollingCounter);
};

export const getMetrics = () => {
  const preTimeKey = getPreKey(Date.now());
  const rollingCounters = time2CountWin.get(preTimeKey);
  const metrics = buildMetrics(rollingCounters);
  return metrics;
};

const trim = () => {
  if (time2CountWin.size > CAPACITY) {
    const currentKey = getKey(Date.now() - WINDOW * MILLIS_MULTIPLIER);
    time2CountWin.forEach((_value, key, map) => {
      if (key < currentKey) {
        map.delete(key);
      }
    });
  }
};

const getKey = (milliseconds: number) => {
  return Math.floor(milliseconds / MILLIS_MULTIPLIER / INTERVAL);
};

const getPreKey = (milliseconds: number) => {
  return getKey(milliseconds) - 1;
};

const isComponent = (arg: string): arg is ComponentType => {
  return COMPONENTS.includes(arg as ComponentType);
};

const buildMetrics = (rollingCounters?: CounterType) => {
  if (!rollingCounters) {
    rollingCounters = DEFAULT_ROLLING_COUNTER;
  }
  const basicMetrics = _.merge(rollingCounters, GLOBAL_BASIC_COUNTER);
  const overallActionMetrics = {
    request_total: 0,
    request_count: 0,
    success_count: 0,
    failed_request_count_system_error: 0,
    failed_request_count_user_error: 0,
  };
  Object.keys(basicMetrics).forEach((key) => {
    if (isComponent(key)) {
      for (const counter of Object.values(basicMetrics[key])) {
        overallActionMetrics.request_count += counter?.count || 0;
        overallActionMetrics.request_total += counter?.total || 0;
        overallActionMetrics.failed_request_count_system_error += counter?.system_error || 0;
        overallActionMetrics.failed_request_count_user_error += counter?.user_error || 0;
      }
    }
  });
  overallActionMetrics.success_count =
    overallActionMetrics.request_count -
    (overallActionMetrics.failed_request_count_system_error +
      overallActionMetrics.failed_request_count_user_error);

  return { ...basicMetrics, ...overallActionMetrics };
};

