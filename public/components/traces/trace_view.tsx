import {
  EuiButton,
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
  EuiSuperSelect,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import {
  handlePayloadRequest,
  handleServiceBreakdownRequest,
  handleSpanDetailRequest,
  handleTraceViewRequest,
} from '../../requests/traces_request_handler';
import { CoreDeps } from '../app';
import { PanelTitle, renderBenchmark } from '../common';
import { ServiceBreakdownPanel } from './service_breakdown_panel';
import { SpanDetailPanel } from './span_detail_panel';

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

const renderOverview = (fields) => {
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
                {fields.trace_group}
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
                {fields.error_count}
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};

interface TraceViewProps extends CoreDeps {
  traceId: string;
}

export function TraceView(props: TraceViewProps) {
  const [fields, setFields] = useState({});
  const [serviceBreakdownData, setServiceBreakdownData] = useState([]);
  const [spanDetailData, setSpanDetailData] = useState({ gantt: [], table: [], ganttMaxX: 0 });
  const [payloadData, setPayloadData] = useState('');

  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Traces',
        href: '#/traces',
      },
      {
        text: props.traceId,
        href: `#/traces/${encodeURIComponent(props.traceId)}`,
      },
    ]);
    refresh();
  }, []);

  const refresh = () => {
    handleTraceViewRequest(props.traceId, props.http, fields, setFields);
    handleServiceBreakdownRequest(
      props.traceId,
      props.http,
      serviceBreakdownData,
      setServiceBreakdownData
    );
    handleSpanDetailRequest(props.traceId, props.http, spanDetailData, setSpanDetailData);
    handlePayloadRequest(props.traceId, props.http, payloadData, setPayloadData);
  };

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
              <SpanDetailPanel data={spanDetailData} />
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
