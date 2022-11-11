/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DocViewTableRowIconUnderscore } from '../detail_table/table_row_icon_underscore';

describe('DocViewTableRowIconUnderscore component', () => {
  configure({ adapter: new Adapter() });

  it('Renders DocViewTableRowIconUnderscore component', async () => {
    const wrapper = mount(<DocViewTableRowIconUnderscore />);

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
