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

import React from 'react';
import { render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ServiceMapScale } from '../service_map_scale';

describe('Service map scale component', () => {
  configure({ adapter: new Adapter() });

  it('renders service map scale plot', () => {
    const wrapper = mount(
      <ServiceMapScale
        idSelected="latency"
        serviceMap={undefined}
        ticks={[0, 50, 100, 150, 200, 250]}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
