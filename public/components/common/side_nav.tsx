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

import { EuiPage, EuiPageBody, EuiPageSideBar, EuiSideNav, EuiSideNavItemType } from '@elastic/eui';
import React from 'react';

export const renderPageWithSidebar = (BodyComponent: React.ReactNode) => {
  function setIsSelected(items: EuiSideNavItemType<React.ReactNode>[], hash: string) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.href === hash) {
        item.isSelected = true;
        return true;
      }
      if (item.items?.length && setIsSelected(item.items, hash)) return true;
    }
    return false;
  }

  const items = [
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
              href: '#/trace_analytics/traces',
            },
            {
              name: 'Services',
              id: 2.2,
              href: '#/trace_analytics/services',
            },
          ],
        },
        {
          name: 'Event analytics',
          id: 3,
          href: '#/explorer/home',
        },
        {
          name: 'Operational panels',
          id: 4,
          href: '#/operational_panels/',
        }
      ],
    },
  ];
  setIsSelected(items, location.hash);

  return (
    <EuiPage>
      <EuiPageSideBar>
        <EuiSideNav items={items} />
      </EuiPageSideBar>
      <EuiPageBody>{BodyComponent}</EuiPageBody>
    </EuiPage>
  );
};
