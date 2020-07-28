import { EuiFlexGroup, EuiFlexItem, EuiText, EuiSuperSelect, EuiLink, EuiIcon, EuiPanel, EuiSpacer, EuiHorizontalRule, EuiInMemoryTable } from "@elastic/eui";
import { PanelTitle } from "../common/panel_title";
import React, { useState } from "react";

const renderTitleBar = (totalItems?: number) => {
  return (
    <EuiFlexGroup alignItems='center' gutterSize='s'>
      <EuiFlexItem grow={10}>
        <PanelTitle title='Services' totalItems={totalItems} />
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

const columns = [
  {
    field: 'name',
    name: 'Name',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href={`#services/${item}`} >
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'average_latency',
    name: 'Average latency (ms)',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'error_rate',
    name: 'Error rate',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'throughput',
    name: 'Throughput',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'number_of_connected_services',
    name: 'Number of connected services',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'connected_services',
    name: 'Connected services',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
  {
    field: 'traces',
    name: 'Traces',
    sortable: true,
    truncateText: true,
    render: item => (
      <EuiLink href="#" target="_blank">
        {item}
      </EuiLink>
    ),
  },
];

const items = [
  {
    'name': 'sample service',
    'average_latency': '1',
    'error_rate': '1',
    'throughput': '1',
    'number_of_connected_services': '1',
    'connected_services': '1',
    'traces': '1',
  }
]

export function ServicesTable() {
  const TABLE_ID = 'services-table-id';
  const [sortedColumn, setSortedColumn] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
    <>
      <EuiPanel>
        {renderTitleBar(200)}
        <EuiSpacer size='m' />
        <EuiHorizontalRule margin='none' />
        <EuiInMemoryTable
          // tableLayout="auto"
          items={items}
          columns={columns}
          pagination={{
            initialPageSize: 10,
            pageSizeOptions: [8, 10, 13],
          }}
        />
      </EuiPanel>
    </>
  )
}
