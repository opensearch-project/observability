/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentType, CounterType } from './types';

export const WINDOW = 3600;
export const INTERVAL = 60;
export const CAPACITY = (WINDOW / INTERVAL) * 2;
export const MILLIS_MULTIPLIER = 1000;

export const COMPONENTS = [
  'application_analytics',
  'operational_panels',
  'event_analytics',
  'notebooks',
  'trace_analytics',
  'metrics_analytics',
] as const;
export const REQUESTS = ['create', 'get', 'update', 'delete'] as const;

export const GLOBAL_BASIC_COUNTER: CounterType = (() => {
  const counter = {} as CounterType;
  COMPONENTS.forEach((component) => {
    counter[component] = {} as CounterType[ComponentType];
    REQUESTS.forEach((request) => {
      counter[component][request] = {
        total: 0,
      };
    });
  });
  return counter;
})();

export const DEFAULT_ROLLING_COUNTER: CounterType = (() => {
  const counter = {} as CounterType;
  COMPONENTS.forEach((component) => {
    counter[component] = {} as CounterType[ComponentType];
    REQUESTS.forEach((request) => {
      counter[component][request] = {
        count: 0,
        system_error: 0,
        user_error: 0,
      };
    });
  });
  return counter;
})();
