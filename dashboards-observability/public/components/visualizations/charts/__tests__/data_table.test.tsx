/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DataTable } from '../data_table/data_table';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../test/event_analytics_constants';

describe('Data table component', () => {
  configure({ adapter: new Adapter() });

  it('Renders data table component', async () => {
    const wrapper = mount(
      <DataTable
        visualizations={TEST_VISUALIZATIONS_DATA}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
