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
import { handleTracesRequest } from '../../requests/traces_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, MissingConfigurationMessage, SearchBar, SearchBarProps } from '../common';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { TracesTable } from './traces_table';

interface TracesProps extends SearchBarProps, CoreDeps {}

export function Traces(props: TracesProps) {
  const [tableItems, setTableItems] = useState([]);
  const [redirect, setRedirect] = useState(true);
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace Analytics',
        href: '#',
      },
      {
        text: 'Traces',
        href: '#/traces',
      },
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
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    const timeFilterDSL = filtersToDsl([], '', props.startTime, props.endTime);
    await handleTracesRequest(props.http, DSL, timeFilterDSL, tableItems, setTableItems, sort);
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
      {props.indicesExist ? <TracesTable items={tableItems} refresh={refresh} /> : <MissingConfigurationMessage />}
    </>
  );
}
