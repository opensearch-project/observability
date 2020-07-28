import { EuiPage, EuiPageBody, EuiPageSideBar, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import SearchBar from '../common/search_bar';
import { DashboardTable } from './dashboard_table';
import { ServiceMap } from './service_map';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { ErrorRatePlt } from './error_rate_plt';
import BoxPlt from './box_plt';

export function Dashboard(props) {
  
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
  }, []);

  return (
    <>
      <EuiTitle size='l'><h2 style={{ fontWeight: 430 }}>Dashboard</h2></EuiTitle>
      <SearchBar />
      <EuiSpacer size='m' />
      <DashboardTable />
      <EuiSpacer />
      <EuiFlexGroup alignItems='baseline' gutterSize='none'>
        <EuiFlexItem>
          <ServiceMap />
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexGroup direction='column' >
          <EuiFlexItem>
            <ErrorRatePlt />
          </EuiFlexItem>
          <EuiFlexItem>
            <ErrorRatePlt />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </>
  )
}
