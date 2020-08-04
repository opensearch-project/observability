import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TraceAnalyticsPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TraceAnalyticsPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
