/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiLink,
  EuiText,
  EuiInMemoryTable,
  Direction,
  EuiEmptyPrompt,
  EuiIcon,
} from '@elastic/eui';
import { PatternTableData } from 'common/types/explorer';
import { reduce, round } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PPL_DOCUMENTATION_URL } from '../../../../../common/constants/shared';
import { selectPatterns } from '../../redux/slices/patterns_slice';

interface PatternsTableProps {
  tableData: PatternTableData[];
  onPatternSelection: any;
  tabId: string;
}

export function PatternsTable(props: PatternsTableProps) {
  const { tableData, tabId, onPatternSelection } = props;
  const patternsData = useSelector(selectPatterns)[tabId];
  const [selectedPattern, setSelectedPattern] = useState<string>();

  const tableColumns = [
    {
      field: 'count',
      name: 'Count',
      width: '4%',
      sortable: true,
      render: (item: string, row: PatternTableData) => {
        return <EuiText>{item}</EuiText>;
      },
    },
    {
      field: 'ratio',
      name: 'Ratio',
      width: '4%',
      sortable: (row: PatternTableData) => row.count,
      render: (item: number, row: PatternTableData) => {
        const ratio =
          (row.count /
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
      field: 'sampleLog',
      name: 'Sample Log',
      width: '92%',
      sortable: true,
      render: (item: string, row: PatternTableData) => {
        return <EuiText>{item}</EuiText>;
      },
    },
  ];

  const sorting = {
    sort: {
      field: 'count',
      direction: 'desc' as Direction,
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
        onPatternSelection(pattern);
        setSelectedPattern(pattern);
      },
      isSelected: pattern === selectedPattern,
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
    />
  );
}
