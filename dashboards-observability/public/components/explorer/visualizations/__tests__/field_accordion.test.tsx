/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { FieldsAccordion } from '../fields_accordion';
import { 
  AVAILABLE_FIELDS
} from '../../../../../test/event_analytics_constants';

describe('Visualization fields accordion component', () => {
  configure({ adapter: new Adapter() });

  it('Renders fields accordion component', async () => {
    
    const wrapper = mount(
      <FieldsAccordion
        id="3367"
        paginatedFields={AVAILABLE_FIELDS}
        isFiltered={false}
        label={"Available fields"}
        showExistenceFetchError={false}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
