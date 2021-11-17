/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiTitle, PropertySort } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsComponentDeps } from '../../home';
import { handleTracesRequest } from '../../requests/traces_request_handler';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { filtersToDsl } from '../common/helper_functions';
import { SearchBar } from '../common/search_bar';
import { TracesTable } from './traces_table';

interface TracesProps extends TraceAnalyticsComponentDeps {
  hasTitle: boolean;
  breadCrumbOwner: string;
  appId?: string;
  appName?: string;
}

export function Traces(props: TracesProps) {
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
    const validFilters = getValidFilterFields('traces');
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

  const refresh = async (sort?: PropertySort) => {
    setLoading(true);
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const timeFilterDSL = filtersToDsl([], '', props.startTime, props.endTime);
    await handleTracesRequest(props.http, DSL, timeFilterDSL, tableItems, setTableItems, sort);
    setLoading(false);
  };

  return (
    <>
    {hasTitle ?
      <EuiTitle size="l">
        <h2 style={{ fontWeight: 430 }}>Traces</h2>
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
        page="traces"
      />
      <EuiSpacer size="m" />
      <TracesTable items={tableItems} refresh={refresh} indicesExist={props.indicesExist} loading={loading} />
    </>
  );
}
