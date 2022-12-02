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

const time2CountWin: Map<number, CounterType> = new Map();

export function addClickToMetric(element: string, counter: CounterNameType = 'count') {
  // remove outdated key-value pairs
  trim();

  const timeKey = getKey(Date.now());
  const rollingCounter = time2CountWin.get(timeKey) || _.cloneDeep(DEFAULT_ROLLING_COUNTER);
  const key = `click.${element}.${counter}`;

  _.set(rollingCounter, key, (_.get(rollingCounter, key, 0) as number) + 1);
  if (counter === 'count') {
    const basicCounterKey = `click.${element}.total`;
    _.set(
      GLOBAL_BASIC_COUNTER,
      basicCounterKey,
      (_.get(GLOBAL_BASIC_COUNTER, basicCounterKey, 0) as number) + 1
    );
  }

  time2CountWin.set(timeKey, rollingCounter);
}

export function addRequestToMetric<T extends ComponentType>(
  component: T,
  request: RequestType<T>,
  error: { statusCode: number }
): void;
export function addRequestToMetric<T extends ComponentType>(
  component: T,
  request: RequestType<T>,
  counter: CounterNameType
): void;
export function addRequestToMetric<T extends ComponentType>(
  component: T,
  request: RequestType<T>,
  counterNameOrError: CounterNameType | { statusCode: number }
) {
  const counter =
    typeof counterNameOrError === 'object'
      ? checkErrorType(counterNameOrError)
      : counterNameOrError;

  // remove outdated key-value pairs
  trim();

  const timeKey = getKey(Date.now());
  const rollingCounter = time2CountWin.get(timeKey) || _.cloneDeep(DEFAULT_ROLLING_COUNTER);

  // @ts-ignore not sure why 'request' can't be indexed
  rollingCounter[component][request][counter]!++;
  if (counter === 'count') {
    // @ts-ignore
    GLOBAL_BASIC_COUNTER[component][request]['total']!++;
  }

  time2CountWin.set(timeKey, rollingCounter);
}

export const getMetrics = () => {
  const preTimeKey = getPreKey(Date.now());
  const rollingCounters = time2CountWin.get(preTimeKey);
  return buildMetrics(rollingCounters);
};

const checkErrorType = (error: { statusCode: number }) => {
  if (error.statusCode && Math.floor(error.statusCode / 100) === 4) {
    return 'user_error';
  } else {
    return 'system_error';
  }
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
  return Object.keys(COMPONENTS).includes(arg);
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
