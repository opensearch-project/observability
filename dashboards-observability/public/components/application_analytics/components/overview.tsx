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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
    EuiBasicTable,
    EuiButton,
    EuiContextMenuItem,
    EuiContextMenuPanel,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHorizontalRule,
    EuiIcon,
    EuiInMemoryTable,
    EuiLink,
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiPopover,
    EuiSearchBar,
    EuiSpacer,
    EuiTableFieldDataColumnType,
    EuiText,
    EuiTitle,
    EuiToolTip,
    LEFT_ALIGNMENT,
  } from '@elastic/eui';
import { i18n } from '@osd/i18n';
import CSS from 'csstype';
import _ from 'lodash';
import { DatePicker } from '../../../components/common/search/date_picker';
import React, { ReactElement, useState } from 'react';

const pageStyles: CSS.Properties = {
    float: 'left',
    width: '100%',
    maxWidth: '1130px',
};

const columnStyles: CSS.Properties = {
    textAlign: 'center',
  };
  
type AppOverviewProps = {
    loading: boolean;
};

export function AppOverview(props: AppOverviewProps) {
    const [query, setQuery] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);


    const pageOfItems: any[] = [];
    const totalItemCount = 1;

    const onTableChange = ({ page = {} }) => {
        const { index: pageIndex, size: pageSize } = page;
    
        setPageIndex(pageIndex);
        setPageSize(pageSize);
    };

    const onQueryChange = ({ query }) => {
        setQuery(query);
      };

    const box = {
        placeholder: "Trace/span/event ID, Service/trace group name",
        incremental: true,
        schema: true
    };

    const columns = [
        {
            field: "trace_group_name",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  Traces of all requests that share a common API and operation at the start of distributed tracing instrumentation.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  Trace group name
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: true,
            width: '200px',
          },
          {
            field: "latency_variance",
            name: <React.Fragment>
              <EuiToolTip
                content={
                  <EuiText
                    size="xs"
                  >
                    Range of latencies for traces within a trace group in the selected time range.
                  </EuiText>
                }
                delay="regular"
                position="top"
              >
                <span>
                  Latency variance (ms)
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </span>
              </EuiToolTip>
              <EuiText
                color="subdued"
                size="xs"
              >
                0                100            200            300            400
              </EuiText>
            </React.Fragment>,
            sortable: true,
            width: "300px",
          },
          {
            field: "average_latency",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  Average latency of traces within a trace group in the selected time range.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  Average <br />
                  latency (ms)
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: true,
            width: '175px'
          },
          {
            field: "latency_vs_benchmark",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  Average latency of traces compared to the benchmark.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  Average latency vs <br />
                  benchmark
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: true,
            width: '200px',
          },
          {
            field: "24_hour_latency_trend",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  24 hour time series view of hourly average, hourly percentile, and hourly range of latency for traces within a trace group.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  24-hour <br/>
                  latency trend
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: false,
            width: '175px',
          },
          {
            field: "error_rate",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  Error rate based on count of trace errors within a trace group in the selected time range.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  Error rate
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: true,
            width: '175px',
          },
          {
            field: "traces",
            name: <EuiToolTip
              content={
                <EuiText
                  size="xs"
                >
                  Count of traces with unique trace identifiers in the selected time range.
                </EuiText>
              }
              delay="regular"
              position="top"
            >
              <React.Fragment>
                <div>
                  Traces
                   
                  <EuiIcon
                    className="eui-alignTop"
                    color="subdued"
                    size="s"
                    type="questionInCircle"
                  />
                </div>
                <div>
                   
                </div>
              </React.Fragment>
            </EuiToolTip>,
            sortable: true,
            width: '175px',
          },
        ];

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount,
        pageSizeOptions: [3, 5, 8],
    };
    

    return (
        <div style={pageStyles}>
            <EuiPage>
                <EuiPageBody component="div">
                    <EuiPageContent id="overviewArea">
                        <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiSearchBar 
                                box={box} 
                                query={query} 
                                onChange={onQueryChange}
                            />
                        </EuiPageContentHeaderSection>
                        <EuiPageContentHeaderSection>
                                <DatePicker
                                    startTime={'now-24h'}
                                    endTime={'now'}
                                    setStartTime={() => { } }
                                    setEndTime={() => { } }
                                    setIsOutputStale={() => { } }
                                    handleTimePickerChange={() => { } } 
                                    setTimeRange={function (): void {}}                            
                                />
                        </EuiPageContentHeaderSection>
                        <EuiPageContentHeaderSection>
                            <EuiButton
                                iconType='refresh'
                                onClick={() => {}}
                            >
                                {'Refresh'}
                            </EuiButton>
                        </EuiPageContentHeaderSection>
                        <EuiPageContentHeaderSection>
                            <EuiButton
                                onClick={() => {}}
                            >
                                {'Add new chart'}
                            </EuiButton>
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiHorizontalRule margin="m" />
                    <EuiTitle size="s">
                    <h3>
                        Latency by trace group
                    </h3>
                    </EuiTitle>
                    <EuiHorizontalRule margin="m" />
                    <EuiBasicTable
                        items={pageOfItems}
                        columns={columns}
                        pagination={pagination}
                        onChange={onTableChange}
                        tableLayout={'fixed'}
                    />
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        </div>
    );
}