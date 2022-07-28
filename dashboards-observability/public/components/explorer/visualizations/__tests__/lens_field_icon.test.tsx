/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { LensFieldIcon } from '../lens_field_icon';

describe('Visualization field icon component', () => {
  configure({ adapter: new Adapter() });

  it('Renders field icon component', async () => {
    
    const wrapper = mount(
      <LensFieldIcon
        type="date"
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});