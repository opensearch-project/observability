/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DataGrid } from '../data_grid';
import { 
  SELECTED_FIELDS, 
  AVAILABLE_FIELDS,
  UNSELECTED_FIELDS,
  QUERIED_FIELDS
} from '../../../../common/constants/explorer';
import { 
  AVAILABLE_FIELDS as SIDEBAR_AVAILABLE_FIELDS,
  QUERY_FIELDS,
  DATA_GRID_ROWS
} from '../../../../test/event_analytics_constants';

describe('Datagrid component', () => {
  configure({ adapter: new Adapter() });

  it('Renders data grid component', async () => {
    const explorerFields = {
      [SELECTED_FIELDS]: [],
      [UNSELECTED_FIELDS]: [],
      [AVAILABLE_FIELDS]: SIDEBAR_AVAILABLE_FIELDS,
      [QUERIED_FIELDS]: QUERY_FIELDS
    };
    
    const wrapper = mount(
      <DataGrid
        rows={DATA_GRID_ROWS}
        rowsAll={[]}
        explorerFields={explorerFields}
      />
    );
    
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});