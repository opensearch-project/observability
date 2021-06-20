/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
    docs: Array<any>,
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
