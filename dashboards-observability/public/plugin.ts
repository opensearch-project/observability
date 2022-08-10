/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  observabilityID,
  observabilityPluginOrder,
  observabilityTitle,
} from '../common/constants/shared';
import PPLService from './services/requests/ppl';
import DSLService from './services/requests/dsl';
import TimestampUtils from './services/timestamp/timestamp';
import SavedObjects from './services/saved_objects/event_analytics/saved_objects';
import { AppPluginStartDependencies, ObservabilitySetup, ObservabilityStart } from './types';
import { convertLegacyNotebooksUrl } from './components/notebooks/components/helpers/legacy_route_helpers';
import { convertLegacyTraceAnalyticsUrl } from './components/trace_analytics/components/common/legacy_route_helpers';
import { uiSettingsService } from '../common/utils';
import { DashboardSetup } from '../../../src/plugins/dashboard/public';
import { PluginInitializerContext } from '../../../src/core/server';
import { DashboardListItem } from '../../../src/plugins/dashboard/public/application/legacy_app';
import { from, Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { fetchPanelsList } from "../public/components/custom_panels/helpers/utils";
export class ObservabilityPlugin implements Plugin<ObservabilitySetup, ObservabilityStart> {
  constructor(private initializerContext: PluginInitializerContext) { }

  public setup(core: CoreSetup,
    { dashboard }: { dashboard?: DashboardSetup }): ObservabilitySetup {

    uiSettingsService.init(core.uiSettings, core.notifications);

    // redirect legacy notebooks URL to current URL under observability
    if (window.location.pathname.includes('notebooks-dashboards')) {
      window.location.assign(convertLegacyNotebooksUrl(window.location));
    }

    // redirect legacy trace analytics URL to current URL under observability
    if (window.location.pathname.includes('trace-analytics-dashboards')) {
      window.location.assign(convertLegacyTraceAnalyticsUrl(window.location));
    }

    // Fetches all saved Custom Panels
    const fetchPanelsFn: () => Observable<DashboardListItem> = () => {
      return from(fetchPanelsList(core.http))
        .pipe(
          mergeMap(i => i),
          map(convertPanelItemToDashboardListItem)
        );
    };

    const convertPanelItemToDashboardListItem = (item: any): DashboardListItem => {
      return {
        id: item.id,
        title: item.name,
        type: "Observability Panel",
        description: "...",
        url: `/app/${observabilityID}#/operational_panels/${item.id}`,
        listType: "observabiliity-panel"
      }
    }

    const id: string = this.initializerContext.opaqueId.description!;

    dashboard?.registerDashboardListSource(id, fetchPanelsFn);

    core.application.register({
      id: observabilityID,
      title: observabilityTitle,
      category: {
        id: 'opensearch',
        label: 'OpenSearch Plugins',
        order: 2000,
      },
      order: observabilityPluginOrder,
      async mount(params: AppMountParameters) {
        const { Observability } = await import('./components/index');
        const [coreStart, depsStart] = await core.getStartServices();
        const pplService = new PPLService(coreStart.http);
        const dslService = new DSLService(coreStart.http);
        const savedObjects = new SavedObjects(coreStart.http);
        const timestampUtils = new TimestampUtils(dslService);
        return Observability(
          coreStart,
          depsStart as AppPluginStartDependencies,
          params,
          pplService,
          dslService,
          savedObjects,
          timestampUtils
        );
      },
    });

    // Return methods that should be available to other plugins
    return {
      someOtherValue: () => "Hello",
      register: () => {
        console.log("Registering Observability Plugin to parent plugin context")
      }
    };
  }
  public start(core: CoreStart): ObservabilityStart {
    return {};
  }
  public stop() { }
}
