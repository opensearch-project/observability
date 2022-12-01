import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CreateNotebook } from '../create';
import { NoteTable } from '../note_table';

describe('<CreateNotebook /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the edit notebook component', () => {
    const createNotebook = jest.fn();
    const renameNotebook = jest.fn();
    const setBreadcrumbs = jest.fn();
    const utils = render(
      <CreateNotebook
        existingNotebookId={decodeURIComponent("random")}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        createNotebook={createNotebook}
        renameNotebook={renameNotebook}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the create notebook component', () => {
    const createNotebook = jest.fn();
    const renameNotebook = jest.fn();
    const setBreadcrumbs = jest.fn();
    const utils = render(
      <CreateNotebook
        existingNotebookId={encodeURIComponent('')}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        createNotebook={createNotebook}
        renameNotebook={renameNotebook}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });
});
