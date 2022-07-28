/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_grid.scss';

import React, { useMemo, useState, useEffect, useRef, RefObject } from 'react';
import { IExplorerFields } from '../../../common/types/explorer';
import { DEFAULT_COLUMNS, PAGE_SIZE } from '../../../common/constants/explorer';
import { getHeaders, getTrs, populateDataGrid } from './utils';
import { HttpSetup } from '../../../../../src/core/public';
import PPLService from '../../services/requests/ppl';

interface DataGridProps {
  http: HttpSetup;
  pplService: PPLService;
  rows: Array<any>;
  rowsAll: Array<any>;
  explorerFields: IExplorerFields;
  timeStampField: string;
  rawQuery: string;
}

export function DataGrid(props: DataGridProps) {
  const { http, pplService, rows, rowsAll, explorerFields, timeStampField, rawQuery } = props;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const loader = useRef<HTMLDivElement>(null);
  const [rowRefs, setRowRefs] = useState<RefObject<{closeAllFlyouts(openDocId: string): void}>[]>([]);

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

  const onFlyoutOpen = (docId: string) => {
    rowRefs.forEach((rowRef) => {
      rowRef.current?.closeAllFlyouts(docId);
    });
  };

  const Queriedheaders = useMemo(() => getHeaders(explorerFields.queriedFields, DEFAULT_COLUMNS), [
    explorerFields.queriedFields,
  ]);
  const [QueriedtableRows, setQueriedtableRows] = useState<any[]>([]);
  useEffect(() => {
    setQueriedtableRows(
      getTrs(
        http,
        explorerFields.queriedFields,
        limit,
        setLimit,
        PAGE_SIZE,
        timeStampField,
        explorerFields,
        pplService,
        rawQuery,
        rowRefs,
        setRowRefs,
        onFlyoutOpen,
        rows
      )
    );
  }, [rows, explorerFields.queriedFields]);

  const headers = useMemo(() => getHeaders(explorerFields.selectedFields, DEFAULT_COLUMNS), [
    explorerFields.selectedFields,
  ]);
  const [tableRows, setTableRows] = useState<any[]>([]);
  useEffect(() => {
    const dataToRender =
      explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 ? rowsAll : rows;
    setTableRows(
      getTrs(
        http,
        explorerFields.selectedFields,
        limit,
        setLimit,
        PAGE_SIZE,
        timeStampField,
        explorerFields,
        pplService,
        rawQuery,
        rowRefs,
        setRowRefs,
        onFlyoutOpen,
        dataToRender
      )
    );
  }, [rows, explorerFields.selectedFields]);

  useEffect(() => {
    setQueriedtableRows((prev) =>
      getTrs(
        http,
        explorerFields.queriedFields,
        limit,
        setLimit,
        PAGE_SIZE,
        timeStampField,
        explorerFields,
        pplService,
        rawQuery,
        rowRefs,
        setRowRefs,
        onFlyoutOpen,
        rows,
        prev
      )
    );
    const dataToRender =
      explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 ? rowsAll : rows;
    setTableRows((prev) =>
      getTrs(
        http,
        explorerFields.selectedFields,
        limit,
        setLimit,
        PAGE_SIZE,
        timeStampField,
        explorerFields,
        pplService,
        rawQuery,
        rowRefs,
        setRowRefs,
        onFlyoutOpen,
        dataToRender,
        prev
      )
    );
  }, [limit]);

  return (
    <>
      {populateDataGrid(explorerFields, Queriedheaders, QueriedtableRows, headers, tableRows)}
      <div ref={loader} />
    </>
  );
}
