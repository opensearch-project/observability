import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { TraceAnalyticsApp } from './components/app';

export const renderApp = (
  { notifications, http, chrome }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <TraceAnalyticsApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      chrome={chrome}
      navigation={navigation}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
