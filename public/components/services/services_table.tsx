/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiI18nNumber,
  EuiInMemoryTable,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiTableFieldDataColumnType,
  EuiText,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { NoMatchMessage, PanelTitle } from '../common';
import { FilterType } from '../common/filters/filters';

export function ServicesTable(props: {
  items: any[];
  addFilter: (filter: FilterType) => void;
  setRedirect: (redirect: boolean) => void;
  serviceQuery: string;
  setServiceQuery: (query: string) => void;
  refresh: () => void;
}) {
  const renderTitleBar = (totalItems?: number) => {
    return (
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={10}>
          <PanelTitle title="Services" totalItems={totalItems} />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  const columns = useMemo(
    () =>
      [
        {
          field: 'name',
          name: 'Name',
          align: 'left',
          sortable: true,
          render: (item) => (
            <EuiLink href={`#/services/${encodeURIComponent(item)}`}>
              {_.truncate(item, { length: 24 })}
            </EuiLink>
          ),
        },
        {
          field: 'average_latency',
          name: 'Average latency (ms)',
          align: 'right',
          sortable: true,
          render: (item) => (item === 0 || item ? _.round(item, 2) : '-'),
        },
        {
          field: 'error_rate',
          name: 'Error rate',
          align: 'right',
          sortable: true,
          render: (item) =>
            item === 0 || item ? <EuiText size="s">{`${_.round(item, 2)}%`}</EuiText> : '-',
        },
        {
          field: 'throughput',
          name: 'Throughput',
          align: 'right',
          sortable: true,
          truncateText: true,
          render: (item) => (item === 0 || item ? <EuiI18nNumber value={item} /> : '-'),
        },
        {
          field: 'number_of_connected_services',
          name: 'No. of connected services',
          align: 'right',
          sortable: true,
          truncateText: true,
          width: '80px',
          render: (item) => (item === 0 || item ? item : '-'),
        },
        {
          field: 'connected_services',
          name: 'Connected services',
          align: 'left',
          sortable: true,
          truncateText: true,
          render: (item) =>
            item ? <EuiText size="s">{_.truncate(item, { length: 50 })}</EuiText> : '-',
        },
        {
          field: 'traces',
          name: 'Traces',
          align: 'right',
          sortable: true,
          truncateText: true,
          render: (item) => (item === 0 || item ? <EuiI18nNumber value={item} /> : '-'),
        },
      ] as Array<EuiTableFieldDataColumnType<any>>,
    [props.items]
  );

  const titleBar = useMemo(() => renderTitleBar(props.items?.length), [props.items]);

  return (
    <>
      <EuiPanel>
        {titleBar}
        <EuiHorizontalRule margin="s" style={{ marginTop: 10 }} />
        <EuiFieldSearch
          fullWidth
          placeholder="Service name"
          value={props.serviceQuery}
          onChange={(e) => props.setServiceQuery(e.target.value)}
          onSearch={() => props.refresh()}
        />
        <EuiHorizontalRule margin="s" style={{ marginBottom: 0 }} />

        {props.items?.length > 0 ? (
          <EuiInMemoryTable
            tableLayout="auto"
            items={props.items}
            columns={columns}
            pagination={{
              initialPageSize: 10,
              pageSizeOptions: [5, 10, 15],
            }}
            sorting={{
              sort: {
                field: 'name',
                direction: 'asc',
              },
            }}
          />
        ) : (
          <NoMatchMessage size="xl" />
        )}
      </EuiPanel>
    </>
  );
}
