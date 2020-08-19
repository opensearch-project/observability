import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiI18nNumber,
} from '@elastic/eui';
import React from 'react';
import { PanelTitle, truncateText } from '../common';
import { serviceTableData } from '../../data/services_data';

const renderTitleBar = (totalItems?: number) => {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s">
      <EuiFlexItem grow={10}>
        <PanelTitle title="Services" totalItems={totalItems} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const columns = [
  {
    field: 'name',
    name: 'Name',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => <EuiLink href={`#services/${item}`}>{truncateText(item)}</EuiLink>,
  },
  {
    field: 'average_latency',
    name: 'Average latency (ms)',
    align: 'right',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'error_rate',
    name: 'Error rate',
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => <EuiText size="s">{`${item}%`}</EuiText>,
  },
  {
    field: 'throughput',
    name: 'Throughput',
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => <EuiI18nNumber value={item} />
  },
  {
    field: 'number_of_connected_services',
    name: 'Number of connected services',
    align: 'right',
    sortable: true,
    truncateText: true,
  },
  {
    field: 'connected_services',
    name: 'Connected services',
    align: 'left',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiText size='s'>
        {truncateText(item)}
      </EuiText>
    ),
  },
  {
    field: 'traces',
    name: 'Traces',
    align: 'right',
    sortable: true,
    truncateText: true,
    render: (item) => (
      <EuiLink href="#traces">
        <EuiI18nNumber value={item} />
      </EuiLink>
    ),
  },
];

const items = serviceTableData;

export function ServicesTable() {
  return (
    <>
      <EuiPanel>
        {renderTitleBar(200)}
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
          sorting={true}
        />
      </EuiPanel>
    </>
  );
}
