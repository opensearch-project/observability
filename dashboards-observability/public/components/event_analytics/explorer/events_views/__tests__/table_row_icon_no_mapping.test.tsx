/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DocViewTableRowIconNoMapping } from '../detail_table/table_row_icon_no_mapping';

describe('DocViewTableRowIconNoMapping component', () => {
  configure({ adapter: new Adapter() });

  it('Renders DocViewTableRowIconNoMapping component', async () => {
    const wrapper = mount(<DocViewTableRowIconNoMapping />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
