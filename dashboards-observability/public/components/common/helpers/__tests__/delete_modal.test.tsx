/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount, shallow } from 'enzyme';
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

  it('Renders Delete modal and check for events', async () => {
    const wrapper = shallow(
      <DeleteModal
        title="Delete"
        message="Action can't be undone"
        onCancel={() => jest.fn()}
        onConfirm={() => jest.fn()}
      />
    );

    wrapper
      .find('[data-test-subj="popoverModal__deleteTextInput"]')
      .simulate('change', { target: { value: 'delete' } });
    wrapper.find('[data-test-subj="popoverModal__deleteButton"]').simulate('click', 'junk');
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
