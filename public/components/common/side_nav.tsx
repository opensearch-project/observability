import { EuiSideNav, EuiText } from '@elastic/eui';
import React from 'react';

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
