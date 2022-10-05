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
import { PatternData } from 'common/types/explorer';
import { reduce, round } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { PPL_DOCUMENTATION_URL, UI_DATE_FORMAT } from '../../../../../common/constants/shared';
import { selectPatterns } from '../../redux/slices/patterns_slice';

interface PatternsTableProps {
  tableData: PatternData[];
  tabId: string;
  openPatternFlyout: (pattern: PatternData) => void;
}

export function PatternsTable(props: PatternsTableProps) {
  const { tableData, tabId, openPatternFlyout } = props;
  const patternsData = useSelector(selectPatterns)[tabId];

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
      width: '22%',
      sortable: true,
      render: (item: string, row: PatternData) => {
        return <EuiLink onClick={() => openPatternFlyout(row)}>{row.patterns_field}&nbsp;</EuiLink>;
      },
    },
    {
      field: 'patterns_field',
      name: 'Pattern',
      width: '40%',
      sortable: true,
      render: (item: string, row: PatternData) => {
        return <EuiText>{item}</EuiText>;
      },
    },
    {
      field: 'ratio',
      name: 'Ratio',
      width: '5%',
      sortable: (row: PatternData) => row['count()'],
      render: (item: number, row: PatternData) => {
        const ratio =
          (row['count()'] /
            reduce(
              patternsData.total,
              (sum, n) => {
                return sum + n;
              },
              0
            )) *
          100;
        return <EuiText>{`${round(ratio, 2)}%`}</EuiText>;
      },
    },
    {
      field: 'count()',
      name: 'Count',
      width: '5%',
      sortable: true,
      render: (item: string, row: PatternData) => {
        return <EuiText>{item}</EuiText>;
      },
    },
    {
      field: 'length',
      name: 'Pattern length',
      width: '6%',
      sortable: (pattern: PatternData) => pattern.patterns_field.length,
      render: (item: any, row: PatternData) => {
        return <EuiText>{row.patterns_field.length}</EuiText>;
      },
    },
    {
      field: 'min(timestamp)',
      name: 'Earliest time',
      width: '10%',
      sortable: true,
      render: (item: string) => <EuiText>{moment(new Date(item)).format(UI_DATE_FORMAT)}</EuiText>,
    },
    {
      field: 'max(timestamp)',
      name: 'Recent time',
      width: '10%',
      sortable: true,
      render: (item: string) => <EuiText>{moment(new Date(item)).format(UI_DATE_FORMAT)}</EuiText>,
    },
  ];

  const sorting = {
    sort: {
      field: 'count()',
      direction: 'desc' as Direction,
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
