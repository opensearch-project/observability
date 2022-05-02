/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiSideNav,
  EuiSideNavItemType,
  EuiSwitch,
} from '@elastic/eui';
import React from 'react';
import { useState } from 'react';
import { toMountPoint } from '../../../../../src/plugins/opensearch_dashboards_react/public';
import { uiSettingsService } from '../../../common/utils';

export function ObservabilitySideBar(props: { children: React.ReactNode }) {
  // set items.isSelected based on location.hash passed in
  // tries to find an item where href is a prefix of the hash
  // if none will try to find an item where the hash is a prefix of href
  function setIsSelected(
    items: EuiSideNavItemType<React.ReactNode>[],
    hash: string,
    initial = true,
    reverse = false
  ): boolean {
    // Default page is Events Analytics
    // But it is kept as second option in side nav
    if (hash === '#/') {
      items[0].items[2].isSelected = true;
      return true;
    }
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
          name: 'Application analytics',
          id: 1,
          href: '#/application_analytics',
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
          href: '#/event_analytics',
        },
        {
          name: 'Operational panels',
          id: 4,
          href: '#/operational_panels/',
        },
        {
          name: 'Notebooks',
          id: 5,
          href: '#/notebooks',
        },
        {
          name: 'Synthetics',
          id: 6,
          href: '#/synthetics',
        },
      ],
    },
  ];
  setIsSelected(items, location.hash);
  const [isDarkMode, setIsDarkMode] = useState(uiSettingsService.get('theme:darkMode'));

  return (
    <EuiPage>
      <EuiPageSideBar>
        <EuiFlexGroup
          direction="column"
          justifyContent="spaceBetween"
          style={{ height: '100%' }}
          gutterSize="none"
        >
          <EuiFlexItem>
            <EuiSideNav items={items} />
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ marginBottom: 20 }}>
            <EuiSwitch
              label="Dark mode"
              checked={isDarkMode}
              onChange={() => {
                uiSettingsService.set('theme:darkMode', !isDarkMode).then((resp) => {
                  setIsDarkMode(!isDarkMode);
                  uiSettingsService.addToast({
                    title: 'Theme setting changes require you to reload the page to take effect.',
                    text: toMountPoint(
                      <>
                        <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
                          <EuiFlexItem grow={false}>
                            <EuiButton size="s" onClick={() => window.location.reload()}>
                              Reload page
                            </EuiButton>
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      </>
                    ),
                    color: 'success',
                  });
                });
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageSideBar>
      <EuiPageBody>{props.children}</EuiPageBody>
    </EuiPage>
  );
}
