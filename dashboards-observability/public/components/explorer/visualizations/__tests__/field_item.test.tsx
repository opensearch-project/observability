/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { FieldItem } from '../field_item';
import { 
  AVAILABLE_FIELDS
} from '../../../../../test/event_analytics_constants';

describe('Visualization field item component', () => {
  configure({ adapter: new Adapter() });

  it('Renders field item component', async () => {
    
    const wrapper = mount(
      <FieldItem
        field={AVAILABLE_FIELDS[0]}
        highlight=""
        exists={true}
        hideDetails={false}
        key={AVAILABLE_FIELDS[0].name}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
