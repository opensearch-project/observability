/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import { rootReducer } from '../reducers';

const initialState = {};

export const configureStore = (initialState: {}) => {

  const middleware: Array<any> = [];

  const composeEnhancers = 
  typeof window === 'object' &&
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    
    // add extendsion options here
    name: 'Observability', 
    // actionsBlacklist: ['REDUX_STORAGE_SAVE']

  }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  );

  return createStore(
      rootReducer,
      initialState,
      enhancer
  );
}

export const store = configureStore(initialState);