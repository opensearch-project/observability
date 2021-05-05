/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { 
  AppMountParameters,
  CoreStart
 } from '../../../../src/core/public';
import { plugin } from '../../../../src/plugins/data/server';
 import { DiscoverStartPlugins } from '../../../../src/plugins/discover/public/plugin';
 import { AppPluginStartDependencies } from '../types';
import { App } from './app';

export const Observability = (
  { notifications, http, chrome }: CoreStart,
  // { navigation, dashboard }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters,
  plugins: DiscoverStartPlugins
) => {
  ReactDOM.render(
    <App
      basename={ appBasePath }
      notifications={ notifications }
      http={ http }
      chrome={ chrome }
      // plugins={ plugins }
      //navigation={ navigation }
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
