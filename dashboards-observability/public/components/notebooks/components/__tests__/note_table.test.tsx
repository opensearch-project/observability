/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { NoteTable } from '../note_table';

describe('<NoteTable /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', () => {
    const fetchNotebooks = jest.fn();
    const addSampleNotebooks = jest.fn();
    const createNotebook = jest.fn();
    const renameNotebook = jest.fn();
    const cloneNotebook = jest.fn();
    const deleteNotebook = jest.fn();
    const setBreadcrumbs = jest.fn();
    const setToast = jest.fn();
    const utils = render(
      <NoteTable
        loading={false}
        fetchNotebooks={fetchNotebooks}
        addSampleNotebooks={addSampleNotebooks}
        notebooks={[]}
        createNotebook={createNotebook}
        renameNotebook={renameNotebook}
        cloneNotebook={cloneNotebook}
        deleteNotebook={deleteNotebook}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        setToast={setToast}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the component', () => {
    const fetchNotebooks = jest.fn();
    const addSampleNotebooks = jest.fn();
    const createNotebook = jest.fn();
    const renameNotebook = jest.fn();
    const cloneNotebook = jest.fn();
    const deleteNotebook = jest.fn();
    const setBreadcrumbs = jest.fn();
    const setToast = jest.fn();
    const notebooks = Array.from({ length: 5 }, (v, k) => ({
      path: `path-${k}`,
      id: `id-${k}`,
      dateCreated: 'date-created',
      dateModified: 'date-modified',
    }));
    const utils = render(
      <NoteTable
        loading={false}
        fetchNotebooks={fetchNotebooks}
        addSampleNotebooks={addSampleNotebooks}
        notebooks={notebooks}
        createNotebook={createNotebook}
        renameNotebook={renameNotebook}
        cloneNotebook={cloneNotebook}
        deleteNotebook={deleteNotebook}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        setToast={setToast}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();

    utils.getByText('Actions').click();
    utils.getByText('Add samples').click();
    utils.getAllByLabelText('Select this row')[0].click();
    utils.getByText('Actions').click();
    utils.getByText('Delete').click();
    utils.getByText('Cancel').click();
    utils.getAllByLabelText('Select this row')[0].click();
    utils.getByText('Actions').click();
    utils.getByText('Rename').click();
  });
});
