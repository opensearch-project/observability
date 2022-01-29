/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiBreadcrumb } from '@elastic/eui';
import React from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { CoreStart } from '../../../../../src/core/public';

export interface UptimeProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: EuiBreadcrumb[];
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

export const Home = ({ http, chrome, parentBreadcrumb, pplService, renderProps }: UptimeProps) => {
  return <div>Welcome to Uptime!</div>;
};
