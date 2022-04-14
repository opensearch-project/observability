/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import { 
  SELECTED_FIELDS, 
  AVAILABLE_FIELDS,
  UNSELECTED_FIELDS,
  QUERIED_FIELDS
} from '../../../../../../common/constants/explorer';
import { 
  AVAILABLE_FIELDS as SIDEBAR_AVAILABLE_FIELDS,
  QUERY_FIELDS,
  JSON_DATA,
  JSON_DATA_ALL
} from '../../../../../../test/event_analytics_constants';

describe('Siderbar component', () => {
  configure({ adapter: new Adapter() });

  it('Renders empty sidebar component', async () => {
    const explorerFields = {
      [SELECTED_FIELDS]: [],
      [AVAILABLE_FIELDS]: [],
      [UNSELECTED_FIELDS]: [],
      [QUERIED_FIELDS]: []
    };
    const handleAddField = jest.fn();
    const handleOverrideTimestamp = jest.fn();
    const selectedTimestamp = 'timestamp';
    const explorerData = {};
    const handleRemoveField = jest.fn();
    
    const wrapper = mount(
      <Sidebar 
        explorerFields={explorerFields}
        explorerData={explorerData}
        selectedTimestamp={selectedTimestamp}
        handleOverrideTimestamp={handleOverrideTimestamp}
        handleAddField={handleAddField}
        handleRemoveField={handleRemoveField}
        isFieldToggleButtonDisabled={false}
        isOverridingTimestamp={false}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Renders sidebar component', async () => {
    const explorerFields = {
      [SELECTED_FIELDS]: [],
      [UNSELECTED_FIELDS]: [],
      [AVAILABLE_FIELDS]: SIDEBAR_AVAILABLE_FIELDS,
      [QUERIED_FIELDS]: QUERY_FIELDS
    };
    const handleAddField = jest.fn();
    const handleOverrideTimestamp = jest.fn();
    const selectedTimestamp = 'timestamp';
    const explorerData = {
      'jsonData': JSON_DATA,
      'jsonDataAll': JSON_DATA_ALL
    };
    const handleRemoveField = jest.fn();
    
    const wrapper = mount(
      <Sidebar 
        explorerFields={explorerFields}
        explorerData={explorerData}
        selectedTimestamp={selectedTimestamp}
        handleOverrideTimestamp={handleOverrideTimestamp}
        handleAddField={handleAddField}
        handleRemoveField={handleRemoveField}
        isFieldToggleButtonDisabled={false}
        isOverridingTimestamp={false}
      />
    );

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});