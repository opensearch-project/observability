import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { setBreadcrumbsType } from '../app';
import { SearchBar } from '../common/search_bar';
import { DashboardTable } from './dashboard_table';
import { ServiceMap } from '../services/service_map';
import { ThroughputPlt } from './throughput_plt';
import { ErrorRatePlt } from './error_rate_plt';

interface DashboardProps {
  setBreadcrumbs: setBreadcrumbsType;
}

export function Dashboard(props: DashboardProps) {
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Dashboard',
        href: '#dashboard',
      },
    ]);
  });

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Dashboard</h2>
      </EuiTitle>
      <SearchBar />
      <EuiSpacer size="m" />
      <DashboardTable />
      <EuiSpacer />
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem grow={4}>
          <ServiceMap />
        </EuiFlexItem>
        <EuiFlexItem >
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <ErrorRatePlt />
            </EuiFlexItem>
            <EuiFlexItem>
              <ThroughputPlt />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
