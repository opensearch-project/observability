/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import './dataGrid.scss';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { 
  EuiFlexGroup,
  EuiDataGrid,
  EuiBasicTable,
  EuiIcon
} from '@elastic/eui';
import { DocViewRow } from './docTable/index';

type QueryDataGridProps = {
  rowCount: number,
  queryColumns: Array<any>,
  visibleColumns: Array<any>,
  setVisibleColumns: Function,
  dataValues: Array<any>
}

export function QueryDataGrid(props: any) {
  const {
    rowCount,
    queryColumns,
    // visibleColumns,
    // setVisibleColumns,
    dataValues,
    selectedCols = [],
    plugins
  } = props;
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // ** Sorting config
  const [sortingColumns, setSortingColumns] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  
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

  const sorting = {
    sort: {
      field: 'timestamp',
      direction: 'desc',
    }
  };

  const renderCellValue = useMemo(() => {
    return ({ rowIndex, columnId }) => {
      return dataValues.hasOwnProperty(rowIndex)
        ? dataValues[rowIndex][columnId]
        : null;
    };
  }, [dataValues]);

  const getTrs = (docs, selectedCols) => {
    
    return docs.map((doc) => {
      return (
        <DocViewRow 
          doc={ doc }
          selectedCols={ selectedCols }
          plugins={ plugins }
        />
      );
    });
  };

  const getHeaders = (queryColumns, selectedCols) => {
    if (!selectedCols || selectedCols.length === 0) {
      return (
        <tr className="kbnDocTableHeader">
          <th></th>
          <th>Time</th>
          <th>_source</th>
        </tr>
      );
    }
    
  };

  const headers = useMemo(() => getHeaders(queryColumns, selectedCols), [ queryColumns, selectedCols ]);

  const tableRows = useMemo(() => getTrs(dataValues, selectedCols), [ dataValues, selectedCols ]);

  return (
    <div>
      {/* <EuiDataGrid
        aria-label='PPL datagrid'
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
      /> */}
      <table 
        className="kbn-table table" 
        data-test-subj="docTable">
        <thead>
          { headers }
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </table>
    </div>
  )
}
