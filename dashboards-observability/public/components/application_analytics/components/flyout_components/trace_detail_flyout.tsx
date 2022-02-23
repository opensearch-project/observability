/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiTitle } from '@elastic/eui';
import React from 'react';
import { TraceAnalyticsComponentDeps } from '../../../../../public/components/trace_analytics/home';
import { TraceDetailRender } from './trace_detail_render';

interface TraceFlyoutProps extends TraceAnalyticsComponentDeps {
  traceId: string;
  closeTraceFlyout: () => void;
  openSpanFlyout: (spanId: string) => void;
}

export function TraceDetailFlyout(props: TraceFlyoutProps) {
  const { traceId, http, closeTraceFlyout, openSpanFlyout } = props;
  const renderContent = (
    <TraceDetailRender traceId={traceId} http={http} openSpanFlyout={openSpanFlyout} />
  );
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
