/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PPLService from '../../../../../services/requests/ppl';
import React from 'react';
import { VisaulizationFlyout } from '../visualization_flyout';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { ShortDate } from '@elastic/eui';
import { sampleSavedVisualization } from '../../../../../../test/panels_constants';
import { HttpResponse } from '../../../../../../../../src/core/public';

describe('Visualization Flyout Component', () => {
  configure({ adapter: new Adapter() });

  it('renders add visualization Flyout', () => {
    const panelId = '';
    const pplFilterValue = '';
    const start: ShortDate = 'now-15m';
    const end: ShortDate = 'now';
    const setToast = jest.fn();
    const closeFlyout = jest.fn();
    const setPanelVisualizations = jest.fn();
    const pplService = new PPLService(httpClientMock);
    const isFlyoutReplacement = false;

    const wrapper = mount(
      <VisaulizationFlyout
        panelId={panelId}
        pplFilterValue={pplFilterValue}
        start={start}
        end={end}
        setToast={setToast}
        closeFlyout={closeFlyout}
        setPanelVisualizations={setPanelVisualizations}
        http={httpClientMock}
        pplService={pplService}
        isFlyoutReplacement={isFlyoutReplacement}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders replace visualization Flyout', () => {
    const panelId = 'oiuccXwBYVazWqOO1e06';
    const pplFilterValue = "where Carrier='OpenSearch-Air'";
    const start: ShortDate = '2011-08-11T01:23:45.678Z';
    const end: ShortDate = '2011-08-12T01:23:45.678Z';
    const setToast = jest.fn();
    const closeFlyout = jest.fn();
    const setPanelVisualizations = jest.fn();
    const pplService = new PPLService(httpClientMock);
    const isFlyoutReplacement = true;
    const replaceVisualizationId = '';

    const wrapper = mount(
      <VisaulizationFlyout
        panelId={panelId}
        pplFilterValue={pplFilterValue}
        start={start}
        end={end}
        setToast={setToast}
        closeFlyout={closeFlyout}
        setPanelVisualizations={setPanelVisualizations}
        http={httpClientMock}
        pplService={pplService}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Test fetchSavedVisualizations', () => {
  configure({ adapter: new Adapter() });
  const panelId = 'oiuccXwBYVazWqOO1e06';
  const pplFilterValue = "where Carrier='OpenSearch-Air'";
  const start: ShortDate = '2011-08-11T01:23:45.678Z';
  const end: ShortDate = '2011-08-12T01:23:45.678Z';
  const setToast = jest.fn();
  const closeFlyout = jest.fn();
  const setPanelVisualizations = jest.fn();
  const pplService = new PPLService(httpClientMock);
  const isFlyoutReplacement = true;
  const replaceVisualizationId = '';
  const response = {
    visualizations: [sampleSavedVisualization.visualization],
  };

  it('Test fetchSavedVisualizations response success', () => {
    httpClientMock.get = jest.fn(() => Promise.resolve((response as unknown) as HttpResponse));
    const wrapper = mount(
      <VisaulizationFlyout
        panelId={panelId}
        pplFilterValue={pplFilterValue}
        start={start}
        end={end}
        setToast={setToast}
        closeFlyout={closeFlyout}
        setPanelVisualizations={setPanelVisualizations}
        http={httpClientMock}
        pplService={pplService}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Test fetchSavedVisualizations response fail', () => {
    httpClientMock.get = jest.fn(() => Promise.reject('Unable to fetch saved visulaizations'));
    const wrapper = mount(
      <VisaulizationFlyout
        panelId={panelId}
        pplFilterValue={pplFilterValue}
        start={start}
        end={end}
        setToast={setToast}
        closeFlyout={closeFlyout}
        setPanelVisualizations={setPanelVisualizations}
        http={httpClientMock}
        pplService={pplService}
        isFlyoutReplacement={isFlyoutReplacement}
        replaceVisualizationId={replaceVisualizationId}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
