/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { FieldList } from '../fieldList';
import { 
  AVAILABLE_FIELDS
} from '../../../../../test/event_analytics_constants';

describe('Visualization field list component', () => {
  configure({ adapter: new Adapter() });

  it('Renders field list component', async () => {
    
    const wrapper = mount(
      <FieldList
        id="3327"
        field={AVAILABLE_FIELDS}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
