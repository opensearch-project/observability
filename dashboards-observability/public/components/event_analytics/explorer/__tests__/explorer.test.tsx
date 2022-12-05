/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { coreStartMock } from '../../../../../test/__mocks__/coreMocks';
import DSLService from 'public/services/requests/dsl';
import PPLService from 'public/services/requests/ppl';
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import { Explorer } from '../explorer';
import TimestampUtils from '../../../../services/timestamp/timestamp'
import { NotificationsStart } from '../../../../../../../src/core/public';
import rootReducer from '../../../../framework/redux/reducers';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

describe('Create Page', () => {
  configure({ adapter: new Adapter() });

  it('renders with one trace selected', () => {
    const core = coreStartMock;
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const setStartTime = jest.fn();
    const setEndTime = jest.fn();
    const notificationsMock : NotificationsStart = {toasts: {get$: jest.fn(), add: jest.fn(), remove: jest.fn(), addSuccess: jest.fn(), addWarning: jest.fn(), addDanger: jest.fn(), addError: jest.fn(), addInfo: jest.fn()}}
    const dslService = ({
      http: jest.fn(),
      fetch: jest.fn(),
      fetchIndices: jest.fn(),
      fetchFields: jest.fn(),
    } as unknown) as DSLService;
    const pplService = ({
      http: jest.fn(),
      fetch: jest.fn(),
    } as unknown) as PPLService;
    const traceFilters = [
      {
        field: 'traceGroup',
        operator: 'is',
        value: 'test.auto',
        inverted: false,
        disabled: false,
      },
    ];
    const utils = render(
        <Provider store={store}>
      <Explorer
        history={{location: {search: '?q={%22rawQuery%22:%22source%20=%20opensearch_dashboards_sample_data_logs%20%22,%22finalQuery%22:%22%22,%22index%22:%22%22,%22selectedPatternField%22:%22message%22,%22patternRegex%22:%22[a-zA-Z\\\\d]%22,%22filteredPattern%22:%22%22,%22selectedTimestamp%22:%22%22,%22selectedDateRange%22:[%22now-15m%22,%22now%22],%22url%22:%22%22,%22tabCreatedType%22:%22newTab%22}'},push: jest.fn()}}
        http={core.http}
        pplService={pplService}
        startTime="now-24h"
        setStartTime={setStartTime}
        endTime="now"
        setEndTime={setEndTime}
        dslService={dslService}
        tabId={"0"}
        key={'explorer_0'}
        notifications={notificationsMock}
        savedObjectId={""}
        setToast={jest.fn()}
        timestampUtils={new TimestampUtils(dslService, pplService)}
      />
      </Provider>)
    // the snapshot has UI matching the query passed in via history.location.search
    expect(utils).toMatchSnapshot();
  });
})

 