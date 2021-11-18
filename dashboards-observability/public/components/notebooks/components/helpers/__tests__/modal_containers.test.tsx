/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  DeleteNotebookModal,
  getCloneModal,
  getCustomModal,
  getDeleteModal,
  getSampleNotebooksModal,
} from '../modal_containers';

describe('modal_containers spec', () => {
  configure({ adapter: new Adapter() });

  it('render get custom modal', () => {
    const runModal = jest.fn();
    const closeModal = jest.fn();
    const wrapper = shallow(
      getCustomModal(
        runModal,
        closeModal,
        'label',
        'title',
        'Cancel',
        'Confirm',
        'mock-path',
        'help text'
      )
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render get clone modal', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = shallow(getCloneModal(onCancel, onConfirm));
    expect(wrapper).toMatchSnapshot();
  });

  it('render get sample notebooks modal', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = shallow(getSampleNotebooksModal(onCancel, onConfirm));
    expect(wrapper).toMatchSnapshot();
  });

  it('render get delete modal', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = shallow(
      getDeleteModal(onCancel, onConfirm, 'Delete', 'Delete message', 'Confirm message')
    );
    expect(wrapper).toMatchSnapshot();

    const noConfirmMessageWrapper = shallow(
      getDeleteModal(onCancel, onConfirm, 'Delete', 'Delete message')
    );
    expect(noConfirmMessageWrapper).toMatchSnapshot();
  });

  it('render delete notebooks modal', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const wrapper = shallow(
      <DeleteNotebookModal
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="title"
        message="message"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('checks delete notebooks modal', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const utils = render(
      <DeleteNotebookModal
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="title"
        message="message"
      />
    );
    fireEvent.change(utils.getAllByTestId('delete-notebook-modal-input')[0], {
      target: { value: 'delete' },
    });
    fireEvent.click(utils.getAllByTestId('delete-notebook-modal-delete-button')[0]);
    expect(onConfirm).toBeCalled();
  });
});
