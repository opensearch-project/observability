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
} from '@elastic/eui';
import React from 'react';
import _ from 'lodash';
import { EuiTableFieldDataColumnType } from '@elastic/eui';
import { calculateTicks, PanelTitle, renderBenchmark } from '../common';
import { BoxPlt } from '../common/plots/box_plt';
import { LatencyTrendCell } from './latency_trend_cell';
import { FilterType } from '../common/filters/filters';

export function DashboardTable(props: {
  items: any[];
  addFilter: (filter: FilterType) => void;
  addPercentileFilter: (condition?: 'gte' | 'lte', additionalFilters?: FilterType[]) => void;
}) {
  const getVarianceProps = (items) => {
    if (!items[0]?.latency_variance) {
      return null;
    }
    const variances = [].concat(...items.map((item) => item.latency_variance));
    const minRange = Math.min(...variances);
    const maxRange = Math.max(...variances);
    const ticks = calculateTicks(minRange, maxRange);

    const maxDigits = ticks[ticks.length - 1].toString().length;

    // pads spaces (\u00A0) in between ticks to construct a scale
    // width of a character equals the width of two spaces, maximum 32 characters in a scale
    const scale = ticks
      .map((tick) => {
        const tickStr = tick.toString();
        return tickStr.padEnd(tickStr.length + 2 * (maxDigits - tickStr.length), '\u00A0');
      })
      .join(
        '\u00A0'.repeat(
          Math.floor((2 * (32 - ticks.length * maxDigits)) / Math.max(1, ticks.length - 1))
        )
      );

    return { minRange, maxRange, ticks, scale };
  };

  const varianceProps = getVarianceProps(props.items);

  const columns = [
    {
      field: 'trace_group_name',
      name: (
        <EuiToolTip
          content={
            <EuiText size="xs">
              Traces of all requests that share a common API and operation at the start of
              distributed tracing instrumentation
            </EuiText>
          }
        >
          <span>
            Trace group name{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
      align: 'left',
      sortable: true,
      render: (item) =>
        item ? <EuiLink href="#">{_.truncate(item, { length: 24 })}</EuiLink> : '-',
    },
    {
      field: 'latency_variance',
      name: (
        <>
          <EuiToolTip
            content={
              <EuiText size="xs">
                Range of latencies for traces within a trace group in the selected time range
              </EuiText>
            }
          >
            <span>
              Latency variance{' '}
              <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
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
      sortable: ({ latency_variance }) => latency_variance[2] - latency_variance[0],
      render: (item, row) => {
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
              addFilter: (condition?: 'lte' | 'gte') => {
                props.addPercentileFilter(condition, [
                  {
                    field: 'name',
                    operator: 'is',
                    value: row.trace_group_name,
                    inverted: false,
                    disabled: false,
                  },
                ]);
              },
            }}
          />
        ) : (
          '-'
        );
      },
    },
    {
      field: 'average_latency',
      name: (
        <EuiToolTip
          content={
            <EuiText size="xs">
              Average latency of traces within a trace group in the selected time range
            </EuiText>
          }
        >
          <>
            <div style={{ marginRight: 40 }}>Average</div>
            <div>
              latency (ms){' '}
              <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
            </div>
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
              latency for traces within a trace group
            </EuiText>
          }
        >
          <>
            <div style={{ marginRight: 44 }}>24-hour</div>
            <div>
              latency trend{' '}
              <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
            </div>
          </>
        </EuiToolTip>
      ),
      align: 'right',
      sortable: false,
      render: (item, row) =>
        item ? <LatencyTrendCell item={item} traceGroupName={row.trace_group_name} /> : '-',
    },
    {
      field: 'error_rate',
      name: (
        <EuiToolTip
          content={
            <EuiText size="xs">
              Error rate based on count of errors on all traces and spans within a trace group in
              the selected time range (eg. 3 errors on different spans on a single trace counts as 3
              errors in this calculation)
            </EuiText>
          }
        >
          <span>
            Error rate{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
      align: 'right',
      sortable: true,
      render: (item) =>
        item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}%`}</EuiText> : '-',
    },
    {
      field: 'traces',
      name: (
        <EuiToolTip
          content={
            <EuiText size="xs">
              Count of the number of traces with unique trace identifiers in the selected time range
            </EuiText>
          }
        >
          <span>
            Traces{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
      align: 'right',
      sortable: true,
      render: (item, row) => (
        <EuiLink
          href="#traces"
          onClick={() =>
            props.addFilter({
              field: 'name',
              operator: 'is',
              value: row.trace_group_name,
              inverted: false,
              disabled: false,
            })
          }
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

  return (
    <>
      <EuiPanel>
        {renderTitleBar(props.items?.length)}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        <EuiInMemoryTable
          items={props.items}
          columns={columns}
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [5, 10, 15],
          }}
          sorting={true}
          tableLayout="auto"
        />
      </EuiPanel>
    </>
  );
}
