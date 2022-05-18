/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { NoResults } from '../explorer/no_results';

describe('No result component', () => {
  configure({ adapter: new Adapter() });

  it('Renders No result component', async () => {
    
    const wrapper = mount(
      <NoResults />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});