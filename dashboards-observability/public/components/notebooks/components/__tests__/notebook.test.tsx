/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HttpResponse } from '../../../../../../../src/core/public';
import httpClientMock from '../../../../../test/__mocks__/httpClientMock';
import { sampleNotebook1 } from '../helpers/__tests__/sampleDefaultNotebooks';
import { Notebook } from '../notebook';

jest.mock('../../../../../../../src/plugins/embeddable/public', () => ({
  ViewMode: {
    EDIT: 'edit',
    VIEW: 'view',
  },
}));

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        status: {
          statuses: [{ id: 'plugin:reportsDashboards' }],
        },
      }),
  })
);

describe('<Notebook /> spec', () => {
  configure({ adapter: new Adapter() });

  it('renders the empty component', () => {
    const setBreadcrumbs = jest.fn();
    const renameNotebook = jest.fn();
    const cloneNotebook = jest.fn();
    const deleteNotebook = jest.fn();
    const setToast = jest.fn();
    const location = jest.fn();
    const history = jest.fn() as any;
    history.replace = jest.fn();
    const utils = render(
      <Notebook
        openedNoteId="mock-id"
        DashboardContainerByValueRenderer={jest.fn()}
        http={httpClientMock}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        renameNotebook={renameNotebook}
        cloneNotebook={cloneNotebook}
        deleteNotebook={deleteNotebook}
        setToast={setToast}
        location={location}
        history={history}
      />
    );
    expect(utils.container.firstChild).toMatchSnapshot();

    utils.getByText("Add code block").click();
    utils.getByText("Add visualization").click();
  });

  it('renders the component', async () => {
    const setBreadcrumbs = jest.fn();
    const renameNotebook = jest.fn();
    const cloneNotebook = jest.fn();
    const deleteNotebook = jest.fn();
    const setToast = jest.fn();
    const location = jest.fn();
    const history = jest.fn() as any;
    history.replace = jest.fn();
    httpClientMock.get = jest.fn(() =>
      Promise.resolve(({
        ...sampleNotebook1,
        path: sampleNotebook1.name,
        savedVisualizations: Array.from({ length: 5 }, (v, k) => ({
          label: `vis-${k}`,
          key: `vis-${k}`,
        })),
      } as unknown) as HttpResponse)
    );
    const utils = render(
      <Notebook
        openedNoteId={sampleNotebook1.id}
        DashboardContainerByValueRenderer={jest.fn()}
        http={httpClientMock}
        parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
        setBreadcrumbs={setBreadcrumbs}
        renameNotebook={renameNotebook}
        cloneNotebook={cloneNotebook}
        deleteNotebook={deleteNotebook}
        setToast={setToast}
        location={location}
        history={history}
      />
    );

    await waitFor(() => {
      expect(utils.container.firstChild).toMatchSnapshot();
    });
  });
});
