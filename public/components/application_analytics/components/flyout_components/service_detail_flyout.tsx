/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import _ from 'lodash';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useEffect, useMemo, useState } from 'react';
import {
  handleServiceMapRequest,
  handleServiceViewRequest,
} from '../../../../../public/components/trace_analytics/requests/services_request_handler';
import { filtersToDsl } from '../../../../../public/components/trace_analytics/components/common/helper_functions';
import { ServiceMap } from '../../../../../public/components/trace_analytics/components/services';
import { ServiceObject } from '../../../../../public/components/trace_analytics/components/common/plots/service_map';
import { SpanDetailTable } from '../../../../../public/components/trace_analytics/components/traces/span_detail_table';
import { TraceAnalyticsComponentDeps } from '../../../../../public/components/trace_analytics/home';
import { getListItem } from '../../helpers/utils';

interface ServiceFlyoutProps extends TraceAnalyticsComponentDeps {
  serviceName: string;
  closeServiceFlyout: () => void;
  openSpanFlyout: (spanId: string) => void;
  setSelectedTab: (newTab: string) => void;
}

export function ServiceDetailFlyout(props: ServiceFlyoutProps) {
  const {
    serviceName,
    http,
    startTime,
    endTime,
    filters,
    appConfigs,
    query,
    closeServiceFlyout,
    openSpanFlyout,
  } = props;
  const [fields, setFields] = useState<any>({});
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [total, setTotal] = useState(0);
  const [DSL, setDSL] = useState<any>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');

  const renderContent = useMemo(() => {
    if (!serviceName) return '-';
    const overviewList = [
      getListItem('Name', serviceName),
      getListItem(
        'Number of connected services',
        fields.number_of_connected_services !== undefined ? fields.number_of_connected_services : 0
      ),
      getListItem(
        'Connected services',
        fields.connected_services
          ? fields.connected_services.reduce((prev: string, curr: string) => {
              return [prev, ', ', curr];
            })
          : '-'
      ),
      getListItem(
        'Average latency (ms)',
        fields.average_latency !== undefined ? fields.average_latency : '-'
      ),
      getListItem(
        'Error rate',
        fields.error_rate !== undefined ? _.round(fields.error_rate, 2).toString() + '%' : '-'
      ),
      getListItem('Throughput', fields.throughput !== undefined ? fields.throughput : '-'),
      getListItem('Traces', fields.traces === 0 || fields.traces ? fields.traces : '-'),
    ];

    return (
      <>
        <EuiText size="m">
          <span className="panel-title">Overview</span>
        </EuiText>
        <EuiSpacer size="s" />
        {overviewList}
        <EuiSpacer size="xs" />
        <EuiHorizontalRule margin="s" />
        <ServiceMap
          serviceMap={serviceMap}
          idSelected={serviceMapIdSelected}
          setIdSelected={setServiceMapIdSelected}
          currService={serviceName}
          page="detailFlyout"
        />
        <EuiSpacer size="xs" />
        <EuiHorizontalRule margin="s" />
        <EuiText size="m">
          <span className="panel-title">Spans</span>
          {total === 0 || total ? <span className="panel-title-count">{` (${total})`}</span> : null}
        </EuiText>
        <EuiSpacer size="s" />
        <SpanDetailTable
          http={http}
          hiddenColumns={['serviceName']}
          DSL={DSL}
          openFlyout={openSpanFlyout}
          setTotal={setTotal}
        />
      </>
    );
  }, [serviceName, fields, serviceMap, DSL]);

  useEffect(() => {
    const serviceDSL = filtersToDsl(filters, query, startTime, endTime, 'app', appConfigs);
    handleServiceViewRequest(serviceName, http, serviceDSL, fields, setFields);
    handleServiceMapRequest(http, serviceDSL, serviceMap, setServiceMap, serviceName);
    const spanDSL = filtersToDsl(filters, query, startTime, endTime, 'app', appConfigs);
    spanDSL.query.bool.must.push({
      term: {
        serviceName,
      },
    });
    setDSL(spanDSL);
  }, [serviceName, startTime, endTime]);

  return (
    <EuiFlyout onClose={closeServiceFlyout} size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle>
          <h2>Service detail</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>{renderContent}</EuiFlyoutBody>
    </EuiFlyout>
  );
}
