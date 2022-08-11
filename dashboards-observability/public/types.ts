/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { DashboardStart } from '../../../src/plugins/dashboard/public';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { Observable } from 'rxjs';

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  dashboard: DashboardStart;
}

export interface ObservabilitySetup {}

export interface ObservabilityStart {}

export interface DashboardListSource {
  name: string;
  listProviderFn: () => Observable<DashboardListItem>;
}

export type DashboardListSources = Array<DashboardListSource>;

export interface DashboardListItem {
  id: string;
  title: string;
  description: string;
  url: string;
  listType: string;
}

export type DashboardListItems = DashboardListItem[];
