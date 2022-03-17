/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiButtonIcon,
  EuiCodeBlock,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsCoreDeps } from '../../home';
import { handleServiceMapRequest } from '../../requests/services_request_handler';
import {
  handlePayloadRequest,
  handleServicesPieChartRequest,
  handleTraceViewRequest,
} from '../../requests/traces_request_handler';
import { filtersToDsl, PanelTitle } from '../common/helper_functions';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';
import { ServiceBreakdownPanel } from './service_breakdown_panel';
import { SpanDetailPanel } from './span_detail_panel';

interface TraceViewProps extends TraceAnalyticsCoreDeps {
  traceId: string;
}

export function TraceView(props: TraceViewProps) {
  const page = 'traceView';
  const renderTitle = (traceId: string) => {
    return (
      <>
        <EuiFlexItem>
          <EuiTitle size="l">
            <h2 className="overview-content">{traceId}</h2>
          </EuiTitle>
        </EuiFlexItem>
      </>
    );
  };

  const renderOverview = (fields: any) => {
    return (
      <EuiPanel>
        <PanelTitle title="Overview" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Trace ID</EuiText>
                {fields.trace_id && (
                  <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                      <EuiText size="s" className="overview-content">
                        {fields.trace_id}
                      </EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiCopy textToCopy={fields.trace_id}>
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
                  </EuiFlexGroup>
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Trace group name</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.trace_group || '-'}
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Latency</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.latency}
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Last updated</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.last_updated}
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiText className="overview-title">Errors</EuiText>
                <EuiText size="s" className="overview-content">
                  {fields.error_count == null ? (
                    '-'
                  ) : fields.error_count > 0 ? (
                    <EuiText color="danger" size="s" style={{ fontWeight: 430 }}>
                      Yes
                    </EuiText>
                  ) : (
                    'No'
                  )}
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  };

  const [fields, setFields] = useState({});
  const [serviceBreakdownData, setServiceBreakdownData] = useState([]);
  const [payloadData, setPayloadData] = useState('');
  const [colorMap, setColorMap] = useState({});
  const [ganttData, setGanttData] = useState<{ gantt: any[]; table: any[]; ganttMaxX: number }>({
    gantt: [],
    table: [],
    ganttMaxX: 0,
  });
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [traceFilteredServiceMap, setTraceFilteredServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');

  const refresh = async () => {
    const DSL = filtersToDsl([], '', 'now', 'now', page);
    handleTraceViewRequest(props.traceId, props.http, fields, setFields);
    handlePayloadRequest(props.traceId, props.http, payloadData, setPayloadData);
    handleServicesPieChartRequest(props.traceId, props.http, setServiceBreakdownData, setColorMap);
    handleServiceMapRequest(props.http, DSL, serviceMap, setServiceMap);
  };

  useEffect(() => {
    if (!Object.keys(serviceMap).length || !ganttData.table.length) return;
    const services: any = {};
    ganttData.table.forEach((service: any) => {
      if (!services[service.service_name]) {
        services[service.service_name] = {
          latency: 0,
          errors: 0,
          throughput: 0,
        };
      }
      services[service.service_name].latency += service.latency;
      if (service.error) services[service.service_name].errors++;
      services[service.service_name].throughput++;
    });
    const filteredServiceMap: ServiceObject = {};
    Object.entries(services).forEach(([serviceName, service]: [string, any]) => {
      if (!serviceMap[serviceName]) return;
      filteredServiceMap[serviceName] = serviceMap[serviceName];
      filteredServiceMap[serviceName].latency = _.round(service.latency / service.throughput, 2);
      filteredServiceMap[serviceName].error_rate = _.round(
        (service.errors / service.throughput) * 100,
        2
      );
      filteredServiceMap[serviceName].throughput = service.throughput;
      filteredServiceMap[serviceName].destServices = filteredServiceMap[
        serviceName
      ].destServices.filter((destService) => services[destService]);
    });
    setTraceFilteredServiceMap(filteredServiceMap);
  }, [serviceMap, ganttData]);

  useEffect(() => {
    props.chrome.setBreadcrumbs([
      ...props.parentBreadcrumbs,
      {
        text: 'Trace analytics',
        href: '#/trace_analytics/home',
      },
      {
        text: 'Traces',
        href: '#/trace_analytics/traces',
      },
      {
        text: props.traceId,
        href: `#/trace_analytics/traces/${encodeURIComponent(props.traceId)}`,
      },
    ]);
    refresh();
  }, []);

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {renderTitle(props.traceId)}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview(fields)}

          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={3}>
              <ServiceBreakdownPanel data={serviceBreakdownData} />
            </EuiFlexItem>
            <EuiFlexItem grow={7}>
              <SpanDetailPanel
                traceId={props.traceId}
                http={props.http}
                colorMap={colorMap}
                data={ganttData}
                setData={setGanttData}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />

          <EuiPanel>
            <EuiFlexGroup>
              <EuiFlexItem>
                <PanelTitle title="Payload" />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin="m" />
            {payloadData.length > 0 ? (
              <EuiCodeBlock language="json" paddingSize="s" isCopyable overflowHeight={500}>
                {payloadData}
              </EuiCodeBlock>
            ) : null}
          </EuiPanel>
          <EuiSpacer />

          <ServiceMap
            addFilter={undefined}
            serviceMap={traceFilteredServiceMap}
            idSelected={serviceMapIdSelected}
            setIdSelected={setServiceMapIdSelected}
            page={page}
          />
        </EuiPageBody>
      </EuiPage>
    </>
  );
}
