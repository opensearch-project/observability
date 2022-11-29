/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPONENTS, REQUESTS } from './constants';

export type ComponentType = typeof COMPONENTS[number];
export type RequestType = typeof REQUESTS[number];
export type CounterNameType = 'count' | 'system_error' | 'user_error' | 'total';

// counter to track user click actions
type ClickCounterType = {
  [element: string]: {
    [counter in CounterNameType]?: number;
  };
};

// counter to tract requests to OpenSearch
type RequestCounterType = {
  [component in ComponentType]: {
    [request in RequestType]: {
      [counter in CounterNameType]?: number;
    };
  };
};

export type CounterType = ClickCounterType & RequestCounterType;
