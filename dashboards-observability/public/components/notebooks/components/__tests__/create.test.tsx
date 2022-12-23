import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CreateNotebookPage } from '../create';

describe('<CreateNotebook /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the edit notebook component', () => {
    const createNotebook = jest.fn();
    const renameNotebook = jest.fn();
    const setBreadcrumbs = jest.fn();
    const utils = render(
      <CreateNotebookPage
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
      <CreateNotebookPage
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
