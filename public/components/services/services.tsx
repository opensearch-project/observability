import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { handleServicesRequest } from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, MissingConfigurationMessage, SearchBar, SearchBarProps } from '../common';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { ServicesTable } from './services_table';

interface ServicesProps extends SearchBarProps, CoreDeps {}

export function Services(props: ServicesProps) {
  const [tableItems, setTableItems] = useState([]);
  const [redirect, setRedirect] = useState(true);
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace Analytics',
        href: '#',
      },
      {
        text: 'Services',
        href: '#/services',
      },
    ]);
    const validFilters = getValidFilterFields('services');
    props.setFilters([
      ...props.filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
  }, []);

  useEffect(() => {
    if (!redirect && props.indicesExist) refresh();
  }, [props.filters]);

  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    handleServicesRequest(props.http, DSL, tableItems, setTableItems);
  };

  const addFilter = (filter: FilterType) => {
    for (const addedFilter of props.filters) {
      if (
        addedFilter.field === filter.field &&
        addedFilter.operator === filter.operator &&
        addedFilter.value === filter.value
      ) {
        return;
      }
    }
    const newFilters = [...props.filters, filter];
    props.setFilters(newFilters);
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
        page="services"
      />
      <EuiSpacer size="m" />
      {props.indicesExist ? (
        <ServicesTable items={tableItems} addFilter={addFilter} setRedirect={setRedirect} />
      ) : (
        <MissingConfigurationMessage />
      )}
    </>
  );
}
