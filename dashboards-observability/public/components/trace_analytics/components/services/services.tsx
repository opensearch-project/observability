/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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
import { TraceAnalyticsComponentDeps } from '../../home';
import { handleServicesRequest } from '../../requests/services_request_handler';
import { FilterType } from '../common/filters/filters';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { filtersToDsl } from '../common/helper_functions';
import { SearchBar } from '../common/search_bar';
import { ServicesTable } from './services_table';

interface ServicesProps extends TraceAnalyticsComponentDeps {
  hasTitle: boolean;
  breadCrumbOwner: string;
  appId?: string;
  appName?: string;
}

export function Services(props: ServicesProps) {
  const { hasTitle, appId, appName, breadCrumbOwner, parentBreadcrumb } = props;
  const [tableItems, setTableItems] = useState([]);
  const [redirect, setRedirect] = useState(true);
  const [loading, setLoading] = useState(false);

  const breadCrumbs = breadCrumbOwner === 'trace' ? 
  [
    {
        text: 'Trace analytics',
        href: '#/trace_analytics/home',
      },
      {
        text: 'Dashboards',
        href: '#/trace_analytics/home',
      },
  ] : [
    {
      text: 'Application analytics',
      href: '#/application_analytics',
    },
    {
      text: `${appName}`,
      href: `#/application_analytics/${appId}`,
    },
  ]

  useEffect(() => {
    props.chrome.setBreadcrumbs([
      parentBreadcrumb,
      ...breadCrumbs
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

  const refresh = async () => {
    setLoading(true);
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    await handleServicesRequest(props.http, DSL, tableItems, setTableItems, null, serviceQuery);
    setLoading(false);
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
    {hasTitle ?
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Services</h2>
      </EuiTitle>
      :
      <EuiSpacer size="m" />
      }
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
      <ServicesTable
        items={tableItems}
        addFilter={addFilter}
        setRedirect={setRedirect}
        serviceQuery={serviceQuery}
        setServiceQuery={setServiceQuery}
        refresh={refresh}
        indicesExist={props.indicesExist}
        loading={loading}
      />
    </>
  );
}
