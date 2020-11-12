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

import dateMath from '@elastic/datemath';
import { EuiButton, EuiEmptyPrompt, EuiSpacer, EuiText } from '@elastic/eui';
import { SpacerSize } from '@elastic/eui/src/components/spacer/spacer';
import moment from 'moment';
import React from 'react';
import { RAW_INDEX_NAME, SERVICE_MAP_INDEX_NAME } from '../../../common';
import { serviceMapColorPalette } from './color_palette';
import { FilterType } from './filters/filters';
import { ServiceObject } from './plots/service_map';

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

export function NoMatchMessage(props: { size: SpacerSize }) {
  return (
    <>
      <EuiSpacer size={props.size} />
      <EuiEmptyPrompt
        title={<h2>No matches</h2>}
        body={
          <EuiText>
            No data matches the selected filter. Clear the filter and/or increase the time range to
            see more results.
          </EuiText>
        }
      />
      <EuiSpacer size={props.size} />
    </>
  );
}

export function MissingConfigurationMessage() {
  return (
    <>
      <EuiEmptyPrompt
        title={<h2>Indices required</h2>}
        body={
          <EuiText>
            {`The indices required for trace analytics (${RAW_INDEX_NAME} and ${SERVICE_MAP_INDEX_NAME}) do not exist.`}
          </EuiText>
        }
        actions={
          // TODO: add docs link here
          <EuiButton color="primary" iconSide="right" iconType="popout" onClick={() => {}}>
            Learn more
          </EuiButton>
        }
      />
    </>
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
  if (typeof nano !== 'number') return 0;
  return nano / 1000000;
}

export function milliToNanoSec(ms: number) {
  if (typeof ms !== 'number') return 0;
  return ms * 1000000;
}

export function getServiceMapScaleColor(percent, idSelected) {
  return serviceMapColorPalette[idSelected][Math.min(100, Math.max(0, Math.floor(percent * 100)))];
}

// construct vis-js graph from ServiceObject
export function getServiceMapGraph(
  map: ServiceObject,
  idSelected: string,
  ticks?: number[],
  currService?: string,
  relatedServices?: string[]
) {
  if (!relatedServices) relatedServices = Object.keys(map);

  const nodes = Object.keys(map).map((service) => {
    const value = map[service][idSelected];
    let color = '140, 148, 169';
    if (value || value === 0) {
      const percent = (value - ticks[0]) / (ticks[ticks.length - 1] - ticks[0]);
      color = getServiceMapScaleColor(percent, idSelected);
    }
    const message =
      { latency: 'Average latency: ', error_rate: 'Error rate: ', throughput: 'Throughput: ' }[
        idSelected
      ] +
      (value >= 0
        ? value + (idSelected === 'latency' ? 'ms' : idSelected === 'error_rate' ? '%' : '')
        : 'N/A');

    return {
      id: map[service].id,
      label: service,
      size: service === currService ? 30 : 15,
      title: `<p>${service}</p><p>${message}</p>`,
      color: relatedServices.indexOf(service) >= 0 ? `rgba(${color}, 1)` : `rgba(${color}, 0.3)`,
    };
  });
  const edges = [];
  Object.keys(map).map((service) => {
    map[service].targetServices.map((target) => {
      edges.push({
        from: map[service].id,
        to: map[target].id,
        color:
          relatedServices.indexOf(service) >= 0 && relatedServices.indexOf(target) >= 0
            ? 'rgba(0, 0, 0, 1)'
            : 'rgba(0, 0, 0, 0.3)',
      });
    });
  });
  return { graph: { nodes, edges } };
}

// returns flattened targetResource as an array for all traceGroups
export function getServiceMapTargetResources(map: ServiceObject, serviceName: string) {
  return [].concat.apply(
    [],
    [...map[serviceName].traceGroups.map((traceGroup) => [...traceGroup.targetResource])]
  );
}

export function calculateTicks(min, max, numTicks = 5) {
  if (min >= max) return calculateTicks(0, Math.max(1, max), numTicks);

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

// calculates the minimum fixed_interval for date_histogram from time filter
export const minFixedInterval = (startTime: string, endTime: string) => {
  if (startTime?.length === 0 || endTime?.length === 0 || startTime === endTime) return '1d';
  const momentStart = dateMath.parse(startTime);
  const momentEnd = dateMath.parse(endTime);
  const diffSeconds = momentEnd.unix() - momentStart.unix();

  if (diffSeconds <= 1) return '1ms'; // less than 1 second
  if (diffSeconds <= 60) return '1s'; // less than 1 minute
  if (diffSeconds <= 3600) return '1m'; // less than 1 hour
  if (diffSeconds <= 86400) return '1h'; // less than 1 day
  if (diffSeconds <= 86400 * 31) return '1d'; // less than 1 month
  if (diffSeconds <= 86400 * 366) return '30d'; // less than 1 year
  return '365d';
};

export const fixedIntervalToMilli = (fixedInterval: string) => {
  return {
    '1ms': 1,
    '1s': 1000,
    '1m': 60000,
    '1h': 3600000,
    '1d': 86400000,
    '30d': 86400000 * 30,
    '365d': 86400000 * 365,
  }[fixedInterval];
};

export const fixedIntervalToTickFormat = (fixedInterval: string) => {
  if (fixedInterval === '1d') return '%b %e, %Y';
  if (fixedInterval === '30d') return '%b %Y';
  if (fixedInterval === '365d') return '%Y';
  return '';
};

export const convertToTimeString = (timestamp: number, fixedInterval: string) => {
  if (fixedInterval === '1d') return moment(timestamp).format('MMM D, YYYY');
  if (fixedInterval === '30d') return moment(timestamp).format('MMM YYYY');
  if (fixedInterval === '365d') return moment(timestamp).format('YYYY');
  return moment(timestamp).format('');
};

export const getPercentileFilter = (
  percentileMaps: Array<{ traceGroupName: string; durationFilter: { gte?: number; lte?: number } }>,
  conditionString: string // >= 95
): FilterType => {
  const DSL = {
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
        minimum_should_match: 1,
      },
    },
  };
  percentileMaps.forEach((map) => {
    DSL.query.bool.should.push({
      bool: {
        must: [
          {
            term: {
              name: {
                value: map.traceGroupName,
              },
            },
          },
          {
            range: {
              durationInNanos: map.durationFilter,
            },
          },
        ],
      },
    });
  });
  return {
    field: 'Latency percentile within trace group',
    operator: '',
    value: conditionString,
    inverted: false,
    disabled: false,
    custom: DSL,
  };
};

