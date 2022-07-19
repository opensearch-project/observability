/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiLink, EuiButtonIcon, EuiText, EuiInMemoryTable, Direction } from '@elastic/eui';
import moment from 'moment';
import React from 'react';
import { UI_DATE_FORMAT } from '../../../../../common/constants/shared';
import { TableDataType } from './patterns_tab';

interface PatternsTableProps {
  tableData: TableDataType[];
  renamePattern: (newName: string) => void;
  openPatternFlyout: (pattern: TableDataType) => void;
}

export function PatternsTable(props: PatternsTableProps) {
  const { tableData, renamePattern, openPatternFlyout } = props;

  // Uncomment below to enable EuiComboBox
  // const selectedItems = tableData.filter(
  //   (pat: TableDataType) =>
  //     selectedOptions.length === 0 ||
  //     selectedOptions.map((op) => op.label).includes(pat.puncSignature)
  // );

  // Uncomment below to enable Filters
  // const filteredItems = tableData.filter(
  //   (option: TableDataType) =>
  //     filters.length === 0 || filters.map((op) => op.value).includes(option.puncSignature)
  // );

  // Uncomment below to enable Search Bar
  // const search = {
  //   box: {
  //     incremental: true,
  //   },
  // };

  const tableColumns = [
    {
      field: 'patternName',
      name: 'Pattern Name',
      sortable: true,
      render: (item: string, row: TableDataType) => {
        return <EuiLink onClick={() => openPatternFlyout(row)}>{item}&nbsp;</EuiLink>;
      },
    },
    {
      field: 'puncSignature',
      name: 'Pattern',
      sortable: true,
      render: (item: string, row: TableDataType) => {
        return (
          <EuiText grow={false} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item}
          </EuiText>
        );
      },
    },
    {
      field: 'count',
      name: 'Count',
      sortable: true,
    },
    {
      field: 'ratio',
      name: 'Ratio',
      sortable: true,
    },
    {
      field: 'length',
      name: 'Pattern Length',
      sortable: (pattern: TableDataType) => pattern.puncSignature.length,
      render: (item: any, row: TableDataType) => {
        return row.puncSignature.length;
      },
    },
    {
      field: 'firstTimestamp',
      name: 'Earliest Time',
      sortable: true,
      render: (item: any) => moment(new Date(item)).format(UI_DATE_FORMAT),
    },
    {
      field: 'lastTimestamp',
      name: 'Recent Time',
      sortable: true,
      render: (item: any) => moment(new Date(item)).format(UI_DATE_FORMAT),
    },
    {
      field: 'edit',
      name: '',
      width: '20px',
      sortable: false,
      render: (item: any, row: TableDataType) => (
        <EuiButtonIcon
          iconType="pencil"
          color="text"
          onClick={() => renamePattern(row.patternName)}
        />
      ),
    },
  ];

  const sorting = {
    sort: {
      field: 'patternName',
      direction: 'asc' as Direction,
    },
    allowNeutralSort: true,
    enableAllColumns: true,
  };

  return (
    <EuiInMemoryTable
      // items={filteredItems}
      // items={selectedItems}
      items={tableData}
      columns={tableColumns}
      pagination={true}
      sorting={sorting}
      // search={search}
    />
  );
}
