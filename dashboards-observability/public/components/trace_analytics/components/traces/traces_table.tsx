/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiTableFieldDataColumnType,
  EuiText,
  PropertySort,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { TRACES_MAX_NUM } from '../../../../../common/constants/trace_analytics';
import {
  MissingConfigurationMessage,
  NoMatchMessage,
  PanelTitle,
} from '../common/helper_functions';

export function TracesTable(props: {
  items: any[];
  refresh: (sort?: PropertySort) => void;
  indicesExist: boolean;
  loading: boolean;
  page?: string;
  openTraceFlyout?: any;
}) {
  const renderTitleBar = (totalItems?: number) => {
    return (
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={10}>
          <PanelTitle title="Traces" totalItems={totalItems} />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  const columns = useMemo(
    () =>
      [
        {
          field: 'trace_id',
          name: 'Trace ID',
          align: 'left',
          sortable: true,
          truncateText: true,
          render: (item) => (
            <EuiFlexGroup gutterSize="s" alignItems="center">
              <EuiFlexItem grow={10}>
                {props.page === 'app' ? (
                  <EuiLink onClick={() => props.openTraceFlyout(item)}>
                    {item.length < 24 ? (
                      item
                    ) : (
                      <div title={item}>{_.truncate(item, { length: 24 })}</div>
                    )}
                  </EuiLink>
                ) : (
                  <EuiLink href={`#/trace_analytics/traces/${encodeURIComponent(item)}`}>
                    {item.length < 24 ? (
                      item
                    ) : (
                      <div title={item}>{_.truncate(item, { length: 24 })}</div>
                    )}
                  </EuiLink>
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiCopy textToCopy={item}>
                  {(copy) => (
                    <EuiButtonIcon
                      aria-label="Copy trace id"
                      iconType="copyClipboard"
                      onClick={copy}
                    >
                      Click to copy
                    </EuiButtonIcon>
                  )}
                </EuiCopy>
              </EuiFlexItem>
              <EuiFlexItem grow={3} />
            </EuiFlexGroup>
          ),
        },
        {
          field: 'trace_group',
          name: 'Trace group',
          align: 'left',
          sortable: true,
          truncateText: true,
          render: (item) =>
            item ? (
              <EuiText size="s">
                {item.length < 36 ? (
                  item
                ) : (
                  <div title={item}>{_.truncate(item, { length: 36 })}</div>
                )}
              </EuiText>
            ) : (
              '-'
            ),
        },
        {
          field: 'latency',
          name: 'Latency (ms)',
          align: 'right',
          sortable: true,
          truncateText: true,
        },
        {
          field: 'percentile_in_trace_group',
          name: (
            <>
              <div>Percentile in trace group</div>
              {/* <div style={{ marginRight: 5 }}>trace group</div> */}
            </>
          ),
          align: 'right',
          sortable: true,
          render: (item) =>
            item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}th`}</EuiText> : '-',
        },
        {
          field: 'error_count',
          name: 'Errors',
          align: 'right',
          sortable: true,
          render: (item) =>
            item == null ? (
              '-'
            ) : item > 0 ? (
              <EuiText color="danger" size="s">
                Yes
              </EuiText>
            ) : (
              'No'
            ),
        },
        {
          field: 'last_updated',
          name: 'Last updated',
          align: 'left',
          sortable: true,
          render: (item) => (item === 0 || item ? item : '-'),
        },
      ] as Array<EuiTableFieldDataColumnType<any>>,
    [props.items]
  );

  const titleBar = useMemo(() => renderTitleBar(props.items?.length), [props.items]);

  const [sorting, setSorting] = useState<{ sort: PropertySort }>({
    sort: {
      field: 'trace_id',
      direction: 'asc',
    },
  });

  const onTableChange = async ({ page, sort }: { page: any; sort: any }) => {
    if (typeof sort?.field !== 'string') return;

    // maps table column key to DSL aggregation name
    const field = {
      trace_id: '_key',
      trace_group: null,
      latency: 'latency',
      percentile_in_trace_group: null,
      error_count: 'error_count',
      last_updated: 'last_updated',
    }[sort.field];
    if (!field || props.items?.length < TRACES_MAX_NUM) {
      setSorting({ sort });
      return;
    }

    // using await when sorting the default sorted field leads to a bug in UI
    if (sort.field === 'trace_id') {
      props.refresh({ ...sort, field });
      setSorting({ sort });
      return;
    }

    await props.refresh({ ...sort, field });
    setSorting({ sort });
  };

  return (
    <>
      <EuiPanel>
        {titleBar}
        <EuiSpacer size="m" />
        <EuiHorizontalRule margin="none" />
        {props.items?.length > 0 ? (
          <EuiInMemoryTable
            tableLayout="auto"
            items={props.items}
            columns={columns}
            pagination={{
              initialPageSize: 10,
              pageSizeOptions: [5, 10, 15],
            }}
            sorting={sorting}
            onTableChange={onTableChange}
            loading={props.loading}
          />
        ) : props.indicesExist ? (
          <NoMatchMessage size="xl" />
        ) : (
          <MissingConfigurationMessage />
        )}
      </EuiPanel>
    </>
  );
}
