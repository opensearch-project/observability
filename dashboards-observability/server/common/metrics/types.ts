/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPONENTS } from './constants';

export type ComponentType = keyof typeof COMPONENTS;
export type RequestType<T extends ComponentType> = typeof COMPONENTS[T][number];
export type CounterNameType = 'count' | 'system_error' | 'user_error' | 'total';

// counter to track user click actions
type ClickCounterType = {
  [element: string]: {
    [counter in CounterNameType]?: number;
  };
};

// counter to track requests to OpenSearch
type RequestCounterType = {
  [component in ComponentType]: {
    [request in RequestType<component>]: {
      [counter in CounterNameType]?: number;
    };
  };
};

export type CounterType = ClickCounterType & RequestCounterType;
