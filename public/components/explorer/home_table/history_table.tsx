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

import React, { useState, useRef } from 'react';

import { EuiSpacer, EuiLink, EuiInMemoryTable, EuiIcon, EuiLoadingChart } from '@elastic/eui';
import { FILTER_OPTIONS } from '../../../../common/constants/explorer';

interface TableData {
  savedHistory: [];
  savedQuerySearch: (
    searchQuery: string,
    selectedDateRange: [],
    selectedTimeStamp,
    selectedFields: []
  ) => void;
}

export function Table(options: TableData) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const pageIndexRef = useRef();
  pageIndexRef.current = pageIndex;
  const pageSizeRef = useRef();
  pageSizeRef.current = pageSize;

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const columns = [
    {
      field: 'type',
      name: '',
      width: '3%',
      render: (item) => {
        if (item == 'Visualization') {
          return (
            <div>
              <EuiLoadingChart size="m" />
            </div>
          );
        } else {
          return (
            <div>
              <EuiIcon type="discoverApp" size="m" />
            </div>
          );
        }
      },
    },
    {
      field: 'data',
      name: 'Name',
      align: 'left',
      render: (item) => {
        return (
          <EuiLink
            onClick={() => {
              options.savedQuerySearch(
                item.query,
                [item.date_start, item.date_end],
                item.timestamp,
                item.fields
              );
            }}
          >
            {item.name}
          </EuiLink>
        );
      },
    },
    {
      field: 'type',
      name: 'Type',
      align: 'right',
    },
  ];

  let queryType = '';
  const queries = options.savedHistory.map((h) => {
    const savedObject = h.hasOwnProperty('savedVisualization')
      ? h.savedVisualization
      : h.savedQuery;
    const isSavedVisualization = h.hasOwnProperty('savedVisualization');
    if (isSavedVisualization) {
      queryType = 'Visualization';
    } else {
      queryType = 'Query';
    }
    return {
      data: {
        name: savedObject.name,
        query: savedObject.query,
        date_start: savedObject.selected_date_range.start,
        date_end: savedObject.selected_date_range.end,
        timestamp: savedObject.selected_timestamp?.name,
        fields: savedObject.selected_fields?.tokens || [],
      },
      name: savedObject.name,
      type: queryType,
    };
  });

  const totalItemCount = queries.length;

  const search = {
    box: {
      incremental: true,
    },
    filters: [
      {
        type: 'field_value_selection',
        field: 'type',
        name: 'Type',
        multiSelect: false,
        options: FILTER_OPTIONS.map((i) => ({
          value: i,
          name: i,
          view: i,
        })),
      },
    ],
  };

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [5, 10, 20, 50],
  };

  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiInMemoryTable
        items={queries}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
        search={search}
      />
    </div>
  );
}
