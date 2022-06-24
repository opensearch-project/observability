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
  ReactChildren,
  ReactChild,
} from 'react';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiPopover,
  EuiSwitch,
  EuiIcon,
  EuiContextMenuPanel,
  EuiContextMenuItem,
} from '@elastic/eui';

// pagination
import ReactPaginate from 'react-paginate';

// ag-data-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// styles
import './data_table.scss';

// theme
import { uiSettingsService } from '../../../../../common/utils';

// constants
import {
  GRID_HEADER_COLUMN_MAX_WIDTH,
  GRID_PAGE_RANGE_DSIPLAY,
  COLUMN_DEFAULT_MIN_WIDTH,
  ROW_DENSITIES,
  GRID_PAGE_SIZES,
  HEADER_HEIGHT,
} from '../../../../../common/constants/data_table';

interface RowConfig {
  icon: string;
  height: number;
  selected: boolean;
}

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
  const [selectedRowDensity, setSelectedRowDensity] = useState<RowConfig>({
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

  const selectDensityHandler = useCallback((value: RowConfig) => {
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

const CustomOverlay = ({
  children,
}: {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}) => {
  return (
    <div
      className={
        uiSettingsService.get('theme:darkMode')
          ? 'custom-overlay custom-overlay-dark'
          : 'custom-overlay custom-overlay-light'
      }
    >
      {children}
    </div>
  );
};

const GridHeader = ({
  isFullScreen,
  setIsFullScreenHandler,
  selectedRowDensity,
  selectDensityHandler,
  columnVisiblityHandler,
  columns,
  columnVisibility,
}: {
  isFullScreen: boolean;
  setIsFullScreenHandler: (v: boolean) => void;
  selectedRowDensity: any;
  selectDensityHandler: (v: RowConfig) => void;
  columnVisiblityHandler: (visible: boolean, field: string) => void;
  columns: any;
  columnVisibility: any;
}) => {
  return (
    <EuiFlexGroup
      responsive
      gutterSize="none"
      justifyContent="flexStart"
      style={{ position: 'relative' }}
    >
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <DensityPopover
          selectedDensity={selectedRowDensity}
          selectDensityHandler={selectDensityHandler}
        />
      </EuiFlexItem>
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <ColumnVisiblityPopover
          columnVisiblityHandler={columnVisiblityHandler}
          columns={columns}
          columnVisibility={columnVisibility}
        />
      </EuiFlexItem>
      <EuiFlexItem style={{ maxWidth: GRID_HEADER_COLUMN_MAX_WIDTH }}>
        <EuiButtonEmpty
          iconSize="s"
          color="text"
          aria-label="Next"
          iconType="fullScreen"
          onClick={() => setIsFullScreenHandler(true)}
        >
          Full screen
        </EuiButtonEmpty>
      </EuiFlexItem>
      {isFullScreen && (
        <EuiIcon
          type="cross"
          onClick={() => setIsFullScreenHandler(false)}
          style={{ position: 'absolute', right: 20, cursor: 'pointer', top: 20 }}
        />
      )}
    </EuiFlexGroup>
  );
};

const GridFooter = ({
  onPageSizeChanged,
  pageSize,
  activePage,
  goToPage,
  pageCount,
}: {
  onPageSizeChanged: (val: number) => void;
  goToPage: ({ selected }: { selected: number }) => void;
  pageSize: number;
  activePage: number;
  pageCount: number;
}) => {
  return (
    <EuiFlexGroup
      responsive
      gutterSize="none"
      justifyContent="spaceBetween"
      style={{ paddingTop: '10px', position: 'relative' }}
    >
      <EuiFlexItem grow={false}>
        <PageSizePopover onPageSizeChanged={onPageSizeChanged} pageSize={pageSize} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <ReactPaginate
          containerClassName={
            uiSettingsService.get('theme:darkMode')
              ? `custom-pagination-container dark-theme`
              : `custom-pagination-container`
          }
          breakLabel="..."
          nextLabel={<EuiIcon type="arrowRight" />}
          forcePage={activePage}
          onPageChange={goToPage}
          pageRangeDisplayed={GRID_PAGE_RANGE_DSIPLAY}
          pageCount={pageCount}
          previousLabel={<EuiIcon type="arrowLeft" />}
          renderOnZeroPageCount={null}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const DensityPopover = ({
  selectDensityHandler,
  selectedDensity,
}: {
  selectedDensity: any;
  selectDensityHandler: (data: RowConfig) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      aria-label="Next"
      iconType={selectedDensity.icon}
      onClick={onButtonClick}
    >
      Density
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        {ROW_DENSITIES.map((i: RowConfig, index: number) => (
          <EuiFlexItem key={index} grow={false}>
            <EuiButtonIcon
              onClick={() => selectDensityHandler(i)}
              display={selectedDensity.icon === i.icon ? 'fill' : 'base'}
              iconType={i.icon}
              aria-label="Next"
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiPopover>
  );
};

const ColumnVisiblityPopover = ({
  columnVisibility,
  columns,
  columnVisiblityHandler,
}: {
  columns: any;
  columnVisibility: any;
  columnVisiblityHandler: (visible: boolean, field: string) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      aria-label="Next"
      iconType="listAdd"
      onClick={onButtonClick}
    >
      Columns
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup
        // responsive={false}
        gutterSize="s"
        direction="column"
      >
        {columns.map((i: any, index: number) => {
          return (
            <EuiFlexItem key={index} grow={false}>
              <EuiSwitch
                label={i.field}
                checked={!columnVisibility.includes(i.field)}
                onChange={(e) => {
                  columnVisiblityHandler(e.target.checked, i.field);
                }}
                compressed
              />
            </EuiFlexItem>
          );
        })}
      </EuiFlexGroup>
    </EuiPopover>
  );
};

const PageSizePopover = ({
  onPageSizeChanged,
  pageSize,
}: {
  onPageSizeChanged: (size: number) => void;
  pageSize: number;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      size="s"
      aria-label="Next"
      iconType="arrowDown"
      iconSide="right"
      onClick={onButtonClick}
    >
      Rows per page: {pageSize}
    </EuiButtonEmpty>
  );

  const items = () => {
    return GRID_PAGE_SIZES.map((i: number) => (
      <EuiContextMenuItem
        layoutAlign="bottom"
        key={`${i} rows`}
        icon={i === pageSize ? 'check' : 'empty'}
        onClick={() => {
          onPageSizeChanged(i);
          closePopover();
        }}
      >
        {i} rows
      </EuiContextMenuItem>
    ));
  };

  return (
    <EuiPopover
      id="singlePanel"
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel items={items()} />
    </EuiPopover>
  );
};
