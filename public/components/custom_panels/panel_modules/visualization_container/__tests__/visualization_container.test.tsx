/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PPLService from '../../../../../services/requests/ppl';
import React from 'react';
import { VisualizationContainer } from '../visualization_container';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { HttpResponse } from '../../../../../../../../src/core/public';
import { waitFor } from '@testing-library/react';
import {
  sampleSavedVisualization,
  samplePPLResponse,
} from '../../../../../../test/panels_constants';

describe('Visualization Container Component', () => {
  configure({ adapter: new Adapter() });

  it('renders add visualization container', async () => {
    httpClientMock.get = jest.fn(() =>
      Promise.resolve((sampleSavedVisualization as unknown) as HttpResponse)
    );

    httpClientMock.post = jest.fn(() =>
      Promise.resolve((samplePPLResponse as unknown) as HttpResponse)
    );

    const editMode = true;
    const visualizationId = 'panel_viz_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
    const savedVisualizationId = 'oiuccXwBYVazWqOO1e06';
    const fromTime = 'now-15m';
    const toTime = 'now';
    const onRefresh = true;
    const cloneVisualization = jest.fn();
    const pplFilterValue = 'where Carrier = "OpenSearch-Air"';
    const showFlyout = jest.fn();
    const removeVisualization = jest.fn();
    const pplService = new PPLService(httpClientMock);

    const wrapper = mount(
      <VisualizationContainer
        http={httpClientMock}
        editMode={editMode}
        visualizationId={visualizationId}
        savedVisualizationId={savedVisualizationId}
        pplService={pplService}
        fromTime={fromTime}
        toTime={toTime}
        onRefresh={onRefresh}
        cloneVisualization={cloneVisualization}
        pplFilterValue={pplFilterValue}
        showFlyout={showFlyout}
        removeVisualization={removeVisualization}
      />
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
