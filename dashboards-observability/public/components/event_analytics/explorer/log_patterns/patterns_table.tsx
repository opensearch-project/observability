/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiLink,
  EuiButtonIcon,
  EuiText,
  EuiInMemoryTable,
  Direction,
  EuiEmptyPrompt,
  EuiIcon,
  EuiToolTip,
} from '@elastic/eui';
import moment from 'moment';
import React from 'react';
import { PPL_DOCUMENTATION_URL, UI_DATE_FORMAT } from '../../../../../common/constants/shared';
import { PatternType } from './patterns_tab';

interface PatternsTableProps {
  tableData: PatternType[];
  renamePattern: (newName: string) => void;
  openPatternFlyout: (pattern: PatternType) => void;
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

  const search = {
    box: {
      incremental: true,
    },
  };

  const tableColumns = [
    {
      field: 'patternName',
      name: 'Pattern name',
      width: '12%',
      sortable: true,
      render: (item: string, row: PatternType) => {
        return <EuiLink onClick={() => openPatternFlyout(row)}>{item}&nbsp;</EuiLink>;
      },
    },
    {
      field: 'puncSignature',
      name: 'Pattern',
      sortable: true,
      render: (item: string, row: PatternType) => {
        return <EuiText>{item}</EuiText>;
      },
    },
    {
      field: 'ratio',
      name: 'Ratio',
      width: '5%',
      sortable: true,
    },
    {
      field: 'count',
      name: 'Count',
      width: '5%',
      sortable: true,
    },
    {
      field: 'length',
      name: 'Pattern length',
      width: '6%',
      sortable: (pattern: PatternType) => pattern.puncSignature.length,
      render: (item: any, row: PatternType) => {
        return row.puncSignature.length;
      },
    },
    {
      field: 'firstTimestamp',
      name: 'Earliest time',
      width: '10%',
      sortable: true,
      render: (item: any) => moment(new Date(item)).format(UI_DATE_FORMAT),
    },
    {
      field: 'lastTimestamp',
      name: 'Recent time',
      width: '10%',
      sortable: true,
      render: (item: any) => moment(new Date(item)).format(UI_DATE_FORMAT),
    },
    {
      field: 'edit',
      name: '',
      width: '30px',
      sortable: false,
      render: (item: any, row: PatternType) => (
        <EuiToolTip content={<EuiText>Edit name</EuiText>} position="top">
          <EuiButtonIcon
            iconType="pencil"
            color="text"
            onClick={() => renamePattern(row.patternName)}
          />
        </EuiToolTip>
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

  const message = (
    <EuiEmptyPrompt
      title={<h3>No patterns found.</h3>}
      titleSize="s"
      iconType="minusInCircle"
      iconColor="#DDDDDD"
      body={
        <p>
          Try expanding your time range or modifying your query. Learn more from our{' '}
          <EuiLink href={PPL_DOCUMENTATION_URL}>
            PPL documentation
            <EuiIcon type="popout" />
          </EuiLink>
        </p>
      }
    />
  );

  return (
    <EuiInMemoryTable
      // items={filteredItems}
      // items={selectedItems}
      items={tableData}
      columns={tableColumns}
      pagination={true}
      sorting={sorting}
      message={message}
      search={search}
    />
  );
}
