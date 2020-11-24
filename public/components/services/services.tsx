/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import { EuiSpacer, EuiTitle } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { handleServicesRequest } from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, MissingConfigurationMessage, SearchBar, SearchBarProps } from '../common';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { ServicesTable } from './services_table';

interface ServicesProps extends SearchBarProps, CoreDeps {}

export function Services(props: ServicesProps) {
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState('latency');
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
    handleServicesRequest(props.http, DSL, tableItems, setTableItems, setServiceMap, serviceQuery);
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

  const [serviceQuery, setServiceQuery] = useState('');

  return (
    <>
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Services</h2>
      </EuiTitle>
      <SearchBar
        datepickerOnly={true}
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
      <EuiSpacer />
      {props.indicesExist ? (
        <>
          <ServicesTable
            items={tableItems}
            addFilter={addFilter}
            setRedirect={setRedirect}
            serviceQuery={serviceQuery}
            setServiceQuery={setServiceQuery}
            refresh={refresh}
          />
          <EuiSpacer />
          <ServiceMap
            serviceMap={serviceMap}
            idSelected={serviceMapIdSelected}
            setIdSelected={setServiceMapIdSelected}
          />
        </>
      ) : (
        <MissingConfigurationMessage />
      )}
    </>
  );
}
