/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { EmptyMetricsView } from '../empty_view';
import { waitFor } from '@testing-library/react';

describe('Empty View Component', () => {
  configure({ adapter: new Adapter() });

  it('renders empty view container without metrics', async () => {
    const wrapper = mount(<EmptyMetricsView />);
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