export const filtersToDsl = (
  filters: FilterType[],
  query: string,
  startTime: string,
  endTime: string
) => {
  const DSL: any = {
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    custom: {
      timeFilter: [],
      serviceNames: [],
      serviceNamesExclude: [],
      traceGroup: [],
      traceGroupExclude: [],
      percentiles: {
        query: {
          bool: {
            should: [],
          },
        },
      },
    },
  };
  const timeFilter = {
    range: {
      startTime: {
        gte: startTime,
        lte: endTime,
      },
    },
  };
  DSL.query.bool.must.push(timeFilter);
  DSL.custom.timeFilter.push(timeFilter);
  if (query.length > 0) {
    DSL.query.bool.must.push({
      query_string: {
        query,
      },
    });
  }

  filters
    .filter((filter) => !filter.disabled && !filter.locked)
    .forEach((filter) => {
      if (filter.custom?.query) {
        // add percentile filter
        DSL.query.bool.should.push(...filter.custom.query.bool.should);
        DSL.custom.percentiles.query.bool.should.push(...filter.custom.query.bool.should);
        DSL.query.bool.minimum_should_match = filter.custom.query.bool.minimum_should_match;
        DSL.custom.percentiles.query.bool.minimum_should_match =
          filter.custom.query.bool.minimum_should_match;
        return;
      }

      if (
        filter.field === 'serviceName' &&
        (filter.operator === 'is' || filter.operator === 'is not')
      ) {
        DSL.custom[filter.inverted ? 'serviceNamesExclude' : 'serviceNames'].push(filter.value);
      }

      if (filter.field === 'traceGroup') {
        DSL.custom[filter.inverted ? 'traceGroupExclude' : 'traceGroup'].push(filter.value);
      }

      let filterQuery = {};
      switch (filter.operator) {
        case 'exists':
        case 'does not exist':
          filterQuery = {
            exists: {
              field: filter.field,
            },
          };
          break;

        case 'is':
        case 'is not':
          filterQuery = {
            term: {
              [filter.field]: filter.value,
            },
          };
          break;

        case 'is between':
        case 'is not between':
          const range: { gte?: string; lte?: string } = {};
          if (!filter.value.from.includes('\u221E')) range.gte = filter.value.from;
          if (!filter.value.to.includes('\u221E')) range.lte = filter.value.to;
          filterQuery = {
            range: {
              [filter.field]: range,
            },
          };
          break;

        default:
          break;
      }
      DSL.query.bool[filter.inverted ? 'must_not' : 'must'].push(filterQuery);
    });

  return DSL;
};
