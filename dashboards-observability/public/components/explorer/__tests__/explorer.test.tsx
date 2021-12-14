/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import httpClientMock from '../../../../test/__mocks__/httpClientMock';
import { Explorer } from '../explorer';
import PPLService from '../../../services/requests/ppl';
import DSLService from '../../../services/requests/dsl';
import SavedObjects from '../../../services/saved_objects/event_analytics/saved_objects';
import TimestampUtils from '../../../services/timestamp/timestamp';
import { coreStartMock } from '../../../../test/__mocks__/coreMocks';

describe.skip('Event explorer component', () => {
  configure({ adapter: new Adapter() });

  it('Renders explorer component', async () => {
    const pplService = new PPLService(httpClientMock);
    const dslService = new DSLService(httpClientMock);
    const tabId = 'query-panel-1';
    const savedObjects = new SavedObjects(httpClientMock);
    const timestampUtils = new TimestampUtils(dslService);
    const setToast = jest.fn();
    const history = jest.fn() as any;
    history.replace = jest.fn();
    history.push = jest.fn();
    const notifications = coreStartMock.notifications;
    const savedObjectId = 'JIcoln0BYMuJGDsOLTnM';
    
  const wrapper = mount(
    <Explorer 
      pplService={pplService}
      dslService={dslService}
      tabId={tabId}
      savedObjects={savedObjects}
      timestampUtils={timestampUtils}
      setToast={setToast}
      history={history}
      notifications={notifications}
      savedObjectId={savedObjectId}
    />
  );
  
  wrapper.update();

  await waitFor(() => {
    expect(wrapper).toMatchSnapshot();
  });
  });
});