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
import { I18nProvider } from '@osd/i18n/react';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import { LogExplorer } from './logExplorer/logExplorer';

interface ObservabilityAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  navigation: NavigationPublicPluginStart;
}

export const App = ({
  basename,
  notifications,
  http,
  chrome,
  plugins
}: ObservabilityAppDeps) => {
  return (
    <I18nProvider>
      <>
        <LogExplorer
          http={ http }
          plugins={ plugins }
        />
      </>
    </I18nProvider>
  );
};