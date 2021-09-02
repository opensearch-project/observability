/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import './data_grid.scss';

import React, { useMemo } from 'react';
import { uniqueId } from 'lodash';
import { DocViewRow } from './docTable/index';
import { IExplorerFields } from '../../../common/types/explorer';

interface DataGridProps {
  rows: Array<any>;
  explorerFields: IExplorerFields;
}

export function DataGrid(props: DataGridProps) {
  const {
    rows,
    explorerFields
  } = props;

  const getTrs = (
    docs: Array<any> = [],
    explorerFields: IExplorerFields
  ) => {
    return docs.map((doc) => {
      return (
        <DocViewRow
          key={ uniqueId('doc_view') } 
          doc={ doc }
          selectedCols={ explorerFields?.selectedFields }
        />
      );
    });
  };

  const defaultCols = [
    '',
    'Time',
    '_source'
  ];

  const getHeaders = (fields: IExplorerFields) => {
    let tableHeadContent = null;
    if (!fields.selectedFields || fields.selectedFields.length === 0) {
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
      tableHeadContent = fields.selectedFields.map(selField => {
        return (
          <th key={ uniqueId('datagrid-header-')}>{ selField.name }</th>
        );
      });
      tableHeadContent.unshift(<th key={ uniqueId('datagrid-header-')}>Time</th>);
      tableHeadContent.unshift(<th key={ uniqueId('datagrid-header-')}></th>);
    }

    return (
      <tr className="osdDocTableHeader">
        { tableHeadContent }
      </tr>
    );
    
  };

  const headers = useMemo(() => getHeaders(explorerFields), [ explorerFields ]);
  const tableRows = useMemo(() => getTrs(rows, explorerFields), [ rows, explorerFields ]);

  return (
    <>
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
    </>
  )
}
