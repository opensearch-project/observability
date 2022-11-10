import { EuiDescriptionList, EuiSpacer, EuiText } from '@elastic/eui';
import PPLService from 'public/services/requests/ppl';
import React from 'react';
import { HttpResponse } from '../../../../../../src/core/public';
import { sampleAppAnalyticsPanel, sampleApplication } from '../../../../test/panels_constants';
import httpClientMock from '../../../../test/__mocks__/httpClientMock';
import {
  calculateAvailability,
  fetchAppById,
  fetchPanelsVizIdList,
  getListItem,
  initializeTabData,
  isNameValid,
  removeTabData,
} from '../helpers/utils';
import configureStore from 'redux-mock-store';

describe('Utils application analytics helper functions', () => {

  const middlewares: any[] = [];
  const mockStore = configureStore(middlewares);
  const initialState = {
    queries: {
      'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T': {
        rawQuery: '',
        finalQuery:
          "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2022-11-08 09:03:50' and timestamp <= '2022-11-09 09:03:50' ",
        index: '',
        selectedTimestamp: 'timestamp',
        0: 'now-24h',
        1: 'now',
        tabCreatedType: 'newTab',
        isLoaded: true,
      },
      'application-analytics-tab-1': {
        rawQuery: '',
        finalQuery:
          "source=opensearch_dashboards_sample_data_logs | where timestamp >= '2022-11-08 09:03:50' and timestamp <= '2022-11-09 09:03:50' ",
        index: '',
        selectedTimestamp: 'timestamp',
        0: 'now-24h',
        1: 'now',
        tabCreatedType: 'newTab',
        isLoaded: true,
      },
    },
  };
  const store = mockStore(initialState);
  const pplService = ({
    http: jest.fn(),
    fetch: jest.fn(),
  } as unknown) as PPLService;

  it('validate getListItem function', () => {
    const title = 'Name';
    const description = '0';
    const titleComponent = (
      <EuiText size="s" color="subdued" style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
        {title}
      </EuiText>
    );

    const descriptionComponent = (
      <EuiText
        size="s"
        style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}
      >
        <b>{description}</b>
      </EuiText>
    );
    const result = (
      <div key={`list-item-${title}`}>
        <EuiDescriptionList
          data-test-subj={`${title}DescriptionList`}
          listItems={[
            {
              title: titleComponent,
              description: descriptionComponent || '-',
            },
          ]}
          type="column"
          align="center"
          compressed
        />
        <EuiSpacer size="s" />
      </div>
    );
    expect(getListItem(title, description)).toEqual(result);
  });

  it('validate isNameValid function', () => {
    const name = 'Custom Panel 1';
    const existingNames = ['Custom Panel 2', 'Custom Panel 3'];
    let longName = '';
    for (let i = 0; i < 25; i++) {
      longName += name;
    }
    expect(isNameValid(name, existingNames)).toEqual([]);
    expect(isNameValid(name, [name, ...existingNames])).toEqual(['Name must be unique.']);
    expect(isNameValid('', existingNames)).toEqual(['Name must not be empty.']);
    expect(isNameValid(longName, existingNames)).toEqual(['Name must be less than 50 characters.']);
  });

  it('validate fetchAppById function', () => {
    const applicationId = 'gw_KOIQB3_rWtxydGC7x';
    const appPanelDetails = {
      availability: { name: '', color: '', availabilityVisId: '' },
      baseQuery: 'source = opensearch_dashboards_sample_data_logs ',
      dateCreated: 1667400079600,
      dateModified: 1667400079756,
      description: '',
      id: 'gw_KOIQB3_rWtxydGC7x',
      name: 'Test',
      panelId: 'hA_KOIQB3_rWtxydGS5n',
      servicesEntities: ['service 1'],
      traceGroups: ['trace group 1'],
    };
    httpClientMock.get = jest.fn(() =>
      Promise.resolve((appPanelDetails as unknown) as HttpResponse)
    );
    expect(
      fetchAppById(
        httpClientMock,
        pplService,
        applicationId,
        jest.fn(),
        jest.fn(),
        jest.fn(),
        jest.fn()
      )
    ).toBeTruthy();
  });
  it('validate removeTabData function', () => {
    removeTabData(store.dispatch, 'pomjQYQBg4Jf5lv0c5Ke', 'hQ_MOIQB3_rWtxyd0C4T');
    const actions = store.getActions();
    const expectedPayload = [
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queries/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'fields/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queryResults/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'explorerVizConfigs/reset',
      },
      {
        payload: {
          newSelectedQueryTab: 'hQ_MOIQB3_rWtxyd0C4T',
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queryTabs/removeTab',
      },
    ];
    expect(actions).toEqual(expectedPayload);
  });
  it('validate initializeTabData function', () => {
    initializeTabData(store.dispatch, 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T', 'newTab');
    const actions = store.getActions();
    const expectedPayload = [
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queries/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'fields/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queryResults/remove',
      },
      {
        payload: {
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'explorerVizConfigs/reset',
      },
      {
        payload: {
          newSelectedQueryTab: 'hQ_MOIQB3_rWtxyd0C4T',
          tabId: 'pomjQYQBg4Jf5lv0c5Ke',
        },
        type: 'queryTabs/removeTab',
      },
      {
        payload: {
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'queries/init',
      },
      {
        payload: {
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'queryResults/init',
      },
      {
        payload: {
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'fields/init',
      },
      {
        payload: {
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'queryTabs/addTab',
      },
      {
        payload: {
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'explorerVizConfigs/init',
      },
      {
        payload: {
          query: {
            tabCreatedType: 'newTab',
          },
          tabId: 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T',
        },
        type: 'queries/changeQuery',
      },
    ];
    expect(actions).toEqual(expectedPayload);
  });
  it('validate calculateAvailability function', () => {
    httpClientMock.get = jest.fn(() =>
      Promise.resolve((sampleAppAnalyticsPanel as unknown) as HttpResponse)
    );
    expect(calculateAvailability(httpClientMock, pplService, sampleApplication, '', jest.fn()));
  });
  it('validate fetchPanelsVizIdList function', () => {
    httpClientMock.get = jest.fn(() =>
      Promise.resolve((sampleAppAnalyticsPanel as unknown) as HttpResponse)
    );
    expect(fetchPanelsVizIdList(httpClientMock, 'hA_KOIQB3_rWtxydGS5n'));
  });
});
