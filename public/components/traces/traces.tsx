import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { handleTracesRequest } from '../../requests/traces_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, SearchBar, SearchBarProps } from '../common';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { TracesTable } from './traces_table';

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
    const validFilters = getValidFilterFields('traces');
    props.setFilters([
      ...props.filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
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
        page="traces"
      />
      <EuiSpacer size="m" />
      <TracesTable items={tableItems} />
    </>
  );
}
