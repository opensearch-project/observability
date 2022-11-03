/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiEmptyPrompt,
  EuiIcon,
  EuiInMemoryTable,
  EuiLink,
  EuiText,
  SortDirection,
} from '@elastic/eui';
import { PatternTableData } from 'common/types/explorer';
import { round } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { FILTERED_PATTERN } from '../../../../../common/constants/explorer';
import { PPL_DOCUMENTATION_URL } from '../../../../../common/constants/shared';
import { selectPatterns } from '../../redux/slices/patterns_slice';

interface PatternsTableProps {
  tableData: PatternTableData[];
  onPatternSelection: any;
  tabId: string;
  query: any;
  isPatternLoading: boolean;
}

export function PatternsTable(props: PatternsTableProps) {
  const { tableData, tabId, onPatternSelection, query } = props;
  const patternsData = useSelector(selectPatterns)[tabId];

  const tableColumns = [
    {
      field: 'count',
      name: 'Count',
      width: '6%',
      sortable: true,
      render: (item: string) => {
        return <EuiText size="s">{item}</EuiText>;
      },
    },
    {
      field: 'count',
      name: 'Ratio',
      width: '6%',
      sortable: (row: PatternTableData) => row.count,
      render: (item: number) => {
        const ratio = (item / patternsData.total) * 100;
        return <EuiText size="s">{`${round(ratio, 2)}%`}</EuiText>;
      },
    },
    {
      field: 'anomalyCount',
      name: 'Anomalies',
      width: '6%',
      sortable: (row: PatternTableData) => row.anomalyCount,
      render: (item: number) => {
        return <EuiText size="s">{item}</EuiText>;
      },
    },
    {
      field: 'sampleLog',
      name: 'Sample Log',
      width: '82%',
      sortable: true,
      render: (item: string) => {
        return <EuiText size="s">{item}</EuiText>;
      },
    },
  ];

  const sorting = {
    sort: {
      field: 'count',
      direction: SortDirection.DESC,
    },
    allowNeutralSort: true,
    enableAllColumns: true,
  };

  const pagination = {
    pageSizeOptions: [5, 10, 15, 20],
    initialPageSize: 5,
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

  const getRowProps = (item: PatternTableData) => {
    const { pattern } = item;
    return {
      'data-test-subj': `row-${pattern}`,
      className: 'customRowClass',
      onClick: () => {
        if (!props.isPatternLoading) {
          onPatternSelection(pattern);
        }
      },
      isSelected: pattern === query[FILTERED_PATTERN],
    };
  };

  return (
    <EuiInMemoryTable
      items={tableData}
      columns={tableColumns}
      pagination={pagination}
      sorting={sorting}
      message={message}
      rowProps={getRowProps}
      isSelectable={true}
      tableLayout="auto"
    />
  );
}
