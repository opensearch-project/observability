/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigPanel } from '../config_panel';
import {
  TEST_VISUALIZATIONS_DATA,
  EXPLORER_VISUALIZATIONS,
  LINE_TEST_VISUALIZATIONS_DATA,
  GAUGE_TEST_VISUALIZATIONS_DATA,
  HEATMAP_TEST_VISUALIZATIONS_DATA,
} from '../../../../../../../test/event_analytics_constants';
import { TabContext } from '../../../../hooks';
import PPLService from '../../../../../../services/requests/ppl';
import httpClientMock from '../../../../../../../test/__mocks__/httpClientMock';

jest.mock('!!raw-loader!./default.layout.spec.hjson', () => 'MOCK HJSON STRING');

describe('Config panel component', () => {
  configure({ adapter: new Adapter() });

  it('Renders config panel with visualization data', async () => {
    const setCurVisId = jest.fn();
    const tabId = 'query-panel-1';
    const curVisId = 'bar';
    const pplService = new PPLService(httpClientMock);
    const mockChangeIsValidConfigOptionState = jest.fn();

    const wrapper = mount(
      <TabContext.Provider
        value={{
          tabId,
          curVisId,
          dispatch: jest.fn(),
          changeVisualizationConfig: jest.fn(),
          explorerVisualizations: EXPLORER_VISUALIZATIONS,
          setToast: jest.fn(),
          pplService: pplService,
        }}
      >
        <ConfigPanel
          visualizations={TEST_VISUALIZATIONS_DATA}
          setCurVisId={setCurVisId}
          changeIsValidConfigOptionState={mockChangeIsValidConfigOptionState}
        />
      </TabContext.Provider>
    );

    const heatMapWrapper = mount(
      <TabContext.Provider
        value={{
          tabId,
          curVisId,
          dispatch: jest.fn(),
          changeVisualizationConfig: jest.fn(),
          explorerVisualizations: EXPLORER_VISUALIZATIONS,
          setToast: jest.fn(),
          pplService,
        }}
      >
        <ConfigPanel
          visualizations={HEATMAP_TEST_VISUALIZATIONS_DATA}
          setCurVisId={setCurVisId}
          changeIsValidConfigOptionState={mockChangeIsValidConfigOptionState}
        />
      </TabContext.Provider>
    );

    const lineWrapper = mount(
      <TabContext.Provider
        value={{
          tabId,
          curVisId,
          dispatch: jest.fn(),
          changeVisualizationConfig: jest.fn(),
          explorerVisualizations: EXPLORER_VISUALIZATIONS,
          setToast: jest.fn(),
          pplService,
        }}
      >
        <ConfigPanel
          visualizations={LINE_TEST_VISUALIZATIONS_DATA}
          setCurVisId={setCurVisId}
          changeIsValidConfigOptionState={mockChangeIsValidConfigOptionState}
        />
      </TabContext.Provider>
    );

    const gaugeWrapper = mount(
      <TabContext.Provider
        value={{
          tabId,
          curVisId,
          dispatch: jest.fn(),
          changeVisualizationConfig: jest.fn(),
          explorerVisualizations: EXPLORER_VISUALIZATIONS,
          setToast: jest.fn(),
          pplService,
        }}
      >
        <ConfigPanel
          visualizations={GAUGE_TEST_VISUALIZATIONS_DATA}
          setCurVisId={setCurVisId}
          changeIsValidConfigOptionState={mockChangeIsValidConfigOptionState}
        />
      </TabContext.Provider>
    );

    wrapper.update();
    heatMapWrapper.update();
    lineWrapper.update();
    gaugeWrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
      expect(heatMapWrapper).toMatchSnapshot();
      expect(lineWrapper).toMatchSnapshot({});
      expect(gaugeWrapper).toMatchSnapshot({});
    });
  });
});
