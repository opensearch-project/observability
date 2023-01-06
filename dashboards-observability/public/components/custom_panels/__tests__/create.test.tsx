import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CreateCustomPanel } from '../create';

describe('<CreateCustomPanel /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the edit Panel component', () => {
    const createPanel = jest.fn();
    const renamePanel = jest.fn();
    const setBreadcrumbs = jest.fn();
    const utils = render(
      <CreateCustomPanel
        existingPanelId={decodeURIComponent("random")}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        createPanel={createPanel}
        renamePanel={renamePanel}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });

  it('renders the create Panel component', () => {
    const createPanel = jest.fn();
    const renamePanel = jest.fn();
    const setBreadcrumbs = jest.fn();
    const utils = render(
      <CreateCustomPanel
        existingPanelId={encodeURIComponent('')}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        createPanel={createPanel}
        renamePanel={renamePanel}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();
  });
});