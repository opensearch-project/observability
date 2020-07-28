import React from 'react'
import { EuiText } from '@elastic/eui'

export function PanelTitle({
  title,
  totalItems,
}: {
  title: string;
  totalItems?: number;
}) {
  return (
    <EuiText size='m'>
        <span style={{ color: '#3f3f3f', fontWeight: 500 }}>{title}</span>
        {totalItems && <span style={{ color: '#8a9596', fontWeight: 300 }}>{` (${totalItems})`}</span>}
    </EuiText>
  )
}
