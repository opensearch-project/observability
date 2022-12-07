/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { waitFor } from '@testing-library/react';
import { SearchBar } from '../search_bar';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../../framework/redux/reducers';

describe('Search Bar Component', () => {
  configure({ adapter: new Adapter() });
  const store = createStore(rootReducer, applyMiddleware(thunk));

  it('Search Side Bar Component with no available metrics', async () => {
    const setSearch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <SearchBar setSearch={setSearch} />
      </Provider>
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('Search Side Bar Component with available metrics', async () => {
    const setSearch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <SearchBar setSearch={setSearch} />
      </Provider>
    );

    wrapper.update();

    await waitFor(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
