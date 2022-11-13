/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { TraceBlock } from '../trace_block/trace_block';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { HttpResponse } from '../../../../../../../../src/core/public';

describe('TraceBlock component', () => {
  configure({ adapter: new Adapter() });
  httpClientMock.post = jest.fn(() => Promise.resolve(({} as unknown) as HttpResponse));

  it('Renders TraceBlock component', async () => {
    const wrapper = mount(
      <TraceBlock
        http={httpClientMock}
        logTraceId={'03f9c770db5ee2f1caac0afc36db49ba'}
        hit={{ id: 'doc_view12' }}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
