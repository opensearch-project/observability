import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
  EuiCopy,
  EuiButton,
  EuiButtonIcon,
} from '@elastic/eui';
import React from 'react';
import { PanelTitle, truncateText, renderBenchmark } from '../common/helper_functions';

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
          onChange={() => { }}
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
      <EuiFlexGroup gutterSize='s'>
        <EuiFlexItem>
          <EuiLink href={`#traces/${item}`}>{truncateText(item)}</EuiLink>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiCopy textToCopy={item}>
            {copy => (
              <EuiButtonIcon iconType='copyClipboard' onClick={copy}>Click to copy</EuiButtonIcon>
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
    // render: item => (
    //   <EuiLink href="#" target="_blank">
    //     {item}
    //   </EuiLink>
    // ),
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
    name: 'Percentile in trace group',
    align: 'left',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'latency_vs_benchmark',
    name: 'Latency vs benchmark',
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => renderBenchmark(item),
  },
  {
    field: 'error_count',
    name: 'Error count',
    align: 'right',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'last_updated',
    name: 'Last updated',
    align: 'left',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'actions',
    name: 'Actions',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiLink href="#" target="_blank">
        {'View log'}<EuiIcon type="popout" />
      </EuiLink>
    ),
  },
];

const items = [
  {
    trace_id: 'custom-components-will-not-truncate',
    trace_group: 'plain text will truncate automatically',
    latency: '1',
    percentile_in_trace_group: '1',
    latency_vs_benchmark: '1',
    error_count: '1',
    last_updated: '1',
    actions: '1',
  },
];

export function TracesTable() {
  return (
    <>
      <EuiPanel>
        {renderTitleBar(15)}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        <EuiInMemoryTable
          tableLayout="auto"
          items={items}
          columns={columns}
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [8, 10, 13],
          }}
        />
      </EuiPanel>
    </>
  );
}
