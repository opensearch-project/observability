/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_grid.scss';

import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { uniqueId } from 'lodash';
import { DocViewRow } from './docTable/index';
import { IExplorerFields, IField } from '../../../common/types/explorer';
import { PAGE_SIZE } from '../../../common/constants/explorer';

interface DataGridProps {
  rows: Array<any>;
  rowsAll: Array<any>;
  explorerFields: IExplorerFields;
}

export function DataGrid(props: DataGridProps) {
  const {
    rows,
    rowsAll,
    explorerFields
  } = props;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setLimit((limit) => limit + PAGE_SIZE);
      },
      {
        root: null,
        rootMargin: '500px',
        threshold: 0,
      }
    );
    observer.observe(loader.current);

    return () => observer.disconnect();
  }, [loader]);

  const getTrs = (
    docs: Array<any> = [],
    explorerFields: Array<IField>,
    prevTrs: any[] = [],
  ) => {
    if (prevTrs.length >= docs.length) return prevTrs;

    // reset limit if no previous table rows
    if (prevTrs.length === 0 && limit !== PAGE_SIZE) setLimit(PAGE_SIZE);
    const trs = prevTrs.slice();

    const upperLimit = Math.min(trs.length === 0 ? PAGE_SIZE : limit, docs.length);
    for (let i = trs.length; i < upperLimit; i++) {
      trs.push(
        <DocViewRow
          key={ uniqueId('doc_view') } 
          doc={ docs[i] }
          selectedCols={ explorerFields }
        />
      )
    }
    return trs;
  };

  const defaultCols = [
    '',
    'Time',
    '_source'
  ];

  const getHeaders = (fields: any) => {
    let tableHeadContent = null;
    if (!fields || fields.length === 0) {
      tableHeadContent = (
          <>
            { defaultCols.map((colName: string) => {
              return (
                <th key={ uniqueId('datagrid-header-') }>
                  { colName }
                </th>
              );
            }) }
          </>
      );
    } else {
      tableHeadContent = fields.map((selField: any) => {
        return (
          <th key={ uniqueId('datagrid-header-')}>{ selField.name }</th>
        );
      });
      tableHeadContent.unshift(<th key={ uniqueId('datagrid-header-')}></th>);
    }

    return (
      <tr className="osdDocTableHeader">
        { tableHeadContent }
      </tr>
    );
    
  };

  const Queriedheaders = useMemo(
    () => getHeaders(explorerFields.queriedFields), 
    [ explorerFields.queriedFields ]
  );
  const [QueriedtableRows, setQueriedtableRows] = useState<any[]>([]);
  useEffect(() => {
    setQueriedtableRows(getTrs(rows, explorerFields.queriedFields));
  }, [ rows, explorerFields.queriedFields ]);

  const headers = useMemo(
    () => getHeaders(explorerFields.selectedFields),
    [ explorerFields.selectedFields ]
  );
  const [tableRows, setTableRows] = useState<any[]>([]);
  useEffect(() => {
    const dataToRender = explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 ? rowsAll : rows;
    setTableRows(getTrs(dataToRender, explorerFields.selectedFields));
  }, [ rows, explorerFields.selectedFields ]);

  useEffect(() => {
    setQueriedtableRows((prev) => getTrs(rows, explorerFields.queriedFields, prev));
    const dataToRender = explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 ? rowsAll : rows;
    setTableRows((prev) => getTrs(dataToRender, explorerFields.selectedFields, prev));
  }, [limit]);

  return (
    <>
      {
        explorerFields?.queriedFields &&
        explorerFields.queriedFields.length > 0 &&
        (
          <table 
            className="osd-table table"
            data-test-subj="docTable">
            <thead>
              { Queriedheaders }
            </thead>
            <tbody>
              { QueriedtableRows }
            </tbody>
          </table>
        )
      }
      {
        (
          explorerFields?.queriedFields &&
          explorerFields?.queriedFields?.length > 0 &&
          explorerFields.selectedFields?.length === 0
        ) ? null : (
          <table
            className="osd-table table"
            data-test-subj="docTable">
            <thead>
              { headers }
            </thead>
            <tbody>
              { tableRows }
            </tbody>
          </table>
        )
      }
      <div ref={loader} />
    </>
  )
}
