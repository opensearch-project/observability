/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { JsonCodeBlock } from '../json_code_block';

describe('Doc viewer JSON block component', () => {
  configure({ adapter: new Adapter() });

  it('Renders JSON block component', async () => {
    
    const hit = {
      'Carrier': 'JetBeats',
      'avg(FlightDelayMin)': '45.957544288332315'
    };

    const wrapper = mount(
      <JsonCodeBlock 
        hit={hit}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});