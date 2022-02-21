/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiCodeBlock,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { ServiceBreakdownPanel } from '../../../../../public/components/trace_analytics/components/traces/service_breakdown_panel';
import {
  handlePayloadRequest,
  handleServicesPieChartRequest,
  handleTraceViewRequest,
} from '../../../../../public/components/trace_analytics/requests/traces_request_handler';
import { TraceAnalyticsComponentDeps } from '../../../../../public/components/trace_analytics/home';
import { getListItem } from '../../helpers/utils';
import { SpanDetailPanel } from '../../../../../public/components/trace_analytics/components/traces/span_detail_panel';

interface TraceFlyoutProps extends TraceAnalyticsComponentDeps {
  traceId: string;
  closeTraceFlyout: () => void;
  openSpanFlyout: (spanId: string) => void;
}

export function TraceDetailFlyout(props: TraceFlyoutProps) {
  const { traceId, http, closeTraceFlyout, openSpanFlyout } = props;
  const [fields, setFields] = useState<any>({});
  const [serviceBreakdownData, setServiceBreakdownData] = useState([]);
  const [payloadData, setPayloadData] = useState('');
  const [colorMap, setColorMap] = useState({});

  const renderContent = useMemo(() => {
    if (!traceId) return '-';
    const overviewList = [
      getListItem('Trace ID', traceId),
      getListItem('Trace group name', fields.trace_group || '-'),
      getListItem('Latency', fields.latency),
      getListItem('Last updated', fields.last_updated),
      getListItem(
        'Errors',
        fields.error_count == null ? (
          '-'
        ) : fields.error_count > 0 ? (
          <EuiText color="danger" size="s" style={{ fontWeight: 430 }}>
            Yes
          </EuiText>
        ) : (
          'No'
        )
      ),
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
        <ServiceBreakdownPanel data={serviceBreakdownData} />
        <EuiSpacer size="xs" />
        <EuiHorizontalRule margin="s" />
        <SpanDetailPanel
          traceId={traceId}
          http={http}
          colorMap={colorMap}
          page="app"
          openSpanFlyout={openSpanFlyout}
        />
        <EuiSpacer size="xs" />
        <EuiHorizontalRule margin="s" />
        <EuiText size="m">
          <span className="panel-title">Payload</span>
        </EuiText>
        <EuiSpacer size="s" />
        {payloadData.length > 0 ? (
          <EuiCodeBlock language="json" paddingSize="s" isCopyable overflowHeight={500}>
            {payloadData}
          </EuiCodeBlock>
        ) : null}
      </>
    );
  }, [traceId, fields, serviceBreakdownData, colorMap, payloadData]);

  useEffect(() => {
    handleTraceViewRequest(traceId, http, fields, setFields);
    handleServicesPieChartRequest(traceId, http, setServiceBreakdownData, setColorMap);
    handlePayloadRequest(traceId, http, payloadData, setPayloadData);
  }, [traceId]);

  return (
    <EuiFlyout onClose={closeTraceFlyout} size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle>
          <h2>Trace detail</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>{renderContent}</EuiFlyoutBody>
    </EuiFlyout>
  );
}
