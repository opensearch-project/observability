import { waitFor } from '@testing-library/dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { TEST_CONFIG_AVAILABILITY, TEST_DATA } from '../../../../../test/event_analytics_constants';
import { HttpResponse } from '../../../../../../../src/core/public';
import { QueryManager } from '../../../../../common/query_manager/ppl_query_manager';
import PPLService from '../../../../../public/services/requests/ppl';
import { samplePPLResponse } from '../../../../../test/panels_constants';
import { coreStartMock } from '../../../../../test/__mocks__/coreMocks';
import httpClientMock from '../../../../../test/__mocks__/httpClientMock';
import { TabContext } from '..';
import { DataConfigPanelItem } from '../../explorer/visualizations/config_panel/config_panes/config_controls/data_configurations_panel';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';

describe('DataConfigPanelItem component', () => {
  configure({ adapter: new Adapter() });
  const middlewares: any[] = [];
  const mockStore = configureStore(middlewares);
  const initialState = {};
  const store = mockStore(initialState);

  it('Renders DataConfigPanelItem component', async () => {
    const viz = {
      ...TEST_CONFIG_AVAILABILITY,
      data: {
        ...TEST_CONFIG_AVAILABILITY.data,
        query: {
          rawQuery:
            "source = opensearch_dashboards_sample_data_logs | where match(request,'filebeat')",
          finalQuery:
            "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2021-12-31 18:30:00' and timestamp <= '2022-11-17 06:37:08' | where match(request,'filebeat')",
          index: '',
          selectedTimestamp: 'timestamp',
          selectedDateRange: ['now/y', 'now'],
          tabCreatedType: 'redirect_tab',
          savedObjectId: 'MM0qHYMBVusSGvW09eu2',
          objectType: 'savedQuery',
          isLoaded: true,
        },
        userConfigs: {
          dataConfig: {
            ...TEST_DATA,
          },
        },
      },
    };
    const core = coreStartMock;
    const pplService = new PPLService(core.http);

    httpClientMock.post = jest.fn(() =>
      Promise.resolve((samplePPLResponse as unknown) as HttpResponse)
    );
    const wrapper = mount(
      <Provider store={store}>
        <TabContext.Provider
          value={{
            handleQueryChange: jest.fn(),
            pplService,
          }}
        >
          <DataConfigPanelItem
            fieldOptionList={[
              { label: 'agent', name: 'agent', type: 'string' },
              { label: 'bytes', name: 'bytes', type: 'long' },
            ]}
            visualizations={(viz as unknown) as IVisualizationContainerProps}
            queryManager={new QueryManager()}
          />
        </TabContext.Provider>
      </Provider>
    );
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
    wrapper.find('button[data-test-subj="visualizeEditorRenderButton"]').simulate('click');
  });
});
