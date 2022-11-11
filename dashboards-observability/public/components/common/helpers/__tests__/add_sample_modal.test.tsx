/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { getSampleDataModal as GetSampleDataModal } from '../add_sample_modal';

describe('Add sample component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Add sample', async () => {
    const wrapper = mount(
      <GetSampleDataModal onCancel={() => jest.fn()} onConfirm={() => jest.fn()} />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
