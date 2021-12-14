/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { HitsCounter } from '../hits_counter';

describe('Hits counter component', () => {
  configure({ adapter: new Adapter() });

  it('Renders hits counter', async () => {
    const onResetQuery = jest.fn();
    
    const wrapper = mount(
      <HitsCounter
        hits={815}
        showResetButton={false}
        onResetQuery={onResetQuery}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});