/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { DeleteModal } from '../delete_modal';

describe('Delete modal component', () => {
  configure({ adapter: new Adapter() });

  it('Renders Delete modal', async () => {
    const wrapper = mount(
      <DeleteModal
        title="Delete"
        message="Action can't be undone"
        onCancel={() => jest.fn()}
        onConfirm={() => jest.fn()}
      />
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
