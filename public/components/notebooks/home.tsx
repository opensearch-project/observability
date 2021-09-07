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

import { I18nProvider } from '@osd/i18n/target/types/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  ChromeBreadcrumb,
  ChromeStart,
  HttpStart,
  NotificationsStart,
} from '../../../../../src/core/public';
import { AppPluginStartDependencies } from '../../types';
import { Main as NotebooksMain } from './public/components/main';

interface HomeProps extends RouteComponentProps {
  parentBreadcrumb: ChromeBreadcrumb;
  http: HttpStart;
  chrome: ChromeStart;
  notifications: NotificationsStart;
  DepsStart: AppPluginStartDependencies;
}

export const Home = (props: HomeProps) => {
  return (
    <I18nProvider>
      <>
        <NotebooksMain
          basename={''}
          DashboardContainerByValueRenderer={
            props.DepsStart.dashboard.DashboardContainerByValueRenderer
          }
          http={props.http}
          setBreadcrumbs={props.chrome.setBreadcrumbs}
        />
      </>
    </I18nProvider>
  );
};
