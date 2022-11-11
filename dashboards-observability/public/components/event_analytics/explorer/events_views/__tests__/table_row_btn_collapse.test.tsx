/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DocViewTableRowBtnCollapse } from '../detail_table/table_row_btn_collapse';

describe('DocViewTableRowBtnCollapse component', () => {
  configure({ adapter: new Adapter() });

  it('Renders DocViewTableRowBtnCollapse component collapsed', async () => {
    const wrapper = mount(<DocViewTableRowBtnCollapse onClick={jest.fn()} isCollapsed={false} />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
