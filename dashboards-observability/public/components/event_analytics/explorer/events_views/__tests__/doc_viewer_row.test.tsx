/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DocViewRow } from '../docViewRow';

describe('Datagrid Doc viewer row component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Doc viewer row component', async () => {
    
    const hit = {
      'Carrier': 'JetBeats',
      'avg(FlightDelayMin)': '45.957544288332315'
    };
    const selectedCols = [{
      name: 'avg(FlightDelayMin)',
      type: 'double'
    }];

    const wrapper = mount(
      <DocViewRow
        doc={hit}
        selectedCols={selectedCols}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});