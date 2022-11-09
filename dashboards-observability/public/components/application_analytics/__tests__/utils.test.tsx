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

describe('Utils application analytics helper functions', () => {
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
    expect(removeTabData(jest.fn(), 'pomjQYQBg4Jf5lv0c5Ke', 'hQ_MOIQB3_rWtxyd0C4T'));
  });
  it('validate initializeTabData function', () => {
    expect(
      initializeTabData(jest.fn(), 'application-analytics-tab-hQ_MOIQB3_rWtxyd0C4T', 'newTab')
    );
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
