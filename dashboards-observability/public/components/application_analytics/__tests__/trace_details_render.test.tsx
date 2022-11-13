import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { coreStartMock } from '../../../../test/__mocks__/coreMocks';
import { TraceDetailRender } from '../components/flyout_components/trace_detail_render';
import { HttpResponse } from '../../../../../../src/core/public';

describe('TraceDetailRender component', () => {
  configure({ adapter: new Adapter() });

  it('renders TraceDetailRender', () => {
    const core = coreStartMock;
    core.http.post = jest.fn(() => Promise.resolve(({} as unknown) as HttpResponse));
    const wrapper = mount(
      <TraceDetailRender
        traceId={'03f9c770db5ee2f1caac0afc36db49ba'}
        http={core.http}
        openSpanFlyout={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
