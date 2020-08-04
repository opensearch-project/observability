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
import { PanelTitle } from '../common/panel_title';
import { SearchBar } from '../common/search_bar';
import { DashboardTable } from './dashboard_table';
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
            <EuiPanel>
              <PanelTitle title="Error rate over time" />
              <EuiSpacer size="m" />
              <EuiHorizontalRule />
              <div style={{ width: 400, height: 200 }} />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiPanel>
              <PanelTitle title="Throughput over time" />
              <EuiSpacer size="m" />
              <EuiHorizontalRule />
              <div style={{ width: 400, height: 200 }} />
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </>
  );
}
