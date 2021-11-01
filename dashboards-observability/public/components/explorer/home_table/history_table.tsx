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
import { uniqueId, get } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeQuery } from '../slices/query_slice';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { RAW_QUERY } from '../../../../common/constants/explorer';

interface TableData {
  savedHistory: any;
  savedQuerySearch: (searchQuery: string, selectedDateRange: [], selectedTimeStamp, selectedFields: []) => void;
  // savedQueryChange: (query: string, index: string) => void;
  // savedTimeChange: (timeRange: Array<string>) => void;
}

export function Table(options: TableData) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const history = useHistory();
  const hisRef = useRef();
  hisRef.current = pageIndex;
  const thisRef = useRef();
  thisRef.current = pageSize;

  // const query= "search source=opensearch_dashboards_sample_data_logs | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')";

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  console.log('history table: ', options.savedHistory);
  const columns = [
    {
      field: 'query',
      name: 'Name',
      render: (item)=>{return <EuiLink onClick={() =>
      {options.savedQuerySearch(item.queryy, [item.date_start, item.date_end], item.timestamp, item.fields)}}>
        {item.name}
      </EuiLink>},
    },
    {
      field: 'description',
      name: 'Description',
    },
  ];



  let queries = options.savedHistory.map((h) => {
    return {
      query: {
        name: h?.savedVisualization?.name || h?.savedQuery?.name || '',
        queryy: h?.savedVisualization?.query || h?.savedQuery?.query || '',
        date_start: h?.savedVisualization?.selected_date_range?.start || h?.savedQuery?.selected_date_range.start || '',
        date_end : h?.savedVisualization?.selected_date_range?.end || h?.savedQuery?.selected_date_range.end ||'',
        timestamp: h?.savedVisualization?.selected_timestamp?.name || h?.savedQuery?.selected_timestamp?.name || '',
        fields: h?.savedQuery?.selected_fields?.tokens || h?.savedVisualization?.selected_fields?.tokens || []
      },
      name: h?.savedVisualization?.name || h?.savedQuery?.name || '',
      description: h?.savedVisualization?.description || h?.savedQuery?.description || '',
    };
  });

  let date = options.savedHistory.map((h) => {
    return {
      date: h?.savedVisualization?.selected_date_range?.start || h?.savedQuery?.selected_date_range.start || ''
    };
  });
  console.log('date: ', date);

  console.log('queries: ', queries);
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


