/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PPLService from '../../../../../services/requests/ppl';
import React from 'react';
import { VisaulizationFlyout } from '../visualization_flyout';
import httpClientMock from '../../../../../../test/__mocks__/httpClientMock';
import { ShortDate } from '@elastic/eui';

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
