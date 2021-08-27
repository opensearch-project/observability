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
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChromeBreadcrumb, ChromeStart, HttpStart } from '../../../../../src/core/public';
import { renderPageWithSidebar } from '../common/side_nav';

interface HomeProps {
  parentBreadcrumb: ChromeBreadcrumb;
  http: HttpStart;
  chrome: ChromeStart;
}

export const Home = (props: HomeProps) => {
  const parentBreadcrumbs = [
    props.parentBreadcrumb,
    {
      text: 'Trace analytics',
      href: '#/trace_analytics/home',
    },
  ];

  return (
    <>
      <Route
        exact
        path={['/trace_analytics', '/trace_analytics/home']}
        render={(props: RouteComponentProps) => renderPageWithSidebar(<div>Dashboard</div>)}
      />
      <Route
        exact
        path="/trace_analytics/traces"
        render={(props: RouteComponentProps) => renderPageWithSidebar(<div>Traces</div>)}
      />
      <Route
        path="/trace_analytics/traces/:id+"
        render={(props) => <div>{`Trace ${props.match.params.id}`}</div>}
      />
      <Route
        exact
        path="/trace_analytics/services"
        render={(props: RouteComponentProps) => renderPageWithSidebar(<div>Services</div>)}
      />
      <Route
        path="/trace_analytics/services/:id+"
        render={(props) => <div>{`Service ${props.match.params.id}`}</div>}
      />
    </>
  );
};
