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
  // set items.isSelected based on location.hash passed in
  // tries to find an item where href is a prefix of the hash
  // if none will try to find an item where the hash is a prefix of href
  function setIsSelected(
    items: EuiSideNavItemType<React.ReactNode>[],
    hash: string,
    initial = true,
    reverse = false
  ): boolean {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.href && ((reverse && item.href.startsWith(hash)) || hash.startsWith(item.href))) {
        item.isSelected = true;
        return true;
      }
      if (item.items?.length && setIsSelected(item.items, hash, false, reverse)) return true;
    }
    return initial && setIsSelected(items, hash, false, !reverse);
  }

  const items = [
    {
      name: 'Observability',
      id: 0,
      items: [
        {
          name: 'Trace analytics',
          id: 1,
          href: '#/trace_analytics/home',
          items: [
            {
              name: 'Traces',
              id: 1.1,
              href: '#/trace_analytics/traces',
            },
            {
              name: 'Services',
              id: 1.2,
              href: '#/trace_analytics/services',
            },
          ],
        },
        {
          name: 'Event analytics',
          id: 2,
          href: '#/event_analytics',
        },
        {
          name: 'Operational panels',
          id: 3,
          href: '#/operational_panels/',
        },
        {
          name: 'Notebooks',
          id: 4,
          href: '#/notebooks',
        },
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
