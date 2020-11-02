import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { CoreDeps } from '../app';
import { filtersToDsl, SearchBar, SearchBarProps } from '../common';
import { TracesTable } from './traces_table';
import { handleTracesRequest } from '../../requests/traces_request_handler';

interface TracesProps extends SearchBarProps, CoreDeps {}

export function Traces(props: TracesProps) {
  const [tableItems, setTableItems] = useState([]);
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Traces',
        href: '#traces',
      },
    ]);
    refresh();
  }, []);

  useEffect(() => {
    refresh();
  }, [props.filters]);

  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const timeFilterDSL = filtersToDsl([], '', props.startTime, props.endTime);
    handleTracesRequest(props.http, DSL, timeFilterDSL, tableItems, setTableItems);
  };

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Traces</h2>
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
      <TracesTable items={tableItems} />
    </>
  );
}
