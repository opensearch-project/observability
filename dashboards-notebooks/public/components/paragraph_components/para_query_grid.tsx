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
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  EuiDataGrid,
  EuiLoadingSpinner,
  EuiSpacer
} from '@elastic/eui';

type QueryDataGridProps = {
  rowCount: number,
  queryColumns: Array<any>,
  visibleColumns: Array<any>,
  setVisibleColumns: (visibleColumns: string[]) => void,
  dataValues: Array<any>,
}

type RenderCellValueProps = {
  rowIndex: number,
  columnId: string
}

function QueryDataGrid(props: QueryDataGridProps) {
  const {
    rowCount,
    queryColumns,
    visibleColumns,
    setVisibleColumns,
    dataValues,
  } = props;
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const onSort = useCallback(
    (sortingColumns) => {
      setSortingColumns(sortingColumns);
    },
    [setSortingColumns]
  );

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
    (pageIndex) =>
      setPagination((pagination) => ({ ...pagination, pageIndex })),
    [setPagination]
  );

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }: RenderCellValueProps) => {
      return dataValues.hasOwnProperty(rowIndex)
        ? dataValues[rowIndex][columnId]
        : null;
    };
  }, []);

  const getUpdatedVisibleColumns = (queryColumns: Array<Object>) => {
    let updatedVisibleColumns = [];
    for (let index = 0; index < queryColumns.length; ++index) {
      updatedVisibleColumns.push(queryColumns[index].displayAsText);
    }
    return updatedVisibleColumns;
  }

  
  useEffect(() => {
    if ($('.euiDataGrid__overflow').is(':visible')) {
      setIsVisible(true);
    }
    setTimeout(() => {
      if ($('.euiDataGrid__overflow').is(':visible')) {
        setIsVisible(true);
      }
    }, 1000);
    setVisibleColumns(getUpdatedVisibleColumns(queryColumns));
  }, []);

  const displayLoadingSpinner = (!isVisible) ? (
    <>
      <EuiLoadingSpinner size="xl"/>
      <EuiSpacer />
    </>
  ) : null;

  return (
    <div id="queryDataGrid">
      {displayLoadingSpinner}
      <EuiDataGrid
        aria-label='Query datagrid'
        columns={queryColumns}
        columnVisibility={{ visibleColumns, setVisibleColumns }}
        rowCount={rowCount}
        renderCellValue={renderCellValue}
        inMemory={{ level: 'sorting' }}
        sorting={{ columns: sortingColumns, onSort }}
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 50],
          onChangeItemsPerPage: onChangeItemsPerPage,
          onChangePage: onChangePage,
        }}
      />
    </div>
  )
}

function queryDataGridPropsAreEqual(prevProps: QueryDataGridProps, nextProps: QueryDataGridProps) {
  return prevProps.rowCount === nextProps.rowCount
    && JSON.stringify(prevProps.queryColumns) === JSON.stringify(nextProps.queryColumns)
    && JSON.stringify(prevProps.visibleColumns) === JSON.stringify(nextProps.visibleColumns)
    && JSON.stringify(prevProps.dataValues) === JSON.stringify(nextProps.dataValues)
}

export const QueryDataGridMemo = React.memo(QueryDataGrid, queryDataGridPropsAreEqual);