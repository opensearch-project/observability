/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { EuiLink, EuiInMemoryTable, EuiIcon } from '@elastic/eui';
import { FILTER_OPTIONS } from '../../../../common/constants/explorer';

interface savedQueryTableProps {
  savedHistories: Array<any>;
  handleHistoryClick: (objectId: string) => void;
  handleSelectHistory: (selectedHistories: Array<any>) => void;
  isTableLoading: boolean;
  selectedHistories: Array<History>;
}

export function SavedQueryTable({
  savedHistories,
  handleHistoryClick,
  handleSelectHistory,
  isTableLoading,
}: savedQueryTableProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const pageIndexRef = useRef<number>();
  pageIndexRef.current = pageIndex;
  const pageSizeRef = useRef<number>();
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
      sortable: true,
      width: '40px',
      render: (item: any) => {
        if (item == 'Visualization') {
          return (
            <div>
              <EuiIcon type="visBarVerticalStacked" size="m" />
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
      width: '70%',
      sortable: true,
      truncateText: true,
      render: (item: any) => {
        return (
          <EuiLink
            onClick={() => {
              handleHistoryClick(item.objectId);
            }}
            data-test-subj="eventHome__savedQueryTableName"
          >
            {item.name}
          </EuiLink>
        );
      },
    },
    {
      field: 'type',
      name: 'Type',
    },
  ];

  const histories = savedHistories.map((h) => {
    const isSavedVisualization = h.hasOwnProperty('savedVisualization');
    const savedObject = isSavedVisualization ? h.savedVisualization : h.savedQuery;
    const curType = isSavedVisualization ? 'savedVisualization' : 'savedQuery';
    const record = {
      objectId: h.objectId,
      objectType: curType,
      name: savedObject.name,
      query: savedObject.query,
      date_start: savedObject.selected_date_range.start,
      date_end: savedObject.selected_date_range.end,
      timestamp: savedObject.selected_timestamp?.name,
      fields: savedObject.selected_fields?.tokens || [],
    };
    return {
      id: h.objectId,
      data: record,
      name: savedObject.name,
      type: isSavedVisualization ? 'Visualization' : 'Query',
    };
  });

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
    totalItemCount: histories.length,
    pageSizeOptions: [5, 10, 20, 50],
  };

  return (
    <EuiInMemoryTable
      itemId="id"
      loading={isTableLoading}
      items={histories}
      columns={columns}
      pagination={pagination}
      onChange={onTableChange}
      search={search}
      isSelectable={true}
      selection={{
        onSelectionChange: (selectedHistories) => {
          handleSelectHistory(selectedHistories);
        },
      }}
    />
  );
}
