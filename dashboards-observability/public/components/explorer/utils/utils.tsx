/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IExplorerFields, IField } from '../../../../common/types/explorer';
import { uniqueId } from 'lodash';
import React from 'react';
import { DocViewRow } from '../docTable';

export const getTrs = (
  explorerFields: Array<IField>,
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  PAGE_SIZE: number,
  timeStampField: any,
  explorerFieldsFull: IExplorerFields,
  docs: Array<any> = [],
  prevTrs: any[] = []
) => {
  if (prevTrs.length >= docs.length) return prevTrs;

  // reset limit if no previous table rows
  if (prevTrs.length === 0 && limit !== PAGE_SIZE) setLimit(PAGE_SIZE);
  const trs = prevTrs.slice();

  const upperLimit = Math.min(trs.length === 0 ? PAGE_SIZE : limit, docs.length);
  for (let i = trs.length; i < upperLimit; i++) {
    trs.push(
      <DocViewRow
        key={uniqueId('doc_view')}
        doc={docs[i]}
        selectedCols={explorerFields}
        timeStampField={timeStampField}
        explorerFields={explorerFieldsFull}
      />
    );
  }
  return trs;
};

const defaultCols = ['', 'Time', '_source'];

export const getHeaders = (fields: any) => {
  let tableHeadContent = null;
  if (!fields || fields.length === 0) {
    tableHeadContent = (
      <>
        {defaultCols.map((colName: string) => {
          return <th key={uniqueId('datagrid-header-')}>{colName}</th>;
        })}
      </>
    );
  } else {
    tableHeadContent = fields.map((selField: any) => {
      return <th key={uniqueId('datagrid-header-')}>{selField.name}</th>;
    });
    tableHeadContent.unshift(<th key={uniqueId('datagrid-header-')}></th>);
  }

  return <tr className="osdDocTableHeader">{tableHeadContent}</tr>;
};
