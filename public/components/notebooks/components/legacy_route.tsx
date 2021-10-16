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
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AppMountParameters } from '../../../../../../src/core/public';

export const LegacyRoute = (AppMountParameters: AppMountParameters) => {
  ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Redirect
          from="/"
          to={{
            pathname: location.pathname.replace('notebooks-dashboards', 'observability'),
            hash: `#/notebooks${location.hash.replace(/^#/, '')}${
              location.hash.includes('?') ? location.search.replace(/^\?/, '&') : location.search
            }`,
          }}
        />
      </Switch>
    </BrowserRouter>,
    AppMountParameters.element
  );
  return () => ReactDOM.unmountComponentAtNode(AppMountParameters.element);
};
