/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpSetup } from "../../../../src/core/public";

const httpClientMock = jest.fn() as any;

httpClientMock.delete = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.get = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.head = jest.fn();
httpClientMock.post = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));
httpClientMock.put = jest.fn(() => ({
  then: jest.fn(() => ({
    catch: jest.fn(),
  })),
}));

export default httpClientMock as HttpSetup;