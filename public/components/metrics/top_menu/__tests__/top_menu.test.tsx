/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import httpClientMock from '../../../../../test/__mocks__/httpClientMock';
import { sampleMetric, sampleMetricsVisualizations } from '../../../../../test/metrics_contants';
import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../../../../framework/redux/reducers';
import { Provider } from 'react-redux';
import { HttpResponse } from '../../../../../../../src/core/public';
import { TopMenu } from '../top_menu';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import SavedObjects from '../../../../services/saved_objects/event_analytics/saved_objects';
import { MetricType } from '../../../../../common/types/metrics';

describe('Metrics Top Menu Component', () => {
  configure({ adapter: new Adapter() });
  const store = createStore(rootReducer);

  it('renders Top Menu Component when enabled', async () => {
    httpClientMock.get = jest.fn(() => Promise.resolve((sampleMetric as unknown) as HttpResponse));

    const http = httpClientMock;
    const IsTopPanelDisabled = false;
    const startTime = 'now-1d';
    const endTime = 'now';
    const onDatePickerChange = jest.fn();
    const recentlyUsedRanges: DurationRange[] = [];
    const editMode = false;
    const setEditMode = jest.fn();
    const setEditActionType = jest.fn();
    const panelVisualizations = sampleMetricsVisualizations;
    const setPanelVisualizations = jest.fn();
    const resolutionValue = 'h';
    const setResolutionValue = jest.fn();
    const spanValue = 1;
    const setSpanValue = jest.fn();
    const resolutionSelectId = 'select_123';
    const savedObjects = new SavedObjects(httpClientMock);
    const setToast = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <TopMenu
          http={http}
          IsTopPanelDisabled={IsTopPanelDisabled}
          startTime={startTime}
          endTime={endTime}
          onDatePickerChange={onDatePickerChange}
          recentlyUsedRanges={recentlyUsedRanges}
          editMode={editMode}
          setEditMode={setEditMode}
          setEditActionType={setEditActionType}
          panelVisualizations={panelVisualizations}
          setPanelVisualizations={setPanelVisualizations}
          resolutionValue={resolutionValue}
          setResolutionValue={setResolutionValue}
          spanValue={spanValue}
          setSpanValue={setSpanValue}
          resolutionSelectId={resolutionSelectId}
          savedObjects={savedObjects}
          setToast={setToast}
        />
      </Provider>
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders Top Menu Component when disabled with no metric visualizations', async () => {
    httpClientMock.get = jest.fn();

    const http = httpClientMock;
    const IsTopPanelDisabled = true;
    const startTime = 'now-1d';
    const endTime = 'now';
    const onDatePickerChange = jest.fn();
    const recentlyUsedRanges: DurationRange[] = [];
    const editMode = false;
    const setEditMode = jest.fn();
    const setEditActionType = jest.fn();
    const panelVisualizations: MetricType[] = [];
    const setPanelVisualizations = jest.fn();
    const resolutionValue = 'h';
    const setResolutionValue = jest.fn();
    const spanValue = 1;
    const setSpanValue = jest.fn();
    const resolutionSelectId = 'select_123';
    const savedObjects = new SavedObjects(httpClientMock);
    const setToast = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <TopMenu
          http={http}
          IsTopPanelDisabled={IsTopPanelDisabled}
          startTime={startTime}
          endTime={endTime}
          onDatePickerChange={onDatePickerChange}
          recentlyUsedRanges={recentlyUsedRanges}
          editMode={editMode}
          setEditMode={setEditMode}
          setEditActionType={setEditActionType}
          panelVisualizations={panelVisualizations}
          setPanelVisualizations={setPanelVisualizations}
          resolutionValue={resolutionValue}
          setResolutionValue={setResolutionValue}
          spanValue={spanValue}
          setSpanValue={setSpanValue}
          resolutionSelectId={resolutionSelectId}
          savedObjects={savedObjects}
          setToast={setToast}
        />
      </Provider>
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders Top Menu Component when disabled in edit mode', async () => {
    httpClientMock.get = jest.fn(() => Promise.resolve((sampleMetric as unknown) as HttpResponse));

    const http = httpClientMock;
    const IsTopPanelDisabled = true;
    const startTime = 'now-1d';
    const endTime = 'now';
    const onDatePickerChange = jest.fn();
    const recentlyUsedRanges: DurationRange[] = [];
    const editMode = true;
    const setEditMode = jest.fn();
    const setEditActionType = jest.fn();
    const panelVisualizations = sampleMetricsVisualizations;
    const setPanelVisualizations = jest.fn();
    const resolutionValue = 'h';
    const setResolutionValue = jest.fn();
    const spanValue = 1;
    const setSpanValue = jest.fn();
    const resolutionSelectId = 'select_123';
    const savedObjects = new SavedObjects(httpClientMock);
    const setToast = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <TopMenu
          http={http}
          IsTopPanelDisabled={IsTopPanelDisabled}
          startTime={startTime}
          endTime={endTime}
          onDatePickerChange={onDatePickerChange}
          recentlyUsedRanges={recentlyUsedRanges}
          editMode={editMode}
          setEditMode={setEditMode}
          setEditActionType={setEditActionType}
          panelVisualizations={panelVisualizations}
          setPanelVisualizations={setPanelVisualizations}
          resolutionValue={resolutionValue}
          setResolutionValue={setResolutionValue}
          spanValue={spanValue}
          setSpanValue={setSpanValue}
          resolutionSelectId={resolutionSelectId}
          savedObjects={savedObjects}
          setToast={setToast}
        />
      </Provider>
    );
    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
