/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
    EuiTableFieldDataColumnType,
    EuiText,
    EuiToolTip,
    PropertySort,
  } from '@elastic/eui';
  import { CriteriaWithPagination } from '@elastic/eui/src/components/basic_table/basic_table';
  import _ from 'lodash';
  import React, { useMemo, useState } from 'react';
  import { FilterType } from '../common/filters/filters';
  import { calculateTicks, NoMatchMessage, PanelTitle } from '../common/helper_functions';
  import { BoxPlt } from '../common/plots/box_plt';
  import { LatencyTrendCell } from './latency_trend_cell';
  
  export function ErrorRatesTable(props: {
    title?: string;
    items: any[];
    filters: FilterType[];
    addFilter: (filter: FilterType) => void;
    addFilters: (filter: FilterType[]) => void;
    addPercentileFilter: (condition?: 'gte' | 'lte', additionalFilters?: FilterType[]) => void;
    setRedirect: (redirect: boolean) => void;
    loading: boolean;
    page: 'dashboard' | 'traces' | 'services' | 'app';
  }) {  
    console.log(props.items);
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
                  Service and Operation Name{' '}
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
                data-test-subj="dashboard-table-trace-group-name-button"
                onClick={() => {
                    props.addFilters([{
                        field: 'process.serviceName',
                        operator: 'is',
                        value: item[0],
                        inverted: false,
                        disabled: false,
                      },{
                          field: 'operationName',
                          operator: 'is',
                          value: item[1],
                          inverted: false,
                          disabled: false,
                        }]);
                    }
                }
              >
                {item.length < 48 ? (
                  decodeURI(item)
                ) : (
                  <div title={item}>{_.truncate(decodeURI(item), { length: 48 })}</div>
                )}
              </EuiLink>
            ) : (
              '-'
            ),
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
          field: '24_hour_error_trend',
          name: (
            <EuiToolTip
              content={
                <EuiText size="xs">
                  24 hour time series view of hourly average, hourly percentile, and hourly range of
                  error rates for traces within a trace group.
                </EuiText>
              }
            >
              <>
                {/* <div style={{ marginRight: 44 }}>24-hour</div> */}
                <div>
                  24-hour error rate trend{' '}
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
                  Error rate based on count of trace errors within a trace group in the selected time
                  range.
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
              data-test-subj="dashboard-table-traces-button"
              onClick={() => {
                props.addFilters([{
                  field: 'process.serviceName',
                  operator: 'is',
                  value: row.dashboard_trace_group_name[0],
                  inverted: false,
                  disabled: false,
                },{
                    field: 'operationName',
                    operator: 'is',
                    value: row.dashboard_trace_group_name[1],
                    inverted: false,
                    disabled: false,
                  }]);
                if (props.page !== 'app') {
                  props.setRedirect(true);
                  location.assign('#/trace_analytics/traces');
                }
              }}
            >
              <EuiI18nNumber value={item} />
            </EuiLink>
          ),
        },
      ] as Array<EuiTableFieldDataColumnType<any>>;
  
    const renderTitleBar = (totalItems: number) => {
      return (
        <EuiFlexGroup alignItems="center" gutterSize="s">
          <EuiFlexItem grow={10}>
            <PanelTitle title={props.title || "Latency by trace group"} totalItems={totalItems} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiLink
              data-test-subj="dashboard-table-percentile-button-1"
              onClick={() => props.addPercentileFilter('lte')}
            >
              <EuiText size="xs">
                <span style={{ color: '#957ac9' }}>&#x25a1;</span> &lt; 95 percentile
              </EuiText>
            </EuiLink>
          </EuiFlexItem>
          <EuiFlexItem grow={1} />
          <EuiFlexItem grow={false}>
            <EuiLink
              data-test-subj="dashboard-table-percentile-button-2"
              onClick={() => props.addPercentileFilter('gte')}
            >
              <EuiText size="xs">
                <span style={{ color: '#957ac9' }}>&#x25a0;</span> &gt;= 95 percentile
              </EuiText>
            </EuiLink>
          </EuiFlexItem>
          <EuiFlexItem grow={1} />
        </EuiFlexGroup>
      );
    };
  
    const columns = useMemo(() => getColumns(), [props.items, props.filters]);
    const titleBar = useMemo(() => renderTitleBar(props.items?.filter((item) => item.dashboard_error_rate > 0).length), [props.items]);
  
    const [sorting, setSorting] = useState<{ sort: PropertySort }>({
      sort: {
        field: 'dashboard_latency_variance',
        direction: 'desc',
      },
    });
  
    const onTableChange = async ({ page, sort }: CriteriaWithPagination<any>) => {
      if (typeof sort?.field !== 'string') return;
      setSorting({ sort } as { sort: PropertySort });
    };
  
    return (
      <>
        <EuiPanel>
          {titleBar}
          <EuiSpacer size="m" />
          <EuiHorizontalRule margin="none" />
          {props.items?.length > 0 ? (
            <EuiInMemoryTable
              data-test-subj="dashboardTable"
              tableLayout="auto"
              items={props.items.filter((item) => item.dashboard_error_rate > 0)}
              columns={columns}
              pagination={{
                initialPageSize: 10,
                pageSizeOptions: [5, 10, 15],
              }}
              sorting={sorting}
              onTableChange={onTableChange}
              loading={props.loading}
            />
          ) : (
            <NoMatchMessage size="xl" />
          )}
        </EuiPanel>
      </>
    );
  }
  