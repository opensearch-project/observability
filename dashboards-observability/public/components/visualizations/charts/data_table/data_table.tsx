/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import { EuiInMemoryTable, EuiDataGrid } from '@elastic/eui';

export const DataTable = ({ visualizations }: any) => {
  const {
    data: vizData,
    jsonData,
    metadata: { fields },
  } = visualizations.data.rawVizData;

  const raw_data = [...jsonData];

  // Pagination
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const onChangeItemsPerPage = useCallback(
    (pageSize) =>
      setPagination((pagination) => ({
        ...pagination,
        pageSize,
        pageIndex: 0,
      })),
    [setPagination]
  );
  const onChangePage = useCallback(
    (pageIndex) => setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  // Sorting
  const [sortingColumns, setSortingColumns] = useState([]);
  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

  // Sort data
  let data = useMemo(() => {
    return [...raw_data].sort((a, b) => {
      for (let i = 0; i < sortingColumns.length; i++) {
        const column = sortingColumns[i];
        const aValue = a[column.id];
        const bValue = b[column.id];

        if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [sortingColumns]);

  // Pagination
  data = useMemo(() => {
    const rowStart = pagination.pageIndex * pagination.pageSize;
    const rowEnd = Math.min(rowStart + pagination.pageSize, data.length);
    return data.slice(rowStart, rowEnd);
  }, [data, pagination]);

  const columns = fields.map((field) => {
    return {
      id: field.name,
    };
  });

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState(columns.map(({ id }) => id));

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      let adjustedRowIndex = rowIndex;

      // If we are doing the pagination (instead of leaving that to the grid)
      // then the row index must be adjusted as `data` has already been pruned to the page size
      adjustedRowIndex = rowIndex - pagination.pageIndex * pagination.pageSize;

      return data.hasOwnProperty(adjustedRowIndex) ? data[adjustedRowIndex][columnId] : null;
    };
  }, [data, pagination.pageIndex, pagination.pageSize]);

  return (
    <EuiDataGrid
      aria-label="viz data table"
      columns={columns}
      columnVisibility={{ visibleColumns, setVisibleColumns }}
      rowCount={raw_data.length}
      renderCellValue={renderCellValue}
      sorting={{ columns: sortingColumns, onSort }}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 50, 100],
        onChangeItemsPerPage,
        onChangePage,
      }}
    />
  );
  // return <EuiInMemoryTable items={jsonData} columns={colunms} pagination={true} />;
};
