import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  handleDashboardRequest,
  handleDashboardThroughputPltRequest,
} from '../../requests/dashboard_request_handler';
import { CoreDeps } from '../app';
import { SearchBar, SearchBarProps } from '../common';
import { ServiceMap } from '../services';
import { DashboardTable } from './dashboard_table';
import { ErrorRatePlt } from './error_rate_plt';
import { ThroughputPlt } from './throughput_plt';

interface DashboardProps extends SearchBarProps, CoreDeps {}

export function Dashboard(props: DashboardProps) {
  const [tableItems, setTableItems] = useState([]);
  const [throughputPltItems, setThroughputPltItems] = useState([]);

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
    handleDashboardRequest(props.http, tableItems, setTableItems);
    handleDashboardThroughputPltRequest(props.http, throughputPltItems, setThroughputPltItems);
  }, []);

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Dashboard</h2>
      </EuiTitle>
      <SearchBar
        query={props.query}
        setQuery={props.setQuery}
        startTime={props.startTime}
        setStartTime={props.setStartTime}
        endTime={props.endTime}
        setEndTime={props.setEndTime}
      />
      <EuiSpacer size="m" />
      <DashboardTable items={tableItems} />
      <EuiSpacer />
      <EuiFlexGroup alignItems="baseline">
        <EuiFlexItem grow={4}>
          <ServiceMap />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <ErrorRatePlt />
            </EuiFlexItem>
            <EuiFlexItem>
              <ThroughputPlt items={throughputPltItems} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}
