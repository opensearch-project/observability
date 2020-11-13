/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import { EuiPage, EuiPageBody, EuiPageSideBar, EuiSideNav, EuiText } from '@elastic/eui';
import React from 'react';

export const renderPageWithSidebar = (BodyComponent: JSX.Element, activeId = 1) => {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <SideNav activeId={activeId} />
      </EuiPageSideBar>
      <EuiPageBody>{BodyComponent}</EuiPageBody>
    </EuiPage>
  );
};

export function SideNav({ activeId }: { activeId: number }) {
  return (
    <EuiSideNav
      items={[
        {
          name: <EuiText>Trace Analytics</EuiText>,
          id: 0,
          items: [
            {
              name: 'Dashboard',
              id: 1,
              href: '#/dashboard',
            },
            {
              name: 'Traces',
              id: 2,
              href: '#/traces',
            },
            {
              name: 'Services',
              id: 3,
              href: '#/services',
            },
          ].map((item) => {
            return { ...item, isSelected: activeId === item.id };
          }),
        },
      ]}
    />
  );
}
