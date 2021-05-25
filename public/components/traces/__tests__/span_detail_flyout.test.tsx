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
import { SpanDetailFlyout } from '../span_detail_flyout';

describe('<SpanDetailFlyout /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', async () => {
    httpClientMock.post = jest.fn(() =>
      Promise.resolve({ hits: { hits: [], total: { value: 0 } } })
    );
    const closeFlyout = jest.fn();
    const addSpanFilter = jest.fn();
    const utils = await mount(
      <SpanDetailFlyout
        http={httpClientMock}
        spanId="test"
        isFlyoutVisible={true}
        closeFlyout={closeFlyout}
        addSpanFilter={addSpanFilter}
      />
    );
    utils.update();
    await waitFor(() => {
      expect(utils).toMatchSnapshot();
    });
  });

  it('renders the component with data', async () => {
    httpClientMock.post = jest.fn(() => Promise.resolve(TEST_SPAN_RESPONSE));
    let container = document.createElement('div');
    const closeFlyout = jest.fn();
    const addSpanFilter = jest.fn();
    await act(() => {
      ReactDOM.render(
        <SpanDetailFlyout
          http={httpClientMock}
          spanId="test"
          isFlyoutVisible={true}
          closeFlyout={closeFlyout}
          addSpanFilter={addSpanFilter}
        />,
        container
      );
    });
    expect(container).toMatchSnapshot();
  });
});
