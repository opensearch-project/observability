import { waitFor } from '@testing-library/dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DSLService from 'public/services/requests/dsl';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IToasts, NotificationsStart } from '../../../../../../../src/core/public';
import { QueryManager } from '../../../../../common/query_manager/ppl_query_manager';
import PPLService from '../../../../../public/services/requests/ppl';
import SavedObjects from '../../../../../public/services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from '../../../../../public/services/timestamp/timestamp';
import { coreStartMock } from '../../../../../test/__mocks__/coreMocks';
import { Explorer } from '../../explorer/explorer';

describe('Explorer component', () => {
  configure({ adapter: new Adapter() });
  const middlewares: any[] = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    queries: {
      pomjQYQBg4Jf5lv0c5Ke: {
        rawQuery:
          "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2022-11-08 09:03:50' and timestamp <= '2022-11-09 09:03:50'",
        finalQuery:
          "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2022-11-08 09:03:50' and timestamp <= '2022-11-09 09:03:50'",
        index: '',
        selectedTimestamp: 'timestamp',
        selectedDateRange: ['now/y', 'now'],
        0: 'now-24h',
        1: 'now',
        tabCreatedType: 'newTab',
        isLoaded: false,
      },
    },
    queryResults: {
      pomjQYQBg4Jf5lv0c5Ke: {
        schema: [
          { name: 'name1', type: 'string' },
          { name: 'name2', type: 'string' },
        ],
        dataRows: [
          ['data11', 'data12'],
          ['data21', 'data22'],
        ],
        total: 200,
        size: 200,
        jsonData: [
          {
            name1: 'data11',
            name2: 'data12',
          },
          {
            name1: 'data21',
            name2: 'data22',
          },
        ],
      },
    },
    fields: {
      pomjQYQBg4Jf5lv0c5Ke: {
        selectedFields: [],
        unselectedFields: [
          { name: 'name1', type: 'string' },
          { name: 'name2', type: 'string' },
        ],
        availableFields: [
          { name: 'name1', type: 'string' },
          { name: 'name2', type: 'string' },
        ],
        queriedFields: [],
      },
    },
    countDistribution: {
      pomjQYQBg4Jf5lv0c5Ke: {
        data: { name1: ['data11', 'data21'], name2: ['data12', 'data22'] },
        metaData: {
          fields: [
            { name: 'name1', type: 'string' },
            { name: 'name2', type: 'string' },
          ],
          size: 2,
          status: 200,
        },
        jsonData: [
          {
            name1: 'data11',
            name2: 'data12',
          },
          { name1: 'data21', name2: 'data22' },
        ],
      },
    },
    explorerVisualization: {},
    explorerVisualizationConfig: {},
  };
  const store = mockStore(initialState);
  const tabId = 'pomjQYQBg4Jf5lv0c5Ke';

  const dslService = ({
    http: jest.fn(),
    fetch: jest.fn(),
    fetchIndices: jest.fn(),
    fetchFields: jest.fn(),
  } as unknown) as DSLService;

  const core = coreStartMock;
  const pplService = new PPLService(core.http);
  const history = jest.fn() as any;
  history.replace = jest.fn();
  const setToast = jest.fn();
  const curSelectedTabId = { current: undefined };
  const notificationObj1: NotificationsStart = {
    toasts: ({ addError: jest.fn() } as unknown) as IToasts,
  };

  it('Renders Explorer component to run fetchData', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <Explorer
          pplService={pplService}
          dslService={dslService}
          history={history}
          savedObjectId={tabId}
          setToast={setToast}
          tabId={tabId}
          http={core.http}
          savedObjects={new SavedObjects(core.http)}
          timestampUtils={new TimestampUtils(dslService)}
          notifications={notificationObj1}
          curSelectedTabId={curSelectedTabId}
          queryManager={new QueryManager()}
        />
      </Provider>
    );
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  it('Renders Explorer component to run updateTabData', async () => {
    const updatedReduxState = {
      ...initialState,
      queries: {
        ...initialState.queries,
        pomjQYQBg4Jf5lv0c5Ke: {
          ...initialState.queries.pomjQYQBg4Jf5lv0c5Ke,
          savedObjectId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
      },
    };
    const updatedStore = mockStore(updatedReduxState);
    const wrapper = mount(
      <Provider store={updatedStore}>
        <Explorer
          pplService={pplService}
          dslService={dslService}
          history={history}
          savedObjectId={tabId}
          setToast={setToast}
          tabId={tabId}
          http={core.http}
          savedObjects={new SavedObjects(core.http)}
          timestampUtils={new TimestampUtils(dslService)}
          notifications={notificationObj1}
          curSelectedTabId={curSelectedTabId}
          queryManager={new QueryManager()}
        />
      </Provider>
    );
    wrapper.update();
    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
