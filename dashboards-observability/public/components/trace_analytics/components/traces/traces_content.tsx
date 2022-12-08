/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import { EuiSpacer, PropertySort } from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { handleTracesRequest } from '../../requests/traces_request_handler';
import { getValidFilterFields } from '../common/filters/filter_helpers';
import { filtersToDsl, processTimeStamp } from '../common/helper_functions';
import { SearchBar } from '../common/search_bar';
import { TracesProps } from './traces';
import { TracesTable } from './traces_table';
import { TraceAnalyticsMode } from '../../home';

export function TracesContent(props: TracesProps) {
  const {
    page,
    http,
    chrome,
    query,
    filters,
    appConfigs,
    startTime,
    endTime,
    mode,
    parentBreadcrumbs,
    childBreadcrumbs,
    traceIdColumnAction,
    setQuery,
    setFilters,
    setStartTime,
    setEndTime,
  } = props;
  const [tableItems, setTableItems] = useState([]);
  const [redirect, setRedirect] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chrome.setBreadcrumbs([...parentBreadcrumbs, ...childBreadcrumbs]);
    const validFilters = getValidFilterFields('traces');
    setFilters([
      ...filters.map((filter) => ({
        ...filter,
        locked: validFilters.indexOf(filter.field) === -1,
      })),
    ]);
    setRedirect(false);
  }, []);

  useEffect(() => {
    if (!redirect && mode !== TraceAnalyticsMode.None) refresh();
  }, [filters, appConfigs]);

  const refresh = async (sort?: PropertySort) => {
    setLoading(true);
    const DSL = filtersToDsl(filters, query, processTimeStamp(startTime, mode), processTimeStamp(endTime, mode), page, appConfigs);
    const timeFilterDSL = filtersToDsl([], '', processTimeStamp(startTime, mode), processTimeStamp(endTime, mode), page);
    await handleTracesRequest(http, DSL, timeFilterDSL, tableItems, setTableItems, mode, sort);
    setLoading(false);
  };

  return (
    <>
      <SearchBar
        query={query}
        filters={filters}
        appConfigs={appConfigs}
        setFilters={setFilters}
        setQuery={setQuery}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        refresh={refresh}
        page={page}
      />
      <EuiSpacer size="m" />
      <TracesTable
        items={tableItems}
        refresh={refresh}
        mode={mode}
        loading={loading}
        traceIdColumnAction={traceIdColumnAction}
      />
    </>
  );
}
