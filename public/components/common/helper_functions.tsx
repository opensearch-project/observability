import { EuiText } from '@elastic/eui';
import React from 'react';
import { FilterType } from './filters/filters';

export function PanelTitle({ title, totalItems }: { title: string; totalItems?: number }) {
  return (
    <EuiText size="m">
      <span className="panel-title">{title}</span>
      {totalItems === 0 || totalItems ? (
        <span className="panel-title-count">{` (${totalItems})`}</span>
      ) : null}
    </EuiText>
  );
}

export function renderBenchmark(value: number) {
  if (typeof value !== 'number') return null;
  const benchmarkColor = value === 0 ? '#9ea8a9' : value > 0 ? '#c23f25' : '#3f7e23';
  const benchmarkArrow = value === 0 ? '-' : value > 0 ? '\u25B4' : '\u25BE';
  return (
    <EuiText size="s" style={{ color: benchmarkColor }}>
      {`${Math.abs(value)}% ${benchmarkArrow}`}
    </EuiText>
  );
}

export function nanoToMilliSec(nano: number) {
  return nano / 1000000;
}

export function calculateTicks(min, max, numTicks = 5) {
  const range = max - min;
  const minInterval = range / numTicks;
  const magnitude = Math.pow(10, Math.floor(Math.log10(minInterval)));
  const residue = Math.ceil(minInterval / magnitude);

  let tick = magnitude;
  if (residue > 5) tick *= 10;
  else if (residue > 2) tick *= 5;
  else if (residue > 1) tick *= 2;

  let curr = Math.max(0, Math.floor((min - 1) / tick) * tick);
  const ticks = [curr];
  while (curr < max) {
    curr += tick;
    ticks.push(curr);
  }

  return ticks;
}

export const filtersToDsl = (
  filters: FilterType[],
  query: string,
  startTime: string,
  endTime: string
) => {
  const DSL = {
    query: {
      bool: {
        must: [],
        must_not: [],
      },
    },
  };
  DSL.query.bool.must.push({
    range: {
      startTime: {
        gte: startTime,
        lte: endTime,
      },
    },
  });
  if (query.length > 0) {
    DSL.query.bool.must.push({
      query_string: {
        query: query,
      },
    });
  }

  filters
    .filter((filter) => !filter.disabled)
    .forEach((filter) => {
      let query = {};
      switch (filter.operator) {
        case 'exists':
        case 'does not exist':
          query = {
            exists: {
              field: filter.field,
            },
          };
          break;

        case 'is':
        case 'is not':
          query = {
            term: {
              [filter.field]: filter.value,
            },
          };
          break;

        case 'is between':
        case 'is not between':
          query = {
            range: {
              [filter.field]: {
                gte: filter.value.from,
                lte: filter.value.to,
              },
            },
          };
          break;

        default:
          break;
      }
      filter.inverted ? DSL.query.bool.must_not.push(query) : DSL.query.bool.must.push(query);
    });

  return DSL;
};
