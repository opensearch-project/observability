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

import React from 'react';
import ReactDOM from 'react-dom';
import { 
  AppMountParameters,
  CoreStart
} from '../../../../src/core/public';
import { AppPluginStartDependencies } from '../types';
import { App } from './app';

export const Observability = (
  { notifications, http, chrome }: CoreStart,
  { navigation, dashboard }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters,
) => {
  ReactDOM.render(
    <App
      basename={ appBasePath }
      notifications={ notifications }
      http={ http }
      chrome={ chrome }
      navigation={ navigation }
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
