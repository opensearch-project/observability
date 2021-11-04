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

import React, { useState, useRef, useEffect } from 'react';

import {
  EuiBasicTable,
  EuiSpacer,
  EuiLink,
} from '@elastic/eui';


interface TableData {
  savedHistory: [];
  savedQuerySearch: (searchQuery: string, selectedDateRange: [], selectedTimeStamp, selectedFields: []) => void;
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
      field: 'data',
      name: 'Name',
      render: (item)=>{
        return ( 
          <EuiLink 
            onClick={() => {
            options.savedQuerySearch(item.query, [item.date_start, item.date_end], item.timestamp, item.fields, item.objectId)}}
          >
            {item.name}
          </EuiLink>)
      },
    },
    {
      field: 'description',
      name: 'Description',
    },
  ];



  const queries = options.savedHistory.map((h) => {
    const savedObject = h.hasOwnProperty('savedVisualization')
      ? h.savedVisualization
      : h.savedQuery;
    return {
      data: {
        objectId: h.objectId,
        name: savedObject.name,
        query: savedObject.query,
        date_start: savedObject.selected_date_range.start,
        date_end : savedObject.selected_date_range.end,
        timestamp: savedObject.selected_timestamp?.name || '',
        fields: savedObject.selected_fields?.tokens || []
      },
      name: savedObject.name || '',
      description: savedObject.description || '',

    };
  });

 
  const totalItemCount = queries.length;

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [5, 10, 20, 50],
  };

  return (
    <div>
      <EuiSpacer size="xl" />
      <EuiBasicTable
        items={queries.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
}


