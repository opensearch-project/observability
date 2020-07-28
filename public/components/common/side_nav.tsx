import React from 'react'
import { EuiText } from '@elastic/eui'
import { EuiSideNav } from '@elastic/eui';

export function SideNav({ activeId }) {
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
          ].map(item => { return { ...item, isSelected: activeId === item.id } })
        }
      ]}
    />
  )
}
