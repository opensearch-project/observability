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

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiI18nNumber,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiToolTip,
  PropertySort,
} from '@elastic/eui';
import React, { useMemo, useState } from 'react';
import _ from 'lodash';
import { EuiTableFieldDataColumnType } from '@elastic/eui';
import { calculateTicks, NoMatchMessage, PanelTitle, renderBenchmark } from '../common';
import { BoxPlt } from '../common/plots/box_plt';
import { LatencyTrendCell } from './latency_trend_cell';
import { FilterType } from '../common/filters/filters';

export function DashboardTable(props: {
  items: any[];
  filters: FilterType[];
  addFilter: (filter: FilterType) => void;
  addPercentileFilter: (condition?: 'gte' | 'lte', additionalFilters?: FilterType[]) => void;
  setRedirect: (redirect: boolean) => void;
}) {
  const getVarianceProps = (items) => {
    if (items.length === 0) {
      return { minRange: 0, maxRange: 0, ticks: [0, 0], scale: '' };
    }
    const variances = [].concat(
      ...items
        .filter((item) => item.dashboard_latency_variance)
        .map((item) => item.dashboard_latency_variance)
    );
    const minRange = Math.min(...variances);
    const maxRange = Math.max(...variances);
    const ticks = calculateTicks(minRange, maxRange);

    const maxDigits = ticks[ticks.length - 1].toString().length;

    // pads spaces (\u00A0) in between ticks to construct a scale
    // width of a character equals the width of two spaces, maximum 39 characters in a scale
    const scale = ticks
      .map((tick) => {
        const tickStr = tick.toString();
        return tickStr.padEnd(tickStr.length + 2 * (maxDigits - tickStr.length), '\u00A0');
      })
      .join(
        '\u00A0'.repeat(
          Math.max(
            1,
            Math.floor((2 * (39 - ticks.length * maxDigits)) / Math.max(1, ticks.length - 1))
          )
        )
      );

    return { minRange, maxRange, ticks, scale };
  };

  const getColumns = () =>
    [
      {
        field: 'dashboard_trace_group_name',
        name: (
          <EuiToolTip
            content={
              <EuiText size="xs">
                Traces of all requests that share a common API and operation at the start of
                distributed tracing instrumentation.
              </EuiText>
            }
          >
            <>
              <div>
                Trace group name{' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </div>
              <div>&nbsp;</div>
            </>
          </EuiToolTip>
        ),
        align: 'left',
        sortable: true,
        render: (item) =>
          item ? (
            <EuiLink
              onClick={() =>
                props.addFilter({
                  field: 'traceGroup',
                  operator: 'is',
                  value: item,
                  inverted: false,
                  disabled: false,
                })
              }
            >
              {_.truncate(item, { length: 24 })}
            </EuiLink>
          ) : (
            '-'
          ),
      },
      {
        field: 'dashboard_latency_variance',
        name: (
          <>
            <EuiToolTip
              content={
                <EuiText size="xs">
                  Range of latencies for traces within a trace group in the selected time range.
                </EuiText>
              }
            >
              <span>
                Latency variance (ms){' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </span>
            </EuiToolTip>
            {varianceProps && (
              <EuiText size="xs" color="subdued">
                {varianceProps.scale}
              </EuiText>
            )}
          </>
        ),
        align: 'center',
        sortable: ({ dashboard_latency_variance }) =>
          dashboard_latency_variance?.length > 0
            ? dashboard_latency_variance[2] - dashboard_latency_variance[0]
            : 0,
        width: '300px',
        render: (item, row) => {
          const filter = props.filters.find(
            (f) => f.field === 'Latency percentile within trace group'
          );
          const currPercentileFilter = filter ? filter.value : '';
          return item ? (
            // expand plot ranges to accomondate scale
            <BoxPlt
              plotParams={{
                min:
                  varianceProps.ticks.length > 1
                    ? varianceProps.ticks[0]
                    : varianceProps.ticks[0] / 1.03,
                max: varianceProps.ticks[varianceProps.ticks.length - 1] * 1.03,
                left: item[0],
                mid: item[1],
                right: item[2],
                currPercentileFilter,
                addFilter: (condition?: 'lte' | 'gte') => {
                  const traceGroupFilter = {
                    field: 'traceGroup',
                    operator: 'is',
                    value: row.dashboard_trace_group_name,
                    inverted: false,
                    disabled: false,
                  };
                  const additionalFilters = [traceGroupFilter];
                  for (const addedFilter of props.filters) {
                    if (
                      addedFilter.field === traceGroupFilter.field &&
                      addedFilter.operator === traceGroupFilter.operator &&
                      addedFilter.value === traceGroupFilter.value
                    ) {
                      additionalFilters.pop();
                    }
                  }
                  props.addPercentileFilter(condition, additionalFilters);
                },
              }}
            />
          ) : (
            '-'
          );
        },
      },
      {
        field: 'dashboard_average_latency',
        name: (
          <EuiToolTip
            content={
              <EuiText size="xs">
                Average latency of traces within a trace group in the selected time range.
              </EuiText>
            }
          >
            <>
              {/* <div style={{ marginRight: 40 }}>Average</div> */}
              <div>
                Average latency (ms){' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </div>
              <div>&nbsp;</div>
            </>
          </EuiToolTip>
        ),
        align: 'right',
        sortable: true,
        dataType: 'number',
        render: (item) => (item === 0 || item ? _.round(item, 2) : '-'),
      },
      {
        field: '24_hour_latency_trend',
        name: (
          <EuiToolTip
            content={
              <EuiText size="xs">
                24 hour time series view of hourly average, hourly percentile, and hourly range of
                latency for traces within a trace group.
              </EuiText>
            }
          >
            <>
              {/* <div style={{ marginRight: 44 }}>24-hour</div> */}
              <div>
                24-hour latency trend{' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </div>
              <div>&nbsp;</div>
            </>
          </EuiToolTip>
        ),
        align: 'right',
        sortable: false,
        render: (item, row) =>
          item ? (
            <LatencyTrendCell item={item} traceGroupName={row.dashboard_trace_group_name} />
          ) : (
            '-'
          ),
      },
      {
        field: 'dashboard_error_rate',
        name: (
          <EuiToolTip
            content={
              <EuiText size="xs">
                Error rate based on count of errors on all traces and spans within a trace group in
                the selected time range (eg. 3 errors on different spans on a single trace counts as
                3 errors in this calculation).
              </EuiText>
            }
          >
            <>
              <div>
                Error rate{' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </div>
              <div>&nbsp;</div>
            </>
          </EuiToolTip>
        ),
        align: 'right',
        sortable: true,
        render: (item) =>
          item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}%`}</EuiText> : '-',
      },
      {
        field: 'dashboard_traces',
        name: (
          <EuiToolTip
            content={
              <EuiText size="xs">
                Count of traces with unique trace identifiers in the selected time range.
              </EuiText>
            }
          >
            <>
              <div>
                Traces{' '}
                <EuiIcon
                  size="s"
                  color="subdued"
                  type="questionInCircle"
                  className="eui-alignTop"
                />
              </div>
              <div>&nbsp;</div>
            </>
          </EuiToolTip>
        ),
        align: 'right',
        sortable: true,
        render: (item, row) => (
          <EuiLink
            onClick={() => {
              props.setRedirect(true);
              props.addFilter({
                field: 'traceGroup',
                operator: 'is',
                value: row.dashboard_trace_group_name,
                inverted: false,
                disabled: false,
              });
              location.assign('#/traces');
            }}
          >
            <EuiI18nNumber value={item} />
          </EuiLink>
        ),
      },
    ] as Array<EuiTableFieldDataColumnType<any>>;

  const renderTitleBar = (totalItems) => {
    return (
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={10}>
          <PanelTitle title="Latency by trace group" totalItems={totalItems} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiLink onClick={() => props.addPercentileFilter('lte')}>
            <EuiText size="xs">
              <span style={{ color: '#957ac9' }}>&#x25a1;</span> &lt; 95 percentile
            </EuiText>
          </EuiLink>
        </EuiFlexItem>
        <EuiFlexItem grow={1} />
        <EuiFlexItem grow={false}>
          <EuiLink onClick={() => props.addPercentileFilter('gte')}>
            <EuiText size="xs">
              <span style={{ color: '#957ac9' }}>&#x25a0;</span> &gt;= 95 percentile
            </EuiText>
          </EuiLink>
        </EuiFlexItem>
        <EuiFlexItem grow={1} />
      </EuiFlexGroup>
    );
  };

  const varianceProps = useMemo(() => getVarianceProps(props.items), [props.items]);
  const columns = useMemo(() => getColumns(), [props.items]);
  const titleBar = useMemo(() => renderTitleBar(props.items?.length), [props.items]);

  const [sorting, setSorting] = useState<{ sort: PropertySort }>({
    sort: {
      field: 'dashboard_latency_variance',
      direction: 'desc',
    },
  });

  const onTableChange = async ({ page, sort }) => {
    if (typeof sort?.field !== 'string') return;
    setSorting({ sort });
  };

  return (
    <>
      <EuiPanel>
        {titleBar}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        {props.items?.length > 0 ? (
          <EuiInMemoryTable
            tableLayout="auto"
            items={props.items}
            columns={columns}
            pagination={{
              initialPageSize: 10,
              pageSizeOptions: [5, 10, 15],
            }}
            sorting={sorting}
            onTableChange={onTableChange}
          />
        ) : (
          <NoMatchMessage size="xl" />
        )}
      </EuiPanel>
    </>
  );
}
