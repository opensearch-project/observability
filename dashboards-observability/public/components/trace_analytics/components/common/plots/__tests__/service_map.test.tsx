/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TEST_SERVICE_MAP } from '../../../../../../../test/constants';
import { ServiceMap } from '../service_map';

describe('Service map component', () => {
  configure({ adapter: new Adapter() });

  it('renders service map', async () => {
    const setServiceMapIdSelected = jest.fn((e) => {});
    const wrapper = shallow(
      <ServiceMap
        serviceMap={TEST_SERVICE_MAP}
        idSelected="latency"
        setIdSelected={setServiceMapIdSelected}
        page="dashboard"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
