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