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

import { EuiPage, EuiPageBody, EuiPageSideBar, EuiSideNav, EuiText } from '@elastic/eui';
import React from 'react';

export const renderPageWithSidebar = (BodyComponent: JSX.Element, activeId = 1) => {
  function SideNav({ activeId }: { activeId: number }) {
    return (
      <EuiSideNav
        items={[
          {
            name: 'Observability',
            id: 0,
            items: [
              {
                name: 'Application analytics',
                id: 1,
                href: '#/application_analytics/home',
              },
              {
                name: 'Trace analytics',
                id: 2,
                href: '#/trace_analytics/home',
                items: [
                  {
                    name: 'Traces',
                    id: 2.1,
                    href: '#/trace_analytics/traces'
                  },
                  {
                    name: 'Services',
                    id: 2.2, 
                    href: '#/trace_analytics/services'
                  }
                ]
              },
              {
                name: 'Event analytics',
                id: 3,
                href: '#/explorer/home',
              },
              {
                name: 'Custom operational panels',
                id: 4,
                href: '#/custom_panels/home',
              }
            ].map((item) => {
              return { ...item, isSelected: activeId === item.id };
            }),
          },
        ]}
      />
    );
  }

  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav activeId={activeId} />
      </EuiPageSideBar>
      <EuiPageBody>{BodyComponent}</EuiPageBody>
    </EuiPage>
  );
};
