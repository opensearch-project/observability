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
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { TEST_SPAN_RESPONSE } from '../../../../test/constants';
import httpClientMock from '../../../../test/httpClientMock';
import { SpanDetailTable } from '../span_detail_table';

describe('<SpanDetailTable /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', async () => {
    httpClientMock.post = jest.fn(() =>
      Promise.resolve({ hits: { hits: [], total: { value: 0 } } })
    );
    const utils = await mount(
      <SpanDetailTable
        http={httpClientMock}
        hiddenColumns={['traceId', 'traceGroup']}
        DSL={{}}
        openFlyout={() => {}}
      />
    );
    utils.update();
    await waitFor(() => {
      expect(utils).toMatchSnapshot();
    });
  });

  it('renders the component with data', async () => {
    const setCurrentSpan = jest.fn();
    httpClientMock.post = jest.fn(() => Promise.resolve(TEST_SPAN_RESPONSE));
    let container = document.createElement('div');
    await act(() => {
      ReactDOM.render(
        <SpanDetailTable
          http={httpClientMock}
          hiddenColumns={['traceId', 'traceGroup']}
          DSL={{}}
          openFlyout={(spanId: string) => setCurrentSpan(spanId)}
        />,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
