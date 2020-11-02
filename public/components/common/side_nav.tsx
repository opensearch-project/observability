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
              href: '#dashboard',
            },
            {
              name: 'Traces',
              id: 2,
              href: '#traces',
            },
            {
              name: 'Services',
              id: 3,
              href: '#services',
            },
          ].map((item) => {
            return { ...item, isSelected: activeId === item.id };
          }),
        },
      ]}
    />
  );
}
