/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { CustomPanelView } from '../custom_panel_view';
import { waitFor } from '@testing-library/react';
import {
  panelBreadCrumbs,
  sampleEmptyPanel,
  samplePanel,
  samplePPLResponse,
  sampleSavedVisualization,
} from '../../../../test/panels_constants';
import httpClientMock from '../../../../test/__mocks__/httpClientMock';
import PPLService from '../../../../public/services/requests/ppl';
import DSLService from '../../../../public/services/requests/dsl';
import { coreStartMock } from '../../../../test/__mocks__/coreMocks';
import { HttpResponse } from '../../../../../../src/core/public';

describe('Dashboards View Component', () => {
  configure({ adapter: new Adapter() });

  it('renders dashboards view container without visualizations', async () => {
    httpClientMock.get = jest.fn(() =>
      Promise.resolve((sampleEmptyPanel as unknown) as HttpResponse)
    );
    const panelId = 'L8Sx53wBDp0rvEg3yoLb';
    const http = httpClientMock;
    const pplService = new PPLService(httpClientMock);
    const dslService = new DSLService(httpClientMock);
    const core = coreStartMock;
    const parentBreadcrumbs = panelBreadCrumbs;
    const start = 'now-30m';
    const end = 'now';
    const setStart = jest.fn();
    const setEnd = jest.fn();
    const renameCustomPanel = jest.fn();
    const cloneCustomPanel = jest.fn();
    const deleteCustomPanel = jest.fn();
    const setToast = jest.fn();
    const onEditClick = (savedVisId: string) => {
      window.location.assign(`#/event_analytics/explorer/${savedVisId}`);
    };

    const wrapper = mount(
      <CustomPanelView
        panelId={panelId}
        http={http}
        pplService={pplService}
        dslService={dslService}
        chrome={core.chrome}
        parentBreadcrumbs={parentBreadcrumbs}
        renameCustomPanel={renameCustomPanel}
        cloneCustomPanel={cloneCustomPanel}
        deleteCustomPanel={deleteCustomPanel}
        setToast={setToast}
        onEditClick={onEditClick}
        startTime={start}
        endTime={end}
        setStartTime={setStart}
        setEndTime={setEnd}
        page="operationalPanels"
      />
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders dashboards view container with visualizations', async () => {
    let counter = 0;
    // Mocks two http get requests first for fetch dashboards
    // Others for fetching visualizations in dashboards
    httpClientMock.get = jest.fn(() => {
      if (counter === 0) {
        counter += 1;
        return Promise.resolve((samplePanel as unknown) as HttpResponse);
      } else return Promise.resolve((sampleSavedVisualization as unknown) as HttpResponse);
    });

    httpClientMock.post = jest.fn(() =>
      Promise.resolve((samplePPLResponse as unknown) as HttpResponse)
    );
    const panelId = 'L8Sx53wBDp0rvEg3yoLb';
    const http = httpClientMock;
    const pplService = new PPLService(httpClientMock);
    const dslService = new DSLService(httpClientMock);
    const core = coreStartMock;
    const parentBreadcrumbs = panelBreadCrumbs;
    const start = 'now-30m';
    const end = 'now';
    const setStart = jest.fn();
    const setEnd = jest.fn();
    const renameCustomPanel = jest.fn();
    const cloneCustomPanel = jest.fn();
    const deleteCustomPanel = jest.fn();
    const setToast = jest.fn();
    const onEditClick = (savedVisId: string) => {
      window.location.assign(`#/event_analytics/explorer/${savedVisId}`);
    };

    const wrapper = mount(
      <CustomPanelView
        panelId={panelId}
        http={http}
        pplService={pplService}
        dslService={dslService}
        chrome={core.chrome}
        parentBreadcrumbs={parentBreadcrumbs}
        renameCustomPanel={renameCustomPanel}
        cloneCustomPanel={cloneCustomPanel}
        deleteCustomPanel={deleteCustomPanel}
        setToast={setToast}
        onEditClick={onEditClick}
        startTime={start}
        endTime={end}
        setStartTime={setStart}
        setEndTime={setEnd}
        page="operationalPanels"
      />
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
