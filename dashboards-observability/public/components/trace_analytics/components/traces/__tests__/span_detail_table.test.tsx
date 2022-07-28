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
import { SpanDetailTable } from '../span_detail_table';

describe('<SpanDetailTable /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', async () => {
    httpClientMock.post = jest.fn(() =>
      Promise.resolve(({ hits: { hits: [], total: { value: 0 } } } as unknown) as HttpResponse)
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
    httpClientMock.post = jest.fn(() =>
      Promise.resolve((TEST_SPAN_RESPONSE as unknown) as HttpResponse)
    );
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
