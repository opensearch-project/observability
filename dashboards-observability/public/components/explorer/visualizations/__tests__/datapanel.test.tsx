/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DataPanel } from '../datapanel';
import { 
  SELECTED_FIELDS, 
  AVAILABLE_FIELDS,
  UNSELECTED_FIELDS,
  QUERIED_FIELDS
} from '../../../../../common/constants/explorer';
import { 
  AVAILABLE_FIELDS as SIDEBAR_AVAILABLE_FIELDS,
  QUERY_FIELDS
} from '../../../../../test/event_analytics_constants';

describe('No result component', () => {
  configure({ adapter: new Adapter() });

  const explorerFields = {
    [SELECTED_FIELDS]: [],
    [UNSELECTED_FIELDS]: [],
    [AVAILABLE_FIELDS]: SIDEBAR_AVAILABLE_FIELDS,
    [QUERIED_FIELDS]: QUERY_FIELDS
  };
  it('Renders No result component', async () => {
    
    const wrapper = mount(
      <DataPanel
        explorerFields={explorerFields}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});