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
