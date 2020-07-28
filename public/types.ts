import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface TraceAnalyticsPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TraceAnalyticsPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
