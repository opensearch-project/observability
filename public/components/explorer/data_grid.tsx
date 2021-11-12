/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './data_grid.scss';

import React, { useMemo } from 'react';
import { uniqueId } from 'lodash';
import { DocViewRow } from './docTable/index';
import { IExplorerFields, IField } from '../../../common/types/explorer';

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

  const getTrs = (
    docs: Array<any> = [],
    explorerFields: Array<IField>
  ) => {
    return docs.map((doc) => {
      return (
        <DocViewRow
          key={ uniqueId('doc_view') } 
          doc={ doc }
          selectedCols={ explorerFields }
        />
      );
    });
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
      tableHeadContent = fields.map(selField => {
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
  const QueriedtableRows = useMemo(
    () => getTrs(rows, explorerFields.queriedFields),
    [ rows, explorerFields.queriedFields ]
  );
  const headers = useMemo(
    () => getHeaders(explorerFields.selectedFields),
    [ explorerFields.selectedFields ]
  );
  const tableRows = useMemo(
    () => {
      const dataToRender = explorerFields?.queriedFields && explorerFields.queriedFields.length > 0 ? rowsAll : rows
      return getTrs(dataToRender, explorerFields.selectedFields);
    },
    [ rows, explorerFields.selectedFields ]
  );


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
    </>
  )
}
