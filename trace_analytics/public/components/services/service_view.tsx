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
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiI18nNumber,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
  handleServiceMapRequest,
  handleServiceViewRequest,
} from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, PanelTitle, renderDatePicker, SearchBarProps } from '../common';
import { FilterType } from '../common/filters/filters';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { SpanDetailFlyout } from '../traces/span_detail_flyout';
import { SpanDetailTable } from '../traces/span_detail_table';

interface ServiceViewProps extends SearchBarProps, CoreDeps {
  serviceName: string;
  addFilter: (filter: FilterType) => void;
}

export function ServiceView(props: ServiceViewProps) {
  const [fields, setFields] = useState<any>({});
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState('latency');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace Analytics',
        href: '#',
      },
      {
        text: 'Services',
        href: '#/services',
      },
      {
        text: props.serviceName,
        href: `#/services/${encodeURIComponent(props.serviceName)}`,
      },
    ]);
  }, []);

  useEffect(() => {
    if (!redirect) refresh();
  }, [props.startTime, props.endTime, props.serviceName]);

  const refresh = () => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    handleServiceViewRequest(props.serviceName, props.http, DSL, fields, setFields);
    handleServiceMapRequest(props.http, DSL, serviceMap, setServiceMap, props.serviceName);
  };

  const renderTitle = (
    serviceName: string,
    startTime: SearchBarProps['startTime'],
    setStartTime: SearchBarProps['setStartTime'],
    endTime: SearchBarProps['endTime'],
    setEndTime: SearchBarProps['setEndTime'],
    addFilter: (filter: FilterType) => void
  ) => {
    return (
      <>
        <EuiFlexItem>
          <EuiTitle size="l">
            <h2 className="overview-content">{serviceName}</h2>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {renderDatePicker(startTime, setStartTime, endTime, setEndTime)}
        </EuiFlexItem>
        <EuiFlexItem grow={false} />
      </>
    );
  };

  const renderOverview = () => {
    return (
      <EuiPanel>
        <PanelTitle title="Overview" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Name</EuiText>
                <EuiText size="s" className="overview-content">
                  {props.serviceName || '-'}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Number of connected services</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.number_of_connected_services !== undefined
                    ? fields.number_of_connected_services
                    : 0}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Connected services</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.connected_services
                    ? fields.connected_services
                        .map((service: string) => (
                          <EuiLink href={`#/services/${service}`} key={service}>
                            {service}
                          </EuiLink>
                        ))
                        .reduce((prev: React.ReactNode, curr: React.ReactNode) => {
                          return [prev, ', ', curr];
                        })
                    : '-'}
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Average latency (ms)</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.average_latency !== undefined ? fields.average_latency : '-'}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Error rate</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.error_rate !== undefined
                    ? _.round(fields.error_rate, 2).toString() + '%'
                    : '-'}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Throughput</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.throughput !== undefined ? (
                    <EuiI18nNumber value={fields.throughput} />
                  ) : (
                    '-'
                  )}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Traces</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.traces === 0 || fields.traces ? (
                    <EuiLink
                      onClick={() => {
                        props.addFilter({
                          field: 'serviceName',
                          operator: 'is',
                          value: props.serviceName,
                          inverted: false,
                          disabled: false,
                        });
                        location.assign('#/traces');
                      }}
                    >
                      <EuiI18nNumber value={fields.traces} />
                    </EuiLink>
                  ) : (
                    '-'
                  )}
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </EuiPanel>
    );
  };

  const overview = useMemo(() => renderOverview(), [fields, props.serviceName]);

  const title = useMemo(
    () =>
      renderTitle(
        props.serviceName,
        props.startTime,
        props.setStartTime,
        props.endTime,
        props.setEndTime,
        props.addFilter
      ),
    [props.serviceName, props.startTime, props.endTime]
  );

  const activeFilters = useMemo(
    () => props.filters.filter((filter) => !filter.locked && !filter.disabled),
    [props.filters]
  );

  const [currentSpan, setCurrentSpan] = useState('');
  const storedFilters = sessionStorage.getItem('TraceAnalyticsSpanFilters');
  const [spanFilters, setSpanFilters] = useState<Array<{ field: string; value: any }>>(
    storedFilters ? JSON.parse(storedFilters) : []
  );
  const [DSL, setDSL] = useState<any>({});

  const setSpanFiltersWithStorage = (newFilters: Array<{ field: string; value: any }>) => {
    setSpanFilters(newFilters);
    sessionStorage.setItem('TraceAnalyticsSpanFilters', JSON.stringify(newFilters));
  };

  useEffect(() => {
    const DSL = filtersToDsl(props.filters, props.query, props.startTime, props.endTime);
    DSL.query.bool.must.push({
      term: {
        serviceName: props.serviceName,
      },
    });
    spanFilters.map(({ field, value }) => {
      if (value != null) {
        DSL.query.bool.must.push({
          term: {
            [field]: value,
          },
        });
      }
    });
    setDSL(DSL);
  }, [props.startTime, props.endTime, props.serviceName, spanFilters]);

  const addSpanFilter = (field: string, value: any) => {
    const newFilters = [...spanFilters];
    const index = newFilters.findIndex(({ field: filterField }) => field === filterField);
    if (index === -1) {
      newFilters.push({ field, value });
    } else {
      newFilters.splice(index, 1, { field, value });
    }
    setSpanFiltersWithStorage(newFilters);
  };

  const removeSpanFilter = (field: string) => {
    const newFilters = [...spanFilters];
    const index = newFilters.findIndex(({ field: filterField }) => field === filterField);
    if (index !== -1) {
      newFilters.splice(index, 1);
      setSpanFiltersWithStorage(newFilters);
    }
  };

  const renderFilters = useMemo(() => {
    return spanFilters.map(({ field, value }) => (
      <EuiFlexItem grow={false} key={`span-filter-badge-${field}`}>
        <EuiBadge
          iconType="cross"
          iconSide="right"
          iconOnClick={() => removeSpanFilter(field)}
          iconOnClickAriaLabel="remove current filter"
        >
          {`${field}: ${value}`}
        </EuiBadge>
      </EuiFlexItem>
    ));
  }, [spanFilters]);

  const [total, setTotal] = useState(0);
  const spanDetailTable = useMemo(
    () => (
      <SpanDetailTable
        http={props.http}
        hiddenColumns={['serviceName']}
        DSL={DSL}
        openFlyout={(spanId: string) => setCurrentSpan(spanId)}
        setTotal={setTotal}
      />
    ),
    [DSL, setCurrentSpan]
  );

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {title}
          </EuiFlexGroup>
          {activeFilters.length > 0 && (
            <EuiText textAlign="right" style={{ marginRight: 20 }} color="subdued">
              results are filtered by {activeFilters.map((filter) => filter.field).join(', ')}
            </EuiText>
          )}
          <EuiSpacer size="xl" />
          {overview}
          <EuiSpacer />
          <ServiceMap
            serviceMap={serviceMap}
            idSelected={serviceMapIdSelected}
            setIdSelected={setServiceMapIdSelected}
            currService={props.serviceName}
          />
          <EuiSpacer />
          <EuiPanel>
            <PanelTitle title="Spans" totalItems={total} />
            {spanFilters.length > 0 && (
              <>
                <EuiSpacer size="s" />
                <EuiFlexGroup gutterSize="s" wrap>
                  {renderFilters}
                </EuiFlexGroup>
              </>
            )}
            <EuiHorizontalRule margin="m" />
            <div>{spanDetailTable}</div>
          </EuiPanel>
          {!!currentSpan && (
            <SpanDetailFlyout
              http={props.http}
              spanId={currentSpan}
              isFlyoutVisible={!!currentSpan}
              closeFlyout={() => setCurrentSpan('')}
              addSpanFilter={addSpanFilter}
            />
          )}
        </EuiPageBody>
      </EuiPage>
    </>
  );
}
