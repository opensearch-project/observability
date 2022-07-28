/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { HttpResponse } from '../../../../../../../../src/core/public';
import { TEST_SPAN_RESPONSE } from '../../../../../../test/constants';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { SpanDetailFlyout } from '../span_detail_flyout';

describe('<SpanDetailFlyout /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', async () => {
    httpClientMock.post = jest.fn(() =>
      Promise.resolve(({ hits: { hits: [], total: { value: 0 } } } as unknown) as HttpResponse)
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
    httpClientMock.post = jest.fn(() =>
      Promise.resolve((TEST_SPAN_RESPONSE as unknown) as HttpResponse)
    );
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
