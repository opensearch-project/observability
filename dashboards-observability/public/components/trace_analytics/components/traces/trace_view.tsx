/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
import React, { useEffect, useState } from 'react';
import { TraceAnalyticsCoreDeps } from '../../home';
import {
  handlePayloadRequest,
  handleServicesPieChartRequest,
  handleTraceViewRequest,
} from '../../requests/traces_request_handler';
import { PanelTitle } from '../common/helper_functions';
import { ServiceBreakdownPanel } from './service_breakdown_panel';
import { SpanDetailPanel } from './span_detail_panel';

interface TraceViewProps extends TraceAnalyticsCoreDeps {
  traceId: string;
}

export function TraceView(props: TraceViewProps) {
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

  const refresh = async () => {
    handleTraceViewRequest(props.traceId, props.http, fields, setFields);
    handleServicesPieChartRequest(props.traceId, props.http, setServiceBreakdownData, setColorMap);
    handlePayloadRequest(props.traceId, props.http, payloadData, setPayloadData);
  };

  useEffect(() => {
    props.chrome.setBreadcrumbs([
      props.parentBreadcrumb,
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
              <SpanDetailPanel traceId={props.traceId} http={props.http} colorMap={colorMap} />
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
        </EuiPageBody>
      </EuiPage>
    </>
  );
}
