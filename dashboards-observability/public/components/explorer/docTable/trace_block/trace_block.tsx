/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TraceDetailRender } from '../../../application_analytics/components/flyout_components/trace_detail_render';
import React from 'react';
import { HttpSetup } from '../../../../../../../src/core/public';
import { EuiCallOut, EuiLink } from '@elastic/eui';
import { TRACE_ANALYTICS_DOCUMENTATION_LINK } from '../../../../../common/constants/trace_analytics';
import {
  OPEN_TELEMETRY_LOG_CORRELATION_LINK,
  OTEL_TRACE_ID,
} from '../../../../../common/constants/explorer';
import { IDocType } from '../docViewRow';

interface props {
  http: HttpSetup;
  hit: IDocType;
}

export const isValidTraceId = (traceId: string) => {
  return new Blob([traceId]).size === 32;
};

export const TraceBlock = ({ http, hit }: props) => {
  let traceId = hit.hasOwnProperty(OTEL_TRACE_ID) ? hit[OTEL_TRACE_ID] : '';

  if (traceId == '' || !isValidTraceId(traceId)) {
    return (
      <>
        <EuiCallOut iconType="help" title="No Trace Id found in the event.">
          <p>Please make sure to add "{OTEL_TRACE_ID}" field to the logs.</p>
          <p>
            More info on{' '}
            <EuiLink href={TRACE_ANALYTICS_DOCUMENTATION_LINK} target="_blank" external>
              Trace Analytics
            </EuiLink>
            <br />
            More info on{' '}
            <EuiLink href={OPEN_TELEMETRY_LOG_CORRELATION_LINK} target="_blank" external>
              Log Correlation
            </EuiLink>
          </p>
        </EuiCallOut>
      </>
    );
  }
  return <TraceDetailRender traceId={traceId} http={http} />;
};
