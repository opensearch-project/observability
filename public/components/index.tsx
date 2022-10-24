/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryManager } from 'common/query_manager';
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
  timestampUtils: any,
  queryManager: QueryManager,
  startPage?: String
) => {
  ReactDOM.render(
    <App
      coreStart={CoreStartProp}
      depsStart={DepsStart}
      pplService={pplService}
      dslService={dslService}
      savedObjects={savedObjects}
      timestampUtils={timestampUtils}
      queryManager={queryManager}
      startPage={startPage}
    />,
    AppMountParametersProp.element
  );

  return () => ReactDOM.unmountComponentAtNode(AppMountParametersProp.element);
};
