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
  EuiSuperSelect,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import React from 'react';
import _ from 'lodash';
import { EuiTableFieldDataColumnType } from '@elastic/eui';
import { PanelTitle, renderBenchmark } from '../common';
import { BoxPlt } from './box_plt';
import { LatencyTrendCell } from './latency_trend_cell';

const renderTitleBar = (totalItems) => {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s">
      <EuiFlexItem grow={10}>
        <PanelTitle title="Latency by trace group" totalItems={totalItems} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiLink>
          <EuiText size="xs">
            <span style={{ color: '#957ac9' }}>&#x25a1;</span> &lt; 95 percentile
          </EuiText>
        </EuiLink>
      </EuiFlexItem>
      <EuiFlexItem grow={1} />
      <EuiFlexItem grow={false}>
        <EuiLink>
          <EuiText size="xs">
            <span style={{ color: '#957ac9' }}>&#x25a0;</span> &gt;= 95 percentile
          </EuiText>
        </EuiLink>
      </EuiFlexItem>
      <EuiFlexItem grow={1} />
      <EuiFlexItem grow={false}>
        <EuiText size="xs">Benchmark</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={4}>
        <EuiSuperSelect
          options={[
            {
              value: 'option_one',
              inputDisplay: 'This time last week',
            },
            {
              value: 'option_2',
              inputDisplay: 'This time yesterday',
            },
            {
              value: 'option_3',
              inputDisplay: 'This time last month',
            },
          ]}
          valueOfSelected={'option_one'}
          onChange={() => { }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const columns = [
  {
    field: 'trace_group_name',
    name: (
      <EuiToolTip
        content={
          <EuiText size="xs">
            Traces of all requests that share a common API and operation at the start of distributed tracing instrumentation
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
    render: (item) => (item ? <EuiLink href="#">{_.truncate(item, { length: 24 })}</EuiLink> : '-'),
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
        <EuiText size="xs" color="subdued">
          {[0, 20, 40, 60, 80].join('\u00A0'.repeat(10))}
        </EuiText>
      </>
    ),
    align: 'center',
    sortable: false,
    // width: '20%',
    render: (item) => {
      return item ? (
        // expand plot ranges by 4 to accomondate scale
        <BoxPlt plotParams={{ min: -2, max: 82, left: item[0], mid: item[1], right: item[2] }} />
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
    field: 'average_latency_vs_benchmark',
    name: (
      <EuiToolTip
        content={
          <EuiText size="xs">
            Percent difference between average latency and benchmark latency selected in dropdown above
          </EuiText>
        }
      >
        <>
          <div style={{ marginRight: 15 }}>Average latency vs</div>
          <div>
            benchmark{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </div>
        </>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    render: (item) => (item === 0 || item ? renderBenchmark(item) : '-'),
  },
  {
    field: '24_hour_latency_trend',
    name: (
      <EuiToolTip
        content={
          <EuiText size="xs">
            24 hour time series view of hourly average, hourly percentile, and hourly range of latency for traces within a trace group
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
    render: (item) => (item ? <LatencyTrendCell item={item} /> : '-'),
  },
  {
    field: 'error_rate',
    name: (
      <EuiToolTip
        content={
          <EuiText size="xs">
            Error rate based on count of errors on all traces and spans within a trace group in the selected time range (eg. 3 errors on different spans on a single trace counts as 3 errors in this calculation)
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
    render: (item) => (
      <EuiLink href="#traces">
        <EuiI18nNumber value={item} />
      </EuiLink>
    ),
  },
] as Array<EuiTableFieldDataColumnType<any>>;

export function DashboardTable(props: { items: any[] }) {
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
