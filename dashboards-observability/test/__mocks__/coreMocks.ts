/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreStart } from '../../../../src/core/public';
import httpClientMock from './httpClientMock';
import { of } from 'rxjs';

const coreStartMock = ({
  uiSettings: {
    get: jest.fn(),
  },
  chrome: {
    setBreadcrumbs: jest.fn(),
    getIsNavDrawerLocked$: jest.fn(() => of(true)),
  },
  notifications: {
    toasts: {
      addDanger: jest.fn().mockName('addDanger'),
      addSuccess: jest.fn().mockName('addSuccess'),
      addError: jest.fn().mockName('addError'),
    },
  },
  http: httpClientMock,
} as unknown) as CoreStart;

export { coreStartMock };
