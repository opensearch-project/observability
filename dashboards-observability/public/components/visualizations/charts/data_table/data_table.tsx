/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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

// af-data-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

// styles
import './data_table.scss';

// theme
import { uiSettingsService } from '../../../../../common/utils';

export const DataTable = ({ visualizations, layout, config }: any) => {
  const {
    data: vizData,
    jsonData,
    metadata: { fields = [] },
  } = visualizations.data.rawVizData;
  const raw_data = [...jsonData];
  const columns = fields.map((field: any) => {
    return {
      headerName: field.name,
      field: field.name,
      id: field.name,
      columnsMenuParams: {
        suppressColumnFilter: true,
        suppressColumnSelectAll: true,
        suppressColumnExpandAll: true,
      },
    };
  });

  // ag-grid-react bindings
  const gridRef = useRef<any | undefined>();
  const [pageSize, setPageSize] = useState(10);
  const [columnVisibility, setColumnVisibility] = useState([]);
  const [selectedRowDensity, setSelectedRowDensity] = useState({
    icon: 'tableDensityNormal',
    height: 40,
    selected: true,
  });
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      suppressMenu: true,
    };
  }, []);

  const onPageSizeChanged = useCallback((val) => {
    setPageSize(val);
    gridRef.current.api.paginationSetPageSize(val);
    setActivePage(0);
    gridRef.current.api.paginationGoToPage(0);
  }, []);

  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const selectDensityHandler = useCallback((value) => {
    setSelectedRowDensity({ ...value });
    gridRef.current.api.forEachNode((rowNode) => {
      if (rowNode.data) {
        rowNode.setRowHeight(value.height);
      }
    });
    gridRef.current.api.onRowHeightChanged();
  }, []);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const columnVisiblityHandler = useCallback((visible: boolean, feild: any) => {
    const isExisting = columnVisibility.findIndex((i) => i === feild);
    if (visible) {
      if (isExisting > -1) {
        columnVisibility.splice(isExisting, 1);
        gridRef?.current?.columnApi?.setColumnsVisible([feild], true);
      }
    } else {
      columnVisibility.push(feild);
      gridRef?.current?.columnApi?.setColumnsVisible([feild], false);
    }
    setColumnVisibility([...columnVisibility]);
  }, []);

  // pagination
  const pageCount = Math.ceil(raw_data.length / pageSize);
  const [activePage, setActivePage] = useState(0);
  const goToPage = ({ selected }: { selected: number }) => {
    setActivePage(selected);
    gridRef.current.api.paginationGoToPage(selected);
  };

  const setIsFullScreenHandler = (val: boolean) => {
    setIsFullScreen(val);
    // const myGrid = document.getElementById('myGrid');
    // myGrid?.webkitRequestFullscreen();
  };

  useEffect(() => {
    document.addEventListener('keydown', hideGridFullScreenHandler);
    return () => {
      document.removeEventListener('keydown', hideGridFullScreenHandler);
    };
  }, [isFullScreen]);

  const hideGridFullScreenHandler = (e: any) => {
    if (e.key === 'Escape') {
      if (isFullScreen) {
        setIsFullScreen(false);
      }
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
      <div style={{ height: '460px' }}>
        <AgGridReact
          ref={gridRef}
          rowData={raw_data}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          enableRangeSelection={true}
          pagination={true}
          // domLayout={'autoHeight'}
          paginationPageSize={pageSize}
          paginationNumberFormatter={paginationNumberFormatter}
          suppressPaginationPanel={true}
          rowHeight={selectedRowDensity.height}
        />
      </div>
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
              <div style={{ height: '500px' }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={raw_data}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                  rowSelection="multiple"
                  enableRangeSelection={true}
                  pagination={true}
                  // domLayout={'autoHeight'}
                  paginationPageSize={pageSize}
                  paginationNumberFormatter={paginationNumberFormatter}
                  suppressPaginationPanel={true}
                  rowHeight={selectedRowDensity.height}
                />
              </div>
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

const CustomOverlay = ({ children }: { children: any }) => {
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
  selectDensityHandler: (v: any) => void;
  columnVisiblityHandler: (visible: boolean, feild: any) => void;
  columns: any;
  columnVisibility: any;
}) => {
  return (
    <>
      <EuiFlexGroup
        responsive={true}
        gutterSize="none"
        justifyContent="flexStart"
        style={{ position: 'relative' }}
      >
        <EuiFlexItem style={{ maxWidth: '150px' }}>
          <DensityPopover
            selectedDensity={selectedRowDensity}
            selectDensityHandler={selectDensityHandler}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: '150px' }}>
          <ColumnVisiblityPopover
            columnVisiblityHandler={columnVisiblityHandler}
            columns={columns}
            columnVisibility={columnVisibility}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: '150px' }}>
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
    </>
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
  goToPage: (val: number) => void;
  pageSize: number;
  activePage: number;
  pageCount: number;
}) => {
  return (
    <EuiFlexGroup
      responsive={true}
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
          pageRangeDisplayed={5}
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
  selectDensityHandler: (data: any) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const rowDensities = [
    { icon: 'tableDensityExpanded', height: 60, selected: false },
    { icon: 'tableDensityNormal', height: 40, selected: true },
    { icon: 'tableDensityCompact', height: 30, selected: false },
  ];

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        {rowDensities.map((i: any, index: number) => (
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

// export const AlignPopover = ({
//   columnAlignment,
//   setColumnAlignment,
// }: {
//   columnAlignment: string;
//   setColumnAlignment: (data: any) => void;
// }) => {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

//   const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
//   const closePopover = () => setIsPopoverOpen(false);

//   const button = (
//     <EuiButtonEmpty
//       iconSize="s"
//       color="text"
//       aria-label="Next"
//       iconType={`editorAlign${columnAlignment}`}
//       onClick={onButtonClick}
//     >
//       Align
//     </EuiButtonEmpty>
//   );

//   const align = ['Left', 'Center', 'Right'];

//   return (
//     <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
//       <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
//         {align.map((i: any, index: number) => (
//           <EuiFlexItem key={index} grow={false}>
//             <EuiButtonIcon
//               onClick={() => setColumnAlignment(i)}
//               display={columnAlignment === i ? 'fill' : 'base'}
//               iconType={`editorAlign${i}`}
//               aria-label="Next"
//             />
//           </EuiFlexItem>
//         ))}
//       </EuiFlexGroup>
//     </EuiPopover>
//   );
// };

const ColumnVisiblityPopover = ({
  columnVisibility,
  columns,
  columnVisiblityHandler,
}: {
  columns: any;
  columnVisibility: any;
  columnVisiblityHandler: (visible: boolean, feild: any) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <EuiButtonEmpty
      iconSize="s"
      color="text"
      aria-label="Next"
      iconType="listAdd"
      onClick={onButtonClick}
      //style={{width: "30px"}}
    >
      Columns
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover button={button} isOpen={isPopoverOpen} closePopover={closePopover}>
      <EuiFlexGroup responsive={false} gutterSize="s" direction="column">
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

  const sizes = [10, 50, 100];

  const items = () => {
    return sizes.map((i) => (
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
