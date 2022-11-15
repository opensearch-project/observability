/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigPanelOptionGauge } from '../config_panes/config_controls/config_panel_option_gauge';
import {
  TEST_VISUALIZATIONS_DATA,
  EXPLORER_VISUALIZATIONS,
  GAUGE_TEST_VISUALIZATIONS_DATA,
} from '../../../../../../../test/event_analytics_constants';
import { TabContext } from '../../../../hooks';
import PPLService from '../../../../../../services/requests/ppl';
import httpClientMock from '../../../../../../../test/__mocks__/httpClientMock';

jest.mock('!!raw-loader!./default.layout.spec.hjson', () => 'MOCK HJSON STRING');

describe('Config panel component', () => {
  configure({ adapter: new Adapter() });
  const setCurVisId = jest.fn();
  const tabId = 'query-panel-1';
  const curVisIdG = 'gauge';
  const pplService = new PPLService(httpClientMock);
  const mockChangeIsValidConfigOptionState = jest.fn();

  const gaugeWrapperOption = mount(
    <TabContext.Provider
      value={{
        tabId,
        curVisIdG,
        dispatch: jest.fn(),
        changeVisualizationConfig: jest.fn(),
        explorerVisualizations: EXPLORER_VISUALIZATIONS,
        setToast: jest.fn(),
        pplService,
      }}
    >
      <ConfigPanelOptionGauge
        visualizations={TEST_VISUALIZATIONS_DATA}
        vizState={''}
        panelOptionsValues={{ title: '', description: '', numberOfGauges: 1 }}
        handleConfigChange={mockChangeIsValidConfigOptionState}
      />
    </TabContext.Provider>
  );

  it('Renders config panel with Gauge Option', async () => {
    await waitFor(() => {
      expect(gaugeWrapperOption).toMatchSnapshot();
    });
  });
});
