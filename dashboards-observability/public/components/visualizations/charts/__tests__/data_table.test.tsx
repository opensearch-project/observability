/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DataTable } from '../data_table/data_table';
import { TEST_VISUALIZATIONS_DATA } from '../../../../../test/event_analytics_constants';
import { AgGridReact } from 'ag-grid-react';

describe('Data table component', () => {
  configure({ adapter: new Adapter() });

  it('Renders data table component', async () => {
    const gridWrapper = shallow(<DataTable visualizations={TEST_VISUALIZATIONS_DATA} />);
    const agGridReactObj = gridWrapper.find(AgGridReact);
    agGridReactObj.simulate('gridReady')
    expect(agGridReactObj).toBeTruthy();
    await waitFor(() => {
      expect(gridWrapper).toMatchSnapshot();
    });
  });
});
