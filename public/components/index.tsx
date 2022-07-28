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
  CoreStartProp: CoreStart,
  DepsStart: AppPluginStartDependencies,
  AppMountParametersProp: AppMountParameters,
  pplService: any,
  dslService: any,
  savedObjects: any,
  timestampUtils: any
) => {
  ReactDOM.render(
    <App
      CoreStartProp={CoreStartProp}
      DepsStart={DepsStart}
      pplService={pplService}
      dslService={dslService}
      savedObjects={savedObjects}
      timestampUtils={timestampUtils}
    />,
    AppMountParametersProp.element
  );

  return () => ReactDOM.unmountComponentAtNode(AppMountParametersProp.element);
};
