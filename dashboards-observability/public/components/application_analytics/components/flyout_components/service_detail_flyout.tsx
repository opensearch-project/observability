/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from "lodash";
import { EuiDescriptionList, EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiHorizontalRule, EuiSpacer, EuiText, EuiTitle } from "@elastic/eui";
import React, { useEffect, useMemo, useState } from "react";
import { handleServiceMapRequest, handleServiceViewRequest } from "../../../../../public/components/trace_analytics/requests/services_request_handler";
import { filtersToDsl } from "../../../../../public/components/trace_analytics/components/common/helper_functions";
import { ServiceMap } from "../../../../../public/components/trace_analytics/components/services";
import { ServiceObject } from "../../../../../public/components/trace_analytics/components/common/plots/service_map";
import { SpanDetailTable } from "../../../../../public/components/trace_analytics/components/traces/span_detail_table";
import { TraceAnalyticsComponentDeps } from "../../../../../public/components/trace_analytics/home";

export interface ServiceFlyoutProps extends TraceAnalyticsComponentDeps {
  serviceName: string;
  closeServiceFlyout: () => void;
  openSpanFlyout: (spanId: string) => void;
  setSelectedTab: (newTab: string) => void;
}

export function ServiceDetailFlyout(props: ServiceFlyoutProps) {
  const { serviceName, http, startTime, endTime, filters, query, closeServiceFlyout, openSpanFlyout } = props;
  const [fields, setFields] = useState<any>({});
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [total, setTotal] = useState(0);
  const [DSL, setDSL] = useState<any>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');

  const getListItem = (title: string, description: string) => {
    const titleComponent = 
      <EuiText
        size="s"
        color="subdued"
        style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}
      >
        {title}
      </EuiText>;
    
    const descriptionComponent = 
    <EuiText size="s" style={{ wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
      <b>{description}</b>
    </EuiText>;
    return (
      <>
        <EuiDescriptionList
          listItems={[
            {
              title: titleComponent,
              description: descriptionComponent || '-',
            }
          ]}
          type="column"
          align="center"
          compressed
        />
        <EuiSpacer size="s" />
      </>
    )
  };
  
  const renderContent = () => {
    if (!serviceName) return '-';
    const overviewList = [
      getListItem('Name', serviceName),
      getListItem('Number of connected services', fields.number_of_connected_services !== undefined ? fields.number_of_connected_services : 0),
      getListItem('Connected services', fields.connected_services ? fields.connected_services.reduce((prev: string, curr: string) => {return [prev, ', ', curr]}) : '-'),
      getListItem('Average latency (ms)', fields.average_latency !== undefined ? fields.average_latency : '-'),
      getListItem('Error rate', fields.error_rate !== undefined ? _.round(fields.error_rate, 2).toString() + '%' : '-'),
      getListItem('Throughput', fields.throughput !== undefined ? fields.throughput : '-'),
      getListItem('Traces', fields.traces === 0 || fields.traces ? fields.traces : '-')
    ];

    return (
      <>
      <EuiText size="m">
        <span className="panel-title">Overview</span>
      </EuiText>
      <EuiSpacer size="s" />
        {overviewList}
      <EuiSpacer size="xs"/>
      <EuiHorizontalRule margin="s" />
      <ServiceMap
        serviceMap={serviceMap}
        idSelected={serviceMapIdSelected}
        setIdSelected={setServiceMapIdSelected}
        currService={serviceName}
      />
      <EuiSpacer size="xs"/>
      <EuiHorizontalRule margin="s"/>
      <EuiText size="m">
        <span className="panel-title">Spans</span>
        {total === 0 || total ? (
          <span className="panel-title-count">{` (${total})`}</span>
        ) : null}
      </EuiText>
      <EuiHorizontalRule margin="m" />
      <SpanDetailTable
        http={http}
        hiddenColumns={['serviceName']}
        DSL={DSL}
        openFlyout={openSpanFlyout}
        setTotal={setTotal}
      />
    </>
    )
  }

  useEffect(() => {
    const DSL = filtersToDsl(filters, query, startTime, endTime);
    handleServiceViewRequest(serviceName, http, DSL, fields, setFields);
    handleServiceMapRequest(http, DSL, serviceMap, setServiceMap, serviceName);
    const spanDSL = filtersToDsl(filters, query, startTime, endTime);
    spanDSL.query.bool.must.push({
      term: {
        serviceName: serviceName,
      },
    });
    setDSL(spanDSL);
  }, [startTime, endTime, serviceName]);

  const content = useMemo(() => {console.log('here'); return renderContent();}, [fields, serviceMap, DSL]);

  return (
    <EuiFlyout onClose={closeServiceFlyout} size="s">
      <EuiFlyoutHeader>
        <EuiTitle>
          <h2>Service detail</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        {content}
      </EuiFlyoutBody>
    </EuiFlyout>
  )
}