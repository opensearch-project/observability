/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PPLService from '../../../../services/requests/ppl';
import React from 'react';
import { HttpResponse } from '../../../../../../../src/core/public';
import httpClientMock from '../../../../../test/__mocks__/httpClientMock';
import { sampleNotebook1 } from '../helpers/__tests__/sampleDefaultNotebooks';
import { Notebook } from '../notebook';
import { samplePPLResponse, sampleSavedVisualization } from '../../../../../test/panels_constants';
import {
  DASHBOARDS_VISUALIZATIONS_LIST,
  SQL_RESPONSE,
  STATUS_API_RESPONSE,
} from '../../../../../test/notebook_contants';

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

  // it('renders the empty component', () => {
  //   const setBreadcrumbs = jest.fn();
  //   const renameNotebook = jest.fn();
  //   const cloneNotebook = jest.fn();
  //   const deleteNotebook = jest.fn();
  //   const setToast = jest.fn();
  //   const location = jest.fn();
  //   const history = jest.fn() as any;
  //   history.replace = jest.fn();
  //   const pplService = new PPLService(httpClientMock);
  //   const utils = render(
  //     <Notebook
  //       pplService={pplService}
  //       openedNoteId="mock-id"
  //       DashboardContainerByValueRenderer={jest.fn()}
  //       http={httpClientMock}
  //       parentBreadcrumb={{ href: 'parent-href', text: 'parent-text' }}
  //       setBreadcrumbs={setBreadcrumbs}
  //       renameNotebook={renameNotebook}
  //       cloneNotebook={cloneNotebook}
  //       deleteNotebook={deleteNotebook}
  //       setToast={setToast}
  //       location={location}
  //       history={history}
  //     />
  //   );
  //   expect(utils.container.firstChild).toMatchSnapshot();

  //   utils.getByText('Add code block').click();
  //   utils.getAllByText('Add visualization')[0].click();
  //   utils.getAllByText('Add visualization')[1].click();
  // });

  it('renders the component', async () => {
    const setBreadcrumbs = jest.fn();
    const renameNotebook = jest.fn();
    const cloneNotebook = jest.fn();
    const deleteNotebook = jest.fn();
    const setToast = jest.fn();
    const location = jest.fn();
    const history = jest.fn() as any;
    history.replace = jest.fn();

    let counter = 0;
    // Mocks two http get requests first for fetch panel
    // Others for fetching visualizations in panel
    httpClientMock.get = jest.fn(() => {
      if (counter === 0) {
        counter += 1;
        return Promise.resolve((STATUS_API_RESPONSE as unknown) as HttpResponse);
      }

      if (counter === 1) {
        counter += 1;
        return Promise.resolve(({
          ...sampleNotebook1,
          path: sampleNotebook1.name,
        } as unknown) as HttpResponse);
      }

      if (counter === 2) {
        counter += 1;
        return Promise.resolve(([sampleSavedVisualization] as unknown) as HttpResponse);
      }

      if (counter === 3) {
        counter += 1;
        return Promise.resolve(([sampleSavedVisualization] as unknown) as HttpResponse);
      }

      if (counter === 4) {
        counter += 1;
        return Promise.resolve((sampleSavedVisualization as unknown) as HttpResponse);
      }

      counter += 1;
      return Promise.resolve((DASHBOARDS_VISUALIZATIONS_LIST as unknown) as HttpResponse);
      // if (counter === 6) {
      //   counter += 1;
      //   return Promise.resolve((DASHBOARDS_VISUALIZATIONS_LIST as unknown) as HttpResponse);
      // }

      // if (counter === 6) {
       
      // }

      // if (counter === 1) {
      //   counter += 1;
      //   return Promise.resolve(({
      //     savedVisualizations: Array.from({ length: 5 }, (v, k) => ({
      //       label: `vis-${k}`,
      //       key: `vis-${k}`,
      //     })),
      //   } as unknown) as HttpResponse);
      // }
      // counter += 1;
      // return Promise.resolve((sampleSavedVisualization as unknown) as HttpResponse);
    });

    let postCounter = 0;
    httpClientMock.post = jest.fn(() => {
      if (postCounter === 0) {
        counter += 1;
        return Promise.resolve((SQL_RESPONSE as unknown) as HttpResponse);
      }

      if (postCounter === 1) {
        counter += 1;
        return Promise.resolve((DASHBOARDS_VISUALIZATIONS_LIST as unknown) as HttpResponse);
      }
      if (postCounter === 2) {
        counter += 1;
        return Promise.resolve((samplePPLResponse as unknown) as HttpResponse);
      }

      counter += 1;
      return Promise.resolve((DASHBOARDS_VISUALIZATIONS_LIST as unknown) as HttpResponse);
    });

    const pplService = new PPLService(httpClientMock);
    const utils = render(
      <Notebook
        pplService={pplService}
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
