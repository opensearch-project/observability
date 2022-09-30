/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

// ag-data-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// grid elements
import { CustomOverlay, RowConfigType, GridHeader } from './data_table_header';
import { GridFooter } from './data_table_footer';

// constants
import { COLUMN_DEFAULT_MIN_WIDTH, HEADER_HEIGHT } from '../../../../../common/constants/explorer';
import { IVisualizationContainerProps, IField } from '../../../../../common/types/explorer';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// styles
import './data_table.scss';

const doubleValueGetter = (params) => {
  return params.data[params.column.colId];
};

export const DataTable = ({ visualizations, layout, config }: any) => {
  const {
    data: {
      defaultAxes,
      indexFields,
      query,
      rawVizData: {
        data: queriedVizData,
        jsonData,
        metadata: { fields = [] },
      },
      userConfigs,
    },
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;

  const { dataConfig = {} } = userConfigs;
  const enablePagination =
    typeof dataConfig?.chartStyles?.enablePagination !== 'undefined'
      ? dataConfig?.chartStyles?.enablePagination
      : visualizations.vis.enablepagination;

  const showTableHeader =
    typeof dataConfig?.chartStyles?.showTableHeader !== 'undefined'
      ? dataConfig?.chartStyles?.showTableHeader
      : visualizations.vis.showtableheader;

  const colunmFilter =
    typeof dataConfig?.chartStyles?.colunmFilter !== 'undefined'
      ? dataConfig?.chartStyles?.colunmFilter
      : visualizations.vis.colunmfilter;

  const columnAlignment =
    dataConfig?.chartStyles?.columnAlignment || visualizations.vis.columnalignment;

  const columnWidth =
    typeof dataConfig?.chartStyles?.columnWidth !== 'undefined'
      ? dataConfig?.chartStyles?.columnWidth
      : visualizations.vis.columnwidth;

  useEffect(() => {
    document.addEventListener('keydown', hideGridFullScreenHandler);
    return () => {
      document.removeEventListener('keydown', hideGridFullScreenHandler);
    };
  }, []);

  // rows and columns
  const rawData = [...jsonData];

  const columns = useMemo(
    () =>
      fields.map((field: IField) => {
        return {
          lockVisible: true,
          columnsMenuParams: {
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
          headerName: field.name,
          field: field.name,
          colId: field.name,
          ...(field.type === 'double' && {
            valueGetter: doubleValueGetter,
          }),
        };
      }),
    [fields]
  );

  // ag-grid-react bindings
  const gridRef = useRef<any | undefined>();
  const gridRefFullScreen = useRef<any | undefined>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [columnVisibility, setColumnVisibility] = useState<string[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [selectedRowDensity, setSelectedRowDensity] = useState<RowConfigType>({
    icon: 'tableDensityCompact',
    height: 35,
    selected: true,
  });
  // pagination
  const [activePage, setActivePage] = useState<number>(0);
  const pageCount = Math.ceil(rawData.length / pageSize);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: colunmFilter,
      flex: 1,
      suppressMenu: false,
      minWidth: COLUMN_DEFAULT_MIN_WIDTH,
      headerHeight: 400,
      type: columnAlignment,
    };
  }, [colunmFilter, columnAlignment]);

  useEffect(() => {
    if (!dataConfig?.chartStyles?.columnWidth) {
      gridRef?.current?.api?.sizeColumnsToFit();
    } else {
      columns.forEach((col: any) =>
        gridRef?.current?.columnApi?.setColumnWidth(col.field, Number(columnWidth))
      );
    }
  }, [columnWidth, columns, dataConfig]);

  const onPageSizeChanged = useCallback(
    (val: number) => {
      setPageSize(val);
      gridRef.current.api.paginationSetPageSize(val);
      setActivePage(0);
      gridRef.current.api.paginationGoToPage(0);
      if (isFullScreen) {
        gridRefFullScreen.current.api.paginationSetPageSize(val);
        gridRefFullScreen.current.api.paginationGoToPage(0);
      }
    },
    [isFullScreen]
  );

  const selectDensityHandler = useCallback((value: RowConfigType) => {
    setSelectedRowDensity({ ...value });
    gridRef.current.api.forEachNode((rowNode) => {
      if (rowNode.data) {
        rowNode.setRowHeight(value.height);
      }
    });
    gridRef.current.api.onRowHeightChanged();
  }, []);

  const columnVisiblityHandler = useCallback((visible: boolean, field: string) => {
    const isExisting = columnVisibility.findIndex((column) => column === field);
    if (visible) {
      if (isExisting > -1) {
        columnVisibility.splice(isExisting, 1);
        gridRef?.current?.columnApi?.setColumnsVisible([field], true);
      }
    } else {
      columnVisibility.push(field);
      gridRef?.current?.columnApi?.setColumnsVisible([field], false);
    }
    setColumnVisibility([...columnVisibility]);
  }, []);

  const goToPage = ({ selected }: { selected: number }) => {
    setActivePage(selected);
    gridRef.current.api.paginationGoToPage(selected);
    if (isFullScreen) {
      gridRefFullScreen.current.api.paginationGoToPage(selected);
    }
  };

  const setIsFullScreenHandler = (val: boolean) => {
    setIsFullScreen(val);
  };

  const hideGridFullScreenHandler = (e: any) => {
    if (e.key === 'Escape') {
      setIsFullScreen(false);
    }
  };

  return (
    <>
      {showTableHeader && (
        <GridHeader
          isFullScreen={isFullScreen}
          setIsFullScreenHandler={setIsFullScreenHandler}
          selectedRowDensity={selectedRowDensity}
          selectDensityHandler={selectDensityHandler}
          columnVisiblityHandler={columnVisiblityHandler}
          columns={columns}
          columnVisibility={columnVisibility}
        />
      )}
      <AgGridReact
        ref={gridRef}
        rowData={rawData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        domLayout={'autoHeight'}
        animateRows
        pagination={enablePagination}
        paginationPageSize={pageSize}
        suppressPaginationPanel
        rowHeight={selectedRowDensity.height}
        onGridReady={() => {
          gridRef?.current?.api.setHeaderHeight(HEADER_HEIGHT);
        }}
        suppressFieldDotNotation // added for key contains dot operator
      />
      {enablePagination && (
        <GridFooter
          onPageSizeChanged={onPageSizeChanged}
          pageSize={pageSize}
          activePage={activePage}
          goToPage={goToPage}
          pageCount={pageCount}
        />
      )}
      {isFullScreen && (
        <CustomOverlay>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <AgGridReact
                ref={gridRefFullScreen}
                rowData={rawData}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                animateRows
                pagination
                paginationPageSize={pageSize}
                suppressPaginationPanel
                rowHeight={selectedRowDensity.height}
                onGridReady={() => {
                  gridRefFullScreen?.current?.api.setHeaderHeight(HEADER_HEIGHT);
                }}
                // added for key contains dot operator
                suppressFieldDotNotation
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <GridFooter
                onPageSizeChanged={onPageSizeChanged}
                pageSize={pageSize}
                activePage={activePage}
                goToPage={goToPage}
                pageCount={pageCount}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </CustomOverlay>
      )}
    </>
  );
};
