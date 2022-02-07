/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiInMemoryTable } from '@elastic/eui';

export const DataTable = ({ visualizations, visAxes }: any) => {
  const {
    data = {},
    jsonData = {},
    metadata: { fields },
  } = visualizations.data.rawResponse;

  const colunms = fields.map((field) => {
    return {
      field: field.name,
      name: field.name,
      sortable: true,
      truncateText: true,
    };
  });

  return <EuiInMemoryTable items={jsonData} columns={colunms} pagination={true} />;
};
