/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext } from 'react';
import { EuiInMemoryTable } from '@elastic/eui';

export const VizRawDataPanel = ({ vizVectors, columns }: any) => {
  const [pagination, setPagination] = useState({ pageIndex: 0 });

  return (
    <EuiInMemoryTable
      items={vizVectors.map((row, index) => {
        return {
          ...row,
          index,
        };
      })}
      columns={columns.map((col) => {
        return {
          field: col.name,
          name: col.name,
          sortable: true,
          truncateText: true,
        };
      })}
      pagination={pagination}
      tableCaption="Raw data"
    />
  );
};
