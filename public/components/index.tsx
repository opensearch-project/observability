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
import { 
  AppMountParameters,
  CoreStart
} from '../../../../src/core/public';
import { App } from './app';

export const Observability = (
  CoreStart: CoreStart,
  AppMountParameters: AppMountParameters,
  pplService: any,
  dslService: any
) => {
  ReactDOM.render(
    <App
      CoreStart={ CoreStart }
      pplService={ pplService }
      dslService ={ dslService }
    />,
    AppMountParameters.element
  );

  return () => ReactDOM.unmountComponentAtNode(AppMountParameters.element);
};
