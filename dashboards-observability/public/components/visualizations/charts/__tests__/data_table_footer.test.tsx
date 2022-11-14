import { waitFor } from '@testing-library/react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { GridFooter } from '../data_table/data_table_footer';

describe('Test data table footer component', () => {
  configure({ adapter: new Adapter() });

  it('Renders data table footer component', async () => {
    const wrapper = mount(
      <GridFooter
        onPageSizeChanged={() => {}}
        pageSize={10}
        activePage={0}
        goToPage={() => {}}
        pageCount={2}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
