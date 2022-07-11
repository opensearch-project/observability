/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

// ag-data-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// styles
import './data_table.scss';

// grid elements
import { CustomOverlay, RowConfigType, GridHeader,  } from "./data_table_header"
import { GridFooter } from "./data_table_footer"

// constants
import {
  COLUMN_DEFAULT_MIN_WIDTH,
  HEADER_HEIGHT,
} from '../../../../../common/constants/explorer';


const doubleValueGetter = (params) => {
  return params.data[params.column.colId];
};

export const DataTable = ({ visualizations, layout, config }: any) => {
  const {
    data: vizData,
    jsonData,
    metadata: { fields = [] },
  } = visualizations.data.rawVizData;

  useEffect(() => {
    document.addEventListener('keydown', hideGridFullScreenHandler);
    return () => {
      document.removeEventListener('keydown', hideGridFullScreenHandler);
    };
  }, []);

  // rows and columns
  const raw_data = [...jsonData];

  const columns = fields.map((field: any) => {
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
  });

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
  const pageCount = Math.ceil(raw_data.length / pageSize);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      suppressMenu: true,
      minWidth: COLUMN_DEFAULT_MIN_WIDTH,
      headerHeight: 400,
    };
  }, []);

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
      <GridHeader
        isFullScreen={isFullScreen}
        setIsFullScreenHandler={setIsFullScreenHandler}
        selectedRowDensity={selectedRowDensity}
        selectDensityHandler={selectDensityHandler}
        columnVisiblityHandler={columnVisiblityHandler}
        columns={columns}
        columnVisibility={columnVisibility}
      />
      <AgGridReact
        ref={gridRef}
        rowData={raw_data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        domLayout={'autoHeight'}
        animateRows
        pagination
        paginationPageSize={pageSize}
        suppressPaginationPanel
        rowHeight={selectedRowDensity.height}
        onGridReady={() => {
          gridRef?.current?.api.setHeaderHeight(HEADER_HEIGHT);
        }}
      />
      <GridFooter
        onPageSizeChanged={onPageSizeChanged}
        pageSize={pageSize}
        activePage={activePage}
        goToPage={goToPage}
        pageCount={pageCount}
      />
      {isFullScreen && (
        <CustomOverlay>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <AgGridReact
                ref={gridRefFullScreen}
                rowData={raw_data}
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


