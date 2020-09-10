import {
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiTableFieldDataColumnType,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import _ from 'lodash';
import React from 'react';
import { PanelTitle, renderBenchmark } from '../common';

const renderTitleBar = (totalItems?: number) => {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s">
      <EuiFlexItem grow={10}>
        <PanelTitle title="Traces" totalItems={totalItems} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText size="xs">Benchmark</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={3}>
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
          onChange={() => {}}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const columns = [
  {
    field: 'trace_id',
    name: 'Trace ID',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem>
          <EuiLink href={`#traces/${encodeURIComponent(item)}`}>
            {_.truncate(item, { length: 24 })}
          </EuiLink>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiCopy textToCopy={item}>
            {(copy) => (
              <EuiButtonIcon iconType="copyClipboard" onClick={copy}>
                Click to copy
              </EuiButtonIcon>
            )}
          </EuiCopy>
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
  },
  {
    field: 'trace_group',
    name: 'Trace group',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => <EuiText size="s">{_.truncate(item, { length: 24 })}</EuiText>,
  },
  {
    field: 'latency',
    name: 'Latency (ms)',
    align: 'right',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'percentile_in_trace_group',
    name: (
      <EuiToolTip content="test tooltip">
        <>
          <div style={{ marginRight: 11 }}>Percentile in</div>
          <div>
            trace group{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </div>
        </>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    render: (item) =>
      item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}th`}</EuiText> : '-',
  },
  {
    field: 'latency_vs_benchmark',
    name: (
      <EuiToolTip content="test tooltip">
        <>
          <div style={{ marginRight: 18 }}>Latency vs</div>
          <div>
            benchmark{' '}
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </div>
        </>
      </EuiToolTip>
    ),
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => (item === 0 || item ? renderBenchmark(item) : '-'),
  },
  {
    field: 'error_count',
    name: 'Error count',
    align: 'right',
    sortable: true,
    render: (item) => (item === 0 || item ? item : '-'),
  },
  {
    field: 'last_updated',
    name: 'Last updated',
    align: 'left',
    sortable: true,
    render: (item) => (item === 0 || item ? item : '-'),
  },
  {
    field: 'actions',
    name: 'Actions',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiLink href={item}>
        {'View log'}
        <EuiIcon type="popout" />
      </EuiLink>
    ),
  },
] as Array<EuiTableFieldDataColumnType<any>>;

export function TracesTable(props: { items: any[] }) {
  return (
    <>
      <EuiPanel>
        {renderTitleBar(props.items?.length)}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        <EuiInMemoryTable
          tableLayout="auto"
          items={props.items}
          columns={columns}
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [8, 10, 13],
          }}
          sorting={true}
        />
      </EuiPanel>
    </>
  );
}
