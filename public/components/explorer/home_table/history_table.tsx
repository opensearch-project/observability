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

import { EuiListGroupItem, formatDate } from '@elastic/eui';
import React, { useState } from 'react';

import {
  EuiBasicTable,
  EuiCode,
  EuiLink,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSwitch,
} from '@elastic/eui';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeQuery } from '../slices/query_slice';
import { initialTabId } from '../../../framework/redux/store/shared_state';
import { RAW_QUERY } from '../../../../common/constants/explorer';

interface TableData {
  savedHistory: any;
}

export function Table(options: TableData) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  // const query= "search source=opensearch_dashboards_sample_data_logs | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')";

  const onTableChange = ({ page = {} }) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const togglePerPageOptions = () => setShowPerPageOptions(!showPerPageOptions);

  // const { pageOfItems, totalItemCount } = store.findUsers(pageIndex, pageSize);
  const pageOfItems = [10];
  console.log('history table: ', options);
  const columns = [
    {
      field: 'queryHistory',
      name: 'Query History',
      mobileOptions: {
        header: true,
        only: true,
        enlarge: true,
        fullWidth: true,
      },
      render: (options) => (
        <EuiListGroupItem
          key={uniqueId('query-his-')}
          onClick={(item) => {
            dispatch(
              changeQuery({
                tabId: initialTabId,
                query: {
                  [RAW_QUERY]: item.target.outerText,
                },
              })
            );
            history.push('/explorer/events');
          }}
          label={options.savedHistory.savedQuery.query}
          color="primary"
          size="s"
          // iconType={tokenEnum}
        />
      ),
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: 10,
    pageSizeOptions: [3, 5, 8],
    hidePerPageOptions: !showPerPageOptions,
  };

  return (
    <div>
      <EuiSwitch
        checked={!showPerPageOptions}
        label={
          <span>
            Hide per page options with <EuiCode>pagination.hidePerPageOptions = true</EuiCode>
          </span>
        }
        onChange={togglePerPageOptions}
      />
      <EuiSpacer size="xl" />
      <EuiBasicTable
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
      />
    </div>
  );
}
