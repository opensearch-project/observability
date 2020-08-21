import { EuiText } from '@elastic/eui';
import React from 'react';

export function PanelTitle({ title, totalItems }: { title: string; totalItems?: number }) {
  return (
    <EuiText size="m">
      <span style={{ color: '#3f3f3f', fontWeight: 500 }}>{title}</span>
      {totalItems && (
        <span style={{ color: '#8a9596', fontWeight: 300 }}>{` (${totalItems})`}</span>
      )}
    </EuiText>
  );
}

export function renderBenchmark(value: number) {
  if (typeof value !== 'number')
    return null;
  const benchmarkColor = value === 0 ? '#9ea8a9' : value > 0 ? '#c23f25' : '#3f7e23';
  const benchmarkArrow = value === 0 ? '-' : value > 0 ? '\u25B4' : '\u25BE';
  return (
    <EuiText size="s" style={{ color: benchmarkColor }}>
      {`${Math.abs(value)}% ${benchmarkArrow}`}
    </EuiText>
  );
}

export function truncateText(text: string) {
  const truncatePoint = 24;
  if (text.length > truncatePoint)
    return `${text.slice(0, truncatePoint - 3)}...`;
  return text;
}