/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TraceView } from '..';
import { coreStartMock } from '../../../../../../test/__mocks__/coreMocks';

describe('Trace view component', () => {
  configure({ adapter: new Adapter() });

  it('renders trace view', () => {
    const core = coreStartMock;
    const wrapper = shallow(
      <TraceView
        http={core.http}
        chrome={core.chrome}
        parentBreadcrumbs={[{ text: 'test', href: 'test#/' }]}
        traceId="test"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
