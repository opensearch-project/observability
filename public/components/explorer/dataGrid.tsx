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

import './dataGrid.scss';

import React, { useMemo } from 'react';
import _ from 'lodash';
import { DocViewRow } from './docTable/index';

interface DataGridProps {
  rows: Array<any>,
  explorerFields: Array<any>
}

export function DataGrid(props: DataGridProps) {
  const {
    rows,
    explorerFields
  } = props;

  const getTrs = (
    docs: Array<any> = [],
    explorerFields: Array<any>
  ) => {
    return docs.map((doc) => {
      return (
        <DocViewRow
          key={ _.uniqueId('doc_view') } 
          doc={ doc }
          selectedCols={ explorerFields?.selectedFields }
        />
      );
    });
  };

  const getHeaders = (fields: Array<any>) => {
    let tableHeadContent = null;
    if (!fields.selectedFields || fields.selectedFields.length === 0) {
      tableHeadContent = (
          <>
            <th></th>
            <th>Time</th>
            <th>_source</th>
          </>
      );
    } else {
      tableHeadContent = fields.selectedFields.map(selField => {
        return (
          <th>{ selField.name }</th>
        );
      });
      tableHeadContent.unshift(<th>Time</th>);
      tableHeadContent.unshift(<th></th>);
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
