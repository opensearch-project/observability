/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

module.exports = {
  rootDir: '../',
  setupFiles: ['<rootDir>/test/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.jest.ts'],
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/offline-module-cache/'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
    '<rootDir>/public/requests/',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
};
