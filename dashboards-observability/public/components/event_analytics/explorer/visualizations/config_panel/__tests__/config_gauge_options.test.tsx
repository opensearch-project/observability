/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { ConfigGaugeValueOptions } from '../config_panes/config_controls/config_gauge_options';
import {
  EXPLORER_VISUALIZATIONS,
  GAUGE_TEST_VISUALIZATIONS_DATA,
} from '../../../../../../../test/event_analytics_constants';
import { TabContext } from '../../../../hooks';
import PPLService from '../../../../../../services/requests/ppl';
import httpClientMock from '../../../../../../../test/__mocks__/httpClientMock';

jest.mock('!!raw-loader!./default.layout.spec.hjson', () => 'MOCK HJSON STRING');

describe('Config panel component', () => {
  configure({ adapter: new Adapter() });
  const tabId = 'query-panel-1';
  const curVisIdG = 'gauge';
  const pplService = new PPLService(httpClientMock);
  const mockChangeIsValidConfigOptionState = jest.fn();

  it('Renders Gauge config panel with visualization data', async () => {
    const vizStateDemo = [
      {
        series: [
          { name: 'count()', type: 'integer' },
          { name: 'tags', type: 'text' },
          { name: 'timesfield', type: 'timestamp' },
        ],
      },
    ];
    const gaugeWrapper = mount(
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
        <ConfigGaugeValueOptions
          visualizations={GAUGE_TEST_VISUALIZATIONS_DATA}
          schemas={[{ component: '', name: '', mapTo: 'series' }]}
          vizState={vizStateDemo}
          handleConfigChange={mockChangeIsValidConfigOptionState}
          sectionName={''}
        />
      </TabContext.Provider>
    );
    gaugeWrapper.update();

    await waitFor(() => {
      expect(gaugeWrapper).toMatchSnapshot();
    });
  });
});
