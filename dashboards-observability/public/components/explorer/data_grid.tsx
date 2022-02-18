/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_grid.scss';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { IExplorerFields } from '../../../common/types/explorer';
import { DEFAULT_COLUMNS, PAGE_SIZE } from '../../../common/constants/explorer';
import { getHeaders, getTrs } from './utils';
import { HttpSetup } from '../../../../../src/core/public';

interface DataGridProps {
  http: HttpSetup;
  rows: Array<any>;
  rowsAll: Array<any>;
  explorerFields: IExplorerFields;
  timeStampField: string;
}

export function DataGrid(props: DataGridProps) {
  const { http, rows, rowsAll, explorerFields, timeStampField } = props;
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
        dataToRender,
        prev
      )
    );
  }, [limit]);

  return (
    <>
      {explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 && (
        <table className="osd-table table" data-test-subj="docTable">
          <thead>{Queriedheaders}</thead>
          <tbody>{QueriedtableRows}</tbody>
        </table>
      )}
      {explorerFields?.queriedFields &&
      explorerFields?.queriedFields?.length > 0 &&
      explorerFields.selectedFields?.length === 0 ? null : (
        <table className="osd-table table" data-test-subj="docTable">
          <thead>{headers}</thead>
          <tbody>{tableRows}</tbody>
        </table>
      )}
      <div ref={loader} />
    </>
  );
}
