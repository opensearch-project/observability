import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { handleServicesRequest } from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, SearchBar, SearchBarProps } from '../common';
import { ServicesTable } from './services_table';

interface ServicesProps extends SearchBarProps, CoreDeps {}

export function Services(props: ServicesProps) {
  const [tableItems, setTableItems] = useState([]);
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Services',
        href: '#services',
      },
    ]);
    refresh();
  }, []);

  useEffect(() => {
    refresh();
  }, [props.filters]);

  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    handleServicesRequest(props.http, DSL, tableItems, setTableItems);
  };

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Services</h2>
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
      <ServicesTable items={tableItems} />
    </>
  );
}
