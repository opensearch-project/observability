/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import httpClientMock from '../../../../../test/__mocks__/httpClientMock';
import {
  samplePanelOptions,
  sampleSortedMetricsLayout,
  sampleVisualizationById,
} from '../../../../../test/metrics_contants';
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../../../../framework/redux/reducers';
import { Provider } from 'react-redux';
import { HttpResponse } from '../../../../../../../src/core/public';
import { MetricsExportPanel } from '../metrics_export_panel';
import { EuiComboBoxOptionOption } from '@elastic/eui';

describe('Export Metrics Panel Component', () => {
  configure({ adapter: new Adapter() });
  const store = createStore(rootReducer);

  it('renders Export Metrics Panel Component', async () => {
    let httpFlag = 1;
    httpClientMock.get = jest.fn(() => {
      if (httpFlag == 1) {
        httpFlag += 1;
        return Promise.resolve((samplePanelOptions as unknown) as HttpResponse);
      } else {
        return Promise.resolve((sampleVisualizationById as unknown) as HttpResponse);
      }
    });

    const http = httpClientMock;
    const visualizationsMetaData: any = [];
    const setVisualizationsMetaData = jest.fn();
    const sortedMetricsLayout = sampleSortedMetricsLayout;
    const selectedPanelOptions: EuiComboBoxOptionOption<unknown>[] = [];
    const setSelectedPanelOptions = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MetricsExportPanel
          http={http}
          visualizationsMetaData={visualizationsMetaData}
          setVisualizationsMetaData={setVisualizationsMetaData}
          sortedMetricsLayout={sortedMetricsLayout}
          selectedPanelOptions={selectedPanelOptions}
          setSelectedPanelOptions={setSelectedPanelOptions}
        />
      </Provider>
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
