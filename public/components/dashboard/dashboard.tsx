import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { setBreadcrumbsType } from '../app';
import { SearchBar } from '../common/search_bar';
import { DashboardTable } from './dashboard_table';
import { ErrorRatePlt } from './error_rate_plt';
import { ServiceMap } from './service_map';

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
      <EuiFlexGroup alignItems="baseline" gutterSize="none">
        <EuiFlexItem>
          <ServiceMap />
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexGroup direction="column">
          <EuiFlexItem>
            <ErrorRatePlt />
          </EuiFlexItem>
          <EuiFlexItem>
            <ErrorRatePlt />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </>
  );
}
