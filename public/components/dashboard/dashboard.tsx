import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  handleDashboardErrorRatePltRequest,
  handleDashboardRequest,
  handleDashboardThroughputPltRequest,
} from '../../requests/dashboard_request_handler';
import { CoreDeps } from '../app';
import {
  filtersToDsl,
  getPercentileFilter,
  milliToNanoSec,
  minFixedInterval,
  SearchBar,
  SearchBarProps,
} from '../common';
import { FilterType } from '../common/filters/filters';
import { ServiceMap } from '../services';
import { DashboardTable } from './dashboard_table';
import { ErrorRatePlt } from './error_rate_plt';
import { ThroughputPlt } from './throughput_plt';

interface DashboardProps extends SearchBarProps, CoreDeps {}

export function Dashboard(props: DashboardProps) {
  const [tableItems, setTableItems] = useState([]);
  const [throughputPltItems, setThroughputPltItems] = useState({items: [], fixedInterval: '1h'});
  const [errorRatePltItems, setErrorRatePltItems] = useState({items: [], fixedInterval: '1h'});

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
  }, [props.filters]);

  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const fixedInterval = minFixedInterval(props.startTime, props.endTime);

    handleDashboardRequest(props.http, DSL, tableItems, setTableItems);
    handleDashboardThroughputPltRequest(
      props.http,
      DSL,
      fixedInterval,
      throughputPltItems,
      setThroughputPltItems
    );
    handleDashboardErrorRatePltRequest(
      props.http,
      DSL,
      fixedInterval,
      errorRatePltItems,
      setErrorRatePltItems
    );
  };

  const addFilter = (filter: FilterType) => {
    const newFilters = [...props.filters, filter];
    props.setFilters(newFilters);
  };

  const addPercentileFilter = (condition = 'gte', additionalFilters = []) => {
    if (tableItems.length === 0) return;
    for (let i = 0; i < props.filters.length; i++) {
      if (props.filters[i].DSL) {
        const newFilter = JSON.parse(
          JSON.stringify(props.filters[i]).replace(
            /{"range":{"durationInNanos":{"[gl]te?"/g,
            `{"range":{"durationInNanos":{"${condition}"`
          )
        );
        newFilter.value = condition === 'gte' ? '>= 95th' : ' <= 95th';
        const newFilters = [...props.filters, ...additionalFilters];
        newFilters.splice(i, 1, newFilter);
        props.setFilters(newFilters);
        return;
      }
    }

    const percentileMaps = tableItems.map((item) => ({
      traceGroupName: item.trace_group_name,
      durationFilter: { [condition]: milliToNanoSec(item.latency_variance[1]) },
    }));
    const percentileFilter = getPercentileFilter(
      percentileMaps,
      condition === 'gte' ? '>= 95th' : ' <= 95th'
    );
    const newFilters = [...props.filters, percentileFilter, ...additionalFilters];
    props.setFilters(newFilters);
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
      <DashboardTable
        items={tableItems}
        addFilter={addFilter}
        addPercentileFilter={addPercentileFilter}
      />
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
