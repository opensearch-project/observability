import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { GridHeader } from '../data_table/data_table_header';

const columns = [
  {
    lockVisible: true,
    columnsMenuParams: {
      suppressColumnFilter: true,
      suppressColumnSelectAll: true,
      suppressColumnExpandAll: true,
    },
    headerName: 'count()',
    field: 'count()',
    colId: 'count()',
  },
  {
    lockVisible: true,
    columnsMenuParams: {
      suppressColumnFilter: true,
      suppressColumnSelectAll: true,
      suppressColumnExpandAll: true,
    },
    headerName: 'span(timestamp,1d)',
    field: 'span(timestamp,1d)',
    colId: 'span(timestamp,1d)',
  },
];

describe('Test data table header component', () => {
  configure({ adapter: new Adapter() });

  it('Renders data table header component', async () => {
    const wrapper = mount(
      <GridHeader
        isFullScreen={false}
        setIsFullScreenHandler={() => {}}
        selectedRowDensity={{
          icon: 'tableDensityCompact',
          height: 35,
          selected: true,
        }}
        selectDensityHandler={() => {}}
        columnVisiblityHandler={() => {}}
        columns={columns}
        columnVisibility={[]}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
