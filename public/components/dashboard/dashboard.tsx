import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  handleDashboardErrorRatePltRequest,
  handleDashboardRequest,
  handleDashboardThroughputPltRequest,
} from '../../requests/dashboard_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, minFixedInterval, SearchBar, SearchBarProps } from '../common';
import { ServiceMap } from '../services';
import { DashboardTable } from './dashboard_table';
import { ErrorRatePlt } from './error_rate_plt';
import { ThroughputPlt } from './throughput_plt';

interface DashboardProps extends SearchBarProps, CoreDeps {}

export function Dashboard(props: DashboardProps) {
  const [tableItems, setTableItems] = useState([]);
  const [throughputPltItems, setThroughputPltItems] = useState([]);
  const [errorRatePltItems, setErrorRatePltItems] = useState([]);

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
    refresh();
  }, []);
  
  useEffect(() => {
    refresh();
  }, [props.filters])
  
  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const fixedInterval = minFixedInterval(props.startTime, props.endTime)

    handleDashboardRequest(props.http, DSL, tableItems, setTableItems);
    handleDashboardThroughputPltRequest(props.http, DSL, fixedInterval, throughputPltItems, setThroughputPltItems);
    handleDashboardErrorRatePltRequest(props.http, DSL, fixedInterval, errorRatePltItems, setErrorRatePltItems)
  };

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Dashboard</h2>
      </EuiTitle>
      <SearchBar
        query={props.query}
        filters={props.filters}
        setFilters={props.setFilters}
        setQuery={props.setQuery}
        startTime={props.startTime}
        setStartTime={props.setStartTime}
        endTime={props.endTime}
        setEndTime={props.setEndTime}
        refresh={refresh}
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
              <ErrorRatePlt items={errorRatePltItems} />
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
