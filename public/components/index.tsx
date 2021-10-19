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
  savedObjects: any
) => {
  ReactDOM.render(
    <App
      CoreStart={ CoreStart }
      DepsStart={DepsStart} 
      pplService={ pplService }
      dslService ={ dslService }
      savedObjects={ savedObjects }
    />,
    AppMountParameters.element
  );

  return () => ReactDOM.unmountComponentAtNode(AppMountParameters.element);
};
