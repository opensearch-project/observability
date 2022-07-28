/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DeleteModal } from '../../../common/helpers/delete_modal';
import React from 'react';
import { getCloneModal, getDeleteModal } from '../modal_containers';

describe('Modal Container component', () => {
  configure({ adapter: new Adapter() });

  it('renders getCloneModal function', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = shallow(getCloneModal(onCancel, onConfirm));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders getDeleteModal function', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const title = 'Test Title';
    const message = 'Test Message';
    const confirmMessage = 'Confirm Message';
    const wrapper = shallow(getDeleteModal(onCancel, onConfirm, title, message, confirmMessage));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders DeleteModal component', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const title = 'Test Title';
    const message = 'Test Message';
    const wrapper = shallow(
      <DeleteModal onCancel={onCancel} onConfirm={onConfirm} title={title} message={message} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
