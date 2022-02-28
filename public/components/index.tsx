/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../../src/core/public';
import { AppPluginStartDependencies } from '../types';
import { App } from './app';

export const Observability = (
  CoreStart: CoreStart,
  DepsStart: AppPluginStartDependencies,
  AppMountParameters: AppMountParameters,
  pplService: any,
  dslService: any,
  savedObjects: any,
  timestampUtils: any
) => {
  ReactDOM.render(
    <App
      CoreStart={CoreStart}
      DepsStart={DepsStart}
      pplService={pplService}
      dslService={dslService}
      savedObjects={savedObjects}
      timestampUtils={timestampUtils}
    />,
    AppMountParameters.element
  );

  return () => ReactDOM.unmountComponentAtNode(AppMountParameters.element);
};
